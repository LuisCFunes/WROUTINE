import React, { useState } from "react";
import DisplayTime from "./DisplayTime";
import Btn from "./Btn";

interface FormData {
    totalTime: number;
    exerciseTime: number;
    restTime: number;
}

const RadioButtonTimer: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({ totalTime: 10, exerciseTime: 30, restTime: 15 });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let output: FormData = { totalTime: 10, exerciseTime: 30, restTime: 15 };
        for (const entry of new FormData(event.target as HTMLFormElement).entries()) {
            if (entry[1] === '10min') {
                output = {
                    ...output,
                    totalTime: 10,
                    exerciseTime: 30,
                    restTime: 15
                };
            } else if (entry[1] === '20min') {
                output = {
                    ...output,
                    totalTime: 20,
                    exerciseTime: 30,
                    restTime: 15
                };
            } else if (entry[1] === '30min') {
                output = {
                    ...output,
                    totalTime: 30,
                    exerciseTime: 30,
                    restTime: 15
                };
            }
        }
        setFormData(output);
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <legend>Please select your preferred contact method:</legend>
                    <div className="flex gap-2">
                        <input type="radio" id="contactChoice1" name="total" value="10min" />
                        <label htmlFor="contactChoice1">10:00 min</label>
                        <input type="radio" id="contactChoice2" name="total" value="20min" />
                        <label htmlFor="contactChoice2">20:00 min</label>
                        <input type="radio" id="contactChoice3" name="total" value="30min" />
                        <label htmlFor="contactChoice3">30:00 min</label>
                    </div>
                    <div className="flex justify-center">
                    <Btn type="submit">
                        Submit
                    </Btn>
                    </div>

                </fieldset>
            </form>
            <DisplayTime times={formData} />
        </>
    );
};

export default RadioButtonTimer;
