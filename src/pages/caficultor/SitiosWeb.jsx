import React from 'react';
import { PageHeader, Card } from '../../components';

const C_SitiosWeb = () => {
  const sitios = [
    { 
      id: 1, 
      name: 'Federación Nacional de Cafeteros', 
      url: 'https://federaciondecafeteros.org/', 
      description: 'Precios del café en tiempo real y noticias del gremio.',
      category: 'Gremial'
    },
    { 
      id: 2, 
      name: 'Cenicafé', 
      url: 'https://www.cenicafe.org/', 
      description: 'Centro nacional de investigaciones del café en Colombia.',
      category: 'Investigación'
    },
    { 
      id: 3, 
      name: 'IDEAM - Pronóstico Agrometeorológico', 
      url: 'http://www.ideam.gov.co/', 
      description: 'Alertas climáticas y boletines mensuales para el agro.',
      category: 'Clima'
    }
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Sitios Web de Interés" 
        subtitle="Páginas recomendadas por tu Asistente Técnico" 
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sitios.map(site => (
          <Card key={site.id} className="flex flex-col h-full hover:shadow-lg transition-shadow border border-gray-100 p-0 overflow-hidden">
             <div className="bg-cafe-vino-600 p-4 flex justify-between items-center">
                <span className="text-[10px] bg-white/20 text-white px-2 py-1 rounded font-bold uppercase tracking-widest">{site.category}</span>
                <svg className="w-5 h-5 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/></svg>
             </div>
             <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{site.name}</h3>
                <p className="text-sm text-gray-500 mb-6 flex-1">{site.description}</p>
                <a 
                  href={site.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-cafe-vino-600 font-bold text-sm hover:underline"
                >
                  Visitar sitio web
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
                </a>
             </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default C_SitiosWeb;
