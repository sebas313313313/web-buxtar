import React, { useState } from 'react';
import { PageHeader, Card } from '../../components';

const MOCK_FILES = [
  { id: 1, name: 'Factura Compra de Insumos - Fertilizante.pdf', category: 'facturas', date: '10/04/2026', size: '1.2 MB' },
  { id: 2, name: 'Factura Maquinaria - Despulpadora.pdf', category: 'facturas', date: '01/03/2026', size: '2.5 MB' },
  { id: 3, name: 'Guía de Buenas Prácticas Agrícolas.pdf', category: 'estudio', date: '15/02/2026', size: '5.1 MB' },
  { id: 4, name: 'Manual de Poda Efectiva.pdf', category: 'estudio', date: '10/01/2026', size: '3.4 MB' },
  { id: 5, name: 'Reporte Incidencia Broca Lote A1.pdf', category: 'sanitarios', date: '05/04/2026', size: '0.8 MB' },
  { id: 6, name: 'Plan de Manejo Fitosanitario 2026.pdf', category: 'sanitarios', date: '01/04/2026', size: '2.1 MB' },
  { id: 7, name: 'Foto Cultivo antes de poda.jpg', category: 'otros', date: '20/03/2026', size: '4.5 MB' },
  { id: 8, name: 'Análisis de suelo 2025.pdf', category: 'otros', date: '15/11/2025', size: '1.5 MB' },
];

const CATEGORIES = [
  { id: 'facturas', name: 'Facturas', description: 'Comprobantes de compra y venta', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14l6-6M9 10h.01M15 14h.01M12 21a9 9 0 100-18 9 9 0 000 18z" /> },
  { id: 'estudio', name: 'Archivos de Estudio', description: 'Manuales, guías y capacitaciones', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 19 7.5 19s3.332-.523 4.5-1.747V6.253zm0 0C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 19 16.5 19c-1.746 0-3.332-.523-4.5-1.747V6.253z" /> },
  { id: 'sanitarios', name: 'Archivos Sanitarios', description: 'Reportes de plagas y tratamientos', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /> },
  { id: 'otros', name: 'Otros Archivos', description: 'Fotos, análisis y reportes', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /> }
];

const C_Archivos = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const getFilesForCategory = (catId) => {
    return MOCK_FILES.filter(f => f.category === catId);
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Mis Archivos" 
        subtitle="Documentos técnicos, facturas y evidencias" 
      />
      
      {!selectedCategory ? (
        // VISTA DE TARJETAS
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map(cat => {
            const fileCount = getFilesForCategory(cat.id).length;
            return (
              <Card 
                key={cat.id} 
                className="hover:shadow-lg transition-all cursor-pointer border border-transparent hover:border-cafe-vino-300 group"
              >
                <div 
                  onClick={() => setSelectedCategory(cat)}
                  className="flex flex-col h-full"
                >
                  <div className="w-12 h-12 rounded-lg bg-cafe-vino-50 text-cafe-vino-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {cat.icon}
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-cafe-vino-700 transition-colors">{cat.name}</h3>
                  <p className="text-sm text-gray-500 mt-1 flex-grow">{cat.description}</p>
                  <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center w-full">
                    <span className="text-sm font-medium text-cafe-vino-600">{fileCount} archivos</span>
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-cafe-vino-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        // VISTA DE DETALLE (LISTA DE ARCHIVOS)
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100 flex items-center gap-4 bg-gray-50/50">
            <button 
              onClick={() => setSelectedCategory(null)}
              className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-lg bg-cafe-vino-50 text-cafe-vino-600 flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {selectedCategory.icon}
                  </svg>
               </div>
               <div>
                  <h2 className="text-lg font-bold text-gray-900">{selectedCategory.name}</h2>
                  <p className="text-xs text-gray-500">{selectedCategory.description}</p>
               </div>
            </div>
          </div>
          
          <div className="p-0">
             {getFilesForCategory(selectedCategory.id).length === 0 ? (
               <div className="flex flex-col items-center justify-center py-16 text-gray-400">
                  <svg className="w-16 h-16 mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>
                  <p>No hay archivos en esta categoría por ahora.</p>
               </div>
             ) : (
                <ul className="divide-y divide-gray-100">
                  {getFilesForCategory(selectedCategory.id).map(file => (
                    <li key={file.id} className="p-4 sm:px-6 hover:bg-gray-50 transition-colors flex items-center justify-between group cursor-pointer">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 shrink-0 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                           </svg>
                        </div>
                        <div>
                           <p className="font-medium text-gray-900 text-sm group-hover:text-cafe-vino-700 transition-colors line-clamp-1">{file.name}</p>
                           <p className="text-xs text-gray-500 mt-0.5">Añadido el {file.date} • {file.size}</p>
                        </div>
                      </div>
                      <div className="flex shrink-0 gap-2">
                         <button className="p-2 text-gray-400 hover:text-cafe-vino-600 hover:bg-cafe-vino-50 rounded-lg transition-colors tooltip" title="Descargar">
                           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
                         </button>
                      </div>
                    </li>
                  ))}
                </ul>
             )}
          </div>
        </div>
      )}
    </div>
  );
};

export default C_Archivos;
