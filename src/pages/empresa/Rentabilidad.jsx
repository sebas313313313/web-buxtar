import React, { useState, useMemo } from 'react';
import {
  Modal,
  SearchBar
} from '../../components';

// --- MOCK DATA ---
const EXTENSIONISTAS_MOCK = [
  { id: 1, nombre: 'Ing. Javier Duarte' },
  { id: 2, nombre: 'Dra. Lucia Mendez' },
  { id: 3, nombre: 'Tech. Carlos Ruiz' }
];

const CAFICULTORES_MOCK = {
  1: [
    { id: 101, nombre: 'Ricardo Peña', cedula: '1023456789', email: 'ricardo@mail.com', telefono: '+57 321 000 0000', fincas: 2, lotes: 3, floraciones: 5, actAsignadas: 12, actCompletadas: 8 },
    { id: 102, nombre: 'Marina Sol', cedula: '1098765432', email: 'marina@mail.com', telefono: '+57 311 111 2222', fincas: 1, lotes: 2, floraciones: 2, actAsignadas: 5, actCompletadas: 5 },
  ],
  2: [
    { id: 103, nombre: 'Gilberto Castro', cedula: '1122334455', email: 'gilberto@mail.com', telefono: '+57 300 999 8888', fincas: 3, lotes: 6, floraciones: 8, actAsignadas: 20, actCompletadas: 15 },
  ]
};

const FINCAS_MOCK = {
  101: [{ id: 1, nombre: 'Finca La Lomalarga' }, { id: 2, nombre: 'Finca El Rocío' }],
  102: [{ id: 3, nombre: 'Finca Los Pinos' }],
  103: [{ id: 4, nombre: 'Finca Valle' }, { id: 5, nombre: 'Finca Sur' }],
};

const LOTES_MOCK = {
  1: [{ id: 10, nombre: 'Lote Principal' }, { id: 11, nombre: 'Lote Secundario' }],
  2: [{ id: 12, nombre: 'Lote Único' }],
  3: [{ id: 13, nombre: 'Lote A' }],
  4: [{ id: 14, nombre: 'Lote 1' }],
  5: [{ id: 15, nombre: 'Lote 2' }],
};

const FLORACIONES_MOCK = {
  10: [{ id: 100, nombre: 'Floración Principal 2026' }, { id: 101, nombre: 'Mitaca 2026' }],
  11: [{ id: 102, nombre: 'Floración 1' }],
  12: [{ id: 103, nombre: 'Floración 2026' }],
  13: [{ id: 104, nombre: 'Floración Temprana' }],
  14: [{ id: 105, nombre: 'Floración 1' }],
  15: [{ id: 106, nombre: 'Floración 1' }],
};

const ACTIVIDADES_MOCK = {
  100: [
    { id: 1001, nombre: 'Fertilización Edáfica', completada: 'Sí', fechaInicio: '2026-03-01', fechaFin: '2026-03-05', costo: '$ 450,000' },
    { id: 1002, nombre: 'Control de Broca', completada: 'No', fechaInicio: '2026-04-10', fechaFin: '2026-04-12', costo: '$ 120,000' },
  ],
  101: [
    { id: 1003, nombre: 'Poda de Formación', completada: 'Sí', fechaInicio: '2026-02-15', fechaFin: '2026-02-20', costo: '$ 600,000' },
  ]
};

const Rentabilidad = () => {
  const [selectedExtensionista, setSelectedExtensionista] = useState(null);
  const [searchExt, setSearchExt] = useState('');
  
  // Modals state
  const [showExtModal, setShowExtModal] = useState(false);
  const [showVerModal, setShowVerModal] = useState(false);
  
  // Detalle Caficultor
  const [selectedCaficultor, setSelectedCaficultor] = useState(null);
  const [selectedFinca, setSelectedFinca] = useState('');
  const [selectedLote, setSelectedLote] = useState('');
  const [selectedFloracion, setSelectedFloracion] = useState('');

  const filteredExtensionistas = useMemo(() => {
    return EXTENSIONISTAS_MOCK.filter(ext => 
      ext.nombre.toLowerCase().includes(searchExt.toLowerCase())
    );
  }, [searchExt]);

  const handleSelectExtensionista = (ext) => {
    setSelectedExtensionista(ext);
    setShowExtModal(false);
  };

  const handleVer = (caficultor) => {
    setSelectedCaficultor(caficultor);
    setSelectedFinca('');
    setSelectedLote('');
    setSelectedFloracion('');
    setShowVerModal(true);
  };

  const currentCaficultores = selectedExtensionista ? (CAFICULTORES_MOCK[selectedExtensionista.id] || []) : [];
  
  const fincasOptions = selectedCaficultor ? (FINCAS_MOCK[selectedCaficultor.id] || []) : [];
  const lotesOptions = selectedFinca ? (LOTES_MOCK[selectedFinca] || []) : [];
  const floracionesOptions = selectedLote ? (FLORACIONES_MOCK[selectedLote] || []) : [];
  const actividadesList = selectedFloracion ? (ACTIVIDADES_MOCK[selectedFloracion] || []) : [];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Rentabilidad</h1>
          <p className="text-gray-500 text-sm">Control de actividades y estado financiero de caficultores.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => alert("Exportando datos...")}
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-bold text-brand-vino bg-white border border-brand-vino rounded-lg hover:bg-red-50 transition-all shadow-sm"
          >
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Exportar Datos
          </button>
          
          <button
            onClick={() => setShowExtModal(true)}
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-bold text-white bg-brand-vino rounded-lg hover:opacity-95 transition-all shadow-md group"
          >
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="whitespace-nowrap">
              {selectedExtensionista ? `Ext: ${selectedExtensionista.nombre}` : 'Seleccionar Extensionista'}
            </span>
          </button>
        </div>
      </div>

      {/* Tabla Principal */}
      {selectedExtensionista ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-100">
              <thead className="bg-gray-50 text-xs font-bold text-gray-500 uppercase tracking-widest leading-tight">
                <tr>
                  <th className="px-6 py-4 text-left">Caficultor</th>
                  <th className="px-6 py-4 text-center">Fincas</th>
                  <th className="px-6 py-4 text-center">Lotes</th>
                  <th className="px-6 py-4 text-center">Floraciones</th>
                  <th className="px-6 py-4 text-center">Act. Asignadas</th>
                  <th className="px-6 py-4 text-center">Act. Completadas</th>
                  <th className="px-6 py-4 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {currentCaficultores.length > 0 ? (
                  currentCaficultores.map((caf) => (
                    <tr key={caf.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="text-sm font-bold text-gray-900">{caf.nombre}</div>
                      </td>
                      <td className="px-6 py-4 text-center text-sm font-medium text-gray-700">
                        {caf.fincas}
                      </td>
                      <td className="px-6 py-4 text-center text-sm font-medium text-gray-700">
                        {caf.lotes}
                      </td>
                      <td className="px-6 py-4 text-center text-sm font-medium text-gray-700">
                        {caf.floraciones}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="px-2 py-1 rounded bg-blue-50 text-blue-700 font-bold text-xs">{caf.actAsignadas}</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="px-2 py-1 rounded bg-green-50 text-green-700 font-bold text-xs">{caf.actCompletadas}</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button 
                          onClick={() => handleVer(caf)}
                          className="inline-flex items-center justify-center px-5 py-1.5 text-xs font-bold text-brand-vino border border-brand-vino rounded-lg hover:bg-brand-vino hover:text-white transition-all"
                        >
                          Ver
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center">
                      <p className="text-gray-500 font-medium">Este extensionista no tiene caficultores asignados.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-gray-50 text-brand-vino rounded-full flex items-center justify-center mb-6">
            <svg className="w-8 h-8 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Selección de Extensionista Requerida</h3>
          <p className="text-gray-500 max-w-sm mb-2">Debes seleccionar un extensionista para visualizar sus caficultores vinculados.</p>
        </div>
      )}

      {/* Modal: Búsqueda y Selección de Extensionista */}
      <Modal
        isOpen={showExtModal}
        onClose={() => setShowExtModal(false)}
        title="Seleccionar Extensionista"
        size="md"
      >
        <div className="mt-4">
          <SearchBar
            value={searchExt}
            onChange={(e) => setSearchExt(e.target.value)}
            placeholder="Buscar por nombre..."
            className="w-full mb-4"
          />
          <div className="max-h-60 overflow-y-auto space-y-2 pr-2">
            {filteredExtensionistas.length > 0 ? (
              filteredExtensionistas.map(ext => (
                <button
                  key={ext.id}
                  onClick={() => handleSelectExtensionista(ext)}
                  className="w-full flex items-center justify-between p-3 bg-white border border-gray-100 rounded-lg hover:border-brand-vino hover:shadow-sm transition-all group"
                >
                  <span className="font-bold text-gray-800 group-hover:text-brand-vino">{ext.nombre}</span>
                  <svg className="w-5 h-5 text-gray-300 group-hover:text-brand-vino" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg>
                </button>
              ))
            ) : (
              <p className="text-sm text-gray-500 text-center py-4">No se encontraron extensionistas.</p>
            )}
          </div>
        </div>
      </Modal>

      {/* Modal: Ver Detalles del Caficultor */}
      <Modal
        isOpen={showVerModal}
        onClose={() => setShowVerModal(false)}
        title={selectedCaficultor ? `Detalles: ${selectedCaficultor.nombre}` : 'Detalles'}
        size="xl"
      >
        {selectedCaficultor && (
          <div className="mt-2 space-y-6">
            {/* Tarjeta de Información Personal */}
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 grid md:grid-cols-3 gap-4">
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase">Cédula</p>
                <p className="text-sm font-bold text-gray-800 mt-1">{selectedCaficultor.cedula}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase">Email</p>
                <p className="text-sm font-bold text-gray-800 mt-1">{selectedCaficultor.email}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase">Teléfono</p>
                <p className="text-sm font-bold text-gray-800 mt-1">{selectedCaficultor.telefono}</p>
              </div>
            </div>

            {/* Selectores de Perfilamiento */}
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Finca</label>
                <select
                  value={selectedFinca}
                  onChange={(e) => {
                    setSelectedFinca(e.target.value);
                    setSelectedLote('');
                    setSelectedFloracion('');
                  }}
                  className="w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg focus:ring-brand-vino focus:border-brand-vino outline-none transition-shadow hover:shadow-sm"
                >
                  <option value="">Seleccione Finca</option>
                  {fincasOptions.map(f => (
                    <option key={f.id} value={f.id}>{f.nombre}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Lote</label>
                <select
                  value={selectedLote}
                  onChange={(e) => {
                    setSelectedLote(e.target.value);
                    setSelectedFloracion('');
                  }}
                  disabled={!selectedFinca}
                  className="w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg focus:ring-brand-vino focus:border-brand-vino outline-none transition-shadow hover:shadow-sm disabled:bg-gray-100"
                >
                  <option value="">Seleccione Lote</option>
                  {lotesOptions.map(l => (
                    <option key={l.id} value={l.id}>{l.nombre}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Floración</label>
                <select
                  value={selectedFloracion}
                  onChange={(e) => setSelectedFloracion(e.target.value)}
                  disabled={!selectedLote}
                  className="w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg focus:ring-brand-vino focus:border-brand-vino outline-none transition-shadow hover:shadow-sm disabled:bg-gray-100"
                >
                  <option value="">Seleccione Floración</option>
                  {floracionesOptions.map(fl => (
                    <option key={fl.id} value={fl.id}>{fl.nombre}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Tabla de Actividades */}
            <div className="border border-gray-200 rounded-xl overflow-hidden mt-4">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 text-xs font-bold text-gray-500 uppercase">
                  <tr>
                    <th className="px-4 py-3 text-left">Actividad</th>
                    <th className="px-4 py-3 text-center">Completa</th>
                    <th className="px-4 py-3 text-center">F. Inicio</th>
                    <th className="px-4 py-3 text-center">F. Fin</th>
                    <th className="px-4 py-3 text-right">Costo Total</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {selectedFloracion ? (
                    actividadesList.length > 0 ? (
                      actividadesList.map(act => (
                        <tr key={act.id} className="hover:bg-gray-50/50">
                          <td className="px-4 py-3 text-sm font-bold text-gray-800">{act.nombre}</td>
                          <td className="px-4 py-3 text-center">
                            <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                              act.completada === 'Sí' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                            }`}>
                              {act.completada}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-center text-sm text-gray-600">{act.fechaInicio}</td>
                          <td className="px-4 py-3 text-center text-sm text-gray-600">{act.fechaFin}</td>
                          <td className="px-4 py-3 text-right text-sm font-bold text-brand-vino">{act.costo}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="px-4 py-8 text-center text-sm text-gray-500">
                          No hay actividades registradas en esta floración.
                        </td>
                      </tr>
                    )
                  ) : (
                    <tr>
                      <td colSpan="5" className="px-4 py-8 text-center text-sm text-gray-400 bg-gray-50/50">
                        Selecciona finca, lote y floración para ver las actividades asociadas.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Acciones del Modal */}
            <div className="flex justify-end pt-4 border-t border-gray-100">
              <button
                onClick={() => setShowVerModal(false)}
                className="px-6 py-2 text-sm font-bold text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Rentabilidad;
