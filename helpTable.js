const Table = require('cli-table3');

function printHelpTable(moves) {
  const table = new Table({
    head: ['v PC/User >', ...moves],
    colWidths: [20, ...moves.map(() => 10)]
  });

  moves.forEach((move, i) => {
    const row = [move];
    moves.forEach((otherMove, j) => {
      if (i === j) {
        row.push('Draw');
      } else if ((i + Math.floor(moves.length / 2)) % moves.length === j) {
        row.push('Win');
      } else {
        row.push('Lose');
      }
    });
    table.push(row);
  });

  console.log(table.toString());
}

module.exports = printHelpTable;
