-- 1. Championnats
INSERT INTO championnats (id, nom, pays) VALUES 
(1, 'Ligue 1', 'France'),
(2, 'La Liga', 'Espagne'),
(3, 'Serie A', 'Italie'),
(4, 'Bundesliga', 'Allemagne'),
(5, 'Équipes Nationales', 'International');

-- 2. Patchs
INSERT INTO patchs (nom, prix, quantite_stock) VALUES 
('Patch Ligue des Champions', 2.50, 9999),
('Patch Coupe du Monde', 2.50, 9999);

-- 3. Les 20 Produits
INSERT INTO produits (id, reference, nom, description, prix_base, reduction, devise, sexe, type, championnat_id) VALUES 
(1, 'ALB-THI', 'Maillot Albanie Third', 'Ce maillot third officiel de l''équipe nationale d''Albanie est conçu avec des matériaux respirants de haute technologie pour offrir un confort maximal sur le terrain comme en tribune. Sa technologie d''évacuation de la transpiration vous garde au sec pendant l''effort.', 89.99, 0, 'EUR', 'Homme', 'Maillot', 5),
(2, 'ALG-EXT', 'Maillot Algérie Extérieur 26/27', 'Ce maillot extérieur officiel de l''équipe nationale d''Algérie est conçu avec des matériaux respirants de haute technologie pour offrir un confort maximal sur le terrain comme en tribune. Sa technologie d''évacuation de la transpiration vous garde au sec pendant l''effort.', 89.99, 0, 'EUR', 'Homme', 'Maillot', 5),
(3, 'BAY-DOM', 'Maillot Bayern Munich Domicile', 'Ce maillot domicile officiel du Bayern Munich est conçu avec des matériaux respirants de haute technologie pour offrir un confort maximal sur le terrain comme en tribune. Sa technologie d''évacuation de la transpiration vous garde au sec pendant l''effort.', 95.00, 0, 'EUR', 'Homme', 'Maillot', 4),
(4, 'BRE-EXT', 'Maillot Brésil Extérieur', 'Ce maillot extérieur officiel de l''équipe nationale du Brésil est conçu avec des matériaux respirants de haute technologie pour offrir un confort maximal sur le terrain comme en tribune. Sa technologie d''évacuation de la transpiration vous garde au sec pendant l''effort.', 90.00, 10, 'EUR', 'Homme', 'Maillot', 5),
(5, 'COL-DOM', 'Maillot Colombie Domicile', 'Ce maillot domicile officiel de l''équipe nationale de Colombie est conçu avec des matériaux respirants de haute technologie pour offrir un confort maximal sur le terrain comme en tribune. Sa technologie d''évacuation de la transpiration vous garde au sec pendant l''effort.', 89.99, 0, 'EUR', 'Homme', 'Maillot', 5),
(6, 'CRI-EXT', 'Maillot Costa Rica Extérieur', 'Ce maillot extérieur officiel du Costa Rica est conçu avec des matériaux respirants de haute technologie pour offrir un confort maximal sur le terrain comme en tribune. Sa technologie d''évacuation de la transpiration vous garde au sec pendant l''effort.', 85.00, 0, 'EUR', 'Homme', 'Maillot', 5),
(7, 'ESP-EXT', 'Maillot Espagne Extérieur', 'Ce maillot extérieur officiel de l''équipe nationale d''Espagne est conçu avec des matériaux respirants de haute technologie pour offrir un confort maximal sur le terrain comme en tribune. Sa technologie d''évacuation de la transpiration vous garde au sec pendant l''effort.', 90.00, 0, 'EUR', 'Homme', 'Maillot', 5),
(8, 'FCB-DOM', 'Maillot FC Barcelone Domicile', 'Ce maillot domicile officiel du FC Barcelone est conçu avec des matériaux respirants de haute technologie pour offrir un confort maximal sur le terrain comme en tribune. Sa technologie d''évacuation de la transpiration vous garde au sec pendant l''effort.', 95.00, 0, 'EUR', 'Homme', 'Maillot', 2),
(9, 'FRA-DOM', 'Maillot France Domicile', 'Ce maillot domicile officiel de l''équipe de France est conçu avec des matériaux respirants de haute technologie pour offrir un confort maximal sur le terrain comme en tribune. Sa technologie d''évacuation de la transpiration vous garde au sec pendant l''effort.', 90.00, 0, 'EUR', 'Homme', 'Maillot', 5),
(10, 'FRA-EXT', 'Maillot France Extérieur', 'Ce maillot extérieur officiel de l''équipe de France est conçu avec des matériaux respirants de haute technologie pour offrir un confort maximal sur le terrain comme en tribune. Sa technologie d''évacuation de la transpiration vous garde au sec pendant l''effort.', 90.00, 0, 'EUR', 'Homme', 'Maillot', 5),
(11, 'INT-DOM', 'Maillot Inter Milan Domicile', 'Ce maillot domicile officiel de l''Inter Milan est conçu avec des matériaux respirants de haute technologie pour offrir un confort maximal sur le terrain comme en tribune. Sa technologie d''évacuation de la transpiration vous garde au sec pendant l''effort.', 95.00, 20, 'EUR', 'Homme', 'Maillot', 3),
(12, 'INT-EXT', 'Maillot Inter Milan Extérieur', 'Ce maillot extérieur officiel de l''Inter Milan est conçu avec des matériaux respirants de haute technologie pour offrir un confort maximal sur le terrain comme en tribune. Sa technologie d''évacuation de la transpiration vous garde au sec pendant l''effort.', 95.00, 0, 'EUR', 'Homme', 'Maillot', 3),
(13, 'MEX-DOM', 'Maillot Mexique Domicile', 'Ce maillot domicile officiel de l''équipe nationale du Mexique est conçu avec des matériaux respirants de haute technologie pour offrir un confort maximal sur le terrain comme en tribune. Sa technologie d''évacuation de la transpiration vous garde au sec pendant l''effort.', 89.99, 0, 'EUR', 'Homme', 'Maillot', 5),
(14, 'MEX-EXT', 'Maillot Mexique Extérieur', 'Ce maillot extérieur officiel de l''équipe nationale du Mexique est conçu avec des matériaux respirants de haute technologie pour offrir un confort maximal sur le terrain comme en tribune. Sa technologie d''évacuation de la transpiration vous garde au sec pendant l''effort.', 89.99, 0, 'EUR', 'Homme', 'Maillot', 5),
(15, 'OM-DOM', 'Maillot OM Domicile', 'Ce maillot domicile officiel de l''Olympique de Marseille est conçu avec des matériaux respirants de haute technologie pour offrir un confort maximal sur le terrain comme en tribune. Sa technologie d''évacuation de la transpiration vous garde au sec pendant l''effort.', 90.00, 0, 'EUR', 'Homme', 'Maillot', 1),
(16, 'OM-EXT', 'Maillot OM Extérieur', 'Ce maillot extérieur officiel de l''Olympique de Marseille est conçu avec des matériaux respirants de haute technologie pour offrir un confort maximal sur le terrain comme en tribune. Sa technologie d''évacuation de la transpiration vous garde au sec pendant l''effort.', 90.00, 15, 'EUR', 'Homme', 'Maillot', 1),
(17, 'PSG-DOM', 'Maillot PSG Domicile', 'Ce maillot domicile officiel du Paris Saint-Germain est conçu avec des matériaux respirants de haute technologie pour offrir un confort maximal sur le terrain comme en tribune. Sa technologie d''évacuation de la transpiration vous garde au sec pendant l''effort.', 95.00, 0, 'EUR', 'Homme', 'Maillot', 1),
(18, 'PSG-EXT', 'Maillot PSG Extérieur', 'Ce maillot extérieur officiel du Paris Saint-Germain est conçu avec des matériaux respirants de haute technologie pour offrir un confort maximal sur le terrain comme en tribune. Sa technologie d''évacuation de la transpiration vous garde au sec pendant l''effort.', 95.00, 0, 'EUR', 'Homme', 'Maillot', 1),
(19, 'RMA-DOM', 'Maillot Real Madrid Domicile', 'Ce maillot domicile officiel du Real Madrid est conçu avec des matériaux respirants de haute technologie pour offrir un confort maximal sur le terrain comme en tribune. Sa technologie d''évacuation de la transpiration vous garde au sec pendant l''effort.', 95.00, 0, 'EUR', 'Homme', 'Maillot', 2),
(20, 'BRE-DOM', 'Maillot Brésil Domicile', 'Ce maillot domicile officiel de l''équipe nationale du Brésil est conçu avec des matériaux respirants de haute technologie pour offrir un confort maximal sur le terrain comme en tribune. Sa technologie d''évacuation de la transpiration vous garde au sec pendant l''effort.', 90.00, 0, 'EUR', 'Homme', 'Maillot', 5);

-- 4. Variantes (M et L pour tout le monde)
INSERT INTO variantes (produit_id, couleur, taille, quantite_stock)
SELECT id, 'Couleur Unique', 'M', 20 FROM produits;
INSERT INTO variantes (produit_id, couleur, taille, quantite_stock)
SELECT id, 'Couleur Unique', 'L', 15 FROM produits;

-- 5. Images
INSERT INTO images (produit_id, url_image, ordre) VALUES 
(1, './assets/maillot-albanie-third.jpg', 1), (1, './assets/maillot-albanie-third dos.jpg', 2),
(2, './assets/maillot-algerie-exterieur-2026-2027.jpg', 1), (2, './assets/maillot-algerie-exterieur-2026-2027 dos.jpg', 2),
(3, './assets/maillot-bayern-munich-domicile.jpg', 1), (3, './assets/maillot-bayern-munich-domicile dos.jpg', 2),
(4, './assets/maillot-replica-bresil-exterieur.jpg', 1), (4, './assets/maillot-replica-bresil-exterieur dos.jpg', 2),
(5, './assets/maillot-colombie-domicile.jpg', 1), (5, './assets/maillot-colombie-domicile dos.jpg', 2),
(6, './assets/maillot-costa-rica-exterieur.jpg', 1), (6, './assets/maillot-costa-rica-exterieur dos.jpg', 2),
(7, './assets/maillot-espagne-exterieur.jpg', 1), (7, './assets/maillot-espagne-exterieur dos.jpg', 2),
(8, './assets/maillot-fc-barcelone-domicile.jpg', 1), (8, './assets/maillot-fc-barcelone-domicile dos.jpg', 2),
(9, './assets/maillot-france-domicile.jpg', 1), (9, './assets/maillot-france-domicile dos.jpg', 2),
(10, './assets/maillot-france-exterieur.jpg', 1), (10, './assets/maillot-france-exterieur dos.jpg', 2),
(11, './assets/Inter Milan.webp', 1), (11, './assets/Inter Milan dos.webp', 2),
(12, './assets/maillot-inter-milan-exterieur.jpg', 1), (12, './assets/maillot-inter-milan-exterieur dos.jpg', 2),
(13, './assets/maillot-mexique-domicile.jpg', 1), (13, './assets/maillot-mexique-domicile dos.jpg', 2),
(14, './assets/maillot-mexique-exterieur.jpg', 1), (14, './assets/maillot-mexique-exterieur dos.jpg', 2),
(15, './assets/maillot-om-domicile.jpg', 1), (15, './assets/maillot-om-domicile dos.jpg', 2),
(16, './assets/maillot-om-exterieur.jpg', 1), (16, './assets/maillot-om-exterieur dos.jpg', 2),
(17, './assets/maillot-psg-domicile.jpg', 1), (17, './assets/maillot-psg-domicile logo.jpg', 2),
(18, './assets/maillot-psg-exterieur.jpg', 1), (18, './assets/maillot-psg-exterieur dos.jpg', 2),
(19, './assets/maillot-real-madrid-domicile.jpg', 1), (19, './assets/maillot-real-madrid-domicile dos.jpg', 2),
(20, './assets/maillot-bresil.png', 1), (20, './assets/maillot-bresil dos.png', 2);