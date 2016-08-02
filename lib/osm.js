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
	
	var isObject = function isObject(obj) {
	  return Object.prototype.toString.call(obj) === objIdentifier;
	};
	
	var clone = function clone(obj) {
	  return Object.assign(Object.create(obj), obj);
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
	
	exports.default = {
	  map: map,
	  filter: filter,
	  isObject: isObject,
	  clone: clone,
	  extend: extend,
	  omit: omit
	};
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;
//# sourceMappingURL=osm.js.map