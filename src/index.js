const objIdentifier = '[object Object]';
const dateIdentifier = '[object Date]';

const curry = (fn) => {
  const arity = fn.length;

  const curried = (...args) => {
    if (args.length < arity) {
      return (...remaining) => curried(...args, ...remaining);
    }
    return fn(...args);
  };

  return curried;
};

const map = curry((fn, obj) => {
  return Object.keys(obj)
    .reduce((acc, current) => {
      acc[current] = fn(obj[current]);
      return acc;
    }, {});
});

const filter = curry((predicate, obj) => {
  return Object.keys(obj)
    .filter(key => predicate(obj[key], key))
    .reduce((res, key) => {
      res[key] = obj[key];
      return res;
    }, {});
});

const protoToString = Object.prototype.toString;

const isObject = (obj) => protoToString.call(obj) === objIdentifier;

const clone = (obj) => Object.create(obj);

const extend = (...args) => {
  return args.reduce((acc, curr) => {
    Object.assign(acc, curr);
    return acc;
  }, {});
};

const omit = (obj, keys) => filter((val, key) => keys.indexOf(key) === -1, obj);

const isArrayEqual = (arr1, arr2) => {
  if (arr1.length !== arr2.length) {
    return false;
  }

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }
  return true;
};

// TODO: May be a create a looper function which calls itself when it comes across a nested object
const isEqual = (val1, val2) => {
  if (val1 === val2) {
    return true;
  }

  const val1Proto = protoToString.call(val1);
  const val2Proto = protoToString.call(val2);

  if (val1Proto !== val2Proto) {
    return false;
  }

  if (Array.isArray(val1)) {
    return isArrayEqual(val1, val2);
  }

  if (val1Proto === dateIdentifier) {
    if (typeof val1.getTime === 'function' && typeof val2.getTime === 'function') {
      return val1.getTime() === val2.getTime();
    }
    return false;
  }

  return false;
};

const comparator = (key, value, obj) => {
  if (typeof value === 'function' && value(obj[key])) {
    return key;
  }

  if (isEqual(obj[key], value)) {
    return key;
  }
  return void 0;
};

const findKeyByValue = curry((value, obj) => {
  return Object.keys(obj)
    .find(key => comparator(key, value, obj));
});

export default {
  map,
  filter,
  isObject,
  clone,
  extend,
  omit,
  findKeyByValue,
  isArrayEqual
};
