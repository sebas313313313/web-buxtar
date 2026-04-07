import React, { useState, useEffect, useRef } from 'react';
import { Card, Button, Input } from '../../components';

const EMPRESAS_MOCK = [
  { id: 1, nombre: 'Empresa Cafetalera del Norte' },
  { id: 2, nombre: 'Cooperativa de Cafés Especiales' },
  { id: 3, nombre: 'Federación Regional de Cafeteros' },
];

const GRUPOS_MOCK = [
  { id: 1, empresaId: 1, nombre: 'Grupo Norte A' },
  { id: 2, empresaId: 1, nombre: 'Grupo Norte B' },
  { id: 3, empresaId: 2, nombre: 'Grupo Cooperativa 1' },
  { id: 4, empresaId: 3, nombre: 'Grupo Federación 1' },
];

const CAFICULTORES_MOCK = [
  { id: 1, grupoId: 1, nombre: 'Juan Esteban Gómez', foto: 'https://i.pravatar.cc/150?u=1' },
  { id: 2, grupoId: 1, nombre: 'Diana Marcela Torres', foto: 'https://i.pravatar.cc/150?u=2' },
  { id: 3, grupoId: 2, nombre: 'Ricardo Arjona', foto: 'https://i.pravatar.cc/150?u=3' },
  { id: 4, grupoId: 3, nombre: 'María Lucía Restrepo', foto: 'https://i.pravatar.cc/150?u=4' },
];

const INITIAL_MESSAGES = [
  { id: 1, sender: 'assistant', text: 'Hola Juan, ¿cómo va la cosecha de esta semana?', time: '09:00 AM' },
  { id: 2, sender: 'caficultor', text: 'Hola, todo bien. Un poco de lluvia pero avanzando.', time: '09:05 AM' },
  { id: 3, sender: 'assistant', text: 'Excelente. Recuerda revisar la humedad del suelo.', time: '09:10 AM' },
];

const Chats = () => {
  const [selectedEmpresa, setSelectedEmpresa] = useState('');
  const [selectedGrupo, setSelectedGrupo] = useState('');
  const [selectedCaficultor, setSelectedCaficultor] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const chatContainerRef = useRef(null);

  // Filtrar grupos por empresa
  const filteredGrupos = GRUPOS_MOCK.filter(g => g.empresaId === parseInt(selectedEmpresa));
  
  // Filtrar caficultores por grupo
  const filteredCaficultores = CAFICULTORES_MOCK.filter(c => c.grupoId === parseInt(selectedGrupo));

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, selectedCaficultor]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage = {
      id: Date.now(),
      sender: 'assistant',
      text: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, newMessage]);
    setMessage('');

    // Simular respuesta automática
    setTimeout(() => {
      const reply = {
        id: Date.now() + 1,
        sender: 'caficultor',
        text: '¡Entendido! Lo revisaré ahora mismo.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, reply]);
    }, 1500);
  };

  const handleSelectCaficultor = (caficultor) => {
    setSelectedCaficultor(caficultor);
    // En una app real cargaríamos los mensajes de ese caficultor
    setMessages(INITIAL_MESSAGES);
  };

  return (
    <div className="flex flex-col space-y-6 animate-fadeIn">
      {/* Header y Filtros */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <svg className="w-8 h-8 text-cafe-vino-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              Módulo de Chats
            </h1>
            <p className="text-gray-500 text-sm mt-1">Comunícate directamente con tus caficultores asignados.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-end sm:items-center">
            {/* Selector Empresa */}
            <div className="w-full sm:w-auto">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1 block">Empresa</label>
              <select 
                value={selectedEmpresa}
                onChange={(e) => {
                  setSelectedEmpresa(e.target.value);
                  setSelectedGrupo('');
                  setSelectedCaficultor(null);
                }}
                className="w-full sm:w-56 px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cafe-vino-500 outline-none transition-all text-sm"
              >
                <option value="">Seleccione...</option>
                {EMPRESAS_MOCK.map(emp => (
                  <option key={emp.id} value={emp.id}>{emp.nombre}</option>
                ))}
              </select>
            </div>

            {/* Selector Grupo */}
            <div className="w-full sm:w-auto">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1 block">Grupo</label>
              <select 
                value={selectedGrupo}
                disabled={!selectedEmpresa}
                onChange={(e) => {
                  setSelectedGrupo(e.target.value);
                  setSelectedCaficultor(null);
                }}
                className="w-full sm:w-56 px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cafe-vino-500 outline-none transition-all text-sm disabled:opacity-50"
              >
                <option value="">Seleccione...</option>
                {filteredGrupos.map(g => (
                  <option key={g.id} value={g.id}>{g.nombre}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-280px)]">
        {/* Listado de Caficultores (Lado Izquierdo) */}
        <div className={`${selectedCaficultor ? 'hidden lg:flex' : 'flex'} lg:col-span-4 bg-white rounded-2xl shadow-sm border border-gray-100 flex-col overflow-hidden`}>
          <div className="p-4 border-b border-gray-50 bg-gray-50/50">
            <h3 className="font-bold text-gray-900">Caficultores</h3>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {!selectedGrupo ? (
              <div className="flex flex-col items-center justify-center h-full text-center p-6 bg-gray-50/30 rounded-xl border border-dashed border-gray-200 m-2">
                <svg className="w-12 h-12 text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <p className="text-gray-400 text-sm italic">Seleccione un grupo para ver caficultores</p>
              </div>
            ) : filteredCaficultores.length === 0 ? (
              <p className="text-center text-gray-400 py-10">No hay caficultores en este grupo.</p>
            ) : (
              filteredCaficultores.map(c => (
                <button
                  key={c.id}
                  onClick={() => handleSelectCaficultor(c)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                    selectedCaficultor?.id === c.id 
                    ? 'bg-cafe-vino-50 border-cafe-vino-200 text-cafe-vino-900' 
                    : 'hover:bg-gray-50 border-transparent text-gray-700'
                  } border`}
                >
                  <img src={c.foto} alt={c.nombre} className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm" />
                  <div className="text-left overflow-hidden">
                    <p className="font-semibold text-sm truncate">{c.nombre}</p>
                    <p className="text-xs text-gray-400">En línea</p>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Interfaz de Chat (Lado Derecho) */}
        <div className={`${selectedCaficultor ? 'flex' : 'hidden lg:flex'} lg:col-span-8 bg-white rounded-2xl shadow-sm border border-gray-100 flex-col overflow-hidden relative`}>
          {!selectedCaficultor ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8 bg-gray-50/20">
              <div className="w-20 h-20 bg-white rounded-full shadow-md flex items-center justify-center mb-4">
                <svg className="w-10 h-10 text-cafe-vino-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-gray-800">Selecciona un chat</h2>
              <p className="text-gray-500 mt-2 max-w-xs mx-auto">Selecciona un caficultor para comenzar la conversación.</p>
            </div>
          ) : (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-50 flex items-center justify-between bg-white sticky top-0 z-10 shadow-sm">
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setSelectedCaficultor(null)}
                    className="lg:hidden p-1 -ml-2 text-gray-500 hover:text-cafe-vino-600 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <img src={selectedCaficultor.foto} alt={selectedCaficultor.nombre} className="w-10 h-10 rounded-full border-2 border-cafe-vino-100" />
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm">{selectedCaficultor.nombre}</h3>
                    <p className="text-xs text-green-500 flex items-center gap-1">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span> En línea
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 text-gray-400 hover:text-cafe-vino-600 rounded-full hover:bg-gray-50 transition-all shadow-sm border border-transparent hover:border-gray-100">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </button>
                  <button className="p-2 text-gray-400 hover:text-cafe-vino-600 rounded-full hover:bg-gray-50 transition-all shadow-sm border border-transparent hover:border-gray-100">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Messages Area */}
              <div 
                ref={chatContainerRef}
                className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50 pattern-grid"
              >
                {messages.map((m) => (
                  <div 
                    key={m.id} 
                    className={`flex ${m.sender === 'assistant' ? 'justify-end' : 'justify-start'} animate-fadeIn`}
                  >
                    <div className={`max-w-[75%] group`}>
                      <div 
                        className={`p-3 rounded-2xl text-sm shadow-sm ${
                          m.sender === 'assistant' 
                          ? 'bg-cafe-vino-600 text-white rounded-tr-none' 
                          : 'bg-white text-gray-700 rounded-tl-none border border-gray-100'
                        }`}
                      >
                        {m.text}
                      </div>
                      <p className={`text-[10px] mt-1 text-gray-400 ${m.sender === 'assistant' ? 'text-right' : 'text-left'}`}>
                        {m.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input Area */}
              <div className="p-4 bg-white border-t border-gray-100 sticky bottom-0">
                <form 
                  onSubmit={handleSendMessage}
                  className="flex items-center gap-2"
                >
                  <div className="flex gap-1">
                    <button 
                      type="button" 
                      title="Adjuntar Imagen"
                      className="p-2 text-gray-400 hover:text-cafe-vino-600 rounded-full transition-colors hover:bg-cafe-vino-50"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 012-2V6a2 2 0 01-2-2H6a2 2 0 01-2 2v12a2 2 0 012 2z" />
                      </svg>
                    </button>
                    <button 
                      type="button" 
                      title="Adjuntar Video"
                      className="p-2 text-gray-400 hover:text-cafe-vino-600 rounded-full transition-colors hover:bg-cafe-vino-50"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </button>
                    <button 
                      type="button" 
                      title="Adjuntar Documento"
                      className="p-2 text-gray-400 hover:text-cafe-vino-600 rounded-full transition-colors hover:bg-cafe-vino-50"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </button>
                  </div>
                  
                  <input
                    type="text"
                    placeholder="Escribe un mensaje..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex-1 px-4 py-2 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-cafe-vino-500 outline-none transition-all text-sm shadow-inner"
                  />
                  
                  <button 
                    type="submit"
                    disabled={!message.trim()}
                    className="p-2.5 bg-cafe-vino-600 text-white rounded-xl shadow-md shadow-cafe-vino-200 hover:bg-cafe-vino-700 transition-all disabled:opacity-50 active:scale-95"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </form>
              </div>
            </>
          )}
        </div>
      </div>
      
      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .pattern-grid {
          background-image: radial-gradient(circle, #e5e7eb 1px, transparent 1px);
          background-size: 20px 20px;
        }
      `}</style>
    </div>
  );
};

export default Chats;
