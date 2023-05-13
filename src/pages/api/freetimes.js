import { app, db } from "../../../firebaseConfig";
import { collection, updateDoc, doc, addDoc, query, getDocs, where, and, deleteDoc } from "firebase/firestore";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      const doc_refs = await getDocs(collection(db, "freetimes"));

      const freetimes = [];

      doc_refs.forEach((time) => {
        freetimes.push({
          id: time.id,
          ...time.data(),
        });
      });
      res.status(200).json(freetimes);
      break;
    case "POST":
      if (req.body.perDate) {
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

        const freetimes = [];

        doc_refs.forEach((time) => {
          const data = time.data();
          freetimes.push({
            id: time.id,
            from: new Date(data?.from),
            until: new Date(data?.until),
            ...data,
          });
        });
        res.status(200).json(freetimes);
      } else if(req.body?.isDelete) {

          const deleteTime = await deleteDoc(doc(db, "freetimes", req.body.id));
          res.status(200).json({ message: "This free time range successfully deleted.", success: true});
      } else if (req.body?.isUpdate){

        if(req.body?.id){
          const update = await updateDoc(doc(db, "freetimes", req.body.id), {
            from: parseInt(req.body.from),
            until: parseInt(req.body.until),
            maxClient: parseInt(req.body.maxClient)
          });
          res.status(200).json({ message: "This free time range successfully updated.", success: true });
        }
      } else {

        const { id } = await addDoc(collection(db, "freetimes"), req.body);
        if(id){
          res.status(200).json({ message: "This free time range successfully added.", success: true });
        } else {
          res.status(400).json({ message: "This free time range successfully updated.", success: false });
        }
      }
      
      break;

    default:
      break;
  }
}
