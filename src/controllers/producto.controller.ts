import { Request, Response } from "express";
import ProductModel from "../models/producto.model";
import { Db } from "mongodb";
import ImageUploadService from "../services/ImageUpload.service";
import {
	ProductInterface,
	historyChangeProductInterface,
} from "../interfaces/product.interface";
import HistoryChangeProductModel from "../models/historyChangeProduct.model";

class ProductController {
	private imageUploadService: ImageUploadService;
	private productModel: ProductModel;
	private historyChangeProductModel: HistoryChangeProductModel;

	constructor(db: Db) {
		this.productModel = new ProductModel(db);
		this.historyChangeProductModel = new HistoryChangeProductModel(db);
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
			if (req.body.etiquetas) {
				req.body.etiquetas = req.body.etiquetas.split(",");
			}
			const fechaActual = new Date();

			const product: ProductInterface = req.body;
			product.fechaRegistro = fechaActual;
			product.fechaActualizacion = fechaActual;
			product.estado = 1;

			console.log("createProduct -> product", product);

			// Si hay una imagen en la solicitud, utiliza el servicio de subida de imágenes
			if (req.files && req.files.imageFile) {
				const imageUrl = await this.imageUploadService.uploadImage(
					req.files.imageFile,
				);
				product.imagen = imageUrl;
			}

			// Crea el producto en la base de datos
			const dataProductInsert = await this.productModel.createProduct(product);

			const registroData: historyChangeProductInterface = {
				productId: dataProductInsert._id,
				precio: dataProductInsert.precio,
				stock: dataProductInsert.stock,
				fecha: fechaActual,
			};

			await this.historyChangeProductModel.createHistoryChangeProduct(
				registroData,
			);

			// Responde con el producto creado
			res.status(201).json(dataProductInsert);
		} catch (error) {
			console.error("Error al crear un nuevo producto:", error);
			res.status(500).json({ message: "Error al crear un nuevo producto" });
		}
	}

	async updateProduct(req: Request, res: Response): Promise<void> {
		try {
			const fechaActual = new Date();
			const productId = req.params._id;

			if (req.body.etiquetas) {
				req.body.etiquetas = req.body.etiquetas.split(",");
			}

			const updatedProductData: ProductInterface = req.body;
			updatedProductData.fechaActualizacion = fechaActual;

			console.log("updateProduct -> updatedProductData", updatedProductData);
			console.log("updateProduct -> productId", productId);

			// Verifica si hay una imagen en la solicitud y actualiza la imagen si es necesario
			if (req.files && req.files.imageFile) {
				const imageUrl = await this.imageUploadService.uploadImage(
					req.files.imageFile,
				);
				updatedProductData.imagen = imageUrl;
			}

			const productBefore = await this.productModel.getProductById(productId);

			// Actualiza el producto en la base de datos
			const productUpdate = await this.productModel.updateProduct(
				productId,
				updatedProductData,
			);

			console.log("updateProduct -> productUpdate", productUpdate);

			if (
				productBefore &&
				productUpdate &&
				(productBefore.precio !== updatedProductData.precio ||
					productBefore.stock !== updatedProductData.stock)
			) {
				const registroData: historyChangeProductInterface = {
					productId: productUpdate._id,
					precio: productUpdate.precio,
					stock: productUpdate.stock,
					fecha: fechaActual,
				};
				await this.historyChangeProductModel.createHistoryChangeProduct(
					registroData,
				);
			}

			// Responde con el producto actualizado
			res.status(200).json(productUpdate);
		} catch (error) {
			console.error("Error al actualizar el producto:", error);
			res.status(500).json({ message: "Error al actualizar el producto" });
		}
	}

	async deleteProduct(req: Request, res: Response): Promise<void> {
		try {
			const productId = req.params._id;
			await this.productModel.deleteProduct(productId);
		} catch (error) {
			console.error("Error al eliminar el producto:", error);
			res.status(500).json({ message: "Error al eliminar el producto" });
		}
	}
}

export default ProductController;
