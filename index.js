const express = require('express');
const libraryRoutes = require('./src/routers/library');
const bookRoutes = require('./src/routers/book');
const userRoutes = require('./src/routers/user');

const app = express();
app.use(express.json());

// Rutas
app.use('/library', libraryRoutes);
app.use('/book', bookRoutes);
app.use('/user', userRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('API funcionando');
});
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
