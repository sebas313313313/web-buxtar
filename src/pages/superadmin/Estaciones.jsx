import React, { useState } from 'react';
import { PageHeader, Card, Button, Input, Modal, ActionButtons, SearchBar, StatusBadge, EmptyState } from '../../components';

// Datos de prueba iniciales
const initialEstaciones = [
  { id: '1', hardwareId: 'MAC:00-1B-44-11-3A-B7', farmer: 'Pedro Luis Martínez', farm: 'El Paraíso', lot: 'Lote Norte', status: 'active', location: '12.433, -71.22' },
  { id: '2', hardwareId: 'MAC:00-1B-44-11-3A-C8', farmer: 'Ana Rosa Jiménez', farm: 'La Esperanza', lot: 'Lote Principal', status: 'inactive', location: '12.450, -71.30' },
  { id: '3', hardwareId: 'MAC:00-1B-44-11-3A-D9', farmer: 'Carlos Mario López', farm: 'Buenavista', lot: 'Lote Sur', status: 'active', location: '12.410, -71.25' },
  { id: '4', hardwareId: 'MAC:00-1B-44-11-3A-E0', farmer: 'Cooperativa Andes', farm: 'Sede Central', lot: 'Invernadero 1', status: 'active', location: '12.460, -71.40' },
  { id: '5', hardwareId: 'MAC:00-1B-44-11-3B-F1', farmer: 'Pedro Luis Martínez', farm: 'El Paraíso', lot: 'Lote Este', status: 'inactive', location: '12.434, -71.21' },
];

// Datos jerárquicos de prueba para los selects dependientes
const mockFarmersData = [
  {
    name: 'Pedro Luis Martínez',
    farms: [
      { name: 'El Paraíso', lots: ['Lote Norte', 'Lote Este', 'Invernadero A'] },
      { name: 'La Bendición', lots: ['Lote 1', 'Lote 2'] }
    ]
  },
  {
    name: 'Ana Rosa Jiménez',
    farms: [
      { name: 'La Esperanza', lots: ['Lote Principal', 'Semillero'] }
    ]
  },
  {
    name: 'Carlos Mario López',
    farms: [
      { name: 'Buenavista', lots: ['Lote Sur', 'Lote Alto'] }
    ]
  },
  {
    name: 'Cooperativa Andes',
    farms: [
      { name: 'Sede Central', lots: ['Invernadero 1', 'Invernadero 2'] },
      { name: 'Finca Experimental', lots: ['Lote A', 'Lote B', 'Lote C'] }
    ]
  }
];

const SAEstaciones = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filtros Avanzados
  const [filterFarmer, setFilterFarmer] = useState('');
  const [filterFarm, setFilterFarm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const [estaciones, setEstaciones] = useState(initialEstaciones);
  
  // Modals state
  const [showFormModal, setShowFormModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showRecommendModal, setShowRecommendModal] = useState(false);

  const [selectedEstacion, setSelectedEstacion] = useState(null);
  
  const initialFormData = {
    hardwareId: '', farmer: '', farm: '', lot: '', location: '', status: 'active'
  };
  const [formData, setFormData] = useState(initialFormData);

  // Derivar las fincas y lotes disponibles basados en la selección actual para el formulario
  const availableFarms = mockFarmersData.find(f => f.name === formData.farmer)?.farms || [];
  const availableLots = availableFarms.find(f => f.name === formData.farm)?.lots || [];

  // Listas únicas para los filtros desplegables de búsqueda en la tabla base
  const uniqueFarmers = [...new Set(estaciones.map(e => e.farmer))];
  const uniqueFarms = [...new Set(estaciones.map(e => e.farm))];

  // Filtro Maestro
  const filteredEstaciones = estaciones.filter(est => {
    const matchesSearch = est.hardwareId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          est.lot.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFarmer = filterFarmer ? est.farmer === filterFarmer : true;
    const matchesFarm = filterFarm ? est.farm === filterFarm : true;
    const matchesStatus = filterStatus ? est.status === filterStatus : true;
    
    return matchesSearch && matchesFarmer && matchesFarm && matchesStatus;
  });

  // Handlers
  const handleAssign = () => {
    setSelectedEstacion(null);
    setFormData(initialFormData);
    setShowFormModal(true);
  };

  const handleEdit = (est) => {
    setSelectedEstacion(est);
    setFormData({ ...est });
    setShowFormModal(true);
  };

  const handleViewData = (est) => {
    setSelectedEstacion(est);
    setShowViewModal(true);
  };

  const handleRecommend = (est) => {
    setSelectedEstacion(est);
    setShowRecommendModal(true);
  };

  const handleDelete = (est) => {
    setSelectedEstacion(est);
    setShowDeleteModal(true);
  };

  const handleToggle = (est) => {
    setEstaciones(estaciones.map(e => e.id === est.id ? { 
      ...e, 
      status: e.status === 'active' ? 'inactive' : 'active' 
    } : e));
  };


  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedEstacion) {
      setEstaciones(estaciones.map(est => est.id === selectedEstacion.id ? { ...formData, id: est.id } : est));
    } else {
      const newEst = {
        ...formData,
        id: Date.now().toString(),
      };
      setEstaciones([newEst, ...estaciones]);
    }
    setShowFormModal(false);
  };

  const confirmDelete = () => {
    setEstaciones(estaciones.filter(est => est.id !== selectedEstacion.id));
    setShowDeleteModal(false);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Administración de Estaciones IoT"
        subtitle="Asignación y monitoreo de estaciones climáticas a nivel de hardware"
      >
        <Button onClick={handleAssign}>
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
          Asignar Estación
        </Button>
      </PageHeader>

      <Card>
        {/* Barra de Filtros Avanzados */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-4">
            <SearchBar
              placeholder="Buscar por Hardware ID MAC o Lote..."
              value={searchTerm}
              onChange={setSearchTerm}
            />
          </div>
          
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1 uppercase tracking-wider">Filtrar por Caficultor</label>
            <select
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-cafe-vino-500 focus:ring-cafe-vino-500 sm:text-sm py-2 px-3 border bg-gray-50"
              value={filterFarmer}
              onChange={(e) => setFilterFarmer(e.target.value)}
            >
              <option value="">Todos los caficultores</option>
              {uniqueFarmers.map((f, i) => <option key={i} value={f}>{f}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1 uppercase tracking-wider">Filtrar por Finca</label>
            <select
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-cafe-vino-500 focus:ring-cafe-vino-500 sm:text-sm py-2 px-3 border bg-gray-50"
              value={filterFarm}
              onChange={(e) => setFilterFarm(e.target.value)}
            >
              <option value="">Todas las fincas</option>
              {uniqueFarms.map((f, i) => <option key={i} value={f}>{f}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1 uppercase tracking-wider">Estado Operativo</label>
            <select
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-cafe-vino-500 focus:ring-cafe-vino-500 sm:text-sm py-2 px-3 border bg-gray-50"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="">Cualquier estado</option>
              <option value="active">Transmitiendo (Activa)</option>
              <option value="inactive">Apagada (Inactiva)</option>
            </select>
          </div>

          <div className="flex items-end">
            <Button variant="secondary" className="w-full" onClick={() => {
              setSearchTerm(''); setFilterFarmer(''); setFilterFarm(''); setFilterStatus('');
            }}>
              Limpiar Filtros
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          {filteredEstaciones.length > 0 ? (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hardware ID (MAC)</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Propietario / Org.</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Finca</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lote</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredEstaciones.map((est) => (
                  <tr key={est.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-purple-700 bg-purple-50">{est.hardwareId}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{est.farmer}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{est.farm}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{est.lot}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <StatusBadge status={est.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <ActionButtons
                        showRecommend={true}
                        showView={true}
                        showEdit={true}
                        showToggle={true}
                        showDelete={true}
                        isActive={est.status === 'active'}
                        onRecommend={() => handleRecommend(est)}
                        onView={() => handleViewData(est)}
                        onEdit={() => handleEdit(est)}
                        onToggle={() => handleToggle(est)}
                        onDelete={() => handleDelete(est)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <EmptyState
              title="No se encontraron estaciones"
              message="Verifica los filtros seleccionados o ingresa un ID válido."
            />
          )}
        </div>
      </Card>

      {/* 1. Modal Asignar/Editar Estación */}
      <Modal
        isOpen={showFormModal}
        title={selectedEstacion ? "Editar Estación" : "Asignar Nueva Estación"}
        onClose={() => setShowFormModal(false)}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <h3 className="font-semibold text-cafe-vino-800 border-b pb-1 mb-2">1. Vinculación y Destino</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Caficultor Asignado</label>
              <select
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-cafe-vino-500 focus:ring-cafe-vino-500 sm:text-sm py-2 px-3 border"
                value={formData.farmer}
                onChange={(e) => setFormData({ ...formData, farmer: e.target.value, farm: '', lot: '' })}
                required
              >
                <option value="">1. Selecciona un caficultor...</option>
                {mockFarmersData.map((f, i) => <option key={i} value={f.name}>{f.name}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Finca Destino</label>
              <select
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-cafe-vino-500 focus:ring-cafe-vino-500 sm:text-sm py-2 px-3 border disabled:bg-gray-100 disabled:text-gray-400"
                value={formData.farm}
                onChange={(e) => setFormData({ ...formData, farm: e.target.value, lot: '' })}
                required
                disabled={!formData.farmer}
              >
                <option value="">2. Selecciona la finca...</option>
                {availableFarms.map((f, i) => <option key={i} value={f.name}>{f.name}</option>)}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Lote Específico</label>
              <select
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-cafe-vino-500 focus:ring-cafe-vino-500 sm:text-sm py-2 px-3 border disabled:bg-gray-100 disabled:text-gray-400"
                value={formData.lot}
                onChange={(e) => setFormData({ ...formData, lot: e.target.value })}
                required
                disabled={!formData.farm}
              >
                <option value="">3. Selecciona el lote...</option>
                {availableLots.map((l, i) => <option key={i} value={l}>{l}</option>)}
              </select>
            </div>
          </div>

          <h3 className="font-semibold text-cafe-vino-800 border-b pb-1 mt-6 mb-2">2. Hardware</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Input
                label="Hardware ID (Dirección MAC o Serial)"
                value={formData.hardwareId}
                onChange={(e) => setFormData({ ...formData, hardwareId: e.target.value })}
                placeholder="Ej. MAC:00-11-22-33-44-55"
                required
              />
            </div>
          </div>

          <div className="mt-8 flex justify-end space-x-3 pt-4 border-t">
            <Button type="button" variant="secondary" onClick={() => setShowFormModal(false)}>
              Cancelar
            </Button>
            <Button type="submit">
              {selectedEstacion ? 'Actualizar Estación' : 'Asociar'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* 2. Modal Ver Datos */}
      <Modal
        isOpen={showViewModal}
        title="Flujo de Datos Recientes"
        onClose={() => setShowViewModal(false)}
      >
        {selectedEstacion && (
          <div className="space-y-6">
            <div className="bg-gray-100 p-4 rounded-lg flex justify-between items-center text-sm border border-gray-200">
               <div>
                 <span className="text-gray-500 font-medium">Estación ID:</span>
                 <p className="font-mono font-bold text-gray-900">{selectedEstacion.hardwareId}</p>
               </div>
               <StatusBadge status={selectedEstacion.status} />
            </div>

            <div className="bg-emerald-50 rounded-lg p-5 border border-emerald-100">
              <h4 className="text-emerald-800 font-semibold mb-4 border-b border-emerald-200 pb-2">Última lectura reportada</h4>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center bg-white p-3 rounded shadow-sm">
                  <p className="text-xs text-gray-500 mb-1">Temperatura</p>
                  <p className="text-xl font-bold text-orange-500">24°C</p>
                </div>
                <div className="text-center bg-white p-3 rounded shadow-sm">
                  <p className="text-xs text-gray-500 mb-1">Humedad Suelo</p>
                  <p className="text-xl font-bold text-blue-500">65%</p>
                </div>
                <div className="text-center bg-white p-3 rounded shadow-sm">
                  <p className="text-xs text-gray-500 mb-1">Precipitación</p>
                  <p className="text-xl font-bold text-blue-400">12mm</p>
                </div>
                <div className="text-center bg-white p-3 rounded shadow-sm">
                  <p className="text-xs text-gray-500 mb-1">Radiación</p>
                  <p className="text-xl font-bold text-yellow-500">Alta</p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end pt-4 border-t">
              <Button onClick={() => setShowViewModal(false)}>Cerrar Panel</Button>
            </div>
          </div>
        )}
      </Modal>

      {/* 3. Modal Recomendaciones */}
       <Modal
        isOpen={showRecommendModal}
        title="Enviar Recomendación a Estación / Finca"
        onClose={() => setShowRecommendModal(false)}
      >
        {selectedEstacion && (
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Al generar una recomendación sobre la estación <span className="font-mono font-bold text-purple-700">{selectedEstacion.hardwareId}</span>, al dueño <span className="font-semibold">{selectedEstacion.farmer}</span> le llegará de inmediato la notificación en su App.
            </p>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Título de la Alerta</label>
              <input type="text" className="w-full rounded-md border-gray-300 border shadow-sm p-2" placeholder="Ej. Alerta de Helada Temprana" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Recomendación o Tarea Sugerida</label>
              <textarea rows="4" className="w-full rounded-md border-gray-300 border shadow-sm p-2" placeholder="Describe los protocolos preventivos..."></textarea>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <Button variant="secondary" onClick={() => setShowRecommendModal(false)}>
                Cancelar
              </Button>
              <Button onClick={() => setShowRecommendModal(false)}>
                Enviar Recomendación
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* 4. Modal Eliminar Confirmación */}
      <Modal
        isOpen={showDeleteModal}
        title="Eliminar Dispositivo de Monitoreo"
        onClose={() => setShowDeleteModal(false)}
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            ¿Estás seguro que deseas desvincular y eliminar el equipo <span className="font-mono font-bold">{selectedEstacion?.hardwareId}</span> asignado a la finca de <span className="font-semibold">{selectedEstacion?.farmer}</span>?
          </p>
          <div className="mt-6 flex justify-end space-x-3">
            <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
              Cancelar
            </Button>
            <Button variant="danger" onClick={confirmDelete}>
              Desvincular Hardware
            </Button>
          </div>
        </div>
      </Modal>

    </div>
  );
};

export default SAEstaciones;
