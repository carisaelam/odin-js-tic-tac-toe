import board from './modules/board.js';
import player from './modules/player.js';

const startButton = document.querySelector('.start__button');
const resetButton = document.querySelector('.reset__button');

// Game loop
export default function playGame() {
  const currentPlayerDisplay = document.querySelector('.current__player');
  const cells = document.querySelectorAll('.cell');

  const gameBoard = board();
  const player1 = player('P1', 'X');
  const player2 = player('P2', 'O');

  let turnCount = 0;
  let currentPlayer = player1;

  resetButton.addEventListener('click', () => {
    gameBoard.clearBoard();
    turnCount = 0;
    currentPlayer = player1;

    cells.forEach((cell) => {
      cell.textContent = '__';
    });

    updatePlayerDisplay(`Current player: ${currentPlayer.name}`);
  });

  updatePlayerDisplay(`Current player: ${currentPlayer.name}`);


  function updatePlayerDisplay(message) {
    currentPlayerDisplay.textContent = message;
  }

  function gameLoop(cell) {
    const coord = cell.id;
    console.log('coord', coord);

    if (gameBoard.updateCell(coord, currentPlayer.getSymbol())) {
      cell.textContent = currentPlayer.getSymbol();
      turnCount++;

      // Check for win/tie conditions
      if (turnCount >= 9 || gameBoard.checkWin()) {
        const result = gameBoard.checkWin()
          ? `${currentPlayer.name} wins!`
          : "It's a tie!";
        updatePlayerDisplay(result);
        return;
      }

      // Switch player
      currentPlayer = currentPlayer === player1 ? player2 : player1;
      updatePlayerDisplay(`Current Player: ${currentPlayer.name}`);
    } else {
      updatePlayerDisplay('Invalid move! Try again.');
    }
  }

  cells.forEach((cell) => {
    cell.addEventListener('click', (e) => {
      if (cell.textContent === '__') {
        gameLoop(cell);
      } else {
        updatePlayerDisplay(`Cell already taken. Try again`);
      }
    });
  });

  updatePlayerDisplay(`Current player: ${currentPlayer.name}`);
}

startButton.addEventListener('click', playGame);
