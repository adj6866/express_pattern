import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  DeleteDateColumn,
} from 'typeorm';

@Entity('User')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  email: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'varchar', length: 15, nullable: true })
  phone: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  provider: string;

  @Column({ type: 'varchar', length: 50 })
  asRole: string;

  @Column({ type: 'bit', default: true })
  isActive: boolean;

  @Column({ type: 'datetime', default: () => 'GETDATE()' })
  createdAt: Date;

  @Column({ type: 'varchar', length: 100, nullable: true })
  createdBy: string;

  @Column({ type: 'datetime', nullable: true, onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Column({ type: 'varchar', length: 100, nullable: true })
  updatedBy: string;

  @DeleteDateColumn({ type: 'datetime', nullable: true })
  deletedAt: Date;

  @Column({ type: 'varchar', length: 100, nullable: true })
  deletedBy: string;
}
