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
		/**
		 * @swagger
		 * /api/products:
		 *   get:
		 *     description: Obtener todos los productos
		 *     responses:
		 *       200:
		 *         description: Retorna todos los productos
		 */
		this.router.get(
			"/products",
			this.productController.getAllProducts.bind(this.productController),
		);

		/**
		 * @swagger
		 * /api/products:
		 *   post:
		 *     description: Crear un nuevo producto
		 *     requestBody:
		 *       required: true
		 *       content:
		 *         multipart/form-data:
		 *           schema:
		 *             type: object
		 *             properties:
		 *               nombre:
		 *                 type: string
		 *                 description: Nombre del producto
		 *                 default: Producto Nuevo
		 *               descripcion:
		 *                 type: string
		 *                 description: Descripción del producto
		 *                 default: Descripción del producto
		 *               sku:
		 *                 type: string
		 *                 description: SKU del producto
		 *                 default: SKU-123
		 *               imagen:
		 *                 type: string
		 *                 description: Imagen del producto (base64)
		 *                 default: Imagen del producto en base64
		 *               etiquetas:
		 *                 type: array
		 *                 items:
		 *                   type: string
		 *                 description: Etiquetas del producto
		 *                 default: [tag1, tag2]
		 *               precio:
		 *                 type: number
		 *                 description: Precio del producto
		 *                 default: 0.0
		 *               stock:
		 *                 type: number
		 *                 description: Stock del producto
		 *                 default: 0
		 *               imageFile:
		 *                 type: string
		 *                 format: binary
		 *                 description: Archivo de imagen del producto
		 *     responses:
		 *       201:
		 *         description: Producto creado exitosamente
		 */

		this.router.post(
			"/products",
			this.productController.createProduct.bind(this.productController),
		);

		/**
		 * @swagger
		 * /api/products/{_id}:
		 *   get:
		 *     description: Obtener un producto por su ID
		 *     parameters:
		 *       - in: path
		 *         name: _id
		 *         required: true
		 *         schema:
		 *           type: string
		 *         description: ID del producto a buscar
		 *     responses:
		 *       200:
		 *         description: Retorna el producto encontrado
		 */
		this.router.get(
			"/products/:_id",
			this.productController.getProductById.bind(this.productController),
		);

		/**
		 * @swagger
		 * /api/products/{_id}:
		 *   put:
		 *     description: Actualizar un producto existente por su ID
		 *     parameters:
		 *       - in: path
		 *         name: _id
		 *         required: true
		 *         schema:
		 *           type: string
		 *         description: ID del producto a actualizar
		 *     requestBody:
		 *       required: true
		 *       content:
		 *         multipart/form-data:
		 *           schema:
		 *             type: object
		 *             properties:
		 *               nombre:
		 *                 type: string
		 *                 description: Nuevo nombre del producto
		 *                 default: Nuevo Producto
		 *               descripcion:
		 *                 type: string
		 *                 description: Nueva descripción del producto
		 *                 default: Nueva Descripción
		 *               sku:
		 *                 type: string
		 *                 description: Nuevo SKU del producto
		 *                 default: Nuevo SKU
		 *               imagen:
		 *                 type: string
		 *                 description: Nueva imagen del producto (base64)
		 *                 default: Imagen del producto en base64
		 *               etiquetas:
		 *                 type: array
		 *                 items:
		 *                   type: string
		 *                 description: Nuevas etiquetas del producto
		 *                 default: [etiqueta1, etiqueta2]
		 *               precio:
		 *                 type: number
		 *                 description: Nuevo precio del producto
		 *                 default: 0
		 *               stock:
		 *                 type: number
		 *                 description: Nuevo stock del producto
		 *                 default: 0
		 *               imageFile:
		 *                 type: string
		 *                 format: binary
		 *                 description: Nuevo archivo de imagen del producto
		 *     responses:
		 *       200:
		 *         description: Producto actualizado exitosamente
		 */

		this.router.put(
			"/products/:_id",
			this.productController.updateProduct.bind(this.productController),
		);

		/**
		 * @swagger
		 * /api/products/{_id}:
		 *   delete:
		 *     description: Eliminar un producto por su ID (cambia de estado a 0)
		 *     parameters:
		 *       - in: path
		 *         name: _id
		 *         required: true
		 *         schema:
		 *           type: string
		 *         description: ID del producto a eliminar
		 *     responses:
		 *       204:
		 *         description: Producto eliminado exitosamente
		 */
		this.router.delete(
			"/products/:_id",
			this.productController.deleteProduct.bind(this.productController),
		);
	}
}

export default ProductRoutes;
