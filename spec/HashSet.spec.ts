import "jasmine";
import { Color, Point } from '../src/core/Pixel';
import { HashSet } from '../src/core/HashSet';

describe("constructor/has:", () => {
    it("should create an empty set without any errors", () => {
        let hs = new HashSet<Point>();
    });
    
    
    it("should initialze a set with items from an array", () => {
        let arr = new Array<Point>();
        arr.push(new Point(1, 1));
        arr.push(new Point(1, 2));
        arr.push(new Point(2, 3));
        
        let hs = new HashSet<Point>(arr);
        expect(hs.has(new Point(1, 1))).toBeTruthy();
        expect(hs.has(new Point(1, 2))).toBeTruthy();
        expect(hs.has(new Point(2, 3))).toBeTruthy();
        expect(hs.has(new Point(2, 4))).toBeFalsy();
    });
    
    it("should initialze a set with items from another set", () => {
        let arr = new Array<Point>();
        arr.push(new Point(1, 1));
        arr.push(new Point(1, 2));
        arr.push(new Point(2, 3));
        
        let hs1 = new HashSet<Point>(arr);
        let hs2 = new HashSet<Point>(hs1);
        expect(hs2.has(new Point(1, 1))).toBeTruthy();
        expect(hs2.has(new Point(1, 2))).toBeTruthy();
        expect(hs2.has(new Point(2, 3))).toBeTruthy();
        expect(hs2.has(new Point(2, 4))).toBeFalsy();
    });
});

describe("add:", () => {
    it("should be able to add a single element", () => {
        let hs = new HashSet<Point>();
        hs.add(new Point(1, 1));
        expect(hs.has(new Point(1, 1))).toBeTruthy();
        expect(hs.has(new Point(2, 4))).toBeFalsy();
    });
    
    it("should be able to add multiple elements", () => {
        let hs = new HashSet<Point>();
        hs.add(new Point(1, 1));
        hs.add(new Point(1, 2));
        hs.add(new Point(2, 3));
        expect(hs.has(new Point(1, 1))).toBeTruthy();
        expect(hs.has(new Point(1, 2))).toBeTruthy();
        expect(hs.has(new Point(2, 3))).toBeTruthy();
        expect(hs.has(new Point(2, 4))).toBeFalsy();
    });
});

describe("delete:", () => {
    it("should be able to delete elements", () => {
        let hs = new HashSet<Point>();
        hs.add(new Point(1, 1));
        hs.add(new Point(1, 2));
        hs.add(new Point(2, 3));
        expect(hs.has(new Point(1, 1))).toBeTruthy();
        expect(hs.has(new Point(1, 2))).toBeTruthy();
        expect(hs.has(new Point(2, 3))).toBeTruthy();
        expect(hs.has(new Point(2, 4))).toBeFalsy();
        expect(hs.delete(new Point(1, 1))).toBeTruthy();
        expect(hs.has(new Point(1, 1))).toBeFalsy();
        expect(hs.has(new Point(1, 2))).toBeTruthy();
        expect(hs.has(new Point(2, 3))).toBeTruthy();
        expect(hs.has(new Point(2, 4))).toBeFalsy();
    });

    it("should be able to delete duplicate elements", () => {
        let hs = new HashSet<Point>();
        hs.add(new Point(1, 2));
        hs.add(new Point(1, 2));
        hs.add(new Point(2, 3));
        expect(hs.has(new Point(1, 2))).toBeTruthy();
        expect(hs.has(new Point(2, 3))).toBeTruthy();
        expect(hs.has(new Point(2, 4))).toBeFalsy();
        expect(hs.delete(new Point(1, 2))).toBeTruthy();
        expect(hs.has(new Point(1, 2))).toBeFalsy();
        expect(hs.has(new Point(2, 3))).toBeTruthy();
        expect(hs.has(new Point(2, 4))).toBeFalsy();
    });
});