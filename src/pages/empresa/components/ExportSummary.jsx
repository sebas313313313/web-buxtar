import React, { useState } from 'react';
import { Card, Button } from '../../../components';
import { CERTIFICATIONS } from '../exportUtils';
import { exportCertificationToExcel } from '../../../utils/excelExport';

const ExportSummary = ({ farm, lot, harvest, progressByCert, answers, onBack, onFinish }) => {
  const [isFinishing, setIsFinishing] = useState(false);

  const globalProgress = Math.round(
    Object.values(progressByCert).reduce((a, b) => a + b, 0) / CERTIFICATIONS.length
  );

  const getStatus = (pct) => {
    if (pct >= 80) return { label: 'Exportable', color: 'text-green-600', bg: 'bg-green-100', icon: '🟢' };
    if (pct >= 50) return { label: 'Requiere mejoras', color: 'text-amber-600', bg: 'bg-amber-100', icon: '🟡' };
    return { label: 'No exportable', color: 'text-red-600', bg: 'bg-red-100', icon: '🔴' };
  };

  const globalStatus = getStatus(globalProgress);

  const handleDownload = (cert) => {
    exportCertificationToExcel({
      finca: farm,
      lote: lot,
      cosecha: harvest,
      certification: cert,
      answers,
      percentage: Math.round(progressByCert[cert.id]),
      date: new Date().toLocaleDateString('es-CO')
    });
  };

  const handleFinish = () => {
    setIsFinishing(true);
    setTimeout(() => {
      onFinish({
        finca: farm,
        lote: lot,
        cosecha: harvest,
        estado: globalStatus.label,
        puntaje: globalProgress,
        details: { progressByCert, answers }
      });
    }, 1000);
  };

  return (
    <div className={`space-y-8 animate-fade-in ${isFinishing ? 'opacity-50 pointer-events-none grayscale' : ''}`}>
      <Card className="p-10 border-none shadow-2xl shadow-gray-200/50 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-5">
          <span className="text-9xl font-black">CERT</span>
        </div>
        
        <div className="flex flex-col items-center text-center relative z-10">
          <div className={`w-24 h-24 rounded-full flex items-center justify-center text-4xl mb-6 shadow-inner ${globalStatus.bg}`}>
            {globalStatus.icon}
          </div>
          <h3 className="text-3xl font-black text-gray-900 mb-2">Resultado Global: {globalStatus.label}</h3>
          <p className="text-gray-500 max-w-md">
            Basado en la evaluación de {CERTIFICATIONS.length} normativas internacionales para la cosecha <strong>{harvest}</strong>.
          </p>
          
          <div className="mt-8 flex items-baseline gap-2 translate-x-3">
            <span className="text-7xl font-black text-gray-900">{globalProgress}%</span>
            <span className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Cumplimiento</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-12">
          {CERTIFICATIONS.map(cert => {
            const pct = Math.round(progressByCert[cert.id]);
            const status = getStatus(pct);
            return (
              <div key={cert.id} className={`p-4 rounded-2xl border transition-all ${pct >= 80 ? 'border-green-100 bg-green-50/30' : 'border-gray-100 bg-white'}`}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xl">{cert.icon}</span>
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${status.bg} ${status.color}`}>
                    {pct}%
                  </span>
                </div>
                <p className="text-xs font-black text-gray-900 truncate">{cert.label}</p>
                <div className="w-full bg-gray-200 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-1000 ${pct >= 80 ? 'bg-green-500' : pct >= 50 ? 'bg-amber-500' : 'bg-red-500'}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="p-6 lg:col-span-1">
          <h4 className="text-sm font-black text-gray-900 mb-6 uppercase tracking-widest">Recomendaciones</h4>
          <div className="space-y-4">
            {CERTIFICATIONS.filter(c => progressByCert[c.id] < 80).map(cert => (
              <div key={cert.id} className="flex gap-4 p-4 rounded-2xl bg-orange-50/50 border border-orange-100">
                <span className="text-lg">⚠️</span>
                <div>
                  <p className="text-xs font-black text-orange-900">{cert.label}</p>
                  <p className="text-[10px] text-orange-800 leading-tight mt-1">Revisar trazabilidad y documentación legal requerida para exportar.</p>
                </div>
              </div>
            ))}
            {Object.values(progressByCert).every(v => v >= 80) && (
              <div className="flex gap-4 p-4 rounded-2xl bg-green-50 border border-green-100">
                <span className="text-lg">✅</span>
                <div>
                  <p className="text-xs font-black text-green-900">¡Cumplimiento Total!</p>
                  <p className="text-[10px] text-green-800 mt-1">La cosecha se encuentra lista para el mercado de exportación.</p>
                </div>
              </div>
            )}
          </div>
        </Card>

        <Card className="p-6 lg:col-span-1">
          <h4 className="text-sm font-black text-gray-900 mb-6 uppercase tracking-widest">Próximos Pasos</h4>
          <ul className="space-y-4">
            <li className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-cafe-vino-100 text-cafe-vino-700 flex items-center justify-center text-[10px] font-black flex-shrink-0">1</div>
              <p className="text-xs text-gray-600 font-medium leading-normal">Descargar reportes Excel para las certificaciones aprobadas.</p>
            </li>
            <li className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-cafe-vino-100 text-cafe-vino-700 flex items-center justify-center text-[10px] font-black flex-shrink-0">2</div>
              <p className="text-xs text-gray-600 font-medium leading-normal">Coordinar visita de auditoría física si se requiere para certificación oficial.</p>
            </li>
            <li className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-cafe-vino-100 text-cafe-vino-700 flex items-center justify-center text-[10px] font-black flex-shrink-0">3</div>
              <p className="text-xs text-gray-600 font-medium leading-normal">Notificar a logística y compradores sobre la disponibilidad del lote.</p>
            </li>
          </ul>
        </Card>

        <Card className="p-6 lg:col-span-1">
          <h4 className="text-sm font-black text-gray-900 mb-6 flex items-center gap-2 uppercase tracking-widest">
            <span>📥</span> Descargas
          </h4>
          <div className="space-y-3">
            {CERTIFICATIONS.map(cert => {
              const canDownload = progressByCert[cert.id] >= 80;
              return (
                <div key={cert.id} className={`flex items-center justify-between p-3 rounded-2xl border transition-all ${canDownload ? 'border-cafe-vino-200 bg-white shadow-sm' : 'border-gray-50 bg-gray-50/50 opacity-40'}`}>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{cert.icon}</span>
                    <p className="text-[11px] font-bold text-gray-700">{cert.label}</p>
                  </div>
                  {canDownload && (
                    <button 
                      className="p-2 hover:bg-cafe-vino-50 text-cafe-vino-600 rounded-xl transition-all"
                      onClick={() => handleDownload(cert)}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M7 10l5 5m0 0l5-5m-5 5V3" />
                      </svg>
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 py-8 border-t border-gray-100">
        <Button variant="outline" onClick={onBack} className="w-full md:w-auto px-10">Volver a Auditoría</Button>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest hidden md:block">¿Todo correcto?</p>
          <Button 
            variant="primary" 
            onClick={handleFinish} 
            className="w-full md:w-auto px-16 bg-gray-900 hover:bg-black text-white py-4 text-lg font-black shadow-2xl shadow-gray-900/40 animate-bounce-subtle"
          >
            {isFinishing ? 'Guardando...' : 'Finalizar y Guardar Evaluación'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExportSummary;
