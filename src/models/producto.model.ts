import { Collection, Db, ObjectId } from "mongodb";
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
		const result = await this.productsCollection.insertOne(product);

		product._id = result.insertedId;
		return product;
	}

	async getProductById(productId: string): Promise<ProductInterface | null> {
		const product = await this.productsCollection.findOne({
			_id: new ObjectId(productId),
		});
		return product;
	}

	async updateProduct(
		productId: string,
		product: ProductInterface,
	): Promise<ProductInterface | null> {
		const updatedProduct = await this.productsCollection.findOneAndUpdate(
			{ _id: new ObjectId(productId) },
			{ $set: product },
			{ returnDocument: "after" },
		);

		return updatedProduct;
	}

	async deleteProduct(productId: string): Promise<boolean> {
		const result = await this.productsCollection.deleteOne({
			_id: new ObjectId(productId),
		});

		return result.deletedCount === 1;
	}
}

export default ProductModel;
