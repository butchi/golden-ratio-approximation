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

var Main = function Main() {
  var _this = this;

  _classCallCheck(this, Main);

  $(function () {
    _this.$output = $('.table-wrapper');
    // wythoff = new Wythoff();
    // goldenRatio = new GoldenRatio();

    var $table = $('<table></table>');

    _this.$output.append('<p>' + (φ - 1) + '</p>');
    _this.$output.append('<p>' + (φ - 1).toString(2) + '</p>');

    _this.$output.append($table);

    $table.append('\n<tr style="text-align: center;">\n  <td>n</td>\n  <td>val</td>\n  <td>val / n</td>\n  <td>val (binary)</td>\n</tr>\n      ');

    var n = 1024;
    var s = new S();

    var w = [1];

    for (var i = 0; i < 10000000; i++) {
      var tmp = s.get(i);
      var val = w[i];
      if (tmp === '1') {
        val++;
      }

      w[i + 1] = val;

      if (powMatch(i + 1)) {
        var $row = $('\n<tr>\n  <td class="r">' + (i + 1) + '</td>\n  <td class="r">' + val + '</td>\n  <td>' + val / (i + 1) + '</td>\n  <td>' + val.toString(2) + '</td>\n</tr>\n          ');
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
