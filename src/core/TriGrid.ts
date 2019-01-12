import { Point, Color } from './Pixel';
import { Grid } from './Grid';
import { HashMap } from './HashMap';

export class TriGrid implements Grid {
    private width: number;
    private height: number;

    private pixels: HashMap<Point, Color>;
    private allPoints: Array<Point>;

    private static readonly h = Math.sqrt(3) / 2;

    public constructor(width: number, height: number) {
        this.width = width;
        this.height = height;

        this.pixels = new HashMap<Point, Color>();
        this.allPoints = new Array<Point>();
        for(let i = 0; i < height / TriGrid.h; i++) {
            for(let j = 0; j < width; j++) {
                let x = i % 2 ? j + 0.5 : j; 
                let y = i * TriGrid.h;
                let point = new Point(x, y);
                this.pixels.set(point, Color.blank);
                this.allPoints.push(point);
            }
        }
    }

    setColorAt(x: number, y: number, color: Color): void {
        this.pixels.set(new Point(x, y), color);
    }    
    
    getColorAt(x: number, y: number): Color {
        return this.pixels.get(new Point(x, y));
    }

    isSet(x: number, y: number): boolean {
        return !this.pixels.get(new Point(x, y)).equals(Color.blank);
    }

    getNeighborsOf(x: number, y: number): Iterable<Point> {
        let neighbors = new Array<Point>();
        neighbors.push(new Point(x - 1, y));
        neighbors.push(new Point(x - 0.5, y + TriGrid.h));
        neighbors.push(new Point(x + 0.5, y + TriGrid.h));
        neighbors.push(new Point(x + 1, y));
        neighbors.push(new Point(x + 0.5, y - TriGrid.h));
        neighbors.push(new Point(x - 0.5, y - TriGrid.h));

        let self_ = this;
        return neighbors.filter((point) => {
            return 0 <= point.getX() && point.getX() < self_.width 
                && 0 <= point.getY() && point.getY() < self_.height;
        });
    }

    getAllPoints(): Iterable<Point> {
        return this.allPoints;
    }
    
    getWidth(): number {
        return this.width;
    }
    
    getHeight(): number {
        return this.height;
    }

    getCenter(): Point {
        return this.allPoints[Math.floor(this.allPoints.length / 2 + this.width / 2)];
    }
}