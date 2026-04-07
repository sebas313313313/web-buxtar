import React, { useState } from 'react';
import { PageHeader, Card, Button, Input, Modal, ActionButtons, SearchBar, EmptyState } from '../../components';

// Datos de prueba iniciales
const initialRoles = [
  { id: '1', code: 'ROL-001', name: 'caficultor', displayName: 'Caficultor', description: 'Acceso a las herramientas productivas, calendario y mensajes' },
  { id: '2', code: 'ROL-002', name: 'extensionista', displayName: 'Extensionista / Agrónomo', description: 'Gestión técnica, soporte y administración de zonas y caficultores' },
  { id: '3', code: 'ROL-003', name: 'empresa', displayName: 'Empresa', description: 'Visibilidad completa operativa, dashboard de rentabilidad y estadísticas' },
];

const SARoles = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roles, setRoles] = useState(initialRoles);
  
  // Modals state
  const [showFormModal, setShowFormModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);

  const [selectedRole, setSelectedRole] = useState(null);
  const [formData, setFormData] = useState({ name: '', displayName: '', description: '' });

  // Filtro
  const filteredRoles = roles.filter(role => 
    role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    role.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    role.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handlers
  const handleAdd = () => {
    setSelectedRole(null);
    setFormData({ name: '', displayName: '', description: '' });
    setShowFormModal(true);
  };

  const handleEdit = (role) => {
    setSelectedRole(role);
    setFormData({ name: role.name, displayName: role.displayName, description: role.description });
    setShowFormModal(true);
  };

  const handleView = (role) => {
    setSelectedRole(role);
    setShowViewModal(true);
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedRole) {
      setRoles(roles.map(r => r.id === selectedRole.id ? { 
        ...r, 
        name: formData.name, 
        displayName: formData.displayName,
        description: formData.description
      } : r));
    } else {
      const newRole = {
        id: Date.now().toString(),
        code: `ROL-00${roles.length + 1}`,
        name: formData.name,
        displayName: formData.displayName,
        description: formData.description,
      };
      setRoles([...roles, newRole]);
    }
    setShowFormModal(false);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Administrador de Roles"
        subtitle="Gestión de nombres y descripciones de los roles del sistema"
      >
        <Button onClick={handleAdd}>
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Agregar nuevo rol
        </Button>
      </PageHeader>

      <Card>
        <div className="mb-6">
          <SearchBar
            placeholder="Buscar por código o nombre..."
            value={searchTerm}
            onChange={setSearchTerm}
          />
        </div>

        <div className="overflow-x-auto">
          {filteredRoles.length > 0 ? (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Código</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre del rol</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre de visibilidad</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descripción</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredRoles.map((role) => (
                  <tr key={role.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-cafe-vino-600">{role.code}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-600">{role.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{role.displayName}</td>
                    <td className="px-6 py-4 text-sm text-gray-500 max-w-sm truncate" title={role.description}>{role.description}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <ActionButtons
                        showView={true}
                        showEdit={true}
                        showDelete={false}
                        onView={() => handleView(role)}
                        onEdit={() => handleEdit(role)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <EmptyState
              title="No se encontraron roles"
              message="No hay registros que coincidan con tu búsqueda."
            />
          )}
        </div>
      </Card>

      {/* 1. Modal Agregar/Editar Rol */}
      <Modal
        isOpen={showFormModal}
        title={selectedRole ? "Editar Rol" : "Agregar Nuevo Rol"}
        onClose={() => setShowFormModal(false)}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Nombre del rol (identificador)"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Ej. nuevo_rol"
            required
          />
          <Input
            label="Nombre de visibilidad"
            value={formData.displayName}
            onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
            placeholder="Ej. Comercializador Grano"
            required
          />
          
          <div className="space-y-1 mt-1">
            <label className="block text-sm font-medium text-gray-700">
              Descripción del rol
            </label>
            <textarea
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-cafe-vino-500 focus:ring-cafe-vino-500 min-h-[80px] p-2 border"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Explica qué puede hacer este rol en el sistema..."
              required
            />
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <Button type="button" variant="secondary" onClick={() => setShowFormModal(false)}>
              Cancelar
            </Button>
            <Button type="submit">
              {selectedRole ? 'Actualizar Rol' : 'Guardar Nuevo Rol'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* 2. Modal Ver Detalles */}
      <Modal
        isOpen={showViewModal}
        title="Detalles del Rol"
        onClose={() => setShowViewModal(false)}
      >
        {selectedRole && (
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">Nombre (ID del sistema)</p>
              <p className="font-mono text-gray-700">{selectedRole.name}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">Nombre de Vizualización</p>
              <p className="font-medium text-gray-900">{selectedRole.displayName}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">Descripción</p>
              <p className="text-gray-800">{selectedRole.description}</p>
            </div>
            <div className="mt-6 flex justify-end">
              <Button onClick={() => setShowViewModal(false)}>Aceptar (Cerrar)</Button>
            </div>
          </div>
        )}
      </Modal>

    </div>
  );
};

export default SARoles;
