import React, { useState, useMemo } from 'react';
import {
  Card,
  Button,
  Input,
  Modal,
  Toast,
  ActionModal,
  SearchBar,
  EmptyState,
  StatusBadge,
  ActionButtons
} from '../../components';
import { useToast } from '../../hooks/useToast';

// Mock de zonas para el select
const ZONAS_MOCK = [
  { id: 1, name: 'Zona Norte' },
  { id: 2, name: 'Zona Sur' },
  { id: 3, name: 'Zona Centro' },
  { id: 4, name: 'Zona Este' },
];

// Mock de extensionistas ya asignados a la empresa
const INITIAL_ASSIGNED = [
  {
    id: '1',
    name: 'Laura Restrepo',
    zona: 'Zona Norte',
    dni: '1020304050',
    phone: '+57 311 111 1111',
    email: 'laura.r@ejemplo.com',
    status: 'activo',
    profession: 'Ingeniera Agrónoma',
    dob: '1990-05-12',
    gender: 'Femenino',
    country: 'Colombia'
  },
  {
    id: '2',
    name: 'Andrés Felipe Gómez',
    zona: 'Zona Sur',
    dni: '1098765432',
    phone: '+57 322 222 2222',
    email: 'andres.gomez@ejemplo.com',
    status: 'activo',
    profession: 'Técnico Agrícola',
    dob: '1985-08-25',
    gender: 'Masculino',
    country: 'Colombia'
  }
];

// Mock de extensionistas globales para la función de "Asignar"
const GLOBAL_EXTENSIONISTAS = [
  { id: '101', name: 'Carlos Mario Ruiz', profession: 'Agrónomo', email: 'carlos.ruiz@global.com' },
  { id: '102', name: 'Beatriz Elena Ospina', profession: 'Veterinaria', email: 'beatriz.o@global.com' },
  { id: '103', name: 'Julián David Cano', profession: 'Ing. Forestal', email: 'julian.c@global.com' },
  { id: '104', name: 'Diana Marcela López', profession: 'Técnica Rural', email: 'diana.l@global.com' },
  { id: '105', name: 'Roberto Jairo Velázquez', profession: 'Especialista en Suelos', email: 'roberto.v@global.com' },
];

const Extensionistas = () => {
  const { toasts, addToast, removeToast } = useToast();
  const [assigned, setAssigned] = useState(INITIAL_ASSIGNED);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Estados para modales
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showBlockModal, setShowBlockModal] = useState(false);
  
  // Estado para extensionista seleccionado
  const [selectedExt, setSelectedExt] = useState(null);
  
  // Estado para la función de "Asignar"
  const [assignSearch, setAssignSearch] = useState('');
  const [selectedForAssign, setSelectedForAssign] = useState([]);

  // Mock Form Data (10 campos requeridos en el audio)
  const initialFormData = {
    name: '',
    profession: '',
    phone: '',
    email: '',
    dob: '',
    gender: 'Masculino',
    zona: '',
    country: 'Colombia',
    password: '',
    dni: ''
  };
  const [formData, setFormData] = useState(initialFormData);

  // Filtrado de extensionistas asignados
  const filteredAssigned = useMemo(() => {
    return assigned.filter(ext => 
      ext.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ext.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ext.dni.includes(searchTerm)
    );
  }, [assigned, searchTerm]);

  // Filtrado de extensionistas globales para asignar
  const filteredGlobal = useMemo(() => {
    return GLOBAL_EXTENSIONISTAS.filter(ext => 
      !assigned.some(a => a.id === ext.id) &&
      (ext.name.toLowerCase().includes(assignSearch.toLowerCase()) ||
       ext.email.toLowerCase().includes(assignSearch.toLowerCase()))
    );
  }, [assigned, assignSearch]);

  // --- Handlers ---
  
  const handleOpenCreate = () => {
    setFormData(initialFormData);
    setShowCreateModal(true);
  };

  const handleOpenEdit = (ext) => {
    setSelectedExt(ext);
    setFormData({
      ...ext,
      dob: ext.dob || '',
      password: '' // No mostramos el password actual
    });
    setShowEditModal(true);
  };

  const handleOpenDelete = (ext) => {
    setSelectedExt(ext);
    setShowDeleteModal(true);
  };

  const handleOpenBlock = (ext) => {
    setSelectedExt(ext);
    setShowBlockModal(true);
  };

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    const newExt = {
      ...formData,
      id: Date.now().toString(),
      status: 'activo',
      zona: ZONAS_MOCK.find(z => z.id === parseInt(formData.zona))?.name || 'Sin zona'
    };
    setAssigned([...assigned, newExt]);
    setShowCreateModal(false);
    addToast('Extensionista creado exitosamente', 'success');
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    setAssigned(assigned.map(ext => ext.id === selectedExt.id ? { 
      ...ext, 
      ...formData,
      zona: ZONAS_MOCK.find(z => z.id === parseInt(formData.zona))?.name || ext.zona
    } : ext));
    setShowEditModal(false);
    addToast('Información actualizada correctamente', 'success');
  };

  const confirmDelete = () => {
    setAssigned(assigned.filter(ext => ext.id !== selectedExt.id));
    setShowDeleteModal(false);
    addToast('Extensionista eliminado de la empresa', 'success');
  };

  const confirmToggleBlock = () => {
    const newStatus = selectedExt.status === 'activo' ? 'inactivo' : 'activo';
    setAssigned(assigned.map(ext => ext.id === selectedExt.id ? { ...ext, status: newStatus } : ext));
    setShowBlockModal(false);
    addToast(`Extensionista ${newStatus === 'activo' ? 'desbloqueado' : 'bloqueado'} con éxito`, 'success');
  };

  const toggleSelectForAssign = (ext) => {
    if (selectedForAssign.some(s => s.id === ext.id)) {
      setSelectedForAssign(selectedForAssign.filter(s => s.id !== ext.id));
    } else {
      setSelectedForAssign([...selectedForAssign, ext]);
    }
  };

  const handleConfirmAssign = () => {
    const newAssignments = selectedForAssign.map(ext => ({
      ...ext,
      zona: 'Pendiente asignar',
      dni: '---',
      phone: '---',
      status: 'activo'
    }));
    setAssigned([...assigned, ...newAssignments]);
    setSelectedForAssign([]);
    setShowAssignModal(false);
    addToast('Extensionistas asignados correctamente', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Cabecera de Página */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestión de Extensionistas</h1>
          <p className="text-gray-500 text-sm">Administra el equipo técnico asignado a tu empresa.</p>
        </div>
        
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => setShowAssignModal(true)}>
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
            Asignar
          </Button>
          <Button onClick={handleOpenCreate}>
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Crear Nuevo
          </Button>
        </div>
      </div>

      {/* Barra de Búsqueda */}
      <div className="flex justify-end">
        <SearchBar
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar por nombre, email o DNI..."
          className="w-full max-w-sm"
        />
      </div>

      {/* Tabla Principal */}
      <Card noPadding>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-100">
            <thead className="bg-gray-50">
              <tr className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <th className="px-6 py-4">Nombre</th>
                <th className="px-6 py-4">Zona</th>
                <th className="px-6 py-4">DNI / Identificación</th>
                <th className="px-6 py-4">Teléfono</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4 text-center">Estado</th>
                <th className="px-6 py-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 bg-white">
              {filteredAssigned.length > 0 ? (
                filteredAssigned.map((ext) => (
                  <tr key={ext.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{ext.name}</div>
                      <div className="text-xs text-gray-500">{ext.profession}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{ext.zona}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">{ext.dni}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{ext.phone}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ext.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <StatusBadge status={ext.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => handleOpenEdit(ext)}
                          className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                          title="Editar"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button 
                          onClick={() => handleOpenBlock(ext)}
                          className={`p-1 rounded transition-colors ${ext.status === 'activo' ? 'text-orange-600 hover:bg-orange-50' : 'text-green-600 hover:bg-green-50'}`}
                          title={ext.status === 'activo' ? 'Bloquear' : 'Desbloquear'}
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636" />
                          </svg>
                        </button>
                        <button 
                          onClick={() => handleOpenDelete(ext)}
                          className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                          title="Eliminar"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7">
                    <EmptyState message="No se encontraron extensionistas asignados." />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* --- Modales --- */}

      {/* Modal Asignar */}
      <Modal
        isOpen={showAssignModal}
        onClose={() => {
          setShowAssignModal(false);
          setSelectedForAssign([]);
        }}
        title="Asignar Extensionistas"
        size="md"
      >
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <SearchBar
              value={assignSearch}
              onChange={(e) => setAssignSearch(e.target.value)}
              placeholder="Buscar por nombre o email..."
              className="w-full"
            />
          </div>

          <div className="max-h-[300px] overflow-y-auto space-y-2 pr-1">
            {filteredGlobal.length > 0 ? (
              filteredGlobal.map(ext => (
                <div 
                  key={ext.id}
                  onClick={() => toggleSelectForAssign(ext)}
                  className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all ${
                    selectedForAssign.some(s => s.id === ext.id)
                      ? 'border-brand-vino bg-brand-vino bg-opacity-5'
                      : 'border-gray-200 hover:border-brand-vino'
                  }`}
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-gray-500 font-semibold">{ext.name.charAt(0)}</span>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">{ext.name}</div>
                      <div className="text-xs text-gray-500">{ext.profession} - {ext.email}</div>
                    </div>
                  </div>
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                    selectedForAssign.some(s => s.id === ext.id)
                      ? 'bg-brand-vino border-brand-vino'
                      : 'border-gray-300'
                  }`}>
                    {selectedForAssign.some(s => s.id === ext.id) && (
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center py-4 text-gray-500 text-sm">No hay extensionistas disponibles.</p>
            )}
          </div>

          {/* Lista de seleccionados si hay alguno */}
          {selectedForAssign.length > 0 && (
            <div className="pt-4 border-t">
              <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Seleccionados ({selectedForAssign.length})</p>
              <div className="flex flex-wrap gap-2">
                {selectedForAssign.map(s => (
                  <span key={s.id} className="inline-flex items-center px-2 py-1 bg-gray-100 text-xs rounded text-gray-700">
                    {s.name}
                    <button onClick={() => toggleSelectForAssign(s)} className="ml-1 text-gray-400 hover:text-red-500 px-0.5">×</button>
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={() => setShowAssignModal(false)}>Cerrar</Button>
            <Button onClick={handleConfirmAssign} disabled={selectedForAssign.length === 0}>Asignar Seleccionados</Button>
          </div>
        </div>
      </Modal>

      {/* Modal Crear / Editar */}
      <Modal
        isOpen={showCreateModal || showEditModal}
        onClose={() => {
          setShowCreateModal(false);
          setShowEditModal(false);
        }}
        title={showCreateModal ? "Crear Nuevo Extensionista" : "Editar Extensionista"}
        size="lg"
      >
        <form onSubmit={showCreateModal ? handleCreateSubmit : handleUpdateSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input 
              label="Nombre completo" 
              placeholder="Ej: Juan Pérez" 
              value={formData.name} 
              onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
              required 
            />
            <Input 
              label="DNI / Cédula" 
              placeholder="Ej: 123456789" 
              value={formData.dni} 
              onChange={(e) => setFormData({ ...formData, dni: e.target.value })} 
              required 
            />
            <Input 
              label="Profesión" 
              placeholder="Ej: Ingeniero Agrónomo" 
              value={formData.profession} 
              onChange={(e) => setFormData({ ...formData, profession: e.target.value })} 
              required 
            />
            <Input 
              label="Celular" 
              placeholder="Ej: +57 300 000 0000" 
              value={formData.phone} 
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })} 
              required 
            />
            <Input 
              label="Email" 
              type="email" 
              placeholder="extensionista@ejemplo.com" 
              value={formData.email} 
              onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
              required 
            />
            <Input 
              label="Fecha de nacimiento" 
              type="date" 
              value={formData.dob} 
              onChange={(e) => setFormData({ ...formData, dob: e.target.value })} 
              required 
            />
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Género</label>
              <select 
                value={formData.gender} 
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-brand-vino transition-all"
                required
              >
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
                <option value="Otro">Otro/No prefiere decir</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Zona asignada</label>
              <select 
                value={formData.zona} 
                onChange={(e) => setFormData({ ...formData, zona: e.target.value })}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-brand-vino transition-all"
                required
              >
                <option value="">Seleccione una zona...</option>
                {ZONAS_MOCK.map(z => (
                  <option key={z.id} value={z.id}>{z.name}</option>
                ))}
              </select>
            </div>
            <Input 
              label="País" 
              value={formData.country} 
              onChange={(e) => setFormData({ ...formData, country: e.target.value })} 
              required 
            />
            <Input 
              label="Contraseña" 
              type="password" 
              placeholder={showEditModal ? "(Dejar vacío para mantener actual)" : "Mínimo 8 caracteres"} 
              value={formData.password} 
              onChange={(e) => setFormData({ ...formData, password: e.target.value })} 
              required={showCreateModal} 
            />
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t mt-4">
            <Button variant="outline" onClick={() => { setShowCreateModal(false); setShowEditModal(false); }}>Cancelar</Button>
            <Button type="submit">{showCreateModal ? "Crear Extensionista" : "Guardar Cambios"}</Button>
          </div>
        </form>
      </Modal>

      {/* Modal Confirmar Eliminación */}
      <ActionModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onAction={confirmDelete}
        title="Desvincular Extensionista"
        description={`¿Estás seguro de que deseas desvincular a ${selectedExt?.name} de la empresa? Esta acción no eliminará su perfil del sistema, solo de tu listado.`}
        actionText="Eliminar"
        actionColor="danger"
        icon="danger"
      />

      {/* Modal Bloquear/Desbloquear */}
      <ActionModal
        isOpen={showBlockModal}
        onClose={() => setShowBlockModal(false)}
        onAction={confirmToggleBlock}
        title={selectedExt?.status === 'activo' ? "Bloquear Extensionista" : "Desbloquear Extensionista"}
        description={`¿Deseas cambiar el estado de acceso para ${selectedExt?.name}?`}
        actionText={selectedExt?.status === 'activo' ? "Bloquear" : "Habilitar"}
        actionColor="warning"
        icon="warning"
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

export default Extensionistas;
