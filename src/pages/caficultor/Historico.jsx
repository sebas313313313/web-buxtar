import React, { useState } from 'react';
import { PageHeader, Card, StatusBadge } from '../../components';

const MOCK_HISTORY = [
  { id: 1, anio: 2025, lote: 'Lote Principal', mes: 'Noviembre', produccion: '1,200 kg', calidad: 'Excelente', estado: 'Completada' },
  { id: 2, anio: 2025, lote: 'Lote El Mirador', mes: 'Octubre', produccion: '850 kg', calidad: 'Buena', estado: 'Completada' },
  { id: 3, anio: 2024, lote: 'Lote Principal', mes: 'Diciembre', produccion: '1,100 kg', calidad: 'Buena', estado: 'Completada' },
  { id: 4, anio: 2024, lote: 'Lote La Colina', mes: 'Noviembre', produccion: '920 kg', calidad: 'Regular', estado: 'Completada' },
  { id: 5, anio: 2023, lote: 'Lote Principal', mes: 'Noviembre', produccion: '1,050 kg', calidad: 'Excelente', estado: 'Completada' },
];

const C_Historico = () => {
  const [filterYear, setFilterYear] = useState('Todos');
  const [historia, setHistoria] = useState(MOCK_HISTORY);
  const [showRegistroModal, setShowRegistroModal] = useState(false);
  const [nuevoRegistro, setNuevoRegistro] = useState({ lote: '', mes: '', produccion: '', calidad: 'Buena' });

  const handleValidarYGuardar = (e) => {
    e.preventDefault();
    if (nuevoRegistro.lote && nuevoRegistro.mes && nuevoRegistro.produccion) {
      setHistoria([{
        id: Date.now(),
        anio: 2026,
        lote: nuevoRegistro.lote,
        mes: nuevoRegistro.mes,
        produccion: `${nuevoRegistro.produccion} kg`,
        calidad: nuevoRegistro.calidad,
        estado: 'Pendiente' // Pendiente de validación AT
      }, ...historia]);
      setShowRegistroModal(false);
      setNuevoRegistro({ lote: '', mes: '', produccion: '', calidad: 'Buena' });
    }
  };

  const filteredHistory = filterYear === 'Todos' 
    ? historia 
    : historia.filter(h => h.anio.toString() === filterYear);

  return (
    <div className="space-y-6">
      <PageHeader title="Historial de Cosechas" subtitle="Consulta la evolución de tus cosechas por año y lote">
        <button 
          onClick={() => setShowRegistroModal(true)}
          className="px-4 py-2 bg-cafe-vino-600 text-white rounded-lg hover:bg-cafe-vino-700 transition-colors flex items-center shadow-sm"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
          Registrar Cosecha
        </button>
      </PageHeader>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title="Total Cosechado (2025)">
          <div className="mt-2 text-3xl font-bold text-gray-800">2,050 <span className="text-sm font-medium text-gray-500">kg</span></div>
          <p className="text-xs text-green-600 mt-1">↑ 12% más que 2024</p>
        </Card>
        <Card title="Promedio por Hectárea">
          <div className="mt-2 text-3xl font-bold text-gray-800">1.8 <span className="text-sm font-medium text-gray-500">t/ha</span></div>
          <p className="text-xs text-brand-cafe mt-1">Acorde al promedio</p>
        </Card>
        <Card title="Lote más productivo">
          <div className="mt-2 text-xl font-bold text-gray-800">Lote Principal</div>
          <p className="text-xs text-gray-500 mt-1">Responsable del 60% de tu producción</p>
        </Card>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Registros Detallados</h3>
          <select 
            value={filterYear}
            onChange={(e) => setFilterYear(e.target.value)}
            className="border-gray-200 rounded-md text-sm focus:ring-brand-cafe focus:border-brand-cafe"
          >
            <option value="Todos">Todos los años</option>
            <option value="2026">2026</option>
            <option value="2025">2025</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-sm border">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-white bg-brand-cafe rounded-tl-md">Año/Mes</th>
                <th className="px-4 py-3 text-left font-medium text-white bg-brand-cafe">Lote</th>
                <th className="px-4 py-3 text-left font-medium text-white bg-brand-cafe">Producción</th>
                <th className="px-4 py-3 text-left font-medium text-white bg-brand-cafe">Calidad</th>
                <th className="px-4 py-3 text-left font-medium text-white bg-brand-cafe rounded-tr-md">Estado</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredHistory.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-gray-800">{row.anio} - {row.mes}</td>
                  <td className="px-4 py-3 text-gray-600">{row.lote}</td>
                  <td className="px-4 py-3 font-semibold text-brand-cafe">{row.produccion}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${row.calidad === 'Excelente' ? 'bg-green-100 text-green-700' : row.calidad === 'Buena' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {row.calidad}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {row.estado === 'Pendiente' ? (
                      <span className="flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800 w-max">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        Pendiente Validación AT
                      </span>
                    ) : (
                      <StatusBadge status="active" text={row.estado} />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredHistory.length === 0 && (
          <p className="text-center text-gray-500 mt-4">No hay registros para este año.</p>
        )}
      </div>

      {/* Modal Registro de Cosecha */}
      {showRegistroModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setShowRegistroModal(false)}></div>
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 z-10">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-900">Registrar Nueva Cosecha</h3>
                <button onClick={() => setShowRegistroModal(false)} className="text-gray-400 hover:text-gray-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              <form onSubmit={handleValidarYGuardar} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Lote cosechado</label>
                  <select required value={nuevoRegistro.lote} onChange={e => setNuevoRegistro({...nuevoRegistro, lote: e.target.value})} className="w-full border-gray-300 rounded-md focus:ring-cafe-vino-500 focus:border-cafe-vino-500 text-sm py-2">
                    <option value="">Seleccione un lote...</option>
                    <option value="Lote Principal">Lote Principal</option>
                    <option value="Lote A1">Lote A1</option>
                    <option value="Lote B2">Lote B2</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mes de Cosecha</label>
                  <select required value={nuevoRegistro.mes} onChange={e => setNuevoRegistro({...nuevoRegistro, mes: e.target.value})} className="w-full border-gray-300 rounded-md focus:ring-cafe-vino-500 focus:border-cafe-vino-500 text-sm py-2">
                    <option value="">Seleccione mes...</option>
                    {['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'].map(m => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Producción (kg)</label>
                  <input required type="number" value={nuevoRegistro.produccion} onChange={e => setNuevoRegistro({...nuevoRegistro, produccion: e.target.value})} placeholder="Ej. 1500" className="w-full border-gray-300 rounded-md focus:ring-cafe-vino-500 focus:border-cafe-vino-500 text-sm py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Calidad Estimada</label>
                  <select required value={nuevoRegistro.calidad} onChange={e => setNuevoRegistro({...nuevoRegistro, calidad: e.target.value})} className="w-full border-gray-300 rounded-md focus:ring-cafe-vino-500 focus:border-cafe-vino-500 text-sm py-2">
                    <option value="Excelente">Excelente</option>
                    <option value="Buena">Buena</option>
                    <option value="Regular">Regular</option>
                  </select>
                </div>
                <div className="bg-blue-50 text-blue-800 text-xs p-3 rounded-lg flex gap-2">
                  <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <span>
                    El registro quedará marcado como <strong className="font-semibold">Pendiente</strong> hasta que tu Asistente Técnico lo valide.
                  </span>
                </div>
                <div className="pt-2 flex justify-end gap-3">
                  <button type="button" onClick={() => setShowRegistroModal(false)} className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">Cancelar</button>
                  <button type="submit" className="px-4 py-2 bg-cafe-vino-600 rounded-lg text-sm font-medium text-white hover:bg-cafe-vino-700">Guardar Registro</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default C_Historico;
