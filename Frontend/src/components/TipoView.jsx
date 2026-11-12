import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import Swal from 'sweetalert2';

export const TipoView = () => {
  const [tipos, setTipos] = useState([]);
  const [form, setForm] = useState({ nombre: '', descripcion: '' });
  const [editId, setEditId] = useState(null);

  const cargarTipos = async () => {
    try {
      const { data } = await api.get('/tipos');
      setTipos(data);
    } catch (error) {
      Swal.fire('Error', 'No se pudieron cargar los tipos', 'error');
    }
  };

  useEffect(() => { cargarTipos(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await api.put(`/tipos/${editId}`, form);
        Swal.fire('Actualizado', 'Tipo actualizado correctamente', 'success');
      } else {
        await api.post('/tipos', form);
        Swal.fire('Creado', 'Tipo registrado correctamente', 'success');
      }
      setForm({ nombre: '', descripcion: '' });
      setEditId(null);
      cargarTipos();
    } catch (error) {
      Swal.fire('Error', error.response?.data?.mensaje || 'Error al guardar el tipo', 'error');
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4">
          <div className="card shadow-sm mb-4">
            <div className="card-header bg-primary text-white fw-bold">
              {editId ? 'Editar Tipo' : 'Nuevo Tipo'}
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Nombre (Película, Serie...)</label>
                  <input type="text" className="form-control" required value={form.nombre}
                    onChange={(e) => setForm({ ...form, nombre: e.target.value })} />
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
                    onClick={() => { setEditId(null); setForm({ nombre: '', descripcion: '' }); }}>
                    Cancelar
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>

        <div className="col-md-8">
          <div className="card shadow-sm">
            <div className="card-header bg-dark text-white fw-bold">Listado de Tipos</div>
            <div className="card-body table-responsive">
              <table className="table table-hover align-middle">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Descripción</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {tipos.map((t) => (
                    <tr key={t._id}>
                      <td className="fw-bold">{t.nombre}</td>
                      <td>{t.descripcion}</td>
                      <td>
                        <button className="btn btn-sm btn-warning"
                          onClick={() => { setEditId(t._id); setForm({ nombre: t.nombre, descripcion: t.descripcion }); }}>
                          Editar
                        </button>
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