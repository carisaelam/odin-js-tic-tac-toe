import { describe, it, beforeEach, expect, vi } from 'vitest';
import board from '../modules/board';

describe('Board', () => {
  let gameBoard;

  // Re-initialize board for each test
  beforeEach(() => {
    gameBoard = board();
  });

  // updateCell tests
  it('should update the given cell with the piece', () => {
    const updatedBoard = gameBoard.updateCell([0, 0], 'X');
    expect(updatedBoard[0][0]).toBe('X');
  });

  it('should return an error for out-of-bounds coordinates', () => {
    vi.spyOn(console, 'error');
    const originalBoard = gameBoard.updateCell([3, 3], 'X');
    expect(console.error).toHaveBeenCalledWith('not on board');
    expect(originalBoard).toEqual([
      ['_', '_', '_'],
      ['_', '_', '_'],
      ['_', '_', '_'],
    ]);
  });

  it('should return an error for occupied cells', () => {
    vi.spyOn(console, 'error');
    gameBoard.updateCell([0, 0], 'X');
    const updatedBoard = gameBoard.updateCell([0, 0], 'O');
    expect(console.error).toHaveBeenCalledWith('already taken');
    expect(updatedBoard).toEqual([
      ['X', '_', '_'],
      ['_', '_', '_'],
      ['_', '_', '_'],
    ]);
  });

  // clearBoard tests
  it('should clear the game board', () => {
    gameBoard.updateCell([0, 0], 'X');
    const clearedBoard = gameBoard.clearBoard();
    expect(clearedBoard[0][0]).toEqual('_');
  });

  // printBoard tests
  it('should print the current state of the board', () => {
    gameBoard.updateCell([0, 0], 'X');
    gameBoard.updateCell([0, 1], 'O');
    gameBoard.updateCell([0, 2], 'O');
    const printedBoard = gameBoard.printBoard();
    expect(printedBoard[0]).toEqual('X | O | O');
  });
});
