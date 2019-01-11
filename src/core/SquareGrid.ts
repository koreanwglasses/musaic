import { Point, Color } from './Pixel';
import { Grid } from './Grid';

export class SquareGrid implements Grid {
    private width: number;
    private height: number;

    private grid: Array<Array<Color>>;
    private allpts: Array<Point>;

    public constructor(width: number, height: number) {
        this.width = width;
        this.height = height;

        this.grid = new Array<Array<Color>>();
        this.allpts = new Array<Point>();
        for(let i = 0; i < height; i++) {
            this.grid[i] = new Array<Color>();
            for(let j = 0; j < width; j++) {
                this.grid[i][j] = Color.blank;
                this.allpts.push(new Point(j, i));
            }
        }
    }

    setColorAt(x: number, y: number, color: Color): void {
        this.grid[y][x] = color;
    }    
    
    getColorAt(x: number, y: number): Color {
        return this.grid[y][x];
    }

    isSet(x: number, y: number): boolean {
        return !this.grid[y][x].equals(Color.blank); 
    }

    getNeighborsOf(x: number, y: number): Iterable<Point> {
        let neighbors = new Array<Point>();
        neighbors.push(new Point(x - 1, y - 1));
        neighbors.push(new Point(x - 1, y));
        neighbors.push(new Point(x - 1, y + 1));
        neighbors.push(new Point(x, y - 1));
        neighbors.push(new Point(x, y + 1));
        neighbors.push(new Point(x + 1, y - 1));
        neighbors.push(new Point(x + 1, y));
        neighbors.push(new Point(x + 1, y + 1));

        let self_ = this;
        return neighbors.filter((point) => {
            return 0 <= point.getX() && point.getX() < self_.width 
                && 0 <= point.getY() && point.getY() < self_.height;
        });
    }

    getAllPoints(): Iterable<Point> {
        return this.allpts;
    }
    
    getWidth(): number {
        return this.width;
    }
    
    getHeight(): number {
        return this.height;
    }
}