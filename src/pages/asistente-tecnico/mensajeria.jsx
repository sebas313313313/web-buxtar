import React, { useState } from 'react';
import { ActionModal } from '../../components';

const Mensajeria = () => {
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [alertModal, setAlertModal] = useState({ isOpen: false, type: 'info', title: '', message: '' });
  const [showGestorModal, setShowGestorModal] = useState(false);
  const [showCaficultoresModal, setShowCaficultoresModal] = useState(false);
  const [selectedEmpresa, setSelectedEmpresa] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCaficultores, setSelectedCaficultores] = useState([]);
  const [caficultoresSeleccionados, setCaficultoresSeleccionados] = useState([]);
  
  // Estados para el formulario de mensaje
  const [nuevoMensaje, setNuevoMensaje] = useState({
    mensaje: '',
    tipo: 'push', // push, sms, ambos
    empresaId: null
  });

  // Estados para el formulario de caficultores
  const [caficultores, setCaficultores] = useState([
    { id: 1, nombre: 'Carlos Rodríguez', telefono: '+57 300 1234567', accion: 'Activo', empresaId: 1 },
    { id: 2, nombre: 'Ana López', telefono: '+57 300 2345678', accion: 'Activo', empresaId: 1 },
    { id: 3, nombre: 'Luis Torres', telefono: '+57 300 3456789', accion: 'Activo', empresaId: 1 },
    { id: 4, nombre: 'María García', telefono: '+57 300 4567890', accion: 'Activo', empresaId: 1 },
    { id: 5, nombre: 'Pedro Gómez', telefono: '+57 300 5678901', accion: 'Activo', empresaId: 2 },
    { id: 6, nombre: 'Diego Herrera', telefono: '+57 300 6789012', accion: 'Activo', empresaId: 2 },
    { id: 7, nombre: 'Sofía Castro', telefono: '+57 300 7890123', accion: 'Activo', empresaId: 2 },
    { id: 8, nombre: 'José Martínez', telefono: '+57 300 8901234', accion: 'Activo', empresaId: 3 },
    { id: 9, nombre: 'Carmen Soto', telefono: '+57 300 9012345', accion: 'Activo', empresaId: 3 },
    { id: 10, nombre: 'Roberto Silva', telefono: '+57 300 0123456', accion: 'Activo', empresaId: 3 }
  ]);

  // Datos ficticios de empresas
  const [empresas] = useState([
    { id: 1, nombre: 'Café Colombia S.A.', nit: '900123456', descripcion: 'Principal empresa caficultora' },
    { id: 2, nombre: 'Agroindustrias del Valle', nit: '900789012', descripcion: 'Especializada en procesamiento' },
    { id: 3, nombre: 'Cafeteros Unidos', nit: '900345678', descripcion: 'Cooperativa de caficultores' },
    { id: 4, nombre: 'Exportaciones Café Andino', nit: '900901234', descripcion: 'Exportadora internacional' }
  ]);

  // Datos ficticios de mensajes
  const [mensajes] = useState([
    { id: 1, emisor: 'Sistema', receptor: 'Carlos Rodríguez', mensaje: 'Recordatorio de reunión mañana 10am', tipo: 'push', fecha: '2024-03-15T09:00:00Z', empresaId: 1 },
    { id: 2, emisor: 'Admin', receptor: 'Ana López', mensaje: 'Actualización de precios del café', tipo: 'sms', fecha: '2024-03-15T14:30:00Z', empresaId: 1 },
    { id: 3, emisor: 'Sistema', receptor: 'Luis Torres', mensaje: 'Nueva actividad programada', tipo: 'push', fecha: '2024-03-15T16:45:00Z', empresaId: 1 },
    { id: 4, emisor: 'Coordinador', receptor: 'María García', mensaje: 'Resultados de la cosecha', tipo: 'ambos', fecha: '2024-03-15T18:20:00Z', empresaId: 1 }
  ]);

  const filteredEmpresas = empresas.filter(empresa =>
    empresa.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    empresa.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const mensajesFiltrados = selectedEmpresa 
    ? mensajes.filter(mensaje => mensaje.empresaId === selectedEmpresa.id)
    : [];

  const filteredCaficultores = selectedEmpresa
    ? caficultores.filter(caf => caf.empresaId === selectedEmpresa.id)
    : [];

  const handleSearch = () => {
    setShowSearchModal(true);
    setSearchTerm('');
  };

  const handleSelectEmpresa = (empresa) => {
    setSelectedEmpresa(empresa);
    setShowSearchModal(false);
    setCaficultoresSeleccionados([]);
  };

  const handleGestorMensajes = () => {
    setShowGestorModal(true);
    setNuevoMensaje({
      mensaje: '',
      tipo: 'push',
      empresaId: selectedEmpresa?.id || null
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoMensaje({
      ...nuevoMensaje,
      [name]: value
    });
  };

  const handleEnviarMensaje = () => {
    if (nuevoMensaje.mensaje.trim() && caficultoresSeleccionados.length > 0) {
      // Simular envío de mensajes
      const nuevosMensajes = caficultoresSeleccionados.map(caficultor => ({
        id: Math.max(...mensajes.map(m => m.id), 0) + 1,
        emisor: 'Sistema',
        receptor: caficultor.nombre,
        mensaje: nuevoMensaje.mensaje,
        tipo: nuevoMensaje.tipo,
        fecha: new Date().toISOString(),
        empresaId: selectedEmpresa.id
      }));
      
      setMensajes([...mensajes, ...nuevosMensajes]);
      setAlertModal({ isOpen: true, type: 'success', title: 'Éxito', message: 'Mensaje enviado correctamente' });
      setShowCaficultoresModal(false);
      setCaficultoresSeleccionados([]);
      setNuevoMensaje({
        mensaje: '',
        tipo: 'push',
        empresaId: selectedEmpresa?.id || null
      });
    }
  };

  const handleSelectCaficultor = (caficultor) => {
    if (!caficultoresSeleccionados.find(c => c.id === caficultor.id)) {
      setCaficultoresSeleccionados([...caficultoresSeleccionados, caficultor]);
    }
  };

  const handleRemoveCaficultor = (id) => {
    setCaficultoresSeleccionados(caficultoresSeleccionados.filter(c => c.id !== id));
  };

  const handleLimpiarDatos = () => {
    setCaficultoresSeleccionados([]);
  };

  const handleEliminarCaficultor = (id) => {
    setCaficultores(caficultores.filter(c => c.id !== id));
    setCaficultoresSeleccionados(caficultoresSeleccionados.filter(c => c.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mensajería</h1>
          <p className="text-gray-600">Sistema de mensajería interna</p>
        </div>
      </div>

      {/* Search Section */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Búsqueda de Mensajes</h2>
        </div>
        
        <div className="p-6">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Seleccionar empresa..."
                  value={selectedEmpresa ? selectedEmpresa.nombre : ''}
                  readOnly
                  onClick={handleSearch}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 cursor-pointer hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-cafe-vino-500"
                />
              </div>
            </div>
            <button
              onClick={handleSearch}
              className="px-4 py-2 bg-cafe-vino-600 text-white rounded-lg hover:bg-cafe-vino-700 transition-colors"
            >
              Búsqueda
            </button>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-900">
            {selectedEmpresa ? `Mensajes - ${selectedEmpresa.nombre}` : 'Mensajes'}
          </h2>
          {selectedEmpresa && (
            <button
              onClick={handleGestorMensajes}
              className="flex items-center px-3 py-2 bg-cafe-vino-600 text-white rounded-lg hover:bg-cafe-vino-700 transition-colors text-sm"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Gestor de Mensajes
            </button>
          )}
        </div>
        
        <div className="p-6">
          {!selectedEmpresa ? (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No hay empresa seleccionada</h3>
              <p className="mt-1 text-sm text-gray-500">
                Usa el botón de búsqueda para seleccionar una empresa
              </p>
            </div>
          ) : mensajesFiltrados.length === 0 ? (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No hay mensajes</h3>
              <p className="mt-1 text-sm text-gray-500">
                No se encontraron mensajes para {selectedEmpresa.nombre}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Emisor
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Receptor
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Mensaje
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tipo
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fecha
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mensajesFiltrados.map((mensaje) => (
                    <tr key={mensaje.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {mensaje.emisor}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {mensaje.receptor}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 max-w-xs truncate">
                          {mensaje.mensaje}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          mensaje.tipo === 'push' 
                            ? 'bg-blue-100 text-blue-800' 
                            : mensaje.tipo === 'sms' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-purple-100 text-purple-800'
                        }`}>
                          {mensaje.tipo}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {new Date(mensaje.fecha).toLocaleString('es-CO', { 
                            day: 'numeric', 
                            month: 'short', 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Modal de Búsqueda de Empresas */}
      {showSearchModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={() => setShowSearchModal(false)}
          ></div>
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
            <div className="relative inline-block w-full bg-white rounded-2xl shadow-2xl max-w-2xl p-6 my-8 text-left align-middle transition-all transform">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold leading-6 text-gray-900">Seleccionar Empresa</h3>
                <button
                  onClick={() => setShowSearchModal(false)}
                  className="text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Buscar empresa
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      placeholder="Buscar por nombre o descripción..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cafe-vino-500 focus:border-cafe-vino-500"
                    />
                  </div>
                </div>

                <div className="max-h-64 overflow-y-auto border border-gray-200 rounded-lg">
                  {filteredEmpresas.length > 0 ? (
                    <div className="divide-y divide-gray-200">
                      {filteredEmpresas.map((empresa) => (
                        <div
                          key={empresa.id}
                          onClick={() => handleSelectEmpresa(empresa)}
                          className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {empresa.nombre}
                              </div>
                              <div className="text-xs text-gray-500">
                                NIT: {empresa.nit}
                              </div>
                              <div className="text-xs text-gray-400">
                                {empresa.descripcion}
                              </div>
                            </div>
                            <svg className="w-5 h-5 text-cafe-vino-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 text-center text-gray-500">
                      {searchTerm ? 'No se encontraron empresas' : 'No hay empresas disponibles'}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end pt-6 border-t">
                <button
                  onClick={() => setShowSearchModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 rounded-lg transition-colors"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Gestor de Mensajes */}
      {showGestorModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={() => setShowGestorModal(false)}
          ></div>
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
            <div className="relative inline-block w-full bg-white rounded-2xl shadow-2xl max-w-2xl p-6 my-8 text-left align-middle transition-all transform">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold leading-6 text-gray-900">Gestor de Mensajes</h3>
                <button
                  onClick={() => setShowGestorModal(false)}
                  className="text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mensaje
                  </label>
                  <textarea
                    name="mensaje"
                    value={nuevoMensaje.mensaje}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cafe-vino-500 focus:border-cafe-vino-500"
                    placeholder="Escribe el mensaje a enviar..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo de Mensaje
                  </label>
                  <select
                    name="tipo"
                    value={nuevoMensaje.tipo}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cafe-vino-500 focus:border-cafe-vino-500"
                  >
                    <option value="push">Push</option>
                    <option value="sms">SMS</option>
                    <option value="ambos">Ambos (SMS y Notificación Push)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Seleccionar Caficultor
                  </label>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setShowCaficultoresModal(true)}
                      className="px-4 py-2 bg-cafe-vino-600 text-white rounded-lg hover:bg-cafe-vino-700 transition-colors"
                    >
                      Seleccionar Caficultores
                    </button>
                    <div className="text-sm text-gray-500">
                      {caficultoresSeleccionados.length} caficultor(es) seleccionado(s)
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-6 border-t">
                <button
                  onClick={() => setShowGestorModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 rounded-lg transition-colors"
                >
                  Cerrar
                </button>
                <button
                  onClick={handleEnviarMensaje}
                  disabled={!nuevoMensaje.mensaje.trim() || caficultoresSeleccionados.length === 0}
                  className="px-4 py-2 bg-cafe-vino-600 text-white rounded-lg hover:bg-cafe-vino-700 disabled:bg-gray-400 transition-colors"
                >
                  Enviar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Selección de Caficultores */}
      {showCaficultoresModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={() => setShowCaficultoresModal(false)}
          ></div>
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
            <div className="relative inline-block w-full bg-white rounded-2xl shadow-2xl max-w-4xl p-6 my-8 text-left align-middle transition-all transform">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold leading-6 text-gray-900">Seleccionar Caficultores</h3>
                <button
                  onClick={() => setShowCaficultoresModal(false)}
                  className="text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Lista de Caficultores Disponibles */}
              <div className="max-h-64 overflow-y-auto border border-gray-200 rounded-lg mb-4">
                {filteredCaficultores.length > 0 ? (
                  <div className="divide-y divide-gray-200">
                    {filteredCaficultores.map((caficultor) => (
                      <div
                        key={caficultor.id}
                        onClick={() => handleSelectCaficultor(caficultor)}
                        className={`p-3 hover:bg-gray-50 cursor-pointer transition-colors ${
                          caficultoresSeleccionados.find(c => c.id === caficultor.id) 
                            ? 'bg-cafe-vino-50 border-l-4 border-l-cafe-vino-600' 
                            : 'hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {caficultor.nombre}
                            </div>
                            <div className="text-xs text-gray-500">
                              {caficultor.telefono}
                            </div>
                            <div className="text-xs text-gray-400">
                              {caficultor.accion}
                            </div>
                          </div>
                          <svg className="w-5 h-5 text-cafe-vino-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0h6" />
                          </svg>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center text-gray-500">
                    No hay caficultores disponibles
                  </div>
                )}
              </div>

              {/* Caficultores Seleccionados */}
              {caficultoresSeleccionados.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Caficultores Seleccionados ({caficultoresSeleccionados.length})</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                            Nombre
                          </th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                            Teléfono
                          </th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                            Acción
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {caficultoresSeleccionados.map((caficultor) => (
                          <tr key={caficultor.id}>
                            <td className="px-4 py-2 text-sm text-gray-900">
                              {caficultor.nombre}
                            </td>
                            <td className="px-4 py-2 text-sm text-gray-900">
                              {caficultor.telefono}
                            </td>
                            <td className="px-4 py-2 text-sm">
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => handleEliminarCaficultor(caficultor.id)}
                                  className="text-red-600 hover:text-red-800 text-sm font-medium"
                                >
                                  Eliminar
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Botones */}
              <div className="flex justify-between space-x-3 pt-6 border-t">
                <button
                  onClick={handleLimpiarDatos}
                  className="px-4 py-2 border border-red-300 text-red-700 bg-white hover:bg-red-50 rounded-lg transition-colors"
                >
                  Limpiar Datos
                </button>
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowCaficultoresModal(false)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    Cerrar
                  </button>
                  <button
                    onClick={handleEnviarMensaje}
                    disabled={!nuevoMensaje.mensaje.trim() || caficultoresSeleccionados.length === 0}
                    className="px-4 py-2 bg-cafe-vino-600 text-white rounded-lg hover:bg-cafe-vino-700 disabled:bg-gray-400 transition-colors"
                  >
                    Enviar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <ActionModal
        isOpen={alertModal.isOpen}
        onClose={() => setAlertModal({ ...alertModal, isOpen: false })}
        onAction={() => setAlertModal({ ...alertModal, isOpen: false })}
        title={alertModal.title}
        description={alertModal.message}
        actionText="Aceptar"
        cancelText={null}
        icon={alertModal.type}
        actionColor="primary"
      />
    </div>
  );
};

export default Mensajeria;
