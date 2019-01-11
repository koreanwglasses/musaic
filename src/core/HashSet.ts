import { Hashable, HashMap } from './HashMap';

export class HashSet<T extends Hashable> implements Iterable<T> {
    private map: HashMap<T, T>;
    
    /**
    * The Set object lets you store unique values of any hashable type.
    * @param {Iterable<T>} iterable If an iterable object is passed, all of its
    * elements will be added to the new Set. If you don't specify this parameter,
    * or its value is null, the new Set is empty.
    * @returns {HashSet<T>} A new Set object
    */
    public constructor(iterable?: Iterable<T>) {
        this.map = new HashMap<T, T>();
        if(iterable) {
            for(let value of iterable) {
                this.add(value);
            }
        }
    }
    
    /**
    * Appends a new element with a specified value to the end of this Set.
    * @param {T} value Required. The value of the element to add to this Set.
    * @returns {HashSet} The Set object.
    */
    public add(value: T): HashSet<T> {
        this.map.set(value, value); 
        return this;
    }

    /**
    * Appends the new elements with a specified values to the end of this Set.
    * @param {T} value Required. The value of the element to add to this Set.
    * @returns {HashSet} The Set object.
    */
    public addAll(values: Iterable<T>): HashSet<T> {
        for(let value of values) {
            this.add(value);
        }
        return this;
    }
    
    /**
    * Removes all elements from this Set.
    */
    public clear(): void {
        this.map.clear();
    }
    
    /**
    * Removes the specified element from this Set.
    * @param {T} value Required. The value of the element to remove from the Set
    * object.
    * @returns {boolean} true if an element in the Set object has been removed successfully;
    * otherwise false.
    */
    public delete(value: T): boolean {
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
    public entries(): Iterator<[T, T]> {
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
    public forEach(callback: (value1: T, value2: T, Set: HashSet<T>) => void, thisArg?: any): void {
        throw new Error("Method not implemented.");
    }
    
    /**
    * Returns a boolean indicating whether an element with the specified value
    * exists in a Set object or not.
    * @param {T} value Required. The value to test for presence in this Set.
    * @returns {boolean} Returns true if an element with the specified value exists in the Set object; otherwise false.
    */
    public has(value: T): boolean {
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
    public keys(): Iterator<T> {
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
    public values(): Iterator<T> {
        return this.map.values();
    }
    
    /**
    * The initial value of the @@iterator property is the same function object
    * as the initial value of the values property. 
    * @returns {Iterator<T>} The Set iterator function, which is the values()
    * function by default. 
    */
    [Symbol.iterator](): Iterator<T> {
        return this.values();
    }
}