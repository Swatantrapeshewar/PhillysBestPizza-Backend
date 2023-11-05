import { User } from '../../database/entities/User';

export interface ILogin {
	user: any;
	accessToken: string;
	refreshToken: string;
}
