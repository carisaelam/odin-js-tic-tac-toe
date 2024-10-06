// Builds, updates, prints board

export default function board() {
  const BOARD_SIZE = 3;

  // Board instance, starts as blank
  const board = [
    ['_', '_', '_'],
    ['_', '_', '_'],
    ['_', '_', '_'],
  ];

  // Prints and returns the current board instance
  function printBoard() {
    const printedBoard = [];
    for (let i = 0; i < BOARD_SIZE; i++) {
      const row = `${board[i][0]} | ${board[i][1]} | ${board[i][2]}`;
      console.log(row);
      printedBoard.push(row);
    }
    return printedBoard;
  }

  // Updates cell at coord to piece
  const updateCell = (coord, piece) => {
    const row = coord[0];
    const col = coord[1];

    if (row > BOARD_SIZE - 1 || col > BOARD_SIZE - 1 || row < 0 || col < 0) {
      console.error('not on board');
      return board;
    }

    if (board[row][col] !== '_') {
      console.error('already taken');
      return board;
    }

    board[row][col] = piece;
    return board;
  };

  // Resets every cell to '_'
  const clearBoard = () => {
    for (let i = 0; i < BOARD_SIZE; i++) {
      for (let j = 0; j < BOARD_SIZE; j++) {
        board[i][j] = '_';
      }
    }

    return board;
  };

  // Check all horizontals for winning condition
  const checkHorizontalWin = () => {
    for (let i = 0; i < BOARD_SIZE; i++) {
      if (board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
        return true;
      } else return false;
    }
  };

  // Check all verticals for winning condition
  const checkVerticalWin = () => {
    for (let i = 0; i < BOARD_SIZE; i++) {
      if (board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
        return true;
      } else return false;
    }
  };

  // Check all diagonals for winning condition
  const checkDiagonalWin = () => {
    if (board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
      return true;
    } else if (board[0][2] === board[1][1] && board[1][1] === board[0][2]) {
      return true;
    } else return false;
  };

  // Checks for all winning conditions
  const checkWin = () => {
    if (checkHorizontalWin() || checkVerticalWin() || checkDiagonalWin())
      return true;
  };

  return { updateCell, clearBoard, printBoard, checkWin };
}
