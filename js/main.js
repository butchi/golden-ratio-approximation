(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var S = function () {
  function S() {
    _classCallCheck(this, S);

    this.strPrev = '1';
    this.str = '10';
  }

  _createClass(S, [{
    key: 'get',
    value: function get(n) {
      if (this.str[n]) {
        return this.str[n];
      } else {
        var _ref = [this.str + this.strPrev, this.str];
        this.str = _ref[0];
        this.strPrev = _ref[1];

        return this.get(n);
      }
    }
  }]);

  return S;
}();

var Wythoff = function () {
  function Wythoff() {
    _classCallCheck(this, Wythoff);

    this.arr = [[1, 2]];
    this.s = new S();
  }

  _createClass(Wythoff, [{
    key: 'get',
    value: function get(y, x) {
      if (this.arr[y] && this.arr[y][x]) {
        return this.arr[y][x];
      } else if (this.arr[y]) {
        return this.get(y, x - 1) + this.get(y, x - 2);
      } else {
        this.arr[y] = [this.get(y - 1, 0) + (this.s.get(y - 1) === '1' ? 3 : 2), this.get(y - 1, 1) + (this.s.get(y - 1) === '1' ? 5 : 3)];
        return this.get(y, x);
      }
    }
  }]);

  return Wythoff;
}();

$(function () {
  var $tbl = $('.wythoff-array');

  var wythoff = new Wythoff();

  function find(n) {
    for (var y = 0; y < n; y++) {
      var xMax = n;
      $tbl.text($tbl.text() + (y + ': ________').slice(0, 6));
      for (var x = 0; x < xMax; x++) {
        $tbl.text($tbl.text() + ('________' + wythoff.get(y, x)).slice(-8));
        if (wythoff.get(y, x) === n) {
          $tbl.text($tbl.text() + '\n\n');
          return [y, x];
        } else if (wythoff.get(y, x) > n) {
          xMax = Math.min(xMax, x);
          break;
        }
      }
      $tbl.text($tbl.text() + '\n');
    }
  }

  function getGoldenRatio(n) {
    var _find = find(n);

    var _find2 = _slicedToArray(_find, 2);

    var y = _find2[0];
    var x = _find2[1];


    return wythoff.get(y, x + 1) / n;
  }

  var φ = (1 + Math.sqrt(5)) / 2;

  console.log(getGoldenRatio(1024), φ);

  console.log(getGoldenRatio(Math.pow(2, 8)).toString(2), φ.toString(2));
});

},{}]},{},[1]);
