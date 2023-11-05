import config from './config';

export interface IAppConfig {
	email: {
		host: string;
		port: number;
		fromEmail: string;
		secure: boolean;
		auth: {
			user: string;
			pass: string;
		};
		logger: boolean;
	};
}
const appConfig: IAppConfig = config;

export default appConfig;
