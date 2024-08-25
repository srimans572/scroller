import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "./firebase/Firebase";
import { useNavigate } from "react-router-dom";

const Navbar = ({ setMobileDimension }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    signOut(auth)
      .then(() => {
        console.log("s");
        localStorage.clear();
        navigate("/auth");
      })
      .catch((error) => {
        console.log("e");
      });
  };

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      setMobileDimension(mobile);
      if (!mobile) {
        setIsExpanded(true); // Ensure navbar is visible on larger screens
      } else {
        setIsExpanded(false);
      }
    };

    handleResize(); // Check on initial load
    window.addEventListener("resize", handleResize); // Add resize listener

    return () => {
      window.removeEventListener("resize", handleResize); // Cleanup listener on component unmount
    };
  }, []);

  const toggleNavbar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      {isMobile && (
        <div
          style={{
            fontSize: "24px",
            color: "black",
            top: "10px",
            cursor: "pointer",
            position: "fixed",
            left: "10px",
            zIndex: "1100",
            display: "block", // Always show hamburger on mobile
          }}
          onClick={toggleNavbar}
        >
          {isExpanded ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
              height={15}
            >
              <path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z" />
            </svg>
          ) : (
            "☰"
          )}
        </div>
      )}
      <div
        style={{
          display: isExpanded ? "flex" : "none",
          flexDirection: "column",
          width: "220px",
          height: "100vh",
          borderRight: "1px solid gainsboro",
          marginRight: isMobile ? "0px" : "0px",
          zIndex: "1000",
          color: "black",
          position: isExpanded && isMobile ? "absolute" : "relative",
          transition: "transform 0.3s ease",
          transform:
            isExpanded || !isMobile ? "translateX(0)" : "translateX(-100%)",
          backgroundColor: "#fcfcfc",
        }}
      >
        <h1 style={{ margin: "50px 15px", textShadow: "2px 2px 5px orange" }}>
          Scro<span style={{ fontStyle: "italic" }}>ll</span>er
        </h1>
        <Link
          to={"/"}
          style={{
            display: "flex",
            alignItems: "center",
            padding: "20px",
            color: "black",
            textDecoration: "none",
            display: "flex",
            width: "80px",
            justifyContent: "space-between",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 576 512"
            height={20}
          >
            <path d="M575.8 255.5c0 18-15 32.1-32 32.1l-32 0 .7 160.2c0 2.7-.2 5.4-.5 8.1l0 16.2c0 22.1-17.9 40-40 40l-16 0c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1L416 512l-24 0c-22.1 0-40-17.9-40-40l0-24 0-64c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32 14.3-32 32l0 64 0 24c0 22.1-17.9 40-40 40l-24 0-31.9 0c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2l-16 0c-22.1 0-40-17.9-40-40l0-112c0-.9 0-1.9 .1-2.8l0-69.7-32 0c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" />
          </svg>
          <span>Home</span>
        </Link>
        <Link
          to={"/library"}
          style={{
            display: "flex",
            alignItems: "center",
            padding: "20px",
            color: "black",
            textDecoration: "none",
            display: "flex",
            width: "113px",
            justifyContent: "space-between",
          }}
        >
          <svg
            fill="#000000"
            width="20px"
            height="20px"
            viewBox="0 0 32 32"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>books</title>
            <path d="M30.156 26.492l-6.211-23.184c-0.327-1.183-1.393-2.037-2.659-2.037-0.252 0-0.495 0.034-0.727 0.097l0.019-0.004-2.897 0.776c-0.325 0.094-0.609 0.236-0.86 0.42l0.008-0.005c-0.49-0.787-1.349-1.303-2.33-1.306h-2.998c-0.789 0.001-1.5 0.337-1.998 0.873l-0.002 0.002c-0.5-0.537-1.211-0.873-2-0.874h-3c-1.518 0.002-2.748 1.232-2.75 2.75v24c0.002 1.518 1.232 2.748 2.75 2.75h3c0.789-0.002 1.5-0.337 1.998-0.873l0.002-0.002c0.5 0.538 1.211 0.873 2 0.875h2.998c1.518-0.002 2.748-1.232 2.75-2.75v-16.848l4.699 17.54c0.327 1.182 1.392 2.035 2.656 2.037h0c0.001 0 0.003 0 0.005 0 0.251 0 0.494-0.034 0.725-0.098l-0.019 0.005 2.898-0.775c1.182-0.326 2.036-1.392 2.036-2.657 0-0.252-0.034-0.497-0.098-0.729l0.005 0.019zM18.415 9.708l5.31-1.423 3.753 14.007-5.311 1.422zM18.068 3.59l2.896-0.776c0.097-0.027 0.209-0.043 0.325-0.043 0.575 0 1.059 0.389 1.204 0.918l0.002 0.009 0.841 3.139-5.311 1.423-0.778-2.905v-1.055c0.153-0.347 0.449-0.607 0.812-0.708l0.009-0.002zM11.5 2.75h2.998c0.69 0.001 1.249 0.56 1.25 1.25v3.249l-5.498 0.001v-3.25c0.001-0.69 0.56-1.249 1.25-1.25h0zM8.75 23.25h-5.5v-14.5l5.5-0.001zM10.25 8.75l5.498-0.001v14.501h-5.498zM4.5 2.75h3c0.69 0.001 1.249 0.56 1.25 1.25v3.249l-5.5 0.001v-3.25c0.001-0.69 0.56-1.249 1.25-1.25h0zM7.5 29.25h-3c-0.69-0.001-1.249-0.56-1.25-1.25v-3.25h5.5v3.25c-0.001 0.69-0.56 1.249-1.25 1.25h-0zM14.498 29.25h-2.998c-0.69-0.001-1.249-0.56-1.25-1.25v-3.25h5.498v3.25c-0.001 0.69-0.56 1.249-1.25 1.25h-0zM28.58 27.826c-0.164 0.285-0.43 0.495-0.747 0.582l-0.009 0.002-2.898 0.775c-0.096 0.026-0.206 0.041-0.319 0.041-0.575 0-1.060-0.387-1.208-0.915l-0.002-0.009-0.841-3.14 5.311-1.422 0.841 3.14c0.027 0.096 0.042 0.207 0.042 0.321 0 0.23-0.063 0.446-0.173 0.63l0.003-0.006z"></path>
          </svg>
          <span>My Library</span>
        </Link>
        <Link
          to="/profile"
          style={{
            display: "flex",
            alignItems: "center",
            padding: "20px",
            color: "black",
            textDecoration: "none",
            display: "flex",
            width: "80px",
            justifyContent: "space-between",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height={20}
            viewBox="0 0 448 512"
          >
            <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z" />
          </svg>
          <span>Profile</span>
        </Link>
        <Link
          to="/affiliate"
          style={{
            display: "flex",
            alignItems: "center",
            padding: "20px",
            color: "black",
            textDecoration: "none",
            display: "flex",
            width: "90px",
            justifyContent: "space-between",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512"
            height={20}
          >
            <path d="M160 0c17.7 0 32 14.3 32 32l0 35.7c1.6 .2 3.1 .4 4.7 .7c.4 .1 .7 .1 1.1 .2l48 8.8c17.4 3.2 28.9 19.9 25.7 37.2s-19.9 28.9-37.2 25.7l-47.5-8.7c-31.3-4.6-58.9-1.5-78.3 6.2s-27.2 18.3-29 28.1c-2 10.7-.5 16.7 1.2 20.4c1.8 3.9 5.5 8.3 12.8 13.2c16.3 10.7 41.3 17.7 73.7 26.3l2.9 .8c28.6 7.6 63.6 16.8 89.6 33.8c14.2 9.3 27.6 21.9 35.9 39.5c8.5 17.9 10.3 37.9 6.4 59.2c-6.9 38-33.1 63.4-65.6 76.7c-13.7 5.6-28.6 9.2-44.4 11l0 33.4c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-34.9c-.4-.1-.9-.1-1.3-.2l-.2 0s0 0 0 0c-24.4-3.8-64.5-14.3-91.5-26.3c-16.1-7.2-23.4-26.1-16.2-42.2s26.1-23.4 42.2-16.2c20.9 9.3 55.3 18.5 75.2 21.6c31.9 4.7 58.2 2 76-5.3c16.9-6.9 24.6-16.9 26.8-28.9c1.9-10.6 .4-16.7-1.3-20.4c-1.9-4-5.6-8.4-13-13.3c-16.4-10.7-41.5-17.7-74-26.3l-2.8-.7s0 0 0 0C119.4 279.3 84.4 270 58.4 253c-14.2-9.3-27.5-22-35.8-39.6c-8.4-17.9-10.1-37.9-6.1-59.2C23.7 116 52.3 91.2 84.8 78.3c13.3-5.3 27.9-8.9 43.2-11L128 32c0-17.7 14.3-32 32-32z" />
          </svg>
          <span>Affiliate</span>
        </Link>
        <Link
          to="https://forms.gle/aWnQhHmELkT1Mvhw6"
          style={{
            display: "flex",
            alignItems: "center",
            padding: "20px",
            color: "black",
            textDecoration: "none",
            display: "flex",
            width: "127px",
            justifyContent: "space-between",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            height={20}
          >
            <path d="M256 0c53 0 96 43 96 96l0 3.6c0 15.7-12.7 28.4-28.4 28.4l-135.1 0c-15.7 0-28.4-12.7-28.4-28.4l0-3.6c0-53 43-96 96-96zM41.4 105.4c12.5-12.5 32.8-12.5 45.3 0l64 64c.7 .7 1.3 1.4 1.9 2.1c14.2-7.3 30.4-11.4 47.5-11.4l112 0c17.1 0 33.2 4.1 47.5 11.4c.6-.7 1.2-1.4 1.9-2.1l64-64c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3l-64 64c-.7 .7-1.4 1.3-2.1 1.9c6.2 12 10.1 25.3 11.1 39.5l64.3 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c0 24.6-5.5 47.8-15.4 68.6c2.2 1.3 4.2 2.9 6 4.8l64 64c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0l-63.1-63.1c-24.5 21.8-55.8 36.2-90.3 39.6L272 240c0-8.8-7.2-16-16-16s-16 7.2-16 16l0 239.2c-34.5-3.4-65.8-17.8-90.3-39.6L86.6 502.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l64-64c1.9-1.9 3.9-3.4 6-4.8C101.5 367.8 96 344.6 96 320l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l64.3 0c1.1-14.1 5-27.5 11.1-39.5c-.7-.6-1.4-1.2-2.1-1.9l-64-64c-12.5-12.5-12.5-32.8 0-45.3z" />
          </svg>{" "}
          <span>Report Bugs</span>
        </Link>
        <div style={{ position: "absolute", bottom: "50px" }}>
          {localStorage.getItem("email") ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "20px",
                color: "black",
                textDecoration: "none",
                display: "flex",
                justifyContent: "space-between",
                width: "90px",
                cursor: "pointer",
              }}
              onClick={async () => logout()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height={20}
                viewBox="0 0 512 512"
              >
                <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" />
              </svg>
              <span>Log Out</span>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "20px",
                color: "black",
                textDecoration: "none",
                display: "flex",
                justifyContent: "space-between",
                width: "90px",
                cursor: "pointer",
              }}
              onClick={async () => navigate("/auth")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height={20}
                viewBox="0 0 512 512"
              >
                <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" />
              </svg>
              <span>Sign In</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
