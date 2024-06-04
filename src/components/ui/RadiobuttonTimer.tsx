import React, { useState } from "react";
import DisplayTime from "./DisplayTime";
import Btn from "./Btn";
import ExerciseTimer from "./ExerciseTimer";

interface FormData {
    totalTime: number;
    exerciseTime: number;
    restTime: number;
}

interface TimeData {
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
        let newFormData: FormData = { totalTime: 0, exerciseTime: 0, restTime: 0 };
        const timeMapping: Record<string, TimeData> = {
            '10min': {
                totalTime: 600, exerciseTime:
                    30, restTime: 15
            },
            '20min': { totalTime: 1200, exerciseTime: 45, restTime: 25 },
            '30min': { totalTime: 1800, exerciseTime: 60, restTime: 35 },
        };

        for (const [key, value] of formEntries.entries()) {
            switch (key) {
                case 'total':
                    newFormData.totalTime = timeMapping[value as keyof typeof timeMapping]?.totalTime || 0;

                    break;
                case 'exercise':
                    const timeData = timeMapping[value as keyof typeof timeMapping];
                    if (timeData) {
                        newFormData.exerciseTime = timeData.exerciseTime;
                        newFormData.restTime = timeData.restTime;
                    }
                    break;
                default:
                    newFormData.totalTime = 0;
                    newFormData.exerciseTime = 0;
                    newFormData.restTime = 0;
            }
        }



        if (newFormData.totalTime && newFormData.exerciseTime && newFormData.restTime) {
            setFormData(newFormData);
            setTimerStarted(true);
        } else {
            alert("Please select an option in each category.");
        }
    };

    return (
        <>
            {!timerStarted &&
                <form className="flex flex-col items-center" onSubmit={handleSubmit}>
                    <fieldset>
                        <legend>Please select your preferred contact method:</legend>
                        <label className="flex justify-center font-bold" htmlFor="">Total Time:</label>
                        <div className="flex gap-2">
                            <input type="radio" name="total" value="10min" />
                            <label htmlFor="TotalTimeChoise1">10:00 min</label>
                            <input type="radio" name="total" value="20min" />
                            <label htmlFor="TotalTimeChoise2">20:00 min</label>
                            <input type="radio" name="total" value="30min" />
                            <label htmlFor="TotalTimeChoise3">30:00 min</label>
                        </div>
                        <label className="flex justify-center font-bold" htmlFor="">Set Time:</label>
                        <div className="flex gap-2">
                            <input type="radio" name="exercise" value="10min" />
                            <label htmlFor="TimeExercise1">30 sec</label>
                            <input type="radio" name="exercise" value="20min" />
                            <label htmlFor="TimeExercise2">45 sec</label>
                            <input type="radio" name="exercise" value="30min" />
                            <label htmlFor="TimeExercise3">1:00 min</label>
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
