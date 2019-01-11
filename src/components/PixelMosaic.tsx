import * as React from 'react';
import * as THREE from 'three';
import { Mosaic } from '../core/Mosaic';
import { Observer } from '../core/Observable';

export class PixelMosaic extends React.Component<any, any> implements Observer {
    constructor(props: any) {
        super(props);
        if(!this.props.mosaic) {
            throw new Error("Mosaic not defined in props!");
        } else {
            (this.props.mosaic as Mosaic).addObserver(this);
        }
    }

    componentDidMount() {
        this.updateCanvas();
    }
    updateCanvas() {
        const mosaic = this.props.mosaic as Mosaic;
        const ctx = (this.refs.canvas as HTMLCanvasElement).getContext('2d');
        ctx.clearRect(0,0, mosaic.getWidth(), mosaic.getHeight());
        for(let i = 0; i < mosaic.getHeight(); i++) {
            for(let j = 0; j < mosaic.getWidth(); j++) {
                ctx.fillStyle = mosaic.getColorAt(j, i).getRgba();
                ctx.fillRect(i, j, 1, 1);
            }
        }
    }
    render() {
        return (
            <canvas ref="canvas" width={this.props.mosaic.getWidth()} height={this.props.mosaic.getHeight()} />
        );
    }

    update() {
        this.updateCanvas();
    }
}