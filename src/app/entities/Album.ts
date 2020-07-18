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

import Artist from './Artist';
import Category from './Category';
import Session from './Session';

@Entity('albums')
class Album {
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

  @Column('uuid', { nullable: false })
  artist_id: string;

  @ManyToOne(() => Artist)
  @JoinColumn({ name: 'artist_id' })
  artist: Artist;

  @Expose({ name: 'cover_url' })
  getCoverUrl(): string | null {
    if (!this.cover) {
      return null;
    }

    switch ('disk') {
      case 'disk':
        return `http://localhost:3333/files/${this.cover}`;
      default:
        return null;
    }
  }

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Album;
