import { CLICK_CELL, BoardActionTypes, BoardState, NEW_GAME, FLAG_CELL, GameState } from "./types";
import Model from "./model";

const initialStateBuilder = (): BoardState => {
    return {
        board: new Model(9, 9),
        gameState: GameState.playing,
        startDate: 0,
    }
}

const initialState: BoardState = initialStateBuilder();

function clickCellInner(state: BoardState, x: number, y: number): BoardState {
    let { board } = state;
    let stepInfos = board.pushCell(x, y);
    if (stepInfos.isFail) {
        return { board: stepInfos.model, gameState: GameState.overLose };
    } else if (stepInfos.model.isWin()) {
        return { board: stepInfos.model, gameState: GameState.overWin };
    } else {
        return { board: stepInfos.model, gameState: GameState.playing, startDate: state.startDate };
    }
}

function flagCellInner(state: BoardState, x: number, y: number): BoardState {
    if (state.board.getPushState(x, y)) {
        return state;
    } else {
        let previous = state.board.isFlagged(x, y);
        let newBoard = state.board.setFlag(x, y, !previous);
        return { ...state, board: newBoard };
    }
}

function launchTimer(state: BoardState): BoardState {
    if (state.gameState === GameState.playing && (state.startDate === undefined || typeof state.startDate === "number")) {
        return {...state, startDate: new Date()};
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