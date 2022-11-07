import GRAPHQL from "./GRAPHQL";
import REST from "./REST";
import TRPC from "./TRPC";

export function App() {
  return (
    <div
      style={{
        height: 800,
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ fontSize: 35, margin: 10 }}>
        <b>Passion For Code</b>
      </div>
      <REST />
      <GRAPHQL />
      <TRPC />
    </div>
  );
}

export default App;
