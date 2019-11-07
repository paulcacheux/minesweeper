import Board from "./board";

export interface BoardState {
    board: Board
}

export const CLICK_CELL = "CLICK_CELL";

interface ClickCellAction {
    type: typeof CLICK_CELL;
    x: number;
    y: number;
}

export type BoardActionTypes = ClickCellAction;