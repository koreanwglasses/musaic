import * as React from 'react';
import { Mosaic } from '../core/Mosaic';
import { Observer } from '../core/Observable';

export class PixelView extends React.Component<any, any> implements Observer {
    private mosaic: Mosaic;
    private scale: number;
    
    constructor(props: any) {
        super(props);
        this.mosaic = this.props.mosaic;
        if(!this.mosaic) {
            throw new Error("Mosaic not defined in props!");
        }
        
        this.scale = this.props.scale || 1;
        (this.mosaic as Mosaic).addObserver(this);
    }
    
    componentDidMount() {
        this.updateCanvas();
    }
    updateCanvas() {
        const ctx = (this.refs.canvas as HTMLCanvasElement).getContext('2d');
        // ctx.clearRect(0,0, this.mosaic.getWidth() * this.scale, this.mosaic.getHeight() * this.scale);
        for(let point of this.mosaic.allPoints()) {
            let x = point.getX();
            let y = point.getY();
            ctx.fillStyle = this.mosaic.getColorAt(x, y).getRgba();
            ctx.fillRect(x * this.scale, y * this.scale, this.scale, this.scale);
        }
    }
    render() {
        return (
            <canvas ref="canvas" width={this.mosaic.getWidth() * this.scale} height={this.mosaic.getHeight() * this.scale} />
            );
        }
        
        update() {
            this.updateCanvas();
        }
    }