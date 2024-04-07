import { Collection, Db } from "mongodb";
import { ProductInterface } from "../interfaces/product.interface";

class ProductModel {
	private productsCollection!: Collection<ProductInterface>;

	constructor(db: Db) {
		this.productsCollection = db.collection("products");
	}

	async getAllProducts(): Promise<ProductInterface[]> {
		const products = await this.productsCollection.find().toArray();
		return products;
	}

	async createProduct(product: ProductInterface): Promise<ProductInterface> {
		await this.productsCollection.insertOne(product);
		return product;
	}
}

export default ProductModel;
