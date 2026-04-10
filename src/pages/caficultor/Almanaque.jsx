import React, { useState } from 'react';
import { PageHeader, Card } from '../../components';

const LOTES_DEMO = [
  { id: 1, nombre: 'Lote Principal' },
  { id: 2, nombre: 'Lote El Mirador' },
  { id: 3, nombre: 'Lote A1' }
];

const sumarDias = (fechaIn, dias) => {
  const f = new Date(fechaIn);
  f.setDate(f.getDate() + dias);
  return f;
};

// Generar mocks más ricos basados en hoy
const dHoy = new Date();
const mockFloracionesInit = [
  { id: 1, idLote: 1, fecha: sumarDias(dHoy, -45).toISOString().split('T')[0], intensidad: 'Alta', tipo: 'Principal' },
  { id: 2, idLote: 1, fecha: sumarDias(dHoy, -118).toISOString().split('T')[0], intensidad: 'Media', tipo: 'Traviesa' },
  { id: 3, idLote: 2, fecha: sumarDias(dHoy, -165).toISOString().split('T')[0], intensidad: 'Baja', tipo: 'Granizada' },
  { id: 4, idLote: 1, fecha: sumarDias(dHoy, -210).toISOString().split('T')[0], intensidad: 'Alta', tipo: 'Principal (Ciclo Anterior)' },
];

const FASES_FNC = [
  { dia: 0, name: 'Floración', hint: 'Cuaje inicial.' },
  { dia: 60, name: 'Crecimiento - Época de Abonar', hint: 'Demanda de Nitrógeno y Potasio alta.' },
  { dia: 120, name: 'Consolidación - Alerta Broca', hint: 'Pico de susceptibilidad.' },
  { dia: 160, name: 'Llenado del Grano', hint: 'Fase de acumulación de mucílago.' },
  { dia: 224, name: 'Cosecha', hint: 'Semana 32 - Grano pintón/maduro.' }
];

const C_Almanaque = () => {
  const [selectedLote, setSelectedLote] = useState(LOTES_DEMO[0].id);
  const [floraciones, setFloraciones] = useState(mockFloracionesInit);
  const [showModal, setShowModal] = useState(false);
  
  const [nuevoReg, setNuevoReg] = useState({
    fecha: new Date().toISOString().split('T')[0],
    intensidad: 'Alta',
    tipo: 'Principal'
  });

  const floracionesLoteActual = floraciones
    .filter(f => f.idLote === selectedLote)
    .sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

  const handleGuardarFloracion = (e) => {
    e.preventDefault();
    setFloraciones([{ id: Date.now(), idLote: selectedLote, ...nuevoReg }, ...floraciones]);
    setShowModal(false);
  };

  // Función lógica avanzada Almanaque FNC
  const evaluarFase = (diffDays) => {
    let fase = FASES_FNC[0];
    let nextFase = FASES_FNC[1];
    for (let i = 0; i < FASES_FNC.length; i++) {
       if (diffDays >= FASES_FNC[i].dia) {
          fase = FASES_FNC[i];
          nextFase = FASES_FNC[i+1] || null;
       }
    }

    let recomendacion = '';
    let colorAlert = 'text-gray-600 bg-gray-100 border-gray-200';
    
    if (diffDays >= 45 && diffDays <= 75) {
      recomendacion = '💡 Recomendación: Es el momento óptimo para aplicar fertilizante edáfico (si las lluvias lo permiten). El fruto demanda N-P-K para formación.';
      colorAlert = 'text-blue-700 bg-blue-50 border-blue-200';
    } else if (diffDays >= 105 && diffDays <= 135) {
      recomendacion = '🚨 ¡ALERTA Fitosanitaria! El fruto tiene >20% de materia seca. La Broca intentará perforar el ombligo. Haga muestreo de 30 árboles y evalúe control químico/biológico.';
      colorAlert = 'text-red-700 bg-red-50 border-red-200';
    } else if (diffDays >= 150 && diffDays <= 190) {
      recomendacion = '🧪 Llenado de grano: Garantice buen control de malezas para evitar competencia por reservas hídricas.';
      colorAlert = 'text-amber-700 bg-amber-50 border-amber-200';
    } else if (diffDays >= 210) {
      recomendacion = '🧺 Preparación de cosecha: Contrate recolectores, limpie despulpadoras y aliste marquesinas. El lote está a punto de maduración masiva.';
      colorAlert = 'text-green-700 bg-green-50 border-green-200';
    } else {
      recomendacion = '🌱 Crecimiento normal. Siga monitoreando el estado general de las hojas (riesgo de Roya).';
      colorAlert = 'text-gray-700 bg-gray-50 border-gray-200';
    }

    return { fase, nextFase, recomendacion, colorAlert };
  };

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    d.setMinutes(d.getMinutes() + d.getTimezoneOffset());
    return d.toLocaleDateString('es-CO', { year: 'numeric', month: 'short', day: 'numeric' });
  };
  
  // Proyección global de picos de cosecha
  const estimarCurvaCosecha = () => {
    const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    const proyeccion = Array(12).fill(0);
    
    floracionesLoteActual.forEach(f => {
       const d = new Date(f.fecha);
       d.setMinutes(d.getMinutes() + d.getTimezoneOffset());
       const dCosecha = sumarDias(d, 224); // 8 meses aprox
       const peso = f.intensidad === 'Alta' ? 3 : f.intensidad === 'Media' ? 2 : 1;
       proyeccion[dCosecha.getMonth()] += peso;
    });
    
    return proyeccion.map((val, idx) => ({ mes: meses[idx], valor: val }));
  };

  const proyeccionMensual = estimarCurvaCosecha();
  const maxProyeccion = Math.max(...proyeccionMensual.map(m => m.valor), 1);

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Almanaque Cafetero del Lote" 
        subtitle="Analiza la fenología de tus cafetales: desde fertilización y broca hasta la recolección, usando estándares de la FNC."
      />

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex w-full md:w-auto items-center gap-3">
          <label className="font-bold text-gray-700 whitespace-nowrap">Analizar Lote:</label>
          <select 
            className="w-full border-2 border-cafe-vino-100 rounded-xl px-4 py-2.5 bg-gray-50 text-gray-900 font-medium focus:ring-cafe-vino-500 min-w-[200px]"
            value={selectedLote}
            onChange={(e) => setSelectedLote(Number(e.target.value))}
          >
            {LOTES_DEMO.map(l => (
              <option key={l.id} value={l.id}>{l.nombre}</option>
            ))}
          </select>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="w-full md:w-auto px-6 py-3 bg-cafe-vino-600 hover:bg-cafe-vino-700 text-white rounded-xl shadow-md transition-all active:scale-95 font-semibold flex items-center justify-center gap-2"
        >
          <span className="text-xl leading-none">+</span> Registrar Floración
        </button>
      </div>

      {/* DASHBOARD PREDICTIVO DE COSECHA ESTE AÑO */}
      {floracionesLoteActual.length > 0 && (
         <Card className="p-6 border-b-4 border-b-green-500">
           <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
             <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>
             Picos de Recolección Proyectados (Próximos 12 meses)
           </h3>
           <p className="text-sm text-gray-500 mb-6">Basado en las floraciones de este lote sumando 32 semanas de maduración.</p>
           
           <div className="flex items-end justify-between h-32 gap-1 px-2 border-b border-gray-200 pb-2">
              {proyeccionMensual.map((m, i) => {
                 const isPico = m.valor > 0 && m.valor === maxProyeccion;
                 return (
                   <div key={i} className="flex flex-col items-center flex-1 group">
                     {m.valor > 0 && (
                       <span className={`text-[10px] font-bold mb-1 opacity-0 group-hover:opacity-100 transition-opacity ${isPico ? 'text-green-600' : 'text-gray-400'}`}>Pico</span>
                     )}
                     <div 
                       className={`w-full max-w-[32px] rounded-t-sm transition-all duration-500 ${isPico ? 'bg-gradient-to-t from-green-400 to-green-500 shadow-md' : m.valor > 0 ? 'bg-green-100' : 'bg-transparent'}`}
                       style={{ height: `${(m.valor / maxProyeccion) * 100}%`, minHeight: m.valor > 0 ? '10%' : '0' }}
                     ></div>
                   </div>
                 )
              })}
           </div>
           <div className="flex items-center justify-between px-2 pt-2">
             {proyeccionMensual.map((m, i) => (
                <span key={i} className={`text-xs font-medium flex-1 text-center ${m.valor === maxProyeccion ? 'text-gray-900 font-bold' : 'text-gray-400'}`}>{m.mes}</span>
             ))}
           </div>
         </Card>
      )}

      {/* LISTA DE FLORACIONES E HITOS AGRONÓMICOS */}
      <h3 className="text-xl font-extrabold text-gray-900 px-2 mt-8 mb-4">Eventos Fenológicos Activos</h3>
      
      <div className="space-y-6">
        {floracionesLoteActual.length === 0 ? (
           <Card className="py-16 text-center text-gray-500 border-dashed border-2">
              <span className="text-5xl opacity-50 mb-4 block">🍂</span>
              <p>Agrega la primera floración para evaluar agronómicamente el lote.</p>
           </Card>
        ) : (
          floracionesLoteActual.map((flor) => {
             const d = new Date(flor.fecha);
             d.setMinutes(d.getMinutes() + d.getTimezoneOffset());
             const diffTime = dHoy - d;
             const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
             
             let clampProg = (diffDays / 224) * 100;
             if (clampProg > 100) clampProg = 100;
             if (clampProg < 0) clampProg = 0;

             const evaluacion = evaluarFase(diffDays);

             return (
                <Card key={flor.id} className={`overflow-hidden border border-gray-100 shadow-sm ${evaluacion.fase.name.includes('Cosecha') ? 'opacity-70' : ''}`}>
                  <div className="p-6">
                    <div className="flex flex-col lg:flex-row gap-6">
                       
                       {/* Left Col: Info Floración */}
                       <div className="lg:w-1/3 border-r border-gray-100 pr-4">
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-3 ${flor.intensidad==='Alta'?'bg-fuchsia-100 text-fuchsia-700':flor.intensidad==='Media'?'bg-pink-100 text-pink-700':'bg-gray-100 text-gray-700'}`}>
                             Intensidad {flor.intensidad}
                          </span>
                          <h4 className="text-xl font-bold text-gray-900 mb-1">{flor.tipo}</h4>
                          <p className="text-sm text-gray-500 mb-6">Empezó: <strong className="text-gray-800">{formatDate(flor.fecha)}</strong></p>
                          
                          <div className="bg-gray-50 rounded-lg p-3 text-center border border-gray-200 shadow-inner">
                             <span className="block text-3xl font-black text-cafe-vino-700">{diffDays > 0 ? diffDays : 0}</span>
                             <span className="uppercase text-[10px] font-bold text-gray-500 tracking-wider">Días Transcurridos</span>
                          </div>
                          
                          {diffDays < 224 && (
                             <p className="text-xs text-center text-gray-400 mt-2 font-medium">
                                Faltan <span className="text-gray-700">{224 - diffDays} días</span> aprox. para recolección.
                             </p>
                          )}
                       </div>

                       {/* Right Col: Timeline FNC + Recomendaciones */}
                       <div className="lg:w-2/3">
                          <h5 className="text-sm font-bold text-gray-800 mb-2 uppercase tracking-wide">Fase Actual: <span className="text-cafe-vino-600">{evaluacion.fase.name}</span></h5>
                          <p className="text-sm text-gray-500 mb-6">{evaluacion.fase.hint}</p>
                          
                          {/* Stepper Fenológico Cenicafé */}
                          <div className="relative mb-10 mt-6 px-2">
                             <div className="absolute top-2 left-0 right-0 h-1.5 bg-gray-100 rounded-full"></div>
                             <div className="absolute top-2 left-0 h-1.5 bg-cafe-vino-400 rounded-full transition-all" style={{ width: `${clampProg}%` }}></div>
                             
                             <div className="relative flex justify-between">
                                {FASES_FNC.map((f, idx) => {
                                   let isPast = diffDays >= f.dia;
                                   let isCurrent = evaluacion.fase.dia === f.dia;
                                   return (
                                      <div key={idx} className="flex flex-col items-center">
                                         <div className={`w-5 h-5 rounded-full z-10 border-4 shadow-sm transition-all flex items-center justify-center ${isCurrent ? 'bg-white border-cafe-vino-600 scale-125' : isPast ? 'bg-cafe-vino-500 border-cafe-vino-500' : 'bg-white border-gray-300'}`}>
                                            {isPast && !isCurrent && <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>}
                                         </div>
                                         <span className={`text-[10px] mt-2 font-bold whitespace-nowrap hidden sm:block ${isCurrent ? 'text-cafe-vino-700' : isPast ? 'text-gray-700' : 'text-gray-400'}`}>{f.name}</span>
                                         <span className={`text-[9px] ${isCurrent ? 'text-cafe-vino-500' : 'text-gray-400'}`}>Día {f.dia}</span>
                                      </div>
                                   )
                                })}
                             </div>
                          </div>

                          {/* Actionable Smart Card */}
                          <div className={`mt-4 p-4 rounded-xl border ${evaluacion.colorAlert}`}>
                             <div className="flex gap-3 items-start">
                                <svg className="w-6 h-6 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                <div>
                                   <p className="text-sm font-medium leading-relaxed">{evaluacion.recomendacion}</p>
                                </div>
                             </div>
                          </div>
                          
                       </div>
                    </div>
                  </div>
                </Card>
             );
          })
        )}
      </div>

      {/* Modal Registrar */}
      {showModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div className="flex items-center justify-center min-h-screen px-4 py-8">
            <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 z-10 animate-fade-in-up border border-gray-100">
              <div className="w-12 h-12 bg-pink-100 text-pink-600 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              </div>
              <h3 className="text-2xl font-black mb-1 text-gray-900 tracking-tight">Nueva Floración</h3>
              <p className="text-sm text-gray-500 mb-8 border-b border-gray-100 pb-4">Registra lluvias de reactivación en: <strong className="text-gray-800">{LOTES_DEMO.find(l => l.id === selectedLote)?.nombre}</strong></p>
              
              <form onSubmit={handleGuardarFloracion} className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">¿Cuándo ocurrió?</label>
                  <input 
                    type="date" 
                    required
                    max={new Date().toISOString().split('T')[0]}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-cafe-vino-500 focus:border-cafe-vino-500 transition-colors shadow-sm"
                    value={nuevoReg.fecha}
                    onChange={e => setNuevoReg({...nuevoReg, fecha: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Clase de Floración</label>
                  <select 
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-cafe-vino-500 shadow-sm transition-colors"
                    value={nuevoReg.tipo}
                    onChange={e => setNuevoReg({...nuevoReg, tipo: e.target.value})}
                  >
                    <option value="Principal">Principal (Más del 60% del Lote)</option>
                    <option value="Traviesa">Traviesa (Mitad de año / Mitadera)</option>
                    <option value="Esporádica">Esporádica / Escaseo</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Intensidad Visual (Color)</label>
                  <div className="grid grid-cols-3 gap-3">
                     {['Alta', 'Media', 'Baja'].map(intens => (
                       <button
                         key={intens}
                         type="button"
                         onClick={() => setNuevoReg({...nuevoReg, intensidad: intens})}
                         className={`py-2.5 rounded-xl text-sm font-bold border-2 transition-all shadow-sm ${nuevoReg.intensidad === intens ? 'bg-pink-50 border-pink-500 text-pink-700 scale-105' : 'bg-white border-gray-200 text-gray-500 hover:border-pink-300 hover:bg-pink-50/50'}`}
                       >
                         {intens}
                       </button>
                     ))}
                  </div>
                </div>
                <div className="pt-6 mt-6 flex gap-3 border-t border-gray-100">
                   <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-3 rounded-xl font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 active:scale-95 transition-all">Cancelar</button>
                   <button type="submit" className="flex-1 py-3 rounded-xl font-bold text-white bg-cafe-vino-600 hover:bg-cafe-vino-700 shadow-lg active:scale-95 transition-all">Guardar Suceso</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default C_Almanaque;
