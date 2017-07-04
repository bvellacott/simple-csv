# AsyncYield
My implementation of async await using generator functions

## installation

```bash
npm install --save simple-csv
```

## usage

```js
var Csv = require('simple-csv');

var csv = new Csv(['header1', 'header2', 'header3', 'header4', 'header5']);
csv.addLine(['val11', 'val12', 'val13', 'val14', 'val15']);
csv.addLine(['val21', 'val22', 'val23', 'val24']);
csv.addLine([2, false, null, undefined, ' Super,\n"luxurious" truck  ', 'too much']);

console.log(csv.render());

// header1,header2,header3,header4,header5
// val11,val12,val13,val14,val15
// val21,val22,val23,val24,
// 2,false,,," Super,
// ""luxurious"" truck  "

```

## build and test

```bash
npm install
```

```bash
npm test
```
or
```bash
node runTests
```