import board from './modules/board.js';
import player from './modules/player.js';

// DOM elements
const startButton = document.querySelector('.start__button');

export default function playGame() {
  // DOM elements
  const resetButton = document.querySelector('.reset__button');
  const currentPlayerDisplay = document.querySelector('.current__player');
  const currentPlayerContainer = document.querySelector(
    '.current__player__container'
  );
  const cells = document.querySelectorAll('.cell');

  // Initialize
  const gameBoard = board();
  const player1 = player('P1', 'X');
  const player2 = player('P2', 'O');

  let turnCount = 0;
  let currentPlayer = player1;

  // Initialize display
  currentPlayerContainer.classList.remove('hidden', 'winner');
  updateMessage(`${currentPlayer.name}—${currentPlayer.getSymbol()}`);

  // Main game loop
  function gameLoop(cell) {
    const coord = cell.id;

    if (gameBoard.updateCell(coord, currentPlayer.getSymbol())) {
      cell.textContent = currentPlayer.getSymbol();
      turnCount++;

      // Check for win/tie conditions
      if (turnCount >= 9 || gameBoard.checkWin()) {
        const result = gameBoard.checkWin()
          ? `${currentPlayer.name} wins!`
          : "It's a tie!";
        currentPlayerContainer.classList.add('winner');
        updateMessage(result);
        return;
      }

      // Switch player
      currentPlayer = currentPlayer === player1 ? player2 : player1;
      updateMessage(`${currentPlayer.name}—${currentPlayer.getSymbol()}`);
    } else {
      // If player clicks a cell that is occupied or otherwise invalid
      updateMessage('Invalid move! Try again.');
    }
  }

  // Update DOM with current player name
  function updateMessage(message) {
    currentPlayerDisplay.textContent = message;
  }

  // Reset game state
  function resetGame() {
    gameBoard.clearBoard();
    turnCount = 0;
    currentPlayer = player1;
    updateMessage(`${currentPlayer.name}`);
    currentPlayerContainer.classList.remove('hidden', 'winner');

    cells.forEach((cell) => {
      cell.textContent = '__';
    });
  }

  // EVENT LISTENERS

  // Calls resetGame()
  resetButton.addEventListener('click', resetGame);

  // Add click listener on each cell
  cells.forEach((cell) => {
    cell.addEventListener('click', (e) => {
      if (cell.textContent === '__') {
        gameLoop(cell);
      } else {
        updateMessage(`Cell already taken. Try again`);
      }
    });
  });
}

startButton.addEventListener('click', playGame);
