import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class GameEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  correctAnswer: string;

  @Column('text')
  question: string;

  @Column('text')
  playerAnswer: string;

  @Column('boolean')
  isWin: boolean;
}
