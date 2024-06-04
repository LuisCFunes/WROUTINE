import React, { useState, useEffect } from 'react';
import { Howl } from 'howler';
import useTimer from '../../hooks/userTimer';
import useExerciseRestState from '../../hooks/useExerciseRestState';
import formatTime from '../util/formatTime';

interface ExerciseTimerProps {
  initialTotalTime: number;
  initialExerciseTime: number;
  initialRestTime: number;
  timerStarted: boolean;
}

const ExerciseTimer: React.FC<ExerciseTimerProps> = ({ initialTotalTime, initialExerciseTime, initialRestTime, timerStarted }) => {
  const [totalTime, setTotalTime] = useState(initialTotalTime);
  const [isPaused, setIsPaused] = useState(false);
  const [isTimerStarted, setIsTimerStarted] = useState(timerStarted);
  const [timeLeft, setTimeLeft] = useTimer(totalTime, isPaused, isTimerStarted);
  const isResting = useExerciseRestState(timeLeft, initialExerciseTime, initialRestTime);

  const alarmSound = new Howl({
    src: ['/public/timerSound.mp3'],
  });

  useEffect(() => {
    if (isResting || !isResting) {
      alarmSound.play();
    }
  }, [isResting]);

  const handleConfirmChanges = () => {
    const totalSeconds = (Math.floor(totalTime / 60) * 60) + (totalTime % 60);
    setTotalTime(totalSeconds);
    setTimeLeft(totalSeconds);
    setIsTimerStarted(true);
  };

  const handlePauseResume = () => {
    setIsPaused(prevPaused => !prevPaused);
  };

  return (
    <div className='flex flex-col gap-2 w-[300px] m-auto'>
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
