import React, { useState } from 'react';
import { Card, Button, ActionModal } from '../../components';
import { useAuthHook } from '../../hooks/useAuth';

const Dashboard = () => {
  const { user, getGreeting, getRoleName } = useAuthHook();
  
  // Estados para los modales del dashboard
  const [showNuevaActividadModal, setShowNuevaActividadModal] = useState(false);
  const [showAgregarCaficultorModal, setShowAgregarCaficultorModal] = useState(false);
  const [showCrearCaficultorModal, setShowCrearCaficultorModal] = useState(false);
  const [selectedGrupo, setSelectedGrupo] = useState('');
  const [actividadData, setActividadData] = useState({
    nombreActividad: '',
    nombreCalendario: '',
    descripcion: ''
  });
  const [alertModal, setAlertModal] = useState({ isOpen: false, type: 'info', title: '', message: '' });

  // Datos ficticios de grupos de caficultores
  const [gruposCaficultores] = useState([
    { id: 1, nombre: 'Grupo Norte', descripcion: 'Caficultores de la zona norte' },
    { id: 2, nombre: 'Grupo Sur', descripcion: 'Caficultores de la zona sur' },
    { id: 3, nombre: 'Grupo Central', descripcion: 'Caficultores de la zona central' }
  ]);

  // Datos del formulario para crear caficultor (igual al de la página de caficultores)
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    cedula: '',
    telefono: '',
    genero: '',
    estadoCivil: '',
    numeroHijos: '',
    fechaNacimiento: '',
    pais: '',
    contraseña: ''
  });

  const stats = [
    {
      title: 'Total Caficultores',
      value: '156',
      change: '+12%',
      changeType: 'positive',
      icon: (
        <svg className="w-8 h-8 text-cafe-vino-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      title: 'Fincas Activas',
      value: '89',
      change: '+5%',
      changeType: 'positive',
      icon: (
        <svg className="w-8 h-8 text-cafe-vino-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      title: 'Producción Mensual',
      value: '2,450 kg',
      change: '+8%',
      changeType: 'positive',
      icon: (
        <svg className="w-8 h-8 text-cafe-vino-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
    },
    {
      title: 'Actividades Programadas',
      value: '23',
      change: '-2%',
      changeType: 'negative',
      icon: (
        <svg className="w-8 h-8 text-cafe-vino-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
  ];

  const recentActivities = [
    {
      id: 1,
      title: 'Visita técnica - Finca El Paraíso',
      description: 'Inspección de cultivos y evaluación de suelo',
      time: 'Hoy',
      type: 'visita',
      status: 'completed',
      user: 'Carlos Rodríguez'
    },
    {
      id: 2,
      title: 'Capacitación - Buenas Prácticas',
      description: 'Taller sobre manejo de plagas orgánicas',
      time: 'Ayer',
      type: 'capacitacion',
      status: 'completed',
      user: 'María González'
    },
    {
      id: 3,
      title: 'Capacitación - Manejo de plagas',
      description: 'Control integrado de enfermedades del café',
      time: 'Ayer',
      type: 'capacitacion',
      status: 'completed',
      user: 'Juan Pérez'
    },
    {
      id: 4,
      title: 'Inspección - Calidad de café',
      description: 'Evaluación de calidad de grano verde',
      time: 'Hace 2 días',
      type: 'inspeccion',
      status: 'pending',
      user: 'Ana López'
    },
  ];

  const upcomingActivities = [
    {
      id: 1,
      title: 'Visita técnica programada',
      description: 'Finca La Esperanza - Mañana 9:00 AM',
      type: 'visita',
      priority: 'high'
    },
    {
      id: 2,
      title: 'Capacitación sobre fertilización',
      description: 'Viernes 2:00 PM - Centro de acopio',
      type: 'capacitacion',
      priority: 'medium'
    },
    {
      id: 3,
      title: 'Reunión mensual',
      description: 'Próximo lunes 10:00 AM',
      type: 'reunion',
      priority: 'low'
    }
  ];

  // COMPONENTE 1: LOTES EN RIESGO (Alertas Inteligentes)
  const lotesEnRiesgo = [
    { id: 101, finca: 'El Refugio', lote: 'Lote A2', riesgo: 'alto', motivo: 'Brote de Roya > 15%', productor: 'Juan Pérez', ubicacion: 'Huila - Pitalito' },
    { id: 102, finca: 'La Esperanza', lote: 'Lote B1', riesgo: 'alto', motivo: 'Incidencia de Broca', productor: 'María Gómez', ubicacion: 'Huila - San Agustín' },
  ];

  // Funciones para manejar los modales
  const handleNuevaActividad = () => {
    setShowNuevaActividadModal(true);
  };

  const handleAgregarCaficultor = () => {
    setShowAgregarCaficultorModal(true);
  };

  const handleCrearCaficultor = () => {
    setShowAgregarCaficultorModal(false);
    setShowCrearCaficultorModal(true);
  };

  const handleAgregarExistente = () => {
    // Lógica para agregar caficultor existente a grupo
    setAlertModal({ isOpen: true, type: 'info', title: 'Info', message: 'Funcionalidad para agregar caficultor existente a grupo' });
    setShowAgregarCaficultorModal(false);
  };

  const handleAsignarActividad = () => {
    if (!actividadData.nombreActividad || !actividadData.descripcion || !selectedGrupo) {
      setAlertModal({ isOpen: true, type: 'danger', title: 'Error', message: 'Por favor complete todos los campos' });
      return;
    }

    // Simulación de asignación
    setAlertModal({ isOpen: true, type: 'success', title: 'Éxito', message: `Actividad "${actividadData.nombreActividad}" asignada al grupo ${selectedGrupo}` });
    
    // Limpiar y cerrar
    setActividadData({
      nombreActividad: '',
      nombreCalendario: '',
      descripcion: ''
    });
    setSelectedGrupo('');
    setShowNuevaActividadModal(false);
  };

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const handleActividadChange = (field, value) => {
    setActividadData({
      ...actividadData,
      [field]: value
    });
  };

  const handleSaveCaficultor = () => {
    // Validación básica
    if (!formData.nombre || !formData.email || !formData.cedula) {
      setAlertModal({ isOpen: true, type: 'danger', title: 'Error', message: 'Por favor complete los campos obligatorios' });
      return;
    }

    // Simulación de guardado
    setAlertModal({ isOpen: true, type: 'success', title: 'Éxito', message: 'Caficultor creado correctamente' });
    
    // Limpiar y cerrar
    setFormData({
      nombre: '',
      email: '',
      cedula: '',
      telefono: '',
      genero: '',
      estadoCivil: '',
      numeroHijos: '',
      fechaNacimiento: '',
      pais: '',
      contraseña: ''
    });
    setShowCrearCaficultorModal(false);
  };

  const getActivityIcon = (type) => {
    const icons = {
      visita: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      capacitacion: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 19 7.5 19s3.332-.523 4.5-1.747V6.253z" />
        </svg>
      ),
      inspeccion: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      reunion: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    };
    return icons[type] || icons.visita;
  };

  const getStatusColor = (status) => {
    const colors = {
      completed: 'text-green-600 bg-green-100',
      pending: 'text-yellow-600 bg-yellow-100',
      cancelled: 'text-red-600 bg-red-100',
    };
    return colors[status] || colors.pending;
  };

  const getPriorityColor = (priority) => {
    const colors = {
      high: 'border-cafe-vino-200 bg-cafe-vino-50',
      medium: 'border-coffee-200 bg-coffee-50',
      low: 'border-gray-200 bg-gray-50',
    };
    return colors[priority] || colors.low;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          {getGreeting()}
        </h1>
        <p className="text-gray-600">
          {getRoleName()} - {user?.empresa}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                {stat.icon}
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    {stat.title}
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {stat.value}
                    </div>
                    {stat.change && (
                      <div
                        className={`ml-2 flex items-baseline text-sm font-semibold ${
                          stat.changeType === 'positive'
                            ? 'text-green-600'
                            : 'text-red-600'
                        }`}
                      >
                        {stat.changeType === 'positive' ? (
                          <svg
                            className="h-4 w-4 flex-shrink-0"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 001.414-1.414l-4-4a1 1 0 00-1.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="h-4 w-4 flex-shrink-0"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M14.707 10.293a1 1 0 010-1.414l-4-4a1 1 0 00-1.414 0l-4 4a1 1 0 111.414 1.414l4-4a1 1 0 001.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                        <span className="sr-only">
                          {stat.changeType === 'positive' ? 'Increased' : 'Decreased'}
                        </span>
                        {stat.change}
                      </div>
                    )}
                  </dd>
                </dl>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* COMPONENTE 1: ALERTAS INTELIGENTES (Lotes en riesgo) */}
      <div className="bg-red-50 border border-red-200 rounded-xl overflow-hidden shadow-sm">
        <div className="bg-red-500 text-white px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
            <h3 className="font-bold">Atención Requerida: Lotes en Riesgo Fitosanitario</h3>
          </div>
          <span className="bg-white text-red-600 text-xs font-bold px-2 py-1 rounded-full">{lotesEnRiesgo.length} Alertas</span>
        </div>
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {lotesEnRiesgo.map(lote => (
            <div key={lote.id} className="bg-white p-4 rounded-lg border border-red-100 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-gray-900">{lote.finca} - {lote.lote}</h4>
                  <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-semibold rounded-full">{lote.motivo}</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">Caficultor: {lote.productor} • {lote.ubicacion}</p>
              </div>
              <button 
                onClick={() => setAlertModal({ isOpen: true, type: 'info', title: 'Agendar Visita', message: `Agendando visita de emergencia para ${lote.finca} de ${lote.productor}.` })}
                className="text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-md transition-colors"
              >
                Agendar Visita
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <div className="lg:col-span-2">
          <Card title="Actividades Recientes">
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                >
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${getStatusColor(
                    activity.status
                  )}`}>
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {activity.title}
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      {activity.description}
                    </p>
                    <div className="flex items-center mt-1 space-x-2">
                      <span className="text-xs text-gray-500">
                        {activity.time}
                      </span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-500">
                        {activity.user}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="lg:col-span-1">
          <Card title="Acciones Rápidas">
            <div className="space-y-4">
              <button 
                onClick={handleNuevaActividad}
                className="w-full p-4 bg-cafe-vino-600 text-white rounded-lg hover:bg-cafe-vino-700 transition-colors flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span className="text-sm font-medium">Nueva Actividad</span>
              </button>
              <button 
                onClick={handleAgregarCaficultor}
                className="w-full p-4 bg-coffee-600 text-white rounded-lg hover:bg-coffee-700 transition-colors flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="text-sm font-medium">Agregar Caficultor</span>
              </button>
              <button className="w-full p-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <span className="text-sm font-medium">Ver Estadísticas</span>
              </button>
            </div>
          </Card>

          {/* Upcoming Activities */}
          <Card title="Próximas Actividades" className="mt-6">
            <div className="space-y-3">
              {upcomingActivities.map((activity) => (
                <div
                  key={activity.id}
                  className={`p-3 rounded-lg border ${getPriorityColor(
                    activity.priority
                  )}`}
                >
                  <h4 className="font-medium text-gray-900">
                    {activity.title}
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {activity.description}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Modal Nueva Actividad */}
      {showNuevaActividadModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={() => setShowNuevaActividadModal(false)}
          ></div>
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
            <div className="relative inline-block w-full bg-white rounded-2xl shadow-2xl max-w-2xl p-6 my-8 text-left align-middle transition-all transform">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold leading-6 text-gray-900">Nueva Actividad</h3>
                <button
                  onClick={() => setShowNuevaActividadModal(false)}
                  className="text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Formulario de Actividad */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Seleccionar Grupo de Caficultores
                  </label>
                  <select
                    value={selectedGrupo}
                    onChange={(e) => setSelectedGrupo(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cafe-vino-500 focus:border-cafe-vino-500"
                  >
                    <option value="">Seleccionar grupo...</option>
                    {gruposCaficultores.map((grupo) => (
                      <option key={grupo.id} value={grupo.nombre}>
                        {grupo.nombre}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre de la Actividad
                  </label>
                  <input
                    type="text"
                    value={actividadData.nombreActividad}
                    onChange={(e) => handleActividadChange('nombreActividad', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cafe-vino-500 focus:border-cafe-vino-500"
                    placeholder="Ej: Capacitación sobre fertilización"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre del Calendario
                  </label>
                  <input
                    type="text"
                    value={actividadData.nombreCalendario}
                    onChange={(e) => handleActividadChange('nombreCalendario', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cafe-vino-500 focus:border-cafe-vino-500"
                    placeholder="Ej: Capacitación Marzo 2024"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descripción
                  </label>
                  <textarea
                    value={actividadData.descripcion}
                    onChange={(e) => handleActividadChange('descripcion', e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cafe-vino-500 focus:border-cafe-vino-500"
                    placeholder="Describe los detalles de la actividad..."
                  />
                </div>

                {selectedGrupo && (
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">Grupo Seleccionado</h4>
                    <p className="text-sm text-blue-800">
                      Se asignará esta actividad al grupo: <strong>{selectedGrupo}</strong>
                    </p>
                  </div>
                )}
              </div>

              {/* Botones */}
              <div className="flex justify-end space-x-3 pt-6 border-t">
                <button
                  onClick={() => setShowNuevaActividadModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 rounded-lg transition-colors"
                >
                  Cerrar
                </button>
                <button
                  onClick={handleAsignarActividad}
                  className="px-4 py-2 bg-cafe-vino-600 text-white rounded-lg hover:bg-cafe-vino-700 transition-colors"
                >
                  Asignar y Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Agregar Caficultor */}
      {showAgregarCaficultorModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={() => setShowAgregarCaficultorModal(false)}
          ></div>
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
            <div className="relative inline-block w-full bg-white rounded-2xl shadow-2xl max-w-md p-6 my-8 text-left align-middle transition-all transform">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold leading-6 text-gray-900">Agregar Caficultor</h3>
                <button
                  onClick={() => setShowAgregarCaficultorModal(false)}
                  className="text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <button
                  onClick={handleCrearCaficultor}
                  className="w-full p-4 bg-cafe-vino-600 text-white rounded-lg hover:bg-cafe-vino-700 transition-colors flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <span className="text-sm font-medium">Crear Nuevo Caficultor</span>
                </button>

                <button
                  onClick={handleAgregarExistente}
                  className="w-full p-4 bg-coffee-600 text-white rounded-lg hover:bg-coffee-700 transition-colors flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span className="text-sm font-medium">Agregar Caficultor Existente</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Crear Caficultor (Mismo que en la página de caficultores) */}
      {showCrearCaficultorModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={() => setShowCrearCaficultorModal(false)}
          ></div>

          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
            <div className="relative inline-block w-full bg-white rounded-2xl shadow-2xl max-w-2xl p-6 my-8 text-left align-middle transition-all transform">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold leading-6 text-gray-900">
                  Crear Caficultor
                </h3>
                <button
                  onClick={() => setShowCrearCaficultorModal(false)}
                  className="text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Formulario */}
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Nombre Completo */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre Completo *
                    </label>
                    <input
                      type="text"
                      value={formData.nombre}
                      onChange={(e) => handleInputChange('nombre', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cafe-vino-500 focus:border-cafe-vino-500"
                      placeholder="Juan Pérez"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cafe-vino-500 focus:border-cafe-vino-500"
                      placeholder="caficultor@ejemplo.com"
                    />
                  </div>

                  {/* Cédula de Ciudadanía */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cédula de Ciudadanía *
                    </label>
                    <input
                      type="text"
                      value={formData.cedula}
                      onChange={(e) => handleInputChange('cedula', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cafe-vino-500 focus:border-cafe-vino-500"
                      placeholder="123456789"
                    />
                  </div>

                  {/* Teléfono */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      value={formData.telefono}
                      onChange={(e) => handleInputChange('telefono', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cafe-vino-500 focus:border-cafe-vino-500"
                      placeholder="+57 300 123 4567"
                    />
                  </div>

                  {/* Género */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Género
                    </label>
                    <select
                      value={formData.genero}
                      onChange={(e) => handleInputChange('genero', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cafe-vino-500 focus:border-cafe-vino-500"
                    >
                      <option value="">Seleccionar...</option>
                      <option value="masculino">Masculino</option>
                      <option value="femenino">Femenino</option>
                      <option value="otro">Otro</option>
                    </select>
                  </div>

                  {/* Estado Civil */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Estado Civil
                    </label>
                    <select
                      value={formData.estadoCivil}
                      onChange={(e) => handleInputChange('estadoCivil', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cafe-vino-500 focus:border-cafe-vino-500"
                    >
                      <option value="">Seleccionar...</option>
                      <option value="soltero">Soltero</option>
                      <option value="casado">Casado</option>
                      <option value="divorciado">Divorciado</option>
                      <option value="viudo">Viudo</option>
                      <option value="union-libre">Unión Libre</option>
                    </select>
                  </div>

                  {/* Número de Hijos */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Número de Hijos
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={formData.numeroHijos}
                      onChange={(e) => handleInputChange('numeroHijos', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cafe-vino-500 focus:border-cafe-vino-500"
                      placeholder="0"
                    />
                  </div>

                  {/* Fecha de Nacimiento */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fecha de Nacimiento
                    </label>
                    <input
                      type="date"
                      value={formData.fechaNacimiento}
                      onChange={(e) => handleInputChange('fechaNacimiento', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cafe-vino-500 focus:border-cafe-vino-500"
                    />
                  </div>

                  {/* País */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      País
                    </label>
                    <input
                      type="text"
                      value={formData.pais}
                      onChange={(e) => handleInputChange('pais', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cafe-vino-500 focus:border-cafe-vino-500"
                      placeholder="Colombia"
                    />
                  </div>

                  {/* Contraseña */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contraseña
                    </label>
                    <input
                      type="password"
                      value={formData.contraseña}
                      onChange={(e) => handleInputChange('contraseña', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cafe-vino-500 focus:border-cafe-vino-500"
                      placeholder="••••••••••"
                    />
                  </div>
                </div>
              </div>

              {/* Botones */}
              <div className="flex justify-end space-x-3 pt-6 border-t">
                <button
                  onClick={() => setShowCrearCaficultorModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 rounded-lg transition-colors"
                >
                  Cerrar
                </button>
                <button
                  onClick={handleSaveCaficultor}
                  className="px-4 py-2 bg-cafe-vino-600 text-white rounded-lg hover:bg-cafe-vino-700 transition-colors"
                >
                  Crear
                </button>
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

export default Dashboard;
