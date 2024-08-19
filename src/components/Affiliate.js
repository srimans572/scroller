import React, { useState, useEffect } from "react";
import NewPrompt from "./NewPrompt";
import { getDoc, onSnapshot, doc } from "firebase/firestore";
import { db } from "./firebase/Firebase";
import Plans from "./Plans";

const Affiliate = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [planType, setPlanType] = useState();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1 style={{ margin: "40px 50px" }}>Scroller Affiliate Program</h1>
      <div
        style={{
          flexDirection: "column",
          padding: "10px 20px",
          margin: "0px 50px",
          display: "flex",
          width: "500px",
          boxSizing: "border-box",
          backgroundColor: "whitesmoke",
          outline: "1px solid gainsboro",
          borderRadius: "10px",
          height: "fit-content",
        }}
      >
        <h2 style={{ textAlign: "center" }}>
          Welcome to the{" "}
          <span
            style={{
              background: "linear-gradient(to right, #FF9100 0%, #CF0B0B 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              display: "inline-block",
              fontWeight: "bold",
            }}
          >
            {" "}
            Scroller Affiliate Program
          </span>
        </h2>
        <br></br>
        <p style={{lineHeight:"30px"}}>
          Join our team to get more users on board with Scroller! With every 100
          referral sign ups, earn{" "}
          <span
            style={{
              background: "linear-gradient(to right, #FF9100 0%, #CF0B0B 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              display: "inline-block",
              fontWeight: "bold",
              fontSize: "20px",
            }}
          >
            {" "}
            {"$10 "}
          </span>{" "}
          in cash. For every user who purchases the{" "}
          <span
            style={{ textShadow: "0px 0px 10px orange", fontWeight: "bold" }}
          >
            Scroller 4 Life
          </span>{" "}
          plan, earn  <span
            style={{
              background: "linear-gradient(to right, #FF9100 0%, #CF0B0B 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              display: "inline-block",
              fontWeight: "bold",
              fontSize: "20px",
            }}
          >
            {" "}
            {"$20 "}
          </span> dollars in cash. The freebies don't stop there. Get more people on board to access  <span
            style={{
              background: "linear-gradient(to right, #FF9100 0%, #CF0B0B 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              display: "inline-block",
              fontWeight: "bold",
              fontSize: "20px",
            }}
          >
            {" "}
            {"exclusive "}
          </span> rewards like our merchandise. So what are you waiting for? Access your unique referral code below.
        </p>
      </div>
      <br></br>
      <h1 style={{fontWeight:"normal"}}>Your referal code:</h1>
      <h1 style={{padding:"5px 10px", background:"#fcfcfc", borderRadius:"5px", outline:"1px solid orange"}}>Coming Soon</h1>
    </div>
  );
};

export default Affiliate;
