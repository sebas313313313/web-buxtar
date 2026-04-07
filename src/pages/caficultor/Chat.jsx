import React, { useState } from 'react';
import { PageHeader, Card, Button } from '../../components';

const C_Chat = () => {
  const [selectedContact, setSelectedContact] = useState(null);
  const [message, setMessage] = useState('');

  const extensionista = {
    id: 1,
    name: 'Ing. Roberto Gómez',
    role: 'Asistente Técnico Senior',
    status: 'En línea',
    avatar: 'https://i.pravatar.cc/150?u=rhg',
    lastMessage: 'Recuerda revisar la humedad del lote 3.',
    time: '10:30 AM'
  };

  const messages = [
    { id: 1, text: 'Hola Carlos, ¿cómo va la cosecha en la Finca El Refugio?', sender: 'them', time: '09:15 AM' },
    { id: 2, text: 'Hola Ingeniero, todo bien. Estamos terminando el lote sur.', sender: 'me', time: '09:20 AM' },
    { id: 3, text: 'Excelente. Te envié unas recomendaciones para el abonado del lote 2. Por favor revísalas.', sender: 'them', time: '09:25 AM' },
    { id: 4, text: 'Claro que sí, las reviso hoy mismo. ¡Gracias!', sender: 'me', time: '09:30 AM' },
  ];

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col space-y-4">
      <PageHeader title="Mensajería" subtitle="Comunicación directa con tu Asistente Técnico" />
      
      <div className="flex-1 flex overflow-hidden gap-6">
        
        {/* Contact List */}
        <div className={`${selectedContact ? 'hidden md:flex' : 'flex'} w-full md:w-80 flex-col space-y-4`}>
          <Card className="flex-1 p-0 overflow-hidden flex flex-col shadow-sm border border-gray-100">
            <div className="p-4 border-b border-gray-100 bg-gray-50">
              <h3 className="font-bold text-gray-900">Contactos Asignados</h3>
            </div>
            <div className="flex-1 overflow-y-auto">
              <button 
                onClick={() => setSelectedContact(extensionista)}
                className={`w-full p-4 flex items-center space-x-3 hover:bg-cafe-vino-50 transition-colors text-left border-b border-gray-50 ${selectedContact?.id === extensionista.id ? 'bg-cafe-vino-50 border-l-4 border-l-cafe-vino-600' : ''}`}
              >
                <div className="relative">
                  <img src={extensionista.avatar} alt={extensionista.name} className="w-12 h-12 rounded-full border-2 border-white shadow-sm" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline">
                    <h4 className="font-bold text-gray-900 truncate">{extensionista.name}</h4>
                    <span className="text-[10px] text-gray-400 font-medium">{extensionista.time}</span>
                  </div>
                  <p className="text-xs text-gray-500 truncate">{extensionista.lastMessage}</p>
                </div>
              </button>
            </div>
          </Card>
        </div>

        {/* Chat Area */}
        <div className={`${selectedContact ? 'flex' : 'hidden md:flex'} flex-1 flex-col`}>
          {selectedContact ? (
            <Card className="flex-1 p-0 overflow-hidden flex flex-col shadow-sm border border-gray-100">
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-white">
                <div className="flex items-center space-x-3">
                  <button 
                    onClick={() => setSelectedContact(null)}
                    className="md:hidden p-1 -ml-2 text-gray-500 hover:text-cafe-vino-600 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <img src={selectedContact.avatar} alt={selectedContact.name} className="w-10 h-10 rounded-full" />
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">{selectedContact.name}</h4>
                    <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-wider">{selectedContact.status}</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                   <Button variant="secondary" size="sm" className="p-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                   </Button>
                </div>
              </div>

              {/* Messages viewport */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
                {messages.map((m) => (
                  <div key={m.id} className={`flex ${m.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[70%] rounded-2xl p-3 shadow-sm ${m.sender === 'me' ? 'bg-cafe-vino-600 text-white rounded-tr-none' : 'bg-white text-gray-800 rounded-tl-none border border-gray-100'}`}>
                      <p className="text-sm">{m.text}</p>
                      <span className={`text-[10px] block mt-1 ${m.sender === 'me' ? 'text-cafe-vino-200' : 'text-gray-400'}`}>{m.time}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input area */}
              <div className="p-4 bg-white border-t border-gray-100">
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-cafe-vino-600 transition-colors bg-gray-50 rounded-lg">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                  </button>
                  <button className="p-2 text-gray-400 hover:text-cafe-vino-600 transition-colors bg-gray-50 rounded-lg">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.414a4 4 0 00-5.656-5.656l-6.415 6.414a6 6 0 108.486 8.486L20.5 13"/></svg>
                  </button>
                  <div className="flex-1 relative">
                    <input 
                      type="text" 
                      placeholder="Escribe un mensaje..."
                      className="w-full bg-gray-50 border-none rounded-xl py-2.5 px-4 text-sm focus:ring-2 focus:ring-cafe-vino-500"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>
                  <button className="p-2.5 bg-cafe-vino-600 text-white rounded-xl shadow-md hover:bg-cafe-vino-700 transition-colors active:scale-95">
                    <svg className="w-5 h-5 transform rotate-90" fill="currentColor" viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
                  </button>
                </div>
              </div>
            </Card>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
               <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                  <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
               </div>
               <h4 className="text-gray-900 font-bold">Selecciona un chat</h4>
               <p className="text-gray-500 text-sm">Escoge a tu asistente técnico de la lista para iniciar la comunicación.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default C_Chat;
