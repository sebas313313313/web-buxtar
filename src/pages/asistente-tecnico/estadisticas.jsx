import React, { useState, useEffect, useRef } from 'react';
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
import { ActionModal } from '../../components';

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

const Estadisticas = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedGroup, setSelectedGroup] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalType, setModalType] = useState(''); // 'fincas', 'caficultores', 'lotes', 'produccion'
  const [alertModal, setAlertModal] = useState({ isOpen: false, type: 'info', title: '', message: '' });
  
  // Estados para datos dinámicos según grupo
  const [dynamicStats, setDynamicStats] = useState({
    totalFincas: 156,
    totalCaficultores: 89,
    totalLotes: 342,
    totalProduccion: 2450000,
    produccionPorcentaje: 12.5,
    brocaPromedio: 2.8,
    royaPromedio: 1.9,
    beneficioNeto: 890000000,
    costoProduccion: 1560000000,
    totalVentas: 2450000000
  });

  // Datos por grupo
  const [grupoStats] = useState({
    norte: {
      totalFincas: 58,
      totalCaficultores: 32,
      totalLotes: 125,
      totalProduccion: 980000,
      produccionPorcentaje: 15.2,
      brocaPromedio: 2.3,
      royaPromedio: 1.6,
      beneficioNeto: 380000000,
      costoProduccion: 620000000,
      totalVentas: 1000000000
    },
    sur: {
      totalFincas: 52,
      totalCaficultores: 28,
      totalLotes: 118,
      totalProduccion: 850000,
      produccionPorcentaje: 10.8,
      brocaPromedio: 3.1,
      royaPromedio: 2.2,
      beneficioNeto: 280000000,
      costoProduccion: 540000000,
      totalVentas: 820000000
    },
    central: {
      totalFincas: 46,
      totalCaficultores: 29,
      totalLotes: 99,
      totalProduccion: 620000,
      produccionPorcentaje: 11.5,
      brocaPromedio: 3.0,
      royaPromedio: 1.9,
      beneficioNeto: 230000000,
      costoProduccion: 400000000,
      totalVentas: 630000000
    }
  });

  // Datos para el modal
  const [modalData, setModalData] = useState([]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat('es-CO').format(num);
  };

  // Actualizar estadísticas según grupo seleccionado
  React.useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      if (selectedGroup === 'all') {
        setDynamicStats({
          totalFincas: 156,
          totalCaficultores: 89,
          totalLotes: 342,
          totalProduccion: 2450000,
          produccionPorcentaje: 12.5,
          brocaPromedio: 2.8,
          royaPromedio: 1.9,
          beneficioNeto: 890000000,
          costoProduccion: 1560000000,
          totalVentas: 2450000000
        });
      } else {
        const stats = grupoStats[selectedGroup];
        setDynamicStats(stats);
      }
      setLoading(false);
    }, 500);
  }, [selectedGroup]);

  const handleCardClick = (type) => {
    setLoading(true);
    setModalType(type);
    
    // Simular carga de datos
    setTimeout(() => {
      let data = [];
      
      switch(type) {
        case 'fincas':
          data = [
            { fecha: '2024-03-15', caficultor: 'Carlos Rodríguez', finca: 'Finca La Esperanza', lote: 'Lote A1', broca: 2.3 },
            { fecha: '2024-03-20', caficultor: 'Ana López', finca: 'Finca El Paraíso', lote: 'Lote B1', broca: 3.1 },
            { fecha: '2024-03-25', caficultor: 'Luis Torres', finca: 'Finca Buena Vista', lote: 'Lote C1', broca: 1.8 },
            { fecha: '2024-04-01', caficultor: 'Pedro Gómez', finca: 'Finca San José', lote: 'Lote D1', broca: 2.9 },
            { fecha: '2024-04-05', caficultor: 'Diego Herrera', finca: 'Finca Las Brisas', lote: 'Lote E1', broca: 2.1 }
          ];
          break;
        case 'caficultores':
          data = [
            { fecha: '2024-03-10', caficultor: 'Carlos Rodríguez', finca: 'Finca La Esperanza', lote: 'Todos', broca: 2.5 },
            { fecha: '2024-03-12', caficultor: 'Ana López', finca: 'Finca El Paraíso', lote: 'Todos', broca: 3.2 },
            { fecha: '2024-03-14', caficultor: 'Luis Torres', finca: 'Finca Buena Vista', lote: 'Todos', broca: 1.8 },
            { fecha: '2024-03-16', caficultor: 'Pedro Gómez', finca: 'Finca San José', lote: 'Todos', broca: 2.9 },
            { fecha: '2024-03-18', caficultor: 'Diego Herrera', finca: 'Finca Las Brisas', lote: 'Todos', broca: 2.1 }
          ];
          break;
        case 'lotes':
          data = [
            { fecha: '2024-03-05', caficultor: 'Carlos Rodríguez', finca: 'Finca La Esperanza', lote: 'Lote A1', broca: 2.3 },
            { fecha: '2024-03-08', caficultor: 'Carlos Rodríguez', finca: 'Finca La Esperanza', lote: 'Lote A2', broca: 2.7 },
            { fecha: '2024-03-11', caficultor: 'Luis Torres', finca: 'Finca Buena Vista', lote: 'Lote B1', broca: 1.6 },
            { fecha: '2024-03-14', caficultor: 'Luis Torres', finca: 'Finca Buena Vista', lote: 'Lote B2', broca: 2.0 },
            { fecha: '2024-03-17', caficultor: 'José Martínez', finca: 'Finca Las Brisas', lote: 'Lote C1', broca: 2.1 }
          ];
          break;
        case 'produccion':
          data = [
            { fecha: '2024-01-15', caficultor: 'Carlos Rodríguez', finca: 'Finca La Esperanza', lote: 'Lote A1', broca: 2.1, produccion: 1200 },
            { fecha: '2024-02-20', caficultor: 'Ana López', finca: 'Finca El Paraíso', lote: 'Lote B1', broca: 3.0, produccion: 950 },
            { fecha: '2024-03-25', caficultor: 'Luis Torres', finca: 'Finca Buena Vista', lote: 'Lote C1', broca: 1.8, produccion: 1450 },
            { fecha: '2024-04-30', caficultor: 'Pedro Gómez', finca: 'Finca San José', lote: 'Lote D1', broca: 2.9, produccion: 1100 },
            { fecha: '2024-05-05', caficultor: 'Diego Herrera', finca: 'Finca Las Brisas', lote: 'Lote E1', broca: 2.1, produccion: 1300 }
          ];
          break;
      }
      
      setModalData(data);
      setLoading(false);
      setShowModal(true);
    }, 1000);
  };

  const handleExport = () => {
    // Simular exportación
    const csvContent = modalData.map(row => 
      `${row.fecha},${row.caficultor},${row.finca},${row.lote},${row.broca}${row.produccion ? `,${row.produccion}` : ''}`
    ).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${modalType}_${selectedGroup}_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleExportActivities = () => {
    // Simular exportación de actividades
    setAlertModal({ isOpen: true, type: 'info', title: 'Exportación', message: 'Exportando actividades...' });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Estadísticas</h1>
          <p className="text-gray-600">Análisis y métricas de producción</p>
        </div>
        
        {/* Filtros */}
        <div className="flex space-x-4">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cafe-vino-500 focus:border-cafe-vino-500"
          >
            <option value="week">Última semana</option>
            <option value="month">Último mes</option>
            <option value="quarter">Último trimestre</option>
            <option value="year">Último año</option>
          </select>
          
          <select
            value={selectedGroup}
            onChange={(e) => setSelectedGroup(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cafe-vino-500 focus:border-cafe-vino-500"
          >
            <option value="all">Todos los grupos</option>
            <option value="norte">Grupo Norte</option>
            <option value="sur">Grupo Sur</option>
            <option value="central">Grupo Central</option>
          </select>
        </div>
      </div>

      {/* Tarjetas de Resumen */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div 
          onClick={() => handleCardClick('fincas')}
          className="bg-white rounded-lg shadow p-6 cursor-pointer hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Total Fincas</dt>
                <dd className="text-lg font-medium text-gray-900">{formatNumber(dynamicStats.totalFincas)}</dd>
              </dl>
            </div>
          </div>
        </div>

        <div 
          onClick={() => handleCardClick('caficultores')}
          className="bg-white rounded-lg shadow p-6 cursor-pointer hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Total Caficultores</dt>
                <dd className="text-lg font-medium text-gray-900">{formatNumber(dynamicStats.totalCaficultores)}</dd>
              </dl>
            </div>
          </div>
        </div>

        <div 
          onClick={() => handleCardClick('lotes')}
          className="bg-white rounded-lg shadow p-6 cursor-pointer hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Total Lotes</dt>
                <dd className="text-lg font-medium text-gray-900">{formatNumber(dynamicStats.totalLotes)}</dd>
              </dl>
            </div>
          </div>
        </div>

        <div 
          onClick={() => handleCardClick('produccion')}
          className="bg-white rounded-lg shadow p-6 cursor-pointer hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Total Producción</dt>
                <dd className="text-lg font-medium text-gray-900">{formatNumber(dynamicStats.totalProduccion)} kg</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      {/* Gráficos y Métricas Detalladas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de Producción */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Producción {selectedPeriod === 'month' ? 'Mensual' : selectedPeriod === 'quarter' ? 'Trimestral' : selectedPeriod === 'year' ? 'Anual' : 'Semanal'}</h3>
          <div className="h-64">
            <Bar
              data={{
                labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
                datasets: [{
                  label: 'Producción (kg)',
                  data: [65000, 80000, 45000, 90000, 75000, 60000, 85000, 70000, 55000, 88000, 92000, 78000],
                  backgroundColor: 'rgba(139, 69, 19, 0.8)',
                  borderColor: 'rgba(139, 69, 19, 1)',
                  borderWidth: 1,
                  borderRadius: 4,
                  hoverBackgroundColor: 'rgba(139, 69, 19, 1)',
                }]
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false
                  },
                  tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    borderColor: 'rgba(139, 69, 19, 1)',
                    borderWidth: 1,
                    padding: 12,
                    displayColors: false,
                    callbacks: {
                      label: function(context) {
                        return context.dataset.label + ': ' + new Intl.NumberFormat('es-CO').format(context.parsed.y) + ' kg';
                      }
                    }
                  }
                },
                scales: {
                  x: {
                    grid: {
                      display: false
                    },
                    ticks: {
                      color: '#6B7280',
                      font: {
                        size: 12
                      }
                    }
                  },
                  y: {
                    beginAtZero: true,
                    grid: {
                      color: '#E5E7EB',
                      drawBorder: false
                    },
                    ticks: {
                      color: '#6B7280',
                      font: {
                        size: 12
                      },
                      callback: function(value) {
                        return new Intl.NumberFormat('es-CO').format(value);
                      }
                    }
                  }
                }
              }}
            />
          </div>
        </div>

        {/* Gráfico de Tendencia */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Tendencia de Producción</h3>
          <div className="h-64">
            <Line
              data={{
                labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
                datasets: [{
                  label: 'Producción',
                  data: [65000, 80000, 45000, 90000, 75000, 60000, 85000, 70000, 55000, 88000, 92000, 78000],
                  borderColor: 'rgba(139, 69, 19, 1)',
                  backgroundColor: 'rgba(139, 69, 19, 0.1)',
                  borderWidth: 2,
                  fill: true,
                  tension: 0.4,
                  pointBackgroundColor: 'rgba(139, 69, 19, 1)',
                  pointBorderColor: '#fff',
                  pointBorderWidth: 2,
                  pointRadius: 4,
                  pointHoverRadius: 6
                }]
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false
                  },
                  tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    borderColor: 'rgba(139, 69, 19, 1)',
                    borderWidth: 1,
                    padding: 12,
                    displayColors: false,
                    callbacks: {
                      label: function(context) {
                        return context.dataset.label + ': ' + new Intl.NumberFormat('es-CO').format(context.parsed.y) + ' kg';
                      }
                    }
                  }
                },
                scales: {
                  x: {
                    grid: {
                      display: false
                    },
                    ticks: {
                      color: '#6B7280',
                      font: {
                        size: 12
                      }
                    }
                  },
                  y: {
                    beginAtZero: true,
                    grid: {
                      color: '#E5E7EB',
                      drawBorder: false
                    },
                    ticks: {
                      color: '#6B7280',
                      font: {
                        size: 12
                      },
                      callback: function(value) {
                        return new Intl.NumberFormat('es-CO').format(value);
                      }
                    }
                  }
                }
              }}
            />
          </div>
        </div>
      </div>

      {/* Métricas de Salud */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Métricas de Salud del Cultivo</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Promedio Broca</span>
              <span className="text-sm font-bold text-gray-900">{dynamicStats.brocaPromedio}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-red-500 h-2 rounded-full"
                style={{ width: `${(dynamicStats.brocaPromedio / 5) * 100}%` }}
              ></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Promedio Roya</span>
              <span className="text-sm font-bold text-gray-900">{dynamicStats.royaPromedio}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-yellow-500 h-2 rounded-full"
                style={{ width: `${(dynamicStats.royaPromedio / 5) * 100}%` }}
              ></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Tendencia Producción</span>
              <span className="text-sm font-bold text-green-600">+{dynamicStats.produccionPorcentaje}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full"
                style={{ width: `${dynamicStats.produccionPorcentaje * 4}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabla Financiera */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Resumen Financiero</h3>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">
                {formatCurrency(dynamicStats.costoProduccion)}
              </div>
              <div className="text-sm text-gray-600 mt-1">Costo de Producción</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {formatCurrency(dynamicStats.totalVentas)}
              </div>
              <div className="text-sm text-gray-600 mt-1">Total de Ventas</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {formatCurrency(dynamicStats.beneficioNeto)}
              </div>
              <div className="text-sm text-gray-600 mt-1">Beneficio Neto</div>
            </div>
          </div>
          
          {/* Indicador de Rentabilidad */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Rentabilidad</span>
              <span className="text-sm font-bold text-green-600">
                {((dynamicStats.beneficioNeto / dynamicStats.costoProduccion) * 100).toFixed(1)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full"
                style={{ width: `${Math.min((dynamicStats.beneficioNeto / dynamicStats.costoProduccion) * 100, 100)}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      

      {/* Modal de Detalles */}
      {showModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={() => setShowModal(false)}
          ></div>
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
            <div className="relative inline-block w-full bg-white rounded-2xl shadow-2xl max-w-4xl p-6 my-8 text-left align-middle transition-all transform">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold leading-6 text-gray-900">
                  {modalType === 'fincas' ? 'Detalles de Fincas' :
                   modalType === 'caficultores' ? 'Detalles de Caficultores' :
                   modalType === 'lotes' ? 'Detalles de Lotes' : 'Detalles de Producción'}
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {loading ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="w-16 h-16 border-4 border-cafe-vino-600 border-t-transparent rounded-full animate-spin"></div>
                  <p className="mt-4 text-sm text-gray-600">Cargando datos...</p>
                </div>
              ) : (
                <div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Fecha de Floración
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Caficultor
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Finca
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Lote
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Promedio de Infestación de Broca
                          </th>
                          {modalType === 'produccion' && (
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Producción (kg)
                            </th>
                          )}
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {modalData.map((item, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{item.fecha}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{item.caficultor}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{item.finca}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{item.lote}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{item.broca}</div>
                            </td>
                            {modalType === 'produccion' && (
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{formatNumber(item.produccion)}</div>
                              </td>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Botones de Exportación */}
                  <div className="flex justify-end space-x-3 pt-6 border-t">
                    <button
                      onClick={handleExportActivities}
                      className="px-4 py-2 border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      Exportar Actividades
                    </button>
                    <button
                      onClick={handleExport}
                      className="px-4 py-2 bg-cafe-vino-600 text-white rounded-lg hover:bg-cafe-vino-700 transition-colors"
                    >
                      Exportar
                    </button>
                  </div>
                </div>
              )}
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

export default Estadisticas;
