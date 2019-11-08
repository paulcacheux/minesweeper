import { CLICK_CELL, NEW_GAME } from "./types";

export function clickCell(x: number, y: number) {
    return {
        type: CLICK_CELL,
        x: x,
        y: y,
    }
}

export function newGame() {
    return {
        type: NEW_GAME,
    }
}