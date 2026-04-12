import React, { useState } from 'react';
import { CERTIFICATIONS } from '../exportUtils';
import CertificationChecklist from './CertificationChecklist';

const CertificationTabs = ({ answers, onToggle, progressByCert }) => {
  const [activeTab, setActiveTab] = useState(CERTIFICATIONS[0].id);

  const getStatusInfo = (pct) => {
    if (pct >= 80) return { color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-100', label: 'Cumple' };
    if (pct >= 50) return { color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100', label: 'Parcial' };
    return { color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-100', label: 'No cumple' };
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row h-[600px]">
      {/* Sidebar Tabs */}
      <div className="w-full md:w-80 bg-gray-50 border-r border-gray-100 overflow-y-auto">
        <div className="p-6">
          <h5 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Certificaciones</h5>
          <div className="space-y-2">
            {CERTIFICATIONS.map(cert => {
              const pct = progressByCert[cert.id] || 0;
              const status = getStatusInfo(pct);
              const isActive = activeTab === cert.id;

              return (
                <button
                  key={cert.id}
                  onClick={() => setActiveTab(cert.id)}
                  className={`w-full text-left p-4 rounded-2xl transition-all border-2 group ${
                    isActive 
                      ? 'bg-white border-cafe-vino-500 shadow-md ring-4 ring-cafe-vino-500/5' 
                      : 'bg-transparent border-transparent hover:bg-gray-100'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <span className="text-xl">{cert.icon}</span>
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${status.bg} ${status.color}`}>
                      {pct}%
                    </span>
                  </div>
                  <div className="mt-2">
                    <p className={`text-sm font-black ${isActive ? 'text-gray-900' : 'text-gray-600'}`}>{cert.label}</p>
                    <p className={`text-[10px] font-bold uppercase tracking-tighter ${status.color}`}>
                      {status.label}
                    </p>
                  </div>
                  {/* Mini Progress Bar */}
                  <div className="mt-3 w-full bg-gray-200 h-1 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-700 ${pct >= 80 ? 'bg-green-500' : pct >= 50 ? 'bg-amber-500' : 'bg-red-500'}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Checklist Content */}
      <div className="flex-1 overflow-y-auto p-8 bg-white">
        {CERTIFICATIONS.map(cert => (
          <div key={cert.id} className={activeTab === cert.id ? 'block animate-fade-in' : 'hidden'}>
            <div className="mb-8 border-b border-gray-100 pb-6">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">{cert.icon}</span>
                <h3 className="text-2xl font-black text-gray-900">{cert.label}</h3>
              </div>
              <p className="text-gray-500 text-sm">Verifica el cumplimiento de los estándares para {cert.label}.</p>
            </div>
            <CertificationChecklist 
              cert={cert} 
              answers={answers} 
              onToggle={onToggle} 
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CertificationTabs;
