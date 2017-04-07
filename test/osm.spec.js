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
const truthy = (val) => !!val;
const falsey = (val) => !val;

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

  describe('isArrayEqual', () => {
    it('should return true when arrays both arrays point to same spot in memory', () => {
      const array = [1];
      expect(osm.isArrayEqual(array, array)).to.be.true;
    });

    it('should return true when arrays both arrays contain the same elements', () => {
      const array = [1];
      const array2 = [1];
      expect(osm.isArrayEqual(array, array2)).to.be.true;
    });

    it(`should return false when arrays both arrays don't have the same length`, () => {
      const array = [1];
      const array2 = [1,2];
      expect(osm.isArrayEqual(array, array2)).to.be.false;
    });

    it(`should return false when arrays both arrays don't contain same elements`, () => {
      const array = [1,3];
      const array2 = [1,2];
      expect(osm.isArrayEqual(array, array2)).to.be.false;
    });
  });

  describe('findKeyByValue', () => {
    it('should return a function when the object is not provided', () => {
      assert.isFunction(osm.findKeyByValue(truthy));
    });

    it('should return undefined when no keys in the object match the value returned by the function', () => {
      const fn = osm.findKeyByValue(falsey);
      const curriedVal = fn(scores);
      expect(curriedVal).to.eql(undefined);

      const returnVal = osm.findKeyByValue(falsey, scores);
      expect(returnVal).to.eql(undefined);
    });

    it('should return undefined when no keys in the object match the value', () => {
      const fn = osm.findKeyByValue(7);
      const curriedVal = fn(scores);
      expect(curriedVal).to.eql(undefined);

      const returnVal = osm.findKeyByValue(7, scores);
      expect(returnVal).to.eql(undefined);
    });

    it('should return the first key that matches the value returned by the function', () => {
      const expected = 'Jason';
      const actual = osm.findKeyByValue(predicate, scores);
      expect(actual).to.eql(expected);

      const curried = osm.findKeyByValue(predicate);
      expect(curried(scores)).to.eql(expected);
    });

    it('should return the first key that matches the value', () => {
      const expected = 'Sam';
      const actual = osm.findKeyByValue(3, scores);
      expect(actual).to.eql(expected);

      const curried = osm.findKeyByValue(3);
      expect(curried(scores)).to.eql(expected);
    });

    it('should return the first key that matches the value of an array', () => {
      const compareArray = [1, 2, 3];
      const expected = 'arrayVal';
      const obj = {
        arrayVal: [1, 2, 3],
        'boolean': false,
        'string': 'test',
        'innerObj': {
          innerKey: 'innerVal'
        },
        'nullVal': null,
        'notDefined': undefined,
        'notANumber': NaN,
        'dateVal': new Date('2016-01-01')
      }

      let actual = osm.findKeyByValue(compareArray, obj);
      expect(actual).to.eql(expected);

      actual = osm.findKeyByValue([], obj);
      expect(actual).to.eql(undefined);

      const curried = osm.findKeyByValue(compareArray);
      expect(curried(obj)).to.eql(expected);
    });

    it('should return the first key that matches the value of a boolen', () => {
      const expected = 'boolean';
      const obj = {
        arrayVal: [1, 2, 3],
        'boolean': false,
        'string': 'test',
        'innerObj': {
          innerKey: 'innerVal'
        },
        'nullVal': null,
        'notDefined': undefined,
        'notANumber': NaN,
        'dateVal': new Date('2016-01-01'),
        'secondBool': false
      }

      let actual = osm.findKeyByValue(false, obj);
      expect(actual).to.eql(expected);

      const curried = osm.findKeyByValue(false);
      expect(curried(obj)).to.eql(expected);

      actual = osm.findKeyByValue(true, obj);
      expect(actual).to.eql(undefined);
    });

    it('should return the first key that matches the value of a string', () => {
      const expected = 'string';
      const obj = {
        arrayVal: [1, 2, 3],
        'boolean': false,
        'string': 'test',
        'innerObj': {
          innerKey: 'innerVal'
        },
        'nullVal': null,
        'notDefined': undefined,
        'notANumber': NaN,
        'dateVal': new Date('2016-01-01')
      }

      let actual = osm.findKeyByValue('test', obj);
      expect(actual).to.eql(expected);

      actual = osm.findKeyByValue('', obj);
      expect(actual).to.eql(undefined);

      const curried = osm.findKeyByValue('test');
      expect(curried(obj)).to.eql(expected);
    });

    it('should return the first key that matches the null value', () => {
      const expected = 'nullVal';
      const obj = {
        arrayVal: [1, 2, 3],
        'boolean': false,
        'string': 'test',
        'innerObj': {
          innerKey: 'innerVal'
        },
        'nullVal': null,
        'notDefined': undefined,
        'notANumber': NaN,
        'dateVal': new Date('2016-01-01')
      }

      const actual = osm.findKeyByValue(null, obj);
      expect(actual).to.eql(expected);

      const curried = osm.findKeyByValue(null);
      expect(curried(obj)).to.eql(expected);
    });

    it('should return the first key that matches the undefined value', () => {
      const expected = 'notDefined';
      const obj = {
        arrayVal: [1, 2, 3],
        'boolean': false,
        'string': 'test',
        'innerObj': {
          innerKey: 'innerVal'
        },
        'nullVal': null,
        'notDefined': undefined,
        'notANumber': NaN,
        'dateVal': new Date('2016-01-01')
      }

      const actual = osm.findKeyByValue(undefined, obj);
      expect(actual).to.eql(expected);

      const curried = osm.findKeyByValue(undefined);
      expect(curried(obj)).to.eql(expected);
    });

    it('should return the false when searching for NaN', () => {
      const expected = 'notANumber';
      const obj = {
        arrayVal: [1, 2, 3],
        'boolean': false,
        'string': 'test',
        'innerObj': {
          innerKey: 'innerVal'
        },
        'nullVal': null,
        'notDefined': undefined,
        'notANumber': NaN,
        'dateVal': new Date('2016-01-01')
      }

      const actual = osm.findKeyByValue(NaN, obj);
      expect(actual).to.not.eql(expected);

      const curried = osm.findKeyByValue(NaN);
      expect(curried(obj)).to.not.eql(expected);
    });

    it('should return the first key that matches the value of a date', () => {
      const expectedDate = new Date('2016-01-01')
      const expected = 'dateVal';
      const obj = {
        arrayVal: [1, 2, 3],
        'boolean': false,
        'string': 'test',
        'innerObj': {
          innerKey: 'innerVal'
        },
        'nullVal': null,
        'notDefined': undefined,
        'notANumber': NaN,
        'dateVal': new Date('2016-01-01')
      }

      const actual = osm.findKeyByValue(expectedDate, obj);
      expect(actual).to.eql(expected);

      const second = osm.findKeyByValue(new Date('2015-01-01'), obj);
      expect(second).to.eql(undefined);

      const curried = osm.findKeyByValue(expectedDate);
      expect(curried(obj)).to.eql(expected);
    });

    //This behavior will be changed in a future version. For now, when the value is an object, return undefined
    it('should return the first key that matches the value of an object', () => {
      const comparatorObj = {
        innerKey: 'innerVal',
        test: 'best'
      };
      const expected = undefined;
      const obj = {
        arrayVal: [1, 2, 3],
        'boolean': false,
        'string': 'test',
        'innerObj': {
          innerKey: 'innerVal'
        },
        'nullVal': null,
        'notDefined': undefined,
        'notANumber': NaN,
        'dateVal': new Date('2016-01-01')
      }

      const actual = osm.findKeyByValue(comparatorObj, obj);
      expect(actual).to.eql(expected);

      const curried = osm.findKeyByValue(comparatorObj);
      expect(curried(obj)).to.eql(expected);
    });
  });

  describe('keys', () => {
    it('should return an empty array when give null or undefined', () => {
      const expected = [];

      expect(osm.keys(null)).to.eql(expected);
      expect(osm.keys(undefined)).to.eql(expected);
    });

    it('should return outcome of object.keys in other scenarios', () => {
      const testData = ['', false, true, 0, 1, 100, 'another test', {},
        {test: 1, 'another-one': 2, 'third': {fourth: 4}}, NaN, new Date()];

      testData.forEach(data => expect(Object.keys(data)).to.eql(osm.keys(data)));
    });
  });
});
