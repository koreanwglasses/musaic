import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { PixelMosaic } from './components/PixelMosaic';
import { SimpleMosaic } from './core/SimpleMosaic';
import { Color } from './core/Pixel';

let mosaic = new SimpleMosaic(50, 50);
let view = <PixelMosaic mosaic={mosaic} scale={5} />;

ReactDOM.render(view, document.getElementById('root'));

function animate() {
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);
    let a = Math.random();
    let color = new Color(r, g, b, a);
    
    if(mosaic.addTile(color)) {
        mosaic.notifyObservers();
        requestAnimationFrame(animate);
    }
}

animate()
