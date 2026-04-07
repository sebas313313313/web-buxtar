import React from 'react';
import { PageHeader, Card } from '../../components';

const C_Archivos = () => {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Mis Archivos" 
        subtitle="Documentos técnicos, fotos y evidencias" 
      />
      
      <Card className="min-h-[400px] flex flex-col items-center justify-center p-12 text-center bg-gray-50 border-2 border-dashed border-gray-200">
        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm mb-6">
          <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Módulo en Desarrollo</h3>
        <p className="text-gray-500 max-w-sm mb-8">
          Estamos trabajando para que pronto puedas descargar facturas, reportes técnicos y fotos de tus lotes directamente desde aquí.
        </p>
        <div className="flex space-x-2">
           <div className="h-2 w-2 bg-cafe-vino-600 rounded-full animate-bounce"></div>
           <div className="h-2 w-2 bg-cafe-vino-600 rounded-full animate-bounce delay-100"></div>
           <div className="h-2 w-2 bg-cafe-vino-600 rounded-full animate-bounce delay-200"></div>
        </div>
      </Card>
    </div>
  );
};

export default C_Archivos;
