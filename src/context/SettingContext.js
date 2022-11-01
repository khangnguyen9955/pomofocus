import React, {createContext, useContext, useState} from "react";
import {AuthContext} from "./AuthContext";

export const SettingContext = createContext();
export default function SettingProvider({children}) {
    const {user} = useContext(AuthContext);

    const [pomoMinute, setPomoMinute] = useState(25);
    const [shortBreakMinute, setShortBreakMinute] = useState(5);
    const [longBreakMinute, setLongBreakMinute] = useState(15);
    const [showSetting, setShowSetting] = useState(false);
    const [showReport, setShowReport] = useState(false);
    const [autoBreak, setAutoBreak] = useState(false);
    const [autoPomo, setAutoPomo] = useState(false);
    const [longBreakInterval, setLongBreakInterval] = useState(0);
    const [pomoBackground, setPomoBackground] = useState(true);
    const [shortBackground, setShortBackground] = useState(false);
    const [longBackground, setLongBackground] = useState(false);
    const [settingConfirm, setSettingConfirm] = useState(false);
    const [previousValuePomo, setPreviousValuePomo] = useState(pomoMinute);
    const [previousValueShort, setPreviousValueShort] =
        useState(shortBreakMinute);
    const [previousValueLong, setPreviousValueLong] = useState(longBreakMinute);
    const [showInputTask, setShowInputTask] = useState(false);
    const [focusTodoId, setFocusTodoId] = useState({
        id: null,
        count: 0,
    });
    const [showAddTemplate, setShowAddTemplate] = useState(false);
    const [showSaveTemplate, setShowSaveTemplate] = useState(false);

    const currentSession = user?.currentSession;
    const template = user?.template;

    const value = {
        pomoMinute,
        setPomoMinute,
        shortBreakMinute,
        setShortBreakMinute,
        longBreakMinute,
        setLongBreakMinute,
        showSetting,
        setShowSetting,
        showReport,
        setShowReport,
        autoBreak,
        setAutoBreak,
        autoPomo,
        setAutoPomo,
        longBreakInterval,
        setLongBreakInterval,
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
        focusTodoId,
        setFocusTodoId,
        currentSession,
        template,
        showAddTemplate,
        setShowAddTemplate,
        showSaveTemplate,
        setShowSaveTemplate,
    };
    return (
        <SettingContext.Provider value={value}>{children}</SettingContext.Provider>
    );
}
