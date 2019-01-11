import { Grid } from './Grid';
import { Color, Point } from './Pixel';
import { HashSet } from './HashSet';
import { Mosaic } from './Mosaic';

export abstract class SimpleMosaic extends Mosaic {
    private grid: Grid;
    private boundary: HashSet<Point>;

    public constructor(grid: Grid, seed: Iterable<Point>) {
        super(grid.getWidth(), grid.getHeight());

        this.grid = grid;
        
        this.boundary = new HashSet<Point>();
        this.boundary.addAll(seed);
    }
    
    public addTile(color: Color): boolean {
        let self_ = this;
        
        function colorDistance(color1: Color, color2: Color): number {
            return Math.pow(color1.getR() - color2.getR(), 2) + Math.pow(color1.getG() - color2.getG(), 2)
            + Math.pow(color1.getB() - color2.getB(), 2);
        }
        
        function similarity(x: number, y: number): number {
            let neighbors = self_.grid.getNeighborsOf(x, y)

            let minDistance = Number.POSITIVE_INFINITY;
            for(let neighbor of neighbors) {
                if(self_.grid.isSet(neighbor.getX(), neighbor.getY())) {
                    let distance = colorDistance(color, self_.grid.getColorAt(neighbor.getX(), neighbor.getY()));
                    minDistance = Math.min(minDistance, distance);
                }
            }

            if(!Number.isFinite(minDistance)) return 0;
            else return minDistance;
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
            let neighbors = self_.grid.getNeighborsOf(point.getX(), point.getY());
            for(let neighbor of neighbors) {
                if(!self_.grid.isSet(neighbor.getX(), neighbor.getY())) {
                    self_.boundary.add(neighbor);
                }
            }
        }
        
        let bestPoint = findBestPoint();
        if(!bestPoint) return false;
        updateBoundary(bestPoint);
        this.grid.setColorAt(bestPoint.getX(), bestPoint.getY(), color);
        this.setChanged();
        return true;
    }
    
    public getColorAt(x: number, y: number): Color {
        return this.grid.getColorAt(x, y);
    }

    public isSet(x: number, y: number): boolean {
        return this.grid.isSet(x, y);
    }

    public isOnBoundary(x: number, y: number): boolean {
        return this.boundary.has(new Point(x, y));
    }

    public allPoints(): Iterable<Point> {
        return this.grid.getAllPoints();
    }
}