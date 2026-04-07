import React from 'react';
import { PageHeader, Card } from '../../components';

const SADashboard = () => {
  const stats = [
    { label: 'Total Caficultores', value: '1,245', icon: 'coffee' },
    { label: 'Total Extensionistas', value: '48', icon: 'users' },
    { label: 'Total Fincas', value: '890', icon: 'tree' },
    { label: 'Total Lotes', value: '3,102', icon: 'map' },
  ];

  const recentActivity = [
    { id: 1, action: 'Nuevo caficultor registrado', user: 'Carlos Ruiz', date: 'Hace 2 horas', status: 'success' },
    { id: 2, action: 'Actualización de finca', user: 'María Gómez', date: 'Hace 5 horas', status: 'info' },
    { id: 3, action: 'Fallo en estación meteorológica', user: 'Sistema', date: 'Hace 1 día', status: 'error' },
    { id: 4, action: 'Suscripción renovada', user: 'Empresa Cafetalera', date: 'Hace 2 días', status: 'success' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard General"
        subtitle="Vista central de Super Administrador"
      />

      {/* Tarjetas de estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
              </div>
              <div className="w-12 h-12 bg-cafe-vino-50 rounded-full flex items-center justify-center text-cafe-vino-600">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {stat.icon === 'coffee' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />}
                  {stat.icon === 'users' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />}
                  {stat.icon === 'tree' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />}
                  {stat.icon === 'map' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />}
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Card title="Caficultores Recientes del Proyecto (Global)">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acción / Registro</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usuario</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentActivity.map((activity) => (
                <tr key={activity.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{activity.action}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{activity.user}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{activity.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${activity.status === 'success' ? 'bg-green-100 text-green-800' : 
                        activity.status === 'error' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}`}>
                      {activity.status === 'success' ? 'Completado' : activity.status === 'error' ? 'Fallo' : 'Info'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default SADashboard;
