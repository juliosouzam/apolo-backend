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
import Album from './Album';

@Entity('musics')
class Music {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { nullable: false })
  name: string;

  @Column('text', { nullable: true })
  cover?: string | null;

  @Column('text', { nullable: false })
  originalname: string;

  @Column('text', { nullable: false })
  mimetype: string;

  @Column('int', { nullable: false })
  size: number;

  @Column('text', { nullable: false })
  filename: string;

  @Column('uuid', { nullable: true })
  album_id: string | null;

  @ManyToOne(() => Album)
  @JoinColumn({ name: 'album_id' })
  album?: Album;

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

export default Music;
