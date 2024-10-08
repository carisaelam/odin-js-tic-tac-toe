import board from './modules/board.js';
import player from './modules/player.js';

// DOM elements
const startButton = document.querySelector('.start__button');

export default function playGame() {
  // DOM elements
  const resetButton = document.querySelector('.reset__button');
  const newGameButton = document.querySelector('.new__game__button');
  const currentPlayerDisplay = document.querySelector('.current__player');
  const currentPlayerContainer = document.querySelector(
    '.current__player__container'
  );
  const cells = document.querySelectorAll('.cell');

  // Initialize
  const gameBoard = board();
  const player1Name = prompt('Player 1, what is your name? ');
  const player2Name = prompt('Player 2, what is your name? ');
  const player1 = player(player1Name.slice(0, 20) || 'Player 1', 'X');
  const player2 = player(player2Name.slice(0, 20) || 'Player 2', 'O');

  let turnCount = 0;
  let currentPlayer = player1;

  // Initialize display
  startButton.style.display = 'none';
  resetButton.style.display = 'block';

  resetGame();
  currentPlayerContainer.classList.remove('hidden', 'winner');
  updateMessage(`${currentPlayer.name} as ${currentPlayer.getSymbol()}`);

  // Main game loop
  function gameLoop(cell) {
    newGameButton.classList.remove('hidden');
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
        cells.forEach((cell) =>
          cell.removeEventListener('click', handleCellClick)
        );
        return;
      }

      // Switch player
      currentPlayer = currentPlayer === player1 ? player2 : player1;
      updateMessage(`${currentPlayer.name} as ${currentPlayer.getSymbol()}`);
    } else {
      // If player clicks a cell that is occupied or otherwise invalid
      updateMessage('Try again.');
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
    updateMessage(`${currentPlayer.name} as ${currentPlayer.getSymbol()}`);
    currentPlayerContainer.classList.remove('hidden', 'winner');

    cells.forEach((cell) => {
      cell.textContent = '  ';
    });
  }

  // Refreshes page
  function newGame() {
    location.reload();
  }

  // Handles cell clicks
  function handleCellClick(e) {
    const cell = e.target;
    if (cell.textContent === '  ') {
      gameLoop(cell);
    } else {
      updateMessage(`Try again`);
    }
  }

  // EVENT LISTENERS

  resetButton.addEventListener('click', resetGame);
  newGameButton.addEventListener('click', newGame);
  cells.forEach((cell) => {
    cell.addEventListener('click', handleCellClick);
  });
}

startButton.addEventListener('click', playGame);
