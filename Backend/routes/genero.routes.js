const { Router } = require('express');
const Genero = require('../models/Genero');
const router = Router();

// GET - Listar todos los géneros
router.get('/', async (req, res) => {
    try {
        const generos = await Genero.find();
        res.json(generos);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener géneros', error: error.message });
    }
});

// POST - Crear género
router.post('/', async (req, res) => {
    try {
        const { nombre, estado, descripcion } = req.body;
        const genero = new Genero({
            nombre, estado, descripcion,
            fechaCreacion: new Date(),
            fechaActualizacion: new Date()
        });
        await genero.save();
        res.status(201).json(genero);
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al crear género', error: error.message });
    }
});

// PUT - Actualizar género
router.put('/:id', async (req, res) => {
    try {
        const { nombre, estado, descripcion } = req.body;
        const genero = await Genero.findByIdAndUpdate(
            req.params.id,
            { nombre, estado, descripcion, fechaActualizacion: new Date() },
            { new: true, runValidators: true }
        );
        if (!genero) return res.status(404).json({ mensaje: 'Género no encontrado' });
        res.json(genero);
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al actualizar género', error: error.message });
    }
});

// DELETE - Eliminar género
router.delete('/:id', async (req, res) => {
    try {
        const genero = await Genero.findByIdAndDelete(req.params.id);
        if (!genero) return res.status(404).json({ mensaje: 'Género no encontrado' });
        res.json({ mensaje: 'Género eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar género', error: error.message });
    }
});

module.exports = router;