import { Branch } from '../../database/entities/Branch';
import { User } from '../../database/entities/User';
import { UserRole } from '../../database/entities/UserRole';

export interface FormattedUserResponse {
	id: string;
	email: string;
	firstName: string | undefined;
	lastName: string | undefined;
	avatar: string | undefined;
	phoneNumber: number | undefined;
	role: UserRole;
	branch: Branch[];
}

export const userResponse = (user: User): FormattedUserResponse => ({
	id: user.id,
	email: user.email,
	firstName: user.firstName ?? undefined,
	lastName: user.lastName ?? undefined,
	avatar: user.avatar ?? undefined,
	phoneNumber: user.phoneNumber ?? undefined,
	role: user.role,
	branch: user.branch,
});
