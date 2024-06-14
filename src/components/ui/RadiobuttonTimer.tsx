import React, { useState } from "react";
import DisplayTime from "./DisplayTime";
import Btn from "./Btn";
import ExerciseTimer from "./ExerciseTimer";

interface FormData {
    totalTime: number;
    exerciseTime: number;
    restTime: number;
}

const RadioButtonTimer: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({ totalTime: 0, exerciseTime: 0, restTime: 0 });
    const [timerStarted, setTimerStarted] = useState<boolean>(false);


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formEntries = new FormData(event.target as HTMLFormElement);
        const totalTime = formEntries.get('total') as string;
        if (totalTime === '10min') {
            setFormData({ totalTime: 600, exerciseTime: 20, restTime: 10 });
            setTimerStarted(true);
        }
        if (totalTime === '20min') {
            setFormData({ totalTime: 1200, exerciseTime: 45, restTime: 15 });
            setTimerStarted(true);
        }
        if (totalTime === '30min') {
            setFormData({ totalTime: 1800, exerciseTime: 90, restTime: 30 });
            setTimerStarted(true);
        }
    };

    return (
        <>
            {!timerStarted &&
                <form className="flex flex-col items-center" onSubmit={handleSubmit}>
                    <fieldset>
                        <legend>Please select your preferred time for the routine:</legend>
                        <label className="flex justify-center font-bold" htmlFor="">Total Time:</label>
                        <div className="flex gap-2">
                            <input type="radio" name="total" value="10min" />
                            <label htmlFor="TotalTimeChoise1">10:00 min</label>
                            <input type="radio" name="total" value="20min" />
                            <label htmlFor="TotalTimeChoise2">20:00 min</label>
                            <input type="radio" name="total" value="30min" />
                            <label htmlFor="TotalTimeChoise3">30:00 min</label>
                        </div>
                        <div className="flex justify-center">
                            <Btn type="submit">
                                Start
                            </Btn>
                        </div>

                    </fieldset>
                </form>
            }

            <DisplayTime times={formData} />
            {timerStarted &&
                <ExerciseTimer initialTotalTime={formData.totalTime} initialExerciseTime={formData.exerciseTime} initialRestTime={formData.restTime} timerStarted={timerStarted} />
            }
        </>
    );
};

export default RadioButtonTimer;
