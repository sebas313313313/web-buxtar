import React, { useState, useMemo } from 'react';
import {
  Modal,
  SearchBar
} from '../../components';

// --- MOCK DATA ---
const EXTENSIONISTAS_MOCK = [
  { id: 1, nombre: 'Ing. Javier Duarte' },
  { id: 2, nombre: 'Dra. Lucia Mendez' }
];

const CAFICULTORES_MOCK = {
  1: [
    { id: 101, nombre: 'Ricardo Peña', dni: '1023456789', email: 'ricardo@mail.com', telefono: '+57 321 000 0000', fincas: 2, lotes: 3, floraciones: 5, pases: 4, volumen: '3,200 kg' },
    { id: 102, nombre: 'Marina Sol', dni: '1098765432', email: 'marina@mail.com', telefono: '+57 311 111 2222', fincas: 1, lotes: 2, floraciones: 2, pases: 1, volumen: '850 kg' },
  ],
  2: [
    { id: 103, nombre: 'Gilberto Castro', dni: '1122334455', email: 'gilberto@mail.com', telefono: '+57 300 999 8888', fincas: 3, lotes: 6, floraciones: 8, pases: 10, volumen: '8,500 kg' },
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

// Pases de cosecha (MOCK para demostración)
const PASES_MOCK = {
  100: [
    { id: 1, numero: 'Pase 1 (Graneo)', fecha: '2026-05-10', jornales: 3, calidad: '85%', recolectado: '450 kg' },
    { id: 2, numero: 'Pase 2 (Pico principal)', fecha: '2026-06-05', jornales: 12, calidad: '92%', recolectado: '1,800 kg' },
    { id: 3, numero: 'Pase 3 (Tercio final)', fecha: '2026-06-25', jornales: 5, calidad: '88%', recolectado: '650 kg' }
  ],
  101: [
    { id: 4, numero: 'Pase Único', fecha: '2026-11-15', jornales: 8, calidad: '90%', recolectado: '1,200 kg' }
  ]
};

const VolumenDeCosechado = () => {
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
  const pasesData = selectedFloracion ? (PASES_MOCK[selectedFloracion] || []) : [];

  // Calcular totales para los cuadros de arriba
  const totalPases = currentCaficultores.reduce((acc, curr) => acc + curr.pases, 0);
  const totalVolumenFloat = currentCaficultores.reduce((acc, curr) => {
    const val = parseFloat(curr.volumen.replace(/,/g, '').replace(' kg', ''));
    return acc + (isNaN(val) ? 0 : val);
  }, 0);

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Volumen Cosechado</h1>
          <p className="text-gray-500 text-sm">Registro de pases de cosecha y kilos recolectados.</p>
        </div>
        
        <div className="flex justify-end">
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

      {/* Contenido Principal */}
      {selectedExtensionista ? (
        <div className="space-y-6">
          {/* Tarjetas de Totales */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 border-l-4 border-l-orange-500 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Total Pases de Cosecha</p>
                <h2 className="text-3xl font-black text-gray-800">{totalPases}</h2>
              </div>
              <div className="p-3 bg-orange-50 rounded-full text-orange-500">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
              </div>
            </div>
            
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 border-l-4 border-l-green-600 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Volumen Total Cosechado</p>
                <div className="flex items-end gap-2">
                  <h2 className="text-3xl font-black text-green-700">{totalVolumenFloat.toLocaleString()}</h2>
                  <span className="text-sm font-bold text-gray-400 mb-1">kg</span>
                </div>
              </div>
              <div className="p-3 bg-green-50 rounded-full text-green-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-100">
                <thead className="bg-gray-50 text-xs font-bold text-gray-500 uppercase tracking-widest leading-tight">
                  <tr>
                    <th className="px-6 py-4 text-left">Caficultor</th>
                    <th className="px-6 py-4 text-center">DNI / Cédula</th>
                    <th className="px-6 py-4 text-center">Fincas</th>
                    <th className="px-6 py-4 text-center">Lotes</th>
                    <th className="px-6 py-4 text-center">Floraciones</th>
                    <th className="px-6 py-4 text-center">Pases Cosecha</th>
                    <th className="px-6 py-4 text-right">Vol. Cosechado</th>
                    <th className="px-6 py-4 text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {currentCaficultores.length > 0 ? (
                    currentCaficultores.map((caf) => (
                      <tr key={caf.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4 flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-50 text-brand-vino flex items-center justify-center font-bold text-xs">
                            {caf.nombre.charAt(0)}
                          </div>
                          <div className="text-sm font-bold text-gray-900">{caf.nombre}</div>
                        </td>
                        <td className="px-6 py-4 text-center text-sm font-medium text-gray-600">
                          {caf.dni}
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
                          <span className="px-2 py-1 rounded bg-orange-50 text-orange-700 font-bold text-xs">
                            {caf.pases}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span className="text-sm font-bold text-green-700">{caf.volumen}</span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <button 
                            onClick={() => handleVer(caf)}
                            className="inline-flex items-center justify-center px-4 py-1.5 text-xs font-bold text-brand-vino border border-brand-vino rounded-lg hover:bg-brand-vino hover:text-white transition-all"
                          >
                            Ver
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="px-6 py-12 text-center flex flex-col items-center">
                        <p className="text-gray-500 font-medium pb-2">Este extensionista no tiene caficultores asignados.</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-gray-50 text-brand-vino rounded-full flex items-center justify-center mb-6">
            <svg className="w-8 h-8 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Selección de Extensionista Requerida</h3>
          <p className="text-gray-500 max-w-sm mb-2">Debes seleccionar un extensionista para visualizar los registros de volumen cosechado.</p>
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

      {/* Modal: Ver Detalles y Pases del Caficultor */}
      <Modal
        isOpen={showVerModal}
        onClose={() => setShowVerModal(false)}
        title={selectedCaficultor ? `Pases de Cosecha: ${selectedCaficultor.nombre}` : 'Detalles'}
        size="xl"
      >
        {selectedCaficultor && (
          <div className="mt-2 space-y-6">
            {/* Tarjeta de Información Personal */}
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 grid md:grid-cols-3 gap-4">
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase">DNI</p>
                <p className="text-sm font-bold text-gray-800 mt-1">{selectedCaficultor.dni}</p>
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

            {/* Tabla de Pases de Cosecha */}
            <div className="border border-gray-200 rounded-xl overflow-hidden mt-4">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 text-xs font-bold text-gray-500 uppercase">
                  <tr>
                    <th className="px-4 py-3 text-left">Pase de Cosecha</th>
                    <th className="px-4 py-3 text-center">Fecha</th>
                    <th className="px-4 py-3 text-center">Jornales</th>
                    <th className="px-4 py-3 text-center">Calidad Opt.</th>
                    <th className="px-4 py-3 text-right">Café Recolectado</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {selectedFloracion ? (
                    pasesData.length > 0 ? (
                      pasesData.map(pase => (
                        <tr key={pase.id} className="hover:bg-gray-50/50 text-sm font-medium text-gray-700">
                          <td className="px-4 py-4 text-gray-900 font-bold flex items-center gap-2">
                            <svg className="w-4 h-4 text-brand-vino" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                            {pase.numero}
                          </td>
                          <td className="px-4 py-4 text-center">{pase.fecha}</td>
                          <td className="px-4 py-4 text-center">{pase.jornales}</td>
                          <td className="px-4 py-4 text-center text-green-600 font-bold">{pase.calidad}</td>
                          <td className="px-4 py-4 text-right text-brand-vino font-black">{pase.recolectado}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="px-4 py-10 text-center text-sm text-gray-500 font-medium">
                          <div className="flex flex-col items-center justify-center">
                            <svg className="w-10 h-10 text-gray-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            No hay pases de cosecha registrados para esta floración.
                          </div>
                        </td>
                      </tr>
                    )
                  ) : (
                    <tr>
                      <td colSpan="5" className="px-4 py-10 text-center text-sm text-gray-400 bg-gray-50/50">
                        Selecciona finca, lote y floración para ver los pases asociados.
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
                className="px-6 py-2 text-sm font-bold text-white bg-brand-vino rounded-lg shadow hover:opacity-90 transition-colors"
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

export default VolumenDeCosechado;
