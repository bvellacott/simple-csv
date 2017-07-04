var assert = require('assert');
var Csv = require('../index');

it('formatCsvCell', () => {
  assert.ok(Csv.formatCsvCell(undefined) === '', 'undefined returns empty string');
  assert.ok(Csv.formatCsvCell(null) === '', 'null returns empty string');

  assert.ok(Csv.formatCsvCell(0) === '0', 'number formatted to string');
  assert.ok(Csv.formatCsvCell(true) === 'true', 'boolean formatted to string');
  assert.ok(Csv.formatCsvCell('string') === 'string', 'string formatted to string');

  assert.equal(Csv.formatCsvCell('Super, luxurious truck'), '"Super, luxurious truck"', 'wrapped in double quotes if contains commas');
  assert.equal(Csv.formatCsvCell('Super "luxurious" truck'), '"Super ""luxurious"" truck"', 'double quotes doubled and value wrapped in double quotes');
  assert.equal(Csv.formatCsvCell('Super\nluxurious truck'), '"Super\nluxurious truck"', 'wrapped in double quotes if contains line breaks');
  assert.equal(Csv.formatCsvCell(' string  '), ' string  ', 'leading and trailing spaces not ommitted');

  assert.equal(Csv.formatCsvCell(' Super,\n"luxurious" truck  '), '" Super,\n""luxurious"" truck  "', 'works with mixed quotes, commas, spaces and line breaks');

  var exceptionThrown = false;
  try {
    Csv.formatCsvCell({});
  } catch(e) {
    exceptionThrown = true;
  }
  assert.ok(exceptionThrown, 'exception thrown when trying to format an object');

  exceptionThrown = false;
  try {
    Csv.formatCsvCell([]);
  } catch(e) {
    exceptionThrown = true;
  }
  assert.ok(exceptionThrown, 'exception thrown when trying to format an array');
});

it('renderCsvLine', () => {
  assert.equal(Csv.renderCsvLine([0, true, null, undefined, ' Super,\n"luxurious" truck  ']), '0,true,,," Super,\n""luxurious"" truck  "', 'line formatted correctly');

  var exceptionThrown = false;
  try {
    Csv.renderCsvLine({});
  } catch(e) {
    exceptionThrown = true;
  }
  assert.ok(exceptionThrown, 'exception thrown when trying to format something other than an array');

  exceptionThrown = false;
  try {
    Csv.renderCsvLine([]);
  } catch(e) {
    exceptionThrown = true;
  }
  assert.ok(exceptionThrown, 'exception thrown when trying to format an empty array');
});

it('renderCsvLines', () => {
  var lines = [
    ['number', 'boolean', 'explicitly nothing', 'nothing', 'complicated string'],
    [0, true, null, undefined, ' Super,\n"luxurious" truck  ']
  ];

  var expected = 'number,boolean,explicitly nothing,nothing,complicated string\n0,true,,," Super,\n""luxurious"" truck  "';

  assert.equal(Csv.renderCsvLines(lines), expected, 'csv formatted correctly');

  var exceptionThrown = false;
  try {
    Csv.renderCsvLines({});
  } catch(e) {
    exceptionThrown = true;
  }
  assert.ok(exceptionThrown, 'exception thrown when trying to format something other than an array');

  exceptionThrown = false;
  try {
    Csv.renderCsvLines([]);
  } catch(e) {
    exceptionThrown = true;
  }
  assert.ok(exceptionThrown, 'exception thrown when trying to format an empty array');
});

it('Csv object methods', () => {
  var csv = new Csv(['number', 'boolean', 'explicitly nothing', 'nothing', 'complicated string']);
  csv.addLine([0, false, null, undefined, ' Super,\n"luxurious" truck  ']);
  csv.addLine([0, false, null, undefined]);
  csv.addLine([0, false, null, undefined, ' Super,\n"luxurious" truck  ', 'too much']);

  var expected = 'number,boolean,explicitly nothing,nothing,complicated string\n' + 
  '0,false,,," Super,\n""luxurious"" truck  "\n' +
  '0,false,,,\n' +
  '0,false,,," Super,\n""luxurious"" truck  "';

  assert.equal(csv.render(), expected, 'csv formatted correctly');

  var exceptionThrown = false;
  try {
    new Csv([]);
  } catch(e) {
    exceptionThrown = true;
  }
  assert.ok(exceptionThrown, 'exception thrown when trying initialise a csv with an empty header array');

  exceptionThrown = false;
  try {
    new Csv({});
  } catch(e) {
    exceptionThrown = true;
  }
  assert.ok(exceptionThrown, 'exception thrown when trying initialise a csv with something other than an array');
});
