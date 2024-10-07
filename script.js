import board from './modules/board.js';
import player from './modules/player.js';

const startButton = document.querySelector('.start__button');
const resetButton = document.querySelector('.reset__button');

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

  resetButton.addEventListener('click', () => {
    gameBoard.clearBoard;
    turnCount = 0; 
    currentPlayer = player1
    updateDisplay(`Current player: ${currentPlayer.name}`)
  });

  updateDisplay(`Current player: ${currentPlayer.name}`);

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
    const coord = currentPlayer.collectInput();

    if (coord && gameBoard.updateCell(coord, currentPlayer.getSymbol())) {
      gameBoard.printBoard();
      turnCount++;

      // Check for win/tie conditions
      if (turnCount >= 9 || gameBoard.checkWin()) {
        const result = gameBoard.checkWin()
          ? `${currentPlayer.name} wins!`
          : "It's a tie!";
        updateDisplay(result);
        return; // End the game
      }

      // Switch player
      currentPlayer = currentPlayer === player1 ? player2 : player1;
      updateDisplay(`Current Player: ${currentPlayer.name}`);
    } else {
      updateDisplay('Invalid move! Try again.');
    }
  }

  const cells = document.querySelectorAll('.cell');
  cells.forEach((cell) => {
    cell.addEventListener('click', (e) => {
      currentPlayer.handleClick(e);
      gameLoop();
    });
  });

  updateDisplay(`Current player: ${currentPlayer.name}`);
}

startButton.addEventListener('click', playGame);
