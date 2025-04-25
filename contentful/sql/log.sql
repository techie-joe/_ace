CREATE TABLE IF NOT EXISTS `log` (
  `id` INT NOT NULL,
  `slug` VARCHAR(255) NULL,
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT NULL,
  `category` VARCHAR(255) NULL,
  `tags` JSON NULL,
  `status` ENUM('pending', 'canceled', 'completed', 'failed') NOT NULL,
  `isUpdating` TINYINT NOT NULL DEFAULT 0,
  `isDeleted` TINYINT NOT NULL DEFAULT 0,
  `createdBy` INT NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedBy` INT NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  `additionalNote` TEXT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `slug_UNIQUE` (`slug` ASC) VISIBLE,
  CONSTRAINT `fk_log_user_created`
    FOREIGN KEY (`createdBy`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_log_user_updated`
    FOREIGN KEY (`updatedBy`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);