const express = require('express');
const router = express.Router();
const db = require('../database/db');

/* =========================
   GET ALL PRODUCTS
========================= */
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query(`
      SELECT
        p.id,
        p.reference,
        p.nom,
        p.description,
        p.prix_base,
        p.reduction,
        p.devise,
        p.sexe,
        p.type,
        c.nom AS championnat,
        c.pays,
        COALESCE(SUM(v.quantite_stock), 0) AS quantite_stock,
        MAX(CASE WHEN i.ordre = 1 THEN i.url_image END) AS url_image,
        MAX(CASE WHEN i.ordre = 2 THEN i.url_image END) AS url_image_2
      FROM produits p
      LEFT JOIN championnats c ON p.championnat_id = c.id
      LEFT JOIN variantes v ON p.id = v.produit_id
      LEFT JOIN images i ON p.id = i.produit_id
      GROUP BY
        p.id,
        p.reference,
        p.nom,
        p.description,
        p.prix_base,
        p.reduction,
        p.devise,
        p.sexe,
        p.type,
        c.nom,
        c.pays
      ORDER BY p.id ASC
    `);

        res.json(rows);
    } catch (err) {
        console.error('Erreur GET /api/produits :', err);
        res.status(500).json({
            error: 'Erreur base de données : ' + err.message
        });
    }
});

/* =========================
   GET ONE PRODUCT
========================= */
router.get('/:id', async (req, res) => {
    try {
        const productId = Number(req.params.id);

        if (!Number.isInteger(productId) || productId <= 0) {
            return res.status(400).json({ error: 'ID produit invalide.' });
        }

        const [products] = await db.query(`
      SELECT
        p.id,
        p.reference,
        p.nom,
        p.description,
        p.prix_base,
        p.reduction,
        p.devise,
        p.sexe,
        p.type,
        c.nom AS championnat,
        c.pays,
        COALESCE(SUM(v.quantite_stock), 0) AS quantite_stock
      FROM produits p
      LEFT JOIN championnats c ON p.championnat_id = c.id
      LEFT JOIN variantes v ON p.id = v.produit_id
      WHERE p.id = ?
      GROUP BY
        p.id,
        p.reference,
        p.nom,
        p.description,
        p.prix_base,
        p.reduction,
        p.devise,
        p.sexe,
        p.type,
        c.nom,
        c.pays
    `, [productId]);

        if (!products.length) {
            return res.status(404).json({ error: 'Produit introuvable.' });
        }

        const [images] = await db.query(`
      SELECT id, url_image, ordre
      FROM images
      WHERE produit_id = ?
      ORDER BY ordre ASC
    `, [productId]);

        const [variantes] = await db.query(`
      SELECT id, couleur, taille, quantite_stock
      FROM variantes
      WHERE produit_id = ?
      ORDER BY taille ASC
    `, [productId]);

        res.json({
            ...products[0],
            images,
            variantes
        });
    } catch (err) {
        console.error('Erreur GET /api/produits/:id :', err);
        res.status(500).json({
            error: 'Erreur base de données : ' + err.message
        });
    }
});

/* =========================
   POST CHECKOUT
========================= */
router.post('/checkout', async (req, res) => {
    const { items, shippingAddress } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ error: 'Le panier est vide.' });
    }

    const requiredFields = ['fullName', 'street', 'postalCode', 'city', 'country'];

    for (const field of requiredFields) {
        if (
            !shippingAddress ||
            typeof shippingAddress[field] !== 'string' ||
            !shippingAddress[field].trim()
        ) {
            return res.status(400).json({
                error: 'Adresse de livraison incomplète.',
                field
            });
        }
    }

    let connection;

    try {
        connection = await db.getConnection();
        await connection.beginTransaction();

        const orderItems = [];

        for (const item of items) {
            const productId = Number(item.productId);
            const quantity = Number(item.quantity);
            const size = String(item.size || '').trim();
            const flockingType = item.flockingType || 'none';
            const patchType = item.patchType || 'none';

            if (!Number.isInteger(productId) || productId <= 0) {
                throw new Error('Produit invalide dans le panier.');
            }

            if (!Number.isInteger(quantity) || quantity <= 0) {
                throw new Error('Quantité invalide dans le panier.');
            }

            if (!size) {
                throw new Error('Taille manquante dans le panier.');
            }

            const [productRows] = await connection.query(`
        SELECT
          p.id,
          p.reference,
          p.nom,
          p.prix_base,
          p.reduction,
          p.devise
        FROM produits p
        WHERE p.id = ?
      `, [productId]);

            if (!productRows.length) {
                throw new Error('Un produit du panier est introuvable.');
            }

            const product = productRows[0];

            const [variantRows] = await connection.query(`
        SELECT id, quantite_stock
        FROM variantes
        WHERE produit_id = ? AND taille = ?
        LIMIT 1
      `, [productId, size]);

            if (!variantRows.length) {
                throw new Error(`La taille ${size} n'existe pas pour ${product.nom}.`);
            }

            const variant = variantRows[0];

            if (Number(variant.quantite_stock) < quantity) {
                throw new Error(`Stock insuffisant pour ${product.nom} en taille ${size}.`);
            }

            await connection.query(`
        UPDATE variantes
        SET quantite_stock = quantite_stock - ?
        WHERE id = ?
      `, [quantity, variant.id]);

            /* =========================
               PRIX CHECKOUT
               - 45€ normal
               - 30€ promo
            ========================= */
            let unitPrice = Number(product.reduction) > 0 ? 30 : 45;

            if (flockingType !== 'none') {
                unitPrice += 5;
            }

            if (patchType !== 'none') {
                unitPrice += 2.5;
            }

            unitPrice = Number(unitPrice.toFixed(2));

            orderItems.push({
                productId: product.id,
                reference: product.reference,
                name: product.nom,
                size,
                quantity,
                flockingType,
                patchType,
                unitPrice,
                lineTotal: Number((unitPrice * quantity).toFixed(2))
            });
        }

        const subtotal = Number(
            orderItems.reduce((sum, item) => sum + item.lineTotal, 0).toFixed(2)
        );

        /* =========================
           LIVRAISON OFFERTE DÈS 90€
        ========================= */
        const shipping = subtotal >= 90 ? 0 : 6.9;
        const total = Number((subtotal + shipping).toFixed(2));

        await connection.commit();

        res.json({
            message: 'Commande validée avec succès.',
            subtotal,
            shipping,
            total,
            currency: 'EUR',
            items: orderItems,
            shippingAddress
        });
    } catch (err) {
        if (connection) {
            await connection.rollback();
        }

        console.error('Erreur POST /api/produits/checkout :', err);

        res.status(400).json({
            error: err.message || 'Erreur pendant la commande.'
        });
    } finally {
        if (connection) {
            connection.release();
        }
    }
});

module.exports = router;