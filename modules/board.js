// Builds, updates, prints board

export default function board() {
  const BOARD_SIZE = 3;

  // Board instance, starts as blank
  const board = [
    [' ', ' ', ' '],
    [' ', ' ', ' '],
    [' ', ' ', ' '],
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
    console.log('updateCell running with coord', coord);
    const row = coord[0];
    const col = coord[1];

    if (row > BOARD_SIZE - 1 || col > BOARD_SIZE - 1 || row < 0 || col < 0) {
      console.error('not on board');
      return false;
    }

    if (board[row][col] !== ' ') {
      console.error('already taken');
      return false;
    }

    board[row][col] = piece;
    return board;
  };

  // Resets every cell to '_'
  const clearBoard = () => {
    console.log('clear board running');
    for (let i = 0; i < BOARD_SIZE; i++) {
      for (let j = 0; j < BOARD_SIZE; j++) {
        board[i][j] = ' ';
      }
    }
    printBoard();
    return board;
  };

  // Check all horizontals for winning condition
  const checkHorizontalWin = () => {
    for (let i = 0; i < BOARD_SIZE; i++) {
      if (
        board[i][0] !== ' ' &&
        board[i][0] === board[i][1] &&
        board[i][1] === board[i][2]
      ) {
        return true;
      }
    }
    return false;
  };

  // Check all verticals for winning condition
  const checkVerticalWin = () => {
    for (let i = 0; i < BOARD_SIZE; i++) {
      if (
        board[0][i] !== ' ' &&
        board[0][i] === board[1][i] &&
        board[1][i] === board[2][i]
      )
        return true;
    }
    return false;
  };

  // Check all diagonals for winning condition
  const checkDiagonalWin = () => {
    if (board[1][1] !== ' ') {
      if (board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
        return true;
      }
      if (board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
        return true;
      }
    }
    return false;
  };

  // Checks for all winning conditions
  const checkWin = () => {
    return checkHorizontalWin() || checkVerticalWin() || checkDiagonalWin();
  };

  return { updateCell, clearBoard, printBoard, checkWin };
}
