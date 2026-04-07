import React, { useState } from 'react';
import { PageHeader, Card, Button, Input, Modal, ActionButtons, SearchBar, StatusBadge, EmptyState } from '../../components';

// Datos de prueba iniciales
const initialCompanies = [
  { id: '1', name: 'Café Export S.A.', phone: '+57 320 123 4567', nit: '900.123.456-7', status: 'active', email: 'contacto@cafeexport.com' },
  { id: '2', name: 'Cooperativa Andes', phone: '+57 315 987 6543', nit: '800.987.654-3', status: 'inactive', email: 'gerencia@andescoop.co' },
  { id: '3', name: 'Finca El Sol', phone: '+57 300 456 7890', nit: '901.456.789-0', status: 'active', email: 'admin@elsol.com' },
];

const SAEmpresas = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [companies, setCompanies] = useState(initialCompanies);
  
  // Modals state
  const [showFormModal, setShowFormModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showBlockModal, setShowBlockModal] = useState(false);

  const [selectedCompany, setSelectedCompany] = useState(null);
  const [formData, setFormData] = useState({ 
    name: '', 
    nit: '', 
    phone: '', 
    email: '', 
    password: '',
    logo: null
  });

  // Filtro
  const filteredCompanies = companies.filter(company => 
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.nit.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handlers
  const handleAdd = () => {
    setSelectedCompany(null);
    setFormData({ name: '', nit: '', phone: '', email: '', password: '', logo: null });
    setShowFormModal(true);
  };

  const handleEdit = (company) => {
    setSelectedCompany(company);
    setFormData({ 
      name: company.name, 
      nit: company.nit, 
      phone: company.phone, 
      email: company.email, 
      password: '',
      logo: null // En edición también podríamos permitir resubir, pero por ahora en blanco
    });
    setShowFormModal(true);
  };

  const handleView = (company) => {
    setSelectedCompany(company);
    setShowViewModal(true);
  };

  const handleDelete = (company) => {
    setSelectedCompany(company);
    setShowDeleteModal(true);
  };

  const handleBlock = (company) => {
    setSelectedCompany(company);
    setShowBlockModal(true);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, logo: e.target.files[0] });
    }
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedCompany) {
      setCompanies(companies.map(c => c.id === selectedCompany.id ? { 
        ...c, 
        name: formData.name, 
        nit: formData.nit,
        phone: formData.phone,
        email: formData.email
      } : c));
    } else {
      const newCompany = {
        id: Date.now().toString(),
        name: formData.name,
        nit: formData.nit,
        phone: formData.phone,
        email: formData.email,
        status: 'active'
      };
      setCompanies([newCompany, ...companies]);
    }
    setShowFormModal(false);
  };

  const confirmDelete = () => {
    setCompanies(companies.filter(c => c.id !== selectedCompany.id));
    setShowDeleteModal(false);
  };

  const confirmBlock = () => {
    setCompanies(companies.map(c => c.id === selectedCompany.id ? {
      ...c,
      status: c.status === 'active' ? 'inactive' : 'active'
    } : c));
    setShowBlockModal(false);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Administración de Empresas"
        subtitle="Agrega, bloquea y gestiona las empresas clientes del sistema"
      >
        <Button onClick={handleAdd}>
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Agregar nueva empresa
        </Button>
      </PageHeader>

      <Card>
        <div className="mb-6">
          <SearchBar
            placeholder="Buscar por nombre, NIT o correo..."
            value={searchTerm}
            onChange={setSearchTerm}
          />
        </div>

        <div className="overflow-x-auto">
          {filteredCompanies.length > 0 ? (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NIT</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teléfono</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCompanies.map((company) => (
                  <tr key={company.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-cafe-vino-700">{company.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{company.nit}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{company.phone}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <StatusBadge status={company.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <ActionButtons
                        showView={true}
                        showEdit={true}
                        showBlock={true}
                        showDelete={true}
                        onView={() => handleView(company)}
                        onEdit={() => handleEdit(company)}
                        onBlock={() => handleBlock(company)}
                        onDelete={() => handleDelete(company)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <EmptyState
              title="No se encontraron empresas"
              message="No hay registros que coincidan con tu búsqueda."
            />
          )}
        </div>
      </Card>

      {/* 1. Modal Agregar/Editar Empresa */}
      <Modal
        isOpen={showFormModal}
        title={selectedCompany ? "Editar Empresa" : "Agregar Nueva Empresa"}
        onClose={() => setShowFormModal(false)}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <h3 className="font-semibold text-lg text-cafe-vino-800 border-b pb-2 mb-4">Información de la organización</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Nombre Comercial"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Ej. Café Export S.A."
              required
            />
            <Input
              label="NIT / Documento"
              value={formData.nit}
              onChange={(e) => setFormData({ ...formData, nit: e.target.value })}
              placeholder="900.000.000-0"
              required
            />
          </div>

          <Input
            label="Teléfono de Contacto"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="+57 300 000 0000"
            required
          />

          <div className="space-y-1 mt-1">
            <label className="block text-sm font-medium text-gray-700">Logo o Avatar de la empresa</label>
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
            {formData.logo && <p className="text-xs text-green-600 mt-1">Archivo seleccionado: {formData.logo.name}</p>}
          </div>

          <h3 className="font-semibold text-lg text-cafe-vino-800 border-b pb-2 mt-6 mb-4">Datos de usuario para la empresa</h3>
          
          <Input
            label="Correo del usuario administrador"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="admin@empresa.com"
            required
          />
          <Input
            label={selectedCompany ? "Nueva Contraseña (opcional)" : "Contraseña"}
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            placeholder="••••••••"
            required={!selectedCompany}
          />

          <div className="mt-8 flex justify-end space-x-3 pt-4 border-t">
            <Button type="button" variant="secondary" onClick={() => setShowFormModal(false)}>
              Cancelar
            </Button>
            <Button type="submit">
              {selectedCompany ? 'Guardar Cambios' : 'Crear Empresa'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* 2. Modal Ver Detalles */}
      <Modal
        isOpen={showViewModal}
        title="Detalles de la Empresa"
        onClose={() => setShowViewModal(false)}
      >
        {selectedCompany && (
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg flex items-start space-x-4">
              <div className="w-16 h-16 bg-white border border-gray-200 rounded-lg flex items-center justify-center flex-shrink-0 text-gray-400">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
              </div>
              <div>
                <p className="font-semibold text-lg text-cafe-vino-900">{selectedCompany.name}</p>
                <p className="text-sm text-gray-500">NIT: {selectedCompany.nit}</p>
                <div className="mt-1">
                  <StatusBadge status={selectedCompany.status} />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">Teléfono</p>
                <p className="font-medium text-gray-900">{selectedCompany.phone}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">Correo de Usuario Admin</p>
                <p className="font-medium text-gray-900 truncate" title={selectedCompany.email}>{selectedCompany.email}</p>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <Button onClick={() => setShowViewModal(false)}>Cerrar</Button>
            </div>
          </div>
        )}
      </Modal>

      {/* 3. Modal Bloquear Confirmación */}
      <Modal
        isOpen={showBlockModal}
        title={selectedCompany?.status === 'active' ? "Bloquear Empresa" : "Desbloquear Empresa"}
        onClose={() => setShowBlockModal(false)}
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            ¿Estás seguro que deseas {selectedCompany?.status === 'active' ? 'bloquear' : 'desbloquear'} a <span className="font-semibold">{selectedCompany?.name}</span>?
            {selectedCompany?.status === 'active' && ' Al hacerlo, ningún usuario de esta empresa podrá acceder al sistema.'}
          </p>
          <div className="mt-6 flex justify-end space-x-3">
            <Button variant="secondary" onClick={() => setShowBlockModal(false)}>
              Cancelar
            </Button>
            <Button onClick={confirmBlock} className={selectedCompany?.status === 'active' ? "bg-orange-600 hover:bg-orange-700" : "bg-green-600 hover:bg-green-700"}>
              {selectedCompany?.status === 'active' ? 'Bloquear Empresa' : 'Desbloquear Empresa'}
            </Button>
          </div>
        </div>
      </Modal>

      {/* 4. Modal Eliminar Confirmación */}
      <Modal
        isOpen={showDeleteModal}
        title="Eliminar Empresa"
        onClose={() => setShowDeleteModal(false)}
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            ¿Estás seguro que deseas eliminar permanentemente a la organización <span className="font-semibold">{selectedCompany?.name}</span>? Esta acción purgará todos los dependientes y no se puede revertir.
          </p>
          <div className="mt-6 flex justify-end space-x-3">
            <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
              Cancelar
            </Button>
            <Button variant="danger" onClick={confirmDelete}>
              Sí, eliminar permanentemente
            </Button>
          </div>
        </div>
      </Modal>

    </div>
  );
};

export default SAEmpresas;
