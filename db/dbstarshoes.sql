-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema dbs7b25
-- -----------------------------------------------------
-- Este es el nombre de la base de datos que te pidió el profesor.

-- -----------------------------------------------------
-- Schema dbs7b25
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `dbs7b25` DEFAULT CHARACTER SET utf8 ;
USE `dbs7b25` ;

-- -----------------------------------------------------
-- Table `dbs7b25`.`categorias`
-- -----------------------------------------------------
-- Esta es la tabla que creaste en el diseño .mwb
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dbs7b25`.`categorias` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- REQUISITO TAREA: Creación del usuario de la app
-- -----------------------------------------------------
-- Esto crea el usuario "dbs7b25_user" que te pide la tarea.
-- -----------------------------------------------------
CREATE USER 'Yahir'@'localhost' IDENTIFIED BY 'lausus24';
GRANT ALL PRIVILEGES ON dbs7b25.* TO 'dbs7b25_user'@'localhost';
FLUSH PRIVILEGES;