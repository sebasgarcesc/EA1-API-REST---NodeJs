import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import Swal from 'sweetalert2';

export const GeneroView = () => {
  const [generos, setGeneros] = useState([]);
  const [form, setForm] = useState({ nombre: '', estado: 'Activo', descripcion: '' });
  const [editId, setEditId] = useState(null);

  const cargarGeneros = async () => {
    try {
      const { data } = await api.get('/generos');
      setGeneros(data);
    } catch (error) {
      Swal.fire('Error', 'No se pudieron cargar los géneros. Verifica que el Backend esté encendido.', 'error');
    }
  };

  useEffect(() => { cargarGeneros(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await api.put(`/generos/${editId}`, form);
        Swal.fire('Actualizado', 'Género actualizado correctamente', 'success');
      } else {
        await api.post('/generos', form);
        Swal.fire('Creado', 'Género registrado correctamente', 'success');
      }
      setForm({ nombre: '', estado: 'Activo', descripcion: '' });
      setEditId(null);
      cargarGeneros();
    } catch (error) {
      Swal.fire('Error', error.response?.data?.mensaje || 'Error al guardar', 'error');
    }
  };

  const handleEdit = (item) => {
    setEditId(item._id);
    setForm({ nombre: item.nombre, estado: item.estado, descripcion: item.descripcion });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4">
          <div className="card shadow-sm mb-4">
            <div className="card-header bg-primary text-white fw-bold">
              {editId ? 'Editar Género' : 'Nuevo Género'}
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Nombre</label>
                  <input type="text" className="form-control" required value={form.nombre}
                    onChange={(e) => setForm({ ...form, nombre: e.target.value })} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Estado</label>
                  <select className="form-select" value={form.estado}
                    onChange={(e) => setForm({ ...form, estado: e.target.value })}>
                    <option value="Activo">Activo</option>
                    <option value="Inactivo">Inactivo</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Descripción</label>
                  <textarea className="form-control" rows="2" required value={form.descripcion}
                    onChange={(e) => setForm({ ...form, descripcion: e.target.value })}></textarea>
                </div>
                <button type="submit" className="btn btn-success w-100">
                  {editId ? 'Actualizar' : 'Guardar'}
                </button>
                {editId && (
                  <button type="button" className="btn btn-secondary w-100 mt-2"
                    onClick={() => { setEditId(null); setForm({ nombre: '', estado: 'Activo', descripcion: '' }); }}>
                    Cancelar
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>

        <div className="col-md-8">
          <div className="card shadow-sm">
            <div className="card-header bg-dark text-white fw-bold">Listado de Géneros</div>
            <div className="card-body table-responsive">
              <table className="table table-hover align-middle">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Estado</th>
                    <th>Descripción</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {generos.map((g) => (
                    <tr key={g._id}>
                      <td className="fw-bold">{g.nombre}</td>
                      <td>
                        <span className={`badge ${g.estado === 'Activo' ? 'bg-success' : 'bg-danger'}`}>
                          {g.estado}
                        </span>
                      </td>
                      <td>{g.descripcion}</td>
                      <td>
                        <button className="btn btn-sm btn-warning" onClick={() => handleEdit(g)}>Editar</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};