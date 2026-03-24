USE boutique_js;

INSERT INTO continents (name) VALUES
    ('Europe'),
    ('Amerique du Sud');

INSERT INTO countries (continent_id, name) VALUES
    (1, 'France'),
    (1, 'Angleterre'),
    (1, 'Espagne'),
    (1, 'Italie'),
    (1, 'Allemagne'),
    (2, 'Argentine'),
    (2, 'Bresil');

INSERT INTO competitions (country_id, name, competition_type) VALUES
    (1, 'Ligue 1', 'club'),
    (2, 'Premier League', 'club'),
    (3, 'La Liga', 'club'),
    (4, 'Serie A', 'club'),
    (5, 'Bundesliga', 'club'),
    (1, 'Selections nationales', 'national');

INSERT INTO patches (patch_code, name, price) VALUES
    ('ucl', 'Patch Ligue des Champions', 2.50),
    ('league', 'Patch championnat', 2.50),
    ('winners', 'Badge vainqueur', 2.50),
    ('respect', 'Patch Respect UEFA', 2.50);

INSERT INTO flocking_options (option_code, name, extra_price) VALUES
    ('none', 'Sans flocage', 0.00),
    ('official', 'Flocage joueur officiel', 5.00),
    ('custom', 'Flocage personnalise', 5.00);

-- Les 20 produits de demonstration utilises par la facade sont actuellement
-- generes par le fichier backend/data/catalog.js afin de garder une demo
-- autonome et facile a lancer sans dependre d'un serveur MySQL.
