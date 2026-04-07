import React, { useState } from 'react';
import { PageHeader, Card, Button, Modal } from '../../components';

const C_Educacion = () => {
  const [selectedContent, setSelectedContent] = useState(null);

  const contenidos = [
    { 
      id: 1, 
      titulo: 'Manejo Integrado de la Roya', 
      descripcionBreve: 'Guía técnica para la prevención y control de la roya del café.',
      descripcionCompleta: 'Esta guía detalla las mejores prácticas agronómicas para prevenir la roya, incluyendo la selección de variedades resistentes, el sombreado adecuado, la nutrición del cultivo y el uso oportuno de fungicidas sistémicos y de contacto. Fue elaborada por expertos de Cenicafé para las condiciones del Huila.',
      autor: 'Cenicafé / Roberto Gómez',
      tipo: 'PDF / Guía'
    },
    { 
      id: 2, 
      titulo: 'Post-Cosecha y Calidad', 
      descripcionBreve: 'Optimización de los procesos de beneficio para mejorar el puntaje en taza.',
      descripcionCompleta: 'Aprende sobre los procesos de fermentación controlada, lavado eficiente y secado paralelelos o en marquesina. Un manejo adecuado en la post-cosecha puede incrementar el valor de tu carga hasta en un 20% mediante la obtención de cafés especiales.',
      autor: 'Federación Nacional de Cafeteros',
      tipo: 'Video / Curso'
    },
    { 
      id: 3, 
      titulo: 'Fertilización basada en Análisis de Suelos', 
      descripcionBreve: 'Cómo interpretar tu análisis de suelos y aplicar solo lo necesario.',
      descripcionCompleta: 'La fertilización inteligente comienza con el conocimiento de tu suelo. Este contenido educativo te enseña a calcular las dosis exactas de N-P-K según la etapa de desarrollo de tus árboles, reduciendo costos innecesarios y protegiendo el ecosistema.',
      autor: 'Roberto Gómez',
      tipo: 'Documento Técnico'
    }
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Educación y Capacitación" 
        subtitle="Material técnico asignado para mejorar tu productividad" 
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contenidos.map((c) => (
          <Card key={c.id} className="flex flex-col h-full hover:shadow-lg transition-all border-gray-100 border p-0 overflow-hidden group">
            <div className="h-3 bg-cafe-vino-600 transition-all group-hover:h-4"></div>
            <div className="p-6 flex flex-col flex-1">
              <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-1 rounded font-bold uppercase tracking-widest self-start mb-4">{c.tipo}</span>
              <h3 className="text-xl font-bold text-gray-900 mb-2 leading-snug">{c.titulo}</h3>
              <p className="text-sm text-gray-500 mb-6 flex-1">{c.descripcionBreve}</p>
              
              <div className="border-t border-gray-50 pt-4 mt-auto flex justify-between items-center">
                <span className="text-xs text-gray-400 italic">Por: {c.autor}</span>
                <Button 
                  size="sm" 
                  variant="secondary"
                  onClick={() => setSelectedContent(c)}
                >
                  Ver más
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Modal para ver detalles completos */}
      <Modal
        isOpen={!!selectedContent}
        onClose={() => setSelectedContent(null)}
        title={selectedContent?.titulo}
      >
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-cafe-vino-600 bg-cafe-vino-50 px-2 py-1 rounded uppercase tracking-wider">{selectedContent?.tipo}</span>
            <span className="text-xs text-gray-400">Publicado por {selectedContent?.autor}</span>
          </div>
          <p className="text-gray-700 leading-relaxed text-base">
            {selectedContent?.descripcionCompleta}
          </p>
          <div className="pt-6 border-t border-gray-100 flex justify-end">
            <Button onClick={() => setSelectedContent(null)}>Entendido / Cerrar</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default C_Educacion;
