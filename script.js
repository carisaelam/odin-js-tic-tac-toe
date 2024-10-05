function board() {
  const BOARD_SIZE = 3;

  const board = [
    ['_', '_', '_'],
    ['_', '_', '_'],
    ['_', '_', '_'],
  ];

  function printBoard() {
    const printedBoard = [];
    for (let i = 0; i < BOARD_SIZE; i++) {
      const row = `${board[i][0]} | ${board[i][1]} | ${board[i][2]}`;
      console.log(row);
      printedBoard.push(row);
    }
    return printedBoard;
  }

  const updateCell = (coord, piece) => {
    const row = coord[0];
    const col = coord[1];

    if (board[row][col] !== '_') {
      console.error('already taken');
      return;
    }

    board[row][col] = piece;
    return board;
  };

  const clearBoard = () => {
    board.map((row, i) => {
      row.map((_, j) => {
        updateCell([i, j], '_');
      });
    });

    return board;
  };

  return { updateCell, clearBoard, printBoard };
}

const myBoard = board();

myBoard.clearBoard();
myBoard.updateCell([0, 0], 'Z');
myBoard.updateCell([0, 1], 'Z');
myBoard.updateCell([1, 1], 'X');

myBoard.printBoard();
