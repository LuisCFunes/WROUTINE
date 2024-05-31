import { useState, useEffect } from 'react';

const useTimer = (
  initialTime: number,
  isPaused: boolean,
  isRunning: boolean
): [number, React.Dispatch<React.SetStateAction<number>>] => {
  const [timeLeft, setTimeLeft] = useState<number>(initialTime);

  useEffect(() => {
    setTimeLeft(initialTime);
  }, [initialTime]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused && isRunning) {
        if (timeLeft > 0) {
          setTimeLeft(prevTime => prevTime - 1);
        } else {
          clearInterval(interval);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, isPaused, isRunning]);

  return [timeLeft, setTimeLeft];
};

export default useTimer;
