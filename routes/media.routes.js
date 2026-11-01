const { Router } = require('express');
const Media = require('../models/Media');
const Genero = require('../models/Genero');
const Director = require('../models/Director');
const Productora = require('../models/Productora');
const Tipo = require('../models/Tipo');

const router = Router();

// Validar que Género, Director y Productora existan y estén Activos
const validarReferenciasActivas = async ({ genero, director, productora, tipo }) => {
    const [genDoc, dirDoc, prodDoc, tipoDoc] = await Promise.all([
        Genero.findOne({ _id: genero, estado: 'Activo' }),
        Director.findOne({ _id: director, estado: 'Activo' }),
        Productora.findOne({ _id: productora, estado: 'Activo' }),
        Tipo.findById(tipo)
    ]);

    if (!genDoc) throw new Error('El género seleccionado no existe o está Inactivo');
    if (!dirDoc) throw new Error('El director seleccionado no existe o está Inactivo');
    if (!prodDoc) throw new Error('La productora seleccionada no existe o está Inactiva');
    if (!tipoDoc) throw new Error('El tipo seleccionado no existe');
};

// GET - Consultar todas las películas/series con los datos de sus relaciones
router.get('/', async (req, res) => {
    try {
        const medias = await Media.find()
            .populate('genero', 'nombre estado')
            .populate('director', 'nombres estado')
            .populate('productora', 'nombre estado slogan')
            .populate('tipo', 'nombre');
        res.json(medias);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al consultar producciones', error: error.message });
    }
});

// GET por ID
router.get('/:id', async (req, res) => {
    try {
        const media = await Media.findById(req.params.id)
            .populate('genero', 'nombre')
            .populate('director', 'nombres')
            .populate('productora', 'nombre')
            .populate('tipo', 'nombre');
        if (!media) return res.status(404).json({ mensaje: 'Producción no encontrada' });
        res.json(media);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al consultar producción', error: error.message });
    }
});

// POST - Crear película o serie
router.post('/', async (req, res) => {
    try {
        const { serial, titulo, sinopsis, url, imagenPortada, anioEstreno, genero, director, productora, tipo } = req.body;

        const existeMedia = await Media.findOne({ $or: [{ serial }, { url }] });
        if (existeMedia) {
            return res.status(400).json({ mensaje: 'El serial o la URL ya están registrados' });
        }

        await validarReferenciasActivas({ genero, director, productora, tipo });

        const media = new Media({
            serial, titulo, sinopsis, url, imagenPortada, anioEstreno,
            genero, director, productora, tipo,
            fechaCreacion: new Date(),
            fechaActualizacion: new Date()
        });

        await media.save();
        res.status(201).json(media);
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});

// PUT - Actualizar película o serie
router.put('/:id', async (req, res) => {
    try {
        const { serial, titulo, sinopsis, url, imagenPortada, anioEstreno, genero, director, productora, tipo } = req.body;

        const existeDuplicado = await Media.findOne({
            _id: { $ne: req.params.id },
            $or: [{ serial }, { url }]
        });
        if (existeDuplicado) {
            return res.status(400).json({ mensaje: 'El serial o la URL ya pertenecen a otra producción' });
        }

        await validarReferenciasActivas({ genero, director, productora, tipo });

        const media = await Media.findByIdAndUpdate(
            req.params.id,
            {
                serial, titulo, sinopsis, url, imagenPortada, anioEstreno,
                genero, director, productora, tipo,
                fechaActualizacion: new Date()
            },
            { new: true, runValidators: true }
        );

        if (!media) return res.status(404).json({ mensaje: 'Producción no encontrada' });
        res.json(media);
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});

// DELETE - Borrar película o serie
router.delete('/:id', async (req, res) => {
    try {
        const media = await Media.findByIdAndDelete(req.params.id);
        if (!media) return res.status(404).json({ mensaje: 'Producción no encontrada' });
        res.json({ mensaje: 'Producción eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar producción', error: error.message });
    }
});

module.exports = router;