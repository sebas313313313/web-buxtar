import React, { useState } from 'react';
import Modal from './Modal';
import Button from './Button';
import Input from './Input';

const PLAGUES = [
  { id: 'broca', name: 'Broca del Café' },
  { id: 'roya', name: 'Roya del Cafeto' },
  { id: 'mancha_hierro', name: 'Mancha de Hierro' },
  { id: 'minador', name: 'Minador de la Hoja' },
  { id: 'clima', name: 'Evento Climático' },
  { id: 'otro', name: 'Otro / Desconocido' },
];

const SEVERITIES = [
  { id: 'bajo', name: 'Bajo', color: 'text-green-600 bg-green-50' },
  { id: 'medio', name: 'Medio', color: 'text-amber-600 bg-amber-50' },
  { id: 'alto', name: 'Alto', color: 'text-red-600 bg-red-50' },
  { id: 'critico', name: 'Crítico', color: 'text-red-700 bg-red-100 border-red-200' },
];

const ReportAlertModal = ({ isOpen, onClose, onReport }) => {
  const [formData, setFormData] = useState({
    plagueId: '',
    severityId: 'bajo',
    description: '',
    location: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const plagueBody = PLAGUES.find(p => p.id === formData.plagueId);
    const severityBody = SEVERITIES.find(s => s.id === formData.severityId);
    
    onReport({
      ...formData,
      plagueName: plagueBody?.name || 'Alerta General',
      severityName: severityBody?.name || 'Bajo',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
    
    // Reset form
    setFormData({
      plagueId: '',
      severityId: 'bajo',
      description: '',
      location: '',
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Reportar Alerta Sanitaria / Técnica"
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="bg-red-50 border border-red-100 p-4 rounded-xl flex items-start gap-3">
          <div className="p-2 bg-red-100 text-red-600 rounded-lg">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-bold text-red-900">Atención</p>
            <p className="text-xs text-red-700">Este reporte será visible para todos los extensionistas de la zona seleccionada.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Tipo de Incidencia</label>
            <select
              required
              value={formData.plagueId}
              onChange={(e) => setFormData({ ...formData, plagueId: e.target.value })}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cafe-vino-500 outline-none transition-all text-sm"
            >
              <option value="">Seleccione tipo...</option>
              {PLAGUES.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Severidad</label>
            <div className="flex gap-2">
              {SEVERITIES.map(s => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setFormData({ ...formData, severityId: s.id })}
                  className={`flex-1 py-2 text-[10px] font-bold rounded-lg border transition-all ${
                    formData.severityId === s.id 
                    ? 'border-cafe-vino-500 ring-2 ring-cafe-vino-500/20 bg-cafe-vino-50 text-cafe-vino-700' 
                    : 'border-gray-100 bg-white text-gray-400 hover:border-gray-200'
                  }`}
                >
                  {s.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <Input
          label="Ubicación Específica (Vereda/Lote)"
          placeholder="Ej: Vereda El Silencio, Lote 4"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          required
        />

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Descripción del Hallazgo</label>
          <textarea
            required
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Describa brevemente lo observado..."
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cafe-vino-500 outline-none transition-all text-sm resize-none"
          />
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
          <Button variant="secondary" onClick={onClose} type="button">
            Cancelar
          </Button>
          <Button type="submit" className="bg-red-600 hover:bg-red-700 shadow-lg shadow-red-100">
            Enviar Reporte al Equipo
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ReportAlertModal;
