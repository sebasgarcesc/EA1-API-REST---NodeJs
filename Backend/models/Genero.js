const { Schema, model, models } = require('mongoose');

const GeneroSchema = new Schema({
    nombre: { type: String, required: true, trim: true },
    estado: { type: String, required: true, enum: ['Activo', 'Inactivo'], default: 'Activo' },
    descripcion: { type: String, required: true },
    fechaCreacion: { type: Date, default: Date.now },
    fechaActualizacion: { type: Date, default: Date.now }
});

module.exports = models.Genero || model('Genero', GeneroSchema);