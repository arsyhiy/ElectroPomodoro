import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

function App() {
  const [settings, setSettings] = useState({
    pomodoroDuration: 25 * 60,
    shortBreakDuration: 5 * 60,
    longBreakDuration: 15 * 60,

    pomodorosUntilLongBreak: 4,
    shortBreakEnabled: true,
  });

  const [type, setType] = useState("pomodoro");
  const [pomodoroCount, setPomodoroCount] = useState(0);
  const [time, setTime] = useState(settings.pomodoroDuration);
  const [isRunning, setIsRunning] = useState(false);

  function getDuration(type) {
    if (type === "pomodoro") {
      return settings.pomodoroDuration;
    }

    if (type === "shortbreak") {
      return settings.shortBreakDuration;
    }

    if (type === "longbreak") {
      return settings.longBreakDuration;
    }

    return 0;
  }

  function nextTimer() {
    if (type === "pomodoro") {
      const newCount = pomodoroCount + 1;

      setPomodoroCount(newCount);

      if (newCount % settings.pomodorosUntilLongBreak === 0) {
        setType("longbreak");
        setTime(settings.longBreakDuration);
      } else if (settings.shortBreakEnabled) {
        setType("shortbreak");
        setTime(settings.shortBreakDuration);
      } else {
        setType("pomodoro");
        setTime(settings.pomodoroDuration);
      }
    } else {
      setType("pomodoro");
      setTime(settings.pomodoroDuration);
    }

    setIsRunning(false);
  }

  useEffect(() => {
    if (!isRunning) {
      return;
    }

    const timer = setInterval(() => {
      setTime((currentTime) => {
        if (currentTime <= 1) {
          clearInterval(timer);
          nextTimer();

          return 0;
        }

        return currentTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning]);

  function startTimer() {
    setIsRunning(true);
  }

  return (
    <main>
      <h1>{type}</h1>

      <h2>{time}</h2>

      <button onClick={startTimer}>Старт</button>

      <button onClick={nextTimer}>Следующий</button>
    </main>
  );
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
