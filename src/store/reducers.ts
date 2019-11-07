import { CLICK_CELL, BoardActionTypes, BoardState } from "./types";
import Board from "./board";

const initialState: BoardState = {
    board: new Board(9, 9)
}

export function boardReducer(state = initialState, action: BoardActionTypes): BoardState {
    switch (action.type) {
        case CLICK_CELL:
            let x = action.x;
            let y = action.y;
            let { board } = state;
            let newBoard = board.pushCell(x, y);
            return { board: newBoard };
        default:
            return state;
    }
}