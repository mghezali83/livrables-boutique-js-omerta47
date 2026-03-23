-- SQL Migration Script
-- This script creates the database structure for the KANTIN e-commerce project.

-- Drop tables in reverse order of creation to handle foreign key constraints
DROP TABLE IF EXISTS `product_sizes`;
DROP TABLE IF EXISTS `product_colors`;
DROP TABLE IF EXISTS `images`;
DROP TABLE IF EXISTS `addons`;
DROP TABLE IF EXISTS `products`;
DROP TABLE IF EXISTS `categories`;
DROP TABLE IF EXISTS `colors`;
DROP TABLE IF EXISTS `sizes`;

-- Table for product categories (e.g., leagues, nations)
CREATE TABLE `categories` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `type` VARCHAR(100) COMMENT 'Type of category, e.g., ''League'', ''Nation'', ''Continent'''
) ENGINE=InnoDB;

-- Table for available colors
CREATE TABLE `colors` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `hex_code` VARCHAR(7) NOT NULL COMMENT 'Hexadecimal color code, e.g., #FFFFFF'
) ENGINE=InnoDB;

-- Table for available sizes
CREATE TABLE `sizes` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(50) NOT NULL UNIQUE -- e.g., 'S', 'M', 'L', 'XL'
) ENGINE=InnoDB;

-- Main table for products
CREATE TABLE `products` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `reference` VARCHAR(255) NOT NULL UNIQUE,
  `name` VARCHAR(255) NOT NULL,
  `description` TEXT NOT NULL,
  `price` DECIMAL(10, 2) NOT NULL,
  `discount_percentage` INT DEFAULT 0,
  `stock_quantity` INT NOT NULL,
  `gender` ENUM('Homme', 'Femme', 'Unisexe') NOT NULL,
  `category_id` INT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB;

-- Table for addons like flocking or patches
CREATE TABLE `addons` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `price` DECIMAL(10, 2) NOT NULL,
  `type` ENUM('flocking', 'patch') NOT NULL
) ENGINE=InnoDB;

-- Table for product images (2-3 per product)
CREATE TABLE `images` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `product_id` INT NOT NULL,
  `url` VARCHAR(255) NOT NULL COMMENT 'URL or path to the image',
  `sort_order` INT DEFAULT 0 COMMENT 'To determine the display order, 0 for main image',
  FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Junction table for products and colors (many-to-many)
CREATE TABLE `product_colors` (
  `product_id` INT NOT NULL,
  `color_id` INT NOT NULL,
  PRIMARY KEY (`product_id`, `color_id`),
  FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`color_id`) REFERENCES `colors`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Junction table for products and sizes (many-to-many)
CREATE TABLE `product_sizes` (
  `product_id` INT NOT NULL,
  `size_id` INT NOT NULL,
  PRIMARY KEY (`product_id`, `size_id`),
  FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`size_id`) REFERENCES `sizes`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Comments to explain the structure:
-- `categories`: Stores different product groups like 'Ligue 1' or 'Premier League'.
-- `colors`, `sizes`: Store the global list of available colors and sizes.
-- `products`: The core table holding all main product data.
-- `addons`: For extra customizations like player names or competition patches.
-- `images`: Links images to products. `sort_order` helps display the primary image first.
-- `product_colors`, `product_sizes`: These "junction" tables link products to their available colors and sizes, enabling a many-to-many relationship.
