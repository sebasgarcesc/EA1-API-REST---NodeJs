const { Router } = require('express');
const Tipo = require('../models/Tipo');
const router = Router();

// GET - Listar tipos
router.get('/', async (req, res) => {
    try {
        const tipos = await Tipo.find();
        res.json(tipos);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener tipos', error: error.message });
    }
});

// POST - Crear tipo
router.post('/', async (req, res) => {
    try {
        const { nombre, descripcion } = req.body;
        const tipo = new Tipo({
            nombre, descripcion,
            fechaCreacion: new Date(),
            fechaActualizacion: new Date()
        });
        await tipo.save();
        res.status(201).json(tipo);
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al crear tipo', error: error.message });
    }
});

// PUT - Actualizar tipo
router.put('/:id', async (req, res) => {
    try {
        const { nombre, descripcion } = req.body;
        const tipo = await Tipo.findByIdAndUpdate(
            req.params.id,
            { nombre, descripcion, fechaActualizacion: new Date() },
            { new: true, runValidators: true }
        );
        if (!tipo) return res.status(404).json({ mensaje: 'Tipo no encontrado' });
        res.json(tipo);
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al actualizar tipo', error: error.message });
    }
});

// DELETE - Eliminar tipo
router.delete('/:id', async (req, res) => {
    try {
        const tipo = await Tipo.findByIdAndDelete(req.params.id);
        if (!tipo) return res.status(404).json({ mensaje: 'Tipo no encontrado' });
        res.json({ mensaje: 'Tipo eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar tipo', error: error.message });
    }
});

module.exports = router;