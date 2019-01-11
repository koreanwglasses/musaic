import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { PixelMosaic } from './components/PixelMosaic';
import { SimpleMosaic } from './core/SimpleMosaic';
import { Color } from './core/Pixel';

let mosaic = new SimpleMosaic(500, 500);
let view = <PixelMosaic mosaic={mosaic} />;

ReactDOM.render(view, document.getElementById('root'));

function animate() {
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);
    let a = Math.random();
    let color = new Color(r, g, b, a);
    mosaic.addTile(color);

    mosaic.notifyObservers();
    requestAnimationFrame(animate);
}

animate()
