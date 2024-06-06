import { ApiProperty } from '@nestjs/swagger';

export class NewGameDto {
  @ApiProperty()
  gameId: number;
  @ApiProperty()
  question: number[];
}

export class GameDto {
  @ApiProperty()
  gameId: number;
  @ApiProperty()
  question: number[];
  @ApiProperty()
  playerAnswer: number[];
  @ApiProperty()
  result: number[];
  @ApiProperty()
  isWin: boolean;
}

export class FillNumberCmd {
  @ApiProperty()
  gameId: number;
  @ApiProperty()
  index: number;
  @ApiProperty()
  number: number;
}

export class FillNumberResultDto {
  @ApiProperty()
  correct: boolean;
  @ApiProperty()
  isWin: boolean;
}
