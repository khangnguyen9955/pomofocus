import Header from "./Header";
import HomePage from "./Main";
import Pomodoro from "./Main/Pomo";

function App() {
  return (
    <div>
      <main
        style={{
          backgroundColor: "rgba(217,85,80)",
          width: "100%",
          height: "100%",
          color: "white",
          boxSizing: "border-box",
        }}
      >
        <Header />
        <HomePage />
      </main>
    </div>
  );
}

export default App;
