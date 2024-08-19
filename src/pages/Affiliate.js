import Affiliate from "../components/Affiliate";
import Navbar from "../components/Navbar";
import MyProfile from "../components/Profile";
import { useState } from "react";

function AffiliatePage() {
  const [mobileDimension, setMobileDimension] = useState(false);

  return (
    <div
      className="App"
      style={{ display: "flex", height: "100vh", overflow: "hidden" }}
    >
      <div>
        <Navbar setMobileDimension={setMobileDimension} />
      </div>
      <div style={{ flex: 1, padding: "10px", overflowY: "auto" }}>
       <Affiliate/>
      </div>
    </div>
  );
}

export default AffiliatePage;