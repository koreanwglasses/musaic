import { Hashable } from './HashMap';

/**
 * Represents an RGBA color
 */
export class Color implements Hashable {
    private r: number;
    private g: number;
    private b: number;
    private a: number;

    /**
     * Constructs an RGBA color object.
     * @param {number?} r An integer in the range [0, 255]
     * @param {number?} g An integer in the range [0, 255]
     * @param {number?} b An integer in the range [0, 255]
     * @param {number?} a A float in the range [0, 1] 
     */
    public constructor(r?: number, g?: number, b?: number, a?: number) {
        this.r = r !== undefined ? r : 0;
        this.g = g !== undefined ? g : 0;
        this.b = b !== undefined ? b : 0;
        this.a = a !== undefined ? a : 1;
    }

    public getR(): number {
        return this.r;
    }

    public getG(): number {
        return this.g;
    }

    public getB(): number {
        return this.b;
    }

    public getA(): number {
        return this.a;
    }

    /**
     * Gets the color as a string of the form rgba(r,g,b,a)
     */
    public getRgba(): string {
        return 'rgba(' + this.r + ',' + this.b + ',' + this.g + ',' + this.a + ')';
    }

    public equals(obj: any): boolean {
        if(!(obj instanceof Color)) {
            return false;
        }
        return this.r == obj.r && this.g == obj.g && this.b == obj.b && this.a == obj.a;
    }

    public hashString(): string {
        return this.r + ',' + this.g + ',' + this.b + ',' + this.a;
    }

    public static readonly blank = new Color(0,0,0,0);
}

/**
 * Represents a point on the screen
 */
export class Point implements Hashable{
    private x: number;
    private y: number;
   
    /**
     * Constructs a point object
     * @param {number?} x An integer
     * @param {number?} y An integer
     */
    public constructor(x?: number, y?: number) {
        this.x = x || 0;
        this.y = y || 0;
    }

    public getX(): number {
        return this.x;
    }

    public getY(): number {
        return this.y;
    }

    public equals(obj: any): boolean {
        if(!(obj instanceof Point)) {
            return false;
        }
        return Math.abs(this.x - obj.x) < 0.00001 && Math.abs(this.y - obj.y) < 0.00001;
    }

    public hashString(): string {
        return this.x.toPrecision(10) + ',' + this.y.toPrecision(10);
    }
}

export class Pixel {
    private position: Point;
    private color: Color;

    public constructor(position: Point, color: Color) {
        this.position = position;
        this.color = color;
    }

    public getPosition(): Point {
        return this.position;
    }

    public getColor(): Color {
        return this.color;
    }
}