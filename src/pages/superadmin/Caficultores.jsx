import React, { useState } from 'react';
import { PageHeader, Card, Button, Input, Modal, ActionButtons, SearchBar, EmptyState } from '../../components';

// Datos de prueba iniciales (mínimo 5 caficultores)
const initialCaficultores = [
  { id: '1', name: 'Pedro Luis Martínez', email: 'pedro.martinez@ejemplo.com', phone: '+57 311 987 6543', dni: '1020304050', gender: 'Masculino', civilStatus: 'Casado(a)', children: 2, dob: '1975-06-14', country: 'Colombia' },
  { id: '2', name: 'Ana Rosa Jiménez', email: 'ana.jimenez@ejemplo.com', phone: '+57 320 123 4567', dni: '1098765432', gender: 'Femenino', civilStatus: 'Soltero(a)', children: 0, dob: '1988-11-20', country: 'Colombia' },
  { id: '3', name: 'Carlos Mario López', email: 'carlos.mario@ejemplo.com', phone: '+57 315 456 7890', dni: '52824792', gender: 'Masculino', civilStatus: 'Casado(a)', children: 3, dob: '1968-03-05', country: 'Colombia' },
  { id: '4', name: 'María Elena Suárez', email: 'maria.suarez@ejemplo.com', phone: '+57 310 999 8888', dni: '16928475', gender: 'Femenino', civilStatus: 'Unión Libre', children: 1, dob: '1982-09-17', country: 'Colombia' },
  { id: '5', name: 'Jorge Iván Giraldo', email: 'jorge.giraldo@ejemplo.com', phone: '+57 300 777 6666', dni: '1050607080', gender: 'Masculino', civilStatus: 'Viudo(a)', children: 4, dob: '1960-12-01', country: 'Colombia' },
];

const SACaficultores = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [caficultores, setCaficultores] = useState(initialCaficultores);
  
  // Modals state
  const [showFormModal, setShowFormModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [selectedUser, setSelectedUser] = useState(null);
  
  const initialFormData = {
    name: '', dni: '', phone: '', gender: '', civilStatus: '', children: 0, dob: '', country: '', email: '', password: '', avatar: null
  };
  const [formData, setFormData] = useState(initialFormData);

  // Filtro de búsqueda
  const filteredUsers = caficultores.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.dni.includes(searchTerm)
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
      civilStatus: user.civilStatus,
      children: user.children,
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

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, avatar: e.target.files[0] });
    }
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedUser) {
      setCaficultores(caficultores.map(u => u.id === selectedUser.id ? { 
        ...u, 
        name: formData.name, 
        dni: formData.dni,
        phone: formData.phone,
        gender: formData.gender,
        civilStatus: formData.civilStatus,
        children: formData.children,
        dob: formData.dob,
        country: formData.country,
        email: formData.email
      } : u));
    } else {
      const newUser = {
        id: Date.now().toString(),
        name: formData.name,
        dni: formData.dni,
        phone: formData.phone,
        gender: formData.gender,
        civilStatus: formData.civilStatus,
        children: formData.children,
        dob: formData.dob,
        country: formData.country,
        email: formData.email
      };
      setCaficultores([newUser, ...caficultores]);
    }
    setShowFormModal(false);
  };

  const confirmDelete = () => {
    setCaficultores(caficultores.filter(u => u.id !== selectedUser.id));
    setShowDeleteModal(false);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Administración de Caficultores"
        subtitle="Gestión directa sobre la base de datos de caficultores de todo el proyecto"
      >
        <Button onClick={handleAdd}>
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Agregar nuevo caficultor
        </Button>
      </PageHeader>

      <Card>
        <div className="mb-6">
          <SearchBar
            placeholder="Buscar por nombre, correo o cédula..."
            value={searchTerm}
            onChange={setSearchTerm}
          />
        </div>

        <div className="overflow-x-auto">
          {filteredUsers.length > 0 ? (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombres</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teléfono</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-cafe-vino-700">{user.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.phone}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
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
          ) : (
            <EmptyState
              title="No se encontraron caficultores"
              message="No hay registros que coincidan con tu búsqueda."
            />
          )}
        </div>
      </Card>

      {/* 1. Modal Agregar/Editar */}
      <Modal
        isOpen={showFormModal}
        title={selectedUser ? "Editar Caficultor" : "Agregar Nuevo Caficultor"}
        onClose={() => setShowFormModal(false)}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <h3 className="font-semibold text-lg text-cafe-vino-800 border-b pb-2 mb-4">Información Personal</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Nombre completo"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Ej. Pedro Pérez"
              required
            />
            <Input
              label="DNI o Cédula"
              value={formData.dni}
              onChange={(e) => setFormData({ ...formData, dni: e.target.value })}
              placeholder="123456789"
              required
            />
            <Input
              label="Teléfono"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+57 300 000 000"
              required
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sexo</label>
              <select
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-cafe-vino-500 focus:ring-cafe-vino-500 sm:text-sm py-2 px-3 border"
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                required
              >
                <option value="">Selecciona...</option>
                <option value="Femenino">Femenino</option>
                <option value="Masculino">Masculino</option>
                <option value="Otro">Otro</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Estado Civil</label>
              <select
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-cafe-vino-500 focus:ring-cafe-vino-500 sm:text-sm py-2 px-3 border"
                value={formData.civilStatus}
                onChange={(e) => setFormData({ ...formData, civilStatus: e.target.value })}
                required
              >
                <option value="">Selecciona...</option>
                <option value="Soltero(a)">Soltero(a)</option>
                <option value="Casado(a)">Casado(a)</option>
                <option value="Unión Libre">Unión Libre</option>
                <option value="Divorciado(a)">Divorciado(a)</option>
                <option value="Viudo(a)">Viudo(a)</option>
              </select>
            </div>
            <Input
              label="Número de hijos"
              type="number"
              min="0"
              value={formData.children}
              onChange={(e) => setFormData({ ...formData, children: e.target.value })}
              required
            />

            <Input
              label="Fecha de nacimiento"
              type="date"
              value={formData.dob}
              onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
              required
            />
            <Input
              label="País"
              value={formData.country}
              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              placeholder="Colombia"
              required
            />
          </div>

          <h3 className="font-semibold text-lg text-cafe-vino-800 border-b pb-2 mt-6 mb-4">Datos de usuario para el caficultor</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Correo electrónico"
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
          </div>

          <div className="space-y-1 mt-4">
            <label className="block text-sm font-medium text-gray-700">Foto de perfil</label>
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-cafe-vino-50 file:text-cafe-vino-700
                hover:file:bg-cafe-vino-100 border border-gray-300 rounded-md shadow-sm p-1"
            />
            {formData.avatar && <p className="text-xs text-green-600 mt-1">Archivo seleccionado: {formData.avatar.name}</p>}
          </div>

          <div className="mt-8 flex justify-end space-x-3 pt-4 border-t">
            <Button type="button" variant="secondary" onClick={() => setShowFormModal(false)}>
              Cancelar
            </Button>
            <Button type="submit">
              {selectedUser ? 'Actualizar Caficultor' : 'Crear caficultor'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* 2. Modal Ver Detalles */}
      <Modal
        isOpen={showViewModal}
        title="Perfil de Caficultor"
        onClose={() => setShowViewModal(false)}
      >
        {selectedUser && (
          <div className="space-y-6">
            <div className="flex items-center space-x-4 border-b pb-4">
              <div className="w-16 h-16 bg-cafe-vino-50 rounded-full flex items-center justify-center text-cafe-vino-700 font-bold text-2xl flex-shrink-0">
                {selectedUser.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">{selectedUser.name}</h3>
                <p className="text-sm text-gray-500">{selectedUser.email}</p>
                <p className="text-sm text-gray-500">C.C. {selectedUser.dni}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-sm">
              <div>
                <span className="block text-gray-500">Teléfono</span>
                <span className="font-medium text-gray-900">{selectedUser.phone}</span>
              </div>
              <div>
                <span className="block text-gray-500">Género</span>
                <span className="font-medium text-gray-900">{selectedUser.gender}</span>
              </div>
              <div>
                <span className="block text-gray-500">Estado Civil</span>
                <span className="font-medium text-gray-900">{selectedUser.civilStatus}</span>
              </div>
               <div>
                <span className="block text-gray-500">Número de Hijos</span>
                <span className="font-medium text-gray-900">{selectedUser.children}</span>
              </div>
              <div>
                <span className="block text-gray-500">Fecha de Nacimiento</span>
                <span className="font-medium text-gray-900">{selectedUser.dob}</span>
              </div>
              <div>
                <span className="block text-gray-500">País</span>
                <span className="font-medium text-gray-900">{selectedUser.country}</span>
              </div>
            </div>

            <div className="mt-8 flex justify-end pt-4 border-t">
              <Button onClick={() => setShowViewModal(false)}>Cerrar</Button>
            </div>
          </div>
        )}
      </Modal>

      {/* 3. Modal Eliminar Confirmación */}
      <Modal
        isOpen={showDeleteModal}
        title="Eliminar Caficultor"
        onClose={() => setShowDeleteModal(false)}
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            ¿Estás seguro que deseas eliminar el perfil de <span className="font-semibold">{selectedUser?.name}</span>? 
            Se perderá todo el historial de control de plagas y registros fitosanitarios.
          </p>
          <div className="mt-6 flex justify-end space-x-3">
            <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
              Cancelar
            </Button>
            <Button variant="danger" onClick={confirmDelete}>
              Eliminar Permanentemente
            </Button>
          </div>
        </div>
      </Modal>

    </div>
  );
};

export default SACaficultores;
