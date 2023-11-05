import express from 'express';
import UserRoutes from './userRoutes/UserRoutes';

class Routes {
	private router: express.Router;
	private userRoutes: UserRoutes;

	constructor() {
		this.router = express.Router();
		this.userRoutes = new UserRoutes();
		this.initRoutes();
	}

	private initRoutes() {
		this.router.use('/user', this.userRoutes.getRouter());
	}

	public getRouter(): express.Router {
		return this.router;
	}
}

export default Routes;
