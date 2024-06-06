import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppModule } from './app.module';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('AppController', () => {
    it('should return a new game', () => {
      expect(appController.getNewGame()).toBeDefined();
    });

    it('should load game', async () => {
      const result = await appController.loadGame(1);
      expect(result.gameId).toBe(1);
      expect(result.playerAnswer.length).toBe(81);
      expect(result.question.length).toBe(81);
    });

    it('fill a number', async () => {
      let result = await appController.fillNumber({
        gameId: 1,
        number: 9,
        index: 3,
      });
      expect(result.correct).toBe(true);
      expect(result.isWin).toBe(false);

      result = await appController.fillNumber({
        gameId: 1,
        number: 4,
        index: 4,
      });
      expect(result.correct).toBe(false);
      expect(result.isWin).toBe(false);

      result = await appController.fillNumber({
        gameId: 1,
        number: 4,
        index: 0,
      });
      expect(result.correct).toBe(false);
      expect(result.isWin).toBe(false);
    });
  });
});
