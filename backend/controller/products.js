const storeService = require('../services/storeService');

const getAllProducts = (req, res) => {
  res.status(200).json(storeService.listProducts());
};

const getStoreMeta = (req, res) => {
  res.status(200).json(storeService.getStoreMeta());
};

const getProductById = (req, res) => {
  const productId = Number.parseInt(req.params.id, 10);
  const product = storeService.getProductById(productId);

  if (!product) {
    return res.status(404).json({ message: 'Produit introuvable.' });
  }

  return res.status(200).json(product);
};

const checkout = (req, res) => {
  try {
    const result = storeService.checkout(req.body);
    return res.status(200).json(result);
  } catch (error) {
    const status = error.statusCode || 500;

    return res.status(status).json({
      message: error.message || 'Une erreur est survenue pendant la validation de la commande.',
      details: error.details || null,
    });
  }
};

module.exports = {
  checkout,
  getAllProducts,
  getProductById,
  getStoreMeta,
};
