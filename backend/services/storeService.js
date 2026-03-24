const { clone, createCatalog, flockingOptions, patchCatalog } = require('../data/catalog');

let catalog = createCatalog();

const findProduct = (productId) => catalog.find((product) => product.id === productId);

const getDefaultColorway = (product) => product.colorways[0];

const getDiscountedPrice = (price, discountPercentage) =>
  Number((price * (1 - discountPercentage / 100)).toFixed(2));

const getProductSummary = (product) => {
  const defaultColorway = getDefaultColorway(product);

  return {
    id: product.id,
    reference: product.reference,
    name: product.name,
    club: product.club,
    championship: product.championship,
    country: product.country,
    continent: product.continent,
    gender: product.gender,
    type: product.type,
    season: product.season,
    price: product.price,
    finalPrice: getDiscountedPrice(product.price, product.discountPercentage),
    discountPercentage: product.discountPercentage,
    currency: product.currency,
    styleTag: product.styleTag,
    totalStock: product.totalStock,
    colorways: product.colorways.map((colorway) => ({
      id: colorway.id,
      name: colorway.name,
      primary: colorway.primary,
      secondary: colorway.secondary,
      accent: colorway.accent,
    })),
    defaultImages: clone(defaultColorway.images),
  };
};

const getSimilarProducts = (productId, similarKey) =>
  catalog
    .filter((item) => item.id !== productId && item.similarKey === similarKey)
    .slice(0, 4)
    .map((item) => {
      const defaultColorway = getDefaultColorway(item);

      return {
        id: item.id,
        name: item.name,
        club: item.club,
        price: item.price,
        finalPrice: getDiscountedPrice(item.price, item.discountPercentage),
        discountPercentage: item.discountPercentage,
        currency: item.currency,
        image: clone(defaultColorway.images[0]),
      };
    });

const recalculateProductStock = (product) => {
  product.totalStock = product.colorways.reduce((sum, colorway) => {
    const colorTotal = Object.values(colorway.stockBySize).reduce(
      (stockSum, quantity) => stockSum + quantity,
      0
    );

    return sum + colorTotal;
  }, 0);
};

const listProducts = () => catalog.map(getProductSummary);

const getStoreMeta = () => {
  const uniqueValues = (key) =>
    [...new Set(catalog.map((product) => product[key]))].sort((first, second) =>
      first.localeCompare(second, 'fr')
    );

  return {
    filters: {
      continents: uniqueValues('continent'),
      countries: uniqueValues('country'),
      championships: uniqueValues('championship'),
      genders: uniqueValues('gender'),
    },
    addons: {
      flockingOptions: clone(flockingOptions),
      patchCatalog: clone(patchCatalog),
    },
    stats: {
      productCount: catalog.length,
      championshipCount: uniqueValues('championship').length,
      countryCount: uniqueValues('country').length,
    },
  };
};

const getProductById = (productId) => {
  const product = findProduct(productId);

  if (!product) {
    return null;
  }

  return {
    ...clone(product),
    finalPrice: getDiscountedPrice(product.price, product.discountPercentage),
    similarProducts: getSimilarProducts(product.id, product.similarKey),
  };
};

const getLineUnitPrice = (product, item) => {
  const basePrice = getDiscountedPrice(product.price, product.discountPercentage);
  const flocking = flockingOptions.find((option) => option.id === item.flockingType);
  const flockingPrice = flocking ? flocking.price : 0;
  const patchPrice = (item.patchIds || []).reduce((sum, patchId) => {
    const patch = patchCatalog.find((entry) => entry.id === patchId);
    return sum + (patch ? patch.price : 0);
  }, 0);

  return Number((basePrice + flockingPrice + patchPrice).toFixed(2));
};

const validateAddress = (shippingAddress) => {
  const requiredFields = ['fullName', 'street', 'postalCode', 'city', 'country'];
  const missingField = requiredFields.find(
    (field) => !shippingAddress || typeof shippingAddress[field] !== 'string' || !shippingAddress[field].trim()
  );

  if (missingField) {
    const error = new Error('Merci de renseigner une adresse de livraison complete.');
    error.statusCode = 400;
    error.details = { field: missingField };
    throw error;
  }
};

const validateCartLine = (item) => {
  if (!item || !Number.isInteger(item.productId)) {
    const error = new Error('Un produit du panier est invalide.');
    error.statusCode = 400;
    throw error;
  }

  if (!item.colorwayId || !item.size || !Number.isInteger(item.quantity) || item.quantity < 1) {
    const error = new Error('Une variante du panier est incomplete.');
    error.statusCode = 400;
    throw error;
  }
};

const calculateShipping = (subtotal) => (subtotal >= 180 ? 0 : 6.9);

const checkout = (payload) => {
  const items = Array.isArray(payload.items) ? payload.items : [];

  if (items.length === 0) {
    const error = new Error('Le panier est vide.');
    error.statusCode = 400;
    throw error;
  }

  validateAddress(payload.shippingAddress);

  const reservedLines = items.map((item) => {
    validateCartLine(item);

    const product = findProduct(item.productId);
    if (!product) {
      const error = new Error('Un produit du panier n existe plus.');
      error.statusCode = 404;
      throw error;
    }

    const colorway = product.colorways.find((entry) => entry.id === item.colorwayId);
    if (!colorway) {
      const error = new Error(`La couleur selectionnee n est plus disponible pour ${product.name}.`);
      error.statusCode = 409;
      throw error;
    }

    const availableStock = colorway.stockBySize[item.size] || 0;
    if (availableStock < item.quantity) {
      const error = new Error(`Stock insuffisant pour ${product.name} en taille ${item.size}.`);
      error.statusCode = 409;
      error.details = {
        availableStock,
        requestedQuantity: item.quantity,
        productId: product.id,
        colorwayId: colorway.id,
        size: item.size,
      };
      throw error;
    }

    return { item, product, colorway };
  });

  const orderItems = reservedLines.map(({ item, product, colorway }) => {
    colorway.stockBySize[item.size] -= item.quantity;
    recalculateProductStock(product);

    const unitPrice = getLineUnitPrice(product, item);
    const lineTotal = Number((unitPrice * item.quantity).toFixed(2));

    return {
      productId: product.id,
      reference: product.reference,
      name: product.name,
      club: product.club,
      colorway: colorway.name,
      size: item.size,
      quantity: item.quantity,
      flockingType: item.flockingType || 'none',
      flockingValue: item.flockingValue || null,
      patchIds: clone(item.patchIds || []),
      unitPrice,
      lineTotal,
    };
  });

  const subtotal = Number(orderItems.reduce((sum, item) => sum + item.lineTotal, 0).toFixed(2));
  const shipping = calculateShipping(subtotal);
  const total = Number((subtotal + shipping).toFixed(2));
  const orderNumber = `MDL-${Date.now().toString().slice(-8)}`;

  return {
    message: 'Commande simulee validee avec succes.',
    orderNumber,
    subtotal,
    shipping,
    total,
    currency: 'EUR',
    items: orderItems,
    shippingAddress: clone(payload.shippingAddress),
  };
};

module.exports = {
  checkout,
  getProductById,
  getStoreMeta,
  listProducts,
};
