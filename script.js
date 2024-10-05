const BOARD_SIZE = 3;

const boardInstance = [
  ['_', '_', '_'],
  ['_', '_', '_'],
  ['_', '_', '_'],
];

function printBoard(board) {
  for (let i = 0; i < BOARD_SIZE; i++) {
    console.log(`${board[i][0]} | ${board[i][1]} | ${board[i][2]}`);
  }
}

function updateCell(coord, piece, board) {
  board[coord[0]][coord[1]] = piece;
  return board;
}

function clearBoard(board) {
  board.map((row, i) => {
    row.map((_, j) => {
      updateCell([i, j], '_', board);
    });
  });

  return board;
}

updateCell([0, 0], 'Z', boardInstance);
updateCell([0, 1], 'Z', boardInstance);
updateCell([1, 1], 'Z', boardInstance);
updateCell([2, 2], 'P', boardInstance);
updateCell([1, 2], 'C', boardInstance);
// clearBoard(boardInstance);
printBoard(boardInstance);
