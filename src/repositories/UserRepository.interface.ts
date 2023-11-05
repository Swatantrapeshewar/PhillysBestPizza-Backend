import { ILogin } from '../controllers/responseType/ILogin';

export interface IUserRepository {
	userLogin(email: string, password: string): Promise<ILogin>;
}
