import React from "react";
import { Cell, CellState, ICellProps } from "./Cell";
import "../style/Board.css";
import { useSelector, useDispatch } from "react-redux";
import { BoardState } from "../store/types";
import { range } from "../utils";
import BoardModel from "../store/board";
import { clickCell } from "../store/actions";

const boardSelector = (state: BoardState) => state.board;

function extractCellProps(board: BoardModel, x: number, y: number): ICellProps {
    let props: ICellProps = {
        pushed: false,
        value: undefined,
        state: undefined,
    };

    props.pushed = board.getPushState(x, y);

    if (props.pushed) {
        let boardValue = board.getCellContent(x, y);
        if (typeof boardValue === "number") {
            if (boardValue > 0) {
                props.value = boardValue;
            }
        } else {
            props.state = CellState.Bomb;
        }
    }

    return props;
}

interface IMacroCellProps {
    board: BoardModel;
    x: number;
    y: number;
}

const MacroCell: React.FC<IMacroCellProps> = (props: IMacroCellProps) => {
    const dispatch = useDispatch();

    let cellProps = extractCellProps(props.board, props.x, props.y);

    return (<td>
        <Cell pushed={cellProps.pushed} value={cellProps.value} state={cellProps.state} onClick={() => {
            dispatch(clickCell(props.x, props.y))
        }} onRightClick={() => {
            console.log("test");
        }} />
    </td>)
}

const Board: React.FC = () => {
    const board = useSelector(boardSelector);

    let rows = range(board.height).map(y => {
        return (<tr key={y}>
            {
                range(board.width).map(x => <MacroCell key={x} board={board} x={x} y={y} />)
            }
        </tr>);
    })

    return (
        <table>
            <tbody>{rows}</tbody>
        </table>
    );
}

export default Board;