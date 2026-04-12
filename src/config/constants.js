export const ROLES = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  EMPRESA: 'EMPRESA',
  ASISTENTE_TECNICO: 'ASISTENTE_TECNICO',
  CAFICULTOR: 'CAFICULTOR',
};

// Opciones del menú lateral
export const MENU_OPTIONS = [
  // --- Opciones MENU EMPRESA / ASISTENTE TECNICO ---
  {
    id: 'gestion',
    label: 'Gestión',
    icon: 'chart',
    roles: [ROLES.EMPRESA, ROLES.ASISTENTE_TECNICO],
    subItems: [
      { id: 'dashboard', label: 'Dashboard', path: '/dashboard' },
      { id: 'estadisticas', label: 'Estadísticas', path: '/dashboard/estadisticas' },
      { id: 'rentabilidad', label: 'Rentabilidad', path: '/dashboard/rentabilidad' },
    ]
  },
  {
    id: 'personas',
    label: 'Personas',
    icon: 'users',
    roles: [ROLES.EMPRESA, ROLES.ASISTENTE_TECNICO],
    subItems: [
      { id: 'caficultores', label: 'Caficultores', path: '/dashboard/caficultores' },
      { id: 'grupo_caficultores', label: 'Grupos', path: '/dashboard/grupos' },
      { id: 'extensionistas', label: 'Extensionistas', path: '/dashboard/extensionistas' },
    ]
  },
  {
    id: 'territorio',
    label: 'Territorio',
    icon: 'map',
    roles: [ROLES.EMPRESA, ROLES.ASISTENTE_TECNICO],
    subItems: [
      { id: 'fincas', label: 'Fincas (GIS)', path: '/dashboard/fincas' },
      { id: 'zonas', label: 'Zonas', path: '/dashboard/zonas' },
    ]
  },
  {
    id: 'operaciones',
    label: 'Operaciones',
    icon: 'briefcase',
    roles: [ROLES.EMPRESA, ROLES.ASISTENTE_TECNICO],
    subItems: [
      { id: 'calendario', label: 'Calendario', path: '/dashboard/calendario' },
      { id: 'pronostico', label: 'Pronóstico Cosecha', path: '/dashboard/pronostico' },
      { id: 'volumen', label: 'Volumen Cosechado', path: '/dashboard/volumen' },
    ]
  },
  {
    id: 'comunicacion',
    label: 'Comunicación',
    icon: 'message',
    roles: [ROLES.EMPRESA, ROLES.ASISTENTE_TECNICO],
    subItems: [
      { id: 'mensajeria', label: 'Mensajería', path: '/dashboard/mensajeria' },
      { id: 'at_chats', label: 'Chats', path: '/dashboard/chats', roles: [ROLES.ASISTENTE_TECNICO] },
      { id: 'educacion_at', label: 'Educación', path: '/dashboard/educacion' },
      { id: 'sitios-web_gr', label: 'Sitios web', path: '/dashboard/sitios-web' },
    ]
  },
  {
    id: 'exportacion',
    label: 'Exportación',
    icon: 'globe',
    roles: [ROLES.EMPRESA],
    subItems: [
      { id: 'evaluacion_exportacion', label: 'Evaluación de Exportación', path: '/dashboard/evaluacion-exportacion' },
    ]
  },
  {
    id: 'configuracion',
    label: 'Configuración',
    icon: 'settings',
    roles: [ROLES.EMPRESA, ROLES.ASISTENTE_TECNICO],
    subItems: [
      { id: 'perfil_gr', label: 'Perfil', path: '/dashboard/perfil' },
      { id: 'estaciones', label: 'Estaciones IoT', path: '/dashboard/estaciones' },
      { id: 'ubicaciones', label: 'Ubicaciones', path: '/dashboard/ubicaciones', roles: [ROLES.ASISTENTE_TECNICO] },
      { id: 'soporte', label: 'Soporte', path: '/dashboard/soporte', roles: [ROLES.ASISTENTE_TECNICO] },
    ]
  },

  // --- Opciones MENU SUPER ADMIN ---
  {
    id: 'sa_dashboard',
    label: 'Dashboard Global',
    icon: 'home',
    path: '/dashboard/superadmin',
    roles: [ROLES.SUPER_ADMIN],
  },
  {
    id: 'sa_usuarios',
    label: 'Usuarios',
    icon: 'users',
    roles: [ROLES.SUPER_ADMIN],
    subItems: [
      { id: 'sa_admin_usuarios', label: 'Admin. Usuarios', path: '/dashboard/superadmin/usuarios' },
      { id: 'sa_roles', label: 'Roles', path: '/dashboard/superadmin/roles' },
      { id: 'sa_permisos', label: 'Permisos', path: '/dashboard/superadmin/permisos' },
    ]
  },
  {
    id: 'sa_empresas',
    label: 'Empresas',
    icon: 'briefcase',
    path: '/dashboard/superadmin/empresas',
    roles: [ROLES.SUPER_ADMIN],
  },
  {
    id: 'sa_extensionistas',
    label: 'Extensionistas',
    icon: 'user-check',
    path: '/dashboard/superadmin/extensionistas',
    roles: [ROLES.SUPER_ADMIN],
  },
  {
    id: 'sa_caficultores',
    label: 'Caficultores',
    icon: 'user',
    path: '/dashboard/superadmin/caficultores',
    roles: [ROLES.SUPER_ADMIN],
  },
  {
    id: 'sa_suscripciones',
    label: 'Suscripciones',
    icon: 'credit-card',
    path: '/dashboard/superadmin/suscripciones',
    roles: [ROLES.SUPER_ADMIN],
  },
  {
    id: 'sa_estaciones',
    label: 'Estaciones IoT',
    icon: 'rss',
    path: '/dashboard/superadmin/estaciones',
    roles: [ROLES.SUPER_ADMIN],
  },
  {
    id: 'sa_analitica',
    label: 'Analítica de Datos',
    icon: 'pie-chart',
    path: '/dashboard/superadmin/analitica',
    roles: [ROLES.SUPER_ADMIN],
  },

  // --- Opciones MENU CAFICULTOR ---
  {
    id: 'caf_produccion',
    label: 'Producción',
    icon: 'home',
    roles: [ROLES.CAFICULTOR],
    subItems: [
      { id: 'caf_mi_finca', label: 'Mi Finca', path: '/dashboard/caficultor/mi-finca' },
      { id: 'caf_historico', label: 'Histórico', path: '/dashboard/caficultor/historico' },
      { id: 'caf_estadisticas', label: 'Estadísticas', path: '/dashboard/caficultor/estadisticas' },
      { id: 'caf_almanaque', label: 'Almanaque', path: '/dashboard/caficultor/almanaque' },
      { id: 'caf_archivos', label: 'Mis Archivos', path: '/dashboard/caficultor/archivos' },
    ]
  },
  {
    id: 'caf_entorno',
    label: 'Clima & IoT',
    icon: 'cloud',
    roles: [ROLES.CAFICULTOR],
    subItems: [
      { id: 'caf_clima', label: 'Estado del tiempo', path: '/dashboard/caficultor/estado-tiempo' },
      { id: 'caf_estaciones', label: 'Estaciones IoT', path: '/dashboard/caficultor/estaciones' },
    ]
  },
  {
    id: 'caf_comunicacion',
    label: 'Comunicación',
    icon: 'message',
    roles: [ROLES.CAFICULTOR],
    subItems: [
      { id: 'caf_chat', label: 'Chat y Mensajería', path: '/dashboard/caficultor/chat' },
      { id: 'caf_comunicaciones', label: 'Avisos y Alertas', path: '/dashboard/caficultor/comunicaciones' },
      { id: 'caf_educacion', label: 'Educación', path: '/dashboard/caficultor/educacion' },
      { id: 'caf_sitios_web', label: 'Sitios web', path: '/dashboard/caficultor/sitios-web' },
    ]
  },
  {
    id: 'caf_ajustes',
    label: 'Ajustes',
    icon: 'settings',
    roles: [ROLES.CAFICULTOR],
    subItems: [
      { id: 'caf_perfil', label: 'Mi Perfil', path: '/dashboard/caficultor/perfil' },
    ]
  },
];
