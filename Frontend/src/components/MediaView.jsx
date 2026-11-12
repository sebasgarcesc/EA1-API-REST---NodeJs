import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import Swal from 'sweetalert2';

export const MediaView = () => {
  const [medias, setMedias] = useState([]);
  const [generos, setGeneros] = useState([]);
  const [directores, setDirectores] = useState([]);
  const [productoras, setProductoras] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [editId, setEditId] = useState(null);

  const initialForm = {
    serial: '', titulo: '', sinopsis: '', url: '',
    imagenPortada: '', anioEstreno: 2024,
    genero: '', director: '', productora: '', tipo: ''
  };
  const [form, setForm] = useState(initialForm);

  const cargarDatos = async () => {
    try {
      const [resM, resG, resD, resP, resT] = await Promise.all([
        api.get('/medias'),
        api.get('/generos'),
        api.get('/directores'),
        api.get('/productoras'),
        api.get('/tipos')
      ]);
      setMedias(resM.data);
      // Filtramos solo los Activos según exige el Caso de Estudio
      setGeneros(resG.data.filter(g => g.estado === 'Activo'));
      setDirectores(resD.data.filter(d => d.estado === 'Activo'));
      setProductoras(resP.data.filter(p => p.estado === 'Activo'));
      setTipos(resT.data);
    } catch (error) {
      Swal.fire('Error', 'Error al conectar con el servidor Backend', 'error');
    }
  };

  useEffect(() => { cargarDatos(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await api.put(`/medias/${editId}`, form);
        Swal.fire('Actualizado', 'Producción actualizada correctamente', 'success');
      } else {
        await api.post('/medias', form);
        Swal.fire('Creado', 'Producción agregada exitosamente', 'success');
      }
      setForm(initialForm);
      setEditId(null);
      cargarDatos();
    } catch (error) {
      Swal.fire('Error', error.response?.data?.mensaje || 'Verifica los datos ingresados', 'error');
    }
  };

  const handleEdit = (m) => {
    setEditId(m._id);
    setForm({
      serial: m.serial,
      titulo: m.titulo,
      sinopsis: m.sinopsis,
      url: m.url,
      imagenPortada: m.imagenPortada,
      anioEstreno: m.anioEstreno,
      genero: m.genero?._id || m.genero,
      director: m.director?._id || m.director,
      productora: m.productora?._id || m.productora,
      tipo: m.tipo?._id || m.tipo
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: '¿Eliminar producción?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, borrar',
      cancelButtonText: 'Cancelar'
    });
    if (confirm.isConfirmed) {
      try {
        await api.delete(`/medias/${id}`);
        Swal.fire('Eliminado', 'La producción ha sido borrada', 'success');
        cargarDatos();
      } catch (error) {
        Swal.fire('Error', 'No se pudo eliminar', 'error');
      }
    }
  };

  return (
    <div className="container mb-5">
      {/* Formulario Bootstrap */}
      <div className="card shadow-sm mb-5">
        <div className="card-header bg-primary text-white fw-bold">
          {editId ? '✏️ Editar Película / Serie' : '➕ Registrar Nueva Película / Serie'}
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-2">
                <label className="form-label">Serial</label>
                <input type="text" className="form-control" placeholder="PEL-001" required
                  value={form.serial} onChange={(e) => setForm({ ...form, serial: e.target.value })} />
              </div>
              <div className="col-md-5">
                <label className="form-label">Título</label>
                <input type="text" className="form-control" required
                  value={form.titulo} onChange={(e) => setForm({ ...form, titulo: e.target.value })} />
              </div>
              <div className="col-md-2">
                <label className="form-label">Año Estreno</label>
                <input type="number" className="form-control" required
                  value={form.anioEstreno} onChange={(e) => setForm({ ...form, anioEstreno: e.target.value })} />
              </div>
              <div className="col-md-3">
                <label className="form-label">Tipo</label>
                <select className="form-select" required value={form.tipo}
                  onChange={(e) => setForm({ ...form, tipo: e.target.value })}>
                  <option value="">Seleccione...</option>
                  {tipos.map(t => <option key={t._id} value={t._id}>{t.nombre}</option>)}
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label">URL de la Película</label>
                <input type="url" className="form-control" required
                  value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} />
              </div>
              <div className="col-md-6">
                <label className="form-label">URL Imagen de Portada</label>
                <input type="url" className="form-control" required
                  value={form.imagenPortada} onChange={(e) => setForm({ ...form, imagenPortada: e.target.value })} />
              </div>

              <div className="col-md-4">
                <label className="form-label">Género (Activos)</label>
                <select className="form-select" required value={form.genero}
                  onChange={(e) => setForm({ ...form, genero: e.target.value })}>
                  <option value="">Seleccione...</option>
                  {generos.map(g => <option key={g._id} value={g._id}>{g.nombre}</option>)}
                </select>
              </div>
              <div className="col-md-4">
                <label className="form-label">Director (Activos)</label>
                <select className="form-select" required value={form.director}
                  onChange={(e) => setForm({ ...form, director: e.target.value })}>
                  <option value="">Seleccione...</option>
                  {directores.map(d => <option key={d._id} value={d._id}>{d.nombres}</option>)}
                </select>
              </div>
              <div className="col-md-4">
                <label className="form-label">Productora (Activas)</label>
                <select className="form-select" required value={form.productora}
                  onChange={(e) => setForm({ ...form, productora: e.target.value })}>
                  <option value="">Seleccione...</option>
                  {productoras.map(p => <option key={p._id} value={p._id}>{p.nombre}</option>)}
                </select>
              </div>

              <div className="col-12">
                <label className="form-label">Sinopsis</label>
                <textarea className="form-control" rows="2" required
                  value={form.sinopsis} onChange={(e) => setForm({ ...form, sinopsis: e.target.value })}></textarea>
              </div>

              <div className="col-12 d-flex gap-2">
                <button type="submit" className="btn btn-success">
                  {editId ? 'Actualizar Producción' : 'Guardar Producción'}
                </button>
                {editId && (
                  <button type="button" className="btn btn-secondary"
                    onClick={() => { setEditId(null); setForm(initialForm); }}>
                    Cancelar Edición
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Catálogo de Películas y Series estilo Cuevana */}
      <h3 className="mb-3 fw-bold">🍿 Catálogo de Películas y Series</h3>
      <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
        {medias.map((m) => (
          <div className="col" key={m._id}>
            <div className="card h-100 bg-dark text-white shadow border-0">
              <img
                src={m.imagenPortada}
                className="card-img-top"
                alt={m.titulo}
                style={{ height: '320px', objectFit: 'cover' }}
                onError={(e) => { e.target.src = 'https://via.placeholder.com/300x450?text=Sin+Portada'; }}
              />
              <div className="card-body d-flex flex-column">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="badge bg-info text-dark">{m.tipo?.nombre || 'Media'}</span>
                  <span className="badge bg-secondary">{m.anioEstreno}</span>
                </div>
                <h5 className="card-title fw-bold text-warning">{m.titulo}</h5>
                <p className="card-text small text-light flex-grow-1">{m.sinopsis}</p>
                <div className="small text-secondary mb-3">
                  <div><strong>Género:</strong> {m.genero?.nombre}</div>
                  <div><strong>Director:</strong> {m.director?.nombres}</div>
                  <div><strong>Productora:</strong> {m.productora?.nombre}</div>
                </div>
                <div className="d-flex gap-2 mt-auto">
                  <a href={m.url} target="_blank" rel="noreferrer" className="btn btn-sm btn-outline-info flex-grow-1">
                    ▶ Ver Online
                  </a>
                  <button className="btn btn-sm btn-warning" onClick={() => handleEdit(m)}>✏️</button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(m._id)}>🗑️</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};