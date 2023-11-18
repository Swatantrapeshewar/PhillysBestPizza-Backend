import express from 'express';
import UserRoutes from './userRoutes/UserRoutes';
import { BranchRoutes } from './branchRoutes/BranchRoutes';

class Routes {
	private router: express.Router;
	private userRoutes: UserRoutes;
	private branchRoutes: BranchRoutes;

	constructor() {
		this.router = express.Router();
		this.userRoutes = new UserRoutes();
		this.branchRoutes = new BranchRoutes();
		this.initRoutes();
	}

	private initRoutes() {
		this.router.use('/user', this.userRoutes.getRouter());
		this.router.use('/branch', this.branchRoutes.getRouter());
	}

	public getRouter(): express.Router {
		return this.router;
	}
}

export default Routes;
