import React, { useState, useEffect } from 'react';
import { Card, Button, Input, Modal, Toast, ActionModal } from '../../components';
import MapaGIS from '../../components/MapaGIS';
import { useToast } from '../../hooks/useToast';
import { useAuthHook } from '../../hooks/useAuth';

const EMPRESAS_MOCK = [
  { id: 1, nombre: 'Empresa Cafetalera del Norte' },
  { id: 2, nombre: 'Cooperativa de Cafés Especiales' },
  { id: 3, nombre: 'Federación Regional de Cafeteros' },
];

const Zona = () => {
  const { user } = useAuthHook();
  // Intentar pre-seleccionar la empresa del usuario si existe en el mock o es válida
  const [selectedEmpresa, setSelectedEmpresa] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null });
  const [vistaActiva, setVistaActiva] = useState('lista');
  const [zones, setZones] = useState([
    { id: 1, empresaId: 1, name: 'Zona Norte',  status: 'active',   caficultores: 42, municipios: 'Chinchiná, Manizales' },
    { id: 2, empresaId: 1, name: 'Zona Sur',    status: 'active',   caficultores: 35, municipios: 'Génova, Pijao' },
    { id: 3, empresaId: 2, name: 'Zona Centro', status: 'active',   caficultores: 28, municipios: 'Armenia, Calarcá' },
    { id: 4, empresaId: 2, name: 'Zona Este',   status: 'inactive', caficultores: 18, municipios: 'Salento, Filandia' },
  ]);

  const ZONAS_GEOJSON = {
    1: { type: 'Polygon', coordinates: [[[-75.74,4.87],[-75.70,4.87],[-75.70,4.83],[-75.74,4.83],[-75.74,4.87]]] },
    2: { type: 'Polygon', coordinates: [[[-75.69,4.87],[-75.65,4.87],[-75.65,4.83],[-75.69,4.83],[-75.69,4.87]]] },
    3: { type: 'Polygon', coordinates: [[[-75.74,4.82],[-75.70,4.82],[-75.70,4.78],[-75.74,4.78],[-75.74,4.82]]] },
    4: { type: 'Polygon', coordinates: [[[-75.69,4.82],[-75.65,4.82],[-75.65,4.78],[-75.69,4.78],[-75.69,4.82]]] },
  };
  const ZONA_COLORS = ['#7c3aed', '#0891b2', '#059669', '#d97706'];

  const { toasts, addToast, removeToast } = useToast();

  const [newZone, setNewZone] = useState({
    name: '',
    status: 'active'
  });

  // Al cargar, si el usuario es de tipo empresa, podemos intentar filtrar por ella
  // En este demo, simplemente seteamos la primera empresa del mock si no hay nada
  useEffect(() => {
    if (!selectedEmpresa && EMPRESAS_MOCK.length > 0) {
      // Si el usuario tiene una empresa asociada en su perfil, la buscamos
      // Por ahora para el demo, seleccionamos la ID 1
      setSelectedEmpresa('1');
    }
  }, []);

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
      {/* Cabecera y Selector (Prácticamente igual al rol de AT) */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Zonas</h1>
          <p className="text-gray-500 text-sm">Gestiona las zonas cafeteras de tu empresa.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <label className="text-sm font-medium text-gray-700 whitespace-nowrap">Empresa seleccionada:</label>
          <select 
            value={selectedEmpresa}
            onChange={(e) => setSelectedEmpresa(e.target.value)}
            className="w-full sm:w-64 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-vino outline-none transition-all text-sm"
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
          <h3 className="text-lg font-semibold text-gray-900 mb-1">Empresa no identificada</h3>
          <p className="text-gray-500 max-w-sm">Por favor selecciona la empresa para ver sus zonas asociadas.</p>
        </div>
      ) : (
        <>
          {/* Controles */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <Button className="flex items-center" onClick={() => setShowCreateModal(true)}>
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Crear Zona
            </Button>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Input type="text" placeholder="Buscar zona..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full sm:w-56" />
              <div className="flex bg-gray-100 rounded-lg p-1 shrink-0">
                <button onClick={() => setVistaActiva('lista')} className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${vistaActiva === 'lista' ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}>Lista</button>
                <button onClick={() => setVistaActiva('mapa')} className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${vistaActiva === 'mapa' ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}>🗺️ Mapa</button>
              </div>
            </div>
          </div>

          {/* VISTA LISTA */}
          {vistaActiva === 'lista' && (
            <Card>
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Caficultores</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Municipios</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                      <th className="relative px-6 py-3"><span className="sr-only">Acciones</span></th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredZones.map((zone) => (
                      <tr key={zone.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{zone.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{zone.caficultores}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{zone.municipios}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${zone.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {zone.status === 'active' ? 'Activo' : 'Inactivo'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex space-x-3 justify-end">
                            <button onClick={() => handleEdit(zone.id)} className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 flex items-center justify-center transition-colors" title="Editar">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                            </button>
                            <button onClick={() => handleToggleStatus(zone.id)} className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${zone.status === 'active' ? 'bg-red-100 text-red-600 hover:bg-red-200' : 'bg-green-100 text-green-600 hover:bg-green-200'}`} title={zone.status === 'active' ? 'Desactivar' : 'Activar'}>
                              {zone.status === 'active' ? <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg> : <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filteredZones.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-sm text-gray-500">No hay zonas que coincidan con "{searchTerm}"</p>
                  </div>
                )}
              </div>
            </Card>
          )}

          {/* VISTA MAPA */}
          {vistaActiva === 'mapa' && (
            <div className="space-y-3">
              {filteredZones.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 px-4 py-3 flex flex-wrap gap-3">
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wide self-center">Leyenda:</span>
                  {filteredZones.map((z, idx) => (
                    <div key={z.id} className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: ZONA_COLORS[idx % ZONA_COLORS.length] }} />
                      <span className="text-xs text-gray-700">{z.name} ({z.caficultores} caf.)</span>
                    </div>
                  ))}
                </div>
              )}
              <MapaGIS
                center={[4.82, -75.70]}
                zoom={12}
                height="520px"
                editable={false}
                poligonosZonas={filteredZones.map((z, idx) => ({ id: z.id, nombre: z.name, geojson: ZONAS_GEOJSON[z.id] || null, color: ZONA_COLORS[idx % ZONA_COLORS.length], caficultores: z.caficultores, municipios: z.municipios }))}
              />
            </div>
          )}

          <Modal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)} title="Crear Zona" size="md">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nombre de la Zona</label>
                <Input type="text" placeholder="Ej: Vereda La Esperanza" value={newZone.name} onChange={(e) => setNewZone({ ...newZone, name: e.target.value })} className="w-full" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Estado inicial</label>
                <div className="flex space-x-4">
                  <label className="flex items-center"><input type="radio" value="active" checked={newZone.status === 'active'} onChange={(e) => setNewZone({ ...newZone, status: e.target.value })} className="w-4 h-4 text-brand-vino focus:ring-brand-vino" /><span className="ml-2 text-sm text-gray-700">Activo</span></label>
                  <label className="flex items-center"><input type="radio" value="inactive" checked={newZone.status === 'inactive'} onChange={(e) => setNewZone({ ...newZone, status: e.target.value })} className="w-4 h-4 text-brand-vino focus:ring-brand-vino" /><span className="ml-2 text-sm text-gray-700">Inactivo</span></label>
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-3 pt-6 border-t mt-6">
              <Button variant="outline" onClick={() => setShowCreateModal(false)}>Cancelar</Button>
              <Button onClick={handleCreateZone} disabled={!newZone.name.trim()}>Guardar Zona</Button>
            </div>
          </Modal>
        </>
      )}

      <ActionModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, id: null })}
        onAction={confirmDelete}
        title="Eliminar Zona"
        description="¿Estás seguro de que deseas eliminar esta zona permanentemente?"
        actionText="Eliminar"
        cancelText="Cancelar"
        icon="danger"
        actionColor="danger"
      />

      <div className="fixed top-0 right-0 z-[60]">
        {toasts.map((toast) => (
          <Toast key={toast.id} message={toast.message} type={toast.type} isVisible={toast.isVisible} onClose={() => removeToast(toast.id)} duration={toast.duration} />
        ))}
      </div>
    </div>
  );
};

export default Zona;
