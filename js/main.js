(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var wythoff;
var goldenRatio;

var φ = (1 + Math.sqrt(5)) / 2;

// フィボナッチ列取得用

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

// // Wythoff配列取得用
// class Wythoff {
//   constructor() {
//     this.arr = [[1, 1]];
//     this.s = new S();
//   }

//   get(y, x) {
//     if(this.arr[y] && this.arr[y][x]) {
//       return this.arr[y][x];
//     } else if(this.arr[y]) {
//       return this.get(y, x - 1) + this.get(y, x - 2);
//     } else {
//       this.arr[y] = [this.get(y - 1, 0) + (this.s.get(y - 1) === '1' ? 3 : 2), this.get(y - 1, 1) + (this.s.get(y - 1) === '1' ? 5 : 3)];
//       return this.get(y, x);
//     }
//   }
// }

// class GoldenRatio {
//   constructor() {
//   }

//   find(n) {
//     var tbl = [];

//     for(let y = 0; y < n; y++) {
//       tbl[y] = [];
//       let xMax = n;
//       for(let x = 0; x < xMax; x++) {
//         let tmp = wythoff.get(y, x);
//         tbl[y][x] = tmp;
//         if(tmp === n) {
//           tbl[y][x + 1] = wythoff.get(y, x + 1);
//           return {
//             table: tbl,
//             coord: [y, x],
//           }
//         } else if(tmp > n) {
//           xMax = Math.min(xMax, x);
//           break;
//         }
//       }
//     }
//   }
// }

var Main = function Main() {
  var _this = this;

  _classCallCheck(this, Main);

  $(function () {
    _this.$output = $('.table-wrapper');
    // wythoff = new Wythoff();
    // goldenRatio = new GoldenRatio();

    var $table = $('<table></table>');

    _this.$output.append('<p>' + φ + '</p>');
    _this.$output.append('<p>' + φ.toString(2) + '</p>');

    _this.$output.append($table);

    $table.append('\n<tr style="text-align: center;">\n  <td>w1</td>\n  <td>w2</td>\n  <td>w3</td>\n  <td>w3 / w2</td>\n  <td>binary</td>\n</tr>\n      ');

    var n = 1024;
    var s = new S();

    var w1 = [1];
    var w2 = [1];

    for (var i = 1; i < 1000000; i++) {
      var tmp = s.get(i - 1);
      var val1 = w1[i - 1] + (tmp === '1' ? 2 : 1);
      var val2 = w2[i - 1] + (tmp === '1' ? 3 : 2);
      var val3 = val1 + val2;

      w1[i] = val1;
      w2[i] = val2;

      if (powMatch(val2)) {
        var $row = $('\n<tr>\n  <td class="r">' + val1 + '</td>\n  <td class="r">' + val2 + '</td>\n  <td class="r">' + val3 + '</td>\n  <td>' + val3 / val2 + '</td>\n  <td>' + val3.toString(2) + '</td>\n</tr>\n          ');
        $table.append($row);
      }
    }

    console.log('done');

    function powMatch(n) {
      return n.toString(2).match(/^1(0*)$/);
    }

    // var res = goldenRatio.find(n);
    // var coord = res.coord;
    // var intVal = wythoff.get(coord[0], coord[1] + 1);
    // var val = intVal / n;

    // this.$output.append($(`<p>座標: ${coord}</p>`));
    // this.$output.append($(`<p>黄金比2進表記: ${φ.toString(2)}</p>`));
    // this.$output.append($(`<p>結果2進表記: ${intVal.toString(2)}</p>`));
    // this.$output.append($(`<p>黄金比: ${φ}</p>`));
    // this.$output.append($(`<p>近似値: ${val}</p>`));
    // this.render(res.table);
  });
};

window.licker = window.licker || {};
(function (ns) {
  ns.main = new Main();
})(window.licker);

},{}]},{},[1]);
