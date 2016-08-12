const objIdentifier = '[object Object]';

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

const isObject = (obj) => Object.prototype.toString.call(obj) === objIdentifier;

const clone = (obj) => Object.create(obj);

const extend = (...args) => {
  return args.reduce((acc, curr) => {
    Object.assign(acc, curr);
    return acc;
  }, {});
};

const omit = (obj, keys) => filter((val, key) => keys.indexOf(key) === -1, obj);

export default {
  map,
  filter,
  isObject,
  clone,
  extend,
  omit
};
