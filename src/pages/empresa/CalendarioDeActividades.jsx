import React, { useState } from 'react';
import { ActionModal } from '../../components';

const CalendarioDeActividades = () => {
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
      const nuevoCalendarioCompleto = {
        id: Math.max(...calendariosDisponibles.map(c => c.id), 0) + 1,
        ...nuevoCalendario,
        tipo: 'Producción',
        zona: 'Zona Norte',
        periodo: '2025',
        responsable: 'Test Colombia'
      };
      
      setCalendariosDisponibles([...calendariosDisponibles, nuevoCalendarioCompleto]);
      setNuevoCalendario({ nombre: '', descripcion: '' });
      setShowCrearModal(false);
      setAlertModal({ isOpen: true, type: 'success', title: 'Éxito', message: 'Calendario creado exitosamente' });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoCalendario({ ...nuevoCalendario, [name]: value });
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
      setSelectedGrupo(updatedGrupos.find(g => g.id === selectedGrupo.id));
      setSelectedCalendarios([]);
      setSelectedCalendario(null);
      setShowAsignarModal(false);
      setAsignarSearchTerm('');
      setAlertModal({ isOpen: true, type: 'success', title: 'Éxito', message: `${selectedCalendarios.length} calendario(s) asignado(s) exitosamente al grupo ${selectedGrupo.nombre}` });
    }
  };

  const handleEditarActividad = (id) => {
    console.log('Editar actividad:', id);
  };

  const handleEliminarActividad = (id) => {
    if (selectedGrupo) {
      const updatedGrupos = gruposCaficultores.map(grupo => 
        grupo.id === selectedGrupo.id 
          ? { ...grupo, actividades: grupo.actividades.filter(a => a.id !== id) }
          : grupo
      );
      setGruposCaficultores(updatedGrupos);
      setSelectedGrupo(updatedGrupos.find(g => g.id === selectedGrupo.id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Calendario de Actividades</h1>
          <p className="text-gray-600">Gestión de actividades programadas</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Actividades</h2>
            </div>
            
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
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-vino focus:border-brand-vino"
                />
              </div>
            </div>

            <div className="max-h-96 overflow-y-auto">
              {filteredGrupos.map((grupo) => (
                <div
                  key={grupo.id}
                  onClick={() => setSelectedGrupo(grupo)}
                  className={`px-4 py-3 border-b border-gray-100 cursor-pointer transition-colors ${
                    selectedGrupo?.id === grupo.id 
                      ? 'bg-red-50 border-l-4 border-l-brand-vino' 
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{grupo.nombre}</div>
                      <div className="text-xs text-gray-500">{grupo.descripcion}</div>
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

        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900">
                {selectedGrupo ? `Actividades de ${selectedGrupo.nombre}` : 'Selecciona un grupo de caficultores'}
              </h2>
              <button
                onClick={() => setShowTipoActividadesModal(true)}
                className="flex items-center px-3 py-2 bg-brand-vino text-white rounded-lg hover:bg-opacity-90 transition-colors text-sm"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
                Tipo de Actividades
              </button>
            </div>

            {selectedGrupo ? (
              <>
                <div className="px-6 py-3 bg-red-50 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{selectedGrupo.nombre}</div>
                      <div className="text-xs text-gray-600">{selectedGrupo.descripcion}</div>
                    </div>
                    <div className="text-xs text-gray-500">{selectedGrupo.caficultores.length} caficultores</div>
                  </div>
                </div>

                <div className="px-6 py-4 border-b border-gray-200 flex space-x-3">
                  <button
                    onClick={handleAsignar}
                    className="flex items-center px-4 py-2 bg-brand-vino text-white rounded-lg hover:bg-opacity-90 transition-colors shadow-sm"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h10M7 12h10m-7 5h4" />
                    </svg>
                    Asignar
                  </button>
                  <button
                    onClick={handleCrear}
                    className="flex items-center px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors shadow-sm"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Crear
                  </button>
                </div>

                {selectedGrupo.actividades.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nombre</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Descripción</th>
                          <th className="relative px-6 py-3 text-right">Acciones</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {selectedGrupo.actividades.map((actividad) => (
                          <tr key={actividad.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 text-sm font-medium text-gray-900">{actividad.nombre}</td>
                            <td className="px-6 py-4 text-sm text-gray-900">{actividad.descripcion}</td>
                            <td className="px-6 py-4 text-right text-sm font-medium">
                              <div className="flex space-x-2 justify-end">
                                <button
                                  onClick={() => handleEditarActividad(actividad.id)}
                                  className="text-blue-600 hover:text-blue-900"
                                  title="Editar"
                                >
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                  </svg>
                                </button>
                                <button
                                  onClick={() => handleEliminarActividad(actividad.id)}
                                  className="text-red-600 hover:text-red-900"
                                  title="Eliminar"
                                >
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                ) : (
                  <div className="text-center py-12">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 012-2M9 5a2 2 0 012-2h2a2 2 0 012-2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">Sin calendarios asignados</h3>
                    <p className="mt-1 text-sm text-gray-500">Programar actividades para {selectedGrupo.nombre}</p>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">Selecciona un grupo</h3>
                <p className="text-sm text-gray-500">Para ver y gestionar sus actividades</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      {showAsignarModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden">
            <div className="px-6 py-4 border-b flex justify-between items-center">
              <h3 className="text-lg font-bold text-gray-900">Asignar Calendario</h3>
              <button onClick={() => setShowAsignarModal(false)} className="text-gray-400 hover:text-gray-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar calendario..."
                  value={asignarSearchTerm}
                  onChange={(e) => setAsignarSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand-vino"
                />
                <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeWidth={2}/></svg>
              </div>
              <div className="max-h-60 overflow-y-auto border rounded-xl divide-y">
                {filteredCalendarios.map(cal => (
                  <div key={cal.id} className="p-3 flex items-center justify-between hover:bg-gray-50">
                    <div>
                      <div className="font-medium text-gray-900">{cal.nombre}</div>
                      <div className="text-xs text-gray-500">{cal.tipo} • {cal.zona}</div>
                    </div>
                    <button onClick={() => handleSelectCalendario(cal)} className="text-brand-vino font-bold">+</button>
                  </div>
                ))}
              </div>
              {selectedCalendarios.length > 0 && (
                <div className="pt-4 border-t">
                  <h4 className="text-sm font-bold mb-2">Seleccionados:</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCalendarios.map(cal => (
                      <span key={cal.id} className="px-2 py-1 bg-red-100 text-brand-vino rounded-full text-xs flex items-center">
                        {cal.nombre}
                        <button onClick={() => handleRemoveCalendario(cal.id)} className="ml-1 font-bold">×</button>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="px-6 py-4 bg-gray-50 border-t flex justify-end space-x-3">
              <button onClick={() => setShowAsignarModal(false)} className="px-4 py-2 text-gray-600 font-medium">Cancelar</button>
              <button onClick={handleAsignarCalendario} disabled={selectedCalendarios.length === 0} className="px-6 py-2 bg-brand-vino text-white rounded-lg font-bold disabled:bg-gray-300 shadow-md">Asignar</button>
            </div>
          </div>
        </div>
      )}

      {showTipoActividadesModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden">
            <div className="px-6 py-4 border-b flex justify-between items-center">
              <h3 className="text-lg font-bold text-gray-900">Configurar Tipos de Actividades</h3>
              <button onClick={() => setShowTipoActividadesModal(false)} className="text-gray-400 hover:text-gray-600"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/></svg></button>
            </div>
            <div className="p-6">
              <table className="min-w-full divide-y divide-gray-200">
                <thead><tr><th className="text-left text-xs font-bold text-gray-500 uppercase px-4 py-2">Nombre</th><th className="text-right px-4 py-2">Acción</th></tr></thead>
                <tbody className="divide-y">
                  {tiposActividades.map(tipo => (
                    <tr key={tipo.id}>
                      <td className="px-4 py-3">{tipo.nombre}</td>
                      <td className="px-4 py-3 text-right">
                        <button onClick={() => handleDeleteTipoActividad(tipo.id)} className="text-red-500 font-bold">Eliminar</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-4 bg-gray-50 border-t flex justify-end"><button onClick={() => setShowTipoActividadesModal(false)} className="px-6 py-2 bg-gray-800 text-white rounded-lg font-bold">Cerrar</button></div>
          </div>
        </div>
      )}

      {showCrearModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="px-6 py-4 border-b"><h3 className="text-lg font-bold text-gray-900">Nuevo Calendario</h3></div>
            <div className="p-6 space-y-4">
              <div><label className="block text-sm font-bold text-gray-700 mb-1">Nombre</label><input type="text" name="nombre" value={nuevoCalendario.nombre} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand-vino"/></div>
              <div><label className="block text-sm font-bold text-gray-700 mb-1">Descripción</label><textarea name="descripcion" value={nuevoCalendario.descripcion} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand-vino" rows="3"/></div>
            </div>
            <div className="px-6 py-4 bg-gray-50 border-t flex justify-end space-x-3">
              <button onClick={() => setShowCrearModal(false)} className="px-4 py-2 font-medium text-gray-600">Cancelar</button>
              <button onClick={handleCrearCalendario} className="px-6 py-2 bg-brand-vino text-white rounded-lg font-bold shadow-md">Crear Calendario</button>
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
        actionColor={alertModal.type === 'success' ? 'primary' : 'danger'}
        icon={alertModal.type}
      />
    </div>
  );
};

export default CalendarioDeActividades;
