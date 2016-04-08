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

class Main {
  constructor() {
    $(() => {
      this.$output = $('.table-wrapper');
      // wythoff = new Wythoff();
      // goldenRatio = new GoldenRatio();

      var $table = $('<table></table>');

      this.$output.append(`<p>${φ - 1}</p>`);
      this.$output.append(`<p>${(φ - 1).toString(2)}</p>`);

      this.$output.append($table);

      $table.append(`
<tr style="text-align: center;">
  <td>n</td>
  <td>val</td>
  <td>val / n</td>
  <td>n (binary)</td>
</tr>
      `);

      var n = 1024;
      var s = new S();

      var w = [0];

      for(let i = 0; i < 10000000; i++) {
        let tmp = s.get(i);
        let val = w[i] + ( tmp === '1' ? 2 : 1);

        w[i + 1] = val;

        if(powMatch(val)) {
          let $row = $(`
<tr>
  <td class="r">${i}</td>
  <td class="r">${val}</td>
  <td>${i / val}</td>
  <td>${i.toString(2)}</td>
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
