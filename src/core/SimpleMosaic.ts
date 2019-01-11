import { Color, Point } from './Pixel';
import { HashSet } from './HashSet';
import { Mosaic } from './Mosaic';

export class SimpleMosaic extends Mosaic {
    private grid: Array<Array<Color>>
    private boundary: HashSet<Point>;
    
    public constructor(width: number, height: number) {
        super(width, height);

        this.grid = new Array<Array<Color>>();
        for(let i = 0; i < height; i++) {
            this.grid[i] = new Array<Color>();
            for(let j = 0; j < width; j++) {
                this.grid[i][j] = new Color();
            }
        }
        
        this.boundary = new HashSet<Point>();
        this.boundary.add(new Point(Math.floor(width/2), Math.floor(height/2)));
    }
    
    public addTile(color: Color): boolean {
        let self_ = this;
        function neighborsOf(x: number, y: number): Array<Point> {
            let neighbors = new Array<Point>();
            neighbors.push(new Point(x-1, y-1));
            neighbors.push(new Point(x-1, y));
            neighbors.push(new Point(x-1, y+1));
            neighbors.push(new Point(x, y-1));
            neighbors.push(new Point(x, y+1));
            neighbors.push(new Point(x+1, y-1));
            neighbors.push(new Point(x+1, y));
            neighbors.push(new Point(x+1, y+1));
            
            return neighbors.filter((value) => {
                return 0 <= value.getX() && value.getX() < self_.getWidth() && 0 <= value.getY() && value.getY() < self_.getHeight(); 
            });
        }
        
        function colorDistance(color1: Color, color2: Color): number {
            return Math.pow(color1.getR() - color2.getR(), 2) + Math.pow(color1.getG() - color2.getG(), 2)
            + Math.pow(color1.getB() - color2.getB(), 2)
        }
        
        function similarity(x: number, y: number): number {
            let distances = neighborsOf(x, y).filter((value) => {
                return !self_.getColorAt(value.getX(), value.getY()).equals(new Color());
            }).map((value) => {
                return colorDistance(color, self_.getColorAt(value.getX(), value.getY()));
            });
            if(distances.length == 0) return 0;
            else return Math.min(...distances);
        }
        
        function findBestPoint(): Point {
            let minSimilarity = Number.POSITIVE_INFINITY;
            let bestPoint: Point;
            for(let point of self_.boundary) {
                let sim = similarity(point.getX(), point.getY());
                if(sim < minSimilarity) {
                    minSimilarity = sim;
                    bestPoint = point;
                }
            }
            return bestPoint;
        }

        function updateBoundary(point: Point) {
            self_.boundary.delete(point);
            let newBoundary = neighborsOf(point.getX(), point.getY()).filter((value) => {
                return self_.getColorAt(value.getX(), value.getY()).equals(new Color());
            });
            self_.boundary.addAll(newBoundary);
        }
        
        let bestPoint = findBestPoint();
        if(!bestPoint) return false;
        updateBoundary(bestPoint);
        this.grid[bestPoint.getY()][bestPoint.getX()] = color;
        this.setChanged();
        return true;
    }
    
    public getColorAt(x: number, y: number): Color {
        return this.grid[y][x];
    }
}