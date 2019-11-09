import Model from "./model";

export enum GameState {
    playing,
    overWin,
    overLose,
}

export interface BoardState {
    gameState: GameState;
    board: Model;
    startDate?: Date | number;
}

export interface ToolState {
    leftClickFlag: boolean;
}

export const CLICK_CELL = "CLICK_CELL";
export const FLAG_CELL = "FLAG_CELL";
export const NEW_GAME = "NEW_GAME";
export const CHANGE_LEFT_CLICK_TOOL = "CHANGE_LEFT_CLICK_TOOL";

interface ClickCellAction {
    type: typeof CLICK_CELL;
    x: number;
    y: number;
}

interface FlagCellAction {
    type: typeof FLAG_CELL;
    x: number;
    y: number;
}

interface ChangeLeftClickToolAction {
    type: typeof CHANGE_LEFT_CLICK_TOOL;
    leftClickFlag: boolean;
}

interface NewGameAction {
    type: typeof NEW_GAME;
}

export type BoardActionTypes = ClickCellAction | FlagCellAction | NewGameAction;
export type ToolActionTypes = ChangeLeftClickToolAction;