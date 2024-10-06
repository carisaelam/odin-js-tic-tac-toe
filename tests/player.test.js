import { beforeEach, describe, it, expect } from 'vitest';
import player from '../modules/player';

describe('Player', () => {
  let gamePlayer;

  beforeEach(() => {
    gamePlayer = player('testplayer', 'X');
  });

  it('should increment points by one', () => {
    gamePlayer.addPoint();
    expect(gamePlayer.getPoints()).toEqual(1);
  });

  it('should increment points by one multiple times', () => {
    gamePlayer.addPoint();
    gamePlayer.addPoint();
    gamePlayer.addPoint();
    expect(gamePlayer.getPoints()).toEqual(3);
  });
});
