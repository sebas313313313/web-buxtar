import React, { useState } from 'react';
import {
  Modal,
  StatusBadge,
  ActionButtons,
  PageHeader,
  SearchBar,
  EmptyState,
  CaficultorFormModal,
  ActionModal,
} from '../../components';

const EMPRESAS_MOCK = [
  { id: 1, nombre: 'Empresa Cafetalera del Norte' },
  { id: 2, nombre: 'Cooperativa de Cafés Especiales' },
  { id: 3, nombre: 'Federación Regional de Cafeteros' },
];

const GLOBAL_CAFICULTORES_POOL = [
  { id: 101, nombre: 'Pedro Picapiedra', numeroIdentidad: '111222333', email: 'pedro@email.com', telefono: '3001112233', estado: 'activo' },
  { id: 102, nombre: 'Wilma Mármol', numeroIdentidad: '444555666', email: 'wilma@email.com', telefono: '3004445566', estado: 'activo' },
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
  const [selectedEmpresa, setSelectedEmpresa] = useState('');
  const [caficultores, setCaficultores] = useState(CAFICULTORES_INICIAL);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showAsignarModal, setShowAsignarModal] = useState(false);
  const [alertModal, setAlertModal] = useState({ isOpen: false, type: 'info', title: '', message: '' });
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
    }
    setShowModal(false);
    setEditingCaficultor(null);
  };

  const handleAsignar = (caficultor) => {
    const yaAsignado = caficultores.some(c => c.id === caficultor.id && c.empresaId === parseInt(selectedEmpresa));
    if (yaAsignado) {
      setAlertModal({ isOpen: true, type: 'warning', title: 'Advertencia', message: 'Este caficultor ya está asignado a esta empresa.' });
      return;
    }
    
    setCaficultores(prev => [...prev, { ...caficultor, empresaId: parseInt(selectedEmpresa) }]);
    setShowAsignarModal(false);
    setAlertModal({ isOpen: true, type: 'success', title: 'Éxito', message: 'Caficultor asignado exitosamente.' });
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
      {/* Encabezado con Selección de Empresa */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestión de Caficultores</h1>
          <p className="text-gray-500 text-sm">Administra los productores vinculados a cada empresa.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <label className="text-sm font-medium text-gray-700 whitespace-nowrap">Empresa:</label>
          <select 
            value={selectedEmpresa}
            onChange={(e) => setSelectedEmpresa(e.target.value)}
            className="w-full sm:w-64 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cafe-vino-500 outline-none transition-all text-sm"
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
          <p className="text-gray-500 max-w-sm">Para ver y gestionar los caficultores, por favor elige una empresa del listado superior.</p>
        </div>
      ) : (
        <>
          {/* Botones de acción específicos de empresa */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <SearchBar
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar caficultor..."
                className="w-full max-w-xs"
              />
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowAsignarModal(true)}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-cafe-vino-700 bg-cafe-vino-50 border border-cafe-vino-100 rounded-lg hover:bg-cafe-vino-100 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
                Asignar Caficultor
              </button>
              
              <button
                onClick={handleCreate}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-cafe-vino-600 rounded-lg hover:bg-cafe-vino-700 transition-colors shadow-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Crear Caficultor
              </button>
            </div>
          </div>

          {/* Tabla de Caficultores */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-100">
                <thead className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-4 text-left">Nombre</th>
                    <th className="px-6 py-4 text-left">Identificación</th>
                    <th className="px-6 py-4 text-left">Email</th>
                    <th className="px-6 py-4 text-left">Teléfono</th>
                    <th className="px-6 py-4 text-left">Estado</th>
                    <th className="px-6 py-4 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filtered.map((c) => (
                    <tr key={c.id} className="hover:bg-gray-50 transition-colors group">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-cafe-vino-100 flex items-center justify-center text-cafe-vino-700 font-bold text-sm">
                            {c.nombre.charAt(0)}
                          </div>
                          <span className="text-sm font-medium text-gray-900">{c.nombre}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {c.numeroIdentidad}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {c.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {c.telefono}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
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
                  message={searchTerm ? "No se encontraron caficultores con ese criterio" : "Esta empresa aún no tiene caficultores asignados"} 
                  searchTerm={searchTerm}
                />
              )}
            </div>
          </div>
        </>
      )}

      {/* Modal Crear/Editar */}
      <CaficultorFormModal
        isOpen={showModal}
        onClose={() => { setShowModal(false); setEditingCaficultor(null); }}
        onSave={handleSave}
        initialData={editingCaficultor}
      />

      {/* Modal Asignar Caficultor */}
      <Modal
        isOpen={showAsignarModal}
        onClose={() => setShowAsignarModal(false)}
        title="Asignar Caficultor Existente"
        size="md"
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-500">Seleccione un caficultor de la base de datos global para vincularlo a esta empresa.</p>
          <div className="max-h-96 overflow-y-auto divide-y divide-gray-100">
            {GLOBAL_CAFICULTORES_POOL.map((cp) => (
              <div key={cp.id} className="flex items-center justify-between py-3 hover:bg-gray-50 px-2 rounded-lg transition-colors group">
                <div>
                  <div className="font-medium text-gray-900">{cp.nombre}</div>
                  <div className="text-xs text-gray-500">{cp.numeroIdentidad} • {cp.email}</div>
                </div>
                <button
                  onClick={() => handleAsignar(cp)}
                  className="px-3 py-1.5 text-xs font-semibold text-cafe-vino-600 hover:text-white hover:bg-cafe-vino-600 border border-cafe-vino-600 rounded-md transition-all"
                >
                  Asignar
                </button>
              </div>
            ))}
          </div>
        </div>
      </Modal>

      {/* Modal Confirmar Eliminación */}
      <ActionModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, id: null })}
        onAction={confirmDelete}
        title="Eliminar Caficultor"
        description="¿Estás seguro de que deseas eliminar este caficultor de esta empresa? Esta acción no se puede deshacer."
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

export default Caficultores;
