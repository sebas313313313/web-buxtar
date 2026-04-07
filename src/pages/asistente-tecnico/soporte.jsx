import React, { useState } from 'react';
import { ActionModal } from '../../components';

const Soporte = () => {
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [alertModal, setAlertModal] = useState({ isOpen: false, type: 'info', title: '', message: '' });
  const [selectedCategory, setSelectedCategory] = useState('');
  const [ticketData, setTicketData] = useState({
    asunto: '',
    descripcion: '',
    prioridad: 'media',
    categoria: '',
    email: '',
    telefono: ''
  });

  // Datos ficticios de tickets
  const [tickets] = useState([
    {
      id: 1,
      asunto: 'Problema con acceso al sistema',
      descripcion: 'No puedo ingresar a mi cuenta desde ayer',
      categoria: 'Acceso',
      prioridad: 'Alta',
      estado: 'En Progreso',
      fecha: '2024-03-15',
      usuario: 'Carlos Rodríguez',
      email: 'carlos@email.com',
      telefono: '+57 300 1234567',
      respuesta: 'Estamos revisando el problema. Le contactaremos pronto.'
    },
    {
      id: 2,
      asunto: 'Error en reporte de producción',
      descripcion: 'Los datos del reporte no coinciden con los reales',
      categoria: 'Reportes',
      prioridad: 'Media',
      estado: 'Resuelto',
      fecha: '2024-03-14',
      usuario: 'Ana López',
      email: 'ana@email.com',
      telefono: '+57 300 2345678',
      respuesta: 'El error ha sido corregido. Por favor verifique nuevamente.'
    },
    {
      id: 3,
      asunto: 'Duda sobre pronóstico de cosecha',
      descripcion: 'Necesito ayuda para interpretar los resultados del pronóstico',
      categoria: 'Asesoría',
      prioridad: 'Baja',
      estado: 'Pendiente',
      fecha: '2024-03-13',
      usuario: 'Luis Torres',
      email: 'luis@email.com',
      telefono: '+57 300 3456789',
      respuesta: null
    }
  ]);

  const categories = [
    { id: 'acceso', name: 'Acceso y Cuentas', icon: '🔐' },
    { id: 'reportes', name: 'Reportes y Estadísticas', icon: '📊' },
    { id: 'asesoria', name: 'Asesoría Técnica', icon: '💡' },
    { id: 'sistema', name: 'Problemas del Sistema', icon: '⚙️' },
    { id: 'mejoras', name: 'Sugerencias y Mejoras', icon: '💭' },
    { id: 'otros', name: 'Otros', icon: '📝' }
  ];

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    setTicketData(prev => ({ ...prev, categoria: categoryId }));
  };

  const handleSubmitTicket = (e) => {
    e.preventDefault();
    
    // Validación básica
    if (!ticketData.asunto || !ticketData.descripcion || !ticketData.categoria) {
      setAlertModal({ isOpen: true, type: 'danger', title: 'Error', message: 'Por favor complete todos los campos requeridos' });
      return;
    }

    // Simulación de envío
    setAlertModal({ isOpen: true, type: 'success', title: 'Éxito', message: 'Ticket enviado correctamente. Nos pondremos en contacto pronto.' });
    setShowTicketModal(false);
    setTicketData({
      asunto: '',
      descripcion: '',
      prioridad: 'media',
      categoria: '',
      email: '',
      telefono: ''
    });
    setSelectedCategory('');
  };

  const getPriorityColor = (prioridad) => {
    switch(prioridad) {
      case 'Alta': return 'bg-red-100 text-red-800';
      case 'Media': return 'bg-yellow-100 text-yellow-800';
      case 'Baja': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (estado) => {
    switch(estado) {
      case 'En Progreso': return 'bg-blue-100 text-blue-800';
      case 'Resuelto': return 'bg-green-100 text-green-800';
      case 'Pendiente': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-CO');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Soporte</h1>
          <p className="text-gray-600">Centro de ayuda y soporte técnico</p>
        </div>
        <button
          onClick={() => setShowTicketModal(true)}
          className="px-4 py-2 bg-cafe-vino-600 text-white rounded-lg hover:bg-cafe-vino-700 transition-colors"
        >
          Crear Ticket
        </button>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                <span className="text-lg">📚</span>
              </div>
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Guías y Tutoriales</dt>
                <dd className="text-lg font-medium text-gray-900">12 disponibles</dd>
              </dl>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                <span className="text-lg">💬</span>
              </div>
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Chat en Vivo</dt>
                <dd className="text-lg font-medium text-gray-900">Disponible</dd>
              </dl>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center">
                <span className="text-lg">📞</span>
              </div>
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Soporte Telefónico</dt>
                <dd className="text-lg font-medium text-gray-900">+57 1 234 5678</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Preguntas Frecuentes</h2>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">¿Cómo restablecer mi contraseña?</h4>
              <p className="text-sm text-gray-600">
                Haz clic en "¿Olvidaste tu contraseña?" en la página de login, ingresa tu email y sigue las instrucciones que recibirás.
              </p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">¿Cómo generar un pronóstico de cosecha?</h4>
              <p className="text-sm text-gray-600">
                Ve a la sección "Pronóstico de Cosecha", selecciona un grupo de caficultores, elige un caficultor y configura los parámetros del modelo.
              </p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">¿Qué hacer si los datos no se actualizan?</h4>
              <p className="text-sm text-gray-600">
                Refresca la página o limpia el caché del navegador. Si el problema persiste, contacta al soporte técnico.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tickets Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Mis Tickets</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Asunto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Categoría
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Prioridad
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tickets.map((ticket) => (
                <tr key={ticket.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">#{ticket.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{ticket.asunto}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{ticket.categoria}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(ticket.prioridad)}`}>
                      {ticket.prioridad}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(ticket.estado)}`}>
                      {ticket.estado}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{formatDate(ticket.fecha)}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Crear Ticket */}
      {showTicketModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={() => setShowTicketModal(false)}
          ></div>
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
            <div className="relative inline-block w-full bg-white rounded-2xl shadow-2xl max-w-2xl p-6 my-8 text-left align-middle transition-all transform">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold leading-6 text-gray-900">Crear Nuevo Ticket</h3>
                <button
                  onClick={() => setShowTicketModal(false)}
                  className="text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmitTicket}>
                {/* Categoría Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Selecciona una categoría
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {categories.map((category) => (
                      <div
                        key={category.id}
                        onClick={() => handleCategorySelect(category.id)}
                        className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                          selectedCategory === category.id
                            ? 'border-cafe-vino-500 bg-cafe-vino-50'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        <div className="text-center">
                          <div className="text-2xl mb-1">{category.icon}</div>
                          <div className="text-xs font-medium">{category.name}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Asunto *
                    </label>
                    <input
                      type="text"
                      value={ticketData.asunto}
                      onChange={(e) => setTicketData(prev => ({ ...prev, asunto: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cafe-vino-500 focus:border-cafe-vino-500"
                      placeholder="Describe brevemente tu problema"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Prioridad
                    </label>
                    <select
                      value={ticketData.prioridad}
                      onChange={(e) => setTicketData(prev => ({ ...prev, prioridad: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cafe-vino-500 focus:border-cafe-vino-500"
                    >
                      <option value="Baja">Baja</option>
                      <option value="Media">Media</option>
                      <option value="Alta">Alta</option>
                    </select>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descripción *
                  </label>
                  <textarea
                    value={ticketData.descripcion}
                    onChange={(e) => setTicketData(prev => ({ ...prev, descripcion: e.target.value }))}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cafe-vino-500 focus:border-cafe-vino-500"
                    placeholder="Describe detalladamente tu problema o consulta"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={ticketData.email}
                      onChange={(e) => setTicketData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cafe-vino-500 focus:border-cafe-vino-500"
                      placeholder="tu@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      value={ticketData.telefono}
                      onChange={(e) => setTicketData(prev => ({ ...prev, telefono: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cafe-vino-500 focus:border-cafe-vino-500"
                      placeholder="+57 300 000 0000"
                    />
                  </div>
                </div>

                {/* Contact Info */}
                <div className="bg-blue-50 p-4 rounded-lg mb-6">
                  <h4 className="font-medium text-blue-900 mb-2">Información de Contacto</h4>
                  <div className="text-sm text-blue-800">
                    <p>📧 Email: soporte@cafetero.com</p>
                    <p>📞 Teléfono: +57 1 234 5678</p>
                    <p>💬 Chat: Disponible de 8am a 6pm</p>
                    <p>📍 Oficina: Calle 123 #45-67, Medellín</p>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowTicketModal(false)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-cafe-vino-600 text-white rounded-lg hover:bg-cafe-vino-700 transition-colors"
                  >
                    Enviar Ticket
                  </button>
                </div>
              </form>
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

export default Soporte;
