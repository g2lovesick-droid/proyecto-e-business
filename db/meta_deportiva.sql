-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema meta_deportiva
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `meta_deportiva` ;

-- -----------------------------------------------------
-- Schema meta_deportiva
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `meta_deportiva` DEFAULT CHARACTER SET utf8 ;
USE `meta_deportiva` ;

-- -----------------------------------------------------
-- Table `meta_deportiva`.`categorias`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `meta_deportiva`.`categorias` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) NOT NULL,
  `descripcion` VARCHAR(255) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `meta_deportiva`.`usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `meta_deportiva`.`usuarios` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre_completo` VARCHAR(150) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `rol` ENUM('cliente', 'admin') DEFAULT 'cliente',
  `fecha_registro` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `meta_deportiva`.`direcciones`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `meta_deportiva`.`direcciones` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `usuario_id` INT NOT NULL,
  `calle` VARCHAR(150) NOT NULL,
  `ciudad` VARCHAR(100) NOT NULL,
  `codigo_postal` VARCHAR(10) NOT NULL,
  `telefono` VARCHAR(20) NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_direcciones_usuarios_idx` (`usuario_id` ASC) VISIBLE,
  CONSTRAINT `fk_direcciones_usuarios`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `meta_deportiva`.`usuarios` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `meta_deportiva`.`productos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `meta_deportiva`.`productos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(150) NOT NULL,
  `descripcion` TEXT NULL,
  `precio` DECIMAL(10,2) NOT NULL,
  `stock` INT NULL DEFAULT 0,
  `imagen` VARCHAR(255) NULL,
  `categoria_id` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_productos_categorias_idx` (`categoria_id` ASC) VISIBLE,
  CONSTRAINT `fk_productos_categorias`
    FOREIGN KEY (`categoria_id`)
    REFERENCES `meta_deportiva`.`categorias` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `meta_deportiva`.`ordenes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `meta_deportiva`.`ordenes` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `usuario_id` INT NOT NULL,
  `fecha` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `total` DECIMAL(10,2) NOT NULL,
  `estado` ENUM('pendiente', 'enviado', 'entregado') NULL DEFAULT 'pendiente',
  PRIMARY KEY (`id`),
  INDEX `fk_ordenes_usuarios_idx` (`usuario_id` ASC) VISIBLE,
  CONSTRAINT `fk_ordenes_usuarios`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `meta_deportiva`.`usuarios` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `meta_deportiva`.`detalles_orden`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `meta_deportiva`.`detalles_orden` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `orden_id` INT NOT NULL,
  `producto_id` INT NOT NULL,
  `cantidad` INT NOT NULL,
  `precio_unitario` DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_detalles_ordenes_idx` (`orden_id` ASC) VISIBLE,
  INDEX `fk_detalles_productos_idx` (`producto_id` ASC) VISIBLE,
  CONSTRAINT `fk_detalles_ordenes`
    FOREIGN KEY (`orden_id`)
    REFERENCES `meta_deportiva`.`ordenes` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_detalles_productos`
    FOREIGN KEY (`producto_id`)
    REFERENCES `meta_deportiva`.`productos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data Population (Datos de prueba - Meta Deportiva)
-- -----------------------------------------------------

-- Categorías Reales
INSERT INTO categorias (nombre, descripcion) VALUES 
('Fútbol', 'Balones, tachones y espinilleras'),
('Basquetbol', 'Balones, canastas y accesorios'),
('Voleibol', 'Redes, balones y rodilleras'),
('Ropa Deportiva', 'Jerseys, shorts y pants'),
('Calzado', 'Tenis para correr y entrenamiento');

-- Usuarios de Prueba (Nota: Las contraseñas se actualizarán al implementar encriptación)
INSERT INTO usuarios (nombre_completo, email, password, rol) VALUES 
('Admin General', 'admin@metadeportiva.com', 'admin123', 'admin'),
('Cliente Feliz', 'cliente@gmail.com', '12345', 'cliente');

-- Productos Reales
INSERT INTO productos (nombre, precio, stock, categoria_id) VALUES 
-- Fútbol (ID 1)
('Balón Adidas Champions', 850.00, 20, 1),
('Espinilleras Nike', 350.00, 15, 1),
-- Basquetbol (ID 2)
('Balón Wilson NBA', 900.00, 10, 2),
-- Voleibol (ID 3)
('Balón Molten V5', 750.00, 25, 3),
('Rodilleras Asics', 400.00, 30, 3),
-- Ropa (ID 4)
('Jersey Selección Mexicana', 1200.00, 50, 4),
('Short Deportivo DryFit', 250.00, 40, 4),
-- Calzado (ID 5)
('Tenis Running Puma', 1800.00, 12, 5);

-- -----------------------------------------------------
-- REQUISITO: Crear usuario con nombre del proyecto
-- -----------------------------------------------------
DROP USER IF EXISTS 'meta_user'@'localhost';
CREATE USER 'meta_user'@'localhost' IDENTIFIED BY 'lausus24';
GRANT ALL PRIVILEGES ON meta_deportiva.* TO 'meta_user'@'localhost';
FLUSH PRIVILEGES;