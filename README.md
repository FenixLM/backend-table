# CRUD TABLE

Proyecto que lista productos, con diferentes opciones como vista de descripción, edicion del producto y eliminacion logica

## Tabla de Contenidos

1. [Instalación](#instalación)
2. [Configuración](#configuración)
3. [Uso](#uso)
4. [Documentación de la API](#documentación-de-la-api)

## Instalación

Para instalar las dependencias del proyecto, ejecuta el siguiente comando:

    npm install

## Configuración

Antes de ejecutar la aplicación, asegúrate de configurar las variables de entorno necesarias. Puedes hacerlo creando un archivo `.env` en el directorio raíz del proyecto y configurando las variables según sea necesario. Aquí tienes un ejemplo de las variables de entorno que puedes necesitar:

    MONGO_USER=user-name
    MONGO_PASSWORD=user-password
    AWS_ACCESS_KEY_ID=TU_ACCESS_KEY_ID
    AWS_SECRET_ACCESS_KEY=TU_SECRET_ACCESS_KEY
    AWS_REGION=TU_REGION
    AWS_BUCKET_NAME=NOMBRE_BUCKET

puedes encontrar un archivo de ejemplo llamado env.dev, crear el archivo `.env` a la misma altura del archivo `.env.dev`

## IMPORTANTE

Para poder enviar y leer las imágenes almacenadas en Amazon S3, necesitarás una cuenta de Amazon AWS y obtener las credenciales de acceso (Access Key ID y Secret Access Key). Estas credenciales deben configurarse como variables de entorno en el archivo `.env`.

## Uso

Una vez que hayas instalado las dependencias y configurado las variables de entorno, puedes ejecutar la aplicación con el siguiente comando:

    npm run dev

Esto iniciará el servidor y la aplicación estará disponible en `http://localhost:3000`.

## Documentación de la API

La documentación de la API está disponible en Swagger. Puedes acceder a ella en [http://localhost:3000/api-docs](http://localhost:3000/api-docs).
