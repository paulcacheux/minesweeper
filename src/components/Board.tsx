import React from "react";
import { Cell, CellState, ICellProps } from "./Cell";
import "../style/Board.css";
import { useSelector, useDispatch } from "react-redux";
import { BoardState, CLICK_CELL } from "../store/types";
import { range } from "../utils";
import BoardModel from "../store/board";

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

const Board: React.FC = () => {
    const board = useSelector(boardSelector);
    const dispatch = useDispatch();

    return (
        <table>
            <tbody>
                {
                    range(board.height).map(y => {
                        return (<tr key={y}>
                            {
                                range(board.width).map(x => {
                                    let props = extractCellProps(board, x, y);

                                    return (<td key={x}>
                                        <Cell pushed={props.pushed} value={props.value} state={props.state} onClick={() => {
                                            dispatch({ type: CLICK_CELL, x, y })
                                        }} />
                                    </td>)
                                })
                            }
                        </tr>);
                    })
                }
            </tbody>
        </table>
    );
}

export default Board;