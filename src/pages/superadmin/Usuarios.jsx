import React, { useState } from 'react';
import { PageHeader, Card, Button, Input, Modal, ActionButtons, SearchBar, StatusBadge, EmptyState } from '../../components';

// Datos de prueba
const mockUsers = [
  { id: '1', code: 'USR-001', name: 'Juan Pérez', phone: '+57 320 123 4567', email: 'juan.perez@cafeexport.com', status: 'active' },
  { id: '2', code: 'USR-002', name: 'María Gómez', phone: '+57 315 987 6543', email: 'maria.gomez@empresa.com', status: 'inactive' },
  { id: '3', code: 'USR-003', name: 'Carlos Ruiz', phone: '+57 300 456 7890', email: 'carlos.ruiz@cooperativa.com', status: 'active' },
];

const SAUsuarios = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState(mockUsers);
  
  // Modal states
  const [showFormModal, setShowFormModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDevModal, setShowDevModal] = useState(false);

  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  // Filter
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handlers
  const handleAdd = () => {
    setSelectedUser(null);
    setFormData({ name: '', email: '', password: '' });
    setShowFormModal(true);
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setFormData({ name: user.name, email: user.email, password: '' });
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

  const handleLogin = (user) => {
    setSelectedUser(user);
    setShowDevModal(true);
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedUser) {
      setUsers(users.map(u => u.id === selectedUser.id ? { ...u, name: formData.name, email: formData.email } : u));
    } else {
      const newUser = {
        id: Date.now().toString(),
        code: `USR-00${users.length + 1}`,
        name: formData.name,
        email: formData.email,
        phone: '+57 000 000 0000',
        status: 'active'
      };
      setUsers([...users, newUser]);
    }
    setShowFormModal(false);
  };

  const confirmDelete = () => {
    setUsers(users.filter(u => u.id !== selectedUser.id));
    setShowDeleteModal(false);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Administrador de usuarios"
        subtitle="Gestión completa de accesos y cuentas del sistema"
      >
        <Button onClick={handleAdd}>
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Agregar nuevo usuario
        </Button>
      </PageHeader>

      {/* Buscador */}
      <Card>
        <div className="mb-6">
          <SearchBar
            placeholder="Buscar por código, nombre o email..."
            value={searchTerm}
            onChange={setSearchTerm}
          />
        </div>

        {/* Tabla */}
        <div className="overflow-x-auto">
          {filteredUsers.length > 0 ? (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Código</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre completo</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teléfono</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-cafe-vino-600">{user.code}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.phone}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <StatusBadge status={user.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <ActionButtons
                        showView={true}
                        showEdit={true}
                        showDelete={true}
                        showLogin={true}
                        onView={() => handleView(user)}
                        onEdit={() => handleEdit(user)}
                        onDelete={() => handleDelete(user)}
                        onLogin={() => handleLogin(user)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <EmptyState
              title="No se encontraron usuarios"
              message="No hay usuarios que coincidan con tu búsqueda actual."
            />
          )}
        </div>
      </Card>

      {/* 1. Modal Agregar/Editar */}
      <Modal
        isOpen={showFormModal}
        title={selectedUser ? "Editar Usuario" : "Agregar Nuevo Usuario"}
        onClose={() => setShowFormModal(false)}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Nombre completo"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Ej. Juan Pérez"
            required
          />
          <Input
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="ejemplo@correo.com"
            required
          />
          <Input
            label={selectedUser ? "Nueva Contraseña (opcional)" : "Contraseña"}
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            placeholder="••••••••"
            required={!selectedUser}
          />
          <div className="mt-6 flex justify-end space-x-3">
            <Button type="button" variant="secondary" onClick={() => setShowFormModal(false)}>
              Cancelar
            </Button>
            <Button type="submit">
              {selectedUser ? 'Actualizar' : 'Agregar'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* 2. Modal Ver Detalles */}
      <Modal
        isOpen={showViewModal}
        title="Detalles del Usuario"
        onClose={() => setShowViewModal(false)}
      >
        {selectedUser && (
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">Nombre Completo</p>
              <p className="font-medium text-gray-900">{selectedUser.name}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">Correo Electrónico</p>
              <p className="font-medium text-gray-900">{selectedUser.email}</p>
            </div>
            <div className="mt-6 flex justify-end">
              <Button onClick={() => setShowViewModal(false)}>Cerrar</Button>
            </div>
          </div>
        )}
      </Modal>

      {/* 3. Modal Eliminar Confirmación */}
      <Modal
        isOpen={showDeleteModal}
        title="Eliminar Usuario"
        onClose={() => setShowDeleteModal(false)}
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            ¿Estás seguro que deseas eliminar el usuario <span className="font-semibold">{selectedUser?.name}</span>? Esta acción no se puede deshacer.
          </p>
          <div className="mt-6 flex justify-end space-x-3">
            <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
              Cancelar
            </Button>
            <Button variant="danger" onClick={confirmDelete}>
              Eliminar
            </Button>
          </div>
        </div>
      </Modal>

      {/* 4. Modal Login (En Desarrollo) */}
      <Modal
        isOpen={showDevModal}
        title="Función en Desarrollo"
        onClose={() => setShowDevModal(false)}
      >
        <div className="space-y-4">
          <div className="flex items-center text-blue-600 bg-blue-50 p-4 rounded-lg">
            <svg className="w-6 h-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p>El login como <span className="font-semibold">{selectedUser?.name}</span> (suplanta de identidad) está en desarrollo.</p>
          </div>
          <div className="mt-6 flex justify-end">
            <Button onClick={() => setShowDevModal(false)}>Entendido</Button>
          </div>
        </div>
      </Modal>

    </div>
  );
};

export default SAUsuarios;
