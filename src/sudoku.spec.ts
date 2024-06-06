import Sudoku from './sudoku';
import * as process from 'node:process';

function prettyPrint(sudoku: number[]) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      process.stdout.write(sudoku[i * 9 + j] + ' ');
    }
    process.stdout.write('\n');
  }
  process.stdout.write('\n=====================\n');
}

describe('Sudoku', () => {
  describe('test', () => {
    it('生成正确的棋盘', () => {
      const sudoku = new Sudoku();
      prettyPrint(sudoku.getAnswer());
      prettyPrint(sudoku.getQuestion());
    });
  });
});
