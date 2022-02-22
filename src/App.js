import { useState } from "react";
import Header from "./Header";
import HomePage from "./Main";
import Pomodoro from "./Main/Pomo";
import SettingContext from "./Main/Pomo/SettingContext";

function App() {
  const [pomoMinute, setPomoMinute] = useState(25);
  const [shortBreakMinute, setShortBreakMinute] = useState(5);
  const [longBreakMinute, setLongBreakMinute] = useState(15);
  const [showSetting, setShowSetting] = useState(false);
  const [autoBreak, setAutoBreak] = useState(false);
  const [autoPomo, setAutoPomo] = useState(false);
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
        <SettingContext.Provider
          value={{
            pomoMinute,
            setPomoMinute,
            shortBreakMinute,
            setShortBreakMinute,
            longBreakMinute,
            setLongBreakMinute,
            showSetting,
            setShowSetting,
            autoBreak,
            setAutoBreak,
            autoPomo,
            setAutoPomo,
          }}
        >
          <Header />
          <HomePage />
        </SettingContext.Provider>
      </main>
    </div>
  );
}

export default App;
