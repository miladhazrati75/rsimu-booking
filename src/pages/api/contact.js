import { app, db } from "../../../firebaseConfig";
import { collection, addDoc, query, getDocs } from "firebase/firestore";

// import {add} from 'firebase/firestore'
export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      const doc_refs = await getDocs(collection(db, "contact"))

      const messages = []

      doc_refs.forEach(contact => {
          messages.push({
              id: contact.id,
              ...contact.data()
          })
      })
      res.status(200).json(messages)
      break;
    case "POST":
      const { id } = await addDoc(collection(db, "contact"), req.body);

      if(id){
        res.status(200).json({ message: "Your Message sent successfully.", success: true });
      } else {
        res.status(400).json({ message: "Unknown Error Occurred. Try Later", success: false });
      }
      break;

    default:
      break;
  }
  
}
