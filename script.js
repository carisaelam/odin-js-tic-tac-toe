import board from './modules/board.js';

const myBoard = board();

myBoard.clearBoard();
myBoard.updateCell([0, 0], 'Z');
myBoard.updateCell([0, 1], 'Z');
myBoard.updateCell([1, 1], 'X');
myBoard.updateCell([1, 2], 'X');
myBoard.updateCell([1, 0], 'X');

myBoard.printBoard();
