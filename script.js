const BOARD_SIZE = 3;

const blankBoard = [
  ['_', '_', '_'],
  ['_', '_', '_'],
  ['_', '_', '_'],
];

function printBoard(board) {
  console.log(`${board[0][0]} | ${board[0][1]} | ${board[0][2]}`);

  console.log(`${board[1][0]} | ${board[1][1]} | ${board[1][2]}`);

  console.log(`${board[2][0]} | ${board[2][1]} | ${board[2][2]}`);
}

function updateCell(coord, piece, board) {
  board[coord[0]][coord[1]] = piece;
  return board;
}

function clearBoard(board) {
  board.map((row, i) => {
    row.map((_, j) => {
      updateCell([i, j], '', board);
    });
  });

  return board;
}

updateCell([0, 0], 'Z', blankBoard);
updateCell([0, 1], 'Z', blankBoard);
updateCell([1, 1], 'Z', blankBoard);
updateCell([2, 2], 'P', blankBoard);
printBoard(blankBoard);
