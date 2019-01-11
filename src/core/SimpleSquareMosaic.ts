import { SimpleMosaic } from "./SimpleMosaic";
import { SquareGrid } from "./SquareGrid";
import { Point } from "./Pixel";

export class SimpleSquareMosaic extends SimpleMosaic {
    constructor(width: number, height: number) {
        let grid = new SquareGrid(width, height);
        super(grid, [new Point(Math.floor(width / 2), Math.floor(height / 2))]);
    }
}