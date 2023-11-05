import {
	Entity,
	PrimaryColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	JoinColumn,
	ManyToOne,
} from 'typeorm';
import { User } from './User';

@Entity('Branch')
export class Branch {
	@PrimaryColumn({ type: 'varchar', length: 64 })
	public id!: string;

	@Column({ type: 'varchar', length: 64 })
	public storeName!: string;

	@Column({ type: 'varchar', length: 128 })
	public storeAddress!: string;

	@Column({ type: 'bigint', nullable: true })
	public phoneNumber!: number;

	@Column({ type: 'text', nullable: true })
	public image?: string | null;

	@CreateDateColumn()
	public createdAt!: Date;

	@UpdateDateColumn()
	public updatedAt!: Date;

	@ManyToOne(() => User, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
	@JoinColumn({ name: 'userId' })
	public user!: User;
}
