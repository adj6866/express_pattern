import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from 'typeorm';

@Entity('NilaiICar')
export class NilaiICar extends BaseEntity {
  @PrimaryGeneratedColumn()
  ICarValueId: number;

  @Column()
  Increment: number;

  @Column()
  AuctionItemId: number;

  @Column()
  AppraiserId: number;

  @Column({
    nullable: true,
    default: null,
  })
  PoliceNo: string;

  @Column({
    nullable: true,
    default: null,
  })
  DocumentNo: string;

  @Column()
  DocumentDate: Date;

  @Column({ nullable: false })
  TotalEvaluationResult: string;

  @Column({ nullable: false })
  TotalEvaluationScore: number;

  @Column({
    nullable: true,
    default: null,
  })
  TotalEvaluationComment: string;

  @Column({ default: 0 })
  StsTaksasi: number;

  @Column({ default: 0 })
  NominalICar: number;

  @Column({ default: '0' })
  Mrp: string;

  @Column({ default: '0' })
  FactorDoc: string;

  @Column({ default: '0' })
  FactorLain: string;

  @Column({ default: 0 })
  StsDeleted: number;

  @Column({ nullable: true })
  StartRecomendation: number;

  @Column({ nullable: true })
  EndRecomendation: number;

  @Column({ nullable: true })
  FinalPriceItem: number;

  @Column({ nullable: true })
  DescriptionItem: string;

  @Column()
  PricingUserId: number;

  @Column()
  PricingName: string;

  @CreateDateColumn()
  CreatedAt: Date;

  @UpdateDateColumn({ nullable: true })
  UpdatedAt: Date;

  @Column()
  CompanyName: string;

  @Column()
  CreatedBy: string;

  @Column()
  UpdatedBy: string;

  @Column()
  CityName: string;

  @Column()
  VehicleLocation: string;

  @Column()
  FrameNo: string;

  @Column()
  EngineNo: string;

  @Column({ nullable: true })
  UrlResultInspection: string;

  @Column()
  FramePrice: number;

  @Column()
  MechanicalPrice: number;

  @Column()
  InteriorPrice: number;

  @Column()
  ExteriorPrice: number;

  @Column()
  GtfPrice: number;

  @Column()
  TestDrivePrice: number;

  @Column()
  Uuid: string;

  @Column()
  GtfOtherPrice: number;

  @Column()
  TimeLag: number;
}
