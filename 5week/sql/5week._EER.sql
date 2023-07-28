-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema YTDB2
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema YTDB2
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `YTDB2` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `YTDB2` ;

-- -----------------------------------------------------
-- Table `YTDB2`.`user_info`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `YTDB2`.`user_info` (
  `id` INT NULL,
  `name` VARCHAR(50) NULL DEFAULT NULL,
  `email` VARCHAR(50) NULL DEFAULT NULL,
  `gender` VARCHAR(50) NULL DEFAULT NULL,
  `age` INT NULL DEFAULT NULL)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `YTDB2`.`bil_info`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `YTDB2`.`bil_info` (
  `bid` INT NOT NULL AUTO_INCREMENT,
  `bil_name` VARCHAR(25) NOT NULL,
  PRIMARY KEY (`bid`),
  UNIQUE INDEX `bid_UNIQUE` (`bid` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `YTDB2`.`subject_info`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `YTDB2`.`subject_info` (
  `sid` INT NOT NULL AUTO_INCREMENT,
  `subject_name` VARCHAR(30) NOT NULL,
  `phonenumber` VARCHAR(15) NOT NULL,
  PRIMARY KEY (`sid`),
  UNIQUE INDEX `sid_UNIQUE` (`sid` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `YTDB2`.`class_info`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `YTDB2`.`class_info` (
  `cid` INT NOT NULL,
  `class_name` VARCHAR(45) NOT NULL,
  `class_subinfo` MEDIUMTEXT NOT NULL,
  PRIMARY KEY (`cid`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `YTDB2`.`subprofessor_info`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `YTDB2`.`subprofessor_info` (
  `spid` INT NOT NULL AUTO_INCREMENT,
  `subprofessor_name` VARCHAR(45) NOT NULL,
  `phonenumber` VARCHAR(15) NOT NULL,
  `bil_info_bid` INT NULL,
  `subject_info_sid` INT NOT NULL,
  `class_info_cid` INT NULL,
  PRIMARY KEY (`spid`),
  UNIQUE INDEX `spid_UNIQUE` (`spid` ASC) VISIBLE,
  INDEX `fk_subprofessor_info_bil_info1_idx` (`bil_info_bid` ASC) VISIBLE,
  INDEX `fk_subprofessor_info_subject_info1_idx` (`subject_info_sid` ASC) VISIBLE,
  INDEX `fk_subprofessor_info_class_info1_idx` (`class_info_cid` ASC) VISIBLE,
  CONSTRAINT `fk_subprofessor_info_bil_info1`
    FOREIGN KEY (`bil_info_bid`)
    REFERENCES `YTDB2`.`bil_info` (`bid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_subprofessor_info_subject_info1`
    FOREIGN KEY (`subject_info_sid`)
    REFERENCES `YTDB2`.`subject_info` (`sid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_subprofessor_info_class_info1`
    FOREIGN KEY (`class_info_cid`)
    REFERENCES `YTDB2`.`class_info` (`cid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `YTDB2`.`professor_info`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `YTDB2`.`professor_info` (
  `pid` INT NOT NULL,
  `professor_name` VARCHAR(30) NOT NULL,
  `phonenumber` VARCHAR(15) NOT NULL,
  `subprofessor_info_spid` INT NOT NULL,
  `subject_info_sid` INT NOT NULL,
  `bil_info_bid` INT NOT NULL,
  `class_info_cid` INT NOT NULL,
  PRIMARY KEY (`pid`),
  INDEX `fk_professor_info_subprofessor_info_idx` (`subprofessor_info_spid` ASC) VISIBLE,
  INDEX `fk_professor_info_subject_info1_idx` (`subject_info_sid` ASC) VISIBLE,
  INDEX `fk_professor_info_bil_info1_idx` (`bil_info_bid` ASC) VISIBLE,
  INDEX `fk_professor_info_class_info1_idx` (`class_info_cid` ASC) VISIBLE,
  CONSTRAINT `fk_professor_info_subprofessor_info`
    FOREIGN KEY (`subprofessor_info_spid`)
    REFERENCES `YTDB2`.`subprofessor_info` (`spid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_professor_info_subject_info1`
    FOREIGN KEY (`subject_info_sid`)
    REFERENCES `YTDB2`.`subject_info` (`sid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_professor_info_bil_info1`
    FOREIGN KEY (`bil_info_bid`)
    REFERENCES `YTDB2`.`bil_info` (`bid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_professor_info_class_info1`
    FOREIGN KEY (`class_info_cid`)
    REFERENCES `YTDB2`.`class_info` (`cid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `YTDB2`.`student_info`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `YTDB2`.`student_info` (
  `sid` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(30) NOT NULL,
  `email` VARCHAR(128) NOT NULL,
  `age` INT NOT NULL,
  `phonenumber` VARCHAR(15) NOT NULL,
  `professor_info_pid` INT NOT NULL,
  `subject_info_sid` INT NOT NULL,
  PRIMARY KEY (`sid`),
  UNIQUE INDEX `uid_UNIQUE` (`sid` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  INDEX `fk_student_info_professor_info1_idx` (`professor_info_pid` ASC) VISIBLE,
  INDEX `fk_student_info_subject_info1_idx` (`subject_info_sid` ASC) VISIBLE,
  CONSTRAINT `fk_student_info_professor_info1`
    FOREIGN KEY (`professor_info_pid`)
    REFERENCES `YTDB2`.`professor_info` (`pid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_student_info_subject_info1`
    FOREIGN KEY (`subject_info_sid`)
    REFERENCES `YTDB2`.`subject_info` (`sid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `YTDB2`.`student_info_has_class_info`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `YTDB2`.`student_info_has_class_info` (
  `student_info_sid` INT NOT NULL,
  `class_info_cid` INT NOT NULL,
  PRIMARY KEY (`student_info_sid`, `class_info_cid`),
  INDEX `fk_student_info_has_class_info_class_info1_idx` (`class_info_cid` ASC) VISIBLE,
  INDEX `fk_student_info_has_class_info_student_info1_idx` (`student_info_sid` ASC) VISIBLE,
  CONSTRAINT `fk_student_info_has_class_info_student_info1`
    FOREIGN KEY (`student_info_sid`)
    REFERENCES `YTDB2`.`student_info` (`sid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_student_info_has_class_info_class_info1`
    FOREIGN KEY (`class_info_cid`)
    REFERENCES `YTDB2`.`class_info` (`cid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
