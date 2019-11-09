import { CLICK_CELL, NEW_GAME, FLAG_CELL, CHANGE_LEFT_CLICK_TOOL } from "./types";

export function clickCell(x: number, y: number) {
    return {
        type: CLICK_CELL,
        x: x,
        y: y,
    }
}

export function flagCell(x: number, y: number) {
    return {
        type: FLAG_CELL,
        x: x,
        y: y,
    }
}

export function newGame() {
    return {
        type: NEW_GAME,
    }
}

export function changeTool(leftClickFlag: boolean) {
    return {
        type: CHANGE_LEFT_CLICK_TOOL,
        leftClickFlag: leftClickFlag,
    }
}