import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { VideoEntity } from '../../videos/entities/video.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 100 })
  email: string;

  @Column()
  password: string;

  @Column({ length: 100 })
  userName: string;

  //   @OneToMany(() => VideoEntity, (video) => video.user, { cascade: true })
  //   videos: VideoEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
