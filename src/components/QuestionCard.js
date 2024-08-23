import React, { useState, useEffect } from "react";
import "../index.css";
import Latex from "react-latex-next";
import "katex/dist/katex.min.css";
import correct from "../assets/correct-answer-sound-effect-19.wav";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore"; // Import necessary Firebase methods
import { db } from "./firebase/Firebase";



const QuestionCard = ({
  question,
  choices,
  answer,
  setStreak,
  selectedAnswer,
  setXP,
  title,
  color,
  fullJSON,
}) => {
  const cardStyle = {
    cardColor: "whitesmoke",
    textColor: "black",
    buttonColor: "whitesmoke",
  };
  const [selectedChoice, setSelectedChoice] = useState(selectedAnswer);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showPlus10, setShowPlus10] = useState(false);
  const [shake, setShake] = useState(false);

  // Retrieve favorites from local storage, or initialize with an empty array
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );

  useEffect(() => {
    // Update local storage whenever favorites change
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const formatBoldText = (text) => {
    try {
      const parts = text.split(/(\*\*[^*]+\*\*)/g);
      return parts.map((part, index) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <b style={{}} key={index}>
              <Latex>{part.slice(2, -2)}</Latex>
            </b>
          );
        }
        return <Latex key={index}>{part}</Latex>;
      });
    } catch {}
  };

  const handleChoiceClick = (choice) => {
    if (isAnswered) return;
    setSelectedChoice(choice);
    setIsAnswered(true);
    if (choice === answer) {
      setStreak((prevStreak) => prevStreak + 1);
      setXP((prevXP) => prevXP + 10);
      triggerPlus10Animation();
      //correctAudio.play();
    } else {
      setStreak(0);
      triggerShakeAnimation();
    }
  };

  const triggerPlus10Animation = () => {
    setShowPlus10(true);
    setTimeout(() => {
      setShowPlus10(false);
    }, 1500);
  };

  const triggerShakeAnimation = () => {
    setShake(true);
    setTimeout(() => {
      setShake(false);
    }, 500);
  };


  const handleHeartClick = async () => {
    const existingFavorites =
      JSON.parse(localStorage.getItem("favorites")) || [];
  
    const userEmail = localStorage.getItem("email"); // Get the user's email
    const userDocRef = doc(db, "users", userEmail); // Reference to the user's document in Firebase
  
    try {
      if (existingFavorites.some((fav) => fav.question === fullJSON.question)) {
        // Remove from favorites in local storage
        const updatedFavorites = existingFavorites.filter(
          (fav) => fav.question !== fullJSON.question
        );
        setFavorites(updatedFavorites);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  
        // Remove the fullJSON object from the 'cards' field in Firebase
        await updateDoc(userDocRef, {
          cards: arrayRemove(fullJSON),
        });
      } else {
        console.log(selectedAnswer);
        const newJSON = {
          question,
          choices,
          answer,
          setStreak,
          selectedAnswer,
          setXP,
          title,
          color,
          fullJSON,
        };
  
        // Add to favorites in local storage
        const updatedFavorites = [...existingFavorites, newJSON];
        setFavorites(updatedFavorites);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  
        // Add the fullJSON object to the 'cards' field in Firebase
        await updateDoc(userDocRef, {
          cards: arrayUnion(fullJSON),
        });
      }
    } catch (error) {
      console.error("Error updating favorites: ", error);
      alert("Error updating favorites.");
    }
  };
  

  const isFavorite = favorites.some(
    (fav) => fav.question === fullJSON.question
  );

  return (
    <div>
      <div
        style={{
          height: "80vh",
          width: "370px",
          background: `${color}08`,
          margin: "50px 0px",
          borderRadius: "10px",
          boxShadow: "0px 0px 4px 1px gainsboro",
          padding: "10px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
          animation: shake ? "shake 0.5s ease-out" : "none",
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <p
              style={{
                margin: "0px",
                color: color,
                backgroundColor: `${color}08`,
                padding: "1px 15px",
                outline: `1px solid ${color}`,
                borderRadius: "100px",
                width: "fit-content",
              }}
            >
              {title}
            </p>
            <i
              onClick={handleHeartClick}
              style={{
                fontSize: "24px",
                color: isFavorite ? "hotpink" : "gainsboro",
                cursor: "pointer",
              }}
              className="fa-solid fa-heart"
            ></i>
          </div>
          <p
            style={{
              fontSize:
                question.length < 150
                  ? "30px"
                  : question.length < 400
                  ? "18px"
                  : "14px",
              marginTop: "20px",
              color: cardStyle.textColor,
              height: "300px",
              overflow: "scroll",
              marginBottom: "10px",
            }}
          >
            {formatBoldText(question)}
            {question.length > 500 && (
              <p
                style={{
                  position: "absolute",
                  top: "-40px",
                  left: "50%",
                  background: "white",
                  padding: "5px 10px",
                  borderRadius: "100px",
                  transform: "translate(-50%, 0%)",
                }}
              >
                Scroll for More
              </p>
            )}
          </p>
        </div>
        <div style={{ overflow: "scroll" }}>
          {choices.map((choice, index) => (
            <p
              className="cardButton"
              key={index}
              style={{
                border: "1px solid gainsboro",
                padding: "10px",
                marginBottom: "10px",
                borderRadius: "10px",
                cursor: isAnswered ? "not-allowed" : "pointer",
                backgroundColor:
                  selectedChoice === choice
                    ? selectedChoice === answer
                      ? "palegreen"
                      : "salmon"
                    : isAnswered && choice === answer
                    ? "palegreen"
                    : cardStyle.buttonColor,
                opacity: isAnswered && selectedChoice !== choice ? 0.6 : 1,
                color: cardStyle.textColor,
              }}
              onClick={() => handleChoiceClick(choice)}
            >
              <Latex>{choice}</Latex>
            </p>
          ))}
        </div>

        {showPlus10 && <div className="plus10-animation">+10</div>}
      </div>
    </div>
  );
};

export default QuestionCard;
