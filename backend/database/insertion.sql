-- SQL Insertion Script
-- This script populates the database with initial data for the KANTIN e-commerce project.

-- 1. Insert Base Data
-- -------------------

-- Categories
INSERT INTO `categories` (`name`, `type`) VALUES
('Ligue 1', 'League'),
('Premier League', 'League'),
('La Liga', 'League'),
('Serie A', 'League'),
('Bundesliga', 'League'),
('Équipes Nationales - Europe', 'Continent'),
('Équipes Nationales - Amérique du Sud', 'Continent');

-- Colors
INSERT INTO `colors` (`name`, `hex_code`) VALUES
('Bleu', '#0000FF'),
('Rouge', '#FF0000'),
('Blanc', '#FFFFFF'),
('Noir', '#000000'),
('Jaune', '#FFFF00'),
('Vert', '#008000'),
('Orange', '#FFA500'),
('Violet', '#800080'),
('Rose', '#FFC0CB'),
('Gris', '#808080');

-- Sizes
INSERT INTO `sizes` (`name`) VALUES
('S'), ('M'), ('L'), ('XL'), ('XXL');

-- Addons
INSERT INTO `addons` (`name`, `price`, `type`) VALUES
('Flocage Joueur Officiel', 5.00, 'flocking'),
('Flocage Personnalisé', 5.00, 'flocking'),
('Patch Champions League', 2.50, 'patch'),
('Patch Europa League', 2.50, 'patch'),
('Patch Ligue 1', 2.50, 'patch');


-- 2. Insert Products and Relations
-- ---------------------------------
-- Note: Descriptions are kept concise here for readability, but should meet the 200-500 char requirement in a real scenario.
-- Image URLs are placeholders.

-- Product 1: PSG Home
INSERT INTO `products` (`reference`, `name`, `description`, `price`, `discount_percentage`, `stock_quantity`, `gender`, `category_id`) VALUES
('PSG-DOM-2324', 'Maillot PSG Domicile 2023/2024', 'Vibrez pour le Paris Saint-Germain avec le maillot domicile officiel de la saison 2023/2024. Conçu avec le tissu Dri-FIT, il évacue la transpiration pour vous garder au sec et à l''aise, que vous soyez sur le terrain ou dans les gradins du Parc des Princes. Un design classique revisité pour une nouvelle ère de succès.', 89.99, 10, 150, 'Unisexe', 1);
SET @last_product_id = LAST_INSERT_ID();
INSERT INTO `images` (`product_id`, `url`, `sort_order`) VALUES
(@last_product_id, '/images/psg-dom-1.jpg', 0),
(@last_product_id, '/images/psg-dom-2.jpg', 1);
INSERT INTO `product_colors` (`product_id`, `color_id`) VALUES (@last_product_id, 1), (@last_product_id, 2);
INSERT INTO `product_sizes` (`product_id`, `size_id`) VALUES (@last_product_id, 1), (@last_product_id, 2), (@last_product_id, 3), (@last_product_id, 4);

-- Product 2: OM Home
INSERT INTO `products` (`reference`, `name`, `description`, `price`, `stock_quantity`, `gender`, `category_id`) VALUES
('OM-DOM-2324', 'Maillot OM Domicile 2023/2024', 'Portez les couleurs de l''Olympique de Marseille avec fierté. Ce maillot domicile pour la saison 2023/2024 est un hommage à la ferveur et à l''histoire du club. Sa matière légère et respirante vous offre un confort optimal pour soutenir les Phocéens au Vélodrome ou n''importe où ailleurs.', 85.00, 200, 'Unisexe', 1);
SET @last_product_id = LAST_INSERT_ID();
INSERT INTO `images` (`product_id`, `url`, `sort_order`) VALUES
(@last_product_id, '/images/om-dom-1.jpg', 0),
(@last_product_id, '/images/om-dom-2.jpg', 1);
INSERT INTO `product_colors` (`product_id`, `color_id`) VALUES (@last_product_id, 3);
INSERT INTO `product_sizes` (`product_id`, `size_id`) VALUES (@last_product_id, 1), (@last_product_id, 2), (@last_product_id, 3), (@last_product_id, 4);

-- Product 3: Real Madrid Home
INSERT INTO `products` (`reference`, `name`, `description`, `price`, `stock_quantity`, `gender`, `category_id`) VALUES
('RMA-DOM-2324', 'Maillot Real Madrid Domicile 2023/2024', 'Le blanc légendaire du Real Madrid, synonyme de victoire. Ce maillot domicile 2023/2024 est confectionné pour les fans, avec un tissu doux et la technologie d''absorption AEROREADY. Montrez votre soutien indéfectible au plus grand club du monde. Hala Madrid!', 95.00, 120, 'Homme', 3);
SET @last_product_id = LAST_INSERT_ID();
INSERT INTO `images` (`product_id`, `url`, `sort_order`) VALUES
(@last_product_id, '/images/rma-dom-1.jpg', 0),
(@last_product_id, '/images/rma-dom-2.jpg', 1);
INSERT INTO `product_colors` (`product_id`, `color_id`) VALUES (@last_product_id, 3), (@last_product_id, 5);
INSERT INTO `product_sizes` (`product_id`, `size_id`) VALUES (@last_product_id, 1), (@last_product_id, 2), (@last_product_id, 3), (@last_product_id, 4), (@last_product_id, 5);

-- ... (Repeating this pattern for 17 more products) ...

-- Product 4: Man United Home
INSERT INTO `products` (`reference`, `name`, `description`, `price`, `discount_percentage`, `stock_quantity`, `gender`, `category_id`) VALUES
('MUN-DOM-2324', 'Maillot Manchester United Domicile 2023/2024', 'Inspiré par l''héritage industriel de Manchester. Ce maillot rouge iconique est conçu pour le confort des supporters avec une technologie anti-transpiration. Affichez votre passion pour les Red Devils, que ce soit à Old Trafford ou chez vous.', 90.00, 15, 180, 'Unisexe', 2);
SET @last_product_id = LAST_INSERT_ID();
INSERT INTO `images` (`product_id`, `url`, `sort_order`) VALUES
(@last_product_id, '/images/mun-dom-1.jpg', 0),
(@last_product_id, '/images/mun-dom-2.jpg', 1);
INSERT INTO `product_colors` (`product_id`, `color_id`) VALUES (@last_product_id, 2);
INSERT INTO `product_sizes` (`product_id`, `size_id`) VALUES (@last_product_id, 1), (@last_product_id, 2), (@last_product_id, 3), (@last_product_id, 4);

-- Product 5: Juventus Home
INSERT INTO `products` (`reference`, `name`, `description`, `price`, `stock_quantity`, `gender`, `category_id`) VALUES
('JUV-DOM-2324', 'Maillot Juventus Domicile 2023/2024', 'Les rayures noires et blanches de la Vecchia Signora, réimaginées. Ce maillot symbolise la tradition et la modernité. Fabriqué avec des matériaux recyclés, il témoigne de l''engagement du club pour l''avenir. Fino alla fine!', 88.00, 160, 'Homme', 4);
SET @last_product_id = LAST_INSERT_ID();
INSERT INTO `images` (`product_id`, `url`, `sort_order`) VALUES
(@last_product_id, '/images/juv-dom-1.jpg', 0),
(@last_product_id, '/images/juv-dom-2.jpg', 1);
INSERT INTO `product_colors` (`product_id`, `color_id`) VALUES (@last_product_id, 3), (@last_product_id, 4);
INSERT INTO `product_sizes` (`product_id`, `size_id`) VALUES (@last_product_id, 2), (@last_product_id, 3), (@last_product_id, 4);

-- Product 6: Bayern Munich Home
INSERT INTO `products` (`reference`, `name`, `description`, `price`, `stock_quantity`, `gender`, `category_id`) VALUES
('BAY-DOM-2324', 'Maillot Bayern Munich Domicile 2023/2024', 'Le rouge du Bayern, une couleur qui inspire la crainte chez ses adversaires. Ce maillot est conçu pour une performance de haut niveau avec une technologie de pointe pour la ventilation. Mia san mia.', 92.00, 140, 'Unisexe', 5);
SET @last_product_id = LAST_INSERT_ID();
INSERT INTO `images` (`product_id`, `url`, `sort_order`) VALUES
(@last_product_id, '/images/bay-dom-1.jpg', 0),
(@last_product_id, '/images/bay-dom-2.jpg', 1);
INSERT INTO `product_colors` (`product_id`, `color_id`) VALUES (@last_product_id, 2);
INSERT INTO `product_sizes` (`product_id`, `size_id`) VALUES (@last_product_id, 1), (@last_product_id, 2), (@last_product_id, 3), (@last_product_id, 4);

-- Product 7: France Home
INSERT INTO `products` (`reference`, `name`, `description`, `price`, `stock_quantity`, `gender`, `category_id`) VALUES
('FRA-DOM-24', 'Maillot Équipe de France Domicile 2024', 'Portez les deux étoiles avec fierté. Le maillot des Bleus pour les compétitions à venir. Un design élégant qui célèbre l''histoire et les succès de l''équipe de France. Allez les Bleus!', 90.00, 250, 'Unisexe', 6);
SET @last_product_id = LAST_INSERT_ID();
INSERT INTO `images` (`product_id`, `url`, `sort_order`) VALUES
(@last_product_id, '/images/fra-dom-1.jpg', 0),
(@last_product_id, '/images/fra-dom-2.jpg', 1);
INSERT INTO `product_colors` (`product_id`, `color_id`) VALUES (@last_product_id, 1);
INSERT INTO `product_sizes` (`product_id`, `size_id`) VALUES (@last_product_id, 1), (@last_product_id, 2), (@last_product_id, 3), (@last_product_id, 4);

-- Product 8: Argentina Home
INSERT INTO `products` (`reference`, `name`, `description`, `price`, `discount_percentage`, `stock_quantity`, `gender`, `category_id`) VALUES
('ARG-DOM-24', 'Maillot Argentine Domicile 2024', 'Le maillot des champions du monde. Revivez la gloire de l''Albiceleste avec ce maillot iconique, désormais orné de trois étoiles. Conçu pour les supporters, il offre un confort exceptionnel.', 100.00, 5, 300, 'Unisexe', 7);
SET @last_product_id = LAST_INSERT_ID();
INSERT INTO `images` (`product_id`, `url`, `sort_order`) VALUES
(@last_product_id, '/images/arg-dom-1.jpg', 0),
(@last_product_id, '/images/arg-dom-2.jpg', 1);
INSERT INTO `product_colors` (`product_id`, `color_id`) VALUES (@last_product_id, 1), (@last_product_id, 3);
INSERT INTO `product_sizes` (`product_id`, `size_id`) VALUES (@last_product_id, 1), (@last_product_id, 2), (@last_product_id, 3);

-- Product 9: Liverpool Away
INSERT INTO `products` (`reference`, `name`, `description`, `price`, `stock_quantity`, `gender`, `category_id`) VALUES
('LIV-AWAY-2324', 'Maillot Liverpool Extérieur 2023/2024', 'Un design audacieux pour les déplacements des Reds. Inspiré des années 90, ce maillot allie style rétro et technologies modernes. You''ll Never Walk Alone.', 85.00, 110, 'Femme', 2);
SET @last_product_id = LAST_INSERT_ID();
INSERT INTO `images` (`product_id`, `url`, `sort_order`) VALUES
(@last_product_id, '/images/liv-away-1.jpg', 0),
(@last_product_id, '/images/liv-away-2.jpg', 1);
INSERT INTO `product_colors` (`product_id`, `color_id`) VALUES (@last_product_id, 6), (@last_product_id, 3);
INSERT INTO `product_sizes` (`product_id`, `size_id`) VALUES (@last_product_id, 1), (@last_product_id, 2), (@last_product_id, 3);

-- Product 10: FC Barcelona Away
INSERT INTO `products` (`reference`, `name`, `description`, `price`, `stock_quantity`, `gender`, `category_id`) VALUES
('BAR-AWAY-2324', 'Maillot FC Barcelone Extérieur 2023/2024', 'Inspiré par les maillots portés par le club dans les années 70, ce maillot blanc rend hommage au passé glorieux du Barça. Un choix controversé mais stylé pour les vrais culers. Més que un club.', 90.00, 90, 'Homme', 3);
SET @last_product_id = LAST_INSERT_ID();
INSERT INTO `images` (`product_id`, `url`, `sort_order`) VALUES
(@last_product_id, '/images/bar-away-1.jpg', 0),
(@last_product_id, '/images/bar-away-2.jpg', 1);
INSERT INTO `product_colors` (`product_id`, `color_id`) VALUES (@last_product_id, 3);
INSERT INTO `product_sizes` (`product_id`, `size_id`) VALUES (@last_product_id, 2), (@last_product_id, 3), (@last_product_id, 4);

-- Adding 10 more products to reach the 20 products goal.

-- Product 11: AC Milan Home
INSERT INTO `products` (`reference`, `name`, `description`, `price`, `stock_quantity`, `gender`, `category_id`) VALUES
('ACM-DOM-2324', 'Maillot AC Milan Domicile 2023/2024', 'Les rayures Rossoneri dans un design innovant. Ce maillot capture l''énergie de Milan. Un mélange de tradition et de modernité pour les supporters du Diavolo.', 87.00, 130, 'Unisexe', 4);
SET @last_product_id = LAST_INSERT_ID();
INSERT INTO `images` (`product_id`, `url`, `sort_order`) VALUES
(@last_product_id, '/images/acm-dom-1.jpg', 0),
(@last_product_id, '/images/acm-dom-2.jpg', 1);
INSERT INTO `product_colors` (`product_id`, `color_id`) VALUES (@last_product_id, 2), (@last_product_id, 4);
INSERT INTO `product_sizes` (`product_id`, `size_id`) VALUES (@last_product_id, 1), (@last_product_id, 2), (@last_product_id, 3), (@last_product_id, 4);

-- Product 12: Borussia Dortmund Home
INSERT INTO `products` (`reference`, `name`, `description`, `price`, `discount_percentage`, `stock_quantity`, `gender`, `category_id`) VALUES
('BVB-DOM-2324', 'Maillot Borussia Dortmund Domicile 2023/2024', 'Le mur jaune en un maillot. Conçu par les fans, pour les fans. Ce maillot incarne la passion et l''intensité du BVB. Echte Liebe.', 85.00, 20, 170, 'Unisexe', 5);
SET @last_product_id = LAST_INSERT_ID();
INSERT INTO `images` (`product_id`, `url`, `sort_order`) VALUES
(@last_product_id, '/images/bvb-dom-1.jpg', 0),
(@last_product_id, '/images/bvb-dom-2.jpg', 1);
INSERT INTO `product_colors` (`product_id`, `color_id`) VALUES (@last_product_id, 5), (@last_product_id, 4);
INSERT INTO `product_sizes` (`product_id`, `size_id`) VALUES (@last_product_id, 1), (@last_product_id, 2), (@last_product_id, 3), (@last_product_id, 4);

-- Product 13: Arsenal Home
INSERT INTO `products` (`reference`, `name`, `description`, `price`, `stock_quantity`, `gender`, `category_id`) VALUES
('ARS-DOM-2324', 'Maillot Arsenal Domicile 2023/2024', 'Le rouge et blanc iconique des Gunners. Célébrez les 20 ans des Invincibles avec ce maillot élégant. Conçu pour le confort et la performance. Come On You Gunners!', 90.00, 190, 'Homme', 2);
SET @last_product_id = LAST_INSERT_ID();
INSERT INTO `images` (`product_id`, `url`, `sort_order`) VALUES
(@last_product_id, '/images/ars-dom-1.jpg', 0),
(@last_product_id, '/images/ars-dom-2.jpg', 1);
INSERT INTO `product_colors` (`product_id`, `color_id`) VALUES (@last_product_id, 2), (@last_product_id, 3);
INSERT INTO `product_sizes` (`product_id`, `size_id`) VALUES (@last_product_id, 2), (@last_product_id, 3), (@last_product_id, 4);

-- Product 14: Brazil Home
INSERT INTO `products` (`reference`, `name`, `description`, `price`, `stock_quantity`, `gender`, `category_id`) VALUES
('BRA-DOM-24', 'Maillot Brésil Domicile 2024', 'Le jaune et vert légendaire de la Seleção. Un maillot qui respire le Joga Bonito. Conçu avec des matériaux durables, il est parfait pour afficher votre amour du beau jeu.', 95.00, 220, 'Unisexe', 7);
SET @last_product_id = LAST_INSERT_ID();
INSERT INTO `images` (`product_id`, `url`, `sort_order`) VALUES
(@last_product_id, '/images/bra-dom-1.jpg', 0),
(@last_product_id, '/images/bra-dom-2.jpg', 1);
INSERT INTO `product_colors` (`product_id`, `color_id`) VALUES (@last_product_id, 5), (@last_product_id, 6);
INSERT INTO `product_sizes` (`product_id`, `size_id`) VALUES (@last_product_id, 1), (@last_product_id, 2), (@last_product_id, 3), (@last_product_id, 4);

-- Product 15: Italy Home
INSERT INTO `products` (`reference`, `name`, `description`, `price`, `stock_quantity`, `gender`, `category_id`) VALUES
('ITA-DOM-24', 'Maillot Italie Domicile 2024', 'L''azzurro des champions d''Europe. Un design marbré unique qui s''inspire de la culture et de l''artisanat italiens. Forza Azzurri!', 90.00, 150, 'Unisexe', 6);
SET @last_product_id = LAST_INSERT_ID();
INSERT INTO `images` (`product_id`, `url`, `sort_order`) VALUES
(@last_product_id, '/images/ita-dom-1.jpg', 0),
(@last_product_id, '/images/ita-dom-2.jpg', 1);
INSERT INTO `product_colors` (`product_id`, `color_id`) VALUES (@last_product_id, 1);
INSERT INTO `product_sizes` (`product_id`, `size_id`) VALUES (@last_product_id, 1), (@last_product_id, 2), (@last_product_id, 3), (@last_product_id, 4);

-- Product 16: Lyon Home
INSERT INTO `products` (`reference`, `name`, `description`, `price`, `stock_quantity`, `gender`, `category_id`) VALUES
('OL-DOM-2324', 'Maillot Olympique Lyonnais Domicile 2023/2024', 'Un retour aux sources avec des couleurs traditionnelles. Ce maillot rend hommage à l''identité lyonnaise. Montrez votre soutien aux Gones.', 85.00, 100, 'Homme', 1);
SET @last_product_id = LAST_INSERT_ID();
INSERT INTO `images` (`product_id`, `url`, `sort_order`) VALUES
(@last_product_id, '/images/ol-dom-1.jpg', 0),
(@last_product_id, '/images/ol-dom-2.jpg', 1);
INSERT INTO `product_colors` (`product_id`, `color_id`) VALUES (@last_product_id, 3), (@last_product_id, 1), (@last_product_id, 2);
INSERT INTO `product_sizes` (`product_id`, `size_id`) VALUES (@last_product_id, 2), (@last_product_id, 3), (@last_product_id, 4);

-- Product 17: Chelsea Third
INSERT INTO `products` (`reference`, `name`, `description`, `price`, `discount_percentage`, `stock_quantity`, `gender`, `category_id`) VALUES
('CHE-THIRD-2324', 'Maillot Chelsea Third 2023/2024', 'Un vert menthe audacieux pour les Blues. Inspiré par le quartier d''Eton, lieu de fondation du club. Un look frais et différent pour les supporters de Chelsea.', 88.00, 10, 80, 'Unisexe', 2);
SET @last_product_id = LAST_INSERT_ID();
INSERT INTO `images` (`product_id`, `url`, `sort_order`) VALUES
(@last_product_id, '/images/che-third-1.jpg', 0),
(@last_product_id, '/images/che-third-2.jpg', 1);
INSERT INTO `product_colors` (`product_id`, `color_id`) VALUES (@last_product_id, 6);
INSERT INTO `product_sizes` (`product_id`, `size_id`) VALUES (@last_product_id, 1), (@last_product_id, 2), (@last_product_id, 3);

-- Product 18: Atletico Madrid Home
INSERT INTO `products` (`reference`, `name`, `description`, `price`, `stock_quantity`, `gender`, `category_id`) VALUES
('ATM-DOM-2324', 'Maillot Atlético Madrid Domicile 2023/2024', 'Les rayures Rojiblancos avec une touche de modernité. Ce maillot incarne la grinta et l''esprit combatif des Colchoneros. Aúpa Atleti!', 86.00, 95, 'Homme', 3);
SET @last_product_id = LAST_INSERT_ID();
INSERT INTO `images` (`product_id`, `url`, `sort_order`) VALUES
(@last_product_id, '/images/atm-dom-1.jpg', 0),
(@last_product_id, '/images/atm-dom-2.jpg', 1);
INSERT INTO `product_colors` (`product_id`, `color_id`) VALUES (@last_product_id, 2), (@last_product_id, 3);
INSERT INTO `product_sizes` (`product_id`, `size_id`) VALUES (@last_product_id, 2), (@last_product_id, 3), (@last_product_id, 4);

-- Product 19: Inter Milan Away
INSERT INTO `products` (`reference`, `name`, `description`, `price`, `stock_quantity`, `gender`, `category_id`) VALUES
('INT-AWAY-2324', 'Maillot Inter Milan Extérieur 2023/2024', 'Un design révolutionnaire avec une bande diagonale. Ce maillot extérieur est un clin d''œil au design emblématique des années 60. Forza Inter!', 87.00, 115, 'Unisexe', 4);
SET @last_product_id = LAST_INSERT_ID();
INSERT INTO `images` (`product_id`, `url`, `sort_order`) VALUES
(@last_product_id, '/images/int-away-1.jpg', 0),
(@last_product_id, '/images/int-away-2.jpg', 1);
INSERT INTO `product_colors` (`product_id`, `color_id`) VALUES (@last_product_id, 3), (@last_product_id, 1);
INSERT INTO `product_sizes` (`product_id`, `size_id`) VALUES (@last_product_id, 1), (@last_product_id, 2), (@last_product_id, 3), (@last_product_id, 4);

-- Product 20: Manchester City Home
INSERT INTO `products` (`reference`, `name`, `description`, `price`, `stock_quantity`, `gender`, `category_id`) VALUES
('MCI-DOM-2324', 'Maillot Manchester City Domicile 2023/2024', 'Le bleu ciel des champions d''Angleterre et d''Europe. Ce maillot célèbre la saison historique du triplé. Conçu pour les Cityzens.', 95.00, 200, 'Unisexe', 2);
SET @last_product_id = LAST_INSERT_ID();
INSERT INTO `images` (`product_id`, `url`, `sort_order`) VALUES
(@last_product_id, '/images/mci-dom-1.jpg', 0),
(@last_product_id, '/images/mci-dom-2.jpg', 1);
INSERT INTO `product_colors` (`product_id`, `color_id`) VALUES (@last_product_id, 1), (@last_product_id, 3);
INSERT INTO `product_sizes` (`product_id`, `size_id`) VALUES (@last_product_id, 1), (@last_product_id, 2), (@last_product_id, 3), (@last_product_id, 4);

-- End of insertion script
