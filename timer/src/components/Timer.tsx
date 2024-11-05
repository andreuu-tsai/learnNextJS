import { useState, useEffect } from "react";

export function Timer() {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [lapTimes, setLapTimes] = useState<number[]>([]);

  useEffect(() => {
    let timer: number;
    if (isRunning) {
      timer = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 10);
    }
    return () => {
      if (timer !== undefined) {
        clearInterval(timer);
      }
    };
  }, [isRunning, startTime, elapsedTime]);

  function formatMilliseconds(ms: number) {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = Math.floor((ms % 1000) / 10);

    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");
    const formattedMilliseconds = String(milliseconds).padStart(2, "0");

    return `${formattedMinutes}:${formattedSeconds}:${formattedMilliseconds}`;
  }

  function handleStart() {
    if (elapsedTime === 0 && !isRunning) {
      setStartTime(Date.now());
      setIsRunning(true);
    }
  }

  function handleStop() {
    setIsRunning(false);
  }

  function handleContinue() {
    if (elapsedTime !== 0) {
      setIsRunning(true);
    }
  }

  function handleReset() {
    setIsRunning(false);
    setElapsedTime(0);
    setStartTime(0);
    setLapTimes([]);
  }

  function handleLapTime() {
    if (isRunning) {
      setLapTimes([...lapTimes, elapsedTime]);
    }
  }

  return (
    <div className="grid grid-cols-2">
      <div className="flex flex-col justify-center items-center col-start-1 col-span-1">
        <p>ElapsedTime: {formatMilliseconds(elapsedTime)}</p>
        <div>
          <button onClick={handleReset}>Reset</button>
          <button onClick={handleStart}>Start</button>
          <button onClick={handleStop}>Stop</button>
          <button onClick={handleContinue}>Continue</button>
          <button onClick={handleLapTime}>Lap Time</button>
        </div>
      </div>
      <div className="col-start-2 col-span-1 border-l-2">
        {lapTimes.map((lapTime, index) => {
          return (
            <div key={index}>{`Lap ${index + 1}: ${formatMilliseconds(
              lapTime
            )}`}</div>
          );
        })}
      </div>
    </div>
  );
}
