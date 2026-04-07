import React, { useState } from 'react';
import { ActionModal } from '../../components';

const Estaciones = () => {
  const [showAsignarModal, setShowAsignarModal] = useState(false);
  const [showRecomendacionesModal, setShowRecomendacionesModal] = useState(false);
  const [filterType, setFilterType] = useState('');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedFilterValue, setSelectedFilterValue] = useState(null);
  const [selectedEstacion, setSelectedEstacion] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null });
  const [alertModal, setAlertModal] = useState({ isOpen: false, type: 'info', title: '', message: '' });
  
  // Estados para el formulario de asignar estación
  const [nuevaAsignacion, setNuevaAsignacion] = useState({
    caficultorId: '',
    fincaId: '',
    loteId: '',
    estacionId: '',
    macAddress: ''
  });

  // Estados para el modal de recomendaciones
  const [recomendacionesData, setRecomendacionesData] = useState({
    floracion: '',
    fechaFloracion: '',
    recomendaciones: []
  });

  // Datos ficticios de caficultores
  const [caficultores] = useState([
    { id: 1, nombre: 'Carlos Rodríguez', telefono: '+57 300 1234567', empresaId: 1 },
    { id: 2, nombre: 'Ana López', telefono: '+57 300 2345678', empresaId: 1 },
    { id: 3, nombre: 'Luis Torres', telefono: '+57 300 3456789', empresaId: 1 },
    { id: 4, nombre: 'María García', telefono: '+57 300 4567890', empresaId: 1 },
    { id: 5, nombre: 'Pedro Gómez', telefono: '+57 300 5678901', empresaId: 2 },
    { id: 6, nombre: 'Diego Herrera', telefono: '+57 300 6789012', empresaId: 2 },
    { id: 7, nombre: 'Sofía Castro', telefono: '+57 300 7890123', empresaId: 2 },
    { id: 8, nombre: 'José Martínez', telefono: '+57 300 8901234', empresaId: 3 },
    { id: 9, nombre: 'Carmen Soto', telefono: '+57 300 9012345', empresaId: 3 },
    { id: 10, nombre: 'Roberto Silva', telefono: '+57 300 0123456', empresaId: 3 }
  ]);

  // Datos ficticios de fincas
  const [fincas] = useState([
    { id: 1, nombre: 'Finca La Esperanza', caficultorId: 1 },
    { id: 2, nombre: 'Finca El Paraíso', caficultorId: 1 },
    { id: 3, nombre: 'Finca Buena Vista', caficultorId: 2 },
    { id: 4, nombre: 'Finca San José', caficultorId: 2 },
    { id: 5, nombre: 'Finca Las Brisas', caficultorId: 3 },
    { id: 6, nombre: 'Finca El Recuerdo', caficultorId: 3 },
    { id: 7, nombre: 'Finca La Montaña', caficultorId: 4 },
    { id: 8, nombre: 'Finca El Valle', caficultorId: 4 }
  ]);

  // Datos ficticios de lotes
  const [lotes] = useState([
    { id: 1, nombre: 'Lote A1', caficultorId: 1, fincaId: 1 },
    { id: 2, nombre: 'Lote A2', caficultorId: 1, fincaId: 1 },
    { id: 3, nombre: 'Lote B1', caficultorId: 1, fincaId: 2 },
    { id: 4, nombre: 'Lote B2', caficultorId: 1, fincaId: 2 },
    { id: 5, nombre: 'Lote C1', caficultorId: 2, fincaId: 3 },
    { id: 6, nombre: 'Lote C2', caficultorId: 2, fincaId: 3 },
    { id: 7, nombre: 'Lote D1', caficultorId: 3, fincaId: 5 },
    { id: 8, nombre: 'Lote D2', caficultorId: 3, fincaId: 5 }
  ]);

  // Datos ficticios de estaciones meteorológicas
  const [estaciones] = useState([
    { id: 1, nombre: 'Estación Norte-01', ubicacion: 'Zona Norte', mac: '00:1B:44:11:3A:B7' },
    { id: 2, nombre: 'Estación Sur-02', ubicacion: 'Zona Sur', mac: '00:1B:44:11:3A:B8' },
    { id: 3, nombre: 'Estación Este-03', ubicacion: 'Zona Este', mac: '00:1B:44:11:3A:B9' },
    { id: 4, nombre: 'Estación Oeste-04', ubicacion: 'Zona Oeste', mac: '00:1B:44:11:3A:BA' }
  ]);

  // Datos ficticios de estaciones asignadas
  const [estacionesAsignadas, setEstacionesAsignadas] = useState([
    { id: 1, hardwareId: 'HW-001', macAddress: '00:1B:44:11:3A:B7', caficultor: 'Carlos Rodríguez', finca: 'Finca La Esperanza', lote: 'Lote A1', estado: 'activo' },
    { id: 2, hardwareId: 'HW-002', macAddress: '00:1B:44:11:3A:B8', caficultor: 'Ana López', finca: 'Finca Buena Vista', lote: 'Lote C1', estado: 'activo' },
    { id: 3, hardwareId: 'HW-003', macAddress: '00:1B:44:11:3A:B9', caficultor: 'Luis Torres', finca: 'Finca Las Brisas', lote: 'Lote D1', estado: 'inactivo' },
    { id: 4, hardwareId: 'HW-004', macAddress: '00:1B:44:11:3A:BA', caficultor: 'María García', finca: 'Finca La Montaña', lote: 'Lote E1', estado: 'activo' }
  ]);

  // Datos ficticios de floraciones y recomendaciones
  const [floraciones] = useState([
    { 
      id: 1, 
      nombre: 'Floración Principal', 
      fecha: '2024-03-15',
      recomendaciones: [
        'Aumentar el riego en un 20% durante las próximas 2 semanas',
        'Aplicar fertilizante rico en potasio para mejorar la calidad del fruto',
        'Monitorear la humedad del suelo diariamente',
        'Realizar poda de formación para mejorar la ventilación'
      ]
    },
    { 
      id: 2, 
      nombre: 'Floración Secundaria', 
      fecha: '2024-04-20',
      recomendaciones: [
        'Reducir el riego para evitar exceso de humedad',
        'Aplicar fungicida preventivo contra roya',
        'Aumentar la vigilancia de plagas como la broca del café'
      ]
    },
    { 
      id: 3, 
      nombre: 'Floración Tardía', 
      fecha: '2024-05-10',
      recomendaciones: [
        'Proteger las flores del sol intenso con sombra temporal',
        'Aplicar bioestimulantes para mejorar la cuaja',
        'Monitorear la temperatura para detectar estrés térmico'
      ]
    },
    { 
      id: 4, 
      nombre: 'Floración de Emergencia', 
      fecha: '2024-06-01',
      recomendaciones: [] // Sin recomendaciones
    }
  ]);

  // Filtrar datos según el tipo de filtro seleccionado
  const getFilteredData = () => {
    switch (filterType) {
      case 'caficultor':
        return caficultores;
      case 'lote':
        return lotes;
      case 'estacion':
        return estaciones;
      case 'finca':
        return fincas;
      case 'estado':
        return [
          { id: 1, nombre: 'Activo', valor: 'activo' },
          { id: 2, nombre: 'Inactivo', valor: 'inactivo' }
        ];
      default:
        return [];
    }
  };

  // Filtrar estaciones asignadas según el filtro
  const getFilteredEstaciones = () => {
    if (!filterType || !selectedFilterValue) return estacionesAsignadas;
    
    switch (filterType) {
      case 'caficultor':
        return estacionesAsignadas.filter(est => est.caficultor === selectedFilterValue.nombre);
      case 'lote':
        return estacionesAsignadas.filter(est => est.lote === selectedFilterValue.nombre);
      case 'estacion':
        return estacionesAsignadas.filter(est => est.hardwareId === selectedFilterValue.nombre);
      case 'finca':
        return estacionesAsignadas.filter(est => est.finca === selectedFilterValue.nombre);
      case 'estado':
        return estacionesAsignadas.filter(est => est.estado === selectedFilterValue.valor);
      default:
        return estacionesAsignadas;
    }
  };

  const handleFilterSelect = (type) => {
    setFilterType(type);
    setShowFilterModal(true);
    setSelectedFilterValue(null);
  };

  const handleFilterValueSelect = (value) => {
    setSelectedFilterValue(value);
    setShowFilterModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevaAsignacion({
      ...nuevaAsignacion,
      [name]: value
    });
  };

  const handleAsignarEstacion = () => {
    if (nuevaAsignacion.caficultorId && nuevaAsignacion.fincaId && 
        nuevaAsignacion.loteId && nuevaAsignacion.estacionId && nuevaAsignacion.macAddress) {
      
      const caficultorSeleccionado = caficultores.find(c => c.id === parseInt(nuevaAsignacion.caficultorId));
      const fincaSeleccionada = fincas.find(f => f.id === parseInt(nuevaAsignacion.fincaId));
      const loteSeleccionado = lotes.find(l => l.id === parseInt(nuevaAsignacion.loteId));
      
      const nuevaEstacion = {
        id: Math.max(...estacionesAsignadas.map(e => e.id), 0) + 1,
        hardwareId: nuevaAsignacion.estacionId,
        macAddress: nuevaAsignacion.macAddress,
        caficultor: caficultorSeleccionado.nombre,
        finca: fincaSeleccionada.nombre,
        lote: loteSeleccionado.nombre,
        estado: 'activo'
      };
      
      setEstacionesAsignadas([...estacionesAsignadas, nuevaEstacion]);
      setAlertModal({ isOpen: true, type: 'success', title: 'Éxito', message: 'Asociado correctamente' });
      setShowAsignarModal(false);
      setNuevaAsignacion({
        caficultorId: '',
        fincaId: '',
        loteId: '',
        estacionId: '',
        macAddress: ''
      });
    }
  };

  const handleRecomendaciones = (id) => {
    const estacion = estacionesAsignadas.find(e => e.id === id);
    if (estacion) {
      setSelectedEstacion(estacion);
      setRecomendacionesData({
        floracion: '',
        fechaFloracion: '',
        recomendaciones: []
      });
      setShowRecomendacionesModal(true);
    }
  };

  const handleFloracionChange = (floracionId) => {
    const floracionSeleccionada = floraciones.find(f => f.id === parseInt(floracionId));
    if (floracionSeleccionada) {
      setRecomendacionesData({
        floracion: floracionSeleccionada.nombre,
        fechaFloracion: floracionSeleccionada.fecha,
        recomendaciones: floracionSeleccionada.recomendaciones
      });
    }
  };

  const handleVerData = (id) => {
    setAlertModal({ isOpen: true, type: 'info', title: 'Información', message: 'Ver datos de la estación: ' + id });
  };

  const handleEditarEstacion = (id) => {
    setAlertModal({ isOpen: true, type: 'info', title: 'Editar', message: 'Editar estación: ' + id });
  };

  const handleDesactivarEstacion = (id) => {
    setEstacionesAsignadas(estacionesAsignadas.map(est => 
      est.id === id ? { ...est, estado: 'inactivo' } : est
    ));
    setAlertModal({ isOpen: true, type: 'success', title: 'Éxito', message: 'Estación desactivada correctamente' });
  };

  const handleEliminarEstacion = (id) => {
    setDeleteModal({ isOpen: true, id });
  };

  const confirmDelete = () => {
    if (deleteModal.id) {
      setEstacionesAsignadas(estacionesAsignadas.filter(est => est.id !== deleteModal.id));
      setAlertModal({ isOpen: true, type: 'success', title: 'Éxito', message: 'Estación eliminada correctamente' });
      setDeleteModal({ isOpen: false, id: null });
    }
  };

  // Obtener fincas y lotes del caficultor seleccionado
  const getFincasByCaficultor = (caficultorId) => {
    return fincas.filter(finca => finca.caficultorId === parseInt(caficultorId));
  };

  const getLotesByCaficultor = (caficultorId) => {
    return lotes.filter(lote => lote.caficultorId === parseInt(caficultorId));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Estaciones Meteorológicas</h1>
          <p className="text-gray-600">Monitoreo de estaciones meteorológicas</p>
        </div>
        <button
          onClick={() => setShowAsignarModal(true)}
          className="flex items-center px-4 py-2 bg-cafe-vino-600 text-white rounded-lg hover:bg-cafe-vino-700 transition-colors"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Asignar Estaciones
        </button>
      </div>

      {/* Filter Section */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Búsqueda y Filtros</h2>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <button
              onClick={() => handleFilterSelect('caficultor')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filterType === 'caficultor' 
                  ? 'bg-cafe-vino-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Buscar por Caficultor
            </button>
            <button
              onClick={() => handleFilterSelect('lote')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filterType === 'lote' 
                  ? 'bg-cafe-vino-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Buscar por Lote
            </button>
            <button
              onClick={() => handleFilterSelect('estacion')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filterType === 'estacion' 
                  ? 'bg-cafe-vino-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Buscar por Estación
            </button>
            <button
              onClick={() => handleFilterSelect('finca')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filterType === 'finca' 
                  ? 'bg-cafe-vino-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Buscar por Finca
            </button>
            <button
              onClick={() => handleFilterSelect('estado')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filterType === 'estado' 
                  ? 'bg-cafe-vino-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Buscar por Estado
            </button>
          </div>
          
          {selectedFilterValue && (
            <div className="mt-4 p-3 bg-cafe-vino-50 rounded-lg">
              <span className="text-sm text-cafe-vino-800">
                Filtro seleccionado: <strong>{selectedFilterValue.nombre}</strong>
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Results Section */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">
            Estaciones Asignadas {selectedFilterValue && `- ${selectedFilterValue.nombre}`}
          </h2>
        </div>
        
        <div className="p-6">
          {getFilteredEstaciones().length === 0 ? (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No hay estaciones</h3>
              <p className="mt-1 text-sm text-gray-500">
                No se encontraron estaciones con los filtros seleccionados
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Hardware ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Caficultor
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Finca
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Lote
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
                  {getFilteredEstaciones().map((estacion) => (
                    <tr key={estacion.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {estacion.hardwareId}
                        </div>
                        <div className="text-xs text-gray-500">
                          MAC: {estacion.macAddress}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {estacion.caficultor}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {estacion.finca}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {estacion.lote}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          estacion.estado === 'activo' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {estacion.estado}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex space-x-2 justify-end">
                          <button
                            onClick={() => handleRecomendaciones(estacion.id)}
                            className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors text-xs"
                            title="Recomendaciones"
                          >
                            Recomendaciones
                          </button>
                          <button
                            onClick={() => handleVerData(estacion.id)}
                            className="inline-flex items-center px-3 py-1 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors text-xs"
                            title="Ver Data"
                          >
                            Ver Data
                          </button>
                          <button
                            onClick={() => handleEditarEstacion(estacion.id)}
                            className="inline-flex items-center px-3 py-1 bg-yellow-100 text-yellow-700 rounded-md hover:bg-yellow-200 transition-colors text-xs"
                            title="Editar"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => handleDesactivarEstacion(estacion.id)}
                            className="inline-flex items-center px-3 py-1 bg-orange-100 text-orange-700 rounded-md hover:bg-orange-200 transition-colors text-xs"
                            title="Desactivar"
                          >
                            Desactivar
                          </button>
                          <button
                            onClick={() => handleEliminarEstacion(estacion.id)}
                            className="inline-flex items-center px-3 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors text-xs"
                            title="Eliminar"
                          >
                            Eliminar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Modal de Selección de Filtro */}
      {showFilterModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={() => setShowFilterModal(false)}
          ></div>
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
            <div className="relative inline-block w-full bg-white rounded-2xl shadow-2xl max-w-2xl p-6 my-8 text-left align-middle transition-all transform">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold leading-6 text-gray-900">
                  Seleccionar {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
                </h3>
                <button
                  onClick={() => setShowFilterModal(false)}
                  className="text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="max-h-64 overflow-y-auto border border-gray-200 rounded-lg">
                {getFilteredData().length > 0 ? (
                  <div className="divide-y divide-gray-200">
                    {getFilteredData().map((item) => (
                      <div
                        key={item.id}
                        onClick={() => handleFilterValueSelect(item)}
                        className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {item.nombre}
                            </div>
                            {item.telefono && (
                              <div className="text-xs text-gray-500">
                                {item.telefono}
                              </div>
                            )}
                            {item.ubicacion && (
                              <div className="text-xs text-gray-500">
                                {item.ubicacion}
                              </div>
                            )}
                            {item.mac && (
                              <div className="text-xs text-gray-500">
                                MAC: {item.mac}
                              </div>
                            )}
                          </div>
                          <svg className="w-5 h-5 text-cafe-vino-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center text-gray-500">
                    No hay {filterType}s disponibles
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Asignar Estación */}
      {showAsignarModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={() => setShowAsignarModal(false)}
          ></div>
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
            <div className="relative inline-block w-full bg-white rounded-2xl shadow-2xl max-w-lg p-6 my-8 text-left align-middle transition-all transform">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold leading-6 text-gray-900">Asignar Estación Meteorológica</h3>
                <button
                  onClick={() => setShowAsignarModal(false)}
                  className="text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Caficultor
                  </label>
                  <select
                    name="caficultorId"
                    value={nuevaAsignacion.caficultorId}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cafe-vino-500 focus:border-cafe-vino-500"
                  >
                    <option value="">Seleccionar caficultor</option>
                    {caficultores.map((caficultor) => (
                      <option key={caficultor.id} value={caficultor.id}>
                        {caficultor.nombre}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Finca
                  </label>
                  <select
                    name="fincaId"
                    value={nuevaAsignacion.fincaId}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cafe-vino-500 focus:border-cafe-vino-500"
                    disabled={!nuevaAsignacion.caficultorId}
                  >
                    <option value="">Seleccionar finca</option>
                    {getFincasByCaficultor(nuevaAsignacion.caficultorId).map((finca) => (
                      <option key={finca.id} value={finca.id}>
                        {finca.nombre}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Lote
                  </label>
                  <select
                    name="loteId"
                    value={nuevaAsignacion.loteId}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cafe-vino-500 focus:border-cafe-vino-500"
                    disabled={!nuevaAsignacion.caficultorId}
                  >
                    <option value="">Seleccionar lote</option>
                    {getLotesByCaficultor(nuevaAsignacion.caficultorId).map((lote) => (
                      <option key={lote.id} value={lote.id}>
                        {lote.nombre}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Estación Meteorológica
                  </label>
                  <input
                    type="text"
                    name="estacionId"
                    value={nuevaAsignacion.estacionId}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cafe-vino-500 focus:border-cafe-vino-500"
                    placeholder="Escribir nombre de la estación..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Dirección MAC
                  </label>
                  <input
                    type="text"
                    name="macAddress"
                    value={nuevaAsignacion.macAddress || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cafe-vino-500 focus:border-cafe-vino-500"
                    placeholder="00:1B:44:11:3A:B7"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-6 border-t">
                <button
                  onClick={() => setShowAsignarModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 rounded-lg transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleAsignarEstacion}
                  disabled={!nuevaAsignacion.caficultorId || !nuevaAsignacion.fincaId || 
                          !nuevaAsignacion.loteId || !nuevaAsignacion.estacionId || 
                          !nuevaAsignacion.macAddress}
                  className="px-4 py-2 bg-cafe-vino-600 text-white rounded-lg hover:bg-cafe-vino-700 disabled:bg-gray-400 transition-colors"
                >
                  Asociar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    {/* Modal de Recomendaciones */}
      {showRecomendacionesModal && selectedEstacion && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={() => setShowRecomendacionesModal(false)}
          ></div>
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
            <div className="relative inline-block w-full bg-white rounded-2xl shadow-2xl max-w-2xl p-6 my-8 text-left align-middle transition-all transform">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold leading-6 text-gray-900">Recomendaciones</h3>
                <button
                  onClick={() => setShowRecomendacionesModal(false)}
                  className="text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                {/* Información de la Estación */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Información de la Estación</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-600">Finca:</span>
                      <span className="ml-2 text-gray-900">{selectedEstacion.finca}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Lote:</span>
                      <span className="ml-2 text-gray-900">{selectedEstacion.lote}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Caficultor:</span>
                      <span className="ml-2 text-gray-900">{selectedEstacion.caficultor}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Hardware ID:</span>
                      <span className="ml-2 text-gray-900">{selectedEstacion.hardwareId}</span>
                    </div>
                  </div>
                </div>

                {/* Selección de Floración */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Seleccionar Floración
                  </label>
                  <select
                    value={floraciones.find(f => f.nombre === recomendacionesData.floracion)?.id || ''}
                    onChange={(e) => handleFloracionChange(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cafe-vino-500 focus:border-cafe-vino-500"
                  >
                    <option value="">Seleccionar floración...</option>
                    {floraciones.map((floracion) => (
                      <option key={floracion.id} value={floracion.id}>
                        {floracion.nombre} - {floracion.fecha}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Fecha de Floración */}
                {recomendacionesData.fechaFloracion && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fecha de Floración
                    </label>
                    <input
                      type="text"
                      value={recomendacionesData.fechaFloracion}
                      readOnly
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900"
                    />
                  </div>
                )}

                {/* Recomendaciones */}
                {recomendacionesData.floracion && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Recomendaciones
                    </label>
                    {recomendacionesData.recomendaciones.length > 0 ? (
                      <div className="space-y-2">
                        {recomendacionesData.recomendaciones.map((recomendacion, index) => (
                          <div key={index} className="flex items-start p-3 bg-blue-50 rounded-lg">
                            <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>
                            <span className="text-sm text-gray-900">{recomendacion}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <div className="flex items-center">
                          <svg className="w-5 h-5 text-yellow-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          <span className="text-sm text-yellow-800">
                            No existe recomendaciones para la floración seleccionada
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Botones */}
              <div className="flex justify-end pt-6 border-t">
                <button
                  onClick={() => setShowRecomendacionesModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 rounded-lg transition-colors"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Confirmar Eliminación */}
      <ActionModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, id: null })}
        onAction={confirmDelete}
        title="Eliminar Estación"
        description="¿Estás seguro de que deseas eliminar esta estación? Esta acción no se puede deshacer."
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

export default Estaciones;
