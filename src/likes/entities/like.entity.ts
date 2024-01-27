import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';
import { VideoEntity } from '../../videos/entities/video.entity';

@Entity('likes')
export class LikeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => VideoEntity, { cascade: true })
  @JoinColumn({ name: 'videoId' })
  video: VideoEntity;

  //   @Column()
  //   userId: number;
}
