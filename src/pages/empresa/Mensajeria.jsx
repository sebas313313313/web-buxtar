import React, { useState, useMemo } from 'react';
import {
  Modal,
  SearchBar,
  EmptyState,
  ActionModal,
  Toast,
} from '../../components';
import { useToast } from '../../hooks/useToast';

const EXTENSIONISTAS_MOCK = [
  { id: 1, nombre: 'Ing. Javier Duarte', telefono: '+57 311 000 1122' },
  { id: 2, nombre: 'Dra. Lucia Mendez', telefono: '+57 322 555 4433' },
];

const CAFICULTORES_MOCK = [
  { id: 101, nombre: 'Ricardo Peña', telefono: '+57 315 777 8899' },
  { id: 102, nombre: 'Marina Sol', telefono: '+57 301 222 3344' },
  { id: 103, nombre: 'Gilberto Castro', telefono: '+57 310 999 0000' },
];

const MENSAJES_INICIAL = [
  { id: 1, emisor: 'Empresa Cafetalera', receptor: 'Ricardo Peña', mensaje: 'Recordatorio: Mañana visita técnica de Royer.', tipo: 'Push', fecha: '2026-04-06T10:00:00Z' },
  { id: 2, emisor: 'Empresa Cafetalera', receptor: 'Ing. Javier Duarte', mensaje: 'Urgente: Reportar volumen proyectado Zona Norte.', tipo: 'Ambos', fecha: '2026-04-05T15:30:00Z' },
];

const Mensajeria = () => {
  const { toasts, addToast, removeToast } = useToast();
  const [mensajes, setMensajes] = useState(MENSAJES_INICIAL);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Estados para el Modal "Gestor de Mensajes"
  const [showGestor, setShowGestor] = useState(false);
  const [tipoMensaje, setTipoMensaje] = useState('Push'); // Push, SMS, Ambos
  const [cuerpoMensaje, setCuerpoMensaje] = useState('');
  const [perfilDestinatario, setPerfilDestinatario] = useState('Caficultor'); // Caficultor, Extensionista
  const [destinatariosSeleccionados, setDestinatariosSeleccionados] = useState([]);
  const [destSearch, setDestSearch] = useState('');

  // Filtrar destinatarios sugeridos basándose en el perfil seleccionado
  const sugeridos = useMemo(() => {
    const base = perfilDestinatario === 'Caficultor' ? CAFICULTORES_MOCK : EXTENSIONISTAS_MOCK;
    return base.filter(p => 
      p.nombre.toLowerCase().includes(destSearch.toLowerCase()) && 
      !destinatariosSeleccionados.find(d => d.id === p.id)
    );
  }, [perfilDestinatario, destSearch, destinatariosSeleccionados]);

  // Historial filtrado
  const filteredMensajes = useMemo(() => {
    return mensajes.filter(m => 
      m.receptor.toLowerCase().includes(searchTerm.toLowerCase()) || 
      m.mensaje.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [mensajes, searchTerm]);

  // Handlers
  const openGestor = () => {
    setShowGestor(true);
    limpiarForm();
  };

  const limpiarForm = () => {
    setCuerpoMensaje('');
    setDestinatariosSeleccionados([]);
    setDestSearch('');
    setTipoMensaje('Push');
  };

  const addDestinatario = (dest) => {
    setDestinatariosSeleccionados([...destinatariosSeleccionados, { ...dest, rol: perfilDestinatario }]);
  };

  const removeDestinatario = (id) => {
    setDestinatariosSeleccionados(destinatariosSeleccionados.filter(d => d.id !== id));
  };

  const enviarMensajes = (e) => {
    e.preventDefault();
    if (!cuerpoMensaje.trim() || destinatariosSeleccionados.length === 0) {
      addToast('El mensaje y al menos un destinatario son necesarios', 'warning');
      return;
    }

    const nuevos = destinatariosSeleccionados.map(d => ({
      id: Date.now() + Math.random(),
      emisor: 'Empresa Cafetalera',
      receptor: d.nombre,
      mensaje: cuerpoMensaje,
      tipo: tipoMensaje,
      fecha: new Date().toISOString()
    }));

    setMensajes([...nuevos, ...mensajes]);
    addToast('Mensajes enviados correctamente', 'success');
    setShowGestor(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mensajería</h1>
          <p className="text-gray-500 text-sm">Comunicación omnicanal con tu equipo técnico y productores.</p>
        </div>
        
        <button
          onClick={openGestor}
          className="inline-flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-bold text-white bg-brand-vino rounded-lg hover:opacity-95 transition-all shadow-md group"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
          Gestor de Mensajes
        </button>
      </div>

      {/* Buscador Historial */}
      <div className="flex justify-start">
        <SearchBar
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar en el historial de mensajes..."
          className="w-full max-w-sm"
        />
      </div>

      {/* Historial */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-100">
            <thead className="bg-gray-50 text-xs font-bold text-gray-500 uppercase tracking-widest">
              <tr>
                <th className="px-6 py-4 text-left">Emisor</th>
                <th className="px-6 py-4 text-left">Receptor</th>
                <th className="px-6 py-4 text-left">Mensaje</th>
                <th className="px-6 py-4 text-left">Canal</th>
                <th className="px-6 py-4 text-right">Fecha / Hora</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredMensajes.map((m) => (
                <tr key={m.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-brand-vino">{m.emisor}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{m.receptor}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600 max-w-xs md:max-w-md truncate">{m.mensaje}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      m.tipo === 'Push' ? 'bg-blue-100 text-blue-800' : 
                      m.tipo === 'SMS' ? 'bg-green-100 text-green-800' : 'bg-purple-100 text-purple-800'
                    }`}>
                      {m.tipo}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="text-xs text-gray-400 font-medium">
                      {new Date(m.fecha).toLocaleString('es-CO', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredMensajes.length === 0 && <EmptyState message="No hay mensajes en el historial." searchTerm={searchTerm} />}
        </div>
      </div>

      {/* Modal Gestor de Mensajes */}
      <Modal
        isOpen={showGestor}
        onClose={() => setShowGestor(false)}
        title="Enviar Notificaciones"
        size="xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-1">
          {/* Izquierda: Configuración del mensaje */}
          <div className="space-y-5 border-b md:border-b-0 md:border-r border-gray-100 pb-6 md:pb-0 md:pr-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Contenido del Mensaje</label>
              <textarea 
                value={cuerpoMensaje}
                onChange={(e) => setCuerpoMensaje(e.target.value)}
                placeholder="Escribe el mensaje..."
                rows={4}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-brand-vino resize-none text-sm transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Canal de Envío</label>
              <div className="grid grid-cols-3 gap-2">
                {['Push', 'SMS', 'Ambos'].map(tipo => (
                  <button
                    key={tipo}
                    onClick={() => setTipoMensaje(tipo)}
                    className={`py-2 px-3 rounded-lg text-xs font-bold border transition-all ${
                      tipoMensaje === tipo ? 'bg-brand-vino text-white border-brand-vino shadow-md' : 'bg-white text-gray-500 border-gray-200 hover:border-brand-vino hover:text-brand-vino'
                    }`}
                  >
                    {tipo}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="p-4 bg-red-50 rounded-xl border border-red-100">
              <p className="text-[10px] text-brand-vino opacity-80 leading-relaxed italic">
                * Las notificaciones PUSH son gratuitas. Los SMS pueden tener costos adicionales según el operador.
              </p>
            </div>
          </div>

          {/* Derecha: Selección de Destinatarios */}
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-gray-700">Destinatarios</label>
              <div className="flex bg-gray-100 p-1 rounded-lg">
                {['Caficultor', 'Extensionista'].map(perfil => (
                  <button
                    key={perfil}
                    onClick={() => { setPerfilDestinatario(perfil); setDestSearch(''); }}
                    className={`px-3 py-1 text-[10px] uppercase tracking-wider font-bold rounded-md transition-all ${
                      perfilDestinatario === perfil ? 'bg-white text-brand-vino shadow-sm' : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    {perfil}s
                  </button>
                ))}
              </div>
            </div>

            <div className="relative">
              <input 
                type="text" 
                value={destSearch}
                onChange={(e) => setDestSearch(e.target.value)}
                placeholder={`Buscar ${perfilDestinatario.toLowerCase()}...`}
                className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-brand-vino"
              />
              <svg className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            <div className="max-h-40 overflow-y-auto border border-gray-100 rounded-xl divide-y divide-gray-50">
              {sugeridos.map(p => (
                <div key={p.id} className="p-3 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <div>
                    <div className="text-xs font-bold text-gray-900">{p.nombre}</div>
                    <div className="text-[10px] text-gray-400">{p.telefono}</div>
                  </div>
                  <button 
                    onClick={() => addDestinatario(p)}
                    className="p-1.5 text-brand-vino hover:bg-red-100 rounded-full transition-colors"
                  >
                    <svg className="w-5 h-5 font-bold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 6v6m0 0v6m0-6h6m-6 0h6" />
                    </svg>
                  </button>
                </div>
              ))}
              {sugeridos.length === 0 && <p className="p-4 text-center text-[11px] text-gray-400">No hay más sugerencias disponibles.</p>}
            </div>

            <div className="pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Seleccionados: {destinatariosSeleccionados.length}</span>
                {destinatariosSeleccionados.length > 0 && <button onClick={() => setDestinatariosSeleccionados([])} className="text-[10px] text-red-500 hover:underline">Limpiar Todo</button>}
              </div>
              <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto pr-1">
                {destinatariosSeleccionados.map(d => (
                  <span key={d.id} className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-gray-100 text-[10px] font-bold text-gray-700 rounded-lg">
                    {d.nombre}
                    <button onClick={() => removeDestinatario(d.id)} className="text-gray-400 hover:text-red-500">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-6 border-t mt-6">
          <button
            type="button"
            onClick={() => setShowGestor(false)}
            className="px-6 py-2.5 text-xs font-bold text-gray-500 hover:bg-gray-50 rounded-lg transition-all"
          >
            Cerrar
          </button>
          <button
            onClick={enviarMensajes}
            className="px-8 py-2.5 text-xs font-bold text-white bg-brand-vino rounded-lg hover:opacity-95 shadow-lg active:scale-95 transition-all"
          >
            Enviar Comunicación
          </button>
        </div>
      </Modal>

      {/* Toasts */}
      <div className="fixed top-0 right-0 z-[60]">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            isVisible={toast.isVisible}
            onClose={() => removeToast(toast.id)}
            duration={3000}
          />
        ))}
      </div>
    </div>
  );
};

export default Mensajeria;
