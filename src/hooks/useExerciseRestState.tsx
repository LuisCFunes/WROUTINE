import { useState, useEffect } from 'react';

const useExerciseRestState = (
    timeLeft: number,
    exerciseTime: number,
    restTime: number
): boolean => {
    const [isResting, setIsResting] = useState<boolean>(false);

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

    return isResting;
};

export default useExerciseRestState;
