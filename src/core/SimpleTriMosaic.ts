import { SimpleMosaic } from "./SimpleMosaic";
import { TriGrid } from "./TriGrid";
import { Point } from "./Pixel";

export class SimpleTriMosaic extends SimpleMosaic {
    constructor(width: number, height: number) {
        let grid = new TriGrid(width, height);
        super(grid, [grid.getCenter()]);
    }
}