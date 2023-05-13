import { app, db } from "../../../firebaseConfig";
import { collection, updateDoc, doc, addDoc, query, getDocs, where, and, deleteDoc, getDoc, getCountFromServer } from "firebase/firestore";
import { render } from "@react-email/render";
import { sendEmail } from "../../lib/email";
import SetTimeTemplate from "../../emails/SetTimeTemplate";
import AssignTimeTemplate from '../../emails/AssignTimeTemplate';
import { format } from "date-fns";
export default async function handler(req, res) {
  if (req.body?.perDate){
    let value = new Date(req.body.freeTime);
    let startDate = new Date(
      value.getFullYear(),
      value.getMonth(),
      value.getDate(),
      0,
      0,
      0
    ).getTime();
    let endDate = new Date(
      value.getFullYear(),
      value.getMonth(),
      value.getDate(),
      23,
      59,
      0
    ).getTime();
    const doc_refs = await getDocs(
      query(collection(db, "freetimes"), and(where("from", ">=", startDate), where("from", "<", endDate)))
    );
    let freeTimes = [];
    let bookedTimes = [];
    
    doc_refs.forEach( (time) => {
      const data = time.data();
      freeTimes.push({
        id: time.id,
        ...data
      });
    });
    if(freeTimes.length){
      let freeIds = freeTimes.map(time => time?.id);

      const free = await getDocs(
        query(collection(db, "settimes"), where("bookedTime", 'in', freeIds))
      );

      free.forEach(time => {
        let data = time.data();
        let item = freeTimes.find(item => data?.id == time?.bookedTime);
        bookedTimes.push({
          id: time.id,
          from: item ? new Date(item.from) : null,
          until: item ? new Date(item.until) : null,
          ...time.data()
      })})

      res.status(200).json(bookedTimes);
    } else {
      res.status(200).json([]);
    }
  } else if(req.body?.bookedId){

    const around = await getDoc(
      doc(db, "settimes", req.body.bookedId)
    );

    const free = await getDoc(
      doc(db, "freetimes", around.data()?.bookedTime)
    );

    let e = new Date(new Date(free.data().from).getFullYear(), new Date(free.data().from).getMonth(), new Date(free.data().from).getDate(), new Date(req.body?.around).getHours(), new Date(req.body?.around).getMinutes(), 0);
    
    if(e.getTime() <= free.data()?.from || e.getTime() >= free.data()?.until){
    
      res.status(400).json({message: "errrrrrrror", success: false});
    
    } else {
    
      const update = await updateDoc(doc(db, "settimes", req.body.bookedId), {
        around: e.getTime()
      });
    
    
      await sendEmail({
        to: around.data().email,
        subject: "I will be there.",
        html: render(AssignTimeTemplate({...req.body, fullName: around.data().fullName, from: free.data().from, until: free.data().until})),
      });
    
      res.status(200).json({message: "Around time successfully assigned.", success: true});
    }
  } else {
    const booked = await getCountFromServer(
      query(collection(db, "settimes"), where("bookedTime", "==", req.body.bookedTime))
    );
    const free = await getDoc(
      doc(db, "freetimes", req.body.bookedTime)
    );

    if( booked.data().count >= free.data().maxClient ){
      res.status(400).json({ message: "Maximum Booking Slots exceeds.", success: false });
    } else {
      const { id } = await addDoc(collection(db, "settimes"), req.body);
      if (id){
        await sendEmail({
          to: free.data().email,
          subject: "Your plumbing booking was successful",
          html: render(SetTimeTemplate({...req.body, from: free.data().from, until: free.data().until})),
        });
      }
      res.status(200).json({ message: "Booking was successfull.", success: true });
    }
  }
}
