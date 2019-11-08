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

export class Position {
    constructor(public x: number, public y: number) {}

    isEqualTo(other: Position): boolean {
        return this.x === other.x && this.y === other.y;
    }
}

function arrayContains(set: Array<Position>, elem: Position): boolean {
    for (const check of set) {
        if (elem.isEqualTo(check)) {
            return true;
        }
    }
    return false;
}

export default class Model {
    width: number;
    height: number;
    bombCount: number;

    content: Array<CellContent>;
    pushState: Array<boolean>;
    flags: Array<Position>;
    errorCell?: Position = undefined;

    constructor(width: number, height: number, bombCount: number, setup = true) {
        this.width = width;
        this.height = height;
        this.bombCount = bombCount;

        this.content = new Array(this.width * this.height).fill(0);
        this.pushState = new Array(this.width * this.height).fill(false);
        this.flags = [];
        if (setup) {
            this.randomFill();
        }
    }

    clone(): Model {
        let newBoard = new Model(this.width, this.height, this.bombCount, false);
        newBoard.content = [...this.content];
        newBoard.pushState = [...this.pushState];
        newBoard.flags = [...this.flags];
        return newBoard
    }

    randomFill() {
        // place bombs
        let bombIndices = sample(range(this.content.length), this.bombCount);
        for (let i of bombIndices) {
            this.content[i] = "bomb";
        }

        // count near bombs for each cells
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                if (!this.isBomb(x, y)) {
                    let counter = 0;
                    for (const neighbor of this.buildNeighbors(x, y)) {
                        if (this.isBomb(neighbor.x, neighbor.y)) {
                            counter += 1;
                        }
                    }
                    this.content[this.buildIndex(x, y)] = counter;
                }
            }
        }
    }

    buildIndex(x: number, y: number): number {
        return y * this.width + x;
    }

    buildNeighbors(x: number, y: number): Array<Position> {
        let offsets = [[-1, -1], [0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0]];
        let res: Array<Position> = [];
        for (const [dx, dy] of offsets) {
            let nx = x + dx;
            let ny = y + dy;
            if (this.checkInBounds(nx, ny)) {
                res.push(new Position(nx, ny));
            }
        }
        return res;
    }

    isBomb(x: number, y: number): boolean {
        return this.getCellContent(x, y) === "bomb";
    }

    getCellContent(x: number, y: number): CellContent {
        this.assertInBounds(x, y);
        return this.content[this.buildIndex(x, y)];
    }

    getPushState(x: number, y: number): boolean {
        this.assertInBounds(x, y);
        return this.pushState[this.buildIndex(x, y)];
    }

    setFlag(x: number, y: number, value: boolean): Model {
        this.assertInBounds(x, y);
        let pos = new Position(x, y);
        let newBoard = this.clone();
        if (value && !arrayContains(this.flags, pos)) {
            newBoard.flags.push(pos);
        } else if (!value) {
            newBoard.clearFlag([new Position(x, y)]);
        }
        return newBoard;
    }

    flagCount(): number {
        return this.flags.length;
    }

    clearFlag(positions: Array<Position>) {
        this.flags = this.flags.filter(value => {
            return !arrayContains(positions, value);
        });
    }

    isFlagged(x: number, y: number): boolean {
        this.assertInBounds(x, y);
        return arrayContains(this.flags, new Position(x, y));
    }

    isWin() {
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                if (this.getCellContent(x, y) !== "bomb" && !this.getPushState(x, y)) {
                    return false
                }
            }
        } 
        return true;
    }

    switchToFailState(x: number, y: number) {
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                if (this.getCellContent(x, y) === "bomb") {
                    this.pushState[this.buildIndex(x, y)] = true;
                }
            }
        } 
        this.errorCell = new Position(x, y);
    }

    pushCell(x: number, y: number): StepInfo {
        this.assertInBounds(x, y);
        if (this.getPushState(x, y)) {
            return new StepInfo(this);
        }

        let newBoard = this.clone();
        let cellValue = newBoard.getCellContent(x, y);
        if (cellValue === "bomb") {
            newBoard.switchToFailState(x, y);
            return new StepInfo(newBoard, true);
        } else {
            let newPushed = [new Position(x, y)];
            if (cellValue === 0) {
                let openList: Array<Position> = [new Position(x, y)];
                let closedList: Array<Position> = [];
                while (openList.length > 0) {
                    const current = openList.pop()!;
                    closedList.push(current);

                    for (const neighbor of this.buildNeighbors(current.x, current.y)) {
                        if (!arrayContains(closedList, neighbor)) {
                            newPushed.push(neighbor);
                            if (newBoard.getCellContent(neighbor.x, neighbor.y) === 0) {
                                openList.push(neighbor)
                            }
                        }
                    }
                }
            }

            for (const { x, y } of newPushed) {
                newBoard.pushState[this.buildIndex(x, y)] = true;
            }
            newBoard.clearFlag(newPushed);

            return new StepInfo(newBoard);
        }
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

export class StepInfo {
    model: Model;
    isFail: boolean;

    constructor(model: Model, isFail: boolean = false) {
        this.model = model;
        this.isFail = isFail;
    }
}