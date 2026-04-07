import React from 'react';
import { PageHeader, Card } from '../../components';

const SAAnalitica = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Analítica Global de Producción"
        subtitle="Métricas de impacto del modelo: Empresas ↔ Extensionistas ↔ Caficultores"
      />

      {/* KPIs Globales (Top) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-cafe-vino-700 to-cafe-vino-900 text-white border-0">
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="text-cafe-vino-200 text-sm font-medium">Hectáreas Monitoreadas</p>
              <h3 className="text-3xl font-bold mt-1">45,280</h3>
            </div>
            <div className="bg-white/20 p-2 rounded-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
          </div>
          <div className="text-xs text-emerald-300 font-medium flex items-center mt-4">
            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
            +12.5% este semestre
          </div>
        </Card>
        
        <Card>
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="text-gray-500 text-sm font-medium">Productores Beneficiados</p>
              <h3 className="text-3xl font-bold text-gray-900 mt-1">12,450</h3>
            </div>
            <div className="bg-green-100 p-2 rounded-lg">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-4"><span className="text-green-600 font-medium">+840 nuevos</span> productores registrados</p>
        </Card>

        <Card>
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="text-gray-500 text-sm font-medium">Asistencias Técnicas / Mes</p>
              <h3 className="text-3xl font-bold text-gray-900 mt-1">3,890</h3>
            </div>
            <div className="bg-blue-100 p-2 rounded-lg">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-4">Resueltas por <span className="text-blue-600 font-medium font-bold">420 Extensionistas</span></p>
        </Card>

        <Card>
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="text-gray-500 text-sm font-medium">Empresas Operando</p>
              <h3 className="text-3xl font-bold text-gray-900 mt-1">85</h3>
            </div>
            <div className="bg-purple-100 p-2 rounded-lg">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-4">Red nacional de acopiadoras y cooperativas</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico Productividad */}
        <Card className="col-span-1 lg:col-span-2 shadow-sm border border-gray-100">
          <div className="mb-4 flex flex-col sm:flex-row justify-between sm:items-center">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Evolución de Rendimiento por Cultivo Integrado (Kilos / Hectárea)</h3>
              <p className="text-sm text-gray-500">Demuestra el valor que aporta el software conectando al caficultor, el extensionista y los sensores IoT.</p>
            </div>
            <div className="flex items-center space-x-4 text-sm mt-3 sm:mt-0">
              <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-emerald-500 mr-2"></span> Usuarios Plataforma</div>
              <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-gray-300 mr-2"></span> Promedio Nacional (No Usuarios)</div>
            </div>
          </div>
          
          <div className="mt-8 flex items-end h-64 space-x-2 md:space-x-8">
            {/* Eje Y */}
            <div className="flex flex-col justify-between h-full text-xs text-gray-500 pr-2 pb-6 border-r border-gray-100">
              <span>+3000k</span>
              <span>2000k</span>
              <span>1000k</span>
              <span>0k</span>
            </div>
            
            {/* Barras CSS */}
            {[
              { month: 'Ene', usr: '50%', avg: '40%' },
              { month: 'Feb', usr: '55%', avg: '42%' },
              { month: 'Mar', usr: '65%', avg: '45%' },
              { month: 'Abr', usr: '68%', avg: '45%' },
              { month: 'May', usr: '82%', avg: '50%' },
              { month: 'Jun', usr: '95%', avg: '52%' },
              { month: 'Jul', usr: '90%', avg: '48%' },
              { month: 'Ago', usr: '88%', avg: '45%' },
            ].map((d, i) => (
              <div key={i} className="flex-1 flex flex-col justify-end items-center group relative h-full pb-6">
                
                {/* Tooltip Hover (Opcional, usando Tailwind flex de hover) */}
                <div className="absolute top-0 opacity-0 group-hover:opacity-100 bg-white shadow-lg rounded px-2 py-1 text-xs -translate-y-8 pointer-events-none transition-opacity z-10 border border-gray-200">
                  <span className="font-bold text-emerald-600 block">BUXTAR: {parseInt(d.usr)*30}kg</span>
                  <span className="text-gray-500">Nacional: {parseInt(d.avg)*30}kg</span>
                </div>

                <div className="w-full flex justify-center space-x-1 sm:space-x-2 items-end h-[calc(100%-24px)]">
                  {/* Barra Promedio Nacional (No usuarios) */}
                  <div className="w-full max-w-[16px] xl:max-w-[24px] bg-gray-200 rounded-t-sm" style={{ height: d.avg }}></div>
                  {/* Barra Usuarios de la base */}
                  <div className="w-full max-w-[16px] xl:max-w-[24px] bg-emerald-500 rounded-t-sm" style={{ height: d.usr }}></div>
                </div>
                {/* Eje X Label */}
                <span className="text-xs text-gray-500 mt-3 absolute bottom-0">{d.month}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Panel Alertas Sanitarias (Prevención lograda) */}
        <Card>
          <h3 className="text-lg font-bold text-gray-900 mb-1">Impacto de la Asistencia Técnica (Plagas MITIGADAS)</h3>
          <p className="text-sm text-gray-500 mb-6">Gracias al flujo de comunicación Extensionista ↔ Caficultor</p>
          
          <div className="space-y-5">
            {[
              { label: 'Broca del Café', detectado: 450, mitigado: 412, pct: '92%' },
              { label: 'Roya (Hemileia vastatrix)', detectado: 620, mitigado: 500, pct: '80%' },
              { label: 'Minador de la hoja (Leucoptera)', detectado: 210, mitigado: 200, pct: '95%' },
              { label: 'Arañita Roja', detectado: 125, mitigado: 105, pct: '84%' },
            ].map((p, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-gray-700">{p.label}</span>
                  <span className="font-bold text-emerald-600">{p.pct} Mitigadas con Éxito</span>
                </div>
                <div className="w-full bg-red-100 rounded-full h-2.5 flex overflow-hidden">
                   {/* La parte mitigada en verde oscuro, lo que faltó mitigar sigue en rojo oscuro */}
                  <div className="bg-emerald-500 h-2.5" style={{ width: p.pct }}></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>{p.detectado} Brotes Fincas</span>
                  <span>{p.mitigado} Resueltos por Extensionistas</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Distribución Roles y Hardware */}
        <Card>
           <h3 className="text-lg font-bold text-gray-900 mb-1">Cobertura de Hardware IoT y Suscripciones</h3>
           <p className="text-sm text-gray-500 mb-6">Estado actual del ecosistema</p>

           <div className="grid grid-cols-2 gap-4 h-full">
              {/* Doughnut de Estaciones simulado con CSS Conic Gradient */}
              <div className="flex flex-col items-center justify-center pt-2">
                <div className="relative w-32 h-32 rounded-full flex items-center justify-center overflow-hidden bg-gray-200"
                     style={{ background: 'conic-gradient(#10b981 0% 85%, #f43f5e 85% 100%)' }}>
                   {/* Hole for doughnut */}
                   <div className="w-24 h-24 bg-white rounded-full flex flex-col items-center justify-center">
                     <span className="text-xl font-bold text-gray-900">1,240</span>
                     <span className="text-[10px] uppercase font-bold text-gray-500">Estaciones</span>
                   </div>
                </div>
                <div className="mt-4 flex space-x-3 text-xs">
                  <div className="flex items-center"><span className="w-2 h-2 bg-emerald-500 rounded-full mr-1"></span> 85% Activas</div>
                  <div className="flex items-center"><span className="w-2 h-2 bg-rose-500 rounded-full mr-1"></span> 15% Offline</div>
                </div>
              </div>

               {/* Stats Lista Suscripciones */}
              <div className="flex flex-col justify-center space-y-4">
                 <div className="bg-amber-50 p-3 rounded-lg border border-amber-100">
                    <p className="text-xs text-amber-700 font-bold uppercase mb-1">Cuentas Premium</p>
                    <p className="text-2xl font-black text-amber-800">4,520</p>
                    <p className="text-[10px] text-amber-600 mt-1">Con licencia activa Buxtar</p>
                 </div>
                 
                 <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                    <p className="text-xs text-blue-700 font-bold uppercase mb-1">Mensajes Inter.-App</p>
                    <p className="text-2xl font-black text-blue-800">158k</p>
                    <p className="text-[10px] text-blue-600 mt-1">Chat Agrónomo ↔ Finca (Mes)</p>
                 </div>
              </div>
           </div>
        </Card>
      </div>

    </div>
  );
};

export default SAAnalitica;
