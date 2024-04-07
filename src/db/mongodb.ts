import { MongoClient, Db } from "mongodb";

class MongoDBDatabase {
	private client: MongoClient | null;
	private db: Db | null;

	private mongoUser = process.env.MONGO_USER;
	private mongoPassword = process.env.MONGO_PASSWORD;

	constructor() {
		const uri = `mongodb+srv://${this.mongoUser}:${this.mongoPassword}@apiresttest.hdeslhu.mongodb.net/?retryWrites=true&w=majority&appName=ApiRestTest`;

		this.client = new MongoClient(uri);
		this.db = null;
	}

	async connect(): Promise<void> {
		try {
			if (!this.client) {
				throw new Error("MongoDB client not initialized");
			}
			await this.client.connect();
			console.log("MongoDB connected");
			this.db = this.client.db("sample_mflix");
		} catch (error) {
			console.error("MongoDB connection error", error);
			throw error;
		}
	}

	getDb(): Db {
		if (!this.db) {
			throw new Error("MongoDB not connected");
		}
		return this.db;
	}
}

export default MongoDBDatabase;

// const uri =
// 	"mongodb+srv://felixlamadrid97:5lu7dYSm4X2QsiBS@apiresttest.hdeslhu.mongodb.net/?retryWrites=true&w=majority&appName=ApiRestTest";
// const client = new MongoClient(uri);

// let database: Db;

// const connectDB = async (): Promise<void> => {
// 	try {
// 		await client.connect();
// 		console.log("MongoDB connected");
// 		database = client.db("sample_mflix");
// 	} catch (error) {
// 		console.error("MongoDB connection error", error);
// 		process.exit(1); // Exit process with failure
// 	}
// };

// const getDatabase = (): Db => {
// 	if (!database) {
// 		throw new Error("MongoDB not connected");
// 	}
// 	return database;
// };

// export { connectDB, getDatabase };
