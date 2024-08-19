import React, { useState, useEffect } from "react";
import NewPrompt from "./NewPrompt";
import { getDoc, onSnapshot, doc } from "firebase/firestore";
import { db } from "./firebase/Firebase";
const MyLibrary = () => {
  const [sets, setSets] = useState([]);
  const [newPrompt, setNewPrompt] = useState("");
  const [openNewTopic, setOpenNewTopic] = useState(false);

  useEffect(() => {
    try {
      const document = onSnapshot(
        doc(db, "users", localStorage.getItem("email")),
        (doc) => {
          setSets(doc.data().sets);
        }
      );
    } catch (error) {
      alert("Error");
    }
  }, []);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}
    >
      <h1 style={{ margin: "40px 50px" }}>My Library</h1>
      <div style={{ margin: "5px 50px", display:"flex", flexDirection:"row", flexWrap:"wrap" }}>
        <div
          style={{
            width: "200px",
            height: "200px",
            boxShadow: "0px 0px 16px 1px gainsboro",
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            margin:"10px 50px 0px 0px"
          }}
          onClick={async () => setOpenNewTopic(!openNewTopic)}
        >
          <p>Add New Subject</p>
        </div>
        {sets &&
        sets.map((item, index)=>(
          <div
          style={{
            width: "200px",
            height: "200px",
            boxShadow: `0px 0px 1px 1px ${item.color}`,
            borderRadius: "10px",
            display: "flex",           
            cursor: "pointer",
            margin:"10px 50px 0px 0px",
            backgroundColor:`${item.color}10`,
            flexDirection:"column",
            justifyContent:"space-between"
          }}
        >
          <h1 style={{color:"navy", textOverflow:"clip", padding:"0px 10px", color:`${item.color}`}}>{item.title}</h1>
          <i style={{position:"relative", fill:item.color, fillOpacity:0.5, bottom:"10px", fontSize:"50px", left:"140px", color:item.color}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className={item.tag}></i>
        </div>
        ))
      }
      </div>
      {openNewTopic && (
        <NewPrompt setOpenNewTopic={setOpenNewTopic}></NewPrompt>
      )}
     
    </div>
  );
};

export default MyLibrary;
