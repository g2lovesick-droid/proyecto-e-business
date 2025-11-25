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

## Git:
https://github.com/g2lovesick-droid/proyecto-e-business