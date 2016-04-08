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

// Wythoff配列取得用
class Wythoff {
  constructor() {
    this.arr = [[1, 2]];
    this.s = new S();
  }

  get(y, x) {
    if(this.arr[y] && this.arr[y][x]) {
      return this.arr[y][x];
    } else if(this.arr[y]) {
      return this.get(y, x - 1) + this.get(y, x - 2);
    } else {
      this.arr[y] = [this.get(y - 1, 0) + (this.s.get(y - 1) === '1' ? 3 : 2), this.get(y - 1, 1) + (this.s.get(y - 1) === '1' ? 5 : 3)];
      return this.get(y, x);
    }
  }
}

// class GoldenRatio {
//   constructor() {
//   }
// }

$(() => {
  var $output = $('.table-wrapper');
  var tbl = [];

  var wythoff = new Wythoff();

  function find(n) {
    for(let y = 0; y < n; y++) {
      tbl[y] = [];
      let xMax = n;
      for(let x = 0; x < xMax; x++) {
        let tmp = wythoff.get(y, x);
        tbl[y][x] = tmp;
        if(tmp === n) {
          tbl[y][x + 1] = wythoff.get(y, x + 1);
          return [y, x];
        } else if(tmp > n) {
          xMax = Math.min(xMax, x);
          break;
        }
      }
    }
  }

  function getGoldenRatio(n) {
    var [y, x] = find(n);

    return wythoff.get(y, x + 1) / n;
  }

  function render() {
    var $table = $('<table>');

    // 結果太字表示用
    var $lastCell = $();

    for(let y = 0; y < tbl.length; y++) {
      let $tr = $('<tr>');

      for(let x = 0; x < tbl[0].length; x++) {
        let val = tbl[y][x];
        let $td = $('<td>');
        $td.text(val || '');
        $tr.append($td);

        // lastX = x;
        if(val) {
          $lastCell = $td;
        }
      }

      $table.append($tr);
    }

    $lastCell.css({
      "font-weight": 'bold',
    });

    $output.append($table);
  }

  var φ = (1 + Math.sqrt(5)) / 2;

  getGoldenRatio(1024);
  render();
});
