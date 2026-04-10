const mysql = require('mysql2');

// Crée le lien avec ta base de données MySQL
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',      // Ton identifiant MySQL (souvent root)
    password: '',      // TON MOT DE PASSE MySQL (laisse vide si tu n'en as pas)
    database: 'boutique_omerta' // REMPLACE PAR LE NOM QUE TU AS DONNÉ À TA BASE
});

module.exports = pool.promise();