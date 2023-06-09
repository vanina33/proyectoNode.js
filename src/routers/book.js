const express = require('express');
const router = express.Router();
const Book = require('../models/book');
const passport = require('passport');

// Obtener todos los libros
router.get('/', (req, res) => {
  Book.findAll(Book)
    .then((Book) => res.json(Book))
    .catch((err) => res.status(500).json({ error: err.message }));
});

// Obtener un libro por su id
router.get('/:id', (req, res) => {
  Book.findByPk(req.params.id)
    .then((book) => {
      if (book) {
        res.json(book);
      } else {
        res.status(404).json({ error: 'Libro no encontrado' });
      }
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

// Crear un libro
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  Book.create(req.body)
    .then((book) => res.json(book))
    .catch((err) => res.status(400).json({ error: err.message }));
});

// Modificar un libro por su id
router.put('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Book.findByPk(req.params.id)
    .then((book) => {
      if (book) {
        book.update(req.body);
        res.json(book);
      } else {
        res.status(404).json({ error: 'Libro no encontrado' });
      }
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

// Eliminar un libro por su id
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Book.findByPk(req.params.id)
    .then((book) => {
      if (book) {
        book.destroy();
        res.json({ message: 'Libro eliminado correctamente' });
      } else {
        res.status(404).json({ error: 'Libro no encontrado' });
      }
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

module.exports = router;

