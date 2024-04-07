import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import MongoDBDatabase from "./db/mongodb";
import ProductRoutes from "./routes/producto.routes";

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

const PORT = process.env.PORT || 3000;

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

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
