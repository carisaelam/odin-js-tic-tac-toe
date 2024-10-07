import board from './modules/board.js';
import player from './modules/player.js';

// Game loop
function playGame() {
  const gameBoard = board();
  const player1 = player('P1', 'X');
  const player2 = player('P2', '0');

  let turnCount = 0;
  let currentPlayer = player1;
  let currentSymbol = currentPlayer.getSymbol();
  let result;

  function toggleSymbol(currentSymbol) {
    return currentSymbol === 'X'
      ? (currentSymbol = 'O')
      : (currentSymbol = 'X');
  }

  function togglePlayer(currentPlayer) {
    return currentPlayer === player1
      ? (currentPlayer = player2)
      : (currentPlayer = player1);
  }

  while (!gameBoard.checkWin() && turnCount < 9) {
    let coord = currentPlayer.collectInput();
    if (gameBoard.updateCell(coord, currentSymbol)) {
      gameBoard.printBoard();
      turnCount++;
      currentSymbol = toggleSymbol(currentSymbol);
      currentPlayer = togglePlayer(currentPlayer);
    }
  }

  currentPlayer = togglePlayer(currentPlayer);
  if (!gameBoard.checkWin()) result = 'tie';
  else result = `${currentPlayer.name} wins!`;

  console.log(result);
  return { result, currentPlayer, gameBoard };
}

playGame();
