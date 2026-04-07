import React from 'react';
import { PageHeader, Card } from '../../components';

const C_EstadoTiempo = () => {
  const currentWeather = {
    temp: 24,
    condition: 'Parcialmente Nublado',
    humidity: 78,
    precipitation: '15%',
    wind: '12 km/h',
    uv: 'Bajo',
    location: 'Finca El Refugio - Huila'
  };

  const forecast = [
    { day: 'Lun', temp: 25, condition: 'Soleado', icon: '☀️' },
    { day: 'Mar', temp: 23, condition: 'Lluvia Ligera', icon: '🌦️' },
    { day: 'Mie', temp: 22, condition: 'Tormentas', icon: '⛈️' },
    { day: 'Jue', temp: 24, condition: 'Nublado', icon: '☁️' },
    { day: 'Vie', temp: 26, condition: 'Soleado', icon: '☀️' },
    { day: 'Sab', temp: 25, condition: 'Parcialmente Nublado', icon: '⛅' },
    { day: 'Dom', temp: 24, condition: 'Lluvia', icon: '🌧️' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Estado del Tiempo" 
        subtitle="Condiciones climáticas y pronóstico para tus cultivos" 
      />

      {/* Hero Weather Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 bg-gradient-to-br from-cafe-vino-600 to-cafe-vino-800 text-white border-none shadow-lg overflow-hidden relative">
           <div className="relative z-10 p-4">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h3 className="text-3xl font-black">{currentWeather.location}</h3>
                  <p className="text-white/70 font-medium">Hoy, 19 de Marzo 2026</p>
                </div>
                <div className="text-right text-6xl font-black">
                  {currentWeather.temp}°C
                </div>
              </div>
              
              <div className="flex items-center space-x-6">
                <div className="text-5xl">⛅</div>
                <div>
                  <p className="text-xl font-bold">{currentWeather.condition}</p>
                  <p className="text-white/60">Siente como 26°C</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-12 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                <div className="text-center">
                  <p className="text-xs text-white/60 uppercase font-black mb-1">Humedad</p>
                  <p className="text-xl font-bold">{currentWeather.humidity}%</p>
                </div>
                <div className="text-center border-x border-white/10">
                  <p className="text-xs text-white/60 uppercase font-black mb-1">Precipitación</p>
                  <p className="text-xl font-bold">{currentWeather.precipitation}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-white/60 uppercase font-black mb-1">Viento</p>
                  <p className="text-xl font-bold">{currentWeather.wind}</p>
                </div>
              </div>
           </div>
           
           {/* Decorative circles */}
           <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
           <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-cafe-vino-500/20 rounded-full blur-3xl"></div>
        </Card>

        {/* UV & More data */}
        <div className="space-y-4">
           <Card className="shadow-sm border border-gray-100 flex items-center p-6">
              <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center mr-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707"/></svg>
              </div>
              <div>
                <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">Índice UV</p>
                <p className="text-lg font-black text-gray-900">{currentWeather.uv}</p>
              </div>
           </Card>
           
           <Card className="shadow-sm border border-gray-100 p-6 flex-1 bg-emerald-50/30 border-emerald-100">
              <h4 className="font-bold text-emerald-800 mb-2">Consejo Técnico</h4>
              <p className="text-sm text-emerald-700 leading-relaxed italic">
                "Dada la humedad actual del 78%, es un momento ideal para monitorear la roya en las hojas nuevas. Evita podas drásticas hoy."
              </p>
           </Card>
        </div>
      </div>

      {/* Forecast Row */}
      <Card className="shadow-sm border border-gray-100 overflow-x-auto">
        <h3 className="font-bold text-gray-900 mb-6">Pronóstico de la Semana</h3>
        <div className="flex justify-between min-w-[600px] gap-4">
          {forecast.map((f, i) => (
            <div key={i} className="flex-1 flex flex-col items-center p-4 rounded-2xl hover:bg-gray-50 transition-colors">
              <p className="text-sm font-bold text-gray-400 mb-3">{f.day}</p>
              <div className="text-3xl mb-3">{f.icon}</div>
              <p className="text-lg font-black text-gray-900">{f.temp}°</p>
              <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">{f.condition}</p>
            </div>
          ))}
        </div>
      </Card>

    </div>
  );
};

export default C_EstadoTiempo;
