const { Schema, model } = require('mongoose');

const ProductoraSchema = new Schema({
    nombre: { type: String, required: true, trim: true },
    estado: { type: String, required: true, enum: ['Activo', 'Inactivo'], default: 'Activo' },
    slogan: { type: String, required: true },
    descripcion: { type: String, required: true },
    fechaCreacion: { type: Date, default: Date.now },
    fechaActualizacion: { type: Date, default: Date.now }
});

module.exports = model('Productora', ProductoraSchema);