import React, { useState, useMemo } from 'react';
import {
  Modal,
  SearchBar,
  EmptyState
} from '../../components';

const EXTENSIONISTAS_MOCK = [
  { id: 1, nombre: 'Ing. Javier Duarte' },
  { id: 2, nombre: 'Dra. Lucia Mendez' },
  { id: 3, nombre: 'Tech. Carlos Ruiz' }
];

const FINCAS_MOCK = {
  1: [
    { id: 1, nombre: 'Finca La Lomalarga', broca: '2.5%', roya: '5.0%', volCosechado: '1500 kg', volProduccion: '1200 kg', totalVentas: '$4,200', beneficio: '$1,700' },
    { id: 2, nombre: 'Finca El Rocío', broca: '1.2%', roya: '3.0%', volCosechado: '800 kg', volProduccion: '750 kg', totalVentas: '$2,400', beneficio: '$1,200' },
  ],
  2: [
    { id: 3, nombre: 'Finca Los Pinos', broca: '3.0%', roya: '2.1%', volCosechado: '2000 kg', volProduccion: '1800 kg', totalVentas: '$5,500', beneficio: '$2,400' },
  ]
};

// Mapeado por Finca ID
const LOTES_MOCK = {
  1: [
    { id: 101, nombre: 'Lote Principal', broca: '2.0%', roya: '4.5%', costoVolCosechado: '$300', costoProduccion: '$1,200', totalVentas: '$2,800', beneficio: '$1,300' },
    { id: 102, nombre: 'Lote Sur', broca: '3.0%', roya: '5.5%', costoVolCosechado: '$150', costoProduccion: '$600', totalVentas: '$1,400', beneficio: '$650' },
  ],
  2: [
    { id: 103, nombre: 'Lote Norte', broca: '1.2%', roya: '3.0%', costoVolCosechado: '$250', costoProduccion: '$900', totalVentas: '$2,400', beneficio: '$1,250' },
  ],
  3: [
    { id: 104, nombre: 'Lote Valle', broca: '3.0%', roya: '2.1%', costoVolCosechado: '$500', costoProduccion: '$2,200', totalVentas: '$5,500', beneficio: '$2,800' }
  ]
};

const Fincas = () => {
  const [selectedExtensionista, setSelectedExtensionista] = useState(null);
  const [searchExt, setSearchExt] = useState('');
  
  // Modales
  const [showExtModal, setShowExtModal] = useState(false);
  const [showLotesModal, setShowLotesModal] = useState(false);
  const [selectedFinca, setSelectedFinca] = useState(null);

  const filteredExtensionistas = useMemo(() => {
    return EXTENSIONISTAS_MOCK.filter(ext => 
      ext.nombre.toLowerCase().includes(searchExt.toLowerCase())
    );
  }, [searchExt]);

  const handleSelectExtensionista = (ext) => {
    setSelectedExtensionista(ext);
    setShowExtModal(false);
  };

  const handleVerLotes = (finca) => {
    setSelectedFinca(finca);
    setShowLotesModal(true);
  };

  const fincas = selectedExtensionista ? (FINCAS_MOCK[selectedExtensionista.id] || []) : [];
  const lotes = selectedFinca ? (LOTES_MOCK[selectedFinca.id] || []) : [];

  return (
    <div className="space-y-6">
      {/* Header y Acciones Principales */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Fincas</h1>
          <p className="text-gray-500 text-sm">Monitoreo y métricas de lotes productivos.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => alert("Exportando datos...")}
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-bold text-brand-vino bg-white border border-brand-vino rounded-lg hover:bg-red-50 transition-all shadow-sm group"
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

      {/* Contenido Principal */}
      {selectedExtensionista ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-100">
              <thead className="bg-gray-50 text-xs font-bold text-gray-500 uppercase tracking-widest leading-tight">
                <tr>
                  <th className="px-6 py-4 text-left">Nombre</th>
                  <th className="px-6 py-4 text-center">Prom. Broca</th>
                  <th className="px-6 py-4 text-center">Prom. Roya</th>
                  <th className="px-6 py-4 text-right">Vol. Cosechado</th>
                  <th className="px-6 py-4 text-right">Vol. Producción</th>
                  <th className="px-6 py-4 text-right">Total Ventas</th>
                  <th className="px-6 py-4 text-right">Beneficio Neto</th>
                  <th className="px-6 py-4 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {fincas.length > 0 ? (
                  fincas.map((f) => (
                    <tr key={f.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="text-sm font-bold text-gray-900">{f.nombre}</div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex px-2 py-1 text-xs font-bold rounded bg-orange-50 text-orange-700">
                          {f.broca}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex px-2 py-1 text-xs font-bold rounded bg-red-50 text-red-700">
                          {f.roya}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right text-sm font-medium text-gray-700">
                        {f.volCosechado}
                      </td>
                      <td className="px-6 py-4 text-right text-sm text-gray-600">
                        {f.volProduccion}
                      </td>
                      <td className="px-6 py-4 text-right text-sm font-bold text-green-700">
                        {f.totalVentas}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800">
                          {f.beneficio}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button 
                          onClick={() => handleVerLotes(f)}
                          className="inline-flex items-center justify-center px-4 py-1.5 text-xs font-bold text-brand-vino border border-brand-vino rounded-lg hover:bg-brand-vino hover:text-white transition-all"
                        >
                          Ver Lotes
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="px-6 py-12 text-center">
                      <p className="text-gray-500 font-medium">Este extensionista no tiene fincas asignadas.</p>
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
            <svg className="w-8 h-8 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Selección de Extensionista Requerida</h3>
          <p className="text-gray-500 max-w-sm mb-2">Debes seleccionar un extensionista para visualizar sus fincas vinculadas.</p>
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

      {/* Modal: Ver Lotes */}
      <Modal
        isOpen={showLotesModal}
        onClose={() => setShowLotesModal(false)}
        title={selectedFinca ? `Lotes de: ${selectedFinca.nombre}` : 'Lotes'}
        size="xl"
      >
        <div className="mt-4">
          <div className="overflow-x-auto border border-gray-100 rounded-xl">
            <table className="min-w-full divide-y divide-gray-100">
              <thead className="bg-gray-50 text-xs font-bold text-gray-500 uppercase tracking-widest">
                <tr>
                  <th className="px-4 py-3 text-left">Nombre</th>
                  <th className="px-4 py-3 text-center">Prom. Broca</th>
                  <th className="px-4 py-3 text-center">Prom. Roya</th>
                  <th className="px-4 py-3 text-right">Costos Vol. Cosechado</th>
                  <th className="px-4 py-3 text-right">Costos Producción</th>
                  <th className="px-4 py-3 text-right">Total Ventas</th>
                  <th className="px-4 py-3 text-right">Beneficio Neto</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 bg-white">
                {lotes.length > 0 ? (
                  lotes.map((l) => (
                    <tr key={l.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="text-sm font-bold text-gray-900">{l.nombre}</div>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className="inline-flex px-2 py-0.5 text-xs font-bold rounded bg-orange-50 text-orange-700">
                          {l.broca}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className="inline-flex px-2 py-0.5 text-xs font-bold rounded bg-red-50 text-red-700">
                          {l.roya}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right text-sm text-gray-600">
                        {l.costoVolCosechado}
                      </td>
                      <td className="px-4 py-3 text-right text-sm text-gray-600">
                        {l.costoProduccion}
                      </td>
                      <td className="px-4 py-3 text-right text-sm font-bold text-green-700">
                        {l.totalVentas}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-800">
                          {l.beneficio}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="px-4 py-10 text-center">
                      <p className="text-gray-500 font-medium">No hay lotes registrados para esta finca.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          <div className="mt-6 flex justify-end">
            <button
              onClick={() => setShowLotesModal(false)}
              className="px-6 py-2 text-sm font-bold text-white bg-brand-vino rounded-lg shadow hover:opacity-90 transition-colors"
            >
              Cerrar
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Fincas;
