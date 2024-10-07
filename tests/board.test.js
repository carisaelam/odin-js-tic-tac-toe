import { describe, it, beforeEach, expect } from 'vitest';
import board from '../modules/board';

describe('Board', () => {
  let gameBoard;

  // Re-initialize board for each test
  beforeEach(() => {
    gameBoard = board();
  });

  // updateCell tests
  describe('updateCell functionality', () => {
    it('should update the given cell with the piece', () => {
      const updatedBoard = gameBoard.updateCell([0, 0], 'X');
      expect(updatedBoard[0][0]).toBe('X');
    });

    it('should return false for out-of-bounds coordinates', () => {
      const originalBoard = gameBoard.updateCell([3, 3], 'X');
      expect(originalBoard).toBe(false);
    });

    it('should return false for occupied cells', () => {
      gameBoard.updateCell([0, 0], 'X');
      const updatedBoard = gameBoard.updateCell([0, 0], 'O');
      expect(updatedBoard).toBe(false);
    });
  });

  // clearBoard tests
  describe('clearBoard functionality', () => {
    it('should clear the game board', () => {
      gameBoard.updateCell([0, 0], 'X');
      const clearedBoard = gameBoard.clearBoard();
      expect(clearedBoard[0][0]).toEqual('_');
    });
  });

  // printBoard tests
  describe('printBoard functionality', () => {
    it('should print the current state of the board', () => {
      gameBoard.updateCell([0, 0], 'X');
      gameBoard.updateCell([0, 1], 'O');
      gameBoard.updateCell([0, 2], 'O');
      const printedBoard = gameBoard.printBoard();
      expect(printedBoard[0]).toEqual('X | O | O');
    });
  });

  // checkWin tests
  describe('checkWin functionality', () => {
    it('should return true for horizontal win', () => {
      gameBoard.updateCell([0, 0], 'X');
      gameBoard.updateCell([0, 1], 'X');
      gameBoard.updateCell([0, 2], 'X');
      expect(gameBoard.checkWin()).toBe(true);
      gameBoard.clearBoard();
    });

    it('should return true for vertical win', () => {
      gameBoard.updateCell([0, 0], 'X');
      gameBoard.updateCell([1, 0], 'X');
      gameBoard.updateCell([2, 0], 'X');
      expect(gameBoard.checkWin()).toBe(true);
      gameBoard.clearBoard();
    });

    it('should return true for negative slope diagonal win', () => {
      gameBoard.updateCell([0, 0], 'X');
      gameBoard.updateCell([1, 1], 'X');
      gameBoard.updateCell([2, 2], 'X');
      expect(gameBoard.checkWin()).toBe(true);
      gameBoard.clearBoard();
    });

    it('should return true for positive slope diagonal win', () => {
      gameBoard.updateCell([0, 2], 'X');
      gameBoard.updateCell([1, 1], 'X');
      gameBoard.updateCell([2, 0], 'X');
      expect(gameBoard.checkWin()).toBe(true);
      gameBoard.clearBoard();
    });
  });
});
