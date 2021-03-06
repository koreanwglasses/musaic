var Musaic =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.tsx");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/components/VoronoiView.tsx":
/*!****************************************!*\
  !*** ./src/components/VoronoiView.tsx ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "react");
const THREE = __webpack_require__(/*! three */ "three");
const Pixel_1 = __webpack_require__(/*! ../core/Pixel */ "./src/core/Pixel.ts");
const VoronoiHelper_1 = __webpack_require__(/*! ../three/VoronoiHelper */ "./src/three/VoronoiHelper.ts");
const three_1 = __webpack_require__(/*! three */ "three");
const HashMap_1 = __webpack_require__(/*! ../core/HashMap */ "./src/core/HashMap.ts");
class VoronoiView extends React.Component {
    constructor(props) {
        super(props);
        this.mosaic = this.props.mosaic;
        if (!this.mosaic) {
            throw new Error("Mosaic not defined in props!");
        }
        this.scale = this.props.scale || 1;
        this.mosaic.addObserver(this);
    }
    componentDidMount() {
        this.init();
        this.updateCanvas();
    }
    init() {
        const container = this.refs.container;
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(this.mosaic.getWidth() * this.scale, this.mosaic.getHeight() * this.scale);
        container.appendChild(this.renderer.domElement);
        this.scene = new THREE.Scene();
        this.camera = new THREE.OrthographicCamera(0, this.mosaic.getWidth(), 0, -this.mosaic.getHeight(), 0, 1000);
        this.camera.position.y = 10;
        this.camera.lookAt(0, 0, 0);
        this.offsets = new HashMap_1.HashMap();
    }
    updateCanvas() {
        while (this.scene.children.length > 0) {
            this.scene.remove(this.scene.children[0]);
        }
        let pixels = new Array();
        for (let point of this.mosaic.allPoints()) {
            let x = point.getX();
            let y = point.getY();
            let color;
            if (this.mosaic.isOnBoundary(x, y)) {
                color = new Pixel_1.Color(0, 0, 0, 1);
            }
            else {
                color = this.mosaic.getColorAt(x, y);
            }
            if (this.mosaic.isOnBoundary(x, y) || this.mosaic.isSet(x, y)) {
                let pixel = new Pixel_1.Pixel(point, color);
                pixels.push(pixel);
                if (!this.offsets.has(point)) {
                    let ox = 0.8 * (Math.random() - 0.5);
                    let oy = 0.8 * (Math.random() - 0.5);
                    this.offsets.set(point, new three_1.Vector2(ox, oy));
                }
            }
        }
        let mesh = new VoronoiHelper_1.VoronoiHelper(pixels, this.offsets, 2);
        this.scene.add(mesh);
        this.renderer.render(this.scene, this.camera);
    }
    render() {
        return React.createElement("div", { ref: "container" });
    }
    update() {
        this.updateCanvas();
    }
}
exports.VoronoiView = VoronoiView;


/***/ }),

/***/ "./src/controllers/SimpleAnimationController.tsx":
/*!*******************************************************!*\
  !*** ./src/controllers/SimpleAnimationController.tsx ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "react");
const ReactDOM = __webpack_require__(/*! react-dom */ "react-dom");
const VoronoiView_1 = __webpack_require__(/*! ../components/VoronoiView */ "./src/components/VoronoiView.tsx");
const SimpleSquareMosaic_1 = __webpack_require__(/*! ../core/SimpleSquareMosaic */ "./src/core/SimpleSquareMosaic.ts");
const Pixel_1 = __webpack_require__(/*! ../core/Pixel */ "./src/core/Pixel.ts");
class SimpleAnimationController {
    constructor(mosaic, view) {
        this.mosaic = mosaic !== undefined ? mosaic : new SimpleSquareMosaic_1.SimpleSquareMosaic(100, 100);
        this.view = view !== undefined ? view : React.createElement(VoronoiView_1.VoronoiView, { mosaic: this.mosaic, scale: 5 });
    }
    init() {
        ReactDOM.render(this.view, document.getElementById('root'));
    }
    start() {
        let self_ = this;
        function addRandomTiles(n) {
            if (n == 1) {
                let r = Math.floor(Math.random() * 255);
                let g = Math.floor(Math.random() * 255);
                let b = Math.floor(Math.random() * 255);
                let color = new Pixel_1.Color(r, g, b);
                return self_.mosaic.addTile(color);
            }
            else {
                for (let i = 0; i < n; i++) {
                    if (!addRandomTiles(1)) {
                        return false;
                    }
                }
                return true;
            }
        }
        function animate() {
            let result = addRandomTiles(10);
            self_.mosaic.notifyObservers();
            if (result) {
                requestAnimationFrame(animate);
            }
        }
        animate();
    }
}
exports.SimpleAnimationController = SimpleAnimationController;


/***/ }),

/***/ "./src/core/HashMap.ts":
/*!*****************************!*\
  !*** ./src/core/HashMap.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class HashMap {
    /**
    * The Map object holds key-value pairs and remembers the original insertion order of the keys. Any value (both objects and primitive values) may be used as either a key or a value.
    * @param {Iterable<[K, V]>} iterable An Array or other iterable object whose elements are key-value pairs (arrays with two elements, e.g. [[ 1, 'one' ],[ 2, 'two' ]]). Each key-value pair is added to the new Map; null values are treated as undefined.
    */
    constructor(iterable) {
        this.map = new Map();
        if (iterable) {
            for (let entry of iterable) {
                this.set(entry[0], entry[1]);
            }
        }
    }
    /**
    * The clear() method removes all elements from a Map object.
    */
    clear() {
        this.map = new Map();
    }
    /**
    * The delete() method removes the specified element from a Map object.
    * @param {K} key The key of the element to remove from the Map object.
    * @returns {boolean} true if an element in the Map object existed and has been removed, or false if the element does not exist.
    */
    delete(key) {
        if (this.has(key)) {
            let hashString = key.hashString();
            let bucket = this.map.get(hashString);
            if (bucket.length == 1) {
                this.map.delete(hashString);
            }
            let index = bucket.findIndex((item) => {
                return key.equals(item);
            });
            bucket.splice(index, 1);
            return true;
        }
        else {
            return false;
        }
    }
    /**
    * The entries() method returns a new Iterator object that contains the [key, value] pairs for each element in the Map object in insertion order.
    * @returns {Iterator<[K, V]>} A new Map iterator object.
    */
    entries() {
        let allValues = new Array();
        for (let entry of this.map) {
            for (let kv of entry[1]) {
                allValues.push(kv);
            }
        }
        return allValues.values();
    }
    /**
    * The forEach() method executes a provided function once per each key/value pair in the Map object, in no particular order.
    * @param {(value: V, key: K, map: HashMap<K, V>) => void} callback Function to execute for each element.
    * @param {any?} thisArg Value to use as this when executing callback.
    */
    forEach(callback, thisArg) {
        throw new Error("Method not implemented.");
    }
    /**
    * The get() method returns a specified element from a Map object.
    * @param {K} key Required. The key of the element to return from the Map object.
    * @returns {V} Returns the element associated with the specified key or undefined if the key can't be found in the Map object.
    */
    get(key) {
        let bucket = this.map.get(key.hashString());
        if (!bucket) {
            return undefined;
        }
        else {
            for (let item of bucket) {
                if (key.equals(item[0]))
                    return item[1];
            }
            return undefined;
        }
    }
    /**
    * The has() method returns a boolean indicating whether an element with the specified key exists or not.
    * @param {K} key Required. The key of the element to test for presence in the Map object.
    * @returns {boolean} Returns true if an element with the specified key exists in the Map object; otherwise false.
    */
    has(key) {
        return this.get(key) !== undefined;
    }
    /**
    * The keys() method returns a new Iterator object that contains the keys for each element in the Map object in no particular order.
    * @returns {K} A new Map iterator object.
    */
    keys() {
        let keysArray = new Array();
        for (let entry of this) {
            keysArray.push(entry[0]);
        }
        return keysArray.values();
    }
    /**
    * The set() method adds or updates an element with a specified key and value to a Map object.
    * @param {K} key The key of the element to add to the Map object.
    * @param {V} value The value of the element to add to the Map object.
    * @returns The Map object.
    */
    set(key, value) {
        if (this.has(key))
            this.delete(key);
        let hashString = key.hashString();
        let bucket = this.map.get(hashString);
        if (!bucket) {
            this.map.set(hashString, [[key, value]]);
        }
        else {
            bucket.push([key, value]);
        }
        return this;
    }
    /**
    * The values() method returns a new Iterator object that contains the values for each element in the Map object in no particular order.
    * @returns {Iterator<V>} A new Map iterator object
    */
    values() {
        let valuesArray = new Array();
        for (let entry of this) {
            valuesArray.push(entry[1]);
        }
        return valuesArray.values();
    }
    /**
    * The initial value of the @@iterator property is the same function object as the initial value of the entries method.
    * @returns The map iterator function, which is the entries() function by default.
    */
    [Symbol.iterator]() {
        return this.entries();
    }
}
exports.HashMap = HashMap;


/***/ }),

/***/ "./src/core/HashSet.ts":
/*!*****************************!*\
  !*** ./src/core/HashSet.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const HashMap_1 = __webpack_require__(/*! ./HashMap */ "./src/core/HashMap.ts");
class HashSet {
    /**
    * The Set object lets you store unique values of any hashable type.
    * @param {Iterable<T>} iterable If an iterable object is passed, all of its
    * elements will be added to the new Set. If you don't specify this parameter,
    * or its value is null, the new Set is empty.
    * @returns {HashSet<T>} A new Set object
    */
    constructor(iterable) {
        this.map = new HashMap_1.HashMap();
        if (iterable) {
            for (let value of iterable) {
                this.add(value);
            }
        }
    }
    /**
    * Appends a new element with a specified value to the end of this Set.
    * @param {T} value Required. The value of the element to add to this Set.
    * @returns {HashSet} The Set object.
    */
    add(value) {
        this.map.set(value, value);
        return this;
    }
    /**
    * Appends the new elements with a specified values to the end of this Set.
    * @param {T} value Required. The value of the element to add to this Set.
    * @returns {HashSet} The Set object.
    */
    addAll(values) {
        for (let value of values) {
            this.add(value);
        }
        return this;
    }
    /**
    * Removes all elements from this Set.
    */
    clear() {
        this.map.clear();
    }
    /**
    * Removes the specified element from this Set.
    * @param {T} value Required. The value of the element to remove from the Set
    * object.
    * @returns {boolean} true if an element in the Set object has been removed successfully;
    * otherwise false.
    */
    delete(value) {
        return this.map.delete(value);
    }
    /**
    * Returns a new Iterator object that contains an array of [value, value] for
    * each element in this Set, in insertion order. For Set objects there is no
    * key like in Map objects. However, to keep the API similar to the Map object,
    * each entry has the same value for its key and value here, so that an array
    * [value, value] is returned.
    * @returns {Iterator<[T, T]>} A new Iterator object that contains an array of [value, value] for
    * each element in this Set, in insertion order.
    */
    entries() {
        return this.map.entries();
    }
    /**
    * Executes a provided function once for each value in this Set, in insertion
    * order.
    * @param {(value1: T, value2: T, Set: HashSet<T>) => void} callback Function
    * to execute for each element.
    *
    *     value1, value2
    *
    * The value contained in the the current position in this Set. The same value
    * is passed for both arguments.
    *
    *     Set
    *
    * The Set object that's being traversed.
    * @param {any?} thisArg Value to use as this when executing callback.
    */
    forEach(callback, thisArg) {
        throw new Error("Method not implemented.");
    }
    /**
    * Returns a boolean indicating whether an element with the specified value
    * exists in a Set object or not.
    * @param {T} value Required. The value to test for presence in this Set.
    * @returns {boolean} Returns true if an element with the specified value exists in the Set object; otherwise false.
    */
    has(value) {
        return this.map.has(value);
    }
    /**
    * The values() method returns a new Iterator object that contains the values
    * for each element in this Set object in no particular order.
    *
    * The keys() method is an alias for this method (for similarity with Map objects);
    * it behaves exactly the same and returns values of Set elements.
    * @returns {Iterator<T>} A new Iterator object containing the values for each
    * element in this Set, in no particular order.
    */
    keys() {
        return this.map.keys();
    }
    /**
    * The keys() method returns a new Iterator object that contains the values
    * for each element in this Set object in no particular order.
    *
    * The values() method is an alias for this method (for similarity with Map objects);
    * it behaves exactly the same and returns values of Set elements.
    * @returns {Iterator<T>} A new Iterator object containing the values for each
    * element in this Set, in no particular order.
    */
    values() {
        return this.map.values();
    }
    /**
    * The initial value of the @@iterator property is the same function object
    * as the initial value of the values property.
    * @returns {Iterator<T>} The Set iterator function, which is the values()
    * function by default.
    */
    [Symbol.iterator]() {
        return this.values();
    }
}
exports.HashSet = HashSet;


/***/ }),

/***/ "./src/core/Mosaic.ts":
/*!****************************!*\
  !*** ./src/core/Mosaic.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Observable_1 = __webpack_require__(/*! ./Observable */ "./src/core/Observable.ts");
class Mosaic extends Observable_1.Observable {
    /**
     * Construct an empty mosaic with given height and width in pixels
     * @param width width in pixels
     * @param height height in pixels
     */
    constructor(width, height) {
        super();
        this.width = width;
        this.height = height;
    }
    /**
     * @returns The width in pixels
     */
    getWidth() {
        return this.width;
    }
    /**
     * @returns The width in pixels
     */
    getHeight() {
        return this.height;
    }
}
exports.Mosaic = Mosaic;


/***/ }),

/***/ "./src/core/Observable.ts":
/*!********************************!*\
  !*** ./src/core/Observable.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Observable {
    /**
     * Construct an Observable with zero Observers.
     */
    constructor() {
        this.observers = new Set();
    }
    /**
     * Adds an observer to the set of observers for this object, provided that
     * it is not the same as some observer already in the set.
     * @param o an observer to be added.
     */
    addObserver(o) {
        this.observers.add(o);
    }
    /**
     * Tests if this object has changed.
     * @returns true if and only if the setChanged method has been called more
     * recently than the clearChanged method on this object; false otherwise.
     */
    hasChanged() {
        return this.isChanged;
    }
    /**
     * Marks this Observable object as having been changed; the hasChanged method
     * will now return true.
     */
    setChanged() {
        this.isChanged = true;
    }
    /**
     * Indicates that this object has no longer changed, or that it has already
     * notified all of its observers of its most recent change, so that the hasChanged
     * method will now return false. This method is called automatically by the
     * notifyObservers methods.
     */
    clearChanged() {
        this.isChanged = false;
    }
    /**
     * If this object has changed, as indicated by the hasChanged method, then notify
     * all of its observers and then call the clearChanged method to indicate that
     * this object has no longer changed.
     *
     * Each observer has its update method called with two arguments: this observable
     * object and the arg argument.
     * @param arg any object.
     */
    notifyObservers(arg) {
        for (let observer of this.observers) {
            observer.update(this, arg);
        }
        this.clearChanged();
    }
}
exports.Observable = Observable;


/***/ }),

/***/ "./src/core/Pixel.ts":
/*!***************************!*\
  !*** ./src/core/Pixel.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Represents an RGBA color
 */
class Color {
    /**
     * Constructs an RGBA color object.
     * @param {number?} r An integer in the range [0, 255]
     * @param {number?} g An integer in the range [0, 255]
     * @param {number?} b An integer in the range [0, 255]
     * @param {number?} a A float in the range [0, 1]
     */
    constructor(r, g, b, a) {
        this.r = r !== undefined ? r : 0;
        this.g = g !== undefined ? g : 0;
        this.b = b !== undefined ? b : 0;
        this.a = a !== undefined ? a : 1;
    }
    getR() {
        return this.r;
    }
    getG() {
        return this.g;
    }
    getB() {
        return this.b;
    }
    getA() {
        return this.a;
    }
    /**
     * Gets the color as a string of the form rgba(r,g,b,a)
     */
    getRgba() {
        return 'rgba(' + this.r + ',' + this.b + ',' + this.g + ',' + this.a + ')';
    }
    equals(obj) {
        if (!(obj instanceof Color)) {
            return false;
        }
        return this.r == obj.r && this.g == obj.g && this.b == obj.b && this.a == obj.a;
    }
    hashString() {
        return this.r + ',' + this.g + ',' + this.b + ',' + this.a;
    }
}
Color.blank = new Color(0, 0, 0, 0);
exports.Color = Color;
/**
 * Represents a point on the screen
 */
class Point {
    /**
     * Constructs a point object
     * @param {number?} x An integer
     * @param {number?} y An integer
     */
    constructor(x, y) {
        this.x = x || 0;
        this.y = y || 0;
    }
    getX() {
        return this.x;
    }
    getY() {
        return this.y;
    }
    equals(obj) {
        if (!(obj instanceof Point)) {
            return false;
        }
        return Math.abs(this.x - obj.x) < 0.00001 && Math.abs(this.y - obj.y) < 0.00001;
    }
    hashString() {
        return this.x.toPrecision(10) + ',' + this.y.toPrecision(10);
    }
}
exports.Point = Point;
class Pixel {
    constructor(position, color) {
        this.position = position;
        this.color = color;
    }
    getPosition() {
        return this.position;
    }
    getColor() {
        return this.color;
    }
}
exports.Pixel = Pixel;


/***/ }),

/***/ "./src/core/SimpleMosaic.ts":
/*!**********************************!*\
  !*** ./src/core/SimpleMosaic.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Pixel_1 = __webpack_require__(/*! ./Pixel */ "./src/core/Pixel.ts");
const HashSet_1 = __webpack_require__(/*! ./HashSet */ "./src/core/HashSet.ts");
const Mosaic_1 = __webpack_require__(/*! ./Mosaic */ "./src/core/Mosaic.ts");
class SimpleMosaic extends Mosaic_1.Mosaic {
    constructor(grid, seed) {
        super(grid.getWidth(), grid.getHeight());
        this.grid = grid;
        this.boundary = new HashSet_1.HashSet();
        this.boundary.addAll(seed);
    }
    addTile(color) {
        let self_ = this;
        function colorDistance(color1, color2) {
            return Math.pow(color1.getR() - color2.getR(), 2) + Math.pow(color1.getG() - color2.getG(), 2)
                + Math.pow(color1.getB() - color2.getB(), 2);
        }
        function similarity(x, y) {
            let neighbors = self_.grid.getNeighborsOf(x, y);
            let minDistance = Number.POSITIVE_INFINITY;
            for (let neighbor of neighbors) {
                if (self_.grid.isSet(neighbor.getX(), neighbor.getY())) {
                    let distance = colorDistance(color, self_.grid.getColorAt(neighbor.getX(), neighbor.getY()));
                    minDistance = Math.min(minDistance, distance);
                }
            }
            if (!Number.isFinite(minDistance))
                return 0;
            else
                return minDistance;
        }
        function findBestPoint() {
            let minSimilarity = Number.POSITIVE_INFINITY;
            let bestPoint;
            for (let point of self_.boundary) {
                let sim = similarity(point.getX(), point.getY());
                if (sim < minSimilarity) {
                    minSimilarity = sim;
                    bestPoint = point;
                }
            }
            return bestPoint;
        }
        function updateBoundary(point) {
            self_.boundary.delete(point);
            let neighbors = self_.grid.getNeighborsOf(point.getX(), point.getY());
            for (let neighbor of neighbors) {
                if (!self_.grid.isSet(neighbor.getX(), neighbor.getY())) {
                    self_.boundary.add(neighbor);
                }
            }
        }
        let bestPoint = findBestPoint();
        if (!bestPoint)
            return false;
        updateBoundary(bestPoint);
        this.grid.setColorAt(bestPoint.getX(), bestPoint.getY(), color);
        this.setChanged();
        return true;
    }
    getColorAt(x, y) {
        return this.grid.getColorAt(x, y);
    }
    isSet(x, y) {
        return this.grid.isSet(x, y);
    }
    isOnBoundary(x, y) {
        return this.boundary.has(new Pixel_1.Point(x, y));
    }
    allPoints() {
        return this.grid.getAllPoints();
    }
}
exports.SimpleMosaic = SimpleMosaic;


/***/ }),

/***/ "./src/core/SimpleSquareMosaic.ts":
/*!****************************************!*\
  !*** ./src/core/SimpleSquareMosaic.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const SimpleMosaic_1 = __webpack_require__(/*! ./SimpleMosaic */ "./src/core/SimpleMosaic.ts");
const SquareGrid_1 = __webpack_require__(/*! ./SquareGrid */ "./src/core/SquareGrid.ts");
const Pixel_1 = __webpack_require__(/*! ./Pixel */ "./src/core/Pixel.ts");
class SimpleSquareMosaic extends SimpleMosaic_1.SimpleMosaic {
    constructor(width, height) {
        let grid = new SquareGrid_1.SquareGrid(width, height);
        super(grid, [new Pixel_1.Point(Math.floor(width / 2), Math.floor(height / 2))]);
    }
}
exports.SimpleSquareMosaic = SimpleSquareMosaic;


/***/ }),

/***/ "./src/core/SquareGrid.ts":
/*!********************************!*\
  !*** ./src/core/SquareGrid.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Pixel_1 = __webpack_require__(/*! ./Pixel */ "./src/core/Pixel.ts");
class SquareGrid {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.grid = new Array();
        this.allpts = new Array();
        for (let i = 0; i < height; i++) {
            this.grid[i] = new Array();
            for (let j = 0; j < width; j++) {
                this.grid[i][j] = Pixel_1.Color.blank;
                this.allpts.push(new Pixel_1.Point(j, i));
            }
        }
    }
    setColorAt(x, y, color) {
        this.grid[y][x] = color;
    }
    getColorAt(x, y) {
        return this.grid[y][x];
    }
    isSet(x, y) {
        return !this.grid[y][x].equals(Pixel_1.Color.blank);
    }
    getNeighborsOf(x, y) {
        let neighbors = new Array();
        neighbors.push(new Pixel_1.Point(x - 1, y - 1));
        neighbors.push(new Pixel_1.Point(x - 1, y));
        neighbors.push(new Pixel_1.Point(x - 1, y + 1));
        neighbors.push(new Pixel_1.Point(x, y - 1));
        neighbors.push(new Pixel_1.Point(x, y + 1));
        neighbors.push(new Pixel_1.Point(x + 1, y - 1));
        neighbors.push(new Pixel_1.Point(x + 1, y));
        neighbors.push(new Pixel_1.Point(x + 1, y + 1));
        function shuffle(arr) {
            for (let i = 0; i < arr.length; i++) {
                let j = Math.floor(Math.random() * (arr.length - i)) + i;
                let tmp = arr[j];
                arr[j] = arr[i];
                arr[i] = tmp;
            }
        }
        shuffle(neighbors);
        let self_ = this;
        return neighbors.filter((point) => {
            return 0 <= point.getX() && point.getX() < self_.width
                && 0 <= point.getY() && point.getY() < self_.height;
        });
    }
    getAllPoints() {
        return this.allpts;
    }
    getWidth() {
        return this.width;
    }
    getHeight() {
        return this.height;
    }
}
exports.SquareGrid = SquareGrid;


/***/ }),

/***/ "./src/index.tsx":
/*!***********************!*\
  !*** ./src/index.tsx ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const SimpleAnimationController_1 = __webpack_require__(/*! ./controllers/SimpleAnimationController */ "./src/controllers/SimpleAnimationController.tsx");
let cont = new SimpleAnimationController_1.SimpleAnimationController();
cont.init();
cont.start();


/***/ }),

/***/ "./src/three/VoronoiHelper.ts":
/*!************************************!*\
  !*** ./src/three/VoronoiHelper.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const THREE = __webpack_require__(/*! three */ "three");
class VoronoiHelper extends THREE.Object3D {
    constructor(pixels, offsets, radius, segments) {
        super();
        var instances = pixels.length;
        var radius_ = radius || 1;
        var segments_ = segments || 16;
        var offsets_ = [];
        var colors = [];
        // instanced attributes
        for (var i = 0; i < instances; i++) {
            // offsets
            let position = pixels[i].getPosition();
            let x = position.getX();
            let y = position.getY();
            offsets_.push(x + offsets.get(position).x, 0, y + offsets.get(position).y);
            // colors
            colors.push(pixels[i].getColor().getR() / 255.0, pixels[i].getColor().getG() / 255.0, pixels[i].getColor().getB() / 255.0, 1.0);
        }
        var coneGeometry = new THREE.ConeBufferGeometry(radius_, radius_ * 2, segments_);
        var geometry = new THREE.InstancedBufferGeometry();
        geometry.index = coneGeometry.index;
        geometry.attributes = coneGeometry.attributes;
        geometry.maxInstancedCount = instances;
        geometry.addAttribute('offset', new THREE.InstancedBufferAttribute(new Float32Array(offsets_), 3));
        geometry.addAttribute('color', new THREE.InstancedBufferAttribute(new Float32Array(colors), 4));
        var material = new THREE.RawShaderMaterial({
            vertexShader: VoronoiHelper.vertexShader,
            fragmentShader: VoronoiHelper.fragmentShader,
        });
        var mesh = new THREE.Mesh(geometry, material);
        this.add(mesh);
    }
}
VoronoiHelper.vertexShader = `
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
VoronoiHelper.fragmentShader = `
    precision highp float;
    
    varying vec4 vColor;
    
    void main() {
        gl_FragColor = vColor;
    }
    `;
exports.VoronoiHelper = VoronoiHelper;


/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = React;

/***/ }),

/***/ "react-dom":
/*!***************************!*\
  !*** external "ReactDOM" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ReactDOM;

/***/ }),

/***/ "three":
/*!************************!*\
  !*** external "THREE" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = THREE;

/***/ })

/******/ });
//# sourceMappingURL=musaic.js.map