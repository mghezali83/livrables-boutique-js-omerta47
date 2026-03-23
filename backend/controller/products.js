// Using temporary hard-coded data until database credentials are provided.
const tempProducts = [
    {
        id: 1,
        reference: 'PSG-DOM-2324',
        name: 'Maillot PSG Domicile 2023/2024',
        description: `Vibrez pour le Paris Saint-Germain avec le maillot domicile officiel de la saison 2023/2024. Conçu avec le tissu Dri-FIT, il évacue la transpiration pour vous garder au sec et à l''aise, que vous soyez sur le terrain ou dans les gradins du Parc des Princes. Un design classique revisité pour une nouvelle ère de succès.`,
        price: 89.99,
        discount_percentage: 10,
        stock_quantity: 150,
        gender: 'Unisexe',
        category: {
            name: 'Ligue 1',
            type: 'League'
        },
        images: [
            { url: '/images/psg-dom-1.jpg', sort_order: 0 },
            { url: '/images/psg-dom-2.jpg', sort_order: 1 }
        ],
        colors: [ { name: 'Bleu', hex_code: '#0000FF' }, { name: 'Rouge', hex_code: '#FF0000' } ],
        sizes: [ { name: 'S' }, { name: 'M' }, { name: 'L' }, { name: 'XL' } ]
    },
    {
        id: 2,
        reference: 'OM-DOM-2324',
        name: 'Maillot OM Domicile 2023/2024',
        description: `Portez les couleurs de l''Olympique de Marseille avec fierté. Ce maillot domicile pour la saison 2023/2024 est un hommage à la ferveur et à l''histoire du club. Sa matière légère et respirante vous offre un confort optimal pour soutenir les Phocéens au Vélodrome ou n''importe où ailleurs.`,
        price: 85.00,
        discount_percentage: 0,
        stock_quantity: 200,
        gender: 'Unisexe',
        category: {
            name: 'Ligue 1',
            type: 'League'
        },
        images: [
            { url: '/images/om-dom-1.jpg', sort_order: 0 },
            { url: '/images/om-dom-2.jpg', sort_order: 1 }
        ],
        colors: [ { name: 'Blanc', hex_code: '#FFFFFF' } ],
        sizes: [ { name: 'S' }, { name: 'M' }, { name: 'L' }, { name: 'XL' } ]
    },
    {
        id: 3,
        reference: 'RMA-DOM-2324',
        name: 'Maillot Real Madrid Domicile 2023/2024',
        description: `Le blanc légendaire du Real Madrid, synonyme de victoire. Ce maillot domicile 2023/2024 est confectionné pour les fans, avec un tissu doux et la technologie d''absorption AEROREADY. Montrez votre soutien indéfectible au plus grand club du monde. Hala Madrid!`,
        price: 95.00,
        discount_percentage: 0,
        stock_quantity: 120,
        gender: 'Homme',
        category: {
            name: 'La Liga',
            type: 'League'
        },
        images: [
            { url: '/images/rma-dom-1.jpg', sort_order: 0 },
            { url: '/images/rma-dom-2.jpg', sort_order: 1 }
        ],
        colors: [ { name: 'Blanc', hex_code: '#FFFFFF' }, { name: 'Jaune', hex_code: '#FFFF00' } ],
        sizes: [ { name: 'S' }, { name: 'M' }, { name: 'L' }, { name: 'XL' }, { name: 'XXL' } ]
    }
];


// Get all products
const getAllProducts = (req, res) => {
    // Return the temporary hard-coded list of products
    res.status(200).json(tempProducts);
};

// Get a single product by id
const getProductById = (req, res) => {
    const productId = parseInt(req.params.id, 10);
    const product = tempProducts.find(p => p.id === productId);

    if (product) {
        res.status(200).json(product);
    } else {
        res.status(404).json({ message: `Product with id ${productId} not found` });
    }
};

module.exports = {
    getAllProducts,
    getProductById,
};
