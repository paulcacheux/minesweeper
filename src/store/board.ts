import { sample, range } from "../utils";

export type CellContent = "bomb" | number;

export class BoardCell {
    content: CellContent;
    pushed: boolean;

    constructor(content: CellContent, pushed = false) {
        this.content = content;
        this.pushed = pushed;
    }
}

export default class Board {
    width: number;
    height: number;
    content: Array<CellContent>;
    pushState: Array<boolean>;

    constructor(width: number, height: number, setup = true) {
        this.width = width;
        this.height = height;
        this.content = new Array(this.width * this.height).fill(0);
        this.pushState = new Array(this.width * this.height).fill(false);
        if (setup) {
            this.randomFill();
        }
    }

    randomFill() {
        let bombCount = 10;
        let bombIndices = sample(range(this.content.length), bombCount);
        for (let i of bombIndices) {
            this.content[i] = "bomb";
        }
    }

    clone(): Board {
        let newBoard = new Board(this.width, this.height, false);
        newBoard.content = [...this.content];
        newBoard.pushState = [...this.pushState];
        return newBoard
    }

    getCellContent(x: number, y: number): CellContent {
        this.assertInBounds(x, y);
        return this.content[y * this.width + x];
    }

    getPushState(x: number, y: number): boolean {
        this.assertInBounds(x, y);
        return this.pushState[y * this.width + x];
    }

    pushCell(x: number, y: number): Board {
        this.assertInBounds(x, y);
        let newBoard = this.clone();
        newBoard.pushState[y * this.width + x] = true;
        return newBoard;
    }

    assertInBounds(x: number, y: number) {
        if (!this.checkInBounds(x, y)) {
            throw new Error("board out of bounds");
        }
    }

    checkInBounds(x: number, y: number): boolean {
        return x >= 0 && y >= 0 && x < this.width && y < this.height;
    }
}