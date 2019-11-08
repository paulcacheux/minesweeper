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
        // place bombs
        let bombCount = 10;
        let bombIndices = sample(range(this.content.length), bombCount);
        for (let i of bombIndices) {
            this.content[i] = "bomb";
        }

        // count near bombs for each cells
        let offsets = [[-1, -1], [0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0]];

        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                if (!this.isBomb(x, y)) {
                    let counter = 0;
                    for (const [dx, dy] of offsets) {
                        let nx = x + dx;
                        let ny = y + dy;
                        if (this.checkInBounds(nx, ny) && this.isBomb(nx, ny)) {
                            counter += 1;
                        }
                    }
                    this.content[y * this.width + x] = counter;
                }
            }
        }
    }

    clone(): Board {
        let newBoard = new Board(this.width, this.height, false);
        newBoard.content = [...this.content];
        newBoard.pushState = [...this.pushState];
        return newBoard
    }

    isBomb(x: number, y: number): boolean {
        return this.getCellContent(x, y) === "bomb";
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