import React, { useState } from 'react';
import {
  Modal,
  StatusBadge,
  ActionButtons,
  PageHeader,
  SearchBar,
  EmptyState,
  ActionModal,
} from '../../components';

const EMPRESAS_MOCK = [
  { id: 1, nombre: 'Empresa Cafetalera del Norte' },
  { id: 2, nombre: 'Cooperativa de Cafés Especiales' },
  { id: 3, nombre: 'Federación Regional de Cafeteros' },
];

const GLOBAL_CAFICULTORES_POOL = [
  { id: 201, nombre: 'Juan Esteban Gómez', numeroIdentidad: '111222333', email: 'juan@email.com' },
  { id: 202, nombre: 'Diana Marcela Torres', numeroIdentidad: '444555666', email: 'diana@email.com' },
  { id: 203, nombre: 'Ricardo Arjona', numeroIdentidad: '777888999', email: 'ricardo@email.com' },
];

const GRUPOS_INICIAL = [
  { id: 1, empresaId: 1, nombre: 'Grupo Norte A', descripcion: 'Caficultores de la zona norte alta', estado: 'activo' },
  { id: 2, empresaId: 1, nombre: 'Grupo Norte B', descripcion: 'Caficultores de la zona norte baja', estado: 'activo' },
  { id: 3, empresaId: 2, nombre: 'Grupo Cooperativa 1', descripcion: 'Primer grupo de la cooperativa', estado: 'activo' },
];

const Grupos = () => {
  const [selectedEmpresa, setSelectedEmpresa] = useState('');
  const [grupos, setGrupos] = useState(GRUPOS_INICIAL);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showAsignarCaficultorModal, setShowAsignarCaficultorModal] = useState(false);
  const [editingGrupo, setEditingGrupo] = useState(null);
  const [selectedGrupoForAssign, setSelectedGrupoForAssign] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null });
  const [alertModal, setAlertModal] = useState({ isOpen: false, type: 'info', title: '', message: '' });
  
  const [formData, setFormData] = useState({ nombre: '', descripcion: '' });
  const [assignSearch, setAssignSearch] = useState('');
  const [selectedCaficultorToAssign, setSelectedCaficultorToAssign] = useState(null);

  const handleCreate = () => {
    setEditingGrupo(null);
    setFormData({ nombre: '', descripcion: '' });
    setShowCreateModal(true);
  };

  const handleEdit = (grupo) => {
    setEditingGrupo(grupo);
    setFormData({ nombre: grupo.nombre, descripcion: grupo.descripcion });
    setShowCreateModal(true);
  };

  const handleSave = () => {
    if (!formData.nombre.trim() || !formData.descripcion.trim()) {
      setAlertModal({ isOpen: true, type: 'danger', title: 'Error', message: 'Por favor complete todos los campos' });
      return;
    }

    if (editingGrupo) {
      setGrupos(prev => prev.map(g => g.id === editingGrupo.id ? { ...g, ...formData } : g));
      setAlertModal({ isOpen: true, type: 'success', title: 'Éxito', message: 'Grupo actualizado exitosamente' });
    } else {
      const newGroup = {
        id: Date.now(),
        empresaId: parseInt(selectedEmpresa),
        ...formData,
        estado: 'activo'
      };
      setGrupos(prev => [...prev, newGroup]);
      setAlertModal({ isOpen: true, type: 'success', title: 'Éxito', message: 'Grupo creado exitosamente' });
    }
    
    setShowCreateModal(false);
  };

  const handleDelete = (id) => {
    setDeleteModal({ isOpen: true, id });
  };

  const confirmDelete = () => {
    if (deleteModal.id) {
      setGrupos(prev => prev.filter(g => g.id !== deleteModal.id));
      setDeleteModal({ isOpen: false, id: null });
    }
  };

  const handleToggleBlock = (id) => {
    setGrupos(prev => prev.map(g => {
      if (g.id === id) {
        const newStatus = g.estado === 'activo' ? 'inactivo' : 'activo';
        if (newStatus === 'inactivo') {
          setAlertModal({ isOpen: true, type: 'warning', title: 'Info', message: 'Bloqueado exitosamente' });
        } else {
          setAlertModal({ isOpen: true, type: 'success', title: 'Éxito', message: 'Desbloqueado exitosamente' });
        }
        return { ...g, estado: newStatus };
      }
      return g;
    }));
  };

  const handleOpenAssign = (grupo) => {
    setSelectedGrupoForAssign(grupo);
    setAssignSearch('');
    setSelectedCaficultorToAssign(null);
    setShowAsignarCaficultorModal(true);
  };

  const handleConfirmAssign = () => {
    if (!selectedCaficultorToAssign) {
      setAlertModal({ isOpen: true, type: 'danger', title: 'Error', message: 'Por favor selecciona un caficultor para asignar' });
      return;
    }
    setAlertModal({ isOpen: true, type: 'success', title: 'Éxito', message: `Caficultor "${selectedCaficultorToAssign.nombre}" asignado al grupo "${selectedGrupoForAssign.nombre}" exitosamente` });
    setShowAsignarCaficultorModal(false);
  };

  const filtered = grupos.filter(g => 
    g.empresaId === parseInt(selectedEmpresa) &&
    (g.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || 
     g.descripcion.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredPool = GLOBAL_CAFICULTORES_POOL.filter(c => 
    c.nombre.toLowerCase().includes(assignSearch.toLowerCase()) ||
    c.numeroIdentidad.includes(assignSearch)
  );

  return (
    <div className="space-y-6">
      {/* Selector de Empresa */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Grupos de Caficultores</h1>
          <p className="text-gray-500 text-sm">Organiza a tus productores en grupos estratégicos por empresa.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <label className="text-sm font-medium text-gray-700">Empresa:</label>
          <select 
            value={selectedEmpresa}
            onChange={(e) => setSelectedEmpresa(e.target.value)}
            className="w-full sm:w-64 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cafe-vino-500 outline-none text-sm"
          >
            <option value="">Seleccione una empresa...</option>
            {EMPRESAS_MOCK.map(emp => (
              <option key={emp.id} value={emp.id}>{emp.nombre}</option>
            ))}
          </select>
        </div>
      </div>

      {!selectedEmpresa ? (
        <div className="bg-white py-16 px-4 rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">Debe seleccionar una empresa</h3>
          <p className="text-gray-500 max-w-sm">Para gestionar grupos, selecciona primero la organización a la que pertenecen.</p>
        </div>
      ) : (
        <>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <SearchBar
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar grupo..."
              className="w-full max-w-xs"
            />
            
            <button
              onClick={handleCreate}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-cafe-vino-600 rounded-lg hover:bg-cafe-vino-700 transition-colors shadow-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Crear Nuevo Grupo
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-100">
                <thead className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-4 text-left">Nombre del Grupo</th>
                    <th className="px-6 py-4 text-left">Descripción</th>
                    <th className="px-6 py-4 text-left">Estado</th>
                    <th className="px-6 py-4 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filtered.map((g) => (
                    <tr key={g.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-medium text-gray-900">{g.nombre}</span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                        {g.descripcion}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge status={g.estado} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-2 text-cafe-vino-600">
                          <button 
                            onClick={() => handleOpenAssign(g)}
                            title="Asignar/Ver Caficultores"
                            className="p-1 hover:bg-cafe-vino-50 rounded transition-colors"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                          </button>
                          <button 
                            onClick={() => handleEdit(g)}
                            title="Editar Grupo"
                            className="p-1 hover:bg-cafe-vino-50 rounded transition-colors"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button 
                            onClick={() => handleToggleBlock(g.id)}
                            title={g.estado === 'activo' ? 'Bloquear' : 'Desbloquear'}
                            className="p-1 hover:bg-cafe-vino-50 rounded transition-colors"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                          </button>
                          <button 
                            onClick={() => handleDelete(g.id)}
                            title="Eliminar"
                            className="p-1 hover:bg-cafe-vino-50 rounded transition-colors text-red-600"
                          >
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
              {filtered.length === 0 && (
                <EmptyState message="No se encontraron grupos para esta selección" searchTerm={searchTerm} />
              )}
            </div>
          </div>
        </>
      )}

      {/* Modal Crear/Editar Grupo */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title={editingGrupo ? 'Editar Grupo' : 'Crear Nuevo Grupo'}
        size="md"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del Grupo</label>
            <input 
              type="text"
              value={formData.nombre}
              onChange={(e) => setFormData({...formData, nombre: e.target.value})}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cafe-vino-500 outline-none text-sm"
              placeholder="Ej: Productores de Exportación"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
            <textarea 
              rows={3}
              value={formData.descripcion}
              onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cafe-vino-500 outline-none text-sm"
              placeholder="Describa el propósito de este grupo..."
            />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button
              onClick={() => setShowCreateModal(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 text-sm font-medium text-white bg-cafe-vino-600 rounded-lg hover:bg-cafe-vino-700"
            >
              {editingGrupo ? 'Actualizar' : 'Crear Grupo'}
            </button>
          </div>
        </div>
      </Modal>

      {/* Modal Asignar Caficultor */}
      <Modal
        isOpen={showAsignarCaficultorModal}
        onClose={() => setShowAsignarCaficultorModal(false)}
        title={`Asignar Caficultor a: ${selectedGrupoForAssign?.nombre}`}
        size="md"
      >
        <div className="space-y-4">
          <div className="relative">
            <input 
              type="text"
              value={assignSearch}
              onChange={(e) => setAssignSearch(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cafe-vino-500 outline-none text-sm pl-10"
              placeholder="Buscar por nombre o identificación..."
            />
            <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <div className="max-h-60 overflow-y-auto space-y-2 border border-gray-100 rounded-lg p-2 bg-gray-50">
            {filteredPool.length > 0 ? (
              filteredPool.map(c => (
                <div 
                  key={c.id} 
                  onClick={() => setSelectedCaficultorToAssign(c)}
                  className={`
                    p-3 rounded-lg flex items-center justify-between cursor-pointer transition-all
                    ${selectedCaficultorToAssign?.id === c.id 
                      ? 'bg-cafe-vino-100 border-cafe-vino-300 border shadow-sm' 
                      : 'bg-white border-transparent border hover:border-gray-300'
                    }
                  `}
                >
                  <div>
                    <div className="text-sm font-medium text-gray-900">{c.nombre}</div>
                    <div className="text-xs text-gray-500">{c.numeroIdentidad}</div>
                  </div>
                  {selectedCaficultorToAssign?.id === c.id && (
                    <svg className="w-5 h-5 text-cafe-vino-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-4 text-sm text-gray-500">No se encontraron caficultores disponibles</div>
            )}
          </div>

          <div className="flex justify-between gap-3 pt-4 border-t">
            <button
              onClick={() => setShowAsignarCaficultorModal(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cerrar
            </button>
            <button
              onClick={handleConfirmAssign}
              disabled={!selectedCaficultorToAssign}
              className={`
                px-4 py-2 text-sm font-medium text-white rounded-lg transition-all
                ${selectedCaficultorToAssign 
                  ? 'bg-cafe-vino-600 hover:bg-cafe-vino-700' 
                  : 'bg-gray-300 cursor-not-allowed'
                }
              `}
            >
              Asignar Caficultor
            </button>
          </div>
        </div>
      </Modal>

      {/* Modal Confirmar Eliminación */}
      <ActionModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, id: null })}
        onAction={confirmDelete}
        title="Eliminar Grupo"
        description="¿Estás seguro de que deseas eliminar este grupo? Esta acción no se puede deshacer."
        actionText="Eliminar"
        cancelText="Cancelar"
        icon="danger"
        actionColor="danger"
      />

      <ActionModal
        isOpen={alertModal.isOpen}
        onClose={() => setAlertModal({ ...alertModal, isOpen: false })}
        onAction={() => setAlertModal({ ...alertModal, isOpen: false })}
        title={alertModal.title}
        description={alertModal.message}
        actionText="Aceptar"
        cancelText={null}
        icon={alertModal.type}
        actionColor="primary"
      />
    </div>
  );
};

export default Grupos;
