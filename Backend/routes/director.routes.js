const { Router } = require('express');
const Director = require('../models/Director');
const router = Router();

// GET - Listar directores
router.get('/', async (req, res) => {
    try {
        const directores = await Director.find();
        res.json(directores);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener directores', error: error.message });
    }
});

// POST - Crear director
router.post('/', async (req, res) => {
    try {
        const { nombres, estado } = req.body;
        const director = new Director({
            nombres, estado,
            fechaCreacion: new Date(),
            fechaActualizacion: new Date()
        });
        await director.save();
        res.status(201).json(director);
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al crear director', error: error.message });
    }
});

// PUT - Actualizar director
router.put('/:id', async (req, res) => {
    try {
        const { nombres, estado } = req.body;
        const director = await Director.findByIdAndUpdate(
            req.params.id,
            { nombres, estado, fechaActualizacion: new Date() },
            { new: true, runValidators: true }
        );
        if (!director) return res.status(404).json({ mensaje: 'Director no encontrado' });
        res.json(director);
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al actualizar director', error: error.message });
    }
});

// DELETE - Eliminar director
router.delete('/:id', async (req, res) => {
    try {
        const director = await Director.findByIdAndDelete(req.params.id);
        if (!director) return res.status(404).json({ mensaje: 'Director no encontrado' });
        res.json({ mensaje: 'Director eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar director', error: error.message });
    }
});

module.exports = router;