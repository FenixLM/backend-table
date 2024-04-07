import { Request, Response } from "express";
import * as fs from "fs";
import * as AWS from "aws-sdk";
import * as path from "path";

class ImageController {
	async uploadImage(req: Request, res: Response): Promise<void> {
		try {
			if (!req.files || Object.keys(req.files).length === 0) {
				res.status(400).send("No se ha enviado ninguna imagen.");
				return;
			}

			const s3 = new AWS.S3();
			const bucketName = process.env.AWS_BUCKET_NAME as string;
			const image: any = req.files.image;
			const uploadPath = path.join(__dirname, "..", "uploads", image.name);

			image.mv(uploadPath, async (err: any) => {
				if (err) {
					return res.status(500).send(err);
				}

				const remotePath = `images/${image.name}`;
				const fileContent = fs.readFileSync(uploadPath);

				const params: AWS.S3.Types.PutObjectRequest = {
					Bucket: bucketName,
					Key: remotePath,
					Body: fileContent,
				};

				const data = await s3.upload(params).promise();

				res.json({ success: true, imageUrl: data.Location });

				// Elimina el archivo local después de subirlo a S3
				fs.unlinkSync(uploadPath);
			});
		} catch (error) {
			console.error("Error al subir la imagen:", error);
			res.status(500).json({
				success: false,
				message: "Error al subir la imagen",
			});
		}
	}
}

export default ImageController;
