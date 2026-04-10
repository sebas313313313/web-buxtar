import React, { useState } from 'react';
import MapaGIS from '../../components/MapaGIS';

const Fincas = () => {
  const [showGrupoModal, setShowGrupoModal] = useState(false);
  const [showLotesModal, setShowLotesModal] = useState(false);
  const [selectedGrupo, setSelectedGrupo] = useState(null);
  const [selectedFinca, setSelectedFinca] = useState(null);
  const [tabLote, setTabLote]  = useState('info'); // 'info' | 'mapa' | 'plan'
  const [planesDeManejo, setPlanesDeManejo] = useState([]);
  const [showCrearPlanModal, setShowCrearPlanModal] = useState(false);
  const [nuevoPlanData, setNuevoPlanData] = useState({ actividad: '', fecha: '', insumos: '' });

  const [gruposCaficultores] = useState([
    { id: 1, nombre: 'Grupo Norte', descripcion: 'Caficultores de la zona norte', caficultores: ['Carlos Rodríguez', 'Ana López', 'Luis Torres'] },
    { id: 2, nombre: 'Grupo Sur',   descripcion: 'Caficultores de la zona sur',   caficultores: ['Pedro Gómez', 'Diego Herrera', 'Sofía Castro'] },
    { id: 3, nombre: 'Grupo Central', descripcion: 'Caficultores de la zona central', caficultores: ['José Martínez', 'Carmen Soto', 'Roberto Silva'] },
  ]);

  const [fincas] = useState([
    { id: 1, nombre: 'Finca La Esperanza', grupoId: 1, caficultor: 'Carlos Rodríguez', promedioBroca: 2.5, promedioRoya: 1.8, volumenCosechado: 4500, costoProduccion: 2800000, totalVentas: 5200000, beneficioNeto: 2400000 },
    { id: 2, nombre: 'Finca El Paraíso',   grupoId: 1, caficultor: 'Ana López',       promedioBroca: 3.2, promedioRoya: 2.1, volumenCosechado: 3800, costoProduccion: 2400000, totalVentas: 4100000, beneficioNeto: 1700000 },
    { id: 3, nombre: 'Finca Buena Vista',  grupoId: 1, caficultor: 'Luis Torres',     promedioBroca: 1.8, promedioRoya: 1.2, volumenCosechado: 5200, costoProduccion: 3200000, totalVentas: 6800000, beneficioNeto: 3600000 },
    { id: 4, nombre: 'Finca San José',     grupoId: 2, caficultor: 'Pedro Gómez',     promedioBroca: 2.9, promedioRoya: 2.4, volumenCosechado: 4100, costoProduccion: 2600000, totalVentas: 4900000, beneficioNeto: 2300000 },
    { id: 5, nombre: 'Finca Las Brisas',   grupoId: 3, caficultor: 'José Martínez',   promedioBroca: 2.1, promedioRoya: 1.6, volumenCosechado: 4700, costoProduccion: 2900000, totalVentas: 5500000, beneficioNeto: 2600000 },
    { id: 6, nombre: 'Finca El Recuerdo',  grupoId: 3, caficultor: 'Carmen Soto',     promedioBroca: 3.5, promedioRoya: 2.8, volumenCosechado: 3500, costoProduccion: 2200000, totalVentas: 3800000, beneficioNeto: 1600000 },
  ]);

  const [lotes, setLotes] = useState([
    { id: 1, nombre: 'Lote A1', fincaId: 1, fincaNombre: 'Finca La Esperanza', promedioBroca: 2.3, promedioRoya: 1.7, volumenCosechado: 2200, costoProduccion: 1400000, totalVentas: 2600000, beneficioNeto: 1200000, poligono: null, areaHa: null, lat: 4.832, lng: -75.691 },
    { id: 2, nombre: 'Lote A2', fincaId: 1, fincaNombre: 'Finca La Esperanza', promedioBroca: 2.7, promedioRoya: 1.9, volumenCosechado: 2300, costoProduccion: 1400000, totalVentas: 2600000, beneficioNeto: 1200000, poligono: null, areaHa: null, lat: 4.828, lng: -75.688 },
    { id: 3, nombre: 'Lote B1', fincaId: 3, fincaNombre: 'Finca Buena Vista',  promedioBroca: 1.6, promedioRoya: 1.1, volumenCosechado: 2600, costoProduccion: 1600000, totalVentas: 3400000, beneficioNeto: 1800000, poligono: null, areaHa: null, lat: 4.819, lng: -75.702 },
    { id: 4, nombre: 'Lote B2', fincaId: 3, fincaNombre: 'Finca Buena Vista',  promedioBroca: 2.0, promedioRoya: 1.3, volumenCosechado: 2600, costoProduccion: 1600000, totalVentas: 3400000, beneficioNeto: 1800000, poligono: null, areaHa: null, lat: 4.815, lng: -75.698 },
  ]);

  const [selectedLote, setSelectedLote] = useState(null);

  const handleSelectGrupo = (grupo) => { setSelectedGrupo(grupo); setShowGrupoModal(false); };
  const handleVerLotes = (finca) => { setSelectedFinca(finca); setTabLote('info'); setShowLotesModal(true); };

  const handleOpenLoteMap = (lote) => { setSelectedLote(lote); setTabLote('mapa'); };

  const handlePolygonSaved = (geojson, areaHa) => {
    if (!selectedLote) return;
    setLotes(prev => prev.map(l =>
      l.id === selectedLote.id ? { ...l, poligono: geojson, areaHa } : l
    ));
    setSelectedLote(prev => ({ ...prev, poligono: geojson, areaHa }));
  };

  const getNivelFitosanitario = (lote) => {
    const max = Math.max(lote.promedioBroca, lote.promedioRoya);
    if (max >= 3.0) return 'alto';
    if (max >= 2.0) return 'medio';
    return 'bajo';
  };

  const fincasFiltradas = selectedGrupo ? fincas.filter(f => f.grupoId === selectedGrupo.id) : [];
  const lotesFiltrados  = selectedFinca  ? lotes.filter(l => l.fincaId === selectedFinca.id)  : [];

  const formatCurrency = (n) => new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(n);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Fincas</h1>
          <p className="text-gray-600">Gestión de fincas, producción y delimitación GIS de lotes</p>
        </div>
      </div>

      {/* Grupo Selection */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Seleccionar Grupo</h2>
        </div>
        <div className="p-6">
          <button onClick={() => setShowGrupoModal(true)} className="px-4 py-2 bg-cafe-vino-600 text-white rounded-lg hover:bg-cafe-vino-700 transition-colors">
            Seleccionar un grupo
          </button>
          {selectedGrupo && (
            <div className="mt-4 text-sm text-gray-600">
              Grupo seleccionado: <span className="font-medium">{selectedGrupo.nombre}</span>
            </div>
          )}
        </div>
      </div>

      {/* Grupo Info */}
      {selectedGrupo && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Grupo de Caficultores</h2>
          </div>
          <div className="p-6">
            <h3 className="font-medium text-gray-900">{selectedGrupo.nombre}</h3>
            <p className="text-sm text-gray-600">{selectedGrupo.descripcion}</p>
            <div className="flex flex-wrap gap-2 mt-3">
              {selectedGrupo.caficultores.map((c, i) => (
                <span key={i} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-cafe-vino-100 text-cafe-vino-800">{c}</span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tabla Fincas */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">
            {selectedGrupo ? `Fincas — ${selectedGrupo.nombre}` : 'Fincas'}
          </h2>
        </div>
        <div className="p-6">
          {!selectedGrupo ? (
            <div className="text-center py-12 text-gray-400">
              <svg className="mx-auto h-12 w-12 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <p className="text-sm">Selecciona un grupo para ver las fincas</p>
            </div>
          ) : fincasFiltradas.length === 0 ? (
            <p className="text-center py-8 text-sm text-gray-500">No hay fincas en este grupo</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {['Nombre','Broca','Roya','Vol. Cosechado','Costo Prod.','Total Ventas','Benef. Neto','Lotes'].map(h => (
                      <th key={h} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {fincasFiltradas.map(finca => (
                    <tr key={finca.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{finca.nombre}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{finca.promedioBroca}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{finca.promedioRoya}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{finca.volumenCosechado.toLocaleString()} kg</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatCurrency(finca.costoProduccion)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatCurrency(finca.totalVentas)}</td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${finca.beneficioNeto > 0 ? 'text-green-600' : 'text-red-600'}`}>{formatCurrency(finca.beneficioNeto)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                        <button onClick={() => handleVerLotes(finca)} className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors text-xs gap-1">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>
                          Ver lotes
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

      {/* ── MODAL SELECCIÓN DE GRUPO ── */}
      {showGrupoModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setShowGrupoModal(false)} />
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 z-10">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Seleccionar Grupo</h3>
                <button onClick={() => setShowGrupoModal(false)} className="text-gray-400 hover:text-gray-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              <div className="space-y-3">
                {gruposCaficultores.map(grupo => (
                  <div key={grupo.id} onClick={() => handleSelectGrupo(grupo)} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{grupo.nombre}</div>
                      <div className="text-xs text-gray-500">{grupo.descripcion} · {grupo.caficultores.length} caficultores</div>
                    </div>
                    <svg className="w-5 h-5 text-cafe-vino-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL VER LOTES (con pestañas Info / Mapa GIS) ── */}
      {showLotesModal && selectedFinca && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setShowLotesModal(false)} />
          <div className="flex items-center justify-center min-h-screen px-4 py-8">
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-5xl z-10">
              {/* Header del modal */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Lotes — {selectedFinca.nombre}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">Caficultor: {selectedFinca.caficultor}</p>
                </div>
                <button onClick={() => setShowLotesModal(false)} className="text-gray-400 hover:text-gray-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-gray-200 px-6">
                <button
                  onClick={() => setTabLote('info')}
                  className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${tabLote === 'info' ? 'border-cafe-vino-600 text-cafe-vino-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                >
                  📋 Información
                </button>
                <button
                  onClick={() => setTabLote('mapa')}
                  className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${tabLote === 'mapa' ? 'border-cafe-vino-600 text-cafe-vino-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                >
                  🗺️ Mapa GIS
                </button>
                <button
                  onClick={() => { setTabLote('plan'); setSelectedLote(null); }}
                  className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${tabLote === 'plan' ? 'border-cafe-vino-600 text-cafe-vino-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                >
                  📋 Plan de Manejo
                </button>
              </div>

              <div className="p-6">
                {/* TAB INFORMACIÓN */}
                {tabLote === 'info' && (
                  lotesFiltrados.length === 0 ? (
                    <div className="text-center py-10 text-gray-400">
                      <svg className="mx-auto h-10 w-10 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                      <p className="text-sm">No hay lotes asignados a esta finca</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            {['Lote','Broca','Roya','Vol.','Costo','Ventas','Beneficio','Estado GIS','Acción'].map(h => (
                              <th key={h} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {lotesFiltrados.map(lote => {
                            const nivel = getNivelFitosanitario(lote);
                            const loteActual = lotes.find(l => l.id === lote.id);
                            return (
                              <tr key={lote.id} className="hover:bg-gray-50">
                                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{lote.nombre}</td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{lote.promedioBroca}</td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{lote.promedioRoya}</td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{lote.volumenCosechado.toLocaleString()} kg</td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{formatCurrency(lote.costoProduccion)}</td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{formatCurrency(lote.totalVentas)}</td>
                                <td className={`px-4 py-3 whitespace-nowrap text-sm font-medium ${lote.beneficioNeto > 0 ? 'text-green-600' : 'text-red-600'}`}>{formatCurrency(lote.beneficioNeto)}</td>
                                <td className="px-4 py-3 whitespace-nowrap">
                                  {loteActual?.poligono ? (
                                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                                      ✅ {loteActual.areaHa} Ha
                                    </span>
                                  ) : (
                                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
                                      ⚠️ Sin delimitar
                                    </span>
                                  )}
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap">
                                  <button
                                    onClick={() => { setSelectedLote(loteActual); setTabLote('mapa'); }}
                                    className="inline-flex items-center gap-1 px-2 py-1 bg-cafe-vino-100 text-cafe-vino-700 rounded-md hover:bg-cafe-vino-200 text-xs transition-colors"
                                  >
                                    🗺️ {loteActual?.poligono ? 'Editar' : 'Delimitar'}
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )
                )}

                {/* TAB MAPA GIS */}
                {tabLote === 'mapa' && (
                  <div className="space-y-4">
                    {/* Selector de lote */}
                    <div className="flex items-center gap-3">
                      <label className="text-sm font-medium text-gray-700">Seleccionar lote:</label>
                      <select
                        value={selectedLote?.id || ''}
                        onChange={(e) => {
                          const l = lotes.find(l => l.id === parseInt(e.target.value));
                          setSelectedLote(l || null);
                        }}
                        className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-cafe-vino-500 outline-none"
                      >
                        <option value="">-- Selecciona un lote --</option>
                        {lotesFiltrados.map(l => (
                          <option key={l.id} value={l.id}>{l.nombre} {lotes.find(x => x.id === l.id)?.areaHa ? `✅ ${lotes.find(x => x.id === l.id).areaHa} Ha` : '⚠️'}</option>
                        ))}
                      </select>
                    </div>

                    {/* Info del lote seleccionado */}
                    {selectedLote && (
                      <div className="bg-blue-50 rounded-lg px-4 py-3 text-sm flex flex-wrap gap-4">
                        <span><span className="font-medium text-blue-900">Lote:</span> <span className="text-blue-700">{selectedLote.nombre}</span></span>
                        <span><span className="font-medium text-blue-900">Broca:</span> <span className="text-blue-700">{selectedLote.promedioBroca}</span></span>
                        <span><span className="font-medium text-blue-900">Roya:</span> <span className="text-blue-700">{selectedLote.promedioRoya}</span></span>
                        {lotes.find(l => l.id === selectedLote?.id)?.areaHa && (
                          <span><span className="font-medium text-blue-900">Área:</span> <span className="text-green-600 font-bold">{lotes.find(l => l.id === selectedLote.id).areaHa} Ha</span></span>
                        )}
                      </div>
                    )}

                    {/* Instrucciones */}
                    {selectedLote && !lotes.find(l => l.id === selectedLote.id)?.poligono && (
                      <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 text-xs text-amber-800 flex gap-2">
                        <span>💡</span>
                        <span>Usa las herramientas de la izquierda del mapa para dibujar el polígono del lote. Al terminar, aparecerá el botón <strong>"Guardar delimitación"</strong> con el área calculada en hectáreas.</span>
                      </div>
                    )}

                    {/* Mapa */}
                    {selectedLote ? (
                      <MapaGIS
                        center={[selectedLote.lat || 4.83, selectedLote.lng || -75.69]}
                        zoom={15}
                        height="500px"
                        editable={true}
                        poligono={lotes.find(l => l.id === selectedLote.id)?.poligono || null}
                        nivelFitosanitario={getNivelFitosanitario(selectedLote)}
                        onPolygonSaved={handlePolygonSaved}
                      />
                    ) : (
                      <div className="flex items-center justify-center h-64 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                        <p className="text-gray-400 text-sm">Selecciona un lote para ver el mapa</p>
                      </div>
                    )}
                  </div>
                )}

                {/* TAB PLAN DE MANEJO */}
                {tabLote === 'plan' && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <label className="text-sm font-medium text-gray-700">Seleccionar lote para Plan de Manejo:</label>
                      <select
                        value={selectedLote?.id || ''}
                        onChange={(e) => {
                          const l = lotes.find(l => l.id === parseInt(e.target.value));
                          setSelectedLote(l || null);
                        }}
                        className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-cafe-vino-500 outline-none"
                      >
                        <option value="">-- Selecciona un lote --</option>
                        {lotesFiltrados.map(l => (
                          <option key={l.id} value={l.id}>{l.nombre}</option>
                        ))}
                      </select>
                    </div>

                    {selectedLote ? (
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <h4 className="font-bold text-gray-900">Actividades asignadas a {selectedLote.nombre}</h4>
                          <button onClick={() => setShowCrearPlanModal(true)} className="px-3 py-1.5 bg-cafe-vino-600 text-white rounded-md text-sm hover:bg-cafe-vino-700">
                            + Crear Actividad
                          </button>
                        </div>

                        {planesDeManejo.filter(p => p.idLote === selectedLote.id).length > 0 ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {planesDeManejo.filter(p => p.idLote === selectedLote.id).map(plan => (
                              <div key={plan.id} className="bg-white p-4 border border-gray-200 rounded-lg shadow-sm">
                                <h5 className="font-bold text-cafe-vino-800">{plan.actividad}</h5>
                                <p className="text-sm text-gray-600 mt-1"><strong>Insumos:</strong> {plan.insumos}</p>
                                <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100">
                                  <span className="text-xs text-gray-500">🗓️ Límite: {plan.fecha}</span>
                                  <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs font-semibold rounded-full">Pendiente</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-8 bg-gray-50 border border-gray-200 rounded-xl">
                            <p className="text-sm text-gray-500">Aún no has creado un plan de manejo para este lote.</p>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-40 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                        <p className="text-gray-400 text-sm">Selecciona un lote arriba para administrar su plan</p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="flex justify-end px-6 py-4 border-t border-gray-200">
                <button onClick={() => setShowLotesModal(false)} className="px-4 py-2 border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 rounded-lg transition-colors text-sm">
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL CREAR ACTIVIDAD DE PLAN */}
      {showCrearPlanModal && selectedLote && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setShowCrearPlanModal(false)} />
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-6 z-10">
              <h3 className="text-lg font-bold mb-4">Nueva Actividad para {selectedLote.nombre}</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Actividad a realizar</label>
                  <input type="text" className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-cafe-vino-500 focus:border-cafe-vino-500" value={nuevoPlanData.actividad} onChange={(e) => setNuevoPlanData({ ...nuevoPlanData, actividad: e.target.value })} placeholder="Ej. Fumigación, Poda..." />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Insumos recomendados</label>
                  <input type="text" className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-cafe-vino-500 focus:border-cafe-vino-500" value={nuevoPlanData.insumos} onChange={(e) => setNuevoPlanData({ ...nuevoPlanData, insumos: e.target.value })} placeholder="Ej. Fertilizante NPK" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Fecha Límite</label>
                  <input type="date" className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-cafe-vino-500 focus:border-cafe-vino-500" value={nuevoPlanData.fecha} onChange={(e) => setNuevoPlanData({ ...nuevoPlanData, fecha: e.target.value })} />
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <button onClick={() => setShowCrearPlanModal(false)} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">Cancelar</button>
                <button onClick={() => {
                  setPlanesDeManejo([...planesDeManejo, { id: Date.now(), idLote: selectedLote.id, actividad: nuevoPlanData.actividad, insumos: nuevoPlanData.insumos, fecha: nuevoPlanData.fecha }]);
                  setShowCrearPlanModal(false);
                  setNuevoPlanData({ actividad: '', fecha: '', insumos: '' });
                }} className="px-4 py-2 text-sm bg-cafe-vino-600 text-white rounded-lg hover:bg-cafe-vino-700">Guardar Actividad</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Fincas;
