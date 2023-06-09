const express = require('express');
const router = express.Router();
const { Library} = require ('../models/library');

// Crear una nueva librería
router.post('/', (req, res) => {
  const { name, location, telefono } = req.body;
  Libreria.create({ name, location, telefono })
    .then((libreria) => res.status(201).json(libreria))
    .catch((error) => res.status(400).json({ error: error.message }));
});

// Obtener una librería por ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  Libreria.findByPk(id, { include: 'Books' })
    .then((libreria) => {
      if (libreria) {
        res.json(libreria);
      } else {
        res.status(404).json({ error: 'Librería no encontrada' });
      }
    })
    .catch((error) => res.status(500).json({ error: error.message }));
});

// Obtener todas las librerías
router.get('/', (req, res) => {
  Library.findAll({ include: 'books' })
    .then((librerias) => res.json(librerias))
    .catch((error) => res.status(500).json({ error: error.message }));
});

// Modificar una librería por ID
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, location, telefono } = req.body;
  Libreria.findByPk(id)
    .then((libreria) => {
      if (libreria) {
        libreria.name = name;
        libreria.location = location;
        libreria.telefono = telefono;
        libreria.save().then((updatedLibreria) => res.json(updatedLibreria));
      } else {
        res.status(404).json({ error: 'Librería no encontrada' });
      }
    })
    .catch((error) => res.status(500).json({ error: error.message }));
});

// Eliminar una librería por ID
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  Libreria.findByPk(id)
    .then((libreria) => {
      if (libreria) {
        libreria.destroy().then(() => res.json({ message: 'Librería eliminada correctamente' }));
      } else {
        res.status(404).json({ error: 'Librería no encontrada' });
      }
    })
    .catch((error) => res.status(500).json({ error: error.message }));
});

module.exports = router;



