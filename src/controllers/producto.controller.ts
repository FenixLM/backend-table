import { Request, Response } from "express";
import ProductModel from "../models/producto.model";
import { Db } from "mongodb";
import ImageUploadService from "../services/ImageUpload.service";

class ProductController {
	private imageUploadService: ImageUploadService;
	private productModel: ProductModel;

	constructor(db: Db) {
		this.productModel = new ProductModel(db);
		this.imageUploadService = new ImageUploadService();
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

	// async createProduct(req: Request, res: Response): Promise<void> {
	// 	try {
	// 		const product = req.body;
	// 		await this.productModel.createProduct(product);
	// 		res.status(201).json(product);
	// 	} catch (error) {
	// 		console.error("Error al crear un nuevo producto:", error);
	// 		res.status(500).json({ message: "Error al crear un nuevo producto" });
	// 	}
	// }

	async createProduct(req: Request, res: Response): Promise<void> {
		try {
			const product = req.body;
			console.log("product", product);

			// Si hay una imagen en la solicitud, utiliza el servicio de subida de imágenes
			if (req.files && req.files.imageFile) {
				const imageUrl = await this.imageUploadService.uploadImage(
					req.files.imageFile,
				);
				product.image = imageUrl;
			}

			// Crea el producto en la base de datos
			await this.productModel.createProduct(product);

			// Responde con el producto creado
			res.status(201).json(product);
		} catch (error) {
			console.error("Error al crear un nuevo producto:", error);
			res.status(500).json({ message: "Error al crear un nuevo producto" });
		}
	}
}

export default ProductController;
