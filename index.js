const readline = require('readline');
const { generateKey, calculateHMAC } = require('./cryptoUtils');
const GameRules = require('./gameLogic');
const printHelpTable = require('./helpTable');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Validar argumentos
function validateArguments(args) {
  if (args.length < 3 || args.length % 2 === 0) {
    console.error('Error: You must provide an odd number of non-repeating moves (at least 3).');
    console.error('Example: node index.js Rock Paper Scissors');
    process.exit(1);
  }
  const uniqueMoves = new Set(args);
  if (uniqueMoves.size !== args.length) {
    console.error('Error: Moves must be unique.');
    process.exit(1);
  }
}

const args = process.argv.slice(2);
if (args.includes('--help')) {
  printHelpTable(args.filter(arg => arg !== '--help'));
  process.exit(0);
}

validateArguments(args);

const moves = args;
const gameRules = new GameRules(moves);

// Generar la clave y el movimiento del computador
const key = generateKey();
const computerMove = moves[Math.floor(Math.random() * moves.length)];
const hmac = calculateHMAC(key, computerMove);

console.log(`HMAC: ${hmac}`);
console.log('Choose your move:');

function displayMenu() {
  console.log('Menu:');
  moves.forEach((move, index) => {
    console.log(`${index + 1} - ${move}`);
  });
  console.log('0 - Exit');
}

function handleUserInput(input) {
  const choice = parseInt(input.trim(), 10);

  if (choice === 0) {
    console.log('Exiting...');
    process.exit(0);
  }

  if (isNaN(choice) || choice < 1 || choice > moves.length) {
    console.log('Invalid choice. Please try again.');
    displayMenu();
    return;
  }

  const playerMove = moves[choice - 1];
  const outcome = gameRules.determineOutcome(playerMove, computerMove);

  console.log(`Computer move: ${computerMove}`);
  console.log(`Your move: ${playerMove}`);
  console.log(`Outcome: ${outcome}`);
  console.log(`Secret key: ${key.toString('hex')}`);
  process.exit(0);
}

displayMenu();
rl.on('line', handleUserInput);
