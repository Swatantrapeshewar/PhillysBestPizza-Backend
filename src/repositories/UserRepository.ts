import { IUserRepository } from './UserRepository.interface';
import { userResponse } from '../common/helpers/ResponseHandle';
import { UserDatastore } from '../database/datastores/UserDatastore';
import { ILogin } from '../controllers/responseType/ILogin';

const userDatastore = new UserDatastore();
export class UserRepository implements IUserRepository {
	constructor() {}

	public async userLogin(email: string): Promise<ILogin> {
		const userDetail = await userDatastore.getUserByEmail(email);
		if (!userDetail) {
			throw new Error(`No user found`);
		}

		const userRole = await userDatastore.getUserRoleById(userDetail.id);
		if (!userRole) {
			throw new Error(`No user found`);
		}
		const userData = {
			user: userResponse(userDetail),
			accessToken: 'dummy access token',
			refreshToken: 'dummy refresh token',
		};
		return userData;
	}
}
