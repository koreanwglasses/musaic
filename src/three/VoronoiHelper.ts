import * as THREE from 'three';
import { Pixel } from '../core/Pixel';

export class VoronoiHelper extends THREE.Object3D {
    public constructor(pixels: Array<Pixel>, offsets: Array<Array<THREE.Vector2>>, radius?: number, segments?: number) {
        super();
        var instances = pixels.length;
        var radius_ = radius || 1;
        var segments_ = segments || 16;
        
        var offsets_ = [];
        var colors = [];
        
        // instanced attributes
        for ( var i = 0; i < instances; i ++ ) {
            // offsets
            let x = pixels[i].getPosition().getX();
            let y = pixels[i].getPosition().getY();
            offsets_.push( x + offsets[y][x].x, 0, y + offsets[y][x].y );
            // colors
            colors.push( pixels[i].getColor().getR() / 255.0,
            pixels[i].getColor().getG() / 255.0,
            pixels[i].getColor().getB() / 255.0, 1.0 );
        }
        
        var coneGeometry = new THREE.ConeBufferGeometry(radius_, radius_ * 2, segments_);
        
        var geometry = new THREE.InstancedBufferGeometry();
        geometry.index = coneGeometry.index;
        geometry.attributes = coneGeometry.attributes;
        geometry.maxInstancedCount = instances; 
        geometry.addAttribute( 'offset', new THREE.InstancedBufferAttribute( new Float32Array( offsets_ ), 3 ) );
        geometry.addAttribute( 'color', new THREE.InstancedBufferAttribute( new Float32Array( colors ), 4 ) );
        
        var material = new THREE.RawShaderMaterial( {
            vertexShader: VoronoiHelper.vertexShader,
            fragmentShader: VoronoiHelper.fragmentShader,
        } );
        
        var mesh = new THREE.Mesh( geometry, material );

        this.add(mesh);
    }
    
    private static readonly vertexShader = `
    precision highp float;
    
    uniform float sineTime;
    
    uniform mat4 modelViewMatrix;
    uniform mat4 projectionMatrix;
    
    attribute vec3 position;
    attribute vec3 offset;
    attribute vec4 color;
    
    varying vec3 vPosition;
    varying vec4 vColor;
    
    void main(){
        vPosition = offset + position;
        vColor = color;
        gl_Position = projectionMatrix * modelViewMatrix * vec4( vPosition, 1.0 );
    } 
    `;
    
    private static readonly fragmentShader = `
    precision highp float;
    
    varying vec4 vColor;
    
    void main() {
        gl_FragColor = vColor;
    }
    `;
}