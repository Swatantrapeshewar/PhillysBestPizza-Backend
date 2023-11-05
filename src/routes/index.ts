import { Request, Response, Application } from 'express';
import UserController from '../controllers/userController/UserController';

const userContorller = new UserController();
export class Routes {
	/**
	 * @author Aman kumar Choudhary
	 */

	public router = (app: Application) => {
		app.post('/user/login', userContorller.userLogin);
		app.get('/', (req: Request, res: Response) => {
			res.send("hii it's runnig...");
		});
	};
}

export const route = new Routes().router;
