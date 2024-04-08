import swaggerJSDoc from "swagger-jsdoc";

const options: swaggerJSDoc.Options = {
	swaggerDefinition: {
		openapi: "3.0.0",
		info: {
			title: "Backend de Table",
			version: "1.0.0",
			description:
				"Desarrollo de API REST con Node.js y Express conectado con aws S3",
		},
		components: {
			schemas: {
				ProductInterface: {
					type: "object",
					properties: {
						_id: {
							type: "string",
							description: "ID del producto",
						},
						nombre: {
							type: "string",
							description: "Nombre del producto",
							value: "Felix",
						},
						descripcion: {
							type: "string",
							description: "Descripción del producto",
						},
						sku: {
							type: "string",
							description: "SKU del producto",
						},
						imagen: {
							type: "string",
							description: "URL de la imagen del producto",
						},
						etiquetas: {
							type: "array",
							items: {
								type: "string",
							},
							description: "Etiquetas del producto",
						},
						precio: {
							type: "number",
							description: "Precio del producto",
						},
						stock: {
							type: "number",
							description: "Stock del producto",
						},
						imageFile: {
							type: "string",
							format: "binary",
							description: "Archivo de imagen del producto",
						},
						fechaRegistro: {
							type: "string",
							format: "date-time",
							description: "Fecha de registro del producto",
						},
						fechaActualizacion: {
							type: "string",
							format: "date-time",
							description: "Fecha de última actualización del producto",
						},
						estado: {
							type: "number",
							description: "Estado del producto",
						},
					},
				},
				historyChangeProductInterface: {
					type: "object",
					properties: {
						_id: {
							type: "string",
							description: "ID del historial de cambio del producto",
						},
						precio: {
							type: "number",
							description: "Precio del producto",
						},
						stock: {
							type: "number",
							description: "Stock del producto",
						},
						fecha: {
							type: "string",
							format: "date-time",
							description: "Fecha de la actualización",
						},
						productId: {
							type: "string",
							description: "ID del producto",
						},
					},
				},
			},
		},
	},
	apis: ["./src/routes/*.ts"], // Ruta donde se encuentran tus archivos de ruta con JSDoc
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
