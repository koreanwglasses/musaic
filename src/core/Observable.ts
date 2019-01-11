export interface Observer {
    update(o: Observable, arg: any): void;
}

export class Observable {
    private observers: Set<Observer>;
    private isChanged: boolean;

    /**
     * Construct an Observable with zero Observers.
     */
    public constructor() {
        this.observers = new Set<Observer>();
    }

    /**
     * Adds an observer to the set of observers for this object, provided that 
     * it is not the same as some observer already in the set.
     * @param o an observer to be added. 
     */
    public addObserver(o: Observer): void {
        this.observers.add(o);
    }

    /**
     * Tests if this object has changed.
     * @returns true if and only if the setChanged method has been called more 
     * recently than the clearChanged method on this object; false otherwise.
     */
    public hasChanged(): boolean {
        return this.isChanged;
    }

    /**
     * Marks this Observable object as having been changed; the hasChanged method
     * will now return true.
     */
    protected setChanged(): void {
        this.isChanged = true;
    }

    /**
     * Indicates that this object has no longer changed, or that it has already 
     * notified all of its observers of its most recent change, so that the hasChanged
     * method will now return false. This method is called automatically by the
     * notifyObservers methods.
     */
    protected clearChanged(): void {
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
    public notifyObservers(arg?: any): void {
        for(let observer of this.observers) {
            observer.update(this, arg);
        }
        this.clearChanged();
    }

}