import { IUserDatastore } from './UserDatastore.interface';
import { User } from '../entities/User';
import dataSource from '../dataSource';
import { UserRole } from '../entities/UserRole';

export class UserDatastore implements IUserDatastore {
	constructor() {}

	public async getById(userId: string): Promise<User> {
		let queryResult: User | null = null;
		await dataSource.transaction(async (manager) => {
			queryResult = await manager
				.getRepository(User)
				.createQueryBuilder('User')
				.leftJoinAndSelect('User.role', 'role')
				.where('User.id = :id', { id: userId })
				.getOne();
		});

		if (queryResult) {
			return queryResult;
		} else {
			// Handle the case where no user was found with the given ID.
			throw new Error(`No user found with ID ${userId}`);
		}
	}

	public async getUserByEmail(email: string): Promise<User> {
		let queryResult: User | null = null;
		await dataSource.transaction(async (manager) => {
			queryResult = await manager
				.getRepository(User)
				.createQueryBuilder('User')
				.leftJoinAndSelect('User.role', 'role')
				.leftJoinAndSelect('User.branch', 'branch')
				.where('User.email = :email', { email })
				.getOne();
		});

		if (queryResult) {
			return queryResult;
		} else {
			throw new Error(`No user found with ID ${email}`);
		}
	}

	public async getUserRoleById(userId: string): Promise<UserRole> {
		let queryResult: UserRole | null = null;
		await dataSource.transaction(async (manager) => {
			queryResult = await manager
				.getRepository(UserRole)
				.createQueryBuilder('UserRole')
				.leftJoinAndSelect('UserRole.user', 'user')
				.where('user.id = :userId', { userId })
				.getOne();
		});

		if (queryResult) {
			return queryResult;
		} else {
			throw new Error(`No user role found`);
		}
	}
}
