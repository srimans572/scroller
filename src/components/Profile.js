import React, { useState, useEffect } from "react";
import NewPrompt from "./NewPrompt";
import { getDoc, onSnapshot, doc } from "firebase/firestore";
import { db } from "./firebase/Firebase";
import Plans from "./Plans";
import { useNavigate } from "react-router-dom";

const MyProfile = ({mobileDimension}) => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [planType, setPlanType] = useState();
  const navigate = useNavigate()
  useEffect(() => {
    try {
      const document = onSnapshot(
        doc(db, "users", localStorage.getItem("email")),
        (doc) => {
          setName(doc.data().name);
          setEmail(doc.data().email);
          setPlanType(doc.data().plan);
        }
      );
    } catch (error) {
      alert("Error");
    }
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center"
      }}
    >
      <h1 style={{ margin: "40px 50px" }}>My Profile</h1>
      <div style={{ margin: "0px 50px", display: "flex", width: "500px", flexDirection:mobileDimension&&"column" }}>
        <div
          style={{
            display: "flex",
            alignItems: "Center",
            justifyContent: "center",
            width: "200px",
            height: "200px",
            background: "whitesmoke",
            borderRadius: "10px",
            boxShadow: "0px 0px 4px 1px gainsboro",
            fontSize: "150px",
            fontWeight: "bold",
          }}
        >
          {name && name.slice(0, 1)}
        </div>
        <div
          style={{ marginLeft: "10px", flexDirection: "column", width: "60%" }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{}}>Name</label>
            <p
              style={{
                fontSize: "24px",
                outline: "1px solid gainsboro",
                padding: "5px",
                borderRadius: "10px",
              }}
            >
              {name && name}
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{}}>Email</label>
            <p
              style={{
                fontSize: "14px",
                width: "100%",
                outline: "1px solid gainsboro",
                padding: "5px",
                borderRadius: "10px",
              }}
            >
              {email && email}
            </p>
          </div>
          <div style={{flexDirection:'row', display:'flex'}}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{}}>Current Plan</label>
            <p
              style={{
                fontSize: "18px",
                padding: "5px 25px",
                background: "orange",
                borderRadius: "100px",
                textAlign: "center",
                marginTop: "10px",
                width: "fit-content",
              }}
            >
              {planType && planType}
            </p>
          </div>
          <div style={{width:'25%'}}></div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{}}>Your Favorites</label>
            <button
              style={{
                fontSize: "18px",
                padding: "5px 25px",
                background: "orange",
                borderRadius: "100px",
                textAlign: "center",
                marginTop: "10px",
                width: "fit-content",
                outline: "none"
                
              }}
              onClick={async () => navigate("/saved")}
            >
              Saved
            </button>
          </div>
          </div>
        </div>
      </div>
      <h1 style={{ margin: "40px 50px" }}>Plans</h1>
      <Plans planType={planType} />
    </div>
  );
};

export default MyProfile;
