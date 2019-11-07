export default class Board {
    width: number;
    height: number;
    content: Array<boolean>;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
        this.content = new Array(this.width * this.height).fill(false);
    }

    getValue(x: number, y: number): boolean {
        return this.content[y * this.width + x];
    }

    changeValue(x: number, y: number, value: boolean): Board {
        let newBoard = new Board(this.width, this.height);
        newBoard.content = [...this.content];
        newBoard.content[y * this.width + x] = value;
        return newBoard;
    }
}