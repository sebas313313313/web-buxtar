import React from 'react';
import { PageHeader, Card } from '../../components';

const C_Comunicaciones = () => {
  const notificaciones = [
    { 
      id: 1, 
      remitente: 'Empresa Cafetera S.A.S', 
      tipo: 'Empresa',
      mensaje: 'Nueva política de precios de sustentación para el mes de Abril.',
      fecha: 'Hace 2 horas',
      leida: false
    },
    { 
      id: 2, 
      remitente: 'Ing. Roberto Gómez', 
      tipo: 'Extensionista',
      mensaje: 'He asignado nuevo material educativo sobre control de roya.',
      fecha: 'Ayer',
      leida: true
    },
    { 
      id: 3, 
      remitente: 'Empresa Cafetera S.A.S', 
      tipo: 'Empresa',
      mensaje: 'Invitación a la feria regional del café en Pitalito.',
      fecha: 'Hace 3 días',
      leida: true
    }
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Comunicaciones" 
        subtitle="Notificaciones, circulares y mensajes oficiales" 
      />

      <div className="max-w-4xl mx-auto space-y-4">
        {notificaciones.map((n) => (
          <Card key={n.id} className={`p-6 shadow-sm border transition-all hover:shadow-md ${n.leida ? 'bg-white border-gray-100' : 'bg-cafe-vino-50/30 border-cafe-vino-100 ring-1 ring-cafe-vino-100'}`}>
            <div className="flex justify-between items-start">
              <div className="flex items-start space-x-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${n.tipo === 'Empresa' ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-100 text-blue-600'}`}>
                  {n.tipo === 'Empresa' ? (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
                  ) : (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                  )}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="font-bold text-gray-900">{n.remitente}</h4>
                    {!n.leida && <span className="w-2 h-2 bg-cafe-vino-600 rounded-full"></span>}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{n.mensaje}</p>
                  <p className="text-[11px] text-gray-400 font-bold uppercase mt-2 tracking-wider">{n.fecha}</p>
                </div>
              </div>
              <button className="text-gray-400 hover:text-cafe-vino-600 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default C_Comunicaciones;
