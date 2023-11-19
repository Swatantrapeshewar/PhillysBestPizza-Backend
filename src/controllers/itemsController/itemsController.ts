import express from 'express';
import { UserContext } from '../../database/instanses/authentication/UserContext';
import { NotFoundException } from '../../common/exception/NotFoundException';
import { ItemsRepository } from '../../repositories/ItemsRepository';

export interface TypedRequestBody<T> extends Express.Request {
	body: T;
}

export interface ItemsReq {
	categoryId: string;
	name: string;
	description?: string;
	image?: string;
	dailyThreshold?: number;
	weeklyThreshold?: number;
	overallThreshold?: number;
}

class ItemsController {
	private itemRepository: ItemsRepository;
	constructor() {
		this.itemRepository = new ItemsRepository();
	}

	public addItems: express.RequestHandler = async (
		req: TypedRequestBody<ItemsReq>,
		res: express.Response,
		next: express.NextFunction,
	) => {
		try {
			const activeUser = UserContext.getActiveUser();
			if (!activeUser) {
				throw new NotFoundException(`User not found`);
			}
			const data = req.body;
			await this.itemRepository.addItem(data, activeUser.id);
			res.status(200).json({});
		} catch (error) {
			next(error);
		}
	};

	public itemList: express.RequestHandler = async (
		req: express.Request,
		res: express.Response,
		next: express.NextFunction,
	) => {
		try {
			const activeUser = UserContext.getActiveUser();
			if (!activeUser) {
				throw new NotFoundException(`User not found`);
			}
			const itemList = await this.itemRepository.itemList(activeUser.id);
			res.status(200).json({ itemList });
		} catch (error) {
			next(error);
		}
	};
	public deleteItem: express.RequestHandler = (
		req: express.Request,
		res: express.Response,
		next: express.NextFunction,
	) => {
		try {
			const activeUser = UserContext.getActiveUser();
			if (!activeUser) {
				throw new NotFoundException(`User not found`);
			}

			res.status(200).json({});
		} catch (error) {
			next(error);
		}
	};
	public updateItem: express.RequestHandler = (
		req: TypedRequestBody<ItemsReq>,
		res: express.Response,
		next: express.NextFunction,
	) => {
		try {
			const activeUser = UserContext.getActiveUser();
			if (!activeUser) {
				throw new NotFoundException(`User not found`);
			}
			const data = req.body;
			res.status(200).json({ data });
		} catch (error) {
			next(error);
		}
	};
}
export default ItemsController;
