import React, { useState } from 'react';
import { ActionModal } from '../../components';

const Pronostico = () => {
  const [showGrupoModal, setShowGrupoModal] = useState(false);
  const [alertModal, setAlertModal] = useState({ isOpen: false, type: 'info', title: '', message: '' });
  const [showPronosticoModal, setShowPronosticoModal] = useState(false);
  const [showModeloModal, setShowModeloModal] = useState(false);
  const [selectedGrupo, setSelectedGrupo] = useState(null);
  const [selectedCaficultor, setSelectedCaficultor] = useState(null);
  const [modeloSeleccionado, setModeloSeleccionado] = useState('');
  const [parametros, setParametros] = useState({
    precipitacion: '',
    temperatura: '',
    humedad: '',
    fertilizacion: '',
    edadPlanta: ''
  });

  // Datos ficticios de grupos de caficultores
  const [gruposCaficultores] = useState([
    { 
      id: 1, 
      nombre: 'Grupo Norte', 
      descripcion: 'Caficultores de la zona norte',
      caficultores: [
        { id: 1, nombre: 'Carlos Rodríguez', dna: 'COF001', finca: 'Finca La Esperanza', lote: 'Lote A1', exploracion: '2.5 ha' },
        { id: 2, nombre: 'Ana López', dna: 'COF002', finca: 'Finca El Sol', lote: 'Lote B1', exploracion: '1.8 ha' },
        { id: 3, nombre: 'Luis Torres', dna: 'COF003', finca: 'Finca Buena Vista', lote: 'Lote C1', exploracion: '3.2 ha' }
      ]
    },
    { 
      id: 2, 
      nombre: 'Grupo Sur', 
      descripcion: 'Caficultores de la zona sur',
      caficultores: [
        { id: 4, nombre: 'Pedro Gómez', dna: 'COF004', finca: 'Finca San José', lote: 'Lote D1', exploracion: '2.1 ha' },
        { id: 5, nombre: 'Diego Herrera', dna: 'COF005', finca: 'Finca Las Brisas', lote: 'Lote E1', exploracion: '2.8 ha' }
      ]
    },
    { 
      id: 3, 
      nombre: 'Grupo Central', 
      descripcion: 'Caficultores de la zona central',
      caficultores: [
        { id: 6, nombre: 'José Martínez', dna: 'COF006', finca: 'Finca El Recuerdo', lote: 'Lote F1', exploracion: '1.9 ha' },
        { id: 7, nombre: 'Carmen Soto', dna: 'COF007', finca: 'Finca Montaña Verde', lote: 'Lote G1', exploracion: '2.6 ha' }
      ]
    }
  ]);

  // Modelos de pronóstico disponibles
  const modelosPronostico = [
    {
      id: 'ml_arima',
      nombre: 'Modelo ARIMA con Machine Learning',
      descripcion: 'Modelo avanzado que combina series temporales con aprendizaje automático',
      precision: '92%',
      parametros: ['precipitacion', 'temperatura', 'humedad', 'fertilizacion', 'edadPlanta']
    },
    {
      id: 'red_neuronal',
      nombre: 'Red Neuronal Recurrente (LSTM)',
      descripcion: 'Modelo de deep learning especializado en secuencias temporales',
      precision: '95%',
      parametros: ['precipitacion', 'temperatura', 'humedad', 'fertilizacion', 'edadPlanta']
    },
    {
      id: 'regresion_multiple',
      nombre: 'Regresión Múltiple',
      descripcion: 'Modelo estadístico clásico con múltiples variables predictoras',
      precision: '85%',
      parametros: ['precipitacion', 'temperatura', 'humedad']
    },
    {
      id: 'bosque_aleatorio',
      nombre: 'Random Forest',
      descripcion: 'Ensemble de árboles de decisión para pronóstico no lineal',
      precision: '89%',
      parametros: ['precipitacion', 'temperatura', 'humedad', 'fertilizacion']
    }
  ];

  const handleSelectGrupo = (grupo) => {
    setSelectedGrupo(grupo);
    setShowGrupoModal(false);
  };

  const handlePronostico = (caficultor) => {
    setSelectedCaficultor(caficultor);
    setShowModeloModal(true);
    setModeloSeleccionado('');
    setParametros({
      precipitacion: '',
      temperatura: '',
      humedad: '',
      fertilizacion: '',
      edadPlanta: ''
    });
  };

  const handleModeloChange = (modeloId) => {
    setModeloSeleccionado(modeloId);
    const modelo = modelosPronostico.find(m => m.id === modeloId);
    if (modelo) {
      // Resetear parámetros
      setParametros({
        precipitacion: '',
        temperatura: '',
        humedad: '',
        fertilizacion: '',
        edadPlanta: ''
      });
    }
  };

  const handleParametroChange = (parametro, valor) => {
    setParametros(prev => ({
      ...prev,
      [parametro]: valor
    }));
  };

  const handleGenerarPronostico = () => {
    const modelo = modelosPronostico.find(m => m.id === modeloSeleccionado);
    if (!modelo) return;

    // Validar parámetros requeridos
    const parametrosRequeridos = modelo.parametros;
    const parametrosCompletos = parametrosRequeridos.every(param => parametros[param]);

    if (!parametrosCompletos) {
      setAlertModal({ isOpen: true, type: 'danger', title: 'Atención', message: 'Por favor complete todos los parámetros requeridos para el modelo seleccionado' });
      return;
    }

    // Simular generación de pronóstico
    setShowModeloModal(false);
    setShowPronosticoModal(true);
  };

  const getPronosticoResultado = () => {
    // Simular resultado basado en parámetros
    const baseProduccion = 1000; // kg base
    const factorPrecipitacion = parseFloat(parametros.precipitacion) || 0;
    const factorTemperatura = parseFloat(parametros.temperatura) || 0;
    const factorHumedad = parseFloat(parametros.humedad) || 0;
    const factorFertilizacion = parseFloat(parametros.fertilizacion) || 0;
    const factorEdad = parseFloat(parametros.edadPlanta) || 0;

    // Cálculo simulado del pronóstico
    const pronostico = Math.round(
      baseProduccion * (1 + factorPrecipitacion/100) * 
      (1 + factorTemperatura/200) * 
      (1 + factorHumedad/150) * 
      (1 + factorFertilizacion/100) * 
      (1 - factorEdad/500)
    );

    return pronostico;
  };

  const getConfianza = () => {
    const modelo = modelosPronostico.find(m => m.id === modeloSeleccionado);
    return modelo ? modelo.precision : '0%';
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat('es-CO').format(num);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pronóstico de Cosecha</h1>
          <p className="text-gray-600">Modelos predictivos para estimación de producción</p>
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
              <h3 className="mt-2 text-sm font-medium text-gray-900">Seleccione un grupo</h3>
              <p className="mt-1 text-sm text-gray-500">
                Seleccione un grupo para ver los caficultores disponibles
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
                      DNA
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Finca
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Lote
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Exploración
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
                        <div className="text-sm text-gray-900">{caficultor.dna}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{caficultor.finca}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{caficultor.lote}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{caficultor.exploracion}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handlePronostico(caficultor)}
                          className="inline-flex items-center px-3 py-1 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors text-xs"
                        >
                          Generar Pronóstico
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

      {/* Modal de Selección de Modelo y Parámetros */}
      {showModeloModal && selectedCaficultor && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={() => setShowModeloModal(false)}
          ></div>
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
            <div className="relative inline-block w-full bg-white rounded-2xl shadow-2xl max-w-4xl p-6 my-8 text-left align-middle transition-all transform">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold leading-6 text-gray-900">
                  Pronóstico para {selectedCaficultor.nombre}
                </h3>
                <button
                  onClick={() => setShowModeloModal(false)}
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
                <div className="grid grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-600">DNA:</span>
                    <span className="ml-2 text-gray-900">{selectedCaficultor.dna}</span>
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
                    <span className="font-medium text-gray-600">Exploración:</span>
                    <span className="ml-2 text-gray-900">{selectedCaficultor.exploracion}</span>
                  </div>
                </div>
              </div>

              {/* Selección de Modelo */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Seleccionar Modelo de Pronóstico
                </label>
                <select
                  value={modeloSeleccionado}
                  onChange={(e) => handleModeloChange(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cafe-vino-500 focus:border-cafe-vino-500"
                >
                  <option value="">Seleccionar modelo...</option>
                  {modelosPronostico.map((modelo) => (
                    <option key={modelo.id} value={modelo.id}>
                      {modelo.nombre} (Precisión: {modelo.precision})
                    </option>
                  ))}
                </select>
                {modeloSeleccionado && (
                  <div className="mt-2 text-sm text-gray-600">
                    {modelosPronostico.find(m => m.id === modeloSeleccionado)?.descripcion}
                  </div>
                )}
              </div>

              {/* Parámetros del Modelo */}
              {modeloSeleccionado && (
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 mb-4">Parámetros del Modelo</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {modelosPronostico.find(m => m.id === modeloSeleccionado)?.parametros.map((param) => (
                      <div key={param}>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {param.charAt(0).toUpperCase() + param.slice(1).replace(/([A-Z])/g, ' $1')}
                        </label>
                        <input
                          type="number"
                          value={parametros[param]}
                          onChange={(e) => handleParametroChange(param, e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cafe-vino-500 focus:border-cafe-vino-500"
                          placeholder={`Ingrese ${param}...`}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Botones */}
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowModeloModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 rounded-lg transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleGenerarPronostico}
                  disabled={!modeloSeleccionado}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 transition-colors"
                >
                  Generar Pronóstico
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Resultados del Pronóstico */}
      {showPronosticoModal && selectedCaficultor && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={() => setShowPronosticoModal(false)}
          ></div>
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
            <div className="relative inline-block w-full bg-white rounded-2xl shadow-2xl max-w-3xl p-6 my-8 text-left align-middle transition-all transform">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold leading-6 text-gray-900">
                  Resultados del Pronóstico
                </h3>
                <button
                  onClick={() => setShowPronosticoModal(false)}
                  className="text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Resultado Principal */}
              <div className="text-center mb-8">
                <div className="text-5xl font-bold text-green-600 mb-2">
                  {formatNumber(getPronosticoResultado())} kg
                </div>
                <div className="text-lg text-gray-600">
                  Producción estimada para {selectedCaficultor.finca}
                </div>
                <div className="text-sm text-gray-500 mt-2">
                  Modelo: {modelosPronostico.find(m => m.id === modeloSeleccionado)?.nombre}
                </div>
              </div>

              {/* Métricas del Pronóstico */}
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    {getConfianza()}
                  </div>
                  <div className="text-sm text-gray-600">Confianza del Modelo</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600 mb-1">
                    {new Date().toLocaleDateString('es-CO', { month: 'long', year: 'numeric' })}
                  </div>
                  <div className="text-sm text-gray-600">Período Estimado</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600 mb-1">
                    {formatNumber(Math.round(getPronosticoResultado() * 2800))} COP
                  </div>
                  <div className="text-sm text-gray-600">Valor Estimado</div>
                </div>
              </div>

              {/* Parámetros Utilizados */}
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Parámetros Utilizados</h4>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  {Object.entries(parametros).filter(([key, value]) => value).map(([key, value]) => (
                    <div key={key}>
                      <span className="font-medium text-gray-600">
                        {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}:
                      </span>
                      <span className="ml-2 text-gray-900">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recomendaciones */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Recomendaciones</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Mantenga los niveles de fertilización actuales para optimizar la producción</li>
                  <li>• Monitoree las condiciones climáticas durante el período de cosecha</li>
                  <li>• Considere incrementar la irrigación si la precipitación disminuye</li>
                  <li>• Realice controles de calidad periódicos para asegurar el rendimiento estimado</li>
                </ul>
              </div>

              {/* Botón de Cerrar */}
              <div className="flex justify-end pt-6 border-t">
                <button
                  onClick={() => setShowPronosticoModal(false)}
                  className="px-4 py-2 bg-cafe-vino-600 text-white rounded-lg hover:bg-cafe-vino-700 transition-colors"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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

export default Pronostico;
