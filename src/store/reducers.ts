import { CLICK_CELL, BoardActionTypes, BoardState } from "./types";
import Board from "./board";

const initialState: BoardState = {
    board: new Board(12, 10)
}

export function boardReducer(state = initialState, action: BoardActionTypes): BoardState {
    console.log(action);
    switch (action.type) {
        case CLICK_CELL:
            let x = action.x;
            let y = action.y;
            let { board } = state;
            let newValue = !board.getValue(x, y);
            let newBoard = board.changeValue(x, y, newValue);
            return { board: newBoard };
        default:
            return state;
    }
}