import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { LikeEntity } from '../../likes/entities/like.entity';
import { UserEntity } from '../../users/entities/user.entity';

@Entity('videos')
export class VideoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column({ default: 0 })
  numLikes: number;

  @Column()
  title: string;

  @Column({ length: 200, unique: true })
  url: string;

  @Column()
  description: string;

  @Column({ type: 'enum', enum: ['public', 'private'] })
  view: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  //   @ManyToOne(() => UserEntity, (user) => user.videos)
  //   user: UserEntity;

  @OneToMany(() => LikeEntity, (like) => like.video)
  likes: LikeEntity[];
}
