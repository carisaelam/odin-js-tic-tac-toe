import board from './modules/board.js';
import player from './modules/player.js';

const myBoard = board();
const player1 = player('P1', 'X');
const player2 = player('P2', '0');

// Game loop
function playGame() {
  let turnCount = 0;
  let player = player1;
  let symbol = player.getSymbol();
  let result;

  while (!myBoard.checkWin() && turnCount < 9) {
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
  if (!myBoard.checkWin()) result = 'tie';
  else result = `${player.name} wins!`;

  console.log(result);
  return result;
}

playGame();
