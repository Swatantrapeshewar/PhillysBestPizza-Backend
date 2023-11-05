import express, { Router } from 'express';
import UserController from '../../controllers/userController/UserController';

class UserRoutes {
	private router: Router;
	private userController: UserController;

	constructor() {
		this.router = express.Router();
		this.userController = new UserController();
		this.setupRoutes();
	}

	private setupRoutes() {
		// Auth the user
		this.router.post('/login', this.userController.authUser);
	}

	public getRouter() {
		return this.router;
	}
}

export default UserRoutes;
