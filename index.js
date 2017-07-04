function Csv(headerLine) {
  if (!Array.isArray(headerLine) || headerLine.length === 0) throw new Error('The header line must be an array of length greater than 0');

  var newCsv = {
    lines: [headerLine],
    render() {
      return Csv.renderCsvLines(newCsv.lines);
    },
    addLine(line) {
      var lengthDiff = newCsv.lines[0].length - line.length;

      if (lengthDiff < 0) {
        line.splice(newCsv.lines[0].length, -lengthDiff);
      } else if (lengthDiff > 0) {
        line = line.concat(new Array(lengthDiff).fill(''));
      }

      return newCsv.lines.push(line);
    }
  };

  return newCsv;
}

Csv.renderCsvLines = function(lines) {
  if (!Array.isArray(lines)) throw new Error('Only arrays accepted as formattable csvs');
  if (lines.length === 0) throw new Error("Can't format an empty array");

  return lines.map(Csv.renderCsvLine).join('\n');
},

Csv.renderCsvLine = function(cells) {
  if (!Array.isArray(cells)) throw new Error('Only arrays accepted as formattable csv lines');
  if (cells.length === 0) throw new Error("Can't format an empty array");

  return cells.map(Csv.formatCsvCell).join(',');
},

Csv.formatCsvCell = function(value) {
  if (typeof value in { number: 1, boolean: 1 }) return '' + value;
  if (!value) return '';

  if (typeof value === 'object') throw new Error('A cell value must not be an object or array');

  var hasQuotes = value.match(/"/g);
  if (hasQuotes) value = value.replace(/"/g, '""');

  return hasQuotes || value.match(/\n|,/g) ? '"' + value + '"' : value;
},

module.exports = Csv;
