import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('ICarImage')
export class ICarImage {
  @PrimaryGeneratedColumn()
  ICarImageId: number;

  @Column()
  Increment: number;

  @Column()
  AuctionItemId: number;

  @Column()
  ImageNo: number;

  @Column({
    length: 400,
    nullable: false,
  })
  ImageName: string;

  @Column()
  ImageStatus: number;

  @Column({
    length: 200,
    nullable: true,
  })
  ImagePath: string;

  @Column({
    length: 400,
    nullable: true,
  })
  ThumbImagePath: string;

  @Column()
  CreatedAt: Date;

  @CreateDateColumn()
  CreatedBy: number;

  @UpdateDateColumn()
  UpdatedAt: Date;

  @Column()
  UpdatedBy: number;

  @Column()
  FileId: number;

  @Column({
    length: 100,
    nullable: true,
  })
  ImageType: string;

  @Column()
  ICarValueId: number;
}
