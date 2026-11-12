const { Router } = require('express');
const Productora = require('../models/Productora');
const router = Router();

// GET - Listar productoras
router.get('/', async (req, res) => {
    try {
        const productoras = await Productora.find();
        res.json(productoras);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener productoras', error: error.message });
    }
});

// POST - Crear productora
router.post('/', async (req, res) => {
    try {
        const { nombre, estado, slogan, descripcion } = req.body;
        const productora = new Productora({
            nombre, estado, slogan, descripcion,
            fechaCreacion: new Date(),
            fechaActualizacion: new Date()
        });
        await productora.save();
        res.status(201).json(productora);
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al crear productora', error: error.message });
    }
});

// PUT - Actualizar productora
router.put('/:id', async (req, res) => {
    try {
        const { nombre, estado, slogan, descripcion } = req.body;
        const productora = await Productora.findByIdAndUpdate(
            req.params.id,
            { nombre, estado, slogan, descripcion, fechaActualizacion: new Date() },
            { new: true, runValidators: true }
        );
        if (!productora) return res.status(404).json({ mensaje: 'Productora no encontrada' });
        res.json(productora);
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al actualizar productora', error: error.message });
    }
});

// DELETE - Eliminar productora
router.delete('/:id', async (req, res) => {
    try {
        const productora = await Productora.findByIdAndDelete(req.params.id);
        if (!productora) return res.status(404).json({ mensaje: 'Productora no encontrada' });
        res.json({ mensaje: 'Productora eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar productora', error: error.message });
    }
});

module.exports = router;