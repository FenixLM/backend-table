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

	async getProductById(req: Request, res: Response): Promise<void> {
		try {
			const productId = req.params.id;
			const product = await this.productModel.getProductById(productId);

			if (!product) {
				res.status(404).json({ message: "Producto no encontrado" });
				return;
			}

			res.status(200).json(product);
		} catch (error) {
			console.error("Error al obtener el producto:", error);
			res.status(500).json({ message: "Error al obtener el producto" });
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

	async updateProduct(req: Request, res: Response): Promise<void> {
		try {
			const productId = req.params.productId;
			const updatedProductData = req.body;

			// Verifica si hay una imagen en la solicitud y actualiza la imagen si es necesario
			if (req.files && req.files.imageFile) {
				const imageUrl = await this.imageUploadService.uploadImage(
					req.files.imageFile,
				);
				updatedProductData.image = imageUrl;
			}

			// Actualiza el producto en la base de datos
			await this.productModel.updateProduct(productId, updatedProductData);

			// Responde con el producto actualizado
			res.status(200).json(updatedProductData);
		} catch (error) {
			console.error("Error al actualizar el producto:", error);
			res.status(500).json({ message: "Error al actualizar el producto" });
		}
	}

	async deleteProduct(req: Request, res: Response): Promise<void> {
		try {
			const productId = req.params.id;
			const result = await this.productModel.deleteProduct(productId);

			if (!result) {
				res.status(404).json({ message: "Producto no encontrado" });
				return;
			}

			res.status(200).json({ message: "Producto eliminado correctamente" });
		} catch (error) {
			console.error("Error al eliminar el producto:", error);
			res.status(500).json({ message: "Error al eliminar el producto" });
		}
	}
}

export default ProductController;
