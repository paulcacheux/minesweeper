import { CLICK_CELL, BoardActionTypes, BoardState } from "./types";

export function clickCell(x: number, y: number) {
    return {
        type: CLICK_CELL,
        x: x,
        y: y,
    }
}