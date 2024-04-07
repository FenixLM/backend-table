import { ObjectId } from "mongodb";

export interface ProductInterface {
	_id?: ObjectId;
	nombre?: string;
	descripcion?: string;
	sku?: string;
	imagen?: string;
	etiquetas?: string[];
	precio?: number;
	stock?: number;
}
