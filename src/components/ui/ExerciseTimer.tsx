import React, { useState, useEffect } from 'react';

interface ExerciseTimerProps {
  initialTotalTime: number;
  initialExerciseTime: number;
  initialRestTime: number;
}

const ExerciseTimer: React.FC<ExerciseTimerProps> = ({ initialTotalTime, initialExerciseTime, initialRestTime }) => {
  const [totalTime, setTotalTime] = useState(initialTotalTime);
  const [timeLeft, setTimeLeft] = useState(totalTime);
  const [isResting, setIsResting] = useState(false);
  const [isTimerStarted, setIsTimerStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [editedMinutes, setEditedMinutes] = useState(Math.floor(initialTotalTime / 60));
  const [editedSeconds, setEditedSeconds] = useState(initialTotalTime % 60);
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
      } else if (!isResting && timeLeft % (initialExerciseTime + initialRestTime) === 0) {
        setIsResting(true);
      } else if (isResting && timeLeft % (initialExerciseTime + initialRestTime) === initialExerciseTime) {
        setIsResting(false);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, isResting, initialExerciseTime, initialRestTime]);

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleConfirmChanges = () => {
    const totalSeconds = (editedMinutes * 60) + editedSeconds;
    setTotalTime(totalSeconds);
    setTimeLeft(totalSeconds);
    setIsTimerStarted(true);
  };

  const handlePauseResume = () => {
    setIsPaused(prevPaused => !prevPaused);
  };

  return (
    <div className='flex flex-col gap-2 w-[300px] m-auto'>
      {
        isTimerStarted ? (
          <label className='text-center'>Total Time: {formatTime(totalTime)}</label>
        ) : (
          <>
            <div>
              <label>Total Time:</label>
              <input type="number" value={editedMinutes} onChange={e => setEditedMinutes(parseInt(e.target.value))} className="ml-2 border-slate-600 placeholder-slate-400 w-1/6 rounded-lg border px-3 py-2 text-sm" />
              <span className='mx-auto'>:</span>
              <input type="number" value={editedSeconds} onChange={e => setEditedSeconds(parseInt(e.target.value))} className="border-slate-600 placeholder-slate-400 w-1/6 rounded-lg border px-3 py-2 text-sm" />
            </div>
            <div>
              <label>Exercise Sec:</label>
              <input type="number" value={editedExerciseTime} onChange={e => setEditedExerciseTime(parseInt(e.target.value))} className="ml-4 border-slate-600 placeholder-slate-400 w-4/12 rounded-lg border px-3 py-2 text-sm" />
            </div>
            <div>
              <label>Rest Sec:</label>
              <input type="number" value={editedRestTime} onChange={e => setEditedRestTime(parseInt(e.target.value))} placeholder="30..." className="ml-4 border-slate-600 placeholder-slate-400 w-4/12 rounded-lg border px-3 py-2 text-sm" />
            </div>
          </>
        )

      }
      {!isTimerStarted ? (
        <button onClick={handleConfirmChanges} className='rounded-full bg-black text-white w-full p-2 hover:bg-slate-500'>Confirm Changes</button>
      ) : (
        <button onClick={handlePauseResume} className='rounded-full bg-black text-white w-full p-2 hover:bg-slate-500'>{isPaused ? 'Resume' : 'Pause'}</button>
      )}
      <div className='text-center'>
        <h1>{isResting ? 'Resting' : 'Exercising'}</h1>
        <p>Time Left: {formatTime(timeLeft)}</p>
      </div>
    </div>
  );
};

export default ExerciseTimer;
