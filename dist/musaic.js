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

/***/ "./src/components/PixelMosaic.tsx":
/*!****************************************!*\
  !*** ./src/components/PixelMosaic.tsx ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "react");
class PixelMosaic extends React.Component {
    constructor(props) {
        super(props);
        if (!this.props.mosaic) {
            throw new Error("Mosaic not defined in props!");
        }
        else {
            this.props.mosaic.addObserver(this);
        }
    }
    componentDidMount() {
        this.updateCanvas();
    }
    updateCanvas() {
        const mosaic = this.props.mosaic;
        const ctx = this.refs.canvas.getContext('2d');
        ctx.clearRect(0, 0, mosaic.getWidth(), mosaic.getHeight());
        for (let i = 0; i < mosaic.getHeight(); i++) {
            for (let j = 0; j < mosaic.getWidth(); j++) {
                ctx.fillStyle = mosaic.getColorAt(j, i).getRgba();
                ctx.fillRect(i, j, 1, 1);
            }
        }
    }
    render() {
        return (React.createElement("canvas", { ref: "canvas", width: this.props.mosaic.getWidth(), height: this.props.mosaic.getHeight() }));
    }
    update() {
        this.updateCanvas();
    }
}
exports.PixelMosaic = PixelMosaic;


/***/ }),

/***/ "./src/core/HashSet.ts":
/*!*****************************!*\
  !*** ./src/core/HashSet.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class HashSet {
    /**
    * The Set object lets you store unique values of any hashable type.
    * @param {Iterable<T>} iterable If an iterable object is passed, all of its
    * elements will be added to the new Set. If you don't specify this parameter,
    * or its value is null, the new Set is empty.
    * @returns {HashSet<T>} A new Set object
    */
    constructor(iterable) {
        this.map = new Map();
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
        if (!this.has(value)) {
            let hashString = value.hashString();
            let bucket = this.map.get(hashString);
            if (!bucket) {
                this.map.set(hashString, [value]);
            }
            else {
                bucket.push(value);
            }
        }
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
        throw new Error("Method not implemented.");
    }
    /**
    * Removes the specified element from this Set.
    * @param {T} value Required. The value of the element to remove from the Set
    * object.
    * @returns {boolean} true if an element in the Set object has been removed successfully;
    * otherwise false.
    */
    delete(value) {
        if (this.has(value)) {
            let hashString = value.hashString();
            let bucket = this.map.get(hashString);
            if (bucket.length == 1) {
                this.map.delete(hashString);
            }
            let index = bucket.findIndex((item) => {
                return value.equals(item);
            });
            bucket.splice(index, 1);
            return true;
        }
        else {
            return false;
        }
    }
    /**
    * Returns a new Iterator object that contains an array of [value, value] for
    * each element in this Set, in insertion order. For Set objects there is no
    * key like in Map objects. However, to keep the API similar to the Map object,
    * each entry has the same value for its key and value here, so that an array
    * [value, value] is returned.
    * @returns {Iterator<Array<T>>} A new Iterator object that contains an array of [value, value] for
    * each element in this Set, in insertion order.
    */
    entries() {
        throw new Error("Method not implemented.");
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
        let bucket = this.map.get(value.hashString());
        if (!bucket) {
            return false;
        }
        else if (bucket.length == 1) {
            return true;
        }
        else {
            for (let item of bucket) {
                if (value.equals(item))
                    return true;
            }
            return false;
        }
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
        return this.values();
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
        let allValues = new Array();
        for (let entry of this.map) {
            for (let value of entry[1]) {
                allValues.push(value);
            }
        }
        return allValues.values();
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
        this.r = r || 0;
        this.g = g || 0;
        this.b = b || 0;
        this.a = a || 1;
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
        return this.x == obj.x && this.y == obj.y;
    }
    hashString() {
        return this.x + ',' + this.y;
    }
}
exports.Point = Point;


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
    constructor(width, height) {
        super();
        this.width = width;
        this.height = height;
        this.grid = new Array();
        for (let i = 0; i < height; i++) {
            this.grid[i] = new Array();
            for (let j = 0; j < width; j++) {
                this.grid[i][j] = new Pixel_1.Color();
            }
        }
        this.boundary = new HashSet_1.HashSet();
        this.boundary.add(new Pixel_1.Point(Math.floor(width / 2), Math.floor(height / 2)));
    }
    addTile(color) {
        let self_ = this;
        function neighborsOf(x, y) {
            let neighbors = new Array();
            neighbors.push(new Pixel_1.Point(x - 1, y - 1));
            neighbors.push(new Pixel_1.Point(x - 1, y));
            neighbors.push(new Pixel_1.Point(x - 1, y + 1));
            neighbors.push(new Pixel_1.Point(x, y - 1));
            neighbors.push(new Pixel_1.Point(x, y + 1));
            neighbors.push(new Pixel_1.Point(x + 1, y - 1));
            neighbors.push(new Pixel_1.Point(x + 1, y));
            neighbors.push(new Pixel_1.Point(x + 1, y + 1));
            return neighbors.filter((value) => {
                return 0 <= value.getX() && value.getX() < self_.width && 0 <= value.getY() && value.getY() < self_.height;
            });
        }
        function colorDistance(color1, color2) {
            return Math.pow(color1.getR() - color2.getR(), 2) + Math.pow(color1.getG() - color2.getG(), 2)
                + Math.pow(color1.getB() - color2.getB(), 2);
        }
        function similarity(x, y) {
            let distances = neighborsOf(x, y).filter((value) => {
                return !self_.getColorAt(value.getX(), value.getY()).equals(new Pixel_1.Color());
            }).map((value) => {
                return colorDistance(color, self_.getColorAt(value.getX(), value.getY()));
            });
            if (distances.length == 0)
                return 0;
            else
                return Math.min(...distances);
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
            let newBoundary = neighborsOf(point.getX(), point.getY()).filter((value) => {
                return self_.getColorAt(value.getX(), value.getY()).equals(new Pixel_1.Color());
            });
            self_.boundary.addAll(newBoundary);
        }
        let bestPoint = findBestPoint();
        updateBoundary(bestPoint);
        this.grid[bestPoint.getY()][bestPoint.getX()] = color;
        this.setChanged();
    }
    getColorAt(x, y) {
        return this.grid[y][x];
    }
    getWidth() {
        return this.width;
    }
    getHeight() {
        return this.width;
    }
}
exports.SimpleMosaic = SimpleMosaic;


/***/ }),

/***/ "./src/index.tsx":
/*!***********************!*\
  !*** ./src/index.tsx ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "react");
const ReactDOM = __webpack_require__(/*! react-dom */ "react-dom");
const PixelMosaic_1 = __webpack_require__(/*! ./components/PixelMosaic */ "./src/components/PixelMosaic.tsx");
const SimpleMosaic_1 = __webpack_require__(/*! ./core/SimpleMosaic */ "./src/core/SimpleMosaic.ts");
const Pixel_1 = __webpack_require__(/*! ./core/Pixel */ "./src/core/Pixel.ts");
let mosaic = new SimpleMosaic_1.SimpleMosaic(500, 500);
let view = React.createElement(PixelMosaic_1.PixelMosaic, { mosaic: mosaic });
ReactDOM.render(view, document.getElementById('root'));
function animate() {
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);
    let a = Math.random();
    let color = new Pixel_1.Color(r, g, b, a);
    mosaic.addTile(color);
    mosaic.notifyObservers();
    requestAnimationFrame(animate);
}
animate();


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

/***/ })

/******/ });
//# sourceMappingURL=musaic.js.map