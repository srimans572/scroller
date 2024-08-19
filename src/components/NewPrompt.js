import React, { useEffect, useState } from "react";
import { db } from "./firebase/Firebase";
import { doc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
var randomColor = require("randomcolor"); // import the script

function NewPrompt({ setOpenNewTopic }) {
  const [promptMode, setPromptMode] = useState(1);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [subject, setSubject] = useState("");
  const [tag, setTage] = useState("fa-solid fa-calculator")

  const saveToFirestore = async () => {
    try {
      const color = randomColor();
      await updateDoc(doc(db, "users", localStorage.getItem("email")), {
        sets: arrayUnion({
          title: title,
          content: content,
          subject: subject,
          promptMode: promptMode,
          color: color,
          tag: tag
        }),
      });
      setOpenNewTopic(false);
      localStorage.setItem(
        "currentSet",
        JSON.stringify({
          title: title,
          content: content,
          subject: subject,
          promptMode: promptMode,
          color: color,
          tag:tag
        })
      );
    } catch (e) {
      console.log(e);
      setOpenNewTopic(false);
    }
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
  };

  return (
    <div
      style={{
        flexDirection: "column",
        width: "350px",
        height: "90vh",
        position: "absolute",
        right: "1%",
        zIndex: "9999",
        top: "20px",
        background: "white",
        boxShadow: "0px 0px 16px 1px gainsboro",
        borderRadius: "10px",
        display: "flex",
        padding: "20px",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex" }}>
        <div
          onClick={() => setPromptMode(1)}
          style={{
            borderBottom:
              promptMode === 1 ? "1px solid black" : "1px solid gainsboro",
            marginRight: "10px",
            padding: "10px",
            cursor: "pointer",
          }}
        >
          <p style={{ margin: "0px" }}>My content</p>
        </div>
        <div
          onClick={() => setPromptMode(2)}
          style={{
            borderBottom:
              promptMode === 2 ? "1px solid black" : "1px solid gainsboro",
            marginRight: "10px",
            padding: "10px",
            cursor: "pointer",
          }}
        >
          <p style={{ margin: "0px" }}>From scratch</p>
        </div>
      </div>
      <div>
        <div style={{ width: "100%", marginBottom: "10px" }}>
          <p style={{ fontSize: "20px", margin: "0px" }}>Title</p>
          <p style={{ marginTop: "4px", fontSize: "12px", color: "gray" }}>
            Set a title for your AI generated scrolls, so it's easy to access
            later.
          </p>
          <input
            value={title}
            onChange={handleTitleChange}
            style={{
              outline: "1px solid gainsboro",
              border: "none",
              borderRadius: "10px",
              padding: "10px 5px",
              width: "100%",
              boxSizing: "border-box",
            }}
          />
        </div>
        {promptMode === 1 ? (
          <div style={{ width: "100%", marginBottom: "10px" }}>
            <p style={{ fontSize: "20px", margin: "0px" }}>Content</p>
            <p style={{ margin: "4px 0px", fontSize: "12px", color: "gray" }}>
              Copy and paste your notes, lectures or any other textual content.
            </p>
            <div
              style={{
                outline: "1px solid gainsboro",
                border: "none",
                borderRadius: "10px",
                width: "100%",
                boxSizing: "border-box",
                height: "35vh",
              }}
            >
              <textarea
                value={content}
                onChange={handleContentChange}
                style={{
                  outline: "none",
                  border: "none",
                  borderRadius: "10px",
                  width: "100%",
                  boxSizing: "border-box",
                  resize: "none",
                  padding: "10px",
                  height: "90%",
                }}
                maxLength={6000}
              />
              <p
                style={{
                  textAlign: "end",
                  fontSize: "12px",
                  color: "gray",
                  padding: "0px 10px",
                }}
              >
                {content.length}/6000
              </p>
            </div>
          </div>
        ) : (
          <div style={{ width: "100%", marginBottom: "10px" }}>
            <p style={{ fontSize: "20px", margin: "0px" }}>Subject</p>
            <p style={{ margin: "4px 0px", fontSize: "12px", color: "gray" }}>
              Be as specific as possible for the best results while using
              Scroller.
            </p>
            <div
              style={{
                outline: "1px solid gainsboro",
                border: "none",
                borderRadius: "10px",
                width: "100%",
                boxSizing: "border-box",
                height: "34vh",
              }}
            >
              <textarea
                value={subject}
                onChange={handleSubjectChange}
                style={{
                  outline: "none",
                  border: "none",
                  borderRadius: "10px",
                  width: "100%",
                  boxSizing: "border-box",
                  resize: "none",
                  padding: "10px",
                  height: "90%",
                }}
                placeholder="Chain rule for AP Calculus BC..."
                maxLength={6000}
              />
              <p
                style={{
                  textAlign: "end",
                  fontSize: "12px",
                  color: "gray",
                  padding: "0px 10px",
                }}
              >
                {subject.length}/6000
              </p>
            </div>
          </div>
        )}
        <div style={{ width: "100%", marginBottom: "10px" }}>
          <p style={{ fontSize: "20px", margin: "0px" }}>Tag</p>
          <p style={{ margin: "4px 0px", fontSize: "12px", color: "gray" }}>
            Fun little decoration for you to add.
          </p>
          <select 
          onChange={async(e)=>setTage(e.target.value)}
          value={tag}
          name="subjects" id="subjects" style={{width:"100%", padding:"5px", borderRadius:"10px", border:"none", outline:"none", cursor:"pointer"}}>
            <option value="fa-solid fa-calculator">🔢 Algebra</option>
            <option value="fa-solid fa-dna">🧬 Biology</option>
            <option value="fa-solid fa-infinity">∫ Calculus</option>
            <option value="fa-solid fa-flask-vial">🧪 Chemistry</option>
            <option value="fa-solid fa-code">💻 Computer Science</option>
            <option value="fa-solid fa-book">
              📚 English Language Arts
            </option>
            <option value="fa-solid fa-seedling">
            ♻️ Environmental Science
            </option>
            <option value="fa-solid fa-map">🗺️ Geography</option>
            <option value="fa-solid fa-stopwatch">🔭 Physics</option>
            <option value="fa-solid fa-brain">🧠 Psychology</option>
            <option value="fa-solid fa-chart-simple">📊 Statistics</option>
            <option value="fa-solid fa-usa-flag">🇺🇸 U.S. History</option>
            <option value="fa-solid fa-globe">🌎 World History</option>
          </select>
        </div>
      </div>
      <div>
        <button
          onClick={() => saveToFirestore(false)}
          style={{
            width: "100%",
            background: "transparent",
            border: "1px solid gainsboro",
            padding: "10px",
            borderRadius: "10px",
            cursor: "pointer",
          }}
        >
          Save
        </button>
      </div>
      {
        <div
          onClick={() => setOpenNewTopic(false)}
          style={{ position: "absolute", right: "30px", cursor: "pointer" }}
        ></div>
      }
    </div>
  );
}

export default NewPrompt;
