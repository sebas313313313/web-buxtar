import React, { useState, useMemo } from 'react';
import {
  Modal,
  StatusBadge,
  ActionButtons,
  SearchBar,
  EmptyState,
  ActionModal,
  Toast,
} from '../../components';
import { useToast } from '../../hooks/useToast';

const GRUPOS_INICIAL = [
  { id: 1, nombre: 'Grupo Productores Especiales', descripcion: 'Caficultores con certificaciones de exportación', estado: 'activo' },
  { id: 2, nombre: 'Pequeños Caficultores Occidente', descripcion: 'Fincas de menos de 1 hectárea en la zona occidente', estado: 'activo' },
  { id: 3, nombre: 'Mujeres Cafeteras', descripcion: 'Grupo de empoderamiento femenino en la caficultura', estado: 'activo' },
];

const CAFICULTORES_DISPONIBLES = [
  { id: 101, nombre: 'Juan Esteban Gómez', cedula: '111222333' },
  { id: 102, nombre: 'Diana Marcela Torres', cedula: '444555666' },
  { id: 103, nombre: 'Ricardo Arjona', cedula: '777888999' },
  { id: 104, nombre: 'Sofía Vergara', cedula: '888999000' },
  { id: 105, nombre: 'Carlos Vives', cedula: '555666777' },
];

const MIEMBROS_INICIAL = [
  { grupoId: 1, caficultores: [101, 102] },
  { grupoId: 2, caficultores: [103] },
  { grupoId: 3, caficultores: [104, 105] },
];

const GrupoDeCaficultores = () => {
  const { toasts, addToast, removeToast } = useToast();
  const [grupos, setGrupos] = useState(GRUPOS_INICIAL);
  const [miembros, setMiembros] = useState(MIEMBROS_INICIAL);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Estados para modales
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [editingGrupo, setEditingGrupo] = useState(null);
  const [selectedGrupoForAssign, setSelectedGrupoForAssign] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null });
  const [blockModal, setBlockModal] = useState({ isOpen: false, grupo: null });
  
  // Datos de formulario
  const [formData, setFormData] = useState({ nombre: '', descripcion: '' });
  const [assignSearch, setAssignSearch] = useState('');
  const [selectedToAssign, setSelectedToAssign] = useState([]);

  // Filtrar grupos por búsqueda
  const filteredGrupos = useMemo(() => {
    return grupos.filter(g => 
      g.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || 
      g.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [grupos, searchTerm]);

  // Handlers para creación y edición
  const handleOpenCreate = () => {
    setEditingGrupo(null);
    setFormData({ nombre: '', descripcion: '' });
    setShowCreateModal(true);
  };

  const handleOpenEdit = (grupo) => {
    setEditingGrupo(grupo);
    setFormData({ nombre: grupo.nombre, descripcion: grupo.descripcion });
    setShowCreateModal(true);
  };

  const handleSaveGrupo = (e) => {
    e.preventDefault();
    if (!formData.nombre.trim()) {
      addToast('El nombre del grupo es obligatorio', 'warning');
      return;
    }

    if (editingGrupo) {
      setGrupos(grupos.map(g => g.id === editingGrupo.id ? { ...g, ...formData } : g));
      addToast('Grupo actualizado correctamente', 'success');
    } else {
      const newGroup = {
        id: Date.now(),
        ...formData,
        estado: 'activo'
      };
      setGrupos([...grupos, newGroup]);
      setMiembros([...miembros, { grupoId: newGroup.id, caficultores: [] }]);
      addToast('Nuevo grupo creado con éxito', 'success');
    }
    setShowCreateModal(false);
  };

  // Handlers para bloqueo y eliminación
  const handleOpenBlock = (grupo) => setBlockModal({ isOpen: true, grupo });
  const confirmToggleBlock = () => {
    const { grupo } = blockModal;
    const newStatus = grupo.estado === 'activo' ? 'inactivo' : 'activo';
    setGrupos(grupos.map(g => g.id === grupo.id ? { ...g, estado: newStatus } : g));
    setBlockModal({ isOpen: false, grupo: null });
    addToast(`Grupo ${newStatus === 'activo' ? 'habilitado' : 'bloqueado'} con éxito`, 'success');
  };

  const handleOpenDelete = (id) => setDeleteModal({ isOpen: true, id });
  const confirmDelete = () => {
    setGrupos(grupos.filter(g => g.id !== deleteModal.id));
    setMiembros(miembros.filter(m => m.grupoId !== deleteModal.id));
    setDeleteModal({ isOpen: false, id: null });
    addToast('Grupo eliminado permanentemente', 'success');
  };

  // Gestión avanzada de miembros
  const handleOpenAssign = (grupo) => {
    setSelectedGrupoForAssign(grupo);
    setAssignSearch('');
    setSelectedToAssign([]);
    setShowAssignModal(true);
  };

  const currentMembersIds = useMemo(() => {
    return miembros.find(m => m.grupoId === selectedGrupoForAssign?.id)?.caficultores || [];
  }, [miembros, selectedGrupoForAssign]);

  const availableToAssign = useMemo(() => {
    return CAFICULTORES_DISPONIBLES.filter(c => 
      !currentMembersIds.includes(c.id) &&
      (c.nombre.toLowerCase().includes(assignSearch.toLowerCase()) || c.cedula.includes(assignSearch))
    );
  }, [currentMembersIds, assignSearch]);

  const currentMembersData = useMemo(() => {
    return CAFICULTORES_DISPONIBLES.filter(c => currentMembersIds.includes(c.id));
  }, [currentMembersIds]);

  const toggleSelectMember = (id) => {
    setSelectedToAssign(prev => prev.includes(id) ? prev.filter(mid => mid !== id) : [...prev, id]);
  };

  const handleConfirmAssignment = () => {
    setMiembros(miembros.map(m => 
      m.grupoId === selectedGrupoForAssign.id ? { ...m, caficultores: [...m.caficultores, ...selectedToAssign] } : m
    ));
    setSelectedToAssign([]);
    addToast(`${selectedToAssign.length} caficultores asignados al grupo`, 'success');
  };

  const unassignMember = (caficultorId) => {
    setMiembros(miembros.map(m => 
      m.grupoId === selectedGrupoForAssign.id ? { ...m, caficultores: m.caficultores.filter(id => id !== caficultorId) } : m
    ));
    addToast('Caficultor retirado del grupo', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Cabecera Principal */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Grupo de Caficultores</h1>
          <p className="text-gray-500 text-sm">Organiza a tus productores en grupos estratégicos de trabajo.</p>
        </div>
        
        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-brand-vino rounded-lg hover:opacity-90 transition-all shadow-md group"
        >
          <svg className="w-5 h-5 group-hover:rotate-90 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Crear Nuevo Grupo
        </button>
      </div>

      {/* Buscador de Grupos */}
      <div className="flex justify-start">
        <SearchBar
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar un grupo específico..."
          className="w-full max-w-sm"
        />
      </div>

      {/* Listado de Grupos (Cards o Tabla) */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-100">
            <thead className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 text-left">Nombre de Grupo</th>
                <th className="px-6 py-4 text-left">Integrantes</th>
                <th className="px-6 py-4 text-left">Estado</th>
                <th className="px-6 py-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredGrupos.map((g) => {
                const memberCount = miembros.find(m => m.grupoId === g.id)?.caficultores.length || 0;
                return (
                  <tr key={g.id} className="hover:bg-gray-50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="text-sm font-bold text-gray-900">{g.nombre}</div>
                      <div className="text-xs text-gray-500 line-clamp-1">{g.descripcion}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <span className="bg-brand-vino bg-opacity-10 text-brand-vino px-2 py-0.5 rounded-full text-xs font-bold">
                          {memberCount} miembros
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={g.estado} />
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        {/* Botón Asignar (Especial) */}
                        <button 
                          onClick={() => handleOpenAssign(g)}
                          title="Asignar o ver miembros"
                          className="p-2 text-brand-vino hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                        </button>
                        
                        <button onClick={() => handleOpenEdit(g)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        
                        <button 
                          onClick={() => handleOpenBlock(g)} 
                          className={`p-2 rounded-lg transition-colors ${g.estado === 'activo' ? 'text-orange-600 hover:bg-orange-50' : 'text-green-600 hover:bg-green-50'}`}
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                        </button>
                        
                        <button onClick={() => handleOpenDelete(g.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filteredGrupos.length === 0 && <EmptyState message="Aún no tienes grupos creados." searchTerm={searchTerm} />}
        </div>
      </div>

      {/* --- Modales --- */}

      {/* Modal Crear/Editar */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title={editingGrupo ? "Modificar Datos de Grupo" : "Configurar Nuevo Grupo"}
        size="md"
      >
        <form onSubmit={handleSaveGrupo} className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Nombre del Grupo</label>
            <input 
              type="text" 
              value={formData.nombre} 
              onChange={(e) => setFormData({...formData, nombre: e.target.value})}
              placeholder="Ej: Asociados Nariño Norte"
              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-brand-vino transition-all"
              required
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Descripción Propósito</label>
            <textarea 
              rows={3} 
              value={formData.descripcion} 
              onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
              placeholder="Describa el objetivo de este grupo..."
              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-brand-vino transition-all resize-none"
              required
            />
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={() => setShowCreateModal(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cerrar
            </button>
            <button
              type="submit"
              className="px-6 py-2 text-sm font-medium text-white bg-brand-vino rounded-lg hover:opacity-90 shadow-md"
            >
              {editingGrupo ? "Guardar Cambios" : "Verificar y Crear"}
            </button>
          </div>
        </form>
      </Modal>

      {/* Modal Asignar Avanzado (Doble Lista) */}
      <Modal
        isOpen={showAssignModal}
        onClose={() => setShowAssignModal(false)}
        title={`Miembros del Grupo: ${selectedGrupoForAssign?.nombre}`}
        size="lg"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[500px]">
          {/* Columna Izquierda: Asignar Nuevos */}
          <div className="flex flex-col space-y-4 border-r border-gray-100 pr-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-gray-900 text-sm flex items-center gap-2">
                <span className="w-2 h-2 bg-brand-vino rounded-full"></span>
                Vincular Nuevos Miembros
              </h3>
            </div>
            
            <div className="relative">
              <input 
                type="text" 
                value={assignSearch} 
                onChange={(e) => setAssignSearch(e.target.value)}
                placeholder="Buscar por nombre o cédula..."
                className="w-full pl-9 pr-4 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg"
              />
              <svg className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            <div className="flex-1 overflow-y-auto scrollbar-thin space-y-2 pr-1">
              {availableToAssign.length > 0 ? (
                availableToAssign.map(ext => (
                  <div 
                    key={ext.id}
                    onClick={() => toggleSelectMember(ext.id)}
                    className={`
                      flex items-center justify-between p-2 rounded-lg border cursor-pointer transition-all
                      ${selectedToAssign.includes(ext.id) ? 'border-brand-vino bg-brand-vino bg-opacity-5' : 'border-gray-100 hover:border-gray-200 bg-white'}
                    `}
                  >
                    <div>
                      <div className="text-xs font-semibold text-gray-900">{ext.name || ext.nombre}</div>
                      <div className="text-[10px] text-gray-500">{ext.cedula}</div>
                    </div>
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${selectedToAssign.includes(ext.id) ? 'bg-brand-vino border-brand-vino' : 'border-gray-300'}`}>
                      {selectedToAssign.includes(ext.id) && <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-10 text-xs text-gray-400">No hay caficultores disponibles.</div>
              )}
            </div>

            <button 
              onClick={handleConfirmAssignment}
              disabled={selectedToAssign.length === 0}
              className="w-full py-2 bg-brand-vino text-white text-xs font-bold rounded-lg hover:opacity-90 disabled:bg-gray-200 transition-all shadow-sm"
            >
              Vincular Seleccionados ({selectedToAssign.length})
            </button>
          </div>

          {/* Columna Derecha: Miembros Actuales */}
          <div className="flex flex-col space-y-4">
            <h3 className="font-bold text-gray-900 text-sm flex items-center gap-2">
              <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
              Lista de Miembros Actuales
            </h3>

            <div className="flex-1 overflow-y-auto scrollbar-thin space-y-2 pr-1 pt-2">
              {currentMembersData.length > 0 ? (
                currentMembersData.map(member => (
                  <div key={member.id} className="flex items-center justify-between p-2 rounded-lg border border-gray-100 bg-gray-50 group hover:border-red-200 transition-all">
                    <div>
                      <div className="text-xs font-semibold text-gray-900">{member.name || member.nombre}</div>
                      <div className="text-[10px] text-gray-500">{member.cedula}</div>
                    </div>
                    <button 
                      onClick={() => unassignMember(member.id)}
                      className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                ))
              ) : (
                <div className="text-center py-10 text-xs text-gray-400 border-2 border-dashed border-gray-100 rounded-xl">
                  Sin caficultores asignados.
                </div>
              )}
            </div>
            
            <div className="pt-4 border-t flex justify-end">
              <button 
                onClick={() => setShowAssignModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-xs font-bold hover:bg-gray-50"
              >
                Cerrar Ventana
              </button>
            </div>
          </div>
        </div>
      </Modal>

      {/* Alertas de Acción */}
      <ActionModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, id: null })}
        onAction={confirmDelete}
        title="Eliminar Grupo Estratégico"
        description="Al eliminar este grupo, se perderán las clasificaciones de sus miembros. Esta acción es irrevocable."
        actionText="Eliminar Grupo"
        icon="danger"
        actionColor="danger"
      />

      <ActionModal
        isOpen={blockModal.isOpen}
        onClose={() => setBlockModal({ isOpen: false, grupo: null })}
        onAction={confirmToggleBlock}
        title={blockModal.grupo?.estado === 'activo' ? "Bloquear Grupo" : "Habilitar Grupo"}
        description={`¿Estás seguro de que deseas ${blockModal.grupo?.estado === 'activo' ? 'bloquear' : 'habilitar'} el acceso a este grupo?`}
        actionText={blockModal.grupo?.estado === 'activo' ? "Bloquear Ahora" : "Habilitar Ahora"}
        icon="warning"
        actionColor="warning"
      />

      {/* Notificaciones */}
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

export default GrupoDeCaficultores;
