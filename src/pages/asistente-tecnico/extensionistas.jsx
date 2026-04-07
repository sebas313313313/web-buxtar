import React, { useState } from 'react';
import {
  Modal,
  StatusBadge,
  ActionButtons,
  PageHeader,
  SearchBar,
  EmptyState,
  Button,
  Input
} from '../../components';

const EMPRESAS_MOCK = [
  { id: 1, nombre: 'Empresa Cafetalera del Norte' },
  { id: 2, nombre: 'Cooperativa de Cafés Especiales' },
  { id: 3, nombre: 'Federación Regional de Cafeteros' },
];

const EXTENSIONISTAS_INICIAL = [
  { 
    id: '1', 
    empresaId: 1,
    name: 'Laura Restrepo', 
    email: 'laura.r@ejemplo.com', 
    phone: '+57 311 111 1111', 
    dni: '1020304050', 
    gender: 'Femenino', 
    profession: 'Ingeniera Agrónoma', 
    dob: '1990-05-12', 
    country: 'Colombia',
    status: 'activo'
  },
  { 
    id: '2', 
    empresaId: 1,
    name: 'Andrés Felipe Gómez', 
    email: 'andres.gomez@ejemplo.com', 
    phone: '+57 322 222 2222', 
    dni: '1098765432', 
    gender: 'Masculino', 
    profession: 'Técnico Agrícola', 
    dob: '1985-08-25', 
    country: 'Colombia',
    status: 'activo'
  },
  { 
    id: '3', 
    empresaId: 2,
    name: 'Martha Lucia Vargas', 
    email: 'martha.v@ejemplo.com', 
    phone: '+57 315 333 3333', 
    dni: '52824792', 
    gender: 'Femenino', 
    profession: 'Extensionista Rural', 
    dob: '1982-11-03', 
    country: 'Colombia',
    status: 'activo'
  },
];

const Extensionistas = () => {
  const [selectedEmpresa, setSelectedEmpresa] = useState('');
  const [extensionistas, setExtensionistas] = useState(EXTENSIONISTAS_INICIAL);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modals state
  const [showFormModal, setShowFormModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  
  const initialFormData = {
    name: '', dni: '', phone: '', gender: '', profession: '', dob: '', country: '', email: '', password: '', avatar: null
  };
  const [formData, setFormData] = useState(initialFormData);

  // Filtro
  const filtered = extensionistas.filter(user => 
    user.empresaId === parseInt(selectedEmpresa) && (
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.dni.includes(searchTerm)
    )
  );

  // Handlers
  const handleAdd = () => {
    setSelectedUser(null);
    setFormData(initialFormData);
    setShowFormModal(true);
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setFormData({ 
      name: user.name, 
      dni: user.dni, 
      phone: user.phone, 
      gender: user.gender,
      profession: user.profession,
      dob: user.dob,
      country: user.country,
      email: user.email, 
      password: '',
      avatar: null
    });
    setShowFormModal(true);
  };

  const handleView = (user) => {
    setSelectedUser(user);
    setShowViewModal(true);
  };

  const handleDelete = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedUser) {
      setExtensionistas(extensionistas.map(u => u.id === selectedUser.id ? { 
        ...u, 
        ...formData
      } : u));
    } else {
      const newUser = {
        id: Date.now().toString(),
        empresaId: parseInt(selectedEmpresa),
        ...formData,
        status: 'activo'
      };
      setExtensionistas([newUser, ...extensionistas]);
    }
    setShowFormModal(false);
  };

  const confirmDelete = () => {
    setExtensionistas(extensionistas.filter(u => u.id !== selectedUser.id));
    setShowDeleteModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Encabezado con Selección de Empresa */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestión de Extensionistas</h1>
          <p className="text-gray-500 text-sm">Administra los agrónomos y técnicos de cada empresa.</p>
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
          <p className="text-gray-500 max-w-sm">Dbe elegir una empresa para ver sus extensionistas.</p>
        </div>
      ) : (
        <>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <SearchBar
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar extensionista..."
              className="w-full max-w-xs"
            />
            <Button onClick={handleAdd}>
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Nuevo Extensionista
            </Button>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <table className="min-w-full divide-y divide-gray-100">
              <thead className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4 text-left">Nombre</th>
                  <th className="px-6 py-4 text-left">Email</th>
                  <th className="px-6 py-4 text-left">Teléfono</th>
                  <th className="px-6 py-4 text-left">Profesión</th>
                  <th className="px-6 py-4 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.phone}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.profession}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <ActionButtons
                        showView={true}
                        showEdit={true}
                        showDelete={true}
                        onView={() => handleView(user)}
                        onEdit={() => handleEdit(user)}
                        onDelete={() => handleDelete(user)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && <EmptyState message="No hay extensionistas registrados." />}
          </div>
        </>
      )}

      {/* Modales */}
      <Modal
        isOpen={showFormModal}
        title={selectedUser ? "Editar Extensionista" : "Agregar Nuevo Extensionista"}
        onClose={() => setShowFormModal(false)}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Nombre completo" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
            <Input label="DNI o Cédula" value={formData.dni} onChange={(e) => setFormData({ ...formData, dni: e.target.value })} required />
            <Input label="Celular" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required />
            <Input label="Profesión" value={formData.profession} onChange={(e) => setFormData({ ...formData, profession: e.target.value })} required />
            <Input label="Email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
            <Input label="Password" type="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} required={!selectedUser} />
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="secondary" onClick={() => setShowFormModal(false)}>Cancelar</Button>
            <Button type="submit">Guardar</Button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={showViewModal} title="Perfil de Extensionista" onClose={() => setShowViewModal(false)}>
        {selectedUser && (
          <div className="space-y-4">
            <p><strong>Nombre:</strong> {selectedUser.name}</p>
            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p><strong>Teléfono:</strong> {selectedUser.phone}</p>
            <p><strong>Profesión:</strong> {selectedUser.profession}</p>
            <p><strong>DNI:</strong> {selectedUser.dni}</p>
            <div className="flex justify-end pt-4 border-t">
              <Button onClick={() => setShowViewModal(false)}>Cerrar</Button>
            </div>
          </div>
        )}
      </Modal>

      <Modal isOpen={showDeleteModal} title="Eliminar Extensionista" onClose={() => setShowDeleteModal(false)}>
        <p>¿Seguro que deseas eliminar a {selectedUser?.name}?</p>
        <div className="flex justify-end gap-3 mt-6">
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancelar</Button>
          <Button variant="danger" onClick={confirmDelete}>Eliminar</Button>
        </div>
      </Modal>
    </div>
  );
};

export default Extensionistas;
