import express from 'express';
import { UserRepository } from '../../repositories/UserRepository';

const userRepository = new UserRepository();

class UserController {
	// Auth the user
	public authUser: express.RequestHandler = async (
		req: express.Request<object, object, { email: string }, object>,
		res: express.Response,
		next: express.NextFunction,
	) => {
		try {
			const { email }: { email: string } = req.body;
			const user = await userRepository.userLogin(email);
			res.status(200).json({ user });
		} catch (error) {
			next(error);
		}
	};
}

export default UserController;
