import React, { useState, useEffect, useRef } from 'react';
import {
  Card,
  Button,
  Input,
  SearchBar,
  EmptyState,
  ReportAlertModal
} from '../../components';
import { useAuthHook } from '../../hooks/useAuth';

const EMPRESAS_MOCK = [
  { id: 1, nombre: 'Empresa Cafetalera del Norte' },
  { id: 2, nombre: 'Cooperativa de Cafés Especiales' },
  { id: 3, nombre: 'Federación Regional de Cafeteros' },
];

const ZONAS_MOCK = [
  { id: 1, empresaId: 1, nombre: 'Zona Norte - Caldas' },
  { id: 2, empresaId: 1, nombre: 'Zona Sur - Quindío' },
  { id: 3, empresaId: 2, nombre: 'Zona Centro - Antioquia' },
  { id: 4, empresaId: 2, nombre: 'Zona Este - Cundinamarca' },
  { id: 5, empresaId: 3, nombre: 'Zona General Federación' },
];

const COLEGAS_MOCK = [
  { id: '101', zonaId: 1, name: 'Carlos Agrónomo', email: 'carlos.a@demo.com', status: 'online', role: 'Sénior', avatar: 'https://i.pravatar.cc/150?u=101' },
  { id: '102', zonaId: 1, name: 'Elena Torres', email: 'elena.t@demo.com', status: 'online', role: 'Técnico', avatar: 'https://i.pravatar.cc/150?u=102' },
  { id: '103', zonaId: 1, name: 'Mauricio Gómez', email: 'm.gomez@demo.com', status: 'offline', role: 'Extensionista', avatar: 'https://i.pravatar.cc/150?u=103' },
  { id: '104', zonaId: 2, name: 'Patricia Ruiz', email: 'p.ruiz@demo.com', status: 'online', role: 'Sénior', avatar: 'https://i.pravatar.cc/150?u=104' },
  { id: '105', zonaId: 3, name: 'Jorge Iván Cano', email: 'jorge.i@demo.com', status: 'online', role: 'Técnico', avatar: 'https://i.pravatar.cc/150?u=105' },
];

const INITIAL_MESSAGES = {
  1: [
    { id: 1, sender: 'Elena Torres', text: 'Buenos días equipo. He detectado un brote de Broca en la vereda El Silencio.', time: '08:30 AM', type: 'alert' },
    { id: 2, sender: 'Carlos Agrónomo', text: 'Entendido Elena. ¿Qué porcentaje de infestación estimas?', time: '08:35 AM', type: 'text' },
    { id: 3, sender: 'Elena Torres', text: 'Alrededor del 4%. Ya estamos coordinando con los caficultores de la zona para el trampeo.', time: '08:42 AM', type: 'text' },
  ],
  2: [
    { id: 1, sender: 'Patricia Ruiz', text: 'Reportando lluvias fuertes en el Sur. Estén alertas a la humedad.', time: '09:00 AM', type: 'text' },
  ]
};

const Extensionistas = () => {
  const { user } = useAuthHook();
  const [selectedEmpresa, setSelectedEmpresa] = useState('');
  const [selectedZona, setSelectedZona] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState({});
  const [showAlertModal, setShowAlertModal] = useState(false);
  const chatContainerRef = useRef(null);

  // Filtrar zonas por empresa
  const filteredZonas = ZONAS_MOCK.filter(z => z.empresaId === parseInt(selectedEmpresa));
  
  // Filtrar colegas por zona
  const filteredColegas = COLEGAS_MOCK.filter(c => c.zonaId === parseInt(selectedZona));

  useEffect(() => {
    // Inicializar mensajes si no existen
    setMessages(INITIAL_MESSAGES);
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, selectedZona]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim() || !selectedZona) return;

    const newMessage = {
      id: Date.now(),
      sender: user?.name || 'Yo',
      text: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'text',
      isMe: true
    };

    const zonaId = parseInt(selectedZona);
    setMessages(prev => ({
      ...prev,
      [zonaId]: [...(prev[zonaId] || []), newMessage]
    }));
    setMessage('');

    // Simular respuesta técnica automática si detecta palabras clave
    if (message.toLowerCase().includes('roya') || message.toLowerCase().includes('broca')) {
      setTimeout(() => {
        const reply = {
          id: Date.now() + 1,
          sender: 'Sistema de Alertas',
          text: 'Se ha registrado una posible incidencia sanitaria en la zona. Por favor, asegúrese de llenar el reporte oficial de mitigación.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          type: 'system'
        };
        setMessages(prev => ({
          ...prev,
          [zonaId]: [...(prev[zonaId] || []), reply]
        }));
      }, 2000);
    }
  };

  const handleReportAlert = (alertData) => {
    const zonaId = parseInt(selectedZona);
    const alertMessage = {
      id: Date.now(),
      sender: user?.name || 'Yo',
      text: `[ALERTA: ${alertData.plagueName}] Severidad: ${alertData.severityName.toUpperCase()}. Ubicación: ${alertData.location}. Detalle: ${alertData.description}`,
      time: alertData.timestamp,
      type: 'alert',
      isMe: true
    };

    setMessages(prev => ({
      ...prev,
      [zonaId]: [...(prev[zonaId] || []), alertMessage]
    }));
  };

  const currentMessages = messages[parseInt(selectedZona)] || [];

  return (
    <div className="flex flex-col space-y-6 animate-fadeIn h-[calc(100vh-140px)]">
      {/* Header y Filtros */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 shrink-0">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <svg className="w-8 h-8 text-cafe-vino-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Comunidad de Extensionistas
            </h1>
            <p className="text-gray-500 text-sm mt-1">Colaboración regional para la mitigación de plagas y gestión técnica.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-end sm:items-center">
            {/* Selector Empresa */}
            <div className="w-full sm:w-auto">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1 block">Empresa</label>
              <select 
                value={selectedEmpresa}
                onChange={(e) => {
                  setSelectedEmpresa(e.target.value);
                  setSelectedZona('');
                }}
                className="w-full sm:w-56 px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cafe-vino-500 outline-none transition-all text-sm font-medium"
              >
                <option value="">Seleccione Empresa...</option>
                {EMPRESAS_MOCK.map(emp => (
                  <option key={emp.id} value={emp.id}>{emp.nombre}</option>
                ))}
              </select>
            </div>

            {/* Selector Zona */}
            <div className="w-full sm:w-auto">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1 block">Zona de Trabajo</label>
              <select 
                value={selectedZona}
                disabled={!selectedEmpresa}
                onChange={(e) => setSelectedZona(e.target.value)}
                className="w-full sm:w-56 px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cafe-vino-500 outline-none transition-all text-sm font-medium disabled:opacity-50"
              >
                <option value="">Seleccione Zona...</option>
                {filteredZonas.map(z => (
                  <option key={z.id} value={z.id}>{z.nombre}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {!selectedZona ? (
        <div className="flex-1 flex flex-col items-center justify-center bg-white rounded-2xl border-2 border-dashed border-gray-100 p-12 text-center">
          <div className="w-24 h-24 bg-cafe-vino-50 rounded-full flex items-center justify-center mb-6">
            <svg className="w-12 h-12 text-cafe-vino-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Selecciona una Zona para comenzar</h2>
          <p className="text-gray-500 max-w-sm mx-auto">Conéctate con otros extensionistas de tu región para compartir alertas sanitarias y soluciones agronómicas.</p>
        </div>
      ) : (
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6 min-h-0">
          {/* Chat Container */}
          <div className="lg:col-span-3 bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col min-h-0 overflow-hidden">
            {/* Messages */}
            <div 
              ref={chatContainerRef}
              className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50/30"
            >
              {currentMessages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-400 italic">
                  <p>Inicia la conversación en esta zona...</p>
                </div>
              ) : (
                currentMessages.map((m) => (
                  <div 
                    key={m.id} 
                    className={`flex ${m.isMe ? 'justify-end' : 'justify-start'} animate-slideIn`}
                  >
                    <div className={`max-w-[80%] ${m.isMe ? 'items-end' : 'items-start'} flex flex-col`}>
                      {!m.isMe && m.type !== 'system' && (
                        <span className="text-xs font-bold text-gray-500 mb-1 ml-2">{m.sender}</span>
                      )}
                      <div className={`p-4 rounded-2xl text-sm shadow-sm ${
                        m.type === 'system' ? 'bg-amber-50 text-amber-800 border border-amber-200 w-full italic' :
                        m.type === 'alert' ? 'bg-red-50 text-red-900 border border-red-200' :
                        m.isMe ? 'bg-cafe-vino-600 text-white rounded-tr-none' : 'bg-white text-gray-700 rounded-tl-none border border-gray-100'
                      }`}>
                        {m.type === 'alert' && (
                          <div className="flex items-center gap-2 mb-2 font-bold text-xs uppercase tracking-wider">
                            <span className="flex h-2 w-2 rounded-full bg-red-600 animate-ping"></span>
                            Alerta Sanitaria
                          </div>
                        )}
                        {m.text}
                      </div>
                      <span className="text-[10px] mt-1 text-gray-400 px-2">{m.time}</span>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-100 bg-white">
              <form onSubmit={handleSendMessage} className="flex items-center gap-3">
                <button 
                  type="button" 
                  onClick={() => setShowAlertModal(true)}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors" 
                  title="Reportar Alerta"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </button>
                <input
                  type="text"
                  placeholder="Escribe un mensaje al equipo de la zona..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="flex-1 px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-cafe-vino-500 outline-none transition-all text-sm"
                />
                <button 
                  type="submit"
                  disabled={!message.trim()}
                  className="p-3 bg-cafe-vino-600 text-white rounded-xl hover:bg-cafe-vino-700 transition-all disabled:opacity-50"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </form>
            </div>
          </div>

          {/* Sidebar: Colegas */}
          <div className="hidden lg:flex flex-col bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-50 bg-gray-50/50">
              <h3 className="font-bold text-gray-900 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Equipo en la Zona
              </h3>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {filteredColegas.length === 0 ? (
                <p className="text-sm text-gray-400 italic text-center py-4">No hay otros extensionistas registrados en esta zona.</p>
              ) : (
                filteredColegas.map(c => (
                  <div key={c.id} className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 transition-colors group">
                    <div className="relative">
                      <img src={c.avatar} alt={c.name} className="w-10 h-10 rounded-full border-2 border-white shadow-sm" />
                      <span className={`absolute bottom-0 right-0 w-3 h-3 border-2 border-white rounded-full ${c.status === 'online' ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-gray-900 truncate">{c.name}</p>
                      <p className="text-[10px] text-gray-500">{c.role}</p>
                    </div>
                    <button className="opacity-0 group-hover:opacity-100 p-2 text-cafe-vino-600 hover:bg-cafe-vino-50 rounded-lg transition-all">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </button>
                  </div>
                ))
              )}
            </div>
            <div className="p-4 bg-cafe-vino-50 border-t border-cafe-vino-100">
              <p className="text-[11px] text-cafe-vino-700 font-medium">Tip Técnico: Comparte fotos de las hojas si sospechas de Royas o Mancha de Hierro.</p>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Reporte de Alerta */}
      <ReportAlertModal 
        isOpen={showAlertModal}
        onClose={() => setShowAlertModal(false)}
        onReport={handleReportAlert}
      />

      <style jsx>{`
        .animate-fadeIn { animation: fadeIn 0.4s ease-out; }
        .animate-slideIn { animation: slideIn 0.3s ease-out; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideIn { 
          from { opacity: 0; transform: translateY(10px); } 
          to { opacity: 1; transform: translateY(0); } 
        }
      `}</style>
    </div>
  );
};

export default Extensionistas;
