(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("osm", [], factory);
	else if(typeof exports === 'object')
		exports["osm"] = factory();
	else
		root["osm"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var objIdentifier = '[object Object]';
	var dateIdentifier = '[object Date]';
	
	var curry = function curry(fn) {
	  var arity = fn.length;
	
	  var curried = function curried() {
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    if (args.length < arity) {
	      return function () {
	        for (var _len2 = arguments.length, remaining = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	          remaining[_key2] = arguments[_key2];
	        }
	
	        return curried.apply(undefined, args.concat(remaining));
	      };
	    }
	    return fn.apply(undefined, args);
	  };
	
	  return curried;
	};
	
	var map = curry(function (fn, obj) {
	  return Object.keys(obj).reduce(function (acc, current) {
	    acc[current] = fn(obj[current]);
	    return acc;
	  }, {});
	});
	
	var filter = curry(function (predicate, obj) {
	  return Object.keys(obj).filter(function (key) {
	    return predicate(obj[key], key);
	  }).reduce(function (res, key) {
	    res[key] = obj[key];
	    return res;
	  }, {});
	});
	
	var every = curry(function (predicate, obj) {
	  var returnVal = true;
	
	  for (var i = 0, _keys = Object.keys(obj); i < _keys.length; i++) {
	    if (!predicate(obj[_keys[i]])) {
	      returnVal = false;
	      break;
	    }
	  }
	  return returnVal;
	});
	
	var some = curry(function (predicate, obj) {
	  var returnVal = false;
	
	  for (var i = 0, _keys2 = Object.keys(obj); i < _keys2.length; i++) {
	    if (predicate(obj[_keys2[i]])) {
	      returnVal = true;
	      break;
	    }
	  }
	  return returnVal;
	});
	
	var protoToString = Object.prototype.toString;
	
	var isObject = function isObject(obj) {
	  return protoToString.call(obj) === objIdentifier;
	};
	
	var clone = function clone(obj) {
	  return Object.create(obj);
	};
	
	var extend = function extend() {
	  for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
	    args[_key3] = arguments[_key3];
	  }
	
	  return args.reduce(function (acc, curr) {
	    Object.assign(acc, curr);
	    return acc;
	  }, {});
	};
	
	var omit = function omit(obj, keys) {
	  return filter(function (val, key) {
	    return keys.indexOf(key) === -1;
	  }, obj);
	};
	
	var isArrayEqual = function isArrayEqual(arr1, arr2) {
	  if (arr1.length !== arr2.length) {
	    return false;
	  }
	
	  for (var i = 0; i < arr1.length; i++) {
	    if (arr1[i] !== arr2[i]) {
	      return false;
	    }
	  }
	  return true;
	};
	
	// TODO: May be a create a looper function which calls itself when it comes across a nested object
	var isEqual = function isEqual(val1, val2) {
	  if (val1 === val2) {
	    return true;
	  }
	
	  var val1Proto = protoToString.call(val1);
	  var val2Proto = protoToString.call(val2);
	
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
	
	var comparator = function comparator(key, value, obj) {
	  if (typeof value === 'function' && value(obj[key])) {
	    return key;
	  }
	
	  if (isEqual(obj[key], value)) {
	    return key;
	  }
	  return void 0;
	};
	
	var findKeyByValue = curry(function (value, obj) {
	  return Object.keys(obj).find(function (key) {
	    return comparator(key, value, obj);
	  });
	});
	
	var keys = function keys(obj) {
	  if (obj === null || obj === undefined) {
	    return [];
	  }
	
	  return Object.keys(obj);
	};
	
	exports.default = {
	  map: map,
	  filter: filter,
	  isObject: isObject,
	  clone: clone,
	  extend: extend,
	  omit: omit,
	  findKeyByValue: findKeyByValue,
	  isArrayEqual: isArrayEqual,
	  keys: keys,
	  every: every,
	  some: some
	};
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;
//# sourceMappingURL=osm.js.map