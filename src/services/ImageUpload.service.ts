import AWS from "aws-sdk";
import fs from "fs";
import path from "path";

class ImageUploadService {
	async uploadImage(imageFile: any): Promise<string> {
		const s3 = new AWS.S3();
		const bucketName = process.env.AWS_BUCKET_NAME as string;
		const uploadPath = path.join(__dirname, "..", "uploads", imageFile.name);

		// Mueve la imagen al directorio temporal
		await new Promise<void>((resolve, reject) => {
			imageFile.mv(uploadPath, (err: any) => {
				if (err) {
					reject(err);
				} else {
					resolve();
				}
			});
		});

		// Sube la imagen a S3
		const remotePath = `images/${imageFile.name}`;
		const fileContent = fs.readFileSync(uploadPath);

		const params: AWS.S3.Types.PutObjectRequest = {
			Bucket: bucketName,
			Key: remotePath,
			Body: fileContent,
		};

		const data = await s3.upload(params).promise();

		// Elimina el archivo local después de subirlo a S3
		fs.unlinkSync(uploadPath);

		return data.Location;
	}
}

export default ImageUploadService;
