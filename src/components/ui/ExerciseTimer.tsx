import React, { useState, useEffect } from 'react';

interface ExerciseTimerProps {
  initialTotalTime: number;
  initialExerciseTime: number;
  initialRestTime: number;
}

const ExerciseTimer: React.FC<ExerciseTimerProps> = ({ initialTotalTime, initialExerciseTime, initialRestTime }) => {
  const [totalTime, setTotalTime] = useState(initialTotalTime);
  const [exerciseTime, setExerciseTime] = useState(initialExerciseTime);
  const [restTime, setRestTime] = useState(initialRestTime);
  const [timeLeft, setTimeLeft] = useState(totalTime);
  const [isResting, setIsResting] = useState(false);
  const [isTimerStarted, setIsTimerStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [editedTotalTime, setEditedTotalTime] = useState(initialTotalTime);
  const [editedExerciseTime, setEditedExerciseTime] = useState(initialExerciseTime);
  const [editedRestTime, setEditedRestTime] = useState(initialRestTime);

  useEffect(() => {
    setTimeLeft(totalTime);
  }, [totalTime]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused && isTimerStarted) {
        if (timeLeft > 0) {
          setTimeLeft(prevTime => prevTime - 1);
        } else {
          clearInterval(interval);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, isPaused, isTimerStarted]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (timeLeft === 0) {
        clearInterval(interval);
      } else if (!isResting && timeLeft % (exerciseTime + restTime) === 0) {
        setIsResting(true);
      } else if (isResting && timeLeft % (exerciseTime + restTime) === exerciseTime) {
        setIsResting(false);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, isResting, exerciseTime, restTime]);

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleConfirmChanges = () => {
    setTotalTime(editedTotalTime);
    setExerciseTime(editedExerciseTime);
    setRestTime(editedRestTime);
    setTimeLeft(editedTotalTime);
    setIsTimerStarted(true);
  };

  const handlePauseResume = () => {
    setIsPaused(prevPaused => !prevPaused);
  };

  const handleTotalTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTotalTime(parseInt(e.target.value));
  };

  const handleExerciseTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedExerciseTime(parseInt(e.target.value));
  };

  const handleRestTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedRestTime(parseInt(e.target.value));
  };

  return (
    <div className='flex flex-col gap-2 items-center'>
      <div>
        <label>Total Time:</label>
        <input type="number" value={editedTotalTime} onChange={handleTotalTimeChange} className="ml-4 border-slate-600 placeholder-slate-400 w-4/12 rounded-lg border px-3 py-2 text-sm" />
      </div>
      <div>
        <label>Exercise Time:</label>
        <input type="number" value={editedExerciseTime} onChange={handleExerciseTimeChange} className="ml-4 border-slate-600 placeholder-slate-400 w-4/12 rounded-lg border px-3 py-2 text-sm" />
      </div>
      <div>
        <label>Rest Time:</label>
        <input type="number" value={editedRestTime} onChange={handleRestTimeChange} placeholder="30..." className="ml-4 border-slate-600 placeholder-slate-400 w-4/12 rounded-lg border px-3 py-2 text-sm"/>
      </div>
      <button onClick={handleConfirmChanges} className='rounded-full bg-black text-white w-4/12 p-2 hover:bg-slate-500'>Confirm Changes</button>
      <button onClick={handlePauseResume} className='rounded-full bg-black text-white w-4/12 p-2 hover:bg-slate-500'>{isPaused ? 'Resume' : 'Pause'}</button>
      <h1>{isResting ? 'Resting' : 'Exercising'}</h1>
      <p>Time Left: {formatTime(timeLeft)}</p>
    </div>
  );
};

export default ExerciseTimer;
