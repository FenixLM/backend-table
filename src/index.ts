import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import * as AWS from "aws-sdk";

import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger/swagger";

import MongoDBDatabase from "./db/mongodb";
import ProductRoutes from "./routes/producto.routes";
import ImageRoutes from "./routes/image.routes";
import fileUpload from "express-fileupload";

dotenv.config();

const corsOptions = {
	origin: "*", // Solo permitir solicitudes desde este dominio
	optionsSuccessStatus: 200, // Algunos navegadores pueden interpretar mal las respuestas 204
};

const app = express();
// const port = 3000;

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(fileUpload());

const PORT = process.env.PORT || 3000;

AWS.config.update({
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	region: process.env.AWS_REGION,
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const db = new MongoDBDatabase();

db.connect()
	.then(() => {
		// RUTAS CON MONOGDB
		app.use("/api", new ProductRoutes(db.getDb()).router);
	})
	.catch((err) => {
		console.error("Error connecting to MongoDB:", err);
		process.exit(1); // Salir del proceso con un error
	});

app.use("/api", new ImageRoutes().router);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
