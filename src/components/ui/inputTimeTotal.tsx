import React, { useState, useEffect } from "react";
import Btn from "./Btn";

const InputTimeTotal: React.FC = () => {
    const [time, setTime] = useState({ minutes: 10, seconds: 0 });
    const [timeRoutine, setTimeRoutine] = useState({ exerciseTime: 0, restTime: 0, });
    const [confirms, setIsconfirms] = useState({ confirmRoutine: false, confirmEachSet: false,confirmRest:false });
    const [isRunning, setIsRunning] = useState(false);

    const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!confirms.confirmRoutine) {
            const { value } = e.target;
            const parsedValue = parseInt(value);
            setTime((prevTime) => ({
                ...prevTime,
                [e.target.name]: isNaN(parsedValue) ? 0 : parsedValue,
            }));
        }
    };

    const handleTimeRoutineChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (confirms.confirmRoutine) {
            const { value } = e.target;
            const parsedValue = parseInt(value);
            setTimeRoutine((prevTime) => ({
                ...prevTime,
                [e.target.name]: isNaN(parsedValue) ? 0 : parsedValue,
            }));
        }
    };

    const handleConfirmClick = () => {
        setIsconfirms((prevConfirm) => ({ ...prevConfirm, confirmRoutine: true }));
    };

    const handleConfirmTimeExerciseClick = () => {
        setIsconfirms((prevConfirm) => ({ ...prevConfirm, confirmEachSet: true }));
    };

    const handleConfirmRestClick = () => {
        setIsconfirms((prevConfirm) => ({ ...prevConfirm, confirmRest: true }));
    };

    const toggleRunningState = () => {
        setIsRunning(prevRunning => !prevRunning);
    };

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isRunning) {
            timer = setInterval(() => {
                setTime((prevTime) => ({
                    ...prevTime,
                    seconds:
                        prevTime.seconds === 0
                            ? prevTime.minutes > 0
                                ? 59
                                : 0
                            : prevTime.seconds - 1,
                    minutes:
                        prevTime.seconds === 0 && prevTime.minutes === 0
                            ? 0
                            : prevTime.minutes - (prevTime.seconds === 0 ? 1 : 0),
                }));
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [isRunning, time]);

    return (
        <div className="flex justify-center gap-4">
            <div className="flex flex-col gap-2 my-auto">
                <div className="flex items-center space-x-2">
                    {confirms.confirmRoutine ? (
                        <section>
                            <div className="text-xl font-medium">
                                Total time:{String(time.minutes).padStart(2, "0")}:
                                {String(time.seconds).padStart(2, "0")}
                            </div>
                        </section>
                    ) : (
                        <>
                            <h3 className="text-xl font-medium">Total time:</h3>
                            <input
                                type="number"
                                value={time.minutes}
                                onChange={handleTimeChange}
                                className="border-2 border-black rounded-md w-16 text-center"
                                disabled={confirms.confirmRoutine}
                                name="minutes"
                            />
                            <div className="text-xl font-medium">:</div>
                            <input
                                type="number"
                                value={time.seconds}
                                onChange={handleTimeChange}
                                className="border-2 border-black rounded-md w-16 text-center"
                                disabled={confirms.confirmRoutine}
                                name="seconds"
                            />
                        </>
                    )}
                </div>

                <div className="flex items-center space-x-2">
                    {confirms.confirmRoutine && confirms.confirmEachSet ? (
                        <div className="text-xl font-medium">
                            Each set :{String(timeRoutine.exerciseTime).padStart(2, "0")}
                        </div>
                    ) : (
                        <>
                            <h3 className="text-xl font-medium"> Each set :</h3>
                            <input
                                type="number"
                                value={timeRoutine.exerciseTime}
                                onChange={handleTimeRoutineChange}
                                className="border-2 border-black rounded-md w-16 text-center"
                                disabled={!confirms.confirmRoutine}
                                name="exerciseTime"
                            />
                        </>
                    )}
                </div>

                <div className="flex items-center space-x-2">
                    {confirms.confirmRoutine && confirms.confirmEachSet && confirms.confirmRest ? (
                        <div className="text-xl font-medium">
                            Rest time :{String(timeRoutine.restTime).padStart(2, "0")}
                        </div>
                    ) : (
                        <>
                            <h3 className="text-xl font-medium"> Rest time :</h3>
                            <input
                                type="number"
                                value={timeRoutine.restTime}
                                onChange={handleTimeRoutineChange}
                                className="border-2 border-black rounded-md w-16 text-center"
                                disabled={!confirms.confirmEachSet}
                                name="restTime"
                            />
                        </>
                    )}
                </div>
            </div>
            <div className="my-auto">
                {!confirms.confirmRoutine && <Btn onClick={handleConfirmClick}>Confirm Routine Time</Btn>}
                {confirms.confirmRoutine && !confirms.confirmEachSet && (
                    <Btn onClick={handleConfirmTimeExerciseClick}>Confirm Set Time</Btn>
                )}
                 {confirms.confirmRoutine && confirms.confirmEachSet && !confirms.confirmRest &&  (
                    <Btn onClick={handleConfirmRestClick}>Confirm Rest Time</Btn>
                )}
                {confirms.confirmRoutine && !isRunning && confirms.confirmEachSet && confirms.confirmRest &&(
                    <Btn onClick={toggleRunningState}>Start</Btn>
                )}
                {isRunning && <Btn onClick={toggleRunningState}>Stop</Btn>}
            </div>
        </div>
    );
};

export default InputTimeTotal;
