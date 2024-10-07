import board from './modules/board.js';
import player from './modules/player.js';

const startButton = document.querySelector('.start__button');

// Game loop
export default function playGame() {
  const currentPlayerDisplay = document.querySelector('.current__player');
  const gameBoard = board();
  const player1 = player('P1', 'X');
  const player2 = player('P2', 'O');

  let turnCount = 0;
  let currentPlayer = player1;
  let currentSymbol = currentPlayer.getSymbol();
  let result;

  function toggleSymbol(symbol) {
    return symbol === 'X' ? 'O' : 'X';
  }

  function togglePlayer(player) {
    return player === player1 ? player2 : player1;
  }

  function updateDisplay(message) {
    currentPlayerDisplay.textContent = message;
  }

  function gameLoop() {
    if (turnCount < 9 && !gameBoard.checkWin()) {
      let coord = currentPlayer.collectInput();

      if (gameBoard.updateCell(coord, currentSymbol)) {
        gameBoard.printBoard();
        turnCount++;
        currentSymbol = toggleSymbol(currentSymbol);
        currentPlayer = togglePlayer(currentPlayer);
        updateDisplay(`Current Player: ${currentPlayer.name}`);

        setTimeout(gameLoop, 0);
      } else {
        updateDisplay('Invalid move! Try again');
        setTimeout(gameLoop, 0);
      }
    } else {
      currentPlayer = togglePlayer(currentPlayer);
      if (!gameBoard.checkWin()) result = 'tie';
      else result = `${currentPlayer.name} wins!`;

      console.log(result);
      updateDisplay(result);
      return { result, currentPlayer, gameBoard };
    }
  }
  gameLoop();
}

startButton.addEventListener('click', playGame);
