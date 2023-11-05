import { User } from '../entities/User';
import { UserRole } from '../entities/UserRole';

export interface IUserDatastore {
	getById(userId: string): Promise<User>;

	getUserByEmail(email: string): Promise<User>;

	getUserRoleById(userId: string): Promise<UserRole>;
}
