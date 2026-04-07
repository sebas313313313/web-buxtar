import React, { useState } from 'react';

const Fincas = () => {
  const [showGrupoModal, setShowGrupoModal] = useState(false);
  const [showLotesModal, setShowLotesModal] = useState(false);
  const [selectedGrupo, setSelectedGrupo] = useState(null);
  const [selectedFinca, setSelectedFinca] = useState(null);
  
  // Datos ficticios de grupos de caficultores
  const [gruposCaficultores] = useState([
    { 
      id: 1, 
      nombre: 'Grupo Norte', 
      descripcion: 'Caficultores de la zona norte',
      caficultores: ['Carlos Rodríguez', 'Ana López', 'Luis Torres']
    },
    { 
      id: 2, 
      nombre: 'Grupo Sur', 
      descripcion: 'Caficultores de la zona sur',
      caficultores: ['Pedro Gómez', 'Diego Herrera', 'Sofía Castro']
    },
    { 
      id: 3, 
      nombre: 'Grupo Central', 
      descripcion: 'Caficultores de la zona central',
      caficultores: ['José Martínez', 'Carmen Soto', 'Roberto Silva']
    }
  ]);

  // Datos ficticios de fincas
  const [fincas] = useState([
    {
      id: 1,
      nombre: 'Finca La Esperanza',
      grupoId: 1,
      caficultor: 'Carlos Rodríguez',
      promedioBroca: 2.5,
      promedioRoya: 1.8,
      volumenCosechado: 4500,
      costoProduccion: 2800000,
      totalVentas: 5200000,
      beneficioNeto: 2400000
    },
    {
      id: 2,
      nombre: 'Finca El Paraíso',
      grupoId: 1,
      caficultor: 'Ana López',
      promedioBroca: 3.2,
      promedioRoya: 2.1,
      volumenCosechado: 3800,
      costoProduccion: 2400000,
      totalVentas: 4100000,
      beneficioNeto: 1700000
    },
    {
      id: 3,
      nombre: 'Finca Buena Vista',
      grupoId: 1,
      caficultor: 'Luis Torres',
      promedioBroca: 1.8,
      promedioRoya: 1.2,
      volumenCosechado: 5200,
      costoProduccion: 3200000,
      totalVentas: 6800000,
      beneficioNeto: 3600000
    },
    {
      id: 4,
      nombre: 'Finca San José',
      grupoId: 2,
      caficultor: 'Pedro Gómez',
      promedioBroca: 2.9,
      promedioRoya: 2.4,
      volumenCosechado: 4100,
      costoProduccion: 2600000,
      totalVentas: 4900000,
      beneficioNeto: 2300000
    },
    {
      id: 5,
      nombre: 'Finca Las Brisas',
      grupoId: 3,
      caficultor: 'José Martínez',
      promedioBroca: 2.1,
      promedioRoya: 1.6,
      volumenCosechado: 4700,
      costoProduccion: 2900000,
      totalVentas: 5500000,
      beneficioNeto: 2600000
    },
    {
      id: 6,
      nombre: 'Finca El Recuerdo',
      grupoId: 3,
      caficultor: 'Carmen Soto',
      promedioBroca: 3.5,
      promedioRoya: 2.8,
      volumenCosechado: 3500,
      costoProduccion: 2200000,
      totalVentas: 3800000,
      beneficioNeto: 1600000
    }
  ]);

  // Datos ficticios de lotes
  const [lotes] = useState([
    {
      id: 1,
      nombre: 'Lote A1',
      fincaId: 1,
      fincaNombre: 'Finca La Esperanza',
      promedioBroca: 2.3,
      promedioRoya: 1.7,
      volumenCosechado: 2200,
      costoProduccion: 1400000,
      totalVentas: 2600000,
      beneficioNeto: 1200000
    },
    {
      id: 2,
      nombre: 'Lote A2',
      fincaId: 1,
      fincaNombre: 'Finca La Esperanza',
      promedioBroca: 2.7,
      promedioRoya: 1.9,
      volumenCosechado: 2300,
      costoProduccion: 1400000,
      totalVentas: 2600000,
      beneficioNeto: 1200000
    },
    {
      id: 3,
      nombre: 'Lote B1',
      fincaId: 3,
      fincaNombre: 'Finca Buena Vista',
      promedioBroca: 1.6,
      promedioRoya: 1.1,
      volumenCosechado: 2600,
      costoProduccion: 1600000,
      totalVentas: 3400000,
      beneficioNeto: 1800000
    },
    {
      id: 4,
      nombre: 'Lote B2',
      fincaId: 3,
      fincaNombre: 'Finca Buena Vista',
      promedioBroca: 2.0,
      promedioRoya: 1.3,
      volumenCosechado: 2600,
      costoProduccion: 1600000,
      totalVentas: 3400000,
      beneficioNeto: 1800000
    }
  ]);

  const handleSelectGrupo = (grupo) => {
    setSelectedGrupo(grupo);
    setShowGrupoModal(false);
  };

  const handleVerLotes = (finca) => {
    setSelectedFinca(finca);
    setShowLotesModal(true);
  };

  const fincasFiltradas = selectedGrupo 
    ? fincas.filter(finca => finca.grupoId === selectedGrupo.id)
    : [];

  const lotesFiltrados = selectedFinca
    ? lotes.filter(lote => lote.fincaId === selectedFinca.id)
    : [];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Fincas</h1>
          <p className="text-gray-600">Gestión de fincas y producción</p>
        </div>
      </div>

      {/* Grupo Selection */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Seleccionar Grupo</h2>
        </div>
        
        <div className="p-6">
          <button
            onClick={() => setShowGrupoModal(true)}
            className="px-4 py-2 bg-cafe-vino-600 text-white rounded-lg hover:bg-cafe-vino-700 transition-colors"
          >
            Seleccionar un grupo
          </button>
          
          {selectedGrupo && (
            <div className="mt-4 text-sm text-gray-600">
              Grupo seleccionado: <span className="font-medium">{selectedGrupo.nombre}</span>
            </div>
          )}
        </div>
      </div>

      {/* Grupo Information */}
      {selectedGrupo && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Grupo de Caficultores</h2>
          </div>
          
          <div className="p-6">
            <div className="mb-4">
              <h3 className="font-medium text-gray-900">{selectedGrupo.nombre}</h3>
              <p className="text-sm text-gray-600">{selectedGrupo.descripcion}</p>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {selectedGrupo.caficultores.map((caficultor, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-cafe-vino-100 text-cafe-vino-800"
                >
                  {caficultor}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Results Section */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">
            {selectedGrupo ? `Fincas - ${selectedGrupo.nombre}` : 'Fincas'}
          </h2>
        </div>
        
        <div className="p-6">
          {!selectedGrupo ? (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No hay un grupo seleccionado</h3>
              <p className="mt-1 text-sm text-gray-500">
                Selecciona un grupo para ver las fincas asociadas
              </p>
            </div>
          ) : fincasFiltradas.length === 0 ? (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No hay fincas</h3>
              <p className="mt-1 text-sm text-gray-500">
                No se encontraron fincas para este grupo
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nombre de la Finca
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Promedio Broca
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Promedio Roya
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Volumen Cosechado
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Costo Producción
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total Ventas
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Beneficio Neto
                    </th>
                    <th className="relative px-6 py-3">
                      <span className="sr-only">Acciones</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {fincasFiltradas.map((finca) => (
                    <tr key={finca.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {finca.nombre}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {finca.promedioBroca}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {finca.promedioRoya}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {finca.volumenCosechado.toLocaleString()} kg
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {formatCurrency(finca.costoProduccion)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {formatCurrency(finca.totalVentas)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`text-sm font-medium ${
                          finca.beneficioNeto > 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {formatCurrency(finca.beneficioNeto)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleVerLotes(finca)}
                          className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors text-xs"
                        >
                          {lotesFiltrados.filter(lote => lote.fincaId === finca.id).length > 0 ? 'Ver lotes' : 'No hay lotes'}
                        </button>
                      </td>
                    </tr>
                  ))}
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

      {/* Modal de Ver Lotes */}
      {showLotesModal && selectedFinca && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={() => setShowLotesModal(false)}
          ></div>
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
            <div className="relative inline-block w-full bg-white rounded-2xl shadow-2xl max-w-4xl p-6 my-8 text-left align-middle transition-all transform">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold leading-6 text-gray-900">Lotes de {selectedFinca.nombre}</h3>
                <button
                  onClick={() => setShowLotesModal(false)}
                  className="text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="overflow-x-auto">
                {lotesFiltrados.length === 0 ? (
                  <div className="text-center py-12">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No hay lotes</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      No se encontraron lotes asignados a esta finca
                    </p>
                  </div>
                ) : (
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Nombre del Lote
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Promedio Broca
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Promedio Roya
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Volumen Cosechado
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Costo Producción
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Ventas Total
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Beneficio Neto
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {lotesFiltrados.map((lote) => (
                        <tr key={lote.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {lote.nombre}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {lote.promedioBroca}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {lote.promedioRoya}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {lote.volumenCosechado.toLocaleString()} kg
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {formatCurrency(lote.costoProduccion)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {formatCurrency(lote.totalVentas)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className={`text-sm font-medium ${
                              lote.beneficioNeto > 0 ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {formatCurrency(lote.beneficioNeto)}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>

              <div className="flex justify-end pt-6 border-t">
                <button
                  onClick={() => setShowLotesModal(false)}
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

export default Fincas;
