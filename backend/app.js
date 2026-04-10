const express = require('express');
const cors = require('cors');
const produitsRouter = require('./router/omerta');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// On lie les routes
app.use('/api/produits', produitsRouter);

app.get('/', (req, res) => {
  res.send('API Maillots Foot en ligne !');
});

app.listen(PORT, () => {
  console.log(`Serveur sur http://localhost:${PORT}`);
});