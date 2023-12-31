import express from 'express';
import { UserRepository } from '../../repositories/UserRepositoy';
import { UserContext } from '../../database/instanses/authentication/UserContext';
import {
	InviteUserReq,
	LoginReq,
	UpdateUserProfileRequest,
	UpdateUserRequest,
} from './UserRequest.interface';
import { NotFoundException } from '../../common/exception/NotFoundException';

export interface TypedRequestBody<T> extends Express.Request {
	body: T;
}

class UserController {
	private userRepository: UserRepository;
	constructor() {
		this.userRepository = new UserRepository();
	}

	public userLogin: express.RequestHandler = async (
		req: TypedRequestBody<LoginReq>,
		res: express.Response,
		next: express.NextFunction,
	) => {
		try {
			const { email, password } = req.body;
			const user = await this.userRepository.userLogin(email, password);
			res.status(200).json({ user });
		} catch (error) {
			next(error);
		}
	};

	public profile: express.RequestHandler = async (
		req: express.Request,
		res: express.Response,
		next: express.NextFunction,
	) => {
		try {
			const activeUser = UserContext.getActiveUser();
			if (!activeUser) {
				throw new NotFoundException(`No user found`);
			}
			const user = await this.userRepository.profile(activeUser.id);
			res.status(200).json({ user });
		} catch (error) {
			next(error);
		}
	};

	public inviteUser: express.RequestHandler = async (
		req: TypedRequestBody<InviteUserReq>,
		res: express.Response,
		next: express.NextFunction,
	) => {
		try {
			const activeUser = UserContext.getActiveUser();
			if (!activeUser) {
				throw new NotFoundException(`No user found`);
			}
			const { firstName, email, role, branchId } = req.body;
			await this.userRepository.userInvite(
				activeUser.id,
				firstName,
				email,
				role,
				branchId,
			);
			res.status(200).json({});
		} catch (error) {
			next(error);
		}
	};

	public verifyUser: express.RequestHandler = async (
		req: TypedRequestBody<{ token: string; email: string }>,
		res: express.Response,
		next: express.NextFunction,
	) => {
		try {
			const { token, email } = req.body;
			await this.userRepository.verifyUser(token, email);
			res.status(200).json({});
		} catch (error) {
			next(error);
		}
	};

	public acconutSetup: express.RequestHandler = async (
		req: TypedRequestBody<{
			token: string;
			email: string;
			password: string;
		}>,
		res: express.Response,
		next: express.NextFunction,
	) => {
		try {
			const { token, email, password } = req.body;
			await this.userRepository.acconutSetup(token, email, password);
			res.status(200).json({});
		} catch (error) {
			next(error);
		}
	};

	public forgotPassword: express.RequestHandler = async (
		req: TypedRequestBody<{ email: string }>,
		res: express.Response,
		next: express.NextFunction,
	) => {
		try {
			const { email } = req.body;
			await this.userRepository.forgotPassword(email);
			res.status(200).json({});
		} catch (error) {
			next(error);
		}
	};

	public resetPassword: express.RequestHandler = async (
		req: TypedRequestBody<{
			email: string;
			password: string;
			token: string;
		}>,
		res: express.Response,
		next: express.NextFunction,
	) => {
		try {
			const { email, password, token } = req.body;
			await this.userRepository.resetPassword(email, password, token);
			res.status(200).json({});
		} catch (error) {
			next(error);
		}
	};

	public updateProfile: express.RequestHandler = async (
		req: TypedRequestBody<UpdateUserProfileRequest>,
		res: express.Response,
		next: express.NextFunction,
	) => {
		try {
			const activeUser = UserContext.getActiveUser();
			if (!activeUser) {
				throw new NotFoundException(`No user found`);
			}
			const data = req.body;
			await this.userRepository.updateProfile(data, activeUser.id);
			res.status(200).json({});
		} catch (error) {
			next(error);
		}
	};

	public usersListByBranch: express.RequestHandler = async (
		req: express.Request,
		res: express.Response,
		next: express.NextFunction,
	) => {
		try {
			const activeUser = UserContext.getActiveUser();
			if (!activeUser) {
				throw new NotFoundException(`No user found`);
			}
			const { branchId } = req.params;
			const usersList = await this.userRepository.getUsersListByBranchId(
				activeUser.id,
				branchId,
			);
			res.status(200).json({ usersList });
		} catch (error) {
			next(error);
		}
	};

	public updateUser: express.RequestHandler = async (
		req: TypedRequestBody<UpdateUserRequest>,
		res: express.Response,
		next: express.NextFunction,
	) => {
		try {
			const activeUser = UserContext.getActiveUser();
			if (!activeUser) {
				throw new NotFoundException(`No user found`);
			}
			const data = req.body;
			await this.userRepository.updateUser(data);
			res.status(200).json({});
		} catch (error) {
			next(error);
		}
	};

	public deleteUser: express.RequestHandler = async (
		req: express.Request,
		res: express.Response,
		next: express.NextFunction,
	) => {
		try {
			const activeUser = UserContext.getActiveUser();
			if (!activeUser) {
				throw new NotFoundException(`No user found`);
			}

			const { userId } = req.params;
			await this.userRepository.deleteUserById(userId, activeUser.id);
			res.status(201).json({});
		} catch (error) {
			next(error);
		}
	};
}
export default UserController;
