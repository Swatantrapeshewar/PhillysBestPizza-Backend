import express from 'express';
import { IUserDatastore } from '../../database/datastores/UserDatastore.interface';
import { IUserRepository } from '../../repositories/UserRepository.interface';
import { UserDatastore } from '../../database/datastores/UserDatastore';
import { UserRepository } from '../../repositories/UserRepositoy';

const userRepository = new UserRepository();
class UserController {
	constructor() {}

	public userLogin = async (
		req: express.Request,
		res: express.Response,
		next: express.NextFunction,
	) => {
		try {
			const { email, password } = req.body;
			const user = await userRepository.userLogin(email, password);
			res.status(200).json({ user });
		} catch (error) {
			next(error);
		}
	};
}
export default UserController;
