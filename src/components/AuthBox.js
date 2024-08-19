import React, { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "./firebase/Firebase";
import { db } from "./firebase/Firebase";
import { addDoc, setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const AuthBox = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [referalCode, setReferalCode] = useState("");
  const [mode, setMode] = useState(0);
  const navigate = useNavigate();
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      const myCode = Math.floor(Math.random() * 1000000000);
      console.log(user);
      await setDoc(doc(db, "users", email), {
        name: name,
        email: email,
        userType: "student",
        plan: "free",
        myCode: myCode,
        sets: [],
        cards: [],
      });
      console.log(document);
      localStorage.setItem("email", email);
      navigate("/");
    } catch (e) {
      console.log(e);
      setError(e.message);
    }
  };
  useEffect(() => {
    setError(false);
  }, [mode]);

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log(user);
      localStorage.setItem("email", email);
      navigate("/");
    } catch (e) {
      console.log(e);
      setError(e.message);
    }
  };

  const logOut = async () => {
    await signOut(auth);
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        padding: "30px 70px",
        width: "300px",
        height: "fit-content",
        borderRadius: "10px",
        boxShadow: "0px 1px 1px 1px gainsboro",
        marginBottom:"100px",
        
      }}
    >
      {error && (
        <div
          style={{
            height: "50px",
            width: "300px",
            backgroundColor: "tomato",
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p>
            Oops!
            {mode == 1
              ? " We can't find this account!"
              : " We encountered a problem."}
          </p>
        </div>
      )}
      <h2>Hi! 👋</h2>
      <form onSubmit={handleSubmit}>
        {mode == 0 && (
          <div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                margin: "20px 0px",
              }}
            >
              <label>Name</label>
              <input
                style={{
                  marginTop: "10px",
                  padding: "10px",
                  borderRadius: "10px",
                  border: "none",
                  outline: "1px solid gainsboro",
                }}
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                margin: "20px 0px",
              }}
            >
              <label>Referal Code</label>
              <input
                style={{
                  marginTop: "10px",
                  padding: "10px",
                  borderRadius: "10px",
                  border: "none",
                  outline: "1px solid gainsboro",
                }}
                type="text"
                placeholder="Enter the 10 Digit Referal Code"
                value={referalCode}
                onChange={(e) => setReferalCode(e.target.value)}
                maxLength="10"
              />
            </div>
          </div>
        )}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            margin: "20px 0px",
          }}
        >
          <label>Your email address</label>
          <input
            style={{
              marginTop: "10px",
              padding: "10px",
              borderRadius: "10px",
              border: "none",
              outline: "1px solid gainsboro",
            }}
            type="email"
            placeholder="johndoe07@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            margin: "20px 0px",
          }}
        >
          <label>Password</label>
          <input
            style={{
              marginTop: "10px",
              padding: "10px",
              borderRadius: "10px",
              border: "none",
              outline: "1px solid gainsboro",
            }}
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {mode == 1 ? (
          <button
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "black",
              border: "none",
              color: "white",
              borderRadius: "100px",
              cursor: "pointer",
            }}
            type="submit"
            onClick={async () => login()}
          >
            Login
          </button>
        ) : (
          <div>
            <p
              style={{
                fontSize: "10px",
                textAlign: "center",
                marginBottom: "10px",
              }}
            >
              By signing up, you agree to our privacy policy
            </p>
            <button
              style={{
                width: "100%",
                padding: "10px",
                backgroundColor: "black",
                borderRadius: "100px",
                border: "none",
                color: "white",
                cursor: "pointer",
              }}
              type="submit"
              onClick={async () => register()}
            >
              Sign Up
            </button>
          </div>
        )}

        <br></br>

        {mode == 1 ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <p style={{ fontSize: "14px", margin: "30px 0px" }}>
              New to Scroller?{" "}
            </p>

            <p
              style={{ fontSize: "14px", cursor: "pointer" }}
              onClick={async () => setMode(0)}
            >
              Sign Up
            </p>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <p style={{ fontSize: "14px", margin: "10px 0px" }}>
              Have an account already?{" "}
            </p>
            <br></br>
            <p
              style={{ fontSize: "14px", cursor: "pointer" }}
              onClick={async () => setMode(1)}
            >
              Sign In
            </p>
          </div>
        )}
      </form>
    </div>
  );
};

export default AuthBox;
