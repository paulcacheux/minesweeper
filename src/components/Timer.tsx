import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BoardState } from "../store/types";

export const Timer: React.FC = () => {
    const startDate = useSelector((state: BoardState) => state.startDate);
    const [secs, setSecs] = useState(0);

    useEffect(() => {
        let interval = setInterval(() => {
            if (startDate !== undefined) {
                if (typeof startDate === "number") {
                    setSecs(startDate);
                } else {
                    let endTime = new Date();
                    let diff = (endTime.getTime() - startDate.getTime()) / 1000;
                    let diffSecs = Math.round(diff);
                    setSecs(diffSecs);
                }
            }
        }, 500)

        return () => {
            clearInterval(interval)
        };
    })

    return (
        <p className="score-like">{secs}</p>
    );
}

export default Timer;