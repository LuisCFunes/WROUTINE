import React, { useState } from 'react';
import useTimer from '../../hooks/userTimer';
import useExerciseRestState from '../../hooks/useExerciseRestState';
import formatTime from '../util/formatTime';
import OnclickBtn from './BtnOnclick';

interface ExerciseTimerProps {
  initialTotalTime: number;
  initialExerciseTime: number;
  initialRestTime: number;
  timerStarted: boolean;
}

const ExerciseTimer: React.FC<ExerciseTimerProps> = ({
  initialTotalTime,
  initialExerciseTime,
  initialRestTime,
  timerStarted,
}) => {
  const [isPaused, setIsPaused] = useState(false);
  const [timeLeft] = useTimer(initialTotalTime, isPaused, timerStarted);
  const isResting = useExerciseRestState(timeLeft, initialExerciseTime, initialRestTime);


  const handlePauseResume = () => {
    setIsPaused((prevPaused) => !prevPaused);
  };

  const handleRestart = () => {
    if (window.confirm('Are you sure you want to restart?')) {
      window.location.reload();
    }
  };

  return (
    <div className='flex flex-col gap-2 w-[300px] m-auto'>
      {!timerStarted &&
        <OnclickBtn onClick={handlePauseResume}>{isPaused ? 'Resume' : 'Pause'}</OnclickBtn>
      }
      <OnclickBtn onClick={handleRestart}>Restart</OnclickBtn>
      <div className='text-center font-bold text-2xl'>
        <h1 className='text-red-600'>{isResting ? 'Rest Bro' : 'Do it!'}</h1>
        <p>Time Left: {formatTime(timeLeft)}</p>
      </div>
    </div>
  );
};

export default ExerciseTimer;
