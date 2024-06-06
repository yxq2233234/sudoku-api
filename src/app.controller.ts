import { Body, Controller, Param, ParseIntPipe, Post, Query } from "@nestjs/common";
import { AppService } from './app.service';
import {
  FillNumberCmd,
  FillNumberResultDto,
  GameDto,
  NewGameDto,
} from './types';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ summary: '创建一个新游戏' })
  @ApiResponse({ type: NewGameDto })
  @Post('/new-game')
  async getNewGame(): Promise<NewGameDto> {
    return this.appService.newGame();
  }

  @ApiOperation({ summary: '加载游戏' })
  @ApiResponse({ type: GameDto })
  @Post('/load-game')
  async loadGame(@Query('id', ParseIntPipe) id: number): Promise<GameDto> {
    console.log('id', id);
    return this.appService.loadGame(id);
  }

  @ApiOperation({ summary: '填写一个数字 填0等于清空' })
  @ApiResponse({ type: GameDto })
  @Post('/fill-number')
  async fillNumber(@Body() cmd: FillNumberCmd): Promise<FillNumberResultDto> {
    return this.appService.fillNumber(cmd);
  }
}
