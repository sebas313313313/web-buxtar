import React, { useState } from 'react';

const Rentabilidad = () => {
  const [showGrupoModal, setShowGrupoModal] = useState(false);
  const [showCaficultorModal, setShowCaficultorModal] = useState(false);
  const [selectedGrupo, setSelectedGrupo] = useState(null);
  const [selectedCaficultor, setSelectedCaficultor] = useState(null);
  const [selectedFinca, setSelectedFinca] = useState('');
  const [selectedLote, setSelectedLote] = useState('');
  const [selectedFloracion, setSelectedFloracion] = useState('');

  // Datos ficticios de grupos de caficultores
  const [gruposCaficultores] = useState([
    { 
      id: 1, 
      nombre: 'Grupo Norte', 
      descripcion: 'Caficultores de la zona norte',
      caficultores: [
        { id: 1, nombre: 'Carlos Rodríguez', identidad: 'CC 123456789', email: 'carlos@email.com', telefono: '+57 300 1234567' },
        { id: 2, nombre: 'Ana López', identidad: 'CC 234567890', email: 'ana@email.com', telefono: '+57 300 2345678' },
        { id: 3, nombre: 'Luis Torres', identidad: 'CC 345678901', email: 'luis@email.com', telefono: '+57 300 3456789' }
      ]
    },
    { 
      id: 2, 
      nombre: 'Grupo Sur', 
      descripcion: 'Caficultores de la zona sur',
      caficultores: [
        { id: 4, nombre: 'Pedro Gómez', identidad: 'CC 456789012', email: 'pedro@email.com', telefono: '+57 300 4567890' },
        { id: 5, nombre: 'Diego Herrera', identidad: 'CC 567890123', email: 'diego@email.com', telefono: '+57 300 5678901' }
      ]
    },
    { 
      id: 3, 
      nombre: 'Grupo Central', 
      descripcion: 'Caficultores de la zona central',
      caficultores: [
        { id: 6, nombre: 'José Martínez', identidad: 'CC 678901234', email: 'jose@email.com', telefono: '+57 300 6789012' },
        { id: 7, nombre: 'Carmen Soto', identidad: 'CC 789012345', email: 'carmen@email.com', telefono: '+57 300 7890123' }
      ]
    }
  ]);

  // Datos ficticios de actividades por caficultor
  const [actividadesCaficultores] = useState([
    {
      caficultorId: 1,
      fincas: ['Finca La Esperanza', 'Finca El Sol'],
      lotes: ['Lote A1', 'Lote A2'],
      floraciones: ['Floración Principal 2024', 'Floración Secundaria 2024'],
      actividadesAsignadas: 8,
      actividadesCompletadas: 6
    },
    {
      caficultorId: 2,
      fincas: ['Finca Buena Vista'],
      lotes: ['Lote B1'],
      floraciones: ['Floración Principal 2024'],
      actividadesAsignadas: 5,
      actividadesCompletadas: 4
    },
    {
      caficultorId: 3,
      fincas: ['Finca Las Brisas', 'Finca San José'],
      lotes: ['Lote C1', 'Lote C2'],
      floraciones: ['Floración Principal 2024', 'Floración Tardía 2024'],
      actividadesAsignadas: 10,
      actividadesCompletadas: 7
    }
  ]);

  // Datos ficticios de actividades detalladas
  const [actividadesDetalladas] = useState([
    {
      id: 1,
      caficultorId: 1,
      finca: 'Finca La Esperanza',
      lote: 'Lote A1',
      floracion: 'Floración Principal 2024',
      nombre: 'Control de Roya',
      tipo: 'roya',
      completado: true,
      fechaInicio: '2024-03-01',
      fechaFin: '2024-03-15',
      costoTotal: 250000
    },
    {
      id: 2,
      caficultorId: 1,
      finca: 'Finca La Esperanza',
      lote: 'Lote A1',
      floracion: 'Floración Principal 2024',
      nombre: 'Control de Broca',
      tipo: 'broca',
      completado: true,
      fechaInicio: '2024-03-16',
      fechaFin: '2024-03-30',
      costoTotal: 180000
    },
    {
      id: 3,
      caficultorId: 1,
      finca: 'Finca La Esperanza',
      lote: 'Lote A1',
      floracion: 'Floración Principal 2024',
      nombre: 'Cosecha',
      tipo: 'cosecha',
      completado: false,
      fechaInicio: '2024-04-01',
      fechaFin: null,
      costoTotal: null
    },
    {
      id: 4,
      caficultorId: 1,
      finca: 'Finca El Sol',
      lote: 'Lote A2',
      floracion: 'Floración Secundaria 2024',
      nombre: 'Fertilización',
      tipo: 'fertilizacion',
      completado: true,
      fechaInicio: '2024-02-15',
      fechaFin: '2024-02-20',
      costoTotal: 120000
    }
  ]);

  const handleSelectGrupo = (grupo) => {
    setSelectedGrupo(grupo);
    setShowGrupoModal(false);
  };

  const handleVerCaficultor = (caficultor) => {
    setSelectedCaficultor(caficultor);
    setShowCaficultorModal(true);
    setSelectedFinca('');
    setSelectedLote('');
    setSelectedFloracion('');
  };

  const formatCurrency = (amount) => {
    if (!amount) return 'No aplica';
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (date) => {
    if (!date) return 'No aplica';
    return new Date(date).toLocaleDateString('es-CO');
  };

  // Filtrar actividades según selección
  const getActividadesFiltradas = () => {
    if (!selectedCaficultor || !selectedFinca || !selectedLote || !selectedFloracion) {
      return [];
    }
    
    return actividadesDetalladas.filter(actividad => {
      const matchCaficultor = actividad.caficultorId === selectedCaficultor.id;
      const matchFinca = actividad.finca === selectedFinca;
      const matchLote = actividad.lote === selectedLote;
      const matchFloracion = actividad.floracion === selectedFloracion;
      
      return matchCaficultor && matchFinca && matchLote && matchFloracion;
    });
  };

  // Obtener opciones para los selects
  const getFincasOptions = () => {
    if (!selectedCaficultor) return [];
    const actividades = actividadesDetalladas.filter(a => a.caficultorId === selectedCaficultor.id);
    return [...new Set(actividades.map(a => a.finca))];
  };

  const getLotesOptions = () => {
    if (!selectedCaficultor || !selectedFinca) return [];
    const actividades = actividadesDetalladas.filter(a => 
      a.caficultorId === selectedCaficultor.id && a.finca === selectedFinca
    );
    return [...new Set(actividades.map(a => a.lote))];
  };

  const getFloracionesOptions = () => {
    if (!selectedCaficultor || !selectedFinca || !selectedLote) return [];
    const actividades = actividadesDetalladas.filter(a => 
      a.caficultorId === selectedCaficultor.id && 
      a.finca === selectedFinca && 
      a.lote === selectedLote
    );
    return [...new Set(actividades.map(a => a.floracion))];
  };

  const getCaficultorInfo = (caficultorId) => {
    for (const grupo of gruposCaficultores) {
      const caficultor = grupo.caficultores.find(c => c.id === caficultorId);
      if (caficultor) return caficultor;
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Rentabilidad</h1>
          <p className="text-gray-600">Análisis de rentabilidad por caficultor</p>
        </div>
      </div>

      {/* Grupo Selection */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Seleccionar Grupo de Caficultores</h2>
        </div>
        
        <div className="p-6">
          <button
            onClick={() => setShowGrupoModal(true)}
            className="px-4 py-2 bg-cafe-vino-600 text-white rounded-lg hover:bg-cafe-vino-700 transition-colors"
          >
            Seleccionar grupo de caficultores
          </button>
          
          {selectedGrupo && (
            <div className="mt-4 text-sm text-gray-600">
              Grupo seleccionado: <span className="font-medium">{selectedGrupo.nombre}</span>
            </div>
          )}
        </div>
      </div>

      {/* Results Section */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">
            {selectedGrupo ? `Caficultores - ${selectedGrupo.nombre}` : 'Caficultores'}
          </h2>
        </div>
        
        <div className="p-6">
          {!selectedGrupo ? (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">Debe seleccionar un caficultor</h3>
              <p className="mt-1 text-sm text-gray-500">
                Seleccione un grupo para ver los caficultores asociados
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nombre
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Identidad
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fincas
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Lotes
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Floraciones
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actividades Asignadas
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actividades Completadas
                    </th>
                    <th className="relative px-6 py-3">
                      <span className="sr-only">Acciones</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {selectedGrupo.caficultores.map((caficultor) => {
                    const info = actividadesCaficultores.find(a => a.caficultorId === caficultor.id);
                    return (
                      <tr key={caficultor.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{caficultor.nombre}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{caficultor.identidad}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {info ? info.fincas.join(', ') : 'Sin datos'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {info ? info.lotes.join(', ') : 'Sin datos'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {info ? info.floraciones.join(', ') : 'Sin datos'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {info ? info.actividadesAsignadas : '0'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {info ? info.actividadesCompletadas : '0'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => handleVerCaficultor(caficultor)}
                            className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors text-xs"
                          >
                            Ver
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Modal de Selección de Grupo */}
      {showGrupoModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={() => setShowGrupoModal(false)}
          ></div>
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
            <div className="relative inline-block w-full bg-white rounded-2xl shadow-2xl max-w-2xl p-6 my-8 text-left align-middle transition-all transform">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold leading-6 text-gray-900">Seleccionar Grupo</h3>
                <button
                  onClick={() => setShowGrupoModal(false)}
                  className="text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-4">
                {gruposCaficultores.map((grupo) => (
                  <div
                    key={grupo.id}
                    onClick={() => handleSelectGrupo(grupo)}
                    className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {grupo.nombre}
                        </div>
                        <div className="text-xs text-gray-500">
                          {grupo.descripcion}
                        </div>
                        <div className="text-xs text-gray-400 mt-1">
                          {grupo.caficultores.length} caficultores
                        </div>
                      </div>
                      <svg className="w-5 h-5 text-cafe-vino-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Detalles de Caficultor */}
      {showCaficultorModal && selectedCaficultor && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={() => setShowCaficultorModal(false)}
          ></div>
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
            <div className="relative inline-block w-full bg-white rounded-2xl shadow-2xl max-w-5xl p-6 my-8 text-left align-middle transition-all transform">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold leading-6 text-gray-900">Detalles de {selectedCaficultor.nombre}</h3>
                <button
                  onClick={() => setShowCaficultorModal(false)}
                  className="text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Información del Caficultor */}
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Información del Caficultor</h4>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-600">DNI:</span>
                    <span className="ml-2 text-gray-900">{selectedCaficultor.identidad}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Email:</span>
                    <span className="ml-2 text-gray-900">{selectedCaficultor.email}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Teléfono:</span>
                    <span className="ml-2 text-gray-900">{selectedCaficultor.telefono}</span>
                  </div>
                </div>
              </div>

              {/* Selectores de Filtros */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Seleccionar Finca
                  </label>
                  <select
                    value={selectedFinca}
                    onChange={(e) => {
                      setSelectedFinca(e.target.value);
                      setSelectedLote('');
                      setSelectedFloracion('');
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cafe-vino-500 focus:border-cafe-vino-500"
                  >
                    <option value="">Seleccionar finca...</option>
                    {getFincasOptions().map((finca, index) => (
                      <option key={index} value={finca}>{finca}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Seleccionar Lote
                  </label>
                  <select
                    value={selectedLote}
                    onChange={(e) => {
                      setSelectedLote(e.target.value);
                      setSelectedFloracion('');
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cafe-vino-500 focus:border-cafe-vino-500"
                    disabled={!selectedFinca}
                  >
                    <option value="">Seleccionar lote...</option>
                    {getLotesOptions().map((lote, index) => (
                      <option key={index} value={lote}>{lote}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Seleccionar Floración
                  </label>
                  <select
                    value={selectedFloracion}
                    onChange={(e) => setSelectedFloracion(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cafe-vino-500 focus:border-cafe-vino-500"
                    disabled={!selectedLote}
                  >
                    <option value="">Seleccionar floración...</option>
                    {getFloracionesOptions().map((floracion, index) => (
                      <option key={index} value={floracion}>{floracion}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Lista de Actividades */}
              <div className="overflow-x-auto">
                {!selectedFinca || !selectedLote || !selectedFloracion ? (
                  <div className="text-center py-12">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">Seleccione los filtros</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Seleccione una finca, un lote y una floración para ver las actividades
                    </p>
                  </div>
                ) : getActividadesFiltradas().length === 0 ? (
                  <div className="text-center py-12">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No hay actividades</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      No se encontraron actividades para los filtros seleccionados
                    </p>
                  </div>
                ) : (
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Nombre
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Tipo
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Completado
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Fecha Inicio
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Fecha Fin
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Costo Total
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {getActividadesFiltradas().map((actividad) => (
                        <tr key={actividad.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{actividad.nombre}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              actividad.tipo === 'roya' ? 'bg-red-100 text-red-800' :
                              actividad.tipo === 'broca' ? 'bg-orange-100 text-orange-800' :
                              actividad.tipo === 'cosecha' ? 'bg-green-100 text-green-800' :
                              'bg-blue-100 text-blue-800'
                            }`}>
                              {actividad.tipo}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              actividad.completado ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {actividad.completado ? 'Sí' : 'No'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{formatDate(actividad.fechaInicio)}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{formatDate(actividad.fechaFin)}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{formatCurrency(actividad.costoTotal)}</div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>

              {/* Botón de Cerrar */}
              <div className="flex justify-end pt-6 border-t">
                <button
                  onClick={() => setShowCaficultorModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 rounded-lg transition-colors"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Rentabilidad;
