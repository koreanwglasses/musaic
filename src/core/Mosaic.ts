import { Color } from './Pixel';
import { Observable } from './Observable';
export abstract class Mosaic extends Observable {
    abstract addTile(tile: Color): void;
    abstract getColorAt(x: number, y: number): Color;

    /**
     * @returns The width in pixels
     */
    abstract getWidth(): number;

    /**
     * @returns The width in pixels
     */
    abstract getHeight(): number;
}