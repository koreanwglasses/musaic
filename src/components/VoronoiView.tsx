import * as React from 'react';
import * as THREE from 'three';
import { Color, Point, Pixel } from '../core/Pixel';
import { Mosaic } from '../core/Mosaic';
import { Observer } from '../core/Observable';
import { VoronoiHelper } from '../three/VoronoiHelper';
import { Vector2, Vector } from 'three';
import { HashMap } from '../core/HashMap';

export class VoronoiView extends React.Component<any, any> implements Observer {
    private mosaic: Mosaic;
    private scale: number;
    
    private renderer: THREE.WebGLRenderer;
    private scene: THREE.Scene;
    private camera: THREE.Camera;
    
    private offsets: HashMap<Point, Vector2>;
    
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
        this.init();        
        this.updateCanvas();
    }
    
    init() {
        const container = (this.refs.container as HTMLDivElement);
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(this.mosaic.getWidth()*this.scale, this.mosaic.getHeight()*this.scale);
        container.appendChild(this.renderer.domElement);
        
        this.scene = new THREE.Scene();
        
        this.camera = new THREE.OrthographicCamera(0, this.mosaic.getWidth(), 0, -this.mosaic.getHeight(), 0, 1000);
        this.camera.position.y = 10;
        this.camera.lookAt(0, 0, 0);
        
        this.offsets = new HashMap<Point, Vector2>(); 
    }
    
    updateCanvas() {
        while(this.scene.children.length > 0){ 
            this.scene.remove(this.scene.children[0]); 
        }
        
        let pixels = new Array<Pixel>();
        
        for(let point of this.mosaic.allPoints()) { 
            let x = point.getX();
            let y = point.getY();
            let color;
            if(this.mosaic.isOnBoundary(x, y)) {
                color = new Color(0, 0, 0, 1);
            } else {
                color = this.mosaic.getColorAt(x, y);
            }
            
            if(this.mosaic.isOnBoundary(x, y) || this.mosaic.isSet(x, y)) {
                let pixel = new Pixel(point, color);
                pixels.push(pixel);
                
                if(!this.offsets.has(point)) {
                    let ox = 0.8 * (Math.random() - 0.5);
                    let oy = 0.8 * (Math.random() - 0.5);
                    this.offsets.set(point, new Vector2(ox, oy));
                }
            }
        }
        
        let mesh = new VoronoiHelper(pixels, this.offsets, 2);
        this.scene.add( mesh );
        
        this.renderer.render(this.scene, this.camera);
    }
    
    
    render() {
        return <div ref="container" />;
    }
    
    update() {
        this.updateCanvas();
    }
}