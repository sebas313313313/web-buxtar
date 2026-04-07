import React, { useState } from 'react';
import { Card } from '../../components';
import { useAuthHook } from '../../hooks/useAuth';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';

// Registrar los componentes de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Dashboard = () => {
  const { getGreeting, getRoleName, user } = useAuthHook();

  const stats = [
    { title: 'Extensionistas', value: '12', icon: '👥', color: 'bg-blue-500', change: '+2', changeType: 'positive' },
    { title: 'Caficultores', value: '450', icon: '👨‍🌾', color: 'bg-green-500', change: '+15', changeType: 'positive' },
    { title: 'Fincas', value: '380', icon: '🏡', color: 'bg-yellow-500', change: '+8', changeType: 'positive' },
    { title: 'Lotes', value: '1,240', icon: '📍', color: 'bg-purple-500', change: '+42', changeType: 'positive' },
  ];

  // Datos para los gráficos (Mock data)
  const chartLabels = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'];

  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 10,
        cornerRadius: 8,
      }
    },
    scales: {
      y: { beginAtZero: true, grid: { color: '#f3f4f6' } },
      x: { grid: { display: false } }
    }
  };

  const chartsData = [
    {
      title: 'Promedio Análisis de Broca (%)',
      type: 'line',
      data: {
        labels: chartLabels,
        datasets: [{
          label: 'Broca',
          data: [2.5, 2.1, 2.8, 3.2, 2.4, 1.9],
          borderColor: '#ef4444',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          fill: true,
          tension: 0.4
        }]
      }
    },
    {
      title: 'Promedio CPS (kg)',
      type: 'bar',
      data: {
        labels: chartLabels,
        datasets: [{
          label: 'CPS',
          data: [1200, 1450, 1100, 1600, 1350, 1500],
          backgroundColor: '#8b4513',
          borderRadius: 6
        }]
      }
    },
    {
      title: 'Promedio Análisis de Roya (%)',
      type: 'line',
      data: {
        labels: chartLabels,
        datasets: [{
          label: 'Roya',
          data: [1.8, 2.2, 1.5, 2.0, 1.7, 1.4],
          borderColor: '#eab308',
          backgroundColor: 'rgba(234, 179, 8, 0.1)',
          fill: true,
          tension: 0.4
        }]
      }
    },
    {
      title: 'Promedio Rentabilidad (%)',
      type: 'line',
      data: {
        labels: chartLabels,
        datasets: [{
          label: 'Rentabilidad',
          data: [22, 25, 21, 28, 30, 32],
          borderColor: '#22c55e',
          backgroundColor: 'rgba(34, 197, 94, 0.1)',
          fill: true,
          tension: 0.4
        }]
      }
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {getGreeting()}
          </h1>
          <p className="text-gray-600">
            Panel Corporativo - {user?.empresa || 'Empresa Cafetera'}
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-3">
          <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-100 flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            <span className="text-sm text-gray-600 font-medium">Sistema Activo</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow border-none shadow-md overflow-hidden">
            <div className="flex items-center p-2">
              <div className={`flex-shrink-0 w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center text-2xl shadow-inner text-white`}>
                {stat.icon}
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {stat.title}
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-bold text-gray-900">
                      {stat.value}
                    </div>
                    <span className="ml-2 text-xs font-semibold text-green-600 bg-green-50 px-1.5 py-0.5 rounded">
                      {stat.change}
                    </span>
                  </dd>
                </dl>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {chartsData.map((chart, index) => (
          <Card key={index} title={chart.title} className="shadow-md border-none">
            <div className="h-64 mt-4">
              {chart.type === 'line' ? (
                <Line data={chart.data} options={commonOptions} />
              ) : (
                <Bar data={chart.data} options={commonOptions} />
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Recent Updates / Notification Placeholder */}
      <Card title="Resumen de Operatividad" className="shadow-md border-none">
        <div className="space-y-4 p-2">
          <div className="flex items-start p-3 bg-gray-50 rounded-lg">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-900">Nuevos caficultores registrados</p>
              <p className="text-xs text-gray-500">Se han incorporado 5 nuevos productores en la zona norte.</p>
            </div>
          </div>
          <div className="flex items-start p-3 bg-gray-50 rounded-lg">
            <div className="flex-shrink-0 w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-900">Alerta de Broca en Lote B5</p>
              <p className="text-xs text-gray-500">Se detectó un incremento del 3.5% en la zona sur. Revisar con extensionista.</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
