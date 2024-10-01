import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'CustomerInquiry' })
export class CustomerInquiry {
    @PrimaryGeneratedColumn()
    CustomerInquiryId: number;

    @Column({ type: 'nvarchar', length: 255, nullable: false })
    QuestionCategory: string;

    @Column({ type: 'nvarchar', nullable: false })
    Question: string;

    @Column({ type: 'nvarchar', length: 255, nullable: false })
    FullName: string;

    @Column({ type: 'nvarchar', length: 255, nullable: false })
    Email: string;

    @CreateDateColumn({ type: 'datetime2' })
    CreatedAt: Date;

    @Column({ type: 'nvarchar', length: 50, nullable: true })
    CreatedBy: string;

    @UpdateDateColumn({ type: 'datetime2', nullable: true })
    UpdatedAt: Date;

    @Column({ type: 'nvarchar', length: 50, nullable: true })
    UpdatedBy: string;

    @Column({ type: 'datetime2', nullable: true })
    DeletedAt: Date;

    @Column({ type: 'nvarchar', length: 50, nullable: true })
    DeletedBy: string;

    @Column({ type: 'nvarchar', nullable: true })
    Reply: string;
}
