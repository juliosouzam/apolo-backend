import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Expose } from 'class-transformer';

import Category from './Category';
import Session from './Session';

@Entity('artists')
class Artist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { nullable: false })
  name: string;

  @Column('text', { nullable: false })
  cover: string;

  @Column('uuid', { nullable: false })
  category_id: string;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Column('uuid', { nullable: false })
  session_id: string;

  @ManyToOne(() => Session)
  @JoinColumn({ name: 'session_id' })
  session: Session;

  @Expose({ name: 'cover_url' })
  getCoverUrl(): string {
    if (!this.cover) {
      return 'https://picsum.photos/1280/720';
    }

    switch ('disk') {
      case 'disk':
        return `http://localhost:3333/files/${this.cover}`;
      default:
        return 'https://picsum.photos/1280/720';
    }
  }

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Artist;
