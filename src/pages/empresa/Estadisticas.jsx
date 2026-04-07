import React from 'react';
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

// Registrar componentes de Chart.js
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

const MOCK_DATA = {
  broca: '1.5',
  pergamino: '14,500',
  roya: '2.8',
  rentabilidad: '$15,200,000'
};

const Estadisticas = () => {
  // Datos para gráfico de barras (Rendimiento por Zona/Finca)
  const barChartData = {
    labels: ['Finca Norte', 'Finca El Rocío', 'Finca Los Pinos', 'Finca Valle', 'Finca Sur'],
    datasets: [
      {
        label: 'Producción de Café Pergamino Seco (kg)',
        data: [3200, 2500, 4100, 2800, 1900],
        backgroundColor: '#681333', // brand-vino
        borderRadius: 4,
      }
    ],
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: { family: 'Inter, sans-serif', weight: 'bold' }
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: '#f3f4f6' }
      },
      x: {
        grid: { display: false }
      }
    }
  };

  // Datos para gráfico de líneas (Evolución de plagas)
  const lineChartData = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Promedio Broca (%)',
        data: [1.2, 1.4, 1.3, 1.8, 1.5, 1.6],
        borderColor: '#d94634', // cafe-vino-600
        backgroundColor: 'rgba(217, 70, 52, 0.1)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Promedio Roya (%)',
        data: [2.1, 2.3, 2.5, 2.8, 2.6, 2.4],
        borderColor: '#a67c52', // coffee-500
        backgroundColor: 'rgba(166, 124, 82, 0.1)',
        tension: 0.4,
        fill: true,
      }
    ],
  };

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: { family: 'Inter, sans-serif', weight: 'bold' }
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: '#f3f4f6' }
      },
      x: {
        grid: { display: false }
      }
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Estadísticas Globales</h1>
          <p className="text-gray-500 text-sm">Resumen general del rendimiento y sanidad.</p>
        </div>
        <div className="p-3 bg-red-50 rounded-xl text-brand-vino">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
        </div>
      </div>

      {/* 4 Tarjetas de Resumen */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Tarjeta Broca */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 border-l-4 border-l-orange-500 transition-all hover:-translate-y-1 hover:shadow-md">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Promedio de Broca</p>
          </div>
          <div className="flex items-end gap-1">
            <h2 className="text-3xl font-black text-gray-900 leading-none">{MOCK_DATA.broca}</h2>
            <span className="text-lg font-bold text-orange-500 mb-0.5">%</span>
          </div>
        </div>

        {/* Tarjeta Produccion */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 border-l-4 border-l-brand-vino transition-all hover:-translate-y-1 hover:shadow-md">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-4 h-4 text-brand-vino" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Café Pergamino Seco</p>
          </div>
          <div className="flex items-end gap-1">
            <h2 className="text-3xl font-black text-gray-900 leading-none">{MOCK_DATA.pergamino}</h2>
            <span className="text-sm font-bold text-brand-vino mb-1">kg</span>
          </div>
        </div>

        {/* Tarjeta Roya */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 border-l-4 border-l-red-600 transition-all hover:-translate-y-1 hover:shadow-md">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Promedio de Roya</p>
          </div>
          <div className="flex items-end gap-1">
            <h2 className="text-3xl font-black text-gray-900 leading-none">{MOCK_DATA.roya}</h2>
            <span className="text-lg font-bold text-red-600 mb-0.5">%</span>
          </div>
        </div>

        {/* Tarjeta Rentabilidad */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 border-l-4 border-l-green-600 transition-all hover:-translate-y-1 hover:shadow-md">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Rentabilidad Promedio</p>
          </div>
          <div className="flex items-end gap-2">
            <h2 className="text-3xl font-black text-green-700 leading-none">{MOCK_DATA.rentabilidad}</h2>
            <span className="text-xs font-bold text-gray-400 mb-1">COP</span>
          </div>
        </div>

      </div>

      {/* Nota Divisoria */}
      <div className="relative py-8">
        <div className="absolute inset-x-0 top-1/2 h-px bg-gray-200"></div>
        <div className="relative flex justify-center">
          <span className="bg-gray-50 px-6 text-xs font-bold text-gray-400 uppercase tracking-widest text-center">
            Esta información corresponde a las estadísticas de todas las fincas vinculadas a su empresa
          </span>
        </div>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Gráfico 1 - Producción */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-red-50 rounded-lg">
              <svg className="w-5 h-5 text-brand-vino" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Volumen de Producción</h3>
              <p className="text-xs text-gray-500">Comparativa general por finca principal</p>
            </div>
          </div>
          <div className="h-72 w-full">
            <Bar data={barChartData} options={barChartOptions} />
          </div>
        </div>

        {/* Gráfico 2 - Sanidad */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-orange-50 rounded-lg">
              <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Evolución de Plagas Global</h3>
              <p className="text-xs text-gray-500">Promedio histórico de broca y roya (%)</p>
            </div>
          </div>
          <div className="h-72 w-full">
            <Line data={lineChartData} options={lineChartOptions} />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Estadisticas;
