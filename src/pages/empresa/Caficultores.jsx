import React, { useState } from 'react';
import {
  Modal,
  StatusBadge,
  ActionButtons,
  SearchBar,
  EmptyState,
  CaficultorFormModal,
  ActionModal,
  Toast,
} from '../../components';
import { useToast } from '../../hooks/useToast';

const EMPRESAS_MOCK = [
  { id: 1, nombre: 'Empresa Cafetalera del Norte' },
  { id: 2, nombre: 'Cooperativa de Cafés Especiales' },
  { id: 3, nombre: 'Federación Regional de Cafeteros' },
];

const GLOBAL_CAFICULTORES_POOL = [
  { id: 101, nombre: 'Pedro Picapiedra', numeroIdentidad: '111222333', email: 'pedro@email.com', telefono: '3001112233', estado: 'activo' },
  { id: 102, nombre: 'Wilma Mármol', numeroIdentidad: '444555666', email: 'wilma@email.com', telefono: '3004445566', estado: 'activo' },
  { id: 103, nombre: 'Betty Mármol', numeroIdentidad: '777888999', email: 'betty@email.com', telefono: '3007778899', estado: 'activo' },
];

const CAFICULTORES_INICIAL = [
  {
    id: 1,
    empresaId: 1,
    nombre: 'Carlos Rodríguez',
    numeroIdentidad: '123456789',
    email: 'carlos.rodriguez@email.com',
    telefono: '+57 300 123 4567',
    estado: 'activo',
    genero: 'masculino',
    estadoCivil: 'casado',
    numeroHijos: '2',
    fechaNacimiento: '1980-05-15',
    pais: 'Colombia',
  },
  {
    id: 2,
    empresaId: 1,
    nombre: 'María García',
    numeroIdentidad: '987654321',
    email: 'maria.garcia@email.com',
    telefono: '+57 301 234 5678',
    estado: 'activo',
    genero: 'femenino',
    estadoCivil: 'soltero',
    numeroHijos: '0',
    fechaNacimiento: '1985-08-22',
    pais: 'Colombia',
  },
];

const Caficultores = () => {
  const { toasts, addToast, removeToast } = useToast();
  const [selectedEmpresa, setSelectedEmpresa] = useState('1'); // Por defecto la primera para el demo de empresa
  const [caficultores, setCaficultores] = useState(CAFICULTORES_INICIAL);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showAsignarModal, setShowAsignarModal] = useState(false);
  const [editingCaficultor, setEditingCaficultor] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null });

  const handleCreate = () => {
    setEditingCaficultor(null);
    setShowModal(true);
  };

  const handleEdit = (caficultor) => {
    setEditingCaficultor(caficultor);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setDeleteModal({ isOpen: true, id });
  };

  const confirmDelete = () => {
    if (deleteModal.id) {
      setCaficultores((prev) => prev.filter((c) => c.id !== deleteModal.id));
      setDeleteModal({ isOpen: false, id: null });
      addToast('Caficultor desvinculado con éxito', 'success');
    }
  };

  const handleSave = (formData, isEditing) => {
    if (isEditing) {
      setCaficultores((prev) =>
        prev.map((c) =>
          c.id === editingCaficultor.id
            ? { ...c, ...formData, numeroIdentidad: formData.cedula }
            : c
        )
      );
      addToast('Información del caficultor actualizada', 'success');
    } else {
      const newId = Date.now();
      setCaficultores((prev) => [
        ...prev,
        {
          id: newId,
          empresaId: parseInt(selectedEmpresa),
          ...formData,
          numeroIdentidad: formData.cedula,
          estado: 'activo',
        },
      ]);
      addToast('Nuevo caficultor registrado con éxito', 'success');
    }
    setShowModal(false);
    setEditingCaficultor(null);
  };

  const handleAsignar = (caficultor) => {
    const yaAsignado = caficultores.some(c => c.id === caficultor.id && c.empresaId === parseInt(selectedEmpresa));
    if (yaAsignado) {
      addToast('Este caficultor ya está asignado a tu empresa', 'warning');
      return;
    }
    
    setCaficultores(prev => [...prev, { ...caficultor, empresaId: parseInt(selectedEmpresa) }]);
    setShowAsignarModal(false);
    addToast('Caficultor asignado exitosamente', 'success');
  };

  const filtered = caficultores.filter(
    (c) =>
      c.empresaId === parseInt(selectedEmpresa) &&
      (c.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.numeroIdentidad.includes(searchTerm))
  );

  return (
    <div className="space-y-6">
      {/* Encabezado Principal */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mis Caficultores</h1>
          <p className="text-gray-500 text-sm">Gestiona los productores asociados a tu empresa cafetalera.</p>
        </div>
        
        <div className="hidden">
           {/* Selector oculto pero mantenido por paridad de lógica con AT */}
           <select 
            value={selectedEmpresa}
            onChange={(e) => setSelectedEmpresa(e.target.value)}
          >
            {EMPRESAS_MOCK.map(emp => (
              <option key={emp.id} value={emp.id}>{emp.nombre}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Barra de Acciones */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <SearchBar
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por nombre, identificación o email..."
            className="w-full max-w-sm"
          />
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowAsignarModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-brand-vino bg-white border border-brand-vino border-opacity-20 rounded-lg hover:bg-red-50 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
            Asignar Existente
          </button>
          
          <button
            onClick={handleCreate}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-brand-vino rounded-lg hover:opacity-90 transition-all shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Nuevo Caficultor
          </button>
        </div>
      </div>

      {/* Tabla de Datos */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-100">
            <thead className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 text-left">Nombre del Productor</th>
                <th className="px-6 py-4 text-left">Identificación</th>
                <th className="px-6 py-4 text-left">Email</th>
                <th className="px-6 py-4 text-left">Teléfono</th>
                <th className="px-6 py-4 text-center">Estado</th>
                <th className="px-6 py-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-brand-vino bg-opacity-10 flex items-center justify-center text-brand-vino font-bold text-sm">
                        {c.nombre.charAt(0)}
                      </div>
                      <span className="text-sm font-medium text-gray-900">{c.nombre}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {c.numeroIdentidad}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 lowercase">
                    {c.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {c.telefono}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <StatusBadge status={c.estado} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <ActionButtons
                      onEdit={() => handleEdit(c)}
                      onDelete={() => handleDelete(c.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <EmptyState 
              message={searchTerm ? "No se encontraron caficultores para tu búsqueda" : "Aún no tienes caficultores registrados"} 
              searchTerm={searchTerm}
            />
          )}
        </div>
      </div>

      {/* Modal de Formulario (Crear/Editar) */}
      <CaficultorFormModal
        isOpen={showModal}
        onClose={() => { setShowModal(false); setEditingCaficultor(null); }}
        onSave={handleSave}
        initialData={editingCaficultor}
      />

      {/* Modal para Asignar Caficultor de Pool Global */}
      <Modal
        isOpen={showAsignarModal}
        onClose={() => setShowAsignarModal(false)}
        title="Asignar Productor de Base Global"
        size="md"
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-500">Busca y selecciona un productor previamente registrado en el sistema global.</p>
          <div className="max-h-96 overflow-y-auto divide-y divide-gray-100 border border-gray-100 rounded-lg">
            {GLOBAL_CAFICULTORES_POOL.map((cp) => (
              <div key={cp.id} className="flex items-center justify-between py-3 hover:bg-gray-50 px-4 rounded-lg transition-colors group">
                <div>
                  <div className="font-medium text-gray-900 text-sm">{cp.nombre}</div>
                  <div className="text-xs text-gray-500">{cp.numeroIdentidad} • {cp.email}</div>
                </div>
                <button
                  onClick={() => handleAsignar(cp)}
                  className="px-3 py-1.5 text-xs font-semibold text-brand-vino hover:text-white hover:bg-brand-vino border border-brand-vino border-opacity-30 rounded-md transition-all active:scale-95"
                >
                  Asignar
                </button>
              </div>
            ))}
          </div>
        </div>
      </Modal>

      {/* Confirmación para Eliminar/Desvincular */}
      <ActionModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, id: null })}
        onAction={confirmDelete}
        title="Desvincular Caficultor"
        description="¿Estás seguro de que deseas desvincular a este productor de tu empresa? Sus datos se mantendrán en el sistema global pero no aparecerán en tu listado."
        actionText="Desvincular"
        cancelText="Cancelar"
        icon="danger"
        actionColor="danger"
      />

      {/* Sistema de Notificaciones Flotantes */}
      <div className="fixed top-0 right-0 z-[60]">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            isVisible={toast.isVisible}
            onClose={() => removeToast(toast.id)}
            duration={toast.duration}
          />
        ))}
      </div>
    </div>
  );
};

export default Caficultores;
