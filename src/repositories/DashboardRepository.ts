import { UserDatastore } from '../database/datastores/UserDatastore';
import AuthenticationService from '../database/instanses/authentication/AuthenticationService';
import { BranchDatastore } from '../database/datastores/BranchDatastore';
import { NotFoundException } from '../common/exception/NotFoundException';
import { ItemsDatastore } from '../database/datastores/ItemsDatastore';
import { InventoryItemsDatastore } from '../database/datastores/InventroyItemsDatastore';
import { CategoryDatastore } from '../database/datastores/CategoryDatastore';

// interface formattedResponse { totalItems: number; totalCategories: number | undefined; itemsWithTotalStock: unknown[]; }
export interface itemTotalStockResponse {
	itemName: string;
	availableQuantity: string;
	dailyConsumption: string;
	dailyThreshold: string;
	weeklyThreshold: string;
	overallThreshold: string;
	category: string;
	healthScore?: number;
}
export class DashboardRepository {
	private userDatastore: UserDatastore;
	private authentication: AuthenticationService;
	private branchDatastore: BranchDatastore;
	private itemDatastore: ItemsDatastore;
	private inventoryItemsDatastore: InventoryItemsDatastore;
	private categoryDatastore: CategoryDatastore;

	constructor() {
		this.userDatastore = new UserDatastore();
		this.authentication = new AuthenticationService();
		this.branchDatastore = new BranchDatastore();
		this.itemDatastore = new ItemsDatastore();
		this.inventoryItemsDatastore = new InventoryItemsDatastore();
		this.categoryDatastore = new CategoryDatastore();
	}

	public async getDashboardDetails(activeUserId: string): Promise<unknown> {
		const existUser = await this.userDatastore.getById(activeUserId);
		if (!existUser) {
			throw new NotFoundException(`User not found`);
		}

		// 1. Get the Total Items from the DB
		const getTotalItems = await this.itemDatastore.getTotalItems();

		// 2. Get the Total Categories from the DB
		const getTotalCategories =
			await this.categoryDatastore.getTotalCategories();

		// 3. Get the Items with Total Stock
		const itemsWithTotalStock: itemTotalStockResponse[] =
			await this.inventoryItemsDatastore.getItemsTotalStocks();

		// 4. Calculate the Health Score Check
		itemsWithTotalStock.map((item) => {
			const dailyConsumption = parseInt(item.dailyConsumption);
			const currentStock = parseInt(item.availableQuantity);
			const dailyThreshold = parseInt(item.dailyThreshold);
			const overallThreshold = parseInt(item.overallThreshold);

			item['healthScore'] = this.calculateHealthScore(
				dailyConsumption,
				currentStock,
				dailyThreshold,
				overallThreshold,
			);
		});
		return {
			totalItems: getTotalItems,
			totalCategories: getTotalCategories,
			itemsWithTotalStock: itemsWithTotalStock,
		};
	}

	private calculateHealthScore(
		dailyConsumption: number,
		currentStock: number,
		dailyThreshold: number,
		overallThreshold: number,
	): number {
		// Example algorithm (pseudo-code)
		const dailyScore = (1 - dailyConsumption / dailyThreshold) * 100;
		const stockScore = (currentStock / overallThreshold) * 100;

		// Adjust weights (assuming weightDaily + weightStock = 1)
		const weightDaily = 0.7; // Adjust this weight based on importance
		const weightStock = 0.3; // Adjust this weight based on importance

		// Apply weights
		const weightedScore =
			dailyScore * weightDaily + stockScore * weightStock;
		return Math.max(0, Math.min(weightedScore, 100)); // Clamp value between 0 and 100
	}
}
