export const CERTIFICATIONS = [
  {
    id: 'EUDR',
    label: 'EUDR (Reglamento UE)',
    icon: '🌍',
    description: 'Reglamento de la Unión Europea contra la deforestación y la degradación forestal.',
    questions: [
      { id: 'eudr_1', text: '¿El predio cuenta con geolocalización precisa (puntos o polígonos)?' },
      { id: 'eudr_2', text: '¿Se ha verificado que no hubo deforestación ni degradación posterior al 31 de dic de 2020?' },
      { id: 'eudr_3', text: '¿Se cuenta con documentos que acrediten la legalidad de la propiedad de la tierra?' },
      { id: 'eudr_4', text: '¿El producto cumple con la legislación ambiental y laboral del país de origen?' },
      { id: 'eudr_5', text: '¿Existe trazabilidad documental completa del lote hasta el embarque?' },
      { id: 'eudr_6', text: '¿Se dispone de una declaración de debida diligencia para el lote?' },
    ]
  },
  {
    id: 'ICA_EXPORTADOR',
    label: 'ICA Predio Exportador',
    icon: '📜',
    description: 'Registro de lugares de producción de vegetales para exportación en fresco (Res. 824/2022).',
    questions: [
      { id: 'ica_exp_1', text: '¿El predio tiene registro vigente ante el ICA como lugar de producción para exportación?' },
      { id: 'ica_exp_2', text: '¿Cuenta con asistencia técnica de un Ingeniero Agrónomo con tarjeta profesional?' },
      { id: 'ica_exp_3', text: '¿Se mantienen registros actualizados de vigilancia fitosanitaria y control de plagas?' },
      { id: 'ica_exp_4', text: '¿El predio cumple con las distancias mínimas a fuentes de contaminación?' },
      { id: 'ica_exp_5', text: '¿Existen áreas delimitadas para almacenamiento de insumos, herramientas y poscosecha?' },
      { id: 'ica_exp_6', text: '¿Se realizan análisis de residuos de plaguicidas periódicamente?' },
    ]
  },
  {
    id: 'BPA_ICA',
    label: 'BPA (Buenas Prácticas)',
    icon: '💧',
    description: 'Estándares de inocuidad y sostenibilidad en la producción primaria.',
    questions: [
      { id: 'bpa_1', text: '¿Se dispone de agua de calidad adecuada para riego y lavado de equipos?' },
      { id: 'bpa_2', text: '¿Existe un plan documentado de manejo integrado de plagas (MIP)?' },
      { id: 'bpa_3', text: '¿Se cuenta con registros de fertilización basados en análisis de suelos?' },
      { id: 'bpa_4', text: '¿Los trabajadores cuentan con elementos de protección personal (EPP) y capacitación?' },
      { id: 'bpa_5', text: '¿Se realiza un manejo adecuado de residuos sólidos y envases de agroquímicos (Triple lavado)?' },
      { id: 'bpa_6', text: '¿Existen instalaciones sanitarias y áreas de bienestar para el personal?' },
      { id: 'bpa_7', text: '¿Se garantiza la trazabilidad mediante el uso de cuadernos de campo?' },
    ]
  },
  {
    id: 'FAIRTRADE',
    label: 'Fairtrade (Comercio Justo)',
    icon: '🤝',
    description: 'Certificación de sostenibilidad social, económica y ambiental.',
    questions: [
      { id: 'ft_1', text: '¿Se garantiza el pago de un precio mínimo y una prima orgánica/comercio justo?' },
      { id: 'ft_2', text: '¿La organización fomenta la democracia y transparencia en la toma de decisiones?' },
      { id: 'ft_3', text: '¿Se prohíbe estrictamente el trabajo infantil y el trabajo forzoso?' },
      { id: 'ft_4', text: '¿Existen contratos legales y condiciones laborales dignas para todos los empleados?' },
      { id: 'ft_5', text: '¿Se promueve la equidad de género y la no discriminación en el predio?' },
      { id: 'ft_6', text: '¿La organización cuenta con un plan de desarrollo social para la comunidad?' },
    ]
  },
  {
    id: 'RAINFOREST',
    label: 'Rainforest Alliance',
    icon: '🐸',
    description: 'Enfoque en la conservación de la biodiversidad y medios de vida sostenibles.',
    questions: [
      { id: 'ra_1', text: '¿Se protegen los ecosistemas naturales y se prohíbe la caza en el predio?' },
      { id: 'ra_2', text: '¿Se implementan prácticas de conservación de suelos y prevención de erosión?' },
      { id: 'ra_3', text: '¿Existe un sistema de gestión para reducir el uso de plaguicidas altamente peligrosos?' },
      { id: 'ra_4', text: '¿Se protege la salud de los trabajadores mediante capacitaciones en seguridad?' },
      { id: 'ra_5', text: '¿Se han implementado medidas de adaptación y resiliencia al cambio climático?' },
      { id: 'ra_6', text: '¿El predio respeta los derechos de las comunidades locales y pueblos indígenas?' },
    ]
  }
];

export const MOCK_FARMS = [
  { id: 1, name: 'Finca La Esperanza', lots: [
    { id: 101, name: 'Lote El Mirador', harvests: ['Cosecha Principal 2024', 'Maca 2024'] },
    { id: 102, name: 'Lote Bajo', harvests: ['Cosecha 2024'] }
  ]},
  { id: 2, name: 'Finca San José', lots: [
    { id: 201, name: 'Lote Principal', harvests: ['Gran Cosecha 2024'] }
  ]},
  { id: 3, name: 'Finca Las Brisas', lots: [
    { id: 301, name: 'Lote Ladera', harvests: ['Cosecha Primavera'] }
  ]}
];
