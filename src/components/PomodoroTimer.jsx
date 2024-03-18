import React, { useState, useEffect } from "react";

const PomodoroTimer = () => {
  const [workTime, setWorkTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);
  const [time, setTime] = useState(workTime * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isWorking, setIsWorking] = useState(true);
  const [progressWidth, setProgressWidth] = useState(0);
  const [timerInterval, setTimerInterval] = useState(null);
  const [roundsCounter, setRoundsCounter] = useState(0);

  useEffect(() => {
    const totalTimeInterval = isWorking ? workTime * 60 : breakTime * 60;
    const remainingPercentage = (time / totalTimeInterval) * 100;
    setProgressWidth(100 - remainingPercentage);

    if (time === 0) {
      setRoundsCounter((prev) => prev + 1);
    }
  }, [time, isWorking, workTime, breakTime]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secondsLeft = seconds % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      secondsLeft < 10 ? "0" : ""
    }${secondsLeft}`;
  };

  const playWorkTimeSound = () => {
    const audio = new Audio("/sound/workTime-complete-sound.mp3");
    audio
      .play()
      .catch((error) =>
        console.error("Error playing the work time sound:" + error)
      );
  };

  const playBreakTimeSound = () => {
    const audio = new Audio("/sound/breakTime-complete-sound.mp3");
    audio
      .play()
      .catch((error) =>
        console.error("Error playing the break time sound:" + error)
      );
  };

  const startTimer = () => {
    setIsRunning(true);

    setTimerInterval(
      setInterval(() => {
        setTime((prevTime) => {
          if (prevTime === 0) {
            if (isWorking) {
              playWorkTimeSound();
            } else {
              playBreakTimeSound();
            }
            setIsWorking((prevIsWorking) => !prevIsWorking);
            return isWorking ? breakTime * 60 : workTime * 60;
          }
          return prevTime - 1;
        });
      }, 1000)
    );
  };

  const pauseTimer = () => {
    setIsRunning(false);
    clearInterval(timerInterval);
  };

  const cancelTimer = () => {
    setIsRunning(false);
    clearInterval(timerInterval);
    setIsWorking(true);
    setTime(workTime * 60);
  };

  const resetCounter = () => {
    setRoundsCounter(0);
  };

  const handleSetWorkTime = (newWorkTime) => {
    if (newWorkTime >= 0) {
      setWorkTime(newWorkTime);

      if (!isRunning) {
        setTime(newWorkTime * 60);
      }
    }
  };
  const handleSetBreakTime = (newBreakTime) => {
    if (newBreakTime >= 0) {
      setBreakTime(newBreakTime);

      if (!isRunning && !isWorking) {
        setTime(newBreakTime * 60);
      }
    }
  };

  return (
    <div className="bg-slate-950 h-screen ">
      <nav className="bg-gray-800 p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-white text-lg font-semibold ml-2">
              Pomodoro Timer
            </h1>
          </div>
        </div>
      </nav>
      <div className="max-w-2xl mx-auto mt-8 p-4 bg-slate-700 rounded shadow-lg ">
        <p className="text-xl font-bold text-white mb-4">
          {isWorking ? "Work" : "Break"} Time Remaining: {formatTime(time)}
        </p>
        <div className="relative h-4 bg-grey-200 rounded overflow-hidden">
          <div
            className="absolute h-full bg-green-500"
            style={{ width: `${progressWidth}%` }}
          ></div>
        </div>
        <div className="flex justify-between mt-4">
          {isRunning ? (
            <>
              <button
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                onClick={pauseTimer}
              >
                Pause Timer
              </button>
              <button
                className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600"
                onClick={cancelTimer}
              >
                Cancel Timer
              </button>
            </>
          ) : (
            <button
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
              onClick={startTimer}
            >
              Start Timer
            </button>
          )}
        </div>
        <div className="mt-4">
          <label className="block text-white" htmlFor="workTimeInput">
            Set Work Time (minutes):
          </label>
          <input
            className="w-full p-2 border rounded mt-2"
            type="number"
            id="workTimeInput"
            value={workTime}
            onChange={(e) => handleSetWorkTime(parseInt(e.target.value, 10))}
          />
        </div>
        <div className="mt-4">
          <label className="block text-white" htmlFor="breakTimeInput">
            Set Break Time (minutes):
          </label>
          <input
            className="w-full p-2 border rounded mt-2"
            type="number"
            id="breakTimeInput"
            value={breakTime}
            onChange={(e) => handleSetBreakTime(parseInt(e.target.value, 10))}
          />
        </div>
        <div className="mt-4 text-white">
          <p> Total Rounds : {roundsCounter}</p>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mt-2"
            onClick={resetCounter}
          >
            Reset Counter
          </button>
        </div>
      </div>
      <div className="max-w-2xl mx-auto my-8 p-6 bg-slate-700 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4 text-white">Pomodoro Timer</h1>
        <p className="text-white">
          The Pomodoro Timer is a time management technique that involves
          breaking work into focused intervals, typically 25 minutes each
          (called Pomodoros), separated by short breaks. Users select a task,
          set a timer, work on the task until the timer rings, take a short
          break, and repeat the process. After completing four Pomodoros, a
          longer break is taken. The method aims to enhance concentration,
          productivity, and work-life balance by providing structured periods of
          focused work followed by brief recovery breaks. The timer creates a
          sense of urgency, discouraging procrastination and promoting
          continuous progress through manageable time segments.
        </p>
      </div>
    </div>
  );
};

export default PomodoroTimer;
