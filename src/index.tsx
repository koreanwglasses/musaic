import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { PixelMosaic } from './components/PixelMosaic';
import { SimpleMosaic } from './core/SimpleMosaic';
import { Color } from './core/Pixel';

let mosaic = new SimpleMosaic(100, 100);
let view = <PixelMosaic mosaic={mosaic} scale={5} />;

ReactDOM.render(view, document.getElementById('root'));

function addRandomTiles(n: number): boolean {
    if(n == 1) {
        let r = Math.floor(Math.random() * 255);
        let g = Math.floor(Math.random() * 255);
        let b = Math.floor(Math.random() * 255);
        let a = Math.random();
        let color = new Color(r, g, b, a);

        return mosaic.addTile(color);
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
    if(addRandomTiles(10)) {
        mosaic.notifyObservers();
        requestAnimationFrame(animate);
    }
}

animate()
