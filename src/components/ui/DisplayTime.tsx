import React from "react";

interface DisplayTimeProps {
    exerciseTime: number;
    restTime: number;
}

const DisplayTime: React.FC<DisplayTimeProps> = ({ exerciseTime, restTime }) => {
    return (
        <div>
            <div>Exercise Time: {String(exerciseTime).padStart(2, "0")}</div>
            <div>Rest Time: {String(restTime).padStart(2, "0")}</div>
        </div>
    );
};

export default DisplayTime;
