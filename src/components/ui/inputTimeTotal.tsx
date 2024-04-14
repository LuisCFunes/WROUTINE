import React, { useState, useEffect } from "react";
import Btn from "./Btn";

const InputTimeTotal: React.FC = () => {
    const [minutes, setMinutes] = useState(10); // State to manage the minutes
    const [seconds, setSeconds] = useState(0); // State to manage the seconds
    const [isConfirmed, setIsConfirmed] = useState(false); // State to track if time is confirmed
    const [isRunning, setIsRunning] = useState(false); // State to track if timer is running

    const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!isConfirmed) {
            const value = parseInt(e.target.value);
            setMinutes(isNaN(value) ? 0 : value);
        }
    };

    const handleSecondsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!isConfirmed) {
            const value = parseInt(e.target.value);
            setSeconds(isNaN(value) ? 0 : value);
        }
    };

    const handleConfirmClick = () => {
        setIsConfirmed(true);
    };

    const handleStartClick = () => {
        setIsRunning(true);
    };

    const handleStopClick = () => {
        setIsRunning(false);
    };

    useEffect(() => {
        let timer: NodeJS.Timeout;

        if (isRunning) {
            timer = setInterval(() => {
                if (seconds === 0) {
                    if (minutes === 0) {
                        setIsRunning(false);
                        clearInterval(timer);
                    } else {
                        setMinutes(prevMinutes => prevMinutes - 1);
                        setSeconds(59);
                    }
                } else {
                    setSeconds(prevSeconds => prevSeconds - 1);
                }
            }, 1000);
        }

        return () => clearInterval(timer);
    }, [isRunning, minutes, seconds]);

    return (
        <div className="flex justify-center gap-4">
            <div className="flex flex-col gap-2">
                <div className="flex items-center space-x-2">
                    {!isConfirmed && (
                        <>
                            <input
                                type="number"
                                value={minutes}
                                onChange={handleMinutesChange}
                                className="border-2 border-black rounded-md w-16 text-center"
                                disabled={isConfirmed}
                            />
                            <div className="text-xl font-medium">:</div>
                            <input
                                type="number"
                                value={seconds}
                                onChange={handleSecondsChange}
                                className="border-2 border-black rounded-md w-16 text-center"
                                disabled={isConfirmed}
                            />
                        </>
                    )}
                </div>
                <div className="flex">
                    <div className="flex items-center space-x-2">
                        <div className="text-xl font-medium">Total time:</div>
                        <div className="text-xl font-medium">
                            {String(minutes).padStart(2, "0")}
                            {":"}
                            {String(seconds).padStart(2, "0")}
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col my-auto">
                {!isConfirmed && (
                    <Btn
                        onClick={handleConfirmClick}
                    >
                        Confirm
                    </Btn>
                )}
                {isConfirmed && !isRunning && (
                    <Btn
                        onClick={handleStartClick}
                    >
                        Star
                    </Btn>
                )}
                {isRunning && (
                    <Btn
                        onClick={handleStopClick}
                    >
                        Stop
                    </Btn>
                )}
            </div>
        </div>
    );
};

export default InputTimeTotal;
