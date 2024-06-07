import { Injectable } from '@nestjs/common';
import { GameEntity } from './entity/game.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  FillNumberCmd,
  FillNumberResultDto,
  GameDto,
  NewGameDto,
} from './types';
import Sudoku from './sudoku';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(GameEntity)
    private gameRepository: Repository<GameEntity>,
  ) {}

  async newGame(): Promise<NewGameDto> {
    const sudoku = new Sudoku();
    const question = sudoku.getQuestion();
    const playerAnswer = Array(81).fill(0);
    for (let i = 0; i < 81; i++) {
      if (question[i] !== 0) {
        playerAnswer[i] = -1;
      }
    }
    const game = await this.gameRepository.save({
      correctAnswer: sudoku.getAnswer().join(','),
      question: question.join(','),
      playerAnswer: playerAnswer.join(','),
      isWin: false,
    });
    return {
      gameId: game.id,
      question: question,
    };
  }

  async loadGame(id: number): Promise<GameDto> {
    const game = await this.gameRepository.findOne({ where: { id } });
    if (!game) {
      throw new Error('Game not found');
    }
    const correctAnswer = game.correctAnswer.split(',').map(Number);
    const playerAnswer = game.playerAnswer.split(',').map(Number);
    const result = Array(81).fill(-1);
    for (let i = 0; i < 81; i++) {
      if (playerAnswer[i] === -1) {
        playerAnswer[i] = 0;
      }
      if (playerAnswer[i] === correctAnswer[i]) {
        result[i] = 1;
      }
    }

    return {
      gameId: game.id,
      question: game.question.split(',').map(Number),
      playerAnswer: playerAnswer,
      result: result,
      isWin: game.isWin,
    };
  }

  async fillNumber(cmd: FillNumberCmd): Promise<FillNumberResultDto> {
    const game = await this.gameRepository.findOne({
      where: { id: cmd.gameId },
    });
    if (!game) {
      throw new Error('Game not found');
    }
    const playerAnswer = game.playerAnswer.split(',').map(Number);
    const correctAnswer = game.correctAnswer.split(',').map(Number);
    playerAnswer[cmd.index] = cmd.number;
    const correct = playerAnswer[cmd.index] === correctAnswer[cmd.index];
    const isWin = playerAnswer.every(
      (v, i) => v === -1 || v === correctAnswer[i],
    );
    await this.gameRepository.update(
      { id: cmd.gameId },
      { playerAnswer: playerAnswer.join(','), isWin },
    );
    return {
      correct,
      isWin,
    };
  }
}
