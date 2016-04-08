var wythoff;
var goldenRatio;

const φ = (1 + Math.sqrt(5)) / 2;

// フィボナッチ列取得用
class S {
  constructor() {
    this.strPrev = '1';
    this.str = '10';
  }

  get(n) {
    if(this.str[n]) {
      return this.str[n];
    } else {
      [this.str, this.strPrev] = [this.str + this.strPrev, this.str];
      return this.get(n);
    }
  }
}

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

class Main {
  constructor() {
    $(() => {
      this.$output = $('.table-wrapper');
      // wythoff = new Wythoff();
      // goldenRatio = new GoldenRatio();

      var $table = $('<table></table>');

      this.$output.append(`<p>${φ}</p>`);
      this.$output.append(`<p>${φ.toString(2)}</p>`);

      this.$output.append($table);

      $table.append(`
<tr style="text-align: center;">
  <td>w1</td>
  <td>w2</td>
  <td>w3</td>
  <td>w3 / w2</td>
  <td>binary</td>
</tr>
      `);

      var n = 1024;
      var s = new S();

      var w1 = [1];
      var w2 = [1];

      for(let i = 1; i < 1000000; i++) {
        let tmp = s.get(i - 1);
        let val1 = w1[i - 1] + ( tmp === '1' ? 2 : 1);
        let val2 = w2[i - 1] + ( tmp === '1' ? 3 : 2);
        let val3 = val1 + val2;

        w1[i] = val1;
        w2[i] = val2;

        if(powMatch(val2)) {
          let $row = $(`
<tr>
  <td class="r">${val1}</td>
  <td class="r">${val2}</td>
  <td class="r">${val3}</td>
  <td>${val3 / val2}</td>
  <td>${val3.toString(2)}</td>
</tr>
          `);
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
  }
}

window.licker = window.licker || {};
((ns) => {
  ns.main = new Main();
})(window.licker);
