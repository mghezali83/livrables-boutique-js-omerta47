const express = require('express');
const router = express.Router();
const db = require('../database/db');

// Route qui envoie tous les maillots au site
router.get('/', async (req, res) => {
    try {
        // On récupère les maillots et l'image de face (ordre 1)
        const [rows] = await db.query(`
            SELECT p.*, i.url_image 
            FROM produits p 
            LEFT JOIN images i ON p.id = i.produit_id 
            WHERE i.ordre = 1
        `);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: "Erreur base de données : " + err.message });
    }
});

module.exports = router;