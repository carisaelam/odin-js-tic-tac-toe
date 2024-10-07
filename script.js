import board from './modules/board.js';
import player from './modules/player.js';

const myBoard = board();
const player1 = player('P1', 'X');
const player2 = player('P2', '0');

console.log('player1', player1);
console.log('player2', player2);

// Game Logic
// while(!checkWin)
// updateCell
// checkWin
// if false, continue
// if true, end game
// update turn count
// switch players

// Game loop
function playGame() {
  let turnCount = 0;
  let player = player1;
  let symbol = player.getSymbol();

  while (!myBoard.checkWin() && turnCount <= 9) {
    console.log('playGame running...turn', turnCount);
    console.log('player', player.name);
    let coord = player.collectInput();
    if (myBoard.updateCell(coord, symbol)) {
      myBoard.printBoard();
      turnCount++;
      symbol === 'X' ? (symbol = 'O') : (symbol = 'X');
      player === player1 ? (player = player2) : (player = player1);
      console.log(myBoard.checkWin());
    }
  }
  if (turnCount >= 9) console.log('Tie');

  console.log(`${player.name} wins!`);
}

playGame();
