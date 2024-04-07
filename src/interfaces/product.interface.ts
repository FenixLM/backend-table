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
	//  propiedad para la imagen del producto
	imageFile?: any;
	// propiedades almacenar la fecha de registro y ultima actualización
	fechaRegistro?: Date;
	fechaActualizacion?: Date;
}

export interface historyChangeProductInterface {
	_id?: ObjectId;
	precio?: number;
	stock?: number;

	// propiedad para almacenar la fecha de la actualización
	fecha?: Date;

	// propiedad para almacenar el id del producto
	productId?: ObjectId;
}
