import React from "react";
import { Cell, /*CellState*/ } from "./Cell";
import "../style/Board.css";
import { useSelector, useDispatch } from "react-redux";
import { BoardState, CLICK_CELL } from "../store/types";

const range = (n: number) => Array.from({ length: n }, (value, key) => key);

const boardSelector = (state: BoardState) => state.board;

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
                                    return (<td key={x}>
                                        <Cell pushed={board.getValue(x, y)} onClick={() => {
                                            dispatch({type: CLICK_CELL, x, y})
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