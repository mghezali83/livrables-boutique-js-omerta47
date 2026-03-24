CREATE DATABASE IF NOT EXISTS boutique_js;
USE boutique_js;

DROP TABLE IF EXISTS favorite_items;
DROP TABLE IF EXISTS shipping_addresses;
DROP TABLE IF EXISTS product_patch_options;
DROP TABLE IF EXISTS patches;
DROP TABLE IF EXISTS official_players;
DROP TABLE IF EXISTS product_variants;
DROP TABLE IF EXISTS product_images;
DROP TABLE IF EXISTS product_colorways;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS competitions;
DROP TABLE IF EXISTS countries;
DROP TABLE IF EXISTS continents;
DROP TABLE IF EXISTS flocking_options;

CREATE TABLE continents (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE countries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    continent_id INT NOT NULL,
    name VARCHAR(120) NOT NULL UNIQUE,
    FOREIGN KEY (continent_id) REFERENCES continents(id)
);

CREATE TABLE competitions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    country_id INT NOT NULL,
    name VARCHAR(120) NOT NULL,
    competition_type ENUM('club', 'national') NOT NULL DEFAULT 'club',
    FOREIGN KEY (country_id) REFERENCES countries(id)
);

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    reference VARCHAR(60) NOT NULL UNIQUE,
    name VARCHAR(180) NOT NULL,
    club_name VARCHAR(160) NOT NULL,
    description TEXT NOT NULL,
    gender ENUM('Homme', 'Femme', 'Mixte') NOT NULL DEFAULT 'Mixte',
    product_type VARCHAR(80) NOT NULL,
    season_label VARCHAR(40) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    discount_percentage INT NOT NULL DEFAULT 0,
    currency VARCHAR(5) NOT NULL DEFAULT 'EUR',
    style_tag VARCHAR(80),
    competition_id INT NOT NULL,
    FOREIGN KEY (competition_id) REFERENCES competitions(id)
);

CREATE TABLE product_colorways (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    slug VARCHAR(80) NOT NULL,
    name VARCHAR(120) NOT NULL,
    primary_color VARCHAR(20) NOT NULL,
    secondary_color VARCHAR(20) NOT NULL,
    accent_color VARCHAR(20) NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

CREATE TABLE product_images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    colorway_id INT NOT NULL,
    alt_text VARCHAR(255) NOT NULL,
    image_url TEXT NOT NULL,
    display_order INT NOT NULL DEFAULT 0,
    FOREIGN KEY (colorway_id) REFERENCES product_colorways(id) ON DELETE CASCADE
);

CREATE TABLE product_variants (
    id INT AUTO_INCREMENT PRIMARY KEY,
    colorway_id INT NOT NULL,
    size_label VARCHAR(10) NOT NULL,
    stock_quantity INT NOT NULL DEFAULT 0,
    FOREIGN KEY (colorway_id) REFERENCES product_colorways(id) ON DELETE CASCADE
);

CREATE TABLE official_players (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    player_name VARCHAR(120) NOT NULL,
    shirt_number INT NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

CREATE TABLE patches (
    id INT AUTO_INCREMENT PRIMARY KEY,
    patch_code VARCHAR(40) NOT NULL UNIQUE,
    name VARCHAR(120) NOT NULL,
    price DECIMAL(10, 2) NOT NULL DEFAULT 2.50
);

CREATE TABLE product_patch_options (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    patch_id INT NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    FOREIGN KEY (patch_id) REFERENCES patches(id)
);

CREATE TABLE flocking_options (
    id INT AUTO_INCREMENT PRIMARY KEY,
    option_code VARCHAR(40) NOT NULL UNIQUE,
    name VARCHAR(120) NOT NULL,
    extra_price DECIMAL(10, 2) NOT NULL DEFAULT 0.00
);

CREATE TABLE shipping_addresses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(160) NOT NULL,
    street VARCHAR(255) NOT NULL,
    postal_code VARCHAR(20) NOT NULL,
    city VARCHAR(120) NOT NULL,
    country VARCHAR(120) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE favorite_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    address_id INT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (address_id) REFERENCES shipping_addresses(id) ON DELETE SET NULL
);
