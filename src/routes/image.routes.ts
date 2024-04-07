// src/routes/todoRoutes.ts
import express from "express";
import ImageController from "../controllers/image.controller";

class ImageRoutes {
	public router: express.Router;
	private imageController: ImageController;

	constructor() {
		this.router = express.Router();
		this.imageController = new ImageController();
		this.routes();
	}

	private routes() {
		this.router.post(
			"/upload-image",
			this.imageController.uploadImage.bind(this.imageController),
		);
	}
}

export default ImageRoutes;
