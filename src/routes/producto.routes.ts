// src/routes/todoRoutes.ts
import express from "express";
import ProductController from "../controllers/producto.controller";
import { Db } from "mongodb";

class ProductRoutes {
	public router: express.Router;
	private productController: ProductController;

	constructor(db: Db) {
		this.router = express.Router();
		this.productController = new ProductController(db);
		this.routes();
	}

	private routes() {
		this.router.get(
			"/products",
			this.productController.getAllProducts.bind(this.productController),
		);
		this.router.post(
			"/products",
			this.productController.createProduct.bind(this.productController),
		);
	}
}

export default ProductRoutes;
