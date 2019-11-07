import React from "react";
import "../style/Cell.css";

export enum CellState {
    Flag,
    Bomb,
    RedBomb,
}

interface ICellProps {
    pushed: boolean,
    state?: CellState,
    value?: number,
    onClick?(): void,
}

export const Cell: React.FC<ICellProps> = (props) => {
    let classes = ["cell"];

    if (props.pushed) {
        classes.push("pushed");
    }

    if (props.state !== undefined) {
        switch (props.state) {
            case CellState.Flag:
                classes.push("flag");
                break;
            case CellState.Bomb:
                classes.push("bomb");
                break;
            case CellState.RedBomb:
                classes.push("bomb");
                classes.push("red");
                break;
        }
    }

    let valueElement: JSX.Element | null = null;
    if (props.value !== undefined) {
        valueElement = <p>{props.value}</p>
    }

    return (
        <div className={classes.join(" ")} onClick={() => props.onClick && props.onClick()}>
            {valueElement}
        </div>
    )
}