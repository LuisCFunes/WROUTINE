import React from "react";
import formatTime from "../util/formatTime";

interface DisplayTimeProps {
    times: {
        totalTime: number;
        exerciseTime: number;
        restTime: number;
    };
}

const DisplayTime: React.FC<DisplayTimeProps> = ({ times }) => {
    return (
        <div>
            <div>Total Time:  {formatTime(times.totalTime)} min</div>
            <div>Exercise Time: {times.exerciseTime} sec</div>
            <div>Rest Time: {times.restTime} sec</div>
        </div>
    );
};

export default DisplayTime;
