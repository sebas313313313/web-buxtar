import React, { useState } from 'react';
import { Card, Button, Input, Modal, Toast, ActionModal } from '../../components';
import { useToast } from '../../hooks/useToast';

const EMPRESAS_MOCK = [
  { id: 1, nombre: 'Empresa Cafetalera del Norte' },
  { id: 2, nombre: 'Cooperativa de Cafés Especiales' },
  { id: 3, nombre: 'Federación Regional de Cafeteros' },
];

const Zonas = () => {
  const [selectedEmpresa, setSelectedEmpresa] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null });
  const [zones, setZones] = useState([
    {
      id: 1,
      empresaId: 1,
      name: 'Zona Norte',
      status: 'active',
    },
    {
      id: 2,
      empresaId: 1,
      name: 'Zona Sur',
      status: 'active',
    },
    {
      id: 3,
      empresaId: 2,
      name: 'Zona Centro',
      status: 'active',
    },
    {
      id: 4,
      empresaId: 2,
      name: 'Zona Este',
      status: 'inactive',
    },
  ]);

  const { toasts, addToast, removeToast } = useToast();

  const [newZone, setNewZone] = useState({
    name: '',
    status: 'active'
  });

  const handleEdit = (id) => {
    addToast('Función de edición en desarrollo', 'info');
  };

  const handleDelete = (id) => {
    setDeleteModal({ isOpen: true, id });
  };

  const confirmDelete = () => {
    if (deleteModal.id) {
      setZones(zones.filter(z => z.id !== deleteModal.id));
      addToast('Zona eliminada correctamente', 'success');
      setDeleteModal({ isOpen: false, id: null });
    }
  };

  const handleToggleStatus = (id) => {
    setZones(zones.map(z => {
      if (z.id === id) {
        const newStatus = z.status === 'active' ? 'inactive' : 'active';
        addToast(`Zona ${newStatus === 'active' ? 'activada' : 'desactivada'}`, 'success');
        return { ...z, status: newStatus };
      }
      return z;
    }));
  };

  const handleCreateZone = () => {
    if (!newZone.name.trim()) return;

    const newId = Math.max(...zones.map(z => z.id), 0) + 1;
    const zoneToAdd = {
      id: newId,
      empresaId: parseInt(selectedEmpresa),
      name: newZone.name,
      status: newZone.status
    };

    setZones([...zones, zoneToAdd]);
    setNewZone({ name: '', status: 'active' });
    setShowCreateModal(false);
    addToast('Zona creada exitosamente', 'success');
  };

  const filteredZones = zones.filter(zone =>
    zone.empresaId === parseInt(selectedEmpresa) &&
    zone.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Selector de Empresa */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Zonas</h1>
          <p className="text-gray-500 text-sm">Gestiona las zonas cafeteras asignadas a cada empresa.</p>
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
          <p className="text-gray-500 max-w-sm">Para ver y gestionar las zonas, por favor elige una empresa del listado superior.</p>
        </div>
      ) : (
        <>
          {/* Controles Superiores */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        {/* Botón Crear Zona */}
        <Button 
          className="flex items-center"
          onClick={() => setShowCreateModal(true)}
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Crear Zona
        </Button>

        {/* Buscador */}
        <div className="w-full sm:w-auto">
          <Input
            type="text"
            placeholder="Buscar zona..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-64"
          />
        </div>
      </div>

      {/* Tabla de Zonas */}
      <Card>
        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nombre
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="relative px-6 py-3">
                  <span className="sr-only">Acciones</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredZones.map((zone) => (
                <tr key={zone.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {zone.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`
                        inline-flex px-2 py-1 text-xs font-semibold rounded-full
                        ${zone.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                        }
                      `}
                    >
                      {zone.status === 'active' ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex space-x-3 justify-end">
                      {/* Botón Editar */}
                      <button
                        onClick={() => handleEdit(zone.id)}
                        className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors group"
                        title="Editar"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>

                      {/* Botón Activar/Desactivar */}
                      <button
                        onClick={() => handleToggleStatus(zone.id)}
                        className={`
                          inline-flex items-center justify-center w-8 h-8 rounded-full transition-colors group
                          ${zone.status === 'active' 
                            ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                            : 'bg-green-100 text-green-600 hover:bg-green-200'
                          }
                        `}
                        title={zone.status === 'active' ? 'Desactivar' : 'Activar'}
                      >
                        {zone.status === 'active' ? (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        ) : (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {/* Mensaje cuando no hay resultados */}
          {filteredZones.length === 0 && (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No se encontraron zonas</h3>
              <p className="mt-1 text-sm text-gray-500">
                No hay zonas que coincidan con "{searchTerm}"
              </p>
            </div>
          )}
        </div>
      </Card>

      {/* Modal Crear Zona */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Crear Zona"
        size="md"
        className="overflow-hidden"
      >
        <div className="space-y-4">
          {/* Nombre de la zona */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombre de la Zona
            </label>
            <Input
              type="text"
              placeholder="Ej: Zona Norte"
              value={newZone.name}
              onChange={(e) => setNewZone({ ...newZone, name: e.target.value })}
              className="w-full"
            />
          </div>

          {/* Estado */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Estado
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="status"
                  value="active"
                  checked={newZone.status === 'active'}
                  onChange={(e) => setNewZone({ ...newZone, status: e.target.value })}
                  className="w-4 h-4 text-cafe-vino-600 focus:ring-cafe-vino-500 border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-700">Activo</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="status"
                  value="inactive"
                  checked={newZone.status === 'inactive'}
                  onChange={(e) => setNewZone({ ...newZone, status: e.target.value })}
                  className="w-4 h-4 text-cafe-vino-600 focus:ring-cafe-vino-500 border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-700">Inactivo</span>
              </label>
            </div>
          </div>
        </div>

        {/* Botones */}
        <div className="flex justify-end space-x-3 pt-4 border-t">
          <Button
            variant="outline"
            onClick={() => setShowCreateModal(false)}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleCreateZone}
            disabled={!newZone.name.trim()}
          >
            Guardar
          </Button>
        </div>
      </Modal>

        </>
      )}

      {/* Modal Confirmar Eliminación */}
      <ActionModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, id: null })}
        onAction={confirmDelete}
        title="Eliminar Zona"
        description="¿Estás seguro de que deseas eliminar esta zona? Esta acción no se puede deshacer."
        actionText="Eliminar"
        cancelText="Cancelar"
        icon="danger"
        actionColor="danger"
      />

      {/* Toasts - Renderizado fuera del modal para evitar z-index issues */}
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

export default Zonas;
