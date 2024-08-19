import AuthBox from "../components/AuthBox";

function Auth() {
  return (
    <div
      className="App"
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1 style={{ margin: "10px 0px", textShadow: "2px 2px 5px orange" }}>
          Scro<span style={{ fontStyle: "italic" }}>ll</span>er
        </h1>
        <br></br>
      </div>
      <AuthBox></AuthBox>
    </div>
  );
}

export default Auth;
