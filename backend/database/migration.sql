CREATE DATABASE IF NOT EXISTS boutique;
USE boutique;

-- ========================
-- CONTINENTS
-- ========================
CREATE TABLE continents (
                            id INT AUTO_INCREMENT PRIMARY KEY,
                            name VARCHAR(100) NOT NULL UNIQUE
);

-- ========================
-- COUNTRIES
-- ========================
CREATE TABLE countries (
                           id INT AUTO_INCREMENT PRIMARY KEY,
                           name VARCHAR(100) NOT NULL,
                           continent_id INT NOT NULL,
                           FOREIGN KEY (continent_id) REFERENCES continents(id) ON DELETE CASCADE
);

-- ========================
-- COMPETITIONS
-- ========================
CREATE TABLE competitions (
                              id INT AUTO_INCREMENT PRIMARY KEY,
                              name VARCHAR(150) NOT NULL,
                              country_id INT NULL,
                              type ENUM('league','international') NOT NULL,
                              FOREIGN KEY (country_id) REFERENCES countries(id) ON DELETE SET NULL
);

-- ========================
-- TEAMS
-- ========================
CREATE TABLE teams (
                       id INT AUTO_INCREMENT PRIMARY KEY,
                       name VARCHAR(150) NOT NULL,
                       competition_id INT NOT NULL,
                       FOREIGN KEY (competition_id) REFERENCES competitions(id) ON DELETE CASCADE
);

-- ========================
-- BRANDS
-- ========================
CREATE TABLE brands (
                        id INT AUTO_INCREMENT PRIMARY KEY,
                        name VARCHAR(100) NOT NULL UNIQUE
);

-- ========================
-- PRODUCTS (1 produit = 1 maillot précis)
-- ========================
CREATE TABLE products (
                          id INT AUTO_INCREMENT PRIMARY KEY,
                          reference VARCHAR(100) NOT NULL UNIQUE,
                          name VARCHAR(255) NOT NULL,
                          description TEXT NOT NULL,
                          price DECIMAL(10,2) NOT NULL,
                          discount_percent INT DEFAULT 0,
                          currency VARCHAR(10) DEFAULT 'EUR',
                          season VARCHAR(20) NOT NULL,
                          jersey_type ENUM('home','away','third') NOT NULL,
                          team_id INT NOT NULL,
                          brand_id INT NOT NULL,
                          flocking_price DECIMAL(10,2) DEFAULT 5.00,
                          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                          FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE,
                          FOREIGN KEY (brand_id) REFERENCES brands(id)
);

-- ========================
-- PRODUCT IMAGES
-- ========================
CREATE TABLE product_images (
                                id INT AUTO_INCREMENT PRIMARY KEY,
                                product_id INT NOT NULL,
                                image_url VARCHAR(500) NOT NULL,
                                position INT DEFAULT 1,
                                FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- ========================
-- COLORS
-- ========================
CREATE TABLE colors (
                        id INT AUTO_INCREMENT PRIMARY KEY,
                        name VARCHAR(100) NOT NULL,
                        hex_code VARCHAR(7)
);

-- ========================
-- SIZES
-- ========================
CREATE TABLE sizes (
                       id INT AUTO_INCREMENT PRIMARY KEY,
                       label VARCHAR(50) NOT NULL
);

-- ========================
-- PRODUCT VARIANTS (stock par taille/couleur)
-- ========================
CREATE TABLE product_variants (
                                  id INT AUTO_INCREMENT PRIMARY KEY,
                                  product_id INT NOT NULL,
                                  color_id INT NOT NULL,
                                  size_id INT NOT NULL,
                                  stock_quantity INT NOT NULL DEFAULT 0,
                                  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
                                  FOREIGN KEY (color_id) REFERENCES colors(id),
                                  FOREIGN KEY (size_id) REFERENCES sizes(id),
                                  UNIQUE(product_id, color_id, size_id)
);

-- ========================
-- PLAYER PRINTS (flocage officiel)
-- ========================
CREATE TABLE player_prints (
                               id INT AUTO_INCREMENT PRIMARY KEY,
                               team_id INT NOT NULL,
                               player_name VARCHAR(150) NOT NULL,
                               number INT NOT NULL,
                               FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE
);

-- ========================
-- PATCHES (ex: LDC)
-- ========================
CREATE TABLE patches (
                         id INT AUTO_INCREMENT PRIMARY KEY,
                         name VARCHAR(150) NOT NULL,
                         competition_id INT NOT NULL,
                         price DECIMAL(10,2) DEFAULT 2.50,
                         FOREIGN KEY (competition_id) REFERENCES competitions(id) ON DELETE CASCADE
);

-- ========================
-- CART
-- ========================
CREATE TABLE cart (
                      id INT AUTO_INCREMENT PRIMARY KEY,
                      session_id VARCHAR(255) NOT NULL,
                      product_variant_id INT NOT NULL,
                      quantity INT NOT NULL,
                      FOREIGN KEY (product_variant_id) REFERENCES product_variants(id) ON DELETE CASCADE
);

-- ========================
-- CART CUSTOMIZATIONS (flocage perso ou officiel)
-- ========================
CREATE TABLE cart_customizations (
                                     id INT AUTO_INCREMENT PRIMARY KEY,
                                     cart_id INT NOT NULL,
                                     player_print_id INT NULL,
                                     custom_name VARCHAR(100) NULL,
                                     custom_number INT NULL,
                                     FOREIGN KEY (cart_id) REFERENCES cart(id) ON DELETE CASCADE,
                                     FOREIGN KEY (player_print_id) REFERENCES player_prints(id) ON DELETE SET NULL
);

-- ========================
-- CART PATCHES
-- ========================
CREATE TABLE cart_patches (
                              id INT AUTO_INCREMENT PRIMARY KEY,
                              cart_id INT NOT NULL,
                              patch_id INT NOT NULL,
                              FOREIGN KEY (cart_id) REFERENCES cart(id) ON DELETE CASCADE,
                              FOREIGN KEY (patch_id) REFERENCES patches(id)
);

-- ========================
-- FAVORITES
-- ========================
CREATE TABLE favorites (
                           id INT AUTO_INCREMENT PRIMARY KEY,
                           session_id VARCHAR(255) NOT NULL,
                           product_id INT NOT NULL,
                           FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- ========================
-- ADDRESSES
-- ========================
CREATE TABLE addresses (
                           id INT AUTO_INCREMENT PRIMARY KEY,
                           session_id VARCHAR(255) NOT NULL,
                           full_name VARCHAR(255) NOT NULL,
                           street VARCHAR(255) NOT NULL,
                           city VARCHAR(100) NOT NULL,
                           postal_code VARCHAR(20) NOT NULL,
                           country VARCHAR(100) NOT NULL
);