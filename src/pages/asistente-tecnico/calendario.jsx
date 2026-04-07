import React, { useState } from 'react';
import { ActionModal } from '../../components';

const Calendario = () => {
  const [showTipoActividadesModal, setShowTipoActividadesModal] = useState(false);
  const [showAsignarModal, setShowAsignarModal] = useState(false);
  const [showCrearModal, setShowCrearModal] = useState(false);
  const [selectedGrupo, setSelectedGrupo] = useState(null);
  const [grupoSearchTerm, setGrupoSearchTerm] = useState('');
  const [asignarSearchTerm, setAsignarSearchTerm] = useState('');
  const [selectedCalendario, setSelectedCalendario] = useState(null);
  const [selectedCalendarios, setSelectedCalendarios] = useState([]);
  const [alertModal, setAlertModal] = useState({ isOpen: false, type: 'info', title: '', message: '' });
  
  // Estados para el modal de crear calendario
  const [nuevoCalendario, setNuevoCalendario] = useState({
    nombre: '',
    descripcion: ''
  });
  
  // Estados para los datos
  const [gruposCaficultores, setGruposCaficultores] = useState([
    { 
      id: 1, 
      nombre: 'Grupo Test Colombia', 
      descripcion: 'Grupo experimental de prueba en Colombia',
      caficultores: ['Carlos Rodríguez', 'Ana López', 'Luis Torres', 'María García'],
      zona: 'Zona Norte',
      actividades: [], // Sin actividades inicialmente
      calendarios: [] // Sin calendarios inicialmente
    },
    { 
      id: 2, 
      nombre: 'Grupo Mis Ciencias Post Cosecha', 
      descripcion: 'Grupo especializado en ciencias post cosecha',
      caficultores: ['Pedro Gómez', 'Diego Herrera', 'Sofía Castro'],
      zona: 'Zona Centro',
      actividades: [], // Sin actividades inicialmente
      calendarios: [] // Sin calendarios inicialmente
    },
    { 
      id: 3, 
      nombre: 'Grupo 2025 Prueba Agrónoma', 
      descripcion: 'Grupo de prueba para nuevos agrónomos 2025',
      caficultores: ['José Martínez', 'Carmen Soto', 'Roberto Silva'],
      zona: 'Zona Sur',
      actividades: [], // Sin actividades inicialmente
      calendarios: [] // Sin calendarios inicialmente
    },
    { 
      id: 4, 
      nombre: 'Grupo de Prueba 1', 
      descripcion: 'Primer grupo de prueba del sistema',
      caficultores: ['Laura Mendoza', 'Miguel Ángel', 'Patricia Ruiz'],
      zona: 'Zona Este',
      actividades: [], // Sin actividades inicialmente
      calendarios: [] // Sin calendarios inicialmente
    },
    { 
      id: 5, 
      nombre: 'Grupo de Sujetos', 
      descripcion: 'Grupo de sujetos para estudios de investigación',
      caficultores: ['Juan Pérez', 'María González', 'Carlos Silva'],
      zona: 'Zona Mixta',
      actividades: [], // Sin actividades inicialmente
      calendarios: [] // Sin calendarios inicialmente
    },
    { 
      id: 6, 
      nombre: 'Grupo Control', 
      descripcion: 'Grupo de control para experimentos',
      caficultores: ['Ana Torres', 'Luis Castro', 'Sofía Martínez'],
      zona: 'Zona Variada',
      actividades: [], // Sin actividades inicialmente
      calendarios: [] // Sin calendarios inicialmente
    },
  ]);

  // Calendarios disponibles para asignar
  const [calendariosDisponibles, setCalendariosDisponibles] = useState([
    { 
      id: 1, 
      nombre: 'Calendario Perjusa', 
      descripcion: 'Calendario para actividades de prueba',
      tipo: 'Prueba',
      zona: 'Zona Norte',
      periodo: '2022',
      responsable: 'Test Colombia'
    },
    { 
      id: 2, 
      nombre: 'Calendario Colombia Test 1', 
      descripcion: 'Calendario principal de pruebas Colombia',
      tipo: 'Producción',
      zona: 'Zona Centro',
      periodo: '2025',
      responsable: 'Test Colombia'
    },
    { 
      id: 3, 
      nombre: 'Calendario Colombia Test 2', 
      descripcion: 'Calendario secundario de pruebas Colombia',
      tipo: 'Experimental',
      zona: 'Zona Sur',
      periodo: '2025',
      responsable: 'Test Colombia'
    },
    { 
      id: 4, 
      nombre: 'Grupo Perjusa 2022', 
      descripcion: 'Calendario histórico del grupo Perjusa',
      tipo: 'Histórico',
      zona: 'Zona Este',
      periodo: '2022',
      responsable: 'Copia y Prueba Agropecuaria'
    },
    { 
      id: 5, 
      nombre: 'Calendario de Validación', 
      descripcion: 'Calendario para validación de procesos',
      tipo: 'Validación',
      zona: 'Zona Variada',
      periodo: '2025',
      responsable: 'Test Colombia'
    },
    { 
      id: 6, 
      nombre: 'Calendario de Monitoreo', 
      descripcion: 'Calendario para monitoreo continuo',
      tipo: 'Monitoreo',
      zona: 'Zona Mixta',
      periodo: '2025',
      responsable: 'Test Colombia'
    },
  ]);

  const [tiposActividades, setTiposActividades] = useState([
    { id: 1, nombre: 'Pronóstico de Cosecha', categoria: 'Pre Cosecha', data: 'pronostico' },
    { id: 2, nombre: 'Control de Roya', categoria: 'Agricultura', data: 'roya' },
    { id: 3, nombre: 'Fertilización', categoria: 'Agricultura', data: 'fertilizacion' },
    { id: 4, nombre: 'Recolección', categoria: 'Cosecha', data: 'recoleccion' },
    { id: 5, nombre: 'Secado', categoria: 'Post Cosecha', data: 'secado' },
    { id: 6, nombre: 'Clasificación', categoria: 'Post Cosecha', data: 'clasificacion' },
  ]);

  const filteredGrupos = gruposCaficultores.filter(g =>
    g.nombre.toLowerCase().includes(grupoSearchTerm.toLowerCase()) ||
    g.descripcion.toLowerCase().includes(grupoSearchTerm.toLowerCase()) ||
    g.zona.toLowerCase().includes(grupoSearchTerm.toLowerCase())
  );

  const filteredCalendarios = calendariosDisponibles.filter(calendario =>
    !selectedGrupo?.calendarios?.find(c => c.id === calendario.id) &&
    calendario.nombre.toLowerCase().includes(asignarSearchTerm.toLowerCase())
  );

  const handleDeleteTipoActividad = (id) => {
    setTiposActividades(tiposActividades.filter(t => t.id !== id));
  };

  const handleAsignar = () => {
    setShowAsignarModal(true);
    setSelectedCalendarios([]);
    setAsignarSearchTerm('');
    setSelectedCalendario(null);
  };

  const handleCrear = () => {
    setShowCrearModal(true);
    setNuevoCalendario({
      nombre: '',
      descripcion: ''
    });
  };

  const handleCrearCalendario = () => {
    if (nuevoCalendario.nombre.trim() && nuevoCalendario.descripcion.trim()) {
      // Agregar nuevo calendario a la lista de disponibles
      const nuevoCalendarioCompleto = {
        id: Math.max(...calendariosDisponibles.map(c => c.id), 0) + 1,
        ...nuevoCalendario,
        tipo: 'Producción',
        zona: 'Zona Norte',
        periodo: '2025',
        responsable: 'Test Colombia'
      };
      
      setCalendariosDisponibles([...calendariosDisponibles, nuevoCalendarioCompleto]);
      
      // Limpiar formulario
      setNuevoCalendario({
        nombre: '',
        descripcion: ''
      });
      
      setShowCrearModal(false);
      setAlertModal({ isOpen: true, type: 'success', title: 'Éxito', message: 'Calendario creado exitosamente' });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoCalendario({
      ...nuevoCalendario,
      [name]: value
    });
  };

  const handleSelectCalendario = (calendario) => {
    if (!selectedCalendarios.find(c => c.id === calendario.id)) {
      setSelectedCalendarios([...selectedCalendarios, calendario]);
    }
  };

  const handleRemoveCalendario = (id) => {
    setSelectedCalendarios(selectedCalendarios.filter(c => c.id !== id));
  };

  const handleAsignarCalendario = () => {
    if (selectedGrupo && selectedCalendarios.length > 0) {
      // Agregar calendarios al grupo seleccionado
      const updatedGrupos = gruposCaficultores.map(grupo => 
        grupo.id === selectedGrupo.id 
          ? { 
              ...grupo, 
              calendarios: [
                ...grupo.calendarios, 
                ...selectedCalendarios.map(cal => ({
                  ...cal,
                  grupoId: grupo.id,
                  fechaAsignacion: new Date().toISOString()
                }))
              ],
              // Crear actividades a partir de los calendarios asignados
              actividades: [
                ...grupo.actividades,
                ...selectedCalendarios.map((cal, index) => ({
                  id: Math.max(...grupo.actividades.map(a => a.id), 0) + index + 1,
                  nombre: `Actividad - ${cal.nombre}`,
                  descripcion: `Calendario asignado: ${cal.descripcion}`,
                  calendarioId: cal.id,
                  calendarioNombre: cal.nombre,
                  tipo: cal.tipo,
                  zona: cal.zona,
                  periodo: cal.periodo,
                  responsable: cal.responsable,
                  fechaAsignacion: new Date().toISOString()
                }))
              ]
            }
          : grupo
      );
      setGruposCaficultores(updatedGrupos);
      
      // Actualizar el grupo seleccionado
      const updatedSelected = updatedGrupos.find(g => g.id === selectedGrupo.id);
      setSelectedGrupo(updatedSelected);
      
      // Limpiar selección
      setSelectedCalendarios([]);
      setSelectedCalendario(null);
      setShowAsignarModal(false);
      setAsignarSearchTerm('');
      
      setAlertModal({ isOpen: true, type: 'success', title: 'Éxito', message: `${selectedCalendarios.length} calendario(s) asignado(s) exitosamente al grupo ${selectedGrupo.nombre}` });
    }
  };

  const handleAsignarActividad = (id) => {
    console.log('Asignar actividad:', id);
  };

  const handleEditarActividad = (id) => {
    console.log('Editar actividad:', id);
  };

  const handleEliminarActividad = (id) => {
    if (selectedGrupo) {
      // Eliminar actividad del grupo seleccionado
      const updatedGrupos = gruposCaficultores.map(grupo => 
        grupo.id === selectedGrupo.id 
          ? { ...grupo, actividades: grupo.actividades.filter(a => a.id !== id) }
          : grupo
      );
      setGruposCaficultores(updatedGrupos);
      
      // Actualizar el grupo seleccionado
      const updatedSelected = updatedGrupos.find(g => g.id === selectedGrupo.id);
      setSelectedGrupo(updatedSelected);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Calendario de Actividades</h1>
          <p className="text-gray-600">Gestión de actividades programadas</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel - Grupos de Caficultores */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Actividades</h2>
            </div>
            
            {/* Search */}
            <div className="p-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Selecciona el grupo de caficultores..."
                  value={grupoSearchTerm}
                  onChange={(e) => setGrupoSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cafe-vino-500 focus:border-cafe-vino-500"
                />
              </div>
            </div>

            {/* Grupos de Caficultores List */}
            <div className="max-h-96 overflow-y-auto">
              {filteredGrupos.map((grupo) => (
                <div
                  key={grupo.id}
                  onClick={() => setSelectedGrupo(grupo)}
                  className={`px-4 py-3 border-b border-gray-100 cursor-pointer transition-colors ${
                    selectedGrupo?.id === grupo.id 
                      ? 'bg-cafe-vino-50 border-l-4 border-l-cafe-vino-600' 
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {grupo.nombre}
                      </div>
                      <div className="text-xs text-gray-500">
                        {grupo.descripcion}
                      </div>
                      <div className="text-xs text-gray-400">
                        {grupo.caficultores.length} caficultores • {grupo.zona}
                      </div>
                    </div>
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel - Activities */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900">
                {selectedGrupo ? `Actividades de ${selectedGrupo.nombre}` : 'Selecciona un grupo de caficultores'}
              </h2>
              <button
                onClick={() => setShowTipoActividadesModal(true)}
                className="flex items-center px-3 py-2 bg-cafe-vino-600 text-white rounded-lg hover:bg-cafe-vino-700 transition-colors text-sm"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
                Tipo de Actividades
              </button>
            </div>

            {selectedGrupo ? (
              <>
                {/* Grupo Info */}
                <div className="px-6 py-3 bg-cafe-vino-50 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {selectedGrupo.nombre}
                      </div>
                      <div className="text-xs text-gray-600">
                        {selectedGrupo.descripcion}
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">
                      {selectedGrupo.caficultores.length} caficultores
                    </div>
                  </div>
                </div>

                {/* Action Buttons - Solo mostrar cuando no hay actividades */}
                {selectedGrupo.actividades.length === 0 && (
                  <div className="px-6 py-4 border-b border-gray-200 flex justify-center space-x-3">
                    <button
                      onClick={handleAsignar}
                      className="flex items-center px-4 py-2 bg-cafe-vino-600 text-white rounded-lg hover:bg-cafe-vino-700 transition-colors"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h10M7 12h10m-7 5h4" />
                      </svg>
                      Asignar
                    </button>
                    <button
                      onClick={handleCrear}
                      className="flex items-center px-4 py-2 bg-coffee-600 text-white rounded-lg hover:bg-coffee-700 transition-colors"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      Crear
                    </button>
                  </div>
                )}

                {/* Activities Table or Empty State */}
                {selectedGrupo.actividades.length > 0 ? (
                  <>
                    {/* Action Buttons - Solo mostrar cuando hay actividades */}
                    <div className="px-6 py-4 border-b border-gray-200 flex space-x-3">
                      <button
                        onClick={handleAsignar}
                        className="flex items-center px-4 py-2 bg-cafe-vino-600 text-white rounded-lg hover:bg-cafe-vino-700 transition-colors"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h10M7 12h10m-7 5h4" />
                        </svg>
                        Asignar
                      </button>
                      <button
                        onClick={handleCrear}
                        className="flex items-center px-4 py-2 bg-coffee-600 text-white rounded-lg hover:bg-coffee-700 transition-colors"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Crear
                      </button>
                    </div>

                    {/* Activities Table */}
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Nombre
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Descripción
                            </th>
                            <th className="relative px-6 py-3">
                              <span className="sr-only">Acciones</span>
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {selectedGrupo.actividades.map((actividad) => (
                            <tr key={actividad.id} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">
                                  {actividad.nombre}
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <div className="text-sm text-gray-900">
                                  {actividad.descripcion}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <div className="flex space-x-2 justify-end">
                                  {/* Asignar Actividades */}
                                  <button
                                    onClick={() => handleAsignarActividad(actividad.id)}
                                    className="inline-flex items-center px-3 py-1 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors text-xs"
                                    title="Asignar Actividades"
                                  >
                                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h10M7 12h10m-7 5h4" />
                                    </svg>
                                    Asignar
                                  </button>

                                  {/* Editar */}
                                  <button
                                    onClick={() => handleEditarActividad(actividad.id)}
                                    className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
                                    title="Editar"
                                  >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                  </button>

                                  {/* Eliminar */}
                                  <button
                                    onClick={() => handleEliminarActividad(actividad.id)}
                                    className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                                    title="Eliminar"
                                  >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-12">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 012-2M9 5a2 2 0 012-2h2a2 2 0 012-2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">
                      Aún no has asignado calendarios a esta actividad
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Usa los botones de arriba para asignar o crear nuevas actividades para {selectedGrupo.nombre}
                    </p>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">Selecciona un grupo de caficultores</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Busca y selecciona un grupo para ver sus actividades
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal de Asignación de Calendario */}
      {showAsignarModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={() => setShowAsignarModal(false)}
          ></div>

          {/* Modal panel */}
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
            <div className="relative inline-block w-full bg-white rounded-2xl shadow-2xl max-w-4xl p-6 my-8 text-left align-middle transition-all transform">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold leading-6 text-gray-900">Asignación de Calendario de Actividades</h3>
                <button
                  onClick={() => setShowAsignarModal(false)}
                  className="text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Contenido */}
              <div className="space-y-4">
                {/* Buscador de Calendarios */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Seleccionar Calendario de Actividades
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      placeholder="Buscar calendario por nombre..."
                      value={asignarSearchTerm}
                      onChange={(e) => setAsignarSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cafe-vino-500 focus:border-cafe-vino-500"
                    />
                  </div>
                </div>

                {/* Lista de Calendarios Disponibles */}
                <div className="max-h-48 overflow-y-auto border border-gray-200 rounded-lg">
                  {filteredCalendarios.length > 0 ? (
                    <div className="divide-y divide-gray-200">
                      {filteredCalendarios.map((calendario) => (
                        <div
                          key={calendario.id}
                          onClick={() => handleSelectCalendario(calendario)}
                          className={`p-3 hover:bg-gray-50 cursor-pointer transition-colors ${
                            selectedCalendarios.find(c => c.id === calendario.id) 
                              ? 'bg-cafe-vino-50 border-l-4 border-l-cafe-vino-600' 
                              : 'hover:bg-gray-50'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {calendario.nombre}
                              </div>
                              <div className="text-xs text-gray-500">
                                {calendario.descripcion}
                              </div>
                              <div className="text-xs text-gray-400">
                                {calendario.tipo} • {calendario.zona}
                              </div>
                            </div>
                            <svg className="w-5 h-5 text-cafe-vino-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6" />
                            </svg>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 text-center text-gray-500">
                      {asignarSearchTerm ? 'No se encontraron calendarios' : 'Todos los calendarios ya están asignados'}
                    </div>
                  )}
                </div>

                {/* Calendarios Seleccionados */}
                {selectedCalendarios.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Calendarios Seleccionados ({selectedCalendarios.length})</h3>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                              Nombre
                            </th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                              Acción
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {selectedCalendarios.map((calendario) => (
                            <tr key={calendario.id}>
                              <td className="px-4 py-2 text-sm text-gray-900">
                                {calendario.nombre}
                              </td>
                              <td className="px-4 py-2 text-sm">
                                <button
                                  onClick={() => handleRemoveCalendario(calendario.id)}
                                  className="text-red-600 hover:text-red-800 text-sm font-medium"
                                >
                                  Eliminar
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>

              {/* Botones */}
              <div className="flex justify-end space-x-3 pt-6 border-t">
                <button
                  onClick={() => setShowAsignarModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 rounded-lg transition-colors"
                >
                  Cerrar
                </button>
                <button
                  onClick={handleAsignarCalendario}
                  disabled={selectedCalendarios.length === 0}
                  className="px-4 py-2 bg-cafe-vino-600 text-white rounded-lg hover:bg-cafe-vino-700 disabled:bg-gray-400 transition-colors"
                >
                  Asignar ({selectedCalendarios.length})
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Tipos de Actividades */}
      {showTipoActividadesModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={() => setShowTipoActividadesModal(false)}
          ></div>

          {/* Modal panel */}
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
            <div className="relative inline-block w-full bg-white rounded-2xl shadow-2xl max-w-4xl p-6 my-8 text-left align-middle transition-all transform">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold leading-6 text-gray-900">Gestionar Tipo de Actividades</h3>
                <button
                  onClick={() => setShowTipoActividadesModal(false)}
                  className="text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Nombre
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Data
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Categoría
                      </th>
                      <th className="relative px-6 py-3">
                        <span className="sr-only">Acciones</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {tiposActividades.map((tipo) => (
                      <tr key={tipo.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {tipo.nombre}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800">
                            {tipo.data}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-orange-100 text-orange-800">
                            {tipo.categoria}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => handleDeleteTipoActividad(tipo.id)}
                            className="inline-flex items-center px-3 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors text-sm"
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Botones */}
              <div className="flex justify-end pt-6 border-t">
                <button
                  onClick={() => setShowTipoActividadesModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 rounded-lg transition-colors"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    {/* Modal de Creación de Calendario */}
      {showCrearModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={() => setShowCrearModal(false)}
          ></div>

          {/* Modal panel */}
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
            <div className="relative inline-block w-full bg-white rounded-2xl shadow-2xl max-w-lg p-6 my-8 text-left align-middle transition-all transform">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold leading-6 text-gray-900">Crear Calendario de Actividades</h3>
                <button
                  onClick={() => setShowCrearModal(false)}
                  className="text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Formulario */}
              <div className="space-y-4">
                {/* Nombre */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    value={nuevoCalendario.nombre}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cafe-vino-500 focus:border-cafe-vino-500"
                    placeholder="Nombre del calendario"
                  />
                </div>

                {/* Descripción */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descripción
                  </label>
                  <textarea
                    name="descripcion"
                    value={nuevoCalendario.descripcion}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cafe-vino-500 focus:border-cafe-vino-500"
                    placeholder="Descripción del calendario"
                  />
                </div>
              </div>

              {/* Botones */}
              <div className="flex justify-end space-x-3 pt-6 border-t">
                <button
                  onClick={() => setShowCrearModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 rounded-lg transition-colors"
                >
                  Cerrar
                </button>
                <button
                  onClick={handleCrearCalendario}
                  disabled={!nuevoCalendario.nombre.trim() || !nuevoCalendario.descripcion.trim()}
                  className="px-4 py-2 bg-cafe-vino-600 text-white rounded-lg hover:bg-cafe-vino-700 disabled:bg-gray-400 transition-colors"
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

export default Calendario;
