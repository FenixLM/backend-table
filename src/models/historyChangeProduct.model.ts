import { Collection, Db, ObjectId } from "mongodb";
import { historyChangeProductInterface } from "../interfaces/product.interface";

class HistoryChangeProductModel {
	private historyChangeProductCollection!: Collection<historyChangeProductInterface>;

	constructor(db: Db) {
		this.historyChangeProductCollection = db.collection("historyChangeProduct");
	}

	async getAllHistoryChangeProduct(): Promise<historyChangeProductInterface[]> {
		const products = await this.historyChangeProductCollection.find().toArray();
		return products;
	}

	async createHistoryChangeProduct(
		productChangeHistory: historyChangeProductInterface,
	): Promise<historyChangeProductInterface> {
		const dataInsert =
			await this.historyChangeProductCollection.insertOne(productChangeHistory);
		productChangeHistory._id = dataInsert.insertedId;
		return productChangeHistory;
	}

	async getHistoryChangeProductByIdProduct(
		productId: string,
	): Promise<historyChangeProductInterface | null> {
		const product = await this.historyChangeProductCollection.findOne({
			_id: new ObjectId(productId),
		});
		return product;
	}
}

export default HistoryChangeProductModel;
