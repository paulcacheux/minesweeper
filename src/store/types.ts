import Board from "./board";

export interface BoardState {
    board: Board
}

export const CLICK_CELL = "CLICK_CELL";
export const NEW_GAME = "NEW_GAME";

interface ClickCellAction {
    type: typeof CLICK_CELL;
    x: number;
    y: number;
}

interface NewGameAction {
    type: typeof NEW_GAME;
}

export type BoardActionTypes = ClickCellAction | NewGameAction;