import express, { Application } from 'express';
import dotenv from 'dotenv';
import Routes from './routes';

class Server {
	private app: Application;
	private routes: Routes;
	private port: number;

	constructor() {
		this.app = express();
		this.routes = new Routes();
		this.port = Number(process.env.PORT) || 3000;

		dotenv.config();
		this.configureMiddleware();
		this.configureRoutes();
		this.startServer();
	}

	private configureMiddleware() {
		this.app.use(express.json());
	}

	private configureRoutes() {
		this.app.use('/api', this.routes.getRouter());
	}

	private startServer() {
		this.app.listen(this.port, () => {
			console.log(`Server is running on port ${this.port}`);
		});
	}
}

new Server();
