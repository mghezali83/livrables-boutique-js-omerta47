const express = require('express');
const cors = require('cors');
const path = require('path');
const produitsRouter = require('./router/omerta');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../')));

app.use('/api/produits', produitsRouter);

app.listen(PORT, () => {
  console.log(`Serveur sur http://localhost:${PORT}`);
});
