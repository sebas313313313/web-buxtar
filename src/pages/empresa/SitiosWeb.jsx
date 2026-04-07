import React, { useState, useMemo } from 'react';
import {
  Modal,
  SearchBar,
  EmptyState,
  ActionModal,
  Toast,
} from '../../components';
import { useToast } from '../../hooks/useToast';

const GRUPOS_MOCK = [
  { id: 1, nombre: 'Grupo Productores Especiales' },
  { id: 2, nombre: 'Pequeños Caficultores Occidente' },
  { id: 3, nombre: 'Mujeres Cafeteras' },
];

const SITIOS_INICIAL = [
  { id: 1, titulo: 'Manual de Buenas Prácticas', url: 'https://ejemplo.com/manual-caficultura', grupoId: null, paraTodos: true },
  { id: 2, titulo: 'Precios del Café Hoy', url: 'https://ejemplo.com/precios', grupoId: 1, paraTodos: false },
  { id: 3, titulo: 'Guía de Fertilización Orgánica', url: 'https://ejemplo.com/guia-organica', grupoId: 2, paraTodos: false },
];

const SitiosWeb = () => {
  const { toasts, addToast, removeToast } = useToast();
  const [sitios, setSitios] = useState(SITIOS_INICIAL);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Estados para modales
  const [showFormModal, setShowFormModal] = useState(false);
  const [editingSitio, setEditingSitio] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null });
  
  // Datos de formulario
  const [formData, setFormData] = useState({
    titulo: '',
    url: '',
    paraTodos: true,
    grupoId: ''
  });

  // Filtrar sitios por búsqueda
  const filteredSitios = useMemo(() => {
    return sitios.filter(s => 
      s.titulo.toLowerCase().includes(searchTerm.toLowerCase()) || 
      s.url.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [sitios, searchTerm]);

  // Handlers para creación y edición
  const handleOpenCreate = () => {
    setEditingSitio(null);
    setFormData({ titulo: '', url: '', paraTodos: true, grupoId: '' });
    setShowFormModal(true);
  };

  const handleOpenEdit = (sitio) => {
    setEditingSitio(sitio);
    setFormData({
      titulo: sitio.titulo,
      url: sitio.url,
      paraTodos: sitio.paraTodos,
      grupoId: sitio.grupoId || ''
    });
    setShowFormModal(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.titulo.trim() || !formData.url.trim()) {
      addToast('El título y la URL son obligatorios', 'warning');
      return;
    }

    if (!formData.paraTodos && !formData.grupoId) {
      addToast('Debes seleccionar un grupo específico', 'warning');
      return;
    }

    if (editingSitio) {
      setSitios(sitios.map(s => s.id === editingSitio.id ? { ...s, ...formData } : s));
      addToast('Sitio web actualizado correctamente', 'success');
    } else {
      const nuevoSitio = {
        id: Date.now(),
        ...formData
      };
      setSitios([...sitios, nuevoSitio]);
      addToast('Nuevo sitio web asignado con éxito', 'success');
    }
    setShowFormModal(false);
  };

  const handleOpenDelete = (id) => setDeleteModal({ isOpen: true, id });
  const confirmDelete = () => {
    setSitios(sitios.filter(s => s.id !== deleteModal.id));
    setDeleteModal({ isOpen: false, id: null });
    addToast('Sitio web eliminado correctamente', 'success');
  };

  const handleView = (url) => {
    window.open(url, '_blank');
  };

  return (
    <div className="space-y-6">
      {/* Cabecera */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sitios Web</h1>
          <p className="text-gray-500 text-sm">Gestiona enlaces de interés y documentación para tus grupos.</p>
        </div>
        
        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-brand-vino rounded-lg hover:opacity-90 transition-all shadow-md group"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Crear Sitio Web
        </button>
      </div>

      {/* Buscador */}
      <div className="flex justify-start">
        <SearchBar
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar sitio por título o URL..."
          className="w-full max-w-sm"
        />
      </div>

      {/* Tabla de Resultados */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-100">
            <thead className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 text-left">Título del Sitio</th>
                <th className="px-6 py-4 text-left">URL / Enlace</th>
                <th className="px-6 py-4 text-left">Grupo Asignado</th>
                <th className="px-6 py-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredSitios.map((s) => (
                <tr key={s.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="text-sm font-bold text-gray-900">{s.titulo}</div>
                  </td>
                  <td className="px-6 py-4">
                    <button 
                      onClick={() => handleView(s.url)}
                      className="text-sm text-blue-600 hover:text-blue-800 hover:underline max-w-xs truncate block"
                    >
                      {s.url}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${s.paraTodos ? 'bg-brand-vino bg-opacity-10 text-brand-vino' : 'bg-green-100 text-green-800'}`}>
                      {s.paraTodos ? 'Todos los grupos' : GRUPOS_MOCK.find(g => g.id === s.grupoId)?.nombre || 'Sin asignar'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button 
                        onClick={() => handleView(s.url)}
                        title="Ver Sitio"
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      
                      <button onClick={() => handleOpenEdit(s)} className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      
                      <button onClick={() => handleOpenDelete(s.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredSitios.length === 0 && <EmptyState message="No hay sitios web asignados." searchTerm={searchTerm} />}
        </div>
      </div>

      {/* Modal Formulario */}
      <Modal
        isOpen={showFormModal}
        onClose={() => setShowFormModal(false)}
        title={editingSitio ? "Actualizar Sitio Web" : "Crear / Asignar Sitio Web"}
        size="md"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Título del Sitio</label>
            <input 
              type="text" 
              value={formData.titulo} 
              onChange={(e) => setFormData({...formData, titulo: e.target.value})}
              placeholder="Ej: Manual de Insumos"
              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-brand-vino"
              required
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">URL del Sitio</label>
            <input 
              type="url" 
              value={formData.url} 
              onChange={(e) => setFormData({...formData, url: e.target.value})}
              placeholder="https://ejemplo.com"
              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-brand-vino"
              required
            />
          </div>

          <div className="p-4 bg-gray-50 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-gray-700">Asignar a todos los grupos</label>
              <button 
                type="button"
                onClick={() => setFormData({...formData, paraTodos: !formData.paraTodos})}
                className={`w-12 h-6 rounded-full transition-colors relative ${formData.paraTodos ? 'bg-brand-vino' : 'bg-gray-300'}`}
              >
                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${formData.paraTodos ? 'right-1' : 'left-1'}`}></div>
              </button>
            </div>

            {!formData.paraTodos && (
              <div className="space-y-1 animate-in fade-in slide-in-from-top-2">
                <label className="text-sm font-medium text-gray-700">Seleccionar Grupo Específico</label>
                <select 
                  value={formData.grupoId} 
                  onChange={(e) => setFormData({...formData, grupoId: parseInt(e.target.value)})}
                  className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-brand-vino"
                  required
                >
                  <option value="">Seleccione un grupo...</option>
                  {GRUPOS_MOCK.map(g => (
                    <option key={g.id} value={g.id}>{g.nombre}</option>
                  ))}
                </select>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={() => setShowFormModal(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cerrar
            </button>
            <button
              type="submit"
              className="px-6 py-2 text-sm font-medium text-white bg-brand-vino rounded-lg hover:opacity-90 shadow-md"
            >
              {editingSitio ? "Actualizar" : "Asignar"}
            </button>
          </div>
        </form>
      </Modal>

      {/* Modal Eliminación */}
      <ActionModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, id: null })}
        onAction={confirmDelete}
        title="Eliminar Enlace Digital"
        description="¿Estás seguro de que deseas retirar este sitio web? Los grupos asignados ya no podrán visualizarlo."
        actionText="Eliminar"
        icon="danger"
        actionColor="danger"
      />

      {/* Toasts */}
      <div className="fixed top-0 right-0 z-[60]">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            isVisible={toast.isVisible}
            onClose={() => removeToast(toast.id)}
            duration={3000}
          />
        ))}
      </div>
    </div>
  );
};

export default SitiosWeb;
