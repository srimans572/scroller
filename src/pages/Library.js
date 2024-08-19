import MyLibrary from "../components/MyLibrary";
import Navbar from "../components/Navbar";
import { useState } from "react";

function Library() {
  const [mobileDimension, setMobileDimension] = useState(false);
  return (
    <div
      className="App"
      style={{ display: "flex", height: "100vh", overflow: "hidden" }}
    >
      <div>
        <Navbar setMobileDimension={setMobileDimension}/>
      </div>
      <div style={{ flex: 1, padding: "10px", overflowY: "auto", justifyContent:mobileDimension&&"center", display:"flex", width:"100%" }}>
        <MyLibrary />
      </div>
    </div>
  );
}

export default Library;
