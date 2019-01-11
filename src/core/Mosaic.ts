import { Color, Point } from './Pixel';
import { Observable } from './Observable';

export abstract class Mosaic extends Observable {
    private width: number;
    private height: number;

    /**
     * Construct an empty mosaic with given height and width in pixels
     * @param width width in pixels
     * @param height height in pixels
     */
    public constructor(width: number, height: number) {
        super();
        this.width = width;
        this.height = height;
    }

    /**
     * Add a pixel with this color to the mosaic. Also sets changed to true if the
     * pixel was added successfully.
     * @param tile Color of the pixel to add
     * @returns true if the pixel was added successfully. False otherwise.
     */
    abstract addTile(tile: Color): boolean;
    abstract getColorAt(x: number, y: number): Color;
    abstract isOnBoundary(x: number, y: number): boolean;
    abstract allPoints(): Iterable<Point>;

    /**
     * @returns The width in pixels
     */
    public getWidth(): number {
        return this.width;
    }

    /**
     * @returns The width in pixels
     */
    public getHeight(): number {
        return this.height;
    }
}