import React, { useState, useMemo } from 'react';
import { Card, Button } from '../../../components';
import { CERTIFICATIONS, MOCK_FARMS } from '../exportUtils';
import CertificationTabs from './CertificationTabs';
import ExportSummary from './ExportSummary';

const ExportEvaluationWizard = ({ onClose, onFinish }) => {
  const [step, setStep] = useState(1);
  const [selectedFarm, setSelectedFarm] = useState('');
  const [selectedLot, setSelectedLot] = useState('');
  const [selectedHarvest, setSelectedHarvest] = useState('');
  const [answers, setAnswers] = useState({}); // { certId_quesId: boolean }

  const farmData = MOCK_FARMS.find(f => f.name === selectedFarm);
  const lotData = farmData?.lots.find(l => l.name === selectedLot);

  const progressByCert = useMemo(() => {
    return CERTIFICATIONS.reduce((acc, cert) => {
      const qIds = cert.questions.map(q => q.id);
      const total = qIds.length;
      const count = qIds.filter(id => answers[`${cert.id}_${id}`]).length;
      acc[cert.id] = Math.round((count / total) * 100);
      return acc;
    }, {});
  }, [answers]);

  const globalProgress = useMemo(() => {
    const values = Object.values(progressByCert);
    return Math.round(values.reduce((a, b) => a + b, 0) / values.length);
  }, [progressByCert]);

  const handleToggleAnswer = (certId, questionId) => {
    const key = `${certId}_${questionId}`;
    setAnswers(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleFinish = () => {
    onFinish({
      finca: selectedFarm,
      lote: selectedLot,
      cosecha: selectedHarvest,
      estado: globalProgress >= 80 ? 'Apto' : globalProgress >= 50 ? 'Parcial' : 'No Apto',
      puntaje: globalProgress,
      details: { answers, progressByCert }
    });
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-20 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-black text-gray-900">Nueva Evaluación</h2>
          <nav className="flex items-center text-xs text-gray-500 gap-2 mt-1">
            <span className={step >= 1 ? 'text-cafe-vino-600 font-bold' : ''}>1. Selección</span>
            <span>&gt;</span>
            <span className={step >= 2 ? 'text-cafe-vino-600 font-bold' : ''}>2. Checklists</span>
            <span>&gt;</span>
            <span className={step >= 3 ? 'text-cafe-vino-600 font-bold' : ''}>3. Resultado</span>
          </nav>
        </div>
        <Button variant="outline" onClick={onClose} size="sm">Cancelar</Button>
      </div>

      {step === 1 && (
        <Card className="p-8">
          <h3 className="text-lg font-bold text-gray-800 mb-6">Detalles de la Cosecha</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700 uppercase tracking-tighter">Finca</label>
              <select 
                className="w-full border-gray-200 rounded-2xl focus:ring-cafe-vino-500 py-3"
                value={selectedFarm}
                onChange={e => { setSelectedFarm(e.target.value); setSelectedLot(''); setSelectedHarvest(''); }}
              >
                <option value="">Seleccionar Finca</option>
                {MOCK_FARMS.map(f => <option key={f.id} value={f.name}>{f.name}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700 uppercase tracking-tighter">Lote</label>
              <select 
                className="w-full border-gray-200 rounded-2xl focus:ring-cafe-vino-500 py-3 disabled:opacity-50"
                value={selectedLot}
                disabled={!selectedFarm}
                onChange={e => { setSelectedLot(e.target.value); setSelectedHarvest(''); }}
              >
                <option value="">Seleccionar Lote</option>
                {farmData?.lots.map(l => <option key={l.id} value={l.name}>{l.name}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700 uppercase tracking-tighter">Cosecha</label>
              <select 
                className="w-full border-gray-200 rounded-2xl focus:ring-cafe-vino-500 py-3 disabled:opacity-50"
                value={selectedHarvest}
                disabled={!selectedLot}
                onChange={e => setSelectedHarvest(e.target.value)}
              >
                <option value="">Seleccionar Cosecha</option>
                {lotData?.harvests.map(h => <option key={h} value={h}>{h}</option>)}
              </select>
            </div>
          </div>
          <div className="flex justify-end mt-12 pt-8 border-t border-gray-50">
            <Button 
              disabled={!selectedHarvest} 
              onClick={() => setStep(2)}
              className="px-10"
            >
              Comenzar Evaluación &rarr;
            </Button>
          </div>
        </Card>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-cafe-vino-50 rounded-2xl flex items-center justify-center text-2xl font-black text-cafe-vino-600 border border-cafe-vino-100">
                {globalProgress}%
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Cumplimiento Global</p>
                <h4 className="text-lg font-black text-gray-900">{selectedFarm} - {selectedHarvest}</h4>
              </div>
            </div>
            <div className="w-1/3">
              <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-cafe-vino-600 transition-all duration-500" 
                  style={{ width: `${globalProgress}%` }}
                />
              </div>
              <p className="text-right text-[10px] font-black text-cafe-vino-600 mt-1 uppercase">Progreso de Auditoría</p>
            </div>
          </div>

          <CertificationTabs 
            answers={answers} 
            onToggle={handleToggleAnswer} 
            progressByCert={progressByCert}
          />

          <div className="flex justify-between items-center pt-8">
            <Button variant="outline" onClick={() => setStep(1)}>Atrás</Button>
            <Button variant="primary" onClick={() => setStep(3)} className="px-10">
              Ver Resultados Finales &rarr;
            </Button>
          </div>
        </div>
      )}

      {step === 3 && (
        <ExportSummary 
          farm={selectedFarm}
          lot={selectedLot}
          harvest={selectedHarvest}
          progressByCert={progressByCert}
          answers={answers}
          onBack={() => setStep(2)}
          onFinish={handleFinish}
        />
      )}
    </div>
  );
};

export default ExportEvaluationWizard;
