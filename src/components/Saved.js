import React, { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "./firebase/Firebase";
import QuestionCard from "./QuestionCard";
import Navbar from "../components/Navbar";

const SavedQuestions = () => {
  const [savedQuestions, setSavedQuestions] = useState([]);
  const [streak, setStreak] = useState(
    localStorage.getItem("streak")
      ? parseInt(localStorage.getItem("streak"))
      : 0
  );
  const [mobileDimension, setMobileDimension] = useState(false);
  const [xp, setXP] = useState(
    localStorage.getItem("xp") ? parseInt(localStorage.getItem("xp")) : 0
  );

  useEffect(() => {
    const userEmail = localStorage.getItem("email");
    const userDocRef = doc(db, "users", userEmail);

    const unsubscribe = onSnapshot(userDocRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        setSavedQuestions(docSnapshot.data().cards || []);
      } else {
        console.log("No such document!");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="App" style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <Navbar setMobileDimension={setMobileDimension} />
      <div style={{ width: "5%" }}></div>
      <div style={{ flex: 1, height: "100%", overflow: "auto", padding: "20px" }}>
        <h2>Saved Questions</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0% 20%" }}>
          {savedQuestions.length > 0 ? (
            savedQuestions.map((questionData, index) => (
              <QuestionCard
                key={index}
                question={questionData.question}
                choices={questionData.choices}
                answer={questionData.answer}
                selectedAnswer={questionData.selectedAnswer}
                setStreak={setStreak}
                setXP={setXP}
                title={questionData.title && questionData.title}
                color={questionData.color && questionData.color}
                fullJSON={questionData}
              />
            ))
          ) : (
            <p>No saved questions yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SavedQuestions;
