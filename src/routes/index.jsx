import React from 'react';
import { Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import DashboardLayout from '../layouts/DashboardLayout';
import Dashboard from '../pages/dashboard';
import Perfil from '../pages/perfil';
import Zonas from '../pages/zonas';
import Extensionistas from '../pages/extensionistas';
import Caficultores from '../pages/caficultores';
import Calendario from '../pages/calendario';

// Componente de prueba directo para SitiosWeb
const SitiosWeb = () => {
  console.log('SitiosWeb direct component loaded');
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sitios Web</h1>
          <p className="text-gray-600">Gestión de sitios web y contenido digital</p>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Búsqueda de Sitios Web</h2>
        </div>
        <div className="p-6">
          <div className="text-center py-12">
            <h3 className="mt-2 text-sm font-medium text-gray-900">COMPONENTE DIRECTO CARGADO</h3>
            <p className="mt-1 text-sm text-gray-500">
              Si ves este mensaje, el problema estaba en la importación
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Placeholder components for other pages
const Mensajeria = () => (
  <div className="space-y-6">
    <h1 className="text-2xl font-bold text-gray-900">Mensajería</h1>
    <p className="text-gray-600">Sistema de mensajería interna</p>
    <div className="bg-white p-6 rounded-lg shadow">
      <p>Contenido en desarrollo...</p>
    </div>
  </div>
);

const Educacion = () => (
  <div className="space-y-6">
    <h1 className="text-2xl font-bold text-gray-900">Contenido de Educación</h1>
    <p className="text-gray-600">Material educativo y capacitaciones</p>
    <div className="bg-white p-6 rounded-lg shadow">
      <p>Contenido en desarrollo...</p>
    </div>
  </div>
);

const Estaciones = () => (
  <div className="space-y-6">
    <h1 className="text-2xl font-bold text-gray-900">Estaciones Meteorológicas</h1>
    <p className="text-gray-600">Monitoreo de estaciones meteorológicas</p>
    <div className="bg-white p-6 rounded-lg shadow">
      <p>Contenido en desarrollo...</p>
    </div>
  </div>
);

const Fincas = () => (
  <div className="space-y-6">
    <h1 className="text-2xl font-bold text-gray-900">Fincas</h1>
    <p className="text-gray-600">Gestión de fincas cafeteras</p>
    <div className="bg-white p-6 rounded-lg shadow">
      <p>Contenido en desarrollo...</p>
    </div>
  </div>
);

const Estadisticas = () => (
  <div className="space-y-6">
    <h1 className="text-2xl font-bold text-gray-900">Estadísticas</h1>
    <p className="text-gray-600">Estadísticas y análisis de datos</p>
    <div className="bg-white p-6 rounded-lg shadow">
      <p>Contenido en desarrollo...</p>
    </div>
  </div>
);

const Rentabilidad = () => (
  <div className="space-y-6">
    <h1 className="text-2xl font-bold text-gray-900">Rentabilidad</h1>
    <p className="text-gray-600">Análisis de rentabilidad</p>
    <div className="bg-white p-6 rounded-lg shadow">
      <p>Contenido en desarrollo...</p>
    </div>
  </div>
);

const Pronostico = () => (
  <div className="space-y-6">
    <h1 className="text-2xl font-bold text-gray-900">Pronóstico de Cosecha</h1>
    <p className="text-gray-600">Pronósticos y proyecciones</p>
    <div className="bg-white p-6 rounded-lg shadow">
      <p>Contenido en desarrollo...</p>
    </div>
  </div>
);

const Volumen = () => (
  <div className="space-y-6">
    <h1 className="text-2xl font-bold text-gray-900">Volumen Cosechado</h1>
    <p className="text-gray-600">Control de volumen cosechado</p>
    <div className="bg-white p-6 rounded-lg shadow">
      <p>Contenido en desarrollo...</p>
    </div>
  </div>
);

export const routes = [
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: <Navigate to="/dashboard" replace />,
  },
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: 'perfil',
        element: <Perfil />,
      },
      {
        path: 'zonas',
        element: <Zonas />,
      },
      {
        path: 'extensionistas',
        element: <Extensionistas />,
      },
      {
        path: 'caficultores',
        element: <Caficultores />,
      },
      {
        path: 'calendario',
        element: <Calendario />,
      },
      {
        path: 'sitios-web',
        element: <SitiosWeb />,
      },
      {
        path: 'mensajeria',
        element: <Mensajeria />,
      },
      {
        path: 'educacion',
        element: <Educacion />,
      },
      {
        path: 'estaciones',
        element: <Estaciones />,
      },
      {
        path: 'fincas',
        element: <Fincas />,
      },
      {
        path: 'estadisticas',
        element: <Estadisticas />,
      },
      {
        path: 'rentabilidad',
        element: <Rentabilidad />,
      },
      {
        path: 'pronostico',
        element: <Pronostico />,
      },
      {
        path: 'volumen',
        element: <Volumen />,
      },
    ],
  },
];

export default routes;
