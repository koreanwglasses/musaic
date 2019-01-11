export interface Hashable {
    /**
    * Indicates whether some other object is "equal to" this one.
    * @param {any} obj the reference object with which to compare.
    * @returns {boolean} true if this object is the same as the obj argument; false
    * otherwise.
    */
    equals(obj: any): boolean;
    
    /**
    * Returns a hash code value for the object. This method is supported for the
    * benefit of hash tables such as those provided by HashSet.
    * @returns {string} a hash code value for this object.
    */
    hashString(): string;
}

export class HashMap<K extends Hashable, V> implements Iterable<[K, V]> {
    private map: Map<String, Array<[K, V]>>;
    
    /**
    * The Map object holds key-value pairs and remembers the original insertion order of the keys. Any value (both objects and primitive values) may be used as either a key or a value.
    * @param {Iterable<[K, V]>} iterable An Array or other iterable object whose elements are key-value pairs (arrays with two elements, e.g. [[ 1, 'one' ],[ 2, 'two' ]]). Each key-value pair is added to the new Map; null values are treated as undefined.
    */
    public constructor(iterable?: Iterable<[K, V]>) {
        this.map = new Map<String, Array<[K, V]>>();
        if(iterable) {
            for(let entry of iterable) {
                this.set(entry[0], entry[1]);
            }
        }
    }
    
    /**
    * The clear() method removes all elements from a Map object. 
    */
    public clear(): void {
        this.map = new Map<String, Array<[K, V]>>();
    }
    
    /**
    * The delete() method removes the specified element from a Map object.
    * @param {K} key The key of the element to remove from the Map object.
    * @returns {boolean} true if an element in the Map object existed and has been removed, or false if the element does not exist.
    */
    public delete(key: K): boolean {
        if(this.has(key)) {
            let hashString = key.hashString();
            let bucket = this.map.get(hashString);
            
            if(bucket.length == 1) {
                this.map.delete(hashString);
            }
            
            let index = bucket.findIndex((item) => {
                return key.equals(item);
            });
            bucket.splice(index, 1);
            
            return true;
        } else {
            return false;
        }
    }
    
    /**
    * The entries() method returns a new Iterator object that contains the [key, value] pairs for each element in the Map object in insertion order. 
    * @returns {Iterator<[K, V]>} A new Map iterator object.
    */
    public entries(): Iterator<[K, V]> {
        let allValues = new Array<[K, V]>();
        for(let entry of this.map) {
            for(let kv of entry[1]) {
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
    public forEach(callback: (value: V, key: K, map: HashMap<K, V>) => void, thisArg?: any): void {
        throw new Error("Method not implemented.");
    }
    
    /**
    * The get() method returns a specified element from a Map object.
    * @param {K} key Required. The key of the element to return from the Map object.
    * @returns {V} Returns the element associated with the specified key or undefined if the key can't be found in the Map object.
    */
    public get(key: K): V {
        let bucket = this.map.get(key.hashString());
        if(!bucket) { 
            return undefined;
        } else {
            for(let item of bucket) {
                if(key.equals(item[0])) return item[1];
            }
            return undefined;
        }
    }    
    
    /**
    * The has() method returns a boolean indicating whether an element with the specified key exists or not. 
    * @param {K} key Required. The key of the element to test for presence in the Map object. 
    * @returns {boolean} Returns true if an element with the specified key exists in the Map object; otherwise false.
    */
    public has(key: K): boolean {
        return this.get(key) !== undefined; 
    }
    
    /**
    * The keys() method returns a new Iterator object that contains the keys for each element in the Map object in no particular order.
    * @returns {K} A new Map iterator object.
    */ 
    public keys(): Iterator<K> {
        let keysArray = new Array<K>();
        for(let entry of this) {
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
    public set(key: K, value: V): HashMap<K, V> {
        if(!this.has(key)) {
            let hashString = key.hashString();
            let bucket = this.map.get(hashString);
            if(!bucket) {
                this.map.set(hashString, [[key, value]]);
            } else {
                bucket.push([key, value]);
            }
        }
        return this;
    }
    
    /**
    * The values() method returns a new Iterator object that contains the values for each element in the Map object in no particular order.
    * @returns {Iterator<V>} A new Map iterator object
    */
    public values(): Iterator<V> {
        let valuesArray = new Array<V>();
        for(let entry of this) {
            valuesArray.push(entry[1]);
        }
        return valuesArray.values();
    }
    
    /**
    * The initial value of the @@iterator property is the same function object as the initial value of the entries method.
    * @returns The map iterator function, which is the entries() function by default.
    */
    [Symbol.iterator](): Iterator<[K, V]> {
        return this.entries();
    }
}