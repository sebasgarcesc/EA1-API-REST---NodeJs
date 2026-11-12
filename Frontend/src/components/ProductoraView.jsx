import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import Swal from 'sweetalert2';

export const ProductoraView = () => {
  const [productoras, setProductoras] = useState([]);
  const [form, setForm] = useState({ nombre: '', estado: 'Activo', slogan: '', descripcion: '' });
  const [editId, setEditId] = useState(null);

  const cargarProductoras = async () => {
    try {
      const { data } = await api.get('/productoras');
      setProductoras(data);
    } catch (error) {
      Swal.fire('Error', 'No se pudieron cargar las productoras', 'error');
    }
  };

  useEffect(() => { cargarProductoras(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await api.put(`/productoras/${editId}`, form);
        Swal.fire('Actualizado', 'Productora actualizada correctamente', 'success');
      } else {
        await api.post('/productoras', form);
        Swal.fire('Creado', 'Productora registrada correctamente', 'success');
      }
      setForm({ nombre: '', estado: 'Activo', slogan: '', descripcion: '' });
      setEditId(null);
      cargarProductoras();
    } catch (error) {
      Swal.fire('Error', error.response?.data?.mensaje || 'Error al guardar productora', 'error');
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4">
          <div className="card shadow-sm mb-4">
            <div className="card-header bg-primary text-white fw-bold">
              {editId ? 'Editar Productora' : 'Nueva Productora'}
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
                  <label className="form-label">Slogan</label>
                  <input type="text" className="form-control" required value={form.slogan}
                    onChange={(e) => setForm({ ...form, slogan: e.target.value })} />
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
                    onClick={() => { setEditId(null); setForm({ nombre: '', estado: 'Activo', slogan: '', descripcion: '' }); }}>
                    Cancelar
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>

        <div className="col-md-8">
          <div className="card shadow-sm">
            <div className="card-header bg-dark text-white fw-bold">Listado de Productoras</div>
            <div className="card-body table-responsive">
              <table className="table table-hover align-middle">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Estado</th>
                    <th>Slogan</th>
                    <th>Descripción</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {productoras.map((p) => (
                    <tr key={p._id}>
                      <td className="fw-bold">{p.nombre}</td>
                      <td>
                        <span className={`badge ${p.estado === 'Activo' ? 'bg-success' : 'bg-danger'}`}>
                          {p.estado}
                        </span>
                      </td>
                      <td><em>"{p.slogan}"</em></td>
                      <td>{p.descripcion}</td>
                      <td>
                        <button className="btn btn-sm btn-warning"
                          onClick={() => { setEditId(p._id); setForm({ nombre: p.nombre, estado: p.estado, slogan: p.slogan, descripcion: p.descripcion }); }}>
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