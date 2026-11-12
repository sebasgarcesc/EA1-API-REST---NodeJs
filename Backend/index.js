require('dotenv').config();
const express = require('express');
const cors = require('cors');
const conectarDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 4000;

// Conectar a MongoDB Atlas
conectarDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas de los 5 módulos
app.use('/api/generos', require('./routes/genero.routes'));
app.use('/api/directores', require('./routes/director.routes'));
app.use('/api/productoras', require('./routes/productora.routes'));
app.use('/api/tipos', require('./routes/tipo.routes'));
app.use('/api/medias', require('./routes/media.routes'));

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});