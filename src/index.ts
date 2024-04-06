import express from "express";
import { Request, Response } from "express";
import cors from "cors";
import * as dotenv from "dotenv";

dotenv.config();

const corsOptions = {
	origin: "*", // Solo permitir solicitudes desde este dominio
	optionsSuccessStatus: 200, // Algunos navegadores pueden interpretar mal las respuestas 204
};

const app = express();
const port = 3000;

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
});

app.get("/", (req: Request, res: Response) => {
	res.send("Hello World!");
});
