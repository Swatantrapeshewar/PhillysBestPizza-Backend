import express from 'express';
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
			const { email } = req.body;
			const user = await userRepository.userLogin(email);
			res.status(200).json({ user });
		} catch (error) {
			next(error);
		}
	};
}
export default UserController;
