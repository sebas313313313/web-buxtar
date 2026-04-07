import React, { useState } from 'react';
import { PageHeader, Card, Button } from '../../components';
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
import { Line, Bar } from 'react-chartjs-2';

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

const C_Estadisticas = () => {
  const [finca, setFinca] = useState('1');
  const [lote, setLote] = useState('lote-1');
  const [grafica, setGrafica] = useState('roya');

  const fincas = [
    { id: '1', name: 'El Refugio' },
    { id: '2', name: 'La Esperanza' }
  ];

  const lotes = [
    { id: 'lote-1', name: 'Lote Norte' },
    { id: 'lote-2', name: 'Lote Sur' },
    { id: 'lote-3', name: 'Lote Central' }
  ];

  const tiposGrafica = [
    { id: 'roya', name: 'Evaluación de Roya' },
    { id: 'broca', name: 'Evaluación de Broca' },
    { id: 'pronostico', name: 'Pronóstico Recolección' },
    { id: 'historico', name: 'Histórico Recolección' },
    { id: 'precio', name: 'Recolección y Precio de Venta' },
    { id: 'costo', name: 'Costo por Actividad' }
  ];

  // Datos de ejemplo para Roya
  const dataRoya = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
    datasets: [
      {
        label: '% de Infección de Roya',
        data: [5, 12, 18, 15, 22, 10],
        borderColor: '#991b1b', // Cafe Vino (Red-800 approx)
        backgroundColor: 'rgba(153, 27, 27, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 6,
        borderWidth: 3
      }
    ]
  };

  // Datos de ejemplo para Recolección y Precio
  const dataPrecio = {
    labels: ['Lote A', 'Lote B', 'Lote C', 'Lote D'],
    datasets: [
      {
        label: 'Kilos Recolectados',
        data: [1200, 1900, 1500, 2100],
        backgroundColor: '#10b981', // Emerald 500
      },
      {
        label: 'Precio Promedio ($)',
        data: [15000, 14800, 15200, 14900],
        backgroundColor: '#fbbf24', // Amber 400
        yAxisID: 'y1',
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' },
      tooltip: { 
        padding: 12,
        backgroundColor: '#1f2937', 
        titleFont: { size: 14, weight: 'bold' },
        bodyFont: { size: 12 }
      }
    },
    scales: grafica === 'precio' ? {
      y: { type: 'linear', display: true, position: 'left' },
      y1: { type: 'linear', display: true, position: 'right', grid: { drawOnChartArea: false } }
    } : {}
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Estadísticas de Cultivo" subtitle="Análisis técnico y económico de tus fincas" />
      
      {/* Filtros */}
      <Card className="shadow-sm border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Seleccionar Finca</label>
            <select 
              value={finca} 
              onChange={(e) => setFinca(e.target.value)}
              className="w-full rounded-xl border-gray-200 shadow-sm focus:border-cafe-vino-500 focus:ring-cafe-vino-500 py-2.5 px-4 bg-gray-50 border"
            >
              {fincas.map(f => (
                <option key={f.id} value={f.id}>{f.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Seleccionar Lote</label>
            <select 
              value={lote} 
              onChange={(e) => setLote(e.target.value)}
              className="w-full rounded-xl border-gray-200 shadow-sm focus:border-cafe-vino-500 focus:ring-cafe-vino-500 py-2.5 px-4 bg-gray-50 border"
            >
              {lotes.map(l => (
                <option key={l.id} value={l.id}>{l.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Seleccionar Gráfica</label>
            <select 
              value={grafica} 
              onChange={(e) => setGrafica(e.target.value)}
              className="w-full rounded-xl border-gray-200 shadow-sm focus:border-cafe-vino-500 focus:ring-cafe-vino-500 py-2.5 px-4 bg-gray-50 border"
            >
              {tiposGrafica.map(t => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      {/* Área del Gráfico */}
      <Card className="shadow-sm border border-gray-100 min-h-[500px] flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-900">
            {tiposGrafica.find(t => t.id === grafica)?.name}
          </h3>
          <Button variant="secondary" size="sm">Descargar Reporte</Button>
        </div>
        
        <div className="flex-1 min-h-[400px]">
          {grafica === 'roya' && (
            <Line data={dataRoya} options={chartOptions} />
          )}
          {grafica === 'precio' && (
            <Bar data={dataPrecio} options={chartOptions} />
          )}
          {grafica !== 'roya' && grafica !== 'precio' && (
            <div className="h-full flex flex-col items-center justify-center bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
               <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"/></svg>
               <h4 className="text-gray-900 font-bold">Gráfica en Desarrollo</h4>
               <p className="text-gray-500 text-sm">Visualización solicitada para: {tiposGrafica.find(t => t.id === grafica)?.name}</p>
            </div>
          )}
        </div>
      </Card>

      {/* KPI Cards for context */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 border border-red-100 bg-red-50/30">
          <p className="text-xs font-bold text-red-800 uppercase tracking-widest mb-1">Infección Actual</p>
          <p className="text-2xl font-black text-red-900">10%</p>
        </Card>
        <Card className="p-4 border border-emerald-100 bg-emerald-50/30">
          <p className="text-xs font-bold text-emerald-800 uppercase tracking-widest mb-1">Prod. Estimada</p>
          <p className="text-2xl font-black text-emerald-900">1,200 Kg</p>
        </Card>
        <Card className="p-4 border border-amber-100 bg-amber-50/30">
          <p className="text-xs font-bold text-amber-800 uppercase tracking-widest mb-1">Precio Venta</p>
          <p className="text-2xl font-black text-amber-900">$15,200</p>
        </Card>
        <Card className="p-4 border border-blue-100 bg-blue-50/30">
          <p className="text-xs font-bold text-blue-800 uppercase tracking-widest mb-1">Costo / Kg</p>
          <p className="text-2xl font-black text-blue-900">$11,500</p>
        </Card>
      </div>

    </div>
  );
};

export default C_Estadisticas;
