# Simple csv string
A simple js tool to render standards compliant csv's. See https://en.wikipedia.org/wiki/Comma-separated_values for the spec.

## installation

```bash
npm install --save simple-csv-string
```

## usage

```js
var Csv = require('simple-csv-string');

// add the header line in the constructor
var csv = new Csv(['header1', 'header2', 'header3', 'header4', 'header5']);

// the length of subsequent added lines won't be modified if they are as long as the header
csv.addLine(['val11', 'val12', 'val13', 'val14', 'val15']);

// empty cells will be added if a line is shorter than the header
csv.addLine(['val21', 'val22', 'val23', 'val24']);

// cells will be removed if a line is longer than the header
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