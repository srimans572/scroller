import React from "react";
import {loadStripe} from "@stripe/stripe-js"
import { async } from "@firebase/util";

const Plans = ({ planType }) => {

  const item ={
    price:"price_1PnC5hKU472eG61vQgz1hUnm",
    quantity:1
  }

  const checkoutOptions = {
    lineItems: [item],
    mode:"payment",
    successUrl:`${window.location.origin}/`,
    cancelUrl:`${window.location.origin}/`
  }
  let stripePromise

  const getStripe = () => {
    if(!stripePromise){
       stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_KEY}`)
    }
    return stripePromise;
  }

  const redirectToCheckout = async () =>{
    console.log("redirectingToCheckout")
    const stripe = await getStripe();
    const {error} = await stripe.redirectToCheckout(checkoutOptions)
    console.log(error)
  }

  return (
    <div
      style={{
        margin: "0px 50px",
        display: "flex",
        width: "92%",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
      }}
    >
      <div
        style={{
          width: "300px",
          height: "600px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "10px",
          background: "#fcfcfc",
          borderRadius: "10px",
          outline: "1px solid gainsboro",
          marginBottom:"100px"
        }}
      >
        <h1 style={{ }}>Free</h1>
        <br></br>
        <br></br>
        <p style={{ fontSize: "14px" }}>Try it out; get a break from brainrot</p>
        <br></br>
        <h1
          style={{
            fontSize: "70px",
            borderTop: "1px solid orange",
            borderBottom: "1px solid orange",
          }}
        >
          $0
          <span style={{ fontSize: "15px", fontWeight: "normal" }}>
            /forever
          </span>
        </h1>
        <br></br>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            lineHeight: "35px",
            listStyle: "none",
          }}
        >
          <li>✅ Unlimited Scrolling</li>
          <li>✅ Unlimted Subjects<span style={{fontSize:"10px"}}> (Till September 5th)</span></li>
          <li>❌ No Ads</li>
          <li>❌ Early Acccess to New Features</li>
          <li>❌ No Priority Customer Support</li>
          <li>❌ Help us support you</li>
          <li>❌ No Access to Scroller Benefits</li>
        </div>
        <button
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "black",
            borderRadius: "100px",
            border: "none",
            color: "white",
            cursor: "pointer",
            marginTop: "20px",
          }}
        >
          {planType == "free" && "Current"}
        </button>
      </div>
      <div
        style={{
          width: "300px",
          height: "620px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "10px",
          background: "#fcfcfc",
          borderRadius: "10px",
          outline: "1px solid black",
          boxShadow: "5px 5px 1px 1px orange",
        }}
      >
        <h1 style={{textShadow: "0px 0px 10px orange"}}>Scroller+</h1>
        <br></br>
        <br></br>
        <p style={{ fontSize: "14px" }}>For those locked out to lock in</p>
        <br></br>
        <h1
          style={{
            fontSize: "70px",
            borderTop: "1px solid orange",
            borderBottom: "1px solid orange",
          }}
        >
          $3
          <span style={{ fontSize: "15px", fontWeight: "normal" }}>/month</span>
        </h1>
        <br></br>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            lineHeight: "35px",
            listStyle: "none",
          }}
        >
          <li>✅ Unlimited Scrolling</li>
          <li>✅ Unlimited Subjects</li>
          <li>✅ Access Premade Scrolls <span style={{fontSize:"10px"}}>(Coming Soon)</span></li>
          <li>✅ Access to Themes <span style={{fontSize:"10px"}}>(Coming Soon)</span></li>
          <li>✅ No Ads</li>
          <li>✅ Early Acccess to New Features</li>
          <li>✅ Priority Customer Support</li>
          <li>✅ Exclusive Newsletter </li>

        </div>
        <button
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "black",
            borderRadius: "100px",
            border: "none",
            color: "white",
            cursor: "pointer",
            marginTop: "20px",
          }}
        >
          Coming Soon
        </button>
      </div>
      <div
        style={{
          width: "300px",
          height: "600px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "10px",
          background: "#fcfcfc",
          borderRadius: "10px",
          outline: "1px solid black",
          boxShadow: "5px 5px 1px 1px orange",
        }}
      >
        <h1 style={{textShadow: "0px 0px 10px orange"}}>Scroller 4 Life</h1>
        <span class="sale">-25%</span>
        <br></br>
        <br></br>
        <p style={{ fontSize: "14px" }}>You'll never touch TikTok again.</p>
        <br></br>
        <h1
          style={{
            fontSize: "70px",
            borderTop: "1px solid orange",
            borderBottom: "1px solid orange",
          }}
        >
          $45
          <span style={{ fontSize: "15px", fontWeight: "normal" }}>/ lifetime</span>
        </h1>
        <br></br>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            lineHeight: "40px",
            listStyle: "none",
          }}
        >
          <li>✅ Everything in Scroller+</li>
          <li>✅ Thank You Letter</li>
          <li>✅ Support Us</li>
          <li>✅ Exclusive Perks <span style={{fontSize:"10px"}}>(more details later)</span></li>
        </div>
        <button
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "black",
            borderRadius: "100px",
            border: "none",
            color: "white",
            cursor: "pointer",
            marginTop: "60px",
          }}
        >
          Coming Soon
        </button>
      </div>
    </div>
  );
};

export default Plans;
