import React, { useState, useMemo } from 'react';
import { PageHeader, Card, Button } from '../../components';
import { CERTIFICATIONS, MOCK_FARMS } from './exportUtils';
import ExportEvaluationWizard from './components/ExportEvaluationWizard';

const DetailModal = ({ evaluation, onClose }) => {
  if (!evaluation) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden max-h-[90vh] flex flex-col">
        <div className="px-6 py-5 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
          <div>
            <h3 className="text-xl font-black text-gray-900">Detalle de Evaluación</h3>
            <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">{evaluation.finca} - {evaluation.cosecha}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-400 font-bold">✕</button>
        </div>
        
        <div className="p-6 overflow-y-auto space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
              <span className="block text-[10px] font-black text-gray-400 uppercase mb-1">Resultado Final</span>
              <span className={`text-sm font-black px-3 py-1 rounded-full ${
                evaluation.puntaje >= 80 ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
              }`}>
                {evaluation.estado} ({evaluation.puntaje}%)
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
              <span className="block text-[10px] font-black text-gray-400 uppercase mb-1">Fecha</span>
              <span className="text-sm font-black text-gray-800">{evaluation.fecha}</span>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest px-1">Desglose por Certificación</h4>
            {CERTIFICATIONS.map(cert => {
              // Mapeo simulado de resultados por certificación para evaluaciones previas
              const pct = evaluation.details?.progressByCert?.[cert.id] || (evaluation.puntaje - (Math.random() * 10));
              const roundedPct = Math.max(0, Math.min(100, Math.round(pct)));
              
              return (
                <div key={cert.id} className="p-4 rounded-2xl border border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{cert.icon}</span>
                    <span className="text-sm font-bold text-gray-700">{cert.label}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-24 bg-gray-100 h-1.5 rounded-full overflow-hidden hidden sm:block">
                      <div 
                        className={`h-full ${roundedPct >= 80 ? 'bg-green-500' : roundedPct >= 50 ? 'bg-amber-500' : 'bg-red-500'}`}
                        style={{ width: `${roundedPct}%` }}
                      />
                    </div>
                    <span className={`text-xs font-black w-10 text-right ${roundedPct >= 80 ? 'text-green-600' : 'text-gray-500'}`}>
                      {roundedPct}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end">
          <Button onClick={onClose}>Cerrar</Button>
        </div>
      </div>
    </div>
  );
};

const EvaluacionExportacion = () => {
  const [view, setView] = useState('list'); // 'list' | 'wizard'
  const [selectedEvaluation, setSelectedEvaluation] = useState(null);
  
  // Filtros
  const [farmFilter, setFarmFilter] = useState('Todas las fincas');
  const [statusFilter, setStatusFilter] = useState('Todos los estados');

  const [evaluations, setEvaluations] = useState([
    {
      id: 1,
      finca: 'Finca La Esperanza',
      lote: 'Lote El Mirador',
      cosecha: 'Cosecha Principal 2024',
      estado: 'Apto',
      fecha: '2024-03-15',
      puntaje: 85
    },
    {
      id: 2,
      finca: 'Finca San José',
      lote: 'Lote Principal',
      cosecha: 'Gran Cosecha 2024',
      estado: 'Parcial',
      fecha: '2024-04-01',
      puntaje: 62
    }
  ]);

  const filteredEvaluations = useMemo(() => {
    return evaluations.filter(ev => {
      const matchFarm = farmFilter === 'Todas las fincas' || ev.finca === farmFilter;
      const matchStatus = statusFilter === 'Todos los estados' || ev.estado === statusFilter;
      return matchFarm && matchStatus;
    });
  }, [evaluations, farmFilter, statusFilter]);

  const handleNewEvaluation = () => {
    setView('wizard');
  };

  const handleFinishWizard = (newEval) => {
    setEvaluations([
      { ...newEval, id: Date.now(), fecha: new Date().toISOString().split('T')[0] },
      ...evaluations
    ]);
    setView('list');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Apto': return 'bg-green-100 text-green-800 border-green-200';
      case 'Parcial': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'No Apto': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (view === 'wizard') {
    return (
      <ExportEvaluationWizard 
        onClose={() => setView('list')} 
        onFinish={handleFinishWizard}
      />
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader 
        title="Evaluación de Exportación" 
        subtitle="Analiza y certifica el cumplimiento de normativas internacionales para tus cosechas."
      />

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex flex-wrap gap-4 w-full md:w-auto">
          <select 
            className="border-gray-200 rounded-xl text-sm focus:ring-cafe-vino-500 cursor-pointer"
            value={farmFilter}
            onChange={(e) => setFarmFilter(e.target.value)}
          >
            <option>Todas las fincas</option>
            {MOCK_FARMS.map(f => <option key={f.id} value={f.name}>{f.name}</option>)}
          </select>
          <select 
            className="border-gray-200 rounded-xl text-sm focus:ring-cafe-vino-500 cursor-pointer"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option>Todos los estados</option>
            <option value="Apto">Apto</option>
            <option value="Parcial">Parcial</option>
            <option value="No Apto">No Apto</option>
          </select>
        </div>
        <Button 
          variant="primary" 
          onClick={handleNewEvaluation}
          className="w-full md:w-auto shadow-lg shadow-cafe-vino-600/20"
        >
          + Nueva evaluación
        </Button>
      </div>

      <Card className="overflow-hidden border-gray-100">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left font-black text-gray-500 uppercase tracking-widest text-[10px]">Finca / Lote</th>
                <th className="px-6 py-4 text-left font-black text-gray-500 uppercase tracking-widest text-[10px]">Cosecha</th>
                <th className="px-6 py-4 text-left font-black text-gray-500 uppercase tracking-widest text-[10px]">Fecha</th>
                <th className="px-6 py-4 text-left font-black text-gray-500 uppercase tracking-widest text-[10px]">Estado</th>
                <th className="px-6 py-4 text-center font-black text-gray-500 uppercase tracking-widest text-[10px]">Resultado</th>
                <th className="px-6 py-4 font-black text-gray-500 uppercase tracking-widest text-[10px] text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {filteredEvaluations.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-gray-500 italic">No se encontraron evaluaciones con los filtros seleccionados.</td>
                </tr>
              ) : (
                filteredEvaluations.map((ev) => (
                  <tr key={ev.id} className="hover:bg-gray-50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="font-bold text-gray-900">{ev.finca}</div>
                      <div className="text-xs text-gray-500">{ev.lote}</div>
                    </td>
                    <td className="px-6 py-4 text-gray-700">{ev.cosecha}</td>
                    <td className="px-6 py-4 text-gray-600 font-medium">{ev.fecha}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black border ${getStatusColor(ev.estado)}`}>
                        {ev.estado.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col items-center">
                        <span className="text-sm font-black text-gray-800">{ev.puntaje}%</span>
                        <div className="w-16 bg-gray-100 h-1.5 rounded-full mt-1 overflow-hidden">
                          <div 
                            className={`h-full ${ev.puntaje >= 80 ? 'bg-green-500' : ev.puntaje >= 50 ? 'bg-amber-500' : 'bg-red-500'}`}
                            style={{ width: `${ev.puntaje}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => setSelectedEvaluation(ev)}
                        className="bg-gray-100 hover:bg-cafe-vino-600 hover:text-white text-gray-600 px-3 py-1.5 rounded-xl text-xs font-black transition-all"
                      >
                        Ver detalle
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Modal de Detalle */}
      <DetailModal 
        evaluation={selectedEvaluation} 
        onClose={() => setSelectedEvaluation(null)} 
      />
    </div>
  );
};

export default EvaluacionExportacion;
