DROP TABLE IF EXISTS images;
DROP TABLE IF EXISTS variantes;
DROP TABLE IF EXISTS produits;
DROP TABLE IF EXISTS championnats;
DROP TABLE IF EXISTS patchs;

CREATE TABLE championnats (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    pays VARCHAR(100) NOT NULL
);

CREATE TABLE patchs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    prix DECIMAL(10, 2) NOT NULL DEFAULT 2.50,
    quantite_stock INT NOT NULL DEFAULT 9999
);

CREATE TABLE produits (
    id INT AUTO_INCREMENT PRIMARY KEY,
    reference VARCHAR(50) NOT NULL UNIQUE,
    nom VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    prix_base DECIMAL(10, 2) NOT NULL,
    reduction INT DEFAULT 0,
    devise VARCHAR(10) DEFAULT 'EUR',
    sexe VARCHAR(50) NOT NULL,
    type VARCHAR(50) NOT NULL,
    championnat_id INT,
    FOREIGN KEY (championnat_id) REFERENCES championnats(id) ON DELETE SET NULL
);

CREATE TABLE variantes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    produit_id INT NOT NULL,
    couleur VARCHAR(50) NOT NULL,
    taille VARCHAR(10) NOT NULL,
    quantite_stock INT NOT NULL DEFAULT 0,
    FOREIGN KEY (produit_id) REFERENCES produits(id) ON DELETE CASCADE
);

CREATE TABLE images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    produit_id INT NOT NULL,
    url_image VARCHAR(255) NOT NULL,
    ordre INT DEFAULT 1,
    FOREIGN KEY (produit_id) REFERENCES produits(id) ON DELETE CASCADE
);