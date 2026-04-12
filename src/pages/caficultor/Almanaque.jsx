import React, { useState, useMemo } from 'react';
import { PageHeader, Card } from '../../components';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const MOCK_LOTES = [
  { id: 1, nombre: 'Lote Principal (Caturra)' },
  { id: 2, nombre: 'Lote El Mirador (Castillo)' },
];

const sumarDias = (fechaIn, dias) => {
  const f = new Date(fechaIn);
  f.setDate(f.getDate() + dias);
  return f;
};

// Generar día y normalizar offset
const getLocalDate = (dInput) => {
  const d = new Date(dInput);
  d.setMinutes(d.getMinutes() + d.getTimezoneOffset());
  return d;
}

// Mocks avanzados incluyendo humedad, broca, roya y fertilización
const dHoy = new Date();
const mockEventosInit = [
  { 
    id: 1, idLote: 1, fecha: sumarDias(dHoy, -10).toISOString().split('T')[0], 
    fenologia_pct: 80, estado_fruto: 'Floración',
    lluvia_mm: 5, hum_suelo: 'Baja', 
    fert_tipo: 'Ninguno', apl_sanidad: 'Ninguna',
    roya: 'Bajo', broca: 'Bajo'
  },
  { 
    id: 2, idLote: 1, fecha: sumarDias(dHoy, -130).toISOString().split('T')[0], 
    fenologia_pct: 100, estado_fruto: 'Desarrollo',
    lluvia_mm: 40, hum_suelo: 'Alta', 
    fert_tipo: 'N-P-K', apl_sanidad: 'Ninguna',
    roya: 'Medio', broca: 'Medio'
  },
  { 
    id: 3, idLote: 1, fecha: sumarDias(dHoy, -165).toISOString().split('T')[0], 
    fenologia_pct: 90, estado_fruto: 'Llenado',
    lluvia_mm: 10, hum_suelo: 'Baja', 
    fert_tipo: 'Ninguno', apl_sanidad: 'Ninguna',
    roya: 'Bajo', broca: 'Alto'
  },
];

const C_Almanaque = () => {
  const [selectedLote, setSelectedLote] = useState(MOCK_LOTES[0].id);
  const [eventos, setEventos] = useState(mockEventosInit);
  const [activeTab, setActiveTab] = useState('calendario'); // 'calendario' | 'linea' | 'dashboard'
  const [showModal, setShowModal] = useState(false);
  
  // Calendario: Mes actual de vista
  const [calMonth, setCalMonth] = useState(new Date().getMonth());
  const [calYear, setCalYear] = useState(new Date().getFullYear());

  // Formulario nuevo evento
  const [form, setForm] = useState({
    fecha: new Date().toISOString().split('T')[0],
    fenologia_pct: 50,
    estado_fruto: 'Floración',
    lluvia_mm: 0,
    hum_suelo: 'Media',
    fert_tipo: 'Ninguno',
    apl_sanidad: 'Ninguna',
    roya: 'Bajo',
    broca: 'Bajo'
  });

  const evLote = useMemo(() => eventos.filter(e => e.idLote === selectedLote).sort((a,b) => new Date(b.fecha) - new Date(a.fecha)), [eventos, selectedLote]);

  const handleGuardar = (e) => {
    e.preventDefault();
    setEventos([{ id: Date.now(), idLote: selectedLote, ...form }, ...eventos]);
    setShowModal(false);
  };

  // =============================
  // MOTOR DE REGLAS (INTELIGENCIA)
  // =============================
  const procesarAlertasYRecomendaciones = () => {
    const alertas = [];
    evLote.forEach(ev => {
      const d = getLocalDate(ev.fecha);
      const diffDays = Math.floor((new Date() - d) / (1000 * 60 * 60 * 24));
      
      // Regla 1: Riesgo de Aborto Floral
      if (ev.estado_fruto === 'Floración' && ev.hum_suelo === 'Baja' && diffDays < 15) {
        alertas.push({
          tipo: 'peligro', event: ev,
          msj: 'Riesgo de aborto floral. Alta floración detectada con baja humedad del suelo. Evaluar riego de emergencia si aplica.'
        });
      }
      // Regla 2: Riesgo de Roya
      if (ev.hum_suelo === 'Alta' && (ev.roya === 'Medio' || ev.roya === 'Alto') && diffDays < 30) {
        alertas.push({
          tipo: 'alerta', event: ev,
          msj: 'Alta humedad con antecedentes de Roya. Se recomienda aplicación de fungicida preventivo.'
        });
      }
      // Regla 3: Falta de Fertilización en crecimiento
      if (diffDays >= 45 && diffDays <= 70 && ev.fert_tipo === 'Ninguno' && ev.estado_fruto !== 'Maduro') {
        alertas.push({
          tipo: 'alerta', event: ev,
          msj: 'Posible bajo llenado de grano. No se ha registrado fertilización tras 60 días del evento principal.'
        });
      }
      // Regla 4: Alerta Broca Severa
      if (ev.broca === 'Alto' && diffDays < 30) {
        alertas.push({
          tipo: 'peligro', event: ev,
          msj: 'Alta presencia de broca evidenciada. Requiere control inmediato químico/biológico y recolección asistida.'
        });
      }
      // Regla 5: Llenado de grano + Baja humedad
      if (ev.estado_fruto === 'Llenado' && ev.hum_suelo === 'Baja' && diffDays < 30) {
        alertas.push({
          tipo: 'info', event: ev,
          msj: 'Fruto en fase de llenado y suelo seco. Aplicar riego o mantener coberturas vivas para conservar humedad.'
        });
      }
    });
    return alertas;
  };

  const alertasLote = procesarAlertasYRecomendaciones();

  // =============================
  // LOGICA DEL CALENDARIO
  // =============================
  const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
  const firstDayIndex = new Date(calYear, calMonth, 1).getDay(); // 0 is Sunday
  
  const getEventForDay = (day) => {
    return evLote.find(ev => {
      const d = getLocalDate(ev.fecha);
      return d.getDate() === day && d.getMonth() === calMonth && d.getFullYear() === calYear;
    });
  };

  const mesAnterior = () => { if(calMonth===0){setCalMonth(11); setCalYear(calYear-1)}else{setCalMonth(calMonth-1)} };
  const mesSiguiente = () => { if(calMonth===11){setCalMonth(0); setCalYear(calYear+1)}else{setCalMonth(calMonth+1)} };
  const nombreMeses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  // =============================
  // RENDER DIVERSOS TABS
  // =============================
  const renderCalendario = () => (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="flex justify-between items-center p-4 border-b border-gray-100 bg-gray-50">
        <button onClick={mesAnterior} className="p-2 hover:bg-gray-200 rounded-full font-bold">&lt;</button>
        <h3 className="font-bold text-gray-800 tracking-wide">{nombreMeses[calMonth]} {calYear}</h3>
        <button onClick={mesSiguiente} className="p-2 hover:bg-gray-200 rounded-full font-bold">&gt;</button>
      </div>
      <div className="grid grid-cols-7 gap-px bg-gray-200">
         {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(d => (
            <div key={d} className="bg-gray-100 text-center py-2 text-xs font-bold text-gray-500 uppercase">{d}</div>
         ))}
         {Array.from({ length: firstDayIndex }).map((_, i) => (
            <div key={`empty-${i}`} className="bg-white min-h-[100px] opacity-20"></div>
         ))}
         {Array.from({ length: daysInMonth }).map((_, i) => {
            const currentDay = i + 1;
            const ev = getEventForDay(currentDay);
            const isToday = currentDay === new Date().getDate() && calMonth === new Date().getMonth() && calYear === new Date().getFullYear();
            
            let colorPunto = '';
            if (ev) {
              if (ev.estado_fruto === 'Floración') colorPunto = 'bg-pink-400';
              else if (ev.estado_fruto === 'Maduro' || ev.estado_fruto === 'Llenado') colorPunto = 'bg-red-500';
              else colorPunto = 'bg-green-500';
            }

            return (
              <div key={currentDay} className={`bg-white min-h-[100px] p-2 border-t border-transparent relative hover:bg-gray-50 transition-colors group ${isToday ? 'ring-2 ring-inset ring-cafe-vino-300 bg-cafe-vino-50/20' : ''}`}>
                 <span className={`text-sm font-semibold w-7 h-7 flex items-center justify-center rounded-full ${isToday ? 'bg-cafe-vino-600 text-white' : 'text-gray-700'}`}>{currentDay}</span>
                 {ev && (
                   <div title={ev.estado_fruto} className="mt-2 w-full">
                      <div className={`text-xs px-2 py-1 rounded shadow-sm text-white truncate cursor-help ${colorPunto}`}>
                        {ev.estado_fruto} ({ev.fenologia_pct}%)
                      </div>
                      {/* Hover Popover Native */}
                      <div className="hidden group-hover:block absolute top-10 left-1/2 -translate-x-1/2 z-50 w-48 bg-gray-900 text-white p-3 rounded-xl shadow-xl text-xs">
                        <p className="font-bold mb-1 border-b border-gray-700 pb-1">{ev.estado_fruto}</p>
                        <p>Humedad: {ev.hum_suelo}</p>
                        <p>Broca: {ev.broca}</p>
                      </div>
                   </div>
                 )}
              </div>
            )
         })}
      </div>
      <div className="p-4 bg-gray-50 flex items-center gap-4 text-xs text-gray-600 font-medium border-t border-gray-100">
        <span className="flex items-center gap-1"><span className="w-3 h-3 bg-pink-400 rounded-full inline-block"></span> Floración / Botón</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 bg-green-500 rounded-full inline-block"></span> Desarrollo / Cuajado</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 bg-red-500 rounded-full inline-block"></span> Maduro / Llenado</span>
      </div>
    </div>
  );

  const renderLineaEventos = () => (
    <div className="space-y-6">
      {/* Alertas Supremas */}
      {alertasLote.length > 0 && (
        <div className="mb-8 space-y-3">
          {alertasLote.map((al, idx) => (
            <div key={idx} className={`p-4 rounded-2xl flex gap-4 shadow-sm border ${al.tipo === 'peligro' ? 'bg-red-50 border-red-200 text-red-900' : al.tipo==='alerta' ? 'bg-amber-50 border-amber-200 text-amber-900' : 'bg-blue-50 border-blue-200 text-blue-900'}`}>
              <div className="shrink-0 mt-0.5">
                 {al.tipo==='peligro' ? '🚨' : al.tipo==='alerta' ? '⚠️' : '💡'}
              </div>
              <div className="text-sm font-medium">
                 {al.msj}
                 <p className="text-xs opacity-70 mt-1">Detectado sobre el evento del {getLocalDate(al.event.fecha).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {evLote.length === 0 ? (
        <Card className="p-10 text-center"><p className="text-gray-500">Aún no hay eventos registrados en este lote.</p></Card>
      ) : (
        evLote.map((ev) => {
          const d = getLocalDate(ev.fecha);
          const diffDays = Math.floor((new Date() - d) / (1000 * 60 * 60 * 24));
          const fD = d.toLocaleDateString('es-CO');
          const isFlor = ev.estado_fruto === 'Floración';
          const predictedCosechaStr = isFlor ? getLocalDate(sumarDias(ev.fecha, 224)).toLocaleDateString('es-CO') : null;

          return (
            <Card key={ev.id} className="overflow-hidden group hover:shadow-lg transition-shadow border border-gray-100">
               <div className="p-6">
                 <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                   {/* Izquierda (Hito general) */}
                   <div className="w-full md:w-1/3">
                      <div className="inline-block px-3 py-1 rounded bg-cafe-vino-50 text-cafe-vino-700 text-xs font-bold mb-2">Evento Fenológico</div>
                      <h4 className="text-xl font-bold text-gray-900">{ev.estado_fruto} <span className="text-sm font-medium text-gray-500">[{ev.fenologia_pct}%]</span></h4>
                      <p className="text-gray-500 text-sm mt-1">{fD} • Hace {diffDays} días</p>
                      
                      {predictedCosechaStr && (
                        <div className="mt-4 bg-green-50 p-3 rounded-lg border border-green-200">
                           <span className="text-xs text-green-700 font-bold uppercase block">Cosecha Estimada</span>
                           <span className="text-lg text-green-900 font-black">{predictedCosechaStr}</span>
                        </div>
                      )}
                   </div>
                   
                   {/* Derecha (Tags and state) */}
                   <div className="w-full md:w-2/3 grid grid-cols-2 lg:grid-cols-4 gap-4">
                      {/* Suelo/Clima */}
                      <div className="bg-blue-50/50 p-3 rounded-xl border border-blue-100">
                         <span className="block text-xs uppercase text-blue-600 font-bold mb-1">Clima Suelo</span>
                         <span className="text-sm font-bold text-gray-800">{ev.hum_suelo} / {ev.lluvia_mm}mm</span>
                      </div>
                      {/* Manejo */}
                      <div className="bg-amber-50/50 p-3 rounded-xl border border-amber-100">
                         <span className="block text-xs uppercase text-amber-600 font-bold mb-1">Fertilización</span>
                         <span className="text-sm font-bold text-gray-800">{ev.fert_tipo}</span>
                      </div>
                      {/* Sanidad Broca */}
                      <div className="bg-red-50/50 p-3 rounded-xl border border-red-100">
                         <span className="block text-xs uppercase text-red-600 font-bold mb-1">Broca</span>
                         <span className="text-sm font-bold text-gray-800">{ev.broca}</span>
                      </div>
                      {/* Sanidad Roya */}
                      <div className="bg-orange-50/50 p-3 rounded-xl border border-orange-100">
                         <span className="block text-xs uppercase text-orange-600 font-bold mb-1">Roya</span>
                         <span className="text-sm font-bold text-gray-800">{ev.roya}</span>
                      </div>
                   </div>
                 </div>

                 {/* Pequeño Timeline interno */}
                 {isFlor && (
                   <div className="mt-8 relative pt-2">
                     <div className="h-1.5 w-full bg-gray-100 rounded-full">
                       <div className="h-1.5 bg-cafe-vino-500 rounded-full" style={{ width: `${Math.min((diffDays/224)*100, 100)}%` }}></div>
                     </div>
                     <div className="flex justify-between text-[10px] text-gray-400 font-bold uppercase mt-2">
                       <span>Floración</span><span>Broca Crítica</span><span>Cosecha</span>
                     </div>
                   </div>
                 )}
               </div>
            </Card>
          )
        })
      )}
    </div>
  );

  const renderDashboard = () => {
    // Curva de producción estimada sumando floraciones
    const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    const distribucion = Array(12).fill(0);

    evLote.filter(e => e.estado_fruto === 'Floración' || e.estado_fruto === 'Cuajado').forEach(ev => {
      const dCosecha = sumarDias(ev.fecha, 224); // 8 meses
      const mo = getLocalDate(dCosecha).getMonth();
      // Sumamos valor ponderado por porcentaje de floración
      distribucion[mo] += (ev.fenologia_pct / 100);
    });

    const dataChart = {
      labels: meses,
      datasets: [
        {
          label: 'Probabilidad Volumen de Cosecha',
          data: distribucion,
          backgroundColor: 'rgba(34, 197, 94, 0.6)',
          borderColor: 'rgb(21, 128, 61)',
          borderWidth: 1,
          borderRadius: 8,
        }
      ]
    };

    return (
      <div className="space-y-6">
        <Card className="max-w-4xl pb-4">
           <h3 className="text-lg text-gray-800 font-bold ml-6 mt-6">Cosecha Distribuida (Ciclo 2026/2027)</h3>
           <div className="p-4 h-72 w-full">
              <Bar 
                data={dataChart} 
                options={{ 
                  maintainAspectRatio: false,
                  scales: { y: { beginAtZero: true, display: false }, x: { grid: {display: false} } },
                  plugins: { legend: {display: false} }
                }} 
              />
           </div>
        </Card>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
           <Card className="p-6 bg-cafe-vino-600 text-white border-0 shadow-lg shadow-cafe-vino-600/30">
              <h4 className="opacity-80 text-sm font-bold uppercase tracking-wider mb-2">Eventos Históricos</h4>
              <p className="text-5xl font-black">{evLote.length}</p>
           </Card>
           <Card className="p-6 bg-amber-500 text-white border-0 shadow-lg shadow-amber-500/30">
              <h4 className="opacity-80 text-sm font-bold uppercase tracking-wider mb-2">Alertas Activas</h4>
              <p className="text-5xl font-black">{alertasLote.length}</p>
           </Card>
           <Card className="p-6 bg-blue-600 text-white border-0 shadow-lg shadow-blue-600/30">
              <h4 className="opacity-80 text-sm font-bold uppercase tracking-wider mb-2">Sensor de Suelo</h4>
              <p className="text-2xl font-black">{evLote.length > 0 ? evLote[0].hum_suelo : 'N/A'}</p>
              <p className="text-xs opacity-80 mt-1">Último reporte</p>
           </Card>
        </div>
      </div>
    );
  }

  // =============================
  // MAIN RENDER
  // =============================
  return (
    <div className="space-y-6 pb-20">
      <PageHeader 
        title="Almanaque Experto por Lote" 
        subtitle="Digitaliza, sigue y predice el ciclo productivo usando reglas FNC avanzadas y sensores en tiempo real."
      />

      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-2 mb-8 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
        <div className="w-full md:w-auto">
          <select 
            className="w-full text-lg border-transparent font-bold text-cafe-vino-700 bg-cafe-vino-50 rounded-xl px-4 py-3 focus:ring-0 cursor-pointer appearance-none"
            value={selectedLote}
            onChange={(e) => setSelectedLote(Number(e.target.value))}
          >
            {MOCK_LOTES.map(l => (
              <option key={l.id} value={l.id}>📍 Explorando: {l.nombre}</option>
            ))}
          </select>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="w-full md:w-auto px-6 py-3 bg-gray-900 hover:bg-black text-white rounded-xl shadow-lg shadow-black/20 font-bold active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <span className="text-xl">+</span> Registrar Fenología
        </button>
      </div>

      {/* Tabs Menu */}
      <div className="flex overflow-x-auto border-b border-gray-200">
        <button onClick={()=>setActiveTab('calendario')} className={`px-6 py-3 font-bold border-b-2 whitespace-nowrap transition-colors ${activeTab==='calendario'?'border-cafe-vino-600 text-cafe-vino-700':'border-transparent text-gray-500 hover:text-gray-700'}`}>📅 Calendario Mensual</button>
        <button onClick={()=>setActiveTab('linea')} className={`px-6 py-3 font-bold border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors ${activeTab==='linea'?'border-cafe-vino-600 text-cafe-vino-700':'border-transparent text-gray-500 hover:text-gray-700'}`}>🛤️ Fenología y Alertas {alertasLote.length>0 && <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">{alertasLote.length}</span>}</button>
        <button onClick={()=>setActiveTab('dashboard')} className={`px-6 py-3 font-bold border-b-2 whitespace-nowrap transition-colors ${activeTab==='dashboard'?'border-cafe-vino-600 text-cafe-vino-700':'border-transparent text-gray-500 hover:text-gray-700'}`}>📊 Dashboard Cosecha</button>
      </div>

      {/* Renderizar Tab Activo */}
      <div className="pt-2 animate-fade-in">
         {activeTab === 'calendario' && renderCalendario()}
         {activeTab === 'linea' && renderLineaEventos()}
         {activeTab === 'dashboard' && renderDashboard()}
      </div>

      {/* MODAL DE REGISTRO FORMULARIO EXTENDIDO */}
      {showModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div className="flex items-center justify-center min-h-screen px-4 py-8">
            <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden z-10 animate-fade-in-up flex flex-col max-h-[90vh]">
              
              <div className="px-6 py-5 border-b border-gray-100 bg-gray-50 flex justify-between items-center sticky top-0 z-20">
                <h3 className="text-xl font-bold text-gray-900">Bitácora de Lote</h3>
                <button onClick={() => setShowModal(false)} className="bg-white rounded-full p-2 text-gray-400 hover:text-gray-900 shadow-sm border border-gray-200">X</button>
              </div>

              <div className="p-6 overflow-y-auto flex-1 bg-white">
                <form id="bitacora-form" onSubmit={handleGuardar} className="space-y-8">
                  
                  {/* Seccion 1: Basico & Fenologia */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-cafe-vino-600 mb-2">1. Fenología</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de inspección</label>
                        <input required type="date" className="w-full border-gray-300 rounded-xl" value={form.fecha} onChange={e=>setForm({...form, fecha: e.target.value})} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Estado Predominante</label>
                        <select className="w-full border-gray-300 rounded-xl bg-gray-50" value={form.estado_fruto} onChange={e=>setForm({...form, estado_fruto: e.target.value})}>
                          <option>Botón floral</option><option>Floración</option><option>Cuajado</option><option>Desarrollo</option><option>Llenado</option><option>Maduro</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="flex justify-between text-sm font-medium text-gray-700 mb-1">
                        <span>% Predominancia en lote</span>
                        <span className="text-cafe-vino-600 font-bold">{form.fenologia_pct}%</span>
                      </label>
                      <input type="range" min="0" max="100" className="w-full accent-cafe-vino-600" value={form.fenologia_pct} onChange={e=>setForm({...form, fenologia_pct: e.target.value})} />
                    </div>
                  </div>

                  {/* Seccion 2: Clima */}
                  <div className="space-y-4 pt-6 border-t border-gray-100">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-2 flex items-center justify-between">
                       <span>2. Entorno Climático</span>
                       <span className="text-[10px] bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full normal-case">📡 Sensor IoT Vinculado</span>
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Humedad de suelo relativa</label>
                        <div className="flex rounded-xl overflow-hidden border border-gray-200">
                           {['Baja','Media','Alta'].map(v => (
                              <button type="button" key={v} onClick={()=>setForm({...form, hum_suelo: v})} className={`flex-1 py-2 text-sm font-bold border-r last:border-0 ${form.hum_suelo === v ? 'bg-blue-500 text-white' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}>{v}</button>
                           ))}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Lluvia reciente aprox (mm)</label>
                        <input type="number" min="0" className="w-full border-gray-300 rounded-xl" value={form.lluvia_mm} onChange={e=>setForm({...form, lluvia_mm: e.target.value})} />
                      </div>
                    </div>
                  </div>

                  {/* Seccion 3: Sanidad y Manejo */}
                  <div className="space-y-4 pt-6 border-t border-gray-100">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-red-600 mb-2">3. Sanidad Fitosanitaria</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Roya (Incidencia)</label>
                        <select className="w-full border-gray-300 rounded-xl bg-gray-50" value={form.roya} onChange={e=>setForm({...form, roya: e.target.value})}>
                          <option>Bajo</option><option>Medio</option><option>Alto</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Broca (Incidencia)</label>
                        <select className="w-full border-gray-300 rounded-xl bg-gray-50" value={form.broca} onChange={e=>setForm({...form, broca: e.target.value})}>
                          <option>Bajo</option><option>Medio</option><option>Alto</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Seccion 4: Manejo Agronomico */}
                  <div className="space-y-4 pt-6 border-t border-gray-100">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-green-600 mb-2">4. Manejo Aplicado HOY</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Fertilización</label>
                        <select className="w-full border-gray-300 rounded-xl bg-gray-50" value={form.fert_tipo} onChange={e=>setForm({...form, fert_tipo: e.target.value})}>
                          <option>Ninguno</option><option>N-P-K</option><option>Urea / Nitrógeno</option><option>Abono Orgánico</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Fungicidas / Insecticidas</label>
                        <select className="w-full border-gray-300 rounded-xl bg-gray-50" value={form.apl_sanidad} onChange={e=>setForm({...form, apl_sanidad: e.target.value})}>
                          <option>Ninguna</option><option>Preventivo (Roya)</option><option>Curativo (Roya/Broca)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  
                </form>
              </div>

              <div className="p-6 border-t border-gray-100 bg-gray-50 sticky bottom-0 z-20">
                 <button type="submit" form="bitacora-form" className="w-full py-4 rounded-xl font-bold text-white bg-cafe-vino-600 hover:bg-cafe-vino-700 shadow-xl shadow-cafe-vino-600/30 active:scale-[0.98] transition-all">
                   Guardar Bitácora y Evaluar Reglas
                 </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default C_Almanaque;
