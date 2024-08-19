import React from "react";
import CustomDropdown from "./Dropdown";

const Bottom = ({ streak, xp, sets, setCurrentSet, mobileDimension }) => {
  return (
    <div
      style={{
        display: "flex",
        zIndex: "9999",
        backgroundColor: "white",
        height: "50px",
        borderTop: "1px solid gainsboro",
        width: "100%",
        position: "absolute",
        bottom: "0px",
        right: "0px",
        margin: "0px",
        color: "black",
        justifyContent: "space-between",
        alignItems:"center"
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: mobileDimension ? "space-between" : "flex-start",
        
        }}
      >
        <p style={{ margin: "0px", padding: "15px 20px", fontSize:mobileDimension&&"10px" }}>
          <span style={{ fontWeight: "bold" }}>Streak 🔥</span>: {streak}
        </p>
        <p style={{ margin: "0px", padding: "15px 20px", fontSize:mobileDimension&&"10px" }}>
          <span style={{ fontWeight: "bold" }}>XP 🏆</span>: {xp}
        </p>
      </div>
      {!mobileDimension ? (
        <div
          style={{ display: "flex", padding: "0px 20px", alignItems: "center" }}
        >
          <p style={{ marginRight: "10px", fontSize: "10px" }}>Next Set:</p>
          <CustomDropdown sets={sets} setCurrentSet={setCurrentSet} />
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            padding: "0px 10px",
            alignItems: "center",   
          }}
        >
          <p style={{ marginRight: "10px", fontSize: "10px" }}>Next Set:</p>
          <CustomDropdown sets={sets} setCurrentSet={setCurrentSet} />
        </div>
      )}
    </div>
  );
};

export default Bottom;
