import { useState } from "react";
import HomePage from "./Main";
import SettingContext from "./SettingContext";

function App() {
  const [pomoMinute, setPomoMinute] = useState(25);
  const [shortBreakMinute, setShortBreakMinute] = useState(5);
  const [longBreakMinute, setLongBreakMinute] = useState(15);
  const [showSetting, setShowSetting] = useState(false);
  const [autoBreak, setAutoBreak] = useState(false);
  const [autoPomo, setAutoPomo] = useState(false);
  const [pomoBackground, setPomoBackground] = useState(true);
  const [shortBackground, setShortBackground] = useState(false);
  const [longBackground, setLongBackground] = useState(false);
  const [settingConfirm, setSettingConfirm] = useState(false);
  const [previousValuePomo, setPreviousValuePomo] = useState(pomoMinute);
  const [previousValueShort, setPreviousValueShort] =
    useState(shortBreakMinute);
  const [previousValueLong, setPreviousValueLong] = useState(longBreakMinute);
  const [showInputTask, setShowInputTask] = useState(false);

  return (
    <div>
      <main>
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
            shortBackground,
            pomoBackground,
            longBackground,
            setShortBackground,
            setPomoBackground,
            setLongBackground,
            settingConfirm,
            setSettingConfirm,
            previousValuePomo,
            setPreviousValuePomo,
            previousValueShort,
            previousValueLong,
            setPreviousValueShort,
            setPreviousValueLong,
            showInputTask,
            setShowInputTask,
          }}
        >
          <HomePage />
        </SettingContext.Provider>
      </main>
    </div>
  );
}
export default App;
