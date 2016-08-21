import {expect, assert} from 'chai';
import osm from '../lib/osm.js';

const scores = {
  Jason: 2,
  Sam: 3,
  Jane: 1
}

const doubleScores = {
  Jason: 4,
  Sam: 6,
  Jane: 2
}

const filteredScores = {
  Jason: 2,
  Sam: 3
}

const double = (v) => v * 2;
const predicate = score => score > 1;

describe('osm', () => {
  describe('map', () => {
    it('should return a function when obj is not provided', () => {
      assert.isFunction((osm.map(double)));
    });
    it('should create a new object after remaining arguments are provided', () => {
      const dbl = osm.map(double);
      expect(dbl(scores)).to.eql(doubleScores);
      expect(scores).to.not.eql(doubleScores);
    });
    it('should create a new object when all arguments are provided', () => {
      expect(osm.map(double, scores)).to.eql(doubleScores);
    });

    it('should only iterate over the own properties of the object', () => {
      let proto = {
        protoOwned: true
      },
      testObj = Object.create(proto);
      testObj.myOwn = true;

      let result = osm.map((v) => v, testObj),
        expected = {
          myOwn: true
        };
      expect(result).to.eql(expected);
      expect(result.hasOwnProperty('myOwn')).to.be.true;
      expect(result.hasOwnProperty('protoOwned')).to.be.false;
    })
  });

  describe('filter', () => {
    it('should return a function when obj is not provided', () => {
      assert.isFunction((osm.filter(predicate)));
    });

    it('should return filtered object after remianing args are provided', () => {
      const filterFn = osm.filter(predicate);
      expect(filterFn(scores)).to.eql(filteredScores);
      expect(scores).to.not.eql(filteredScores);
    })

    it('should return new obj after filtering out data', () => {
      expect(osm.filter(predicate, scores)).to.eql(filteredScores);
      expect(scores).to.not.eql(filteredScores);
    });
  });

  describe('isObject', () => {
    it('should return true if parameter is an object', () => {
      expect(osm.isObject({})).to.be.true;
    });

    it('should return false if parameter is an array', () => {
      expect(osm.isObject([])).to.be.false;
    });

    it('should return false if parameter is a string', () => {
      expect(osm.isObject('')).to.be.false;
    });

    it('should return false if parameter is a number', () => {
      expect(osm.isObject(0)).to.be.false;
    });

    it('should return false if parameter is undefined', () => {
      expect(osm.isObject(undefined)).to.be.false;
    });

    it('should return false if parameter is null', () => {
      expect(osm.isObject(null)).to.be.false;
    });

    it('should return false if parameter is NaN', () => {
      expect(osm.isObject(NaN)).to.be.false;
    });
  });

  describe('clone', () => {
    it('should create a deep clone of the object', () => {
      let animal = {
        name: 'Toby',
        type: 'Dog',
        tricks: {
          perfected: ['Sit', 'Lie Down', 'Rollover', 'Circle'],
          learning: ['Handshake'],
          teacher: {
            name: 'Mr. Awesome'
          }
        }
      };

      expect(osm.clone(animal)).to.eql(animal);
    });
  });

  describe('extend', () => {
    it('should copy all properties from source into destination.', () => {
      const numbers = {One: 1, Two: 2, Three: 3};
      const strings = {One: 'One', Two: 'Two'};
      const output = {One: 'One', Two: 'Two', Three: 3};
      const extended = osm.extend(numbers, strings);
      expect(extended).to.eql(output);
      expect(numbers).to.not.eql(extended);
    });
  });

  describe('omit', () => {
    it('should return a new obj with certain properties ommitted', () => {
      const omitScores = osm.omit(scores, ['Jason', 'Sam']);
      expect(omitScores).to.eql({Jane: 1});
      expect(scores).to.not.eql(omitScores);
    });
  });
});
