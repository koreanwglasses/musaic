import { Color, Point } from './Pixel';

export interface Grid {
    setColorAt(x: number, y: number, color: Color): void;
    getColorAt(x: number, y: number): Color;
    isSet(x: number, y: number): boolean;
    getNeighborsOf(x: number, y: number): Iterable<Point>;
    getAllPoints(): Iterable<Point>;
    getWidth(): number;
    getHeight(): number;
}