import GRAPHQL from "./GRAPHQL";
import TRPC from "./TRPC";

export function App() {
  return (
    <div
      style={{
        height: 300,
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div>
        <b>Passion For Code</b>
      </div>
      <GRAPHQL />
      <TRPC />
    </div>
  );
}

export default App;
