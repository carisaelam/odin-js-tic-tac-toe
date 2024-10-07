import board from './modules/board.js';

const myBoard = board();

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
  let symbol = 'X';

  while (!myBoard.checkWin() && turnCount <= 9) {
    console.log('playGame running...turn', turnCount);
    let coord = collectInput();
    if (myBoard.updateCell(coord, symbol)) {
      myBoard.printBoard();
      turnCount++;
      symbol === 'X' ? (symbol = 'O') : (symbol = 'X');
      console.log(myBoard.checkWin());
    }
  }
  if (turnCount >= 9) console.log('Tie');

  console.log('Game Over! Turn count: ', turnCount);
}

function collectInput() {
  const input = prompt('Select a cell');
  const coord = [parseInt(input[0]), parseInt(input[1])];
  console.log('You selected', coord);
  return coord;
}

playGame();
