# Proyecto E-Business

## 1. Base de Datos

Requisitos: Tener instalado **MySQL Server** (Versión 8.0 o superior). No es necesario XAMPP.

1.  Abrir la terminal de MySQL o MySQL Workbench.
2.  Ejecutar el script SQL que se encuentra en la carpeta `/db` (actualizar con el nuevo script generado).
3.  Esto creará automáticamente la base de datos `db/meta_deportiva.sql`, las tablas y el usuario `Yahir` necesario para la conexión.

## 2. Instalación

Abrir una terminal en la carpeta del proyecto y ejecutar el siguiente comando para descargar las dependencias (incluyendo mysql2):

```bash
npm install

##Ejecutar proyecto
node src/index.js

## Notas sobre la Autenticación (Práctica 10)

El proyecto cuenta con sistema de Login y Registro con encriptación (Bcrypt).

**Importante:** Los usuarios pre-cargados en la base de datos (Admin General / Cliente Feliz) tienen contraseñas de prueba sin encriptar.
Para probar la funcionalidad de Login y ver la encriptación en la base de datos, por favor **registre un usuario nuevo** desde la interfaz web.

## Git:
https://github.com/g2lovesick-droid/proyecto-e-business