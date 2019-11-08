import React from "react";
import "../style/Cell.css";

export enum CellState {
    Flag,
    Bomb,
    RedBomb,
}

export interface ICellProps {
    pushed: boolean,
    state?: CellState,
    value?: number,
    onClick?(): void,
    onRightClick?(): void,
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
        classes.push(`cell${props.value}`);
    }

    const onRightClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (props.onRightClick) {
            event.preventDefault();
            props.onRightClick();
        }
    }

    return (
        <div className={classes.join(" ")} onClick={() => props.onClick && props.onClick()} onContextMenu={onRightClick}>
            {valueElement}
        </div>
    )
}