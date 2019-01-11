
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { PixelView } from '../components/PixelView';
import { VoronoiView } from '../components/VoronoiView';
import { SimpleSquareMosaic } from '../core/SimpleSquareMosaic';
import { Color } from '../core/Pixel';
import { Mosaic } from '../core/Mosaic';

export class SimpleAnimationController {
    private mosaic: Mosaic;
    private view: JSX.Element;
    
    public constructor(mosaic?: Mosaic, view?: JSX.Element) {
        this.mosaic = mosaic !== undefined ? mosaic : new SimpleSquareMosaic(100, 100);
        this.view = view !== undefined ? view : <VoronoiView mosaic={this.mosaic} scale={5} />;
    }
    
    public init(): void {
        ReactDOM.render(this.view, document.getElementById('root'));
    }
    
    public start(): void {        
        let self_ = this;
        function addRandomTiles(n: number): boolean {
            if(n == 1) {
                let r = Math.floor(Math.random() * 255);
                let g = Math.floor(Math.random() * 255);
                let b = Math.floor(Math.random() * 255);
                let color = new Color(r, g, b);
                
                return self_.mosaic.addTile(color);
            } else {
                for(let i = 0; i < n; i++) {
                    if(!addRandomTiles(1)) {
                        return false;
                    }
                }
                return true;
            }
        }
        
        function animate() {
            let result = addRandomTiles(10);
            self_.mosaic.notifyObservers();
            if(result) {
                requestAnimationFrame(animate);
            }
        }
        
        animate()
    }
}