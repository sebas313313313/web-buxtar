import React, { useState } from 'react';

const Volumen = () => {
  const [showGrupoModal, setShowGrupoModal] = useState(false);
  const [showDetalleModal, setShowDetalleModal] = useState(false);
  const [showAnalisisModal, setShowAnalisisModal] = useState(false);
  const [selectedGrupo, setSelectedGrupo] = useState(null);
  const [selectedCaficultor, setSelectedCaficultor] = useState(null);
  const [periodoSeleccionado, setPeriodoSeleccionado] = useState('actual');
  const [tipoAnalisis, setTipoAnalisis] = useState('comparativo');

  // Datos ficticios de grupos de caficultores
  const [gruposCaficultores] = useState([
    { 
      id: 1, 
      nombre: 'Grupo Norte', 
      descripcion: 'Caficultores de la zona norte',
      caficultores: [
        { 
          id: 1, 
          nombre: 'Carlos Rodríguez', 
          dni: 'CC 123456789', 
          finca: 'Finca La Esperanza', 
          lote: 'Lote A1',
          floracion: 'Floración Principal 2024',
          cosecha: {
            cantidad: 4500,
            calidad: 'Premium',
            fechaInicio: '2024-03-01',
            fechaFin: '2024-05-15',
            precio: 3200,
            ingresos: 14400000
          }
        },
        { 
          id: 2, 
          nombre: 'Ana López', 
          dni: 'CC 234567890', 
          finca: 'Finca El Sol', 
          lote: 'Lote B1',
          floracion: 'Floración Secundaria 2024',
          cosecha: {
            cantidad: 3800,
            calidad: 'Extra',
            fechaInicio: '2024-03-15',
            fechaFin: '2024-05-20',
            precio: 3100,
            ingresos: 11780000
          }
        },
        { 
          id: 3, 
          nombre: 'Luis Torres', 
          dni: 'CC 345678901', 
          finca: 'Finca Buena Vista', 
          lote: 'Lote C1',
          floracion: 'Floración Principal 2024',
          cosecha: {
            cantidad: 5200,
            calidad: 'Premium',
            fechaInicio: '2024-02-20',
            fechaFin: '2024-05-10',
            precio: 3300,
            ingresos: 17160000
          }
        }
      ]
    },
    { 
      id: 2, 
      nombre: 'Grupo Sur', 
      descripcion: 'Caficultores de la zona sur',
      caficultores: [
        { 
          id: 4, 
          nombre: 'Pedro Gómez', 
          dni: 'CC 456789012', 
          finca: 'Finca San José', 
          lote: 'Lote D1',
          floracion: 'Floración Tardía 2024',
          cosecha: {
            cantidad: 4100,
            calidad: 'Extra',
            fechaInicio: '2024-04-01',
            fechaFin: '2024-06-15',
            precio: 3000,
            ingresos: 12300000
          }
        },
        { 
          id: 5, 
          nombre: 'Diego Herrera', 
          dni: 'CC 567890123', 
          finca: 'Finca Las Brisas', 
          lote: 'Lote E1',
          floracion: 'Floración Principal 2024',
          cosecha: {
            cantidad: 4700,
            calidad: 'Premium',
            fechaInicio: '2024-03-10',
            fechaFin: '2024-05-25',
            precio: 3250,
            ingresos: 15275000
          }
        }
      ]
    },
    { 
      id: 3, 
      nombre: 'Grupo Central', 
      descripcion: 'Caficultores de la zona central',
      caficultores: [
        { 
          id: 6, 
          nombre: 'José Martínez', 
          dni: 'CC 678901234', 
          finca: 'Finca El Recuerdo', 
          lote: 'Lote F1',
          floracion: 'Floración Principal 2024',
          cosecha: {
            cantidad: 3500,
            calidad: 'Standard',
            fechaInicio: '2024-03-20',
            fechaFin: '2024-06-01',
            precio: 2800,
            ingresos: 9800000
          }
        },
        { 
          id: 7, 
          nombre: 'Carmen Soto', 
          dni: 'CC 789012345', 
          finca: 'Finca Montaña Verde', 
          lote: 'Lote G1',
          floracion: 'Floración Secundaria 2024',
          cosecha: {
            cantidad: 4200,
            calidad: 'Extra',
            fechaInicio: '2024-04-05',
            fechaFin: '2024-06-20',
            precio: 3150,
            ingresos: 13230000
          }
        }
      ]
    }
  ]);

  // Datos históricos para análisis comparativo
  const [datosHistoricos] = useState({
    anterior: {
      2023: {
        total: 28500,
        promedio: 4071,
        maximo: 5200,
        minimo: 2800
      }
    },
    actual: {
      2024: {
        total: 30000,
        promedio: 4286,
        maximo: 5200,
        minimo: 3500
      }
    }
  });

  const handleSelectGrupo = (grupo) => {
    setSelectedGrupo(grupo);
    setShowGrupoModal(false);
  };

  const handleVerDetalle = (caficultor) => {
    setSelectedCaficultor(caficultor);
    setShowDetalleModal(true);
  };

  const handleAnalisis = (caficultor) => {
    setSelectedCaficultor(caficultor);
    setShowAnalisisModal(true);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat('es-CO').format(num);
  };

  const getCalidadColor = (calidad) => {
    switch(calidad) {
      case 'Premium': return 'bg-purple-100 text-purple-800';
      case 'Extra': return 'bg-blue-100 text-blue-800';
      case 'Standard': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getVariacionPorcentaje = (actual, anterior) => {
    if (anterior === 0) return 0;
    return ((actual - anterior) / anterior * 100).toFixed(1);
  };

  const getTotalGrupo = () => {
    if (!selectedGrupo) return 0;
    return selectedGrupo.caficultores.reduce((total, caficultor) => 
      total + caficultor.cosecha.cantidad, 0
    );
  };

  const getIngresosGrupo = () => {
    if (!selectedGrupo) return 0;
    return selectedGrupo.caficultores.reduce((total, caficultor) => 
      total + caficultor.cosecha.ingresos, 0
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Volumen de Cosechado</h1>
          <p className="text-gray-600">Análisis de producción y volúmenes de cosecha</p>
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

      {/* Resumen del Grupo */}
      {selectedGrupo && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Producción</dt>
                  <dd className="text-lg font-medium text-gray-900">{formatNumber(getTotalGrupo())} kg</dd>
                </dl>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Ingresos Totales</dt>
                  <dd className="text-lg font-medium text-gray-900">{formatCurrency(getIngresosGrupo())}</dd>
                </dl>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Promedio por Caficultor</dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {formatNumber(Math.round(getTotalGrupo() / selectedGrupo.caficultores.length))} kg
                  </dd>
                </dl>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-orange-500 rounded-md flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Precio Promedio</dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {formatCurrency(Math.round(getIngresosGrupo() / getTotalGrupo()))}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Results Section */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">
            {selectedGrupo ? `Cosechas - ${selectedGrupo.nombre}` : 'Cosechas'}
          </h2>
        </div>
        
        <div className="p-6">
          {!selectedGrupo ? (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">Seleccione un grupo</h3>
              <p className="mt-1 text-sm text-gray-500">
                Seleccione un grupo para ver los volúmenes de cosecha
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
                      DNI
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Finca
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Lote
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Floración
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Cosecha (kg)
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Calidad
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ingresos
                    </th>
                    <th className="relative px-6 py-3">
                      <span className="sr-only">Acciones</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {selectedGrupo.caficultores.map((caficultor) => (
                    <tr key={caficultor.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{caficultor.nombre}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{caficultor.dni}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{caficultor.finca}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{caficultor.lote}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{caficultor.floracion}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{formatNumber(caficultor.cosecha.cantidad)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCalidadColor(caficultor.cosecha.calidad)}`}>
                          {caficultor.cosecha.calidad}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{formatCurrency(caficultor.cosecha.ingresos)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleVerDetalle(caficultor)}
                            className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors text-xs"
                          >
                            Ver
                          </button>
                          <button
                            onClick={() => handleAnalisis(caficultor)}
                            className="inline-flex items-center px-2 py-1 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors text-xs"
                          >
                            Análisis
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

      {/* Modal de Detalles de Cosecha */}
      {showDetalleModal && selectedCaficultor && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={() => setShowDetalleModal(false)}
          ></div>
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
            <div className="relative inline-block w-full bg-white rounded-2xl shadow-2xl max-w-3xl p-6 my-8 text-left align-middle transition-all transform">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold leading-6 text-gray-900">
                  Detalles de Cosecha - {selectedCaficultor.nombre}
                </h3>
                <button
                  onClick={() => setShowDetalleModal(false)}
                  className="text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Información General */}
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Información General</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-600">DNI:</span>
                    <span className="ml-2 text-gray-900">{selectedCaficultor.dni}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Finca:</span>
                    <span className="ml-2 text-gray-900">{selectedCaficultor.finca}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Lote:</span>
                    <span className="ml-2 text-gray-900">{selectedCaficultor.lote}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Floración:</span>
                    <span className="ml-2 text-gray-900">{selectedCaficultor.floracion}</span>
                  </div>
                </div>
              </div>

              {/* Detalles de Cosecha */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {formatNumber(selectedCaficultor.cosecha.cantidad)} kg
                    </div>
                    <div className="text-sm text-green-800">Cantidad Cosechada</div>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {formatCurrency(selectedCaficultor.cosecha.ingresos)}
                    </div>
                    <div className="text-sm text-blue-800">Ingresos Totales</div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900">
                      {selectedCaficultor.cosecha.calidad}
                    </div>
                    <div className="text-sm text-gray-600">Calidad</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900">
                      {formatCurrency(selectedCaficultor.cosecha.precio)}
                    </div>
                    <div className="text-sm text-gray-600">Precio por kg</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900">
                      {new Date(selectedCaficultor.cosecha.fechaInicio).toLocaleDateString('es-CO')}
                    </div>
                    <div className="text-sm text-gray-600">Fecha Inicio</div>
                  </div>
                </div>

                <div className="bg-orange-50 p-4 rounded-lg">
                  <h4 className="font-medium text-orange-900 mb-2">Período de Cosecha</h4>
                  <div className="text-sm text-orange-800">
                    <div>Inicio: {new Date(selectedCaficultor.cosecha.fechaInicio).toLocaleDateString('es-CO')}</div>
                    <div>Fin: {new Date(selectedCaficultor.cosecha.fechaFin).toLocaleDateString('es-CO')}</div>
                    <div>Duración: {Math.round((new Date(selectedCaficultor.cosecha.fechaFin) - new Date(selectedCaficultor.cosecha.fechaInicio)) / (1000 * 60 * 60 * 24))} días</div>
                  </div>
                </div>
              </div>

              {/* Botón de Cerrar */}
              <div className="flex justify-end pt-6 border-t">
                <button
                  onClick={() => setShowDetalleModal(false)}
                  className="px-4 py-2 bg-cafe-vino-600 text-white rounded-lg hover:bg-cafe-vino-700 transition-colors"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Análisis Comparativo */}
      {showAnalisisModal && selectedCaficultor && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={() => setShowAnalisisModal(false)}
          ></div>
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
            <div className="relative inline-block w-full bg-white rounded-2xl shadow-2xl max-w-4xl p-6 my-8 text-left align-middle transition-all transform">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold leading-6 text-gray-900">
                  Análisis Comparativo - {selectedCaficultor.nombre}
                </h3>
                <button
                  onClick={() => setShowAnalisisModal(false)}
                  className="text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Comparación con Promedio del Grupo */}
              <div className="mb-8">
                <h4 className="font-medium text-gray-900 mb-4">Comparación con Promedio del Grupo</h4>
                <div className="grid grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {formatNumber(selectedCaficultor.cosecha.cantidad)}
                    </div>
                    <div className="text-sm text-gray-600">Su Producción</div>
                    <div className="text-xs text-gray-500 mt-1">
                      vs {formatNumber(Math.round(getTotalGrupo() / selectedGrupo.caficultores.length))} kg promedio
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {getVariacionPorcentaje(selectedCaficultor.cosecha.cantidad, Math.round(getTotalGrupo() / selectedGrupo.caficultores.length))}%
                    </div>
                    <div className="text-sm text-gray-600">Variación</div>
                    <div className={`text-xs mt-1 ${
                      selectedCaficultor.cosecha.cantidad > Math.round(getTotalGrupo() / selectedGrupo.caficultores.length)
                        ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {selectedCaficultor.cosecha.cantidad > Math.round(getTotalGrupo() / selectedGrupo.caficultores.length)
                        ? 'Above average' : 'Below average'}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      #{selectedGrupo.caficultores.sort((a, b) => b.cosecha.cantidad - a.cosecha.cantidad).findIndex(c => c.id === selectedCaficultor.id) + 1}
                    </div>
                    <div className="text-sm text-gray-600">Ranking en Grupo</div>
                    <div className="text-xs text-gray-500 mt-1">
                      de {selectedGrupo.caficultores.length} caficultores
                    </div>
                  </div>
                </div>
              </div>

              {/* Análisis Histórico */}
              <div className="mb-8">
                <h4 className="font-medium text-gray-900 mb-4">Análisis Histórico</h4>
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h5 className="font-medium text-gray-900 mb-3">Año Anterior (2023)</h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Producción:</span>
                        <span className="font-medium">{formatNumber(Math.round(selectedCaficultor.cosecha.cantidad * 0.95))} kg</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Ingresos:</span>
                        <span className="font-medium">{formatCurrency(Math.round(selectedCaficultor.cosecha.ingresos * 0.95))}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Calidad:</span>
                        <span className="font-medium">Extra</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h5 className="font-medium text-green-900 mb-3">Año Actual (2024)</h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-green-700">Producción:</span>
                        <span className="font-medium text-green-900">{formatNumber(selectedCaficultor.cosecha.cantidad)} kg</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-green-700">Ingresos:</span>
                        <span className="font-medium text-green-900">{formatCurrency(selectedCaficultor.cosecha.ingresos)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-green-700">Calidad:</span>
                        <span className="font-medium text-green-900">{selectedCaficultor.cosecha.calidad}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Proyecciones y Recomendaciones */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-3">Proyecciones y Recomendaciones</h4>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-medium text-blue-800 mb-2">Proyección 2025</h5>
                    <div className="text-sm text-blue-700 space-y-1">
                      <div>• Producción estimada: {formatNumber(Math.round(selectedCaficultor.cosecha.cantidad * 1.1))} kg</div>
                      <div>• Ingresos proyectados: {formatCurrency(Math.round(selectedCaficultor.cosecha.ingresos * 1.1))}</div>
                      <div>• Mejora esperada: +10%</div>
                    </div>
                  </div>
                  <div>
                    <h5 className="font-medium text-blue-800 mb-2">Recomendaciones</h5>
                    <div className="text-sm text-blue-700 space-y-1">
                      <div>• Mantener calidad Premium para mejor precio</div>
                      <div>• Optimizar período de cosecha</div>
                      <div>• Considerar expansión del lote</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Botón de Cerrar */}
              <div className="flex justify-end pt-6 border-t">
                <button
                  onClick={() => setShowAnalisisModal(false)}
                  className="px-4 py-2 bg-cafe-vino-600 text-white rounded-lg hover:bg-cafe-vino-700 transition-colors"
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

export default Volumen;
