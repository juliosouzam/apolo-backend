import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
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

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Artist;
