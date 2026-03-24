const express = require('express');
const cors = require('cors');
const path = require('path');

const productRoutes = require('./router/products');

const app = express();
const port = process.env.PORT || 3000;
const frontendPath = path.join(__dirname, '..', 'frontend');

app.use(cors());
app.use(express.json());
app.use(express.static(frontendPath));

app.use('/api/products', productRoutes);

app.get('/api', (req, res) => {
  res.json({
    message: 'API de la boutique de maillots disponible.',
    endpoints: ['/api/products', '/api/products/meta', '/api/products/:id', '/api/products/checkout'],
  });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

app.listen(port, () => {
  console.log(`Serveur backend demarre sur http://localhost:${port}`);
});
