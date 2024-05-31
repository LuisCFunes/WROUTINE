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
        let newFormData: FormData = { totalTime: 0, exerciseTime: 0, restTime: 0 };

        for (const [key, value] of formEntries.entries()) {
            if (key === 'total') {
                if (value === '10min') newFormData.totalTime = 600;
                else if (value === '20min') newFormData.totalTime = 1200;
                else if (value === '30min') newFormData.totalTime = 1800;
            } else if (key === 'exercise') {
                if (value === '10min') {
                    newFormData.exerciseTime = 30;
                    newFormData.restTime = 15;
                }
                else if (value === '20min') {
                    newFormData.exerciseTime = 45;
                    newFormData.restTime = 25;
                }
                else if (value === '30min') {
                    newFormData.exerciseTime = 60;
                    newFormData.restTime = 35;
                }
            } else {
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
                        <label className="flex justify-center font-bold" htmlFor="">Exercise Time for set:</label>
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
                                Submit
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
