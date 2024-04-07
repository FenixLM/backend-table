import { Request, Response } from "express";
import ProductModel from "../models/producto.model";
import { Db } from "mongodb";

class ProductController {
	private productModel: ProductModel;

	constructor(db: Db) {
		this.productModel = new ProductModel(db);
	}

	async getAllProducts(req: Request, res: Response): Promise<void> {
		try {
			const products = await this.productModel.getAllProducts();
			res.status(200).json(products);
		} catch (error) {
			console.error("Error al obtener todos los productos:", error);
			res.status(500).json({ message: "Error al obtener todos los productos" });
		}
	}

	async createProduct(req: Request, res: Response): Promise<void> {
		try {
			const product = req.body;
			await this.productModel.createProduct(product);
			res.status(201).json(product);
		} catch (error) {
			console.error("Error al crear un nuevo producto:", error);
			res.status(500).json({ message: "Error al crear un nuevo producto" });
		}
	}
}

export default ProductController;
