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
  while (!myBoard.checkWin()) {
    console.log('playGame running');
    let coord = collectInput();
    myBoard.updateCell(coord, 'X');
    myBoard.printBoard();
    console.log(myBoard.checkWin());
  }
  console.log('Game Over!');
}

function collectInput() {
  const input = prompt('Select a cell');
  const coord = [parseInt(input[0]), parseInt(input[1])];
  console.log('You selected', coord);
  return coord;
}

playGame();
