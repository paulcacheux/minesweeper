import { CLICK_CELL, BoardActionTypes, BoardState, NEW_GAME, FLAG_CELL, GameState, ToolActionTypes, ToolState, CHANGE_LEFT_CLICK_TOOL } from "./types";
import Model from "./model";
import { combineReducers } from "redux";

const parseParam = (params: URLSearchParams, query: string, defaultValue: number) => {
    const strValue = params.get(query);
    if (!strValue) {
        return defaultValue;
    }
    const value = parseInt(strValue, 10);
    if (Number.isNaN(value)) {
        return defaultValue;
    }
    return value;
}

const initialStateBuilder = (): BoardState => {
    const search = window.location.search;
    const params = new URLSearchParams(search);

    const width = parseParam(params, "width", 9);
    const height = parseParam(params, "height", 9);
    const bombs = parseParam(params, "bombs", 10);

    return {
        board: new Model(width, height, bombs),
        gameState: GameState.playing,
        startDate: 0,
    }
}

const initialState: BoardState = initialStateBuilder();

function clickCellInner(state: BoardState, x: number, y: number): BoardState {
    let board = state.board.clone();
    let isFail = board.pushCell(x, y);
    if (isFail) {
        return { board, gameState: GameState.overLose };
    } else if (board.isWin()) {
        return { board, gameState: GameState.overWin };
    } else {
        return { board, gameState: GameState.playing, startDate: state.startDate };
    }
}

function flagCellInner(state: BoardState, x: number, y: number): BoardState {
    if (state.board.getPushState(x, y)) {
        return state;
    } else {
        let board = state.board.clone();
        let previous = board.isFlagged(x, y);
        board.setFlag(x, y, !previous);
        return { ...state, board: board };
    }
}

function launchTimer(state: BoardState): BoardState {
    if (state.gameState === GameState.playing && (state.startDate === undefined || typeof state.startDate === "number")) {
        return { ...state, startDate: new Date() };
    } else {
        return state;
    }
}

export function boardReducer(state = initialState, action: BoardActionTypes): BoardState {
    switch (action.type) {
        case CLICK_CELL:
            if (state.gameState === GameState.playing) {
                let x = action.x;
                let y = action.y;
                return launchTimer(clickCellInner(state, x, y));
            } else {
                return state;
            }
        case FLAG_CELL:
            if (state.gameState === GameState.playing) {
                let x = action.x;
                let y = action.y;
                return launchTimer(flagCellInner(state, x, y));
            } else {
                return state;
            }
        case NEW_GAME:
            return initialStateBuilder();
        default:
            return state;
    }
}

export function toolReducer(state: ToolState = { leftClickFlag: false }, action: ToolActionTypes): ToolState {
    switch (action.type) {
        case CHANGE_LEFT_CLICK_TOOL:
            return { leftClickFlag: action.leftClickFlag };
        default:
            return state;
    }
}

const rootReducer = combineReducers({ game: boardReducer, tools: toolReducer });
export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;