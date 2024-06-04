import { useState, useEffect } from 'react';
import { Howl } from 'howler';

const useExerciseRestState = (
    timeLeft: number,
    exerciseTime: number,
    restTime: number
): boolean => {
    const [isResting, setIsResting] = useState<boolean>(false);
    
    const alarmSound = new Howl({
        src: ['/timerSoundd.mp3'],
      });

    useEffect(() => {
        const interval = setInterval(() => {
            if (timeLeft === 0) {
                clearInterval(interval);
            } else if (!isResting && timeLeft % (exerciseTime + restTime) === 0) {
                setIsResting(true);
                alarmSound.play();
            } else if (isResting && timeLeft % (exerciseTime + restTime) === exerciseTime) {
                setIsResting(false);
                alarmSound.play();
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [timeLeft, isResting, exerciseTime, restTime]);

    return isResting;
};

export default useExerciseRestState;
