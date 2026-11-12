import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import Swal from 'sweetalert2';

export const DirectorView = () => {
  const [directores, setDirectores] = useState([]);
  const [form, setForm] = useState({ nombres: '', estado: 'Activo' });
  const [editId, setEditId] = useState(null);

  const cargarDirectores = async () => {
    try {
      const { data } = await api.get('/directores');
      setDirectores(data);
    } catch (error) {
      Swal.fire('Error', 'No se pudieron cargar los directores', 'error');
    }
  };

  useEffect(() => { cargarDirectores(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await api.put(`/directores/${editId}`, form);
        Swal.fire('Actualizado', 'Director actualizado correctamente', 'success');
      } else {
        await api.post('/directores', form);
        Swal.fire('Creado', 'Director registrado correctamente', 'success');
      }
      setForm({ nombres: '', estado: 'Activo' });
      setEditId(null);
      cargarDirectores();
    } catch (error) {
      Swal.fire('Error', error.response?.data?.mensaje || 'No se pudo guardar el director', 'error');
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4">
          <div className="card shadow-sm mb-4">
            <div className="card-header bg-primary text-white fw-bold">
              {editId ? 'Editar Director' : 'Nuevo Director'}
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Nombres Completos</label>
                  <input type="text" className="form-control" required value={form.nombres}
                    onChange={(e) => setForm({ ...form, nombres: e.target.value })} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Estado</label>
                  <select className="form-select" value={form.estado}
                    onChange={(e) => setForm({ ...form, estado: e.target.value })}>
                    <option value="Activo">Activo</option>
                    <option value="Inactivo">Inactivo</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-success w-100">
                  {editId ? 'Actualizar' : 'Guardar'}
                </button>
                {editId && (
                  <button type="button" className="btn btn-secondary w-100 mt-2"
                    onClick={() => { setEditId(null); setForm({ nombres: '', estado: 'Activo' }); }}>
                    Cancelar
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>

        <div className="col-md-8">
          <div className="card shadow-sm">
            <div className="card-header bg-dark text-white fw-bold">Listado de Directores</div>
            <div className="card-body table-responsive">
              <table className="table table-hover align-middle">
                <thead>
                  <tr>
                    <th>Nombres</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {directores.map((d) => (
                    <tr key={d._id}>
                      <td className="fw-bold">{d.nombres}</td>
                      <td>
                        <span className={`badge ${d.estado === 'Activo' ? 'bg-success' : 'bg-danger'}`}>
                          {d.estado}
                        </span>
                      </td>
                      <td>
                        <button className="btn btn-sm btn-warning"
                          onClick={() => { setEditId(d._id); setForm({ nombres: d.nombres, estado: d.estado }); }}>
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