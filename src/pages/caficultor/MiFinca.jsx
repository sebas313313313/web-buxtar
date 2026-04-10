import React, { useState } from 'react';
import { PageHeader, Card, Button, Modal, Input, ActionModal } from '../../components';
import MapaGIS from '../../components/MapaGIS';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const DEPARTAMENTOS_COLOMBIA = [
  'Antioquia', 'Boyacá', 'Caldas', 'Cauca', 'Cesar', 'Chocó', 'Cundinamarca', 'Huila',
  'La Guajira', 'Magdalena', 'Meta', 'Nariño', 'Norte de Santander', 'Quindío',
  'Risaralda', 'Santander', 'Tolima', 'Valle del Cauca',
];

// Polígonos de lotes demo que el AT habría delimitado previamente
const LOTES_DEMO = [
  {
    id: 1,
    nombre: 'Lote A1',
    nivel: 'bajo',
    areaHa: 3.2,
    poligono: {
      type: 'Polygon',
      coordinates: [[
        [-75.693, 4.836], [-75.689, 4.836], [-75.689, 4.832], [-75.693, 4.832], [-75.693, 4.836]
      ]]
    }
  },
  {
    id: 2,
    nombre: 'Lote A2',
    nivel: 'medio',
    areaHa: 2.8,
    poligono: {
      type: 'Polygon',
      coordinates: [[
        [-75.688, 4.836], [-75.684, 4.836], [-75.684, 4.832], [-75.688, 4.832], [-75.688, 4.836]
      ]]
    }
  },
  {
    id: 3,
    nombre: 'Lote B1',
    nivel: 'alto',
    areaHa: 1.9,
    poligono: {
      type: 'Polygon',
      coordinates: [[
        [-75.693, 4.831], [-75.689, 4.831], [-75.689, 4.827], [-75.693, 4.827], [-75.693, 4.831]
      ]]
    }
  },
];

const C_MiFinca = () => {
  const [fincas, setFincas] = useState([{
    id: 1,
    name: 'El Refugio',
    area: '12 Hectáreas',
    dept: 'Huila',
    altura: '1400 - 1700',
    lat: 4.833,
    lng: -75.691,
  }]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [alertModal, setAlertModal] = useState({ isOpen: false, type: 'info', title: '', message: '' });
  const [fincaSeleccionada, setFincaSeleccionada] = useState(fincas[0] || null);
  const [modoDibujo, setModoDibujo] = useState(false);
  const [lotesPorFinca, setLotesPorFinca] = useState({
    1: LOTES_DEMO
  });
  const [formData, setFormData] = useState({
    name: '', totalArea: '', unit: 'Hectáreas', coffeeArea: '', department: '', altura: '',
  });

  // Tareas
  const tareasCompletadas = 18;
  const tareasPendientes  = 5;
  const totalTareas       = tareasCompletadas + tareasPendientes;
  const porcentaje        = Math.round((tareasCompletadas / totalTareas) * 100);

  const data = {
    labels: ['Completadas', 'Pendientes'],
    datasets: [{ data: [tareasCompletadas, tareasPendientes], backgroundColor: ['#10b981', '#e5e7eb'], borderWidth: 0, cutout: '80%' }],
  };
  const options = { plugins: { legend: { display: false }, tooltip: { enabled: true } }, maintainAspectRatio: false };

  const handleAddFinca = (e) => {
    e.preventDefault();
    const newFinca = {
      id: Date.now(),
      name: formData.name,
      area: `${formData.totalArea} ${formData.unit}`,
      dept: formData.department,
      altura: formData.altura,
      lat: 4.5 + Math.random() * 0.5,
      lng: -75.5 - Math.random() * 0.5,
    };
    const updated = [...fincas, newFinca];
    setFincas(updated);
    setFincaSeleccionada(newFinca);
    setShowAddModal(false);
    setAlertModal({ isOpen: true, type: 'success', title: 'Éxito', message: 'Finca agregada correctamente.' });
    setFormData({ name: '', totalArea: '', unit: 'Hectáreas', coffeeArea: '', department: '', altura: '' });
  };

  const getLotesParaFinca = (finca) => {
    if (!finca) return [];
    return lotesPorFinca[finca.id] || [];
  };

  const handleGuardarLote = (geojson, areaHa) => {
    const fincadLotes = lotesPorFinca[fincaSeleccionada.id] || [];
    const nuevoLote = {
      id: Date.now(),
      nombre: `Lote ${fincadLotes.length + 1}`,
      nivel: 'bajo', 
      areaHa,
      poligono: geojson
    };
    setLotesPorFinca(prev => ({
      ...prev,
      [fincaSeleccionada.id]: [...(prev[fincaSeleccionada.id] || []), nuevoLote]
    }));
    setModoDibujo(false);
    setAlertModal({ isOpen: true, type: 'success', title: 'Lote delimitado', message: `Se ha guardado el nuevo lote (${areaHa} Ha).` });
  };

  const handleSelectFinca = (finca) => {
    setFincaSeleccionada(finca);
    setModoDibujo(false);
  };

  const lotesActuales = getLotesParaFinca(fincaSeleccionada);
  const tieneLotes    = lotesActuales.length > 0;
  const lotesEnRiesgo = lotesActuales.filter(l => l.nivel === 'alto');
  
  // Plan de manejo mock
  const [loteSeleccionadoPlan, setLoteSeleccionadoPlan] = useState(null);
  const [planDeManejo, setPlanDeManejo] = useState([
    { id: 1, idLote: 1, actividad: 'Fumigación Roya', fecha: '2026-04-15', insumos: 'Fungicida X', estado: 'Pendiente' },
    { id: 2, idLote: 2, actividad: 'Poda sanitaria', fecha: '2026-04-18', insumos: 'Tijeras desinfectadas', estado: 'Pendiente' },
    { id: 3, idLote: 3, actividad: 'Trampas Broca', fecha: '2026-04-12', insumos: 'Alcohol, envases', estado: 'Completada' },
  ]);

  const toggleTareaCompletada = (tareaId) => {
    setPlanDeManejo(prev => prev.map(t => t.id === tareaId ? { ...t, estado: t.estado === 'Pendiente' ? 'Completada' : 'Pendiente' } : t));
    setAlertModal({ isOpen: true, type: 'success', title: 'Plan actualizado', message: 'Has marcado la actividad como completada.' });
  };

  const nivelLabel = { bajo: 'Buen estado', medio: 'Atención media', alto: 'Alerta alta' };
  const nivelColor = { bajo: 'bg-green-100 text-green-700', medio: 'bg-amber-100 text-amber-700', alto: 'bg-red-100 text-red-700' };

  return (
    <div className="space-y-6">
      <PageHeader title="Mi Finca" subtitle="Resumen general de tus propiedades y progreso de actividades">
        <Button onClick={() => setShowAddModal(true)}>
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Agregar una finca
        </Button>
      </PageHeader>

      {/* COMPONENTE 1: ALERTA INTELIGENTE */}
      {lotesEnRiesgo.length > 0 && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md shadow-sm flex items-start animate-pulse">
          <div className="flex-shrink-0 mt-0.5 text-red-500">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-bold text-red-800">¡Alerta Fitosanitaria!</h3>
            <p className="text-sm text-red-700 mt-1">
              {lotesEnRiesgo.length === 1 
                ? `Tu ${lotesEnRiesgo[0].nombre} tiene nivel de riesgo alto por plagas o enfermedades. Agenda una visita técnica lo más pronto posible.` 
                : `${lotesEnRiesgo.length} lotes tienen nivel de riesgo alto. Agenda una visita técnica lo más pronto posible.`}
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Panel de Fincas */}
        <Card className="lg:col-span-2 shadow-sm border border-gray-100 flex flex-col">
          <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Total de Fincas Registradas</h3>
              <p className="text-sm text-gray-500">Administra tus plantaciones activas</p>
            </div>
            <div className="w-16 h-16 rounded-full bg-cafe-vino-50 flex items-center justify-center border-4 border-white shadow-sm">
              <span className="text-2xl font-black text-cafe-vino-700">{fincas.length}</span>
            </div>
          </div>

          {fincas.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center py-12 px-4 text-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
              <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <h4 className="text-lg font-semibold text-gray-900 mb-1">Aún no tienes fincas</h4>
              <p className="text-gray-500 text-sm mb-6 max-w-sm">Comienza agregando tu primera propiedad para monitorear cultivos y recibir asistencia técnica.</p>
              <Button onClick={() => setShowAddModal(true)}>Agregar Primera Finca</Button>
            </div>
          ) : (
            <div className="space-y-4 flex-1">
              {fincas.map(finca => (
                <div
                  key={finca.id}
                  onClick={() => handleSelectFinca(finca)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between group ${fincaSeleccionada?.id === finca.id ? 'border-cafe-vino-300 bg-cafe-vino-50 shadow-md' : 'border-gray-100 bg-white hover:shadow-md'}`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg">{finca.name}</h4>
                      <p className="text-sm text-gray-500">{finca.dept} • {finca.area} • Altura: {finca.altura} msnm</p>
                    </div>
                  </div>
                  {fincaSeleccionada?.id === finca.id && (
                    <span className="text-xs font-medium text-cafe-vino-600 bg-cafe-vino-100 px-2 py-1 rounded-full">Seleccionada</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Panel Lateral: Benchmark y Productividad */}
        <div className="flex flex-col gap-6">
          {/* COMPONENTE 3: BENCHMARK DE PRODUCTIVIDAD */}
          <Card className="shadow-sm border border-gray-100 bg-gradient-to-br from-cafe-vino-700 to-cafe-vino-900 text-white">
            <h3 className="text-lg font-bold mb-1">Rendimiento (Benchmark)</h3>
            <p className="text-sm text-cafe-vino-200 mb-6">Comparativa frente al promedio de tu Grupo</p>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-semibold">Tu Finca</span>
                  <span className="font-bold">3.2 t/ha</span>
                </div>
                <div className="w-full bg-cafe-vino-900 rounded-full h-2">
                  <div className="bg-green-400 h-2 rounded-full" style={{ width: '65%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-cafe-vino-200">Promedio del Grupo</span>
                  <span className="font-bold text-cafe-vino-100">4.1 t/ha</span>
                </div>
                <div className="w-full bg-cafe-vino-900 rounded-full h-2">
                  <div className="bg-cafe-vino-400 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
            </div>
            
            <div className="mt-5 p-3 bg-white/10 rounded-lg backdrop-blur-sm border border-white/10">
              <p className="text-xs text-cafe-vino-100">
                <span className="font-bold text-yellow-300">¡Hay margen para mejorar!</span> Consulta tu Plan de Manejo para alcanzar la meta del grupo.
              </p>
            </div>
          </Card>

          <Card className="shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-1">Productividad Actual</h3>
            <p className="text-sm text-gray-500 mb-6">Progreso de tareas y recomendaciones del Extensionista</p>
            <div className="relative w-40 h-40 mx-auto mb-4">
              <Doughnut data={data} options={options} />
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-3xl font-black text-gray-800 tracking-tight">{porcentaje}%</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-4">
              <div className="text-center">
                <p className="text-xl font-bold text-emerald-600">{tareasCompletadas}</p>
                <p className="text-[10px] text-gray-500 uppercase tracking-wide font-medium">Hechas</p>
              </div>
              <div className="text-center border-l border-gray-100">
                <p className="text-xl font-bold text-gray-400">{tareasPendientes}</p>
                <p className="text-[10px] text-gray-500 uppercase tracking-wide font-medium">Pendientes</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* ── SECCIÓN MAPA GIS (solo lectura) ── */}
      {fincaSeleccionada && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-gray-900">🗺️ Mapa de Lotes — {fincaSeleccionada.name}</h3>
              <p className="text-sm text-gray-500">Delimitación geográfica realizada por tu Asistente Técnico</p>
            </div>
            {tieneLotes && (
              <div className="flex gap-2">
                <span className="flex items-center gap-1.5 text-xs px-2 py-1 rounded-full bg-green-100 text-green-700">
                  <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />Buen estado
                </span>
                <span className="flex items-center gap-1.5 text-xs px-2 py-1 rounded-full bg-amber-100 text-amber-700">
                  <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" />Atención media
                </span>
                <span className="flex items-center gap-1.5 text-xs px-2 py-1 rounded-full bg-red-100 text-red-700">
                  <span className="w-2 h-2 rounded-full bg-red-500 inline-block" />Alerta alta
                </span>
              </div>
            )}
          </div>

          <div className="p-6">
            {!tieneLotes && !modoDibujo ? (
              <div className="flex flex-col items-center justify-center py-16 text-center bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                <svg className="w-14 h-14 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                <h4 className="text-base font-semibold text-gray-700 mb-2">Sin delimitación GIS aún</h4>
                <p className="text-sm text-gray-400 max-w-sm mb-6">
                  Puedes solicitar al asistente técnico que delimite los lotes de tu finca, o puedes hacerlo tú mismo dibujándolos en el mapa.
                </p>
                <Button onClick={() => setModoDibujo(true)}>Delimitar mis lotes</Button>
              </div>
            ) : (
              <>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
                  <div className="flex flex-wrap gap-2">
                    {lotesActuales.map(lote => (
                      <div key={lote.id} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium ${nivelColor[lote.nivel]}`}>
                        <span>{lote.nombre}</span>
                        <span className="opacity-70">·</span>
                        <span>{lote.areaHa} Ha</span>
                        <span className="opacity-70">·</span>
                        <span>{nivelLabel[lote.nivel]}</span>
                      </div>
                    ))}
                  </div>
                  {!modoDibujo && (
                    <Button variant="secondary" onClick={() => setModoDibujo(true)}>
                      + Agregar Lote
                    </Button>
                  )}
                  {modoDibujo && tieneLotes && (
                    <Button variant="secondary" onClick={() => setModoDibujo(false)}>
                      Cancelar Dibujo
                    </Button>
                  )}
                </div>

                <MapaGIS
                  key={`mapa-${fincaSeleccionada?.id}-${modoDibujo ? 'edit' : 'view'}`}
                  center={[fincaSeleccionada.lat || 4.833, fincaSeleccionada.lng || -75.691]}
                  zoom={15}
                  height="480px"
                  editable={modoDibujo}
                  onPolygonSaved={handleGuardarLote}
                  poligonosZonas={lotesActuales.map(l => ({
                    id: l.id,
                    nombre: l.nombre,
                    geojson: l.poligono,
                    color: l.nivel === 'alto' ? '#dc2626' : l.nivel === 'medio' ? '#d97706' : '#059669',
                    caficultores: null,
                    municipios: `${l.areaHa} Ha · Click para ver Plan de Manejo`,
                  }))}
                />

                {/* COMPONENTE 2: PLAN DE MANEJO POR LOTE */}
                <div className="mt-8 pt-8 border-t border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-900">Plan de Manejo y Actividades</h3>
                    <select 
                      className="text-sm border-gray-200 rounded-md focus:ring-brand-cafe focus:border-brand-cafe"
                      value={loteSeleccionadoPlan || ''}
                      onChange={(e) => setLoteSeleccionadoPlan(Number(e.target.value) || null)}
                    >
                      <option value="">Selecciona un lote...</option>
                      {lotesActuales.map(l => (
                        <option key={l.id} value={l.id}>{l.nombre}</option>
                      ))}
                    </select>
                  </div>
                  
                  {loteSeleccionadoPlan ? (
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                      {planDeManejo.filter(p => p.idLote === loteSeleccionadoPlan).length > 0 ? (
                        <ul className="space-y-3">
                          {planDeManejo.filter(p => p.idLote === loteSeleccionadoPlan).map(plan => (
                            <li key={plan.id} className="flex flex-col sm:flex-row sm:items-center justify-between bg-white p-3 rounded-lg border border-gray-200">
                              <div className="flex items-center gap-3">
                                <button 
                                  onClick={() => toggleTareaCompletada(plan.id)}
                                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${plan.estado === 'Completada' ? 'bg-green-500 border-green-500' : 'border-gray-300 hover:border-green-500'}`}
                                >
                                  {plan.estado === 'Completada' && <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                                </button>
                                <div>
                                  <p className={`font-semibold text-sm ${plan.estado === 'Completada' ? 'text-gray-400 line-through' : 'text-gray-800'}`}>{plan.actividad}</p>
                                  <p className="text-xs text-gray-500">Insumos: {plan.insumos} • Límite: {plan.fecha}</p>
                                </div>
                              </div>
                              <span className={`mt-2 sm:mt-0 px-2 py-1 text-xs font-medium rounded-full w-max ${plan.estado === 'Completada' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                                {plan.estado}
                              </span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-gray-500 text-center py-4">No hay actividades planificadas para este lote por ahora.</p>
                      )}
                    </div>
                  ) : (
                     <p className="text-sm text-gray-500 italic px-2">👆 Selecciona un lote en la lista desplegable de arriba para ver las actividades programadas por tu asistente técnico para dicho terreno.</p>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Modal Agregar Finca */}
      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="Nueva Finca">
        <form onSubmit={handleAddFinca} className="space-y-4">
          <Input
            label="Nombre de la Finca"
            placeholder="Ej: Finca El Mirador"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Total de Extensión</label>
              <div className="flex space-x-2">
                <input type="number" className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm border py-2 px-3 focus:outline-none focus:ring-2 focus:ring-cafe-vino-500" placeholder="Ej: 15" value={formData.totalArea} onChange={(e) => setFormData({ ...formData, totalArea: e.target.value })} required />
                <select className="block w-32 rounded-md border-gray-300 shadow-sm sm:text-sm border py-2 px-3 bg-gray-50 focus:outline-none" value={formData.unit} onChange={(e) => setFormData({ ...formData, unit: e.target.value })}>
                  <option value="Hectáreas">Hectáreas</option>
                  <option value="Plazas">Plazas</option>
                </select>
              </div>
            </div>
            <Input label="Hectáreas totales del Café" type="number" placeholder="Ej: 12" value={formData.coffeeArea} onChange={(e) => setFormData({ ...formData, coffeeArea: e.target.value })} required />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Departamento</label>
              <select className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm border py-2 px-3 bg-white focus:outline-none focus:ring-2 focus:ring-cafe-vino-500" value={formData.department} onChange={(e) => setFormData({ ...formData, department: e.target.value })} required>
                <option value="">Selecciona un departamento...</option>
                {DEPARTAMENTOS_COLOMBIA.map(dept => <option key={dept} value={dept}>{dept}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Altura (msnm)</label>
              <select className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm border py-2 px-3 bg-white focus:outline-none focus:ring-2 focus:ring-cafe-vino-500" value={formData.altura} onChange={(e) => setFormData({ ...formData, altura: e.target.value })} required>
                <option value="">Selecciona altura...</option>
                <option value="< 1400">Menor a 1400 msnm</option>
                <option value="1400 - 1700">Entre 1400 y 1700 msnm</option>
                <option value="> 1700">Mayor a 1700 msnm</option>
              </select>
            </div>
          </div>
          <div className="pt-6 border-t border-gray-100 flex justify-end space-x-3">
            <Button variant="secondary" type="button" onClick={() => setShowAddModal(false)}>Cancelar</Button>
            <Button type="submit">Guardar Finca</Button>
          </div>
        </form>
      </Modal>

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

export default C_MiFinca;
