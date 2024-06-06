class Sudoku {
  private solution: number[];

  constructor() {
    this.solution = this.filledGrid();
  }

  /**
   * 生成一个完整的数独棋盘
   */
  private filledGrid() {
    const board: number[] = [...Array(81)].fill(0);
    this.fillBoard(board, 0);
    return board;
  }

  /**
   * 递归填充数独棋盘
   * @param board
   * @param idx
   */
  private fillBoard(board: number[], idx: number) {
    if (idx > 80) return true;

    const row = Math.floor(idx / 9);
    const col = idx % 9;

    const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9].sort(() => Math.random() - 0.5);
    for (let i = 0; i < 9; i++) {
      const num = nums[i];
      // 使用随机数尝试填充
      if (this.validate(num, board, row, col)) {
        board[row * 9 + col] = num;
        if (this.fillBoard(board, idx + 1)) return true;
      }
    }

    board[row * 9 + col] = 0;
    return false;
  }

  /**
   * 检查当前数据是否合法
   * @param n 等待填充的数字
   * @param board 数独棋盘
   * @param row
   * @param col
   */
  private validate(n: number, board: number[], row: number, col: number) {
    for (let i = 0; i < 9; i++) {
      const m = 3 * Math.floor(row / 3) + Math.floor(i / 3);
      const k = 3 * Math.floor(col / 3) + (i % 3);
      if (
        board[row * 9 + i] === n ||
        board[i * 9 + col] === n ||
        board[m * 9 + k] === n
      ) {
        return false;
      }
    }
    return true;
  }

  /**
   * 获取数独棋盘的答案
   */
  getAnswer() {
    return this.solution;
  }

  /**
   * 根据答案随机挖空生成一个有唯一解的数独题目
   */
  getQuestion() {
    const question = [...this.solution];
    const removeCount = Math.floor(Math.random() * 30) + 30;
    for (let i = 0; i < removeCount; i++) {
      const idx = Math.floor(Math.random() * 81);
      const temp = question[idx];
      question[idx] = 0;
      if (!this.hasUniqueSolution(question)) {
        question[idx] = temp;
      }
    }
    return question;
  }

  /**
   * 判断数独是否有唯一解
   */
  private hasUniqueSolution(board: number[]): boolean {
    let count = 0;
    const solve = (i = 0) => {
      if (i === board.length) {
        return ++count;
      }
      if (board[i]) {
        // 如果已经有数字，跳过
        return solve(i + 1);
      }
      // 若格子没有数字，则从1-9尝试填入
      for (let num = 1; num <= 9; num++) {
        if (this.validate(num, board, Math.floor(i / 9), i % 9)) {
          board[i] = num;
          solve(i + 1);
          if (count > 1) break; // 如果已经找到多个解，提前结束
          board[i] = 0;
        }
      }
    };
    // 运行解数独函数
    solve();
    // 返回是否有唯一解
    return count === 1;
  }
}

export default Sudoku;
