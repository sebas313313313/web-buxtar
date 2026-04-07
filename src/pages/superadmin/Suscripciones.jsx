import React, { useState } from 'react';
import { PageHeader, Card, Button, Input, Modal, ActionButtons, SearchBar, StatusBadge, EmptyState } from '../../components';

// Datos de prueba iniciales
const initialSuscripciones = [
  { 
    id: '1', 
    name: 'Cooperativa Andes', 
    dni: '800.987.654-3', 
    email: 'gerencia@andescoop.co',
    rolType: 'Empresa Premium',
    startDate: '2023-01-15',
    endDate: '2024-01-15',
    license: 'LIC-ANDES-2023-9X',
    value: '1200.00',
    code: 'SUB-001',
    status: 'active'
  },
  { 
    id: '2', 
    name: 'Pedro Luis Martínez', 
    dni: '1020304050', 
    email: 'pedro.martinez@ejemplo.com',
    rolType: 'Caficultor Pro',
    startDate: '2023-05-01',
    endDate: '2023-11-01',
    license: 'LIC-CAFI-554-1P',
    value: '150.00',
    code: 'SUB-002',
    status: 'inactive'
  },
  { 
    id: '3', 
    name: 'Laura Restrepo', 
    dni: '1098733221', 
    email: 'laura.r@ejemplo.com',
    rolType: 'Asesor Élite',
    startDate: '2023-08-10',
    endDate: '2024-08-10',
    license: 'LIC-EXT-112-8Y',
    value: '300.00',
    code: 'SUB-003',
    status: 'active'
  }
];

const SASuscripciones = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suscripciones, setSuscripciones] = useState(initialSuscripciones);
  
  // Modals state
  const [showFormModal, setShowFormModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [selectedSub, setSelectedSub] = useState(null);
  
  const initialFormData = {
    name: '', dni: '', email: '', 
    rolType: '', startDate: '', endDate: '', license: '', value: '', code: '', status: 'active'
  };
  const [formData, setFormData] = useState(initialFormData);

  // Filtro
  const filteredSubs = suscripciones.filter(sub => 
    sub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sub.license.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sub.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handlers
  const handleAdd = () => {
    setSelectedSub(null);
    setFormData(initialFormData);
    setShowFormModal(true);
  };

  const handleEdit = (sub) => {
    setSelectedSub(sub);
    setFormData({ ...sub });
    setShowFormModal(true);
  };

  const handleView = (sub) => {
    setSelectedSub(sub);
    setShowViewModal(true);
  };

  const handleDelete = (sub) => {
    setSelectedSub(sub);
    setShowDeleteModal(true);
  };

  const handleClear = () => {
    setFormData(initialFormData);
  }

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedSub) {
      setSuscripciones(suscripciones.map(s => s.id === selectedSub.id ? { ...formData, id: s.id } : s));
    } else {
      const newSub = {
        ...formData,
        id: Date.now().toString(),
        code: formData.code || `SUB-00${suscripciones.length + 1}`,
      };
      setSuscripciones([newSub, ...suscripciones]);
    }
    setShowFormModal(false);
  };

  const confirmDelete = () => {
    setSuscripciones(suscripciones.filter(s => s.id !== selectedSub.id));
    setShowDeleteModal(false);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Administración de Suscripciones"
        subtitle="Otorga accesos Premium y gestiona licencias para usuarios y empresas especiales"
      >
        <Button onClick={handleAdd}>
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Crear Suscripción
        </Button>
      </PageHeader>

      <Card>
        <div className="mb-6">
          <SearchBar
            placeholder="Buscar por usuario, licencia o código..."
            value={searchTerm}
            onChange={setSearchTerm}
          />
        </div>

        <div className="overflow-x-auto">
          {filteredSubs.length > 0 ? (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usuario / Org.</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo de Rol</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Licencia</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vigencia</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Valor ($)</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredSubs.map((sub) => (
                  <tr key={sub.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-cafe-vino-700">{sub.name}</div>
                      <div className="text-xs text-gray-500">{sub.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 bg-amber-50 font-medium">{sub.rolType}</td>
                    <td className="px-6 py-4 whitespace-nowrap font-mono text-xs text-purple-600">{sub.license}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div><span className="font-medium text-gray-700">De:</span> {sub.startDate}</div>
                      <div><span className="font-medium text-gray-700">A:</span> {sub.endDate}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <StatusBadge status={sub.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-green-600">
                      ${sub.value}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <ActionButtons
                        showView={true}
                        showEdit={true}
                        showDelete={true}
                        onView={() => handleView(sub)}
                        onEdit={() => handleEdit(sub)}
                        onDelete={() => handleDelete(sub)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <EmptyState
              title="No se encontraron suscripciones"
              message="No hay registros activos que coincidan con tu búsqueda."
            />
          )}
        </div>
      </Card>

      {/* 1. Modal Agregar/Editar Suscripción */}
      <Modal
        isOpen={showFormModal}
        title={selectedSub ? "Editar Suscripción" : "Agregar Nueva Suscripción"}
        onClose={() => setShowFormModal(false)}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <h3 className="font-semibold text-lg text-cafe-vino-800 border-b pb-2 mb-4">Datos del Beneficiario</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Nombre completo u Organización"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Ej. Pedro Pérez"
              required
            />
            <Input
              label="Número de Identificación (DNI/NIT)"
              value={formData.dni}
              onChange={(e) => setFormData({ ...formData, dni: e.target.value })}
              placeholder="123456789"
              required
            />
            <div className="md:col-span-2">
              <Input
                label="Correo electrónico"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="ejemplo@correo.com"
                required
              />
            </div>
          </div>

          <h3 className="font-semibold text-lg text-cafe-vino-800 border-b pb-2 mt-6 mb-4">Datos de Suscripción</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Rol / Plan</label>
              <select
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-cafe-vino-500 focus:ring-cafe-vino-500 sm:text-sm py-2 px-3 border"
                value={formData.rolType}
                onChange={(e) => setFormData({ ...formData, rolType: e.target.value })}
                required
              >
                <option value="">Selecciona...</option>
                <option value="Caficultor Pro">Caficultor Pro</option>
                <option value="Empresa Premium">Empresa Premium</option>
                <option value="Asesor Élite">Asesor Élite (Extensionista)</option>
              </select>
            </div>
            
            <Input
              label="Fecha de inicio"
              type="date"
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              required
            />
            <Input
              label="Fecha de fin"
              type="date"
              value={formData.endDate}
              onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              required
            />
            <Input
              label="Licencia (Key)"
              value={formData.license}
              onChange={(e) => setFormData({ ...formData, license: e.target.value })}
              placeholder="Ej. LIC-ABCD-1234"
              required
            />
            <Input
              label="Código Interno"
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value })}
              placeholder="Opcional: SUB-XYZ"
            />
            <Input
              label="Valor (USD/COP)"
              type="number"
              step="0.01"
              value={formData.value}
              onChange={(e) => setFormData({ ...formData, value: e.target.value })}
              placeholder="150.00"
              required
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
              <select
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-cafe-vino-500 focus:ring-cafe-vino-500 sm:text-sm py-2 px-3 border"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                required
              >
                <option value="active">Activa</option>
                <option value="inactive">Vencida / Inactiva</option>
                <option value="pending">Pendiente de Pago</option>
              </select>
            </div>
          </div>

          <div className="mt-8 flex justify-end space-x-3 pt-4 border-t">
            <Button type="button" variant="secondary" onClick={() => setShowFormModal(false)}>
              Cerrar
            </Button>
            {!selectedSub && (
              <Button type="button" className="bg-gray-100 text-gray-700 hover:bg-gray-200" onClick={handleClear}>
                Limpiar
              </Button>
            )}
            <Button type="submit">
              {selectedSub ? 'Actualizar' : 'Crear'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* 2. Modal Ver Detalles */}
      <Modal
        isOpen={showViewModal}
        title="Detalle de Suscripción"
        onClose={() => setShowViewModal(false)}
      >
        {selectedSub && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-cafe-vino-600 to-amber-600 rounded-lg p-6 text-white flex justify-between items-center shadow-lg">
              <div>
                <p className="text-amber-100 text-sm font-medium uppercase tracking-wider">{selectedSub.rolType}</p>
                <p className="text-2xl font-bold mt-1">{selectedSub.name}</p>
                <p className="text-amber-50 opacity-90">{selectedSub.email}</p>
              </div>
              <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/></svg>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-sm bg-gray-50 p-4 rounded-lg border border-gray-100">
              <div>
                <span className="block text-gray-500 mb-1">Identificación</span>
                <span className="font-medium text-gray-900">{selectedSub.dni}</span>
              </div>
              <div>
                <span className="block text-gray-500 mb-1">Estado de la cuenta</span>
                <StatusBadge status={selectedSub.status} />
              </div>
              <div>
                <span className="block text-gray-500 mb-1">Fecha de Inicio</span>
                <span className="font-medium text-gray-900">{selectedSub.startDate}</span>
              </div>
              <div>
                <span className="block text-gray-500 mb-1">Fecha de Vencimiento</span>
                <span className="font-medium text-gray-900">{selectedSub.endDate}</span>
              </div>
              <div className="col-span-2">
                <span className="block text-gray-500 mb-1">Clave de Licencia Integrada</span>
                <span className="font-mono bg-purple-100 text-purple-700 px-3 py-1.5 rounded inline-block font-semibold tracking-wider">
                  {selectedSub.license}
                </span>
              </div>
            </div>

            <div className="mt-8 flex justify-end pt-4 border-t">
              <Button onClick={() => setShowViewModal(false)}>Cerrar Panel</Button>
            </div>
          </div>
        )}
      </Modal>

      {/* 3. Modal Eliminar Confirmación */}
      <Modal
        isOpen={showDeleteModal}
        title="Eliminar Suscripción"
        onClose={() => setShowDeleteModal(false)}
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            ¿Estás seguro que deseas eliminar la suscripción de <span className="font-semibold">{selectedSub?.name}</span>? 
            Esta cuenta perderá inmediatamente todos los privilegios premium asignados.
          </p>
          <div className="mt-6 flex justify-end space-x-3">
            <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
              Cancelar
            </Button>
            <Button variant="danger" onClick={confirmDelete}>
              Revocar Acceso
            </Button>
          </div>
        </div>
      </Modal>

    </div>
  );
};

export default SASuscripciones;
