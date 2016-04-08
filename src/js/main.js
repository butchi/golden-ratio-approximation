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

$(() => {
  var $tbl = $('.wythoff-array');

  var wythoff = new Wythoff();

  function find(n) {
    for(let y = 0; y < n; y++) {
      let xMax = n;
      $tbl.text($tbl.text() + (y + ': ________').slice(0, 6));
      for(let x = 0; x < xMax; x++) {
        $tbl.text($tbl.text() + ('________' + wythoff.get(y, x)).slice(-8));
        if(wythoff.get(y, x) === n) {
          $tbl.text($tbl.text() + '\n\n');
          return [y, x];
        } else if(wythoff.get(y, x) > n) {
          xMax = Math.min(xMax, x);
          break;
        }
      }
      $tbl.text($tbl.text() + '\n');
    }
  }

  function getGoldenRatio(n) {
    var [y, x] = find(n);

    return wythoff.get(y, x + 1) / n;
  }

  var φ = (1 + Math.sqrt(5)) / 2;

  console.log(getGoldenRatio(1024), φ);

  console.log(getGoldenRatio(Math.pow(2, 8)).toString(2), φ.toString(2));
});
