import React from 'react';
import { PageHeader, Card } from '../../components';
import MapaGIS from '../../components/MapaGIS';

// Marcadores de empresas en zonas cafeteras de Colombia
const EMPRESAS_MARCADORES = [
  { id: 1,  lat: 5.067,  lng: -75.517, label: 'Empresa Cafetalera del Norte',       tipo: 'empresa',  caficultores: 156, fincas: 89  },
  { id: 2,  lat: 4.533,  lng: -75.700, label: 'Cooperativa Eje Cafetero',            tipo: 'empresa',  caficultores: 98,  fincas: 62  },
  { id: 3,  lat: 4.444,  lng: -75.232, label: 'Federación Regional Tolima',          tipo: 'empresa',  caficultores: 210, fincas: 138 },
  { id: 4,  lat: 2.927,  lng: -75.294, label: 'Asociación Cafetera del Huila',       tipo: 'empresa',  caficultores: 320, fincas: 201 },
  { id: 5,  lat: 6.150,  lng: -75.374, label: 'Coop. Antioqueña de Cafeteros',       tipo: 'empresa',  caficultores: 182, fincas: 110 },
  { id: 6,  lat: 1.214,  lng: -77.279, label: 'Caficultores del Sur (Nariño)',       tipo: 'empresa',  caficultores: 143, fincas: 84  },
  { id: 7,  lat: 3.812,  lng: -76.682, label: 'Empresa Cafetera del Valle',          tipo: 'empresa',  caficultores: 89,  fincas: 53  },
  // Estaciones IoT
  { id: 8,  lat: 4.818,  lng: -75.694, label: 'Estación IoT #01 — Chinchiná',        tipo: 'estacion' },
  { id: 9,  lat: 4.453,  lng: -75.234, label: 'Estación IoT #02 — Fresno',           tipo: 'estacion' },
  { id: 10, lat: 2.921,  lng: -75.287, label: 'Estación IoT #03 — Neiva',            tipo: 'estacion' },
  { id: 11, lat: 6.148,  lng: -75.377, label: 'Estación IoT #04 — Jardín',           tipo: 'estacion' },
  { id: 12, lat: 1.218,  lng: -77.281, label: 'Estación IoT #05 — La Unión (Nariño)', tipo: 'estacion' },
];

const SADashboard = () => {
  const stats = [
    { label: 'Total Caficultores',       value: '1,198', change: '+8%',  icon: 'coffee',  color: 'bg-amber-50 text-amber-600' },
    { label: 'Total Extensionistas',     value: '48',    change: '+3',   icon: 'users',   color: 'bg-blue-50 text-blue-600'   },
    { label: 'Total Fincas',             value: '737',   change: '+21',  icon: 'tree',    color: 'bg-green-50 text-green-600' },
    { label: 'Hectáreas Monitoreadas',   value: '4,280', change: '+5%',  icon: 'map',     color: 'bg-purple-50 text-purple-600' },
    { label: 'Empresas Activas',         value: '7',     change: '+1',   icon: 'briefcase', color: 'bg-cafe-vino-50 text-cafe-vino-600' },
    { label: 'Estaciones IoT',           value: '5',     change: 'online', icon: 'rss',   color: 'bg-teal-50 text-teal-600'  },
  ];

  const recentActivity = [
    { id: 1, action: 'Nuevo caficultor registrado',   user: 'Carlos Ruiz',         date: 'Hace 2 horas', status: 'success' },
    { id: 2, action: 'Actualización de finca',        user: 'María Gómez',         date: 'Hace 5 horas', status: 'info'    },
    { id: 3, action: 'Fallo en estación meteorológica', user: 'Sistema',           date: 'Hace 1 día',   status: 'error'   },
    { id: 4, action: 'Suscripción renovada',          user: 'Empresa Cafetalera',  date: 'Hace 2 días',  status: 'success' },
    { id: 5, action: 'Nueva finca delimitada en GIS', user: 'Ext. Lucía Morales',  date: 'Hace 3 días',  status: 'info'    },
  ];

  const getStatIcon = (icon) => {
    const paths = {
      coffee:    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
      users:     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />,
      tree:      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />,
      map:       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />,
      briefcase: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />,
      rss:       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-6.938-7.07A9 9 0 0118.938 12M2.929 9l.879.879A13.5 13.5 0 0120.071 9" />,
    };
    return paths[icon] || paths.users;
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Dashboard General" subtitle="Vista central de Super Administrador — Plataforma Buxtar" />

      {/* Stats Grid (6 tarjetas) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${stat.color}`}>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {getStatIcon(stat.icon)}
              </svg>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
            <p className="text-xs text-green-600 font-medium mt-1">{stat.change}</p>
          </div>
        ))}
      </div>

      {/* Layout: Mapa + Actividad */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Mapa Nacional GIS */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-gray-900">🗺️ Mapa Nacional de Cobertura</h3>
                <p className="text-xs text-gray-500 mt-0.5">Empresas activas y estaciones IoT en zonas cafeteras de Colombia</p>
              </div>
              <div className="flex gap-2">
                <span className="flex items-center gap-1.5 text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-700">
                  <span className="w-2 h-2 rounded-full bg-purple-500 inline-block" /> Empresas
                </span>
                <span className="flex items-center gap-1.5 text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700">
                  <span className="w-2 h-2 rounded-full bg-blue-500 inline-block" /> Estaciones IoT
                </span>
              </div>
            </div>
            <div className="p-4">
              <MapaGIS
                center={[4.5, -74.3]}
                zoom={6}
                height="440px"
                editable={false}
                marcadores={EMPRESAS_MARCADORES}
              />
            </div>
          </div>
        </div>

        {/* Actividad Reciente */}
        <div className="lg:col-span-1">
          <Card title="Actividad Reciente">
            <div className="space-y-3">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className={`mt-0.5 flex-shrink-0 w-2 h-2 rounded-full mt-2 ${
                    activity.status === 'success' ? 'bg-green-500' :
                    activity.status === 'error'   ? 'bg-red-500'   : 'bg-blue-500'
                  }`} />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900 leading-tight">{activity.action}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{activity.user}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{activity.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Resumen de cobertura */}
          <Card title="Cobertura por Región" className="mt-4">
            <div className="space-y-3">
              {[
                { region: 'Eje Cafetero', pct: 92, n: 3 },
                { region: 'Huila / Tolima', pct: 78, n: 2 },
                { region: 'Antioquia', pct: 61, n: 1 },
                { region: 'Nariño / Cauca', pct: 45, n: 1 },
              ].map(r => (
                <div key={r.region}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-700 font-medium">{r.region}</span>
                    <span className="text-gray-500">{r.pct}% · {r.n} empresa{r.n > 1 ? 's' : ''}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-1.5">
                    <div
                      className="h-1.5 rounded-full bg-cafe-vino-500"
                      style={{ width: `${r.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SADashboard;
