import React from 'react';

/**
 * Encabezado estándar de página.
 * @param {string} title - Título principal
 * @param {string} [subtitle] - Subtítulo opcional
 * @param {React.ReactNode} [children] - Slot para botones de acción (derecha)
 */
const PageHeader = ({ title, subtitle, children }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 leading-tight">{title}</h1>
        {subtitle && (
          <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
        )}
      </div>
      {children && (
        <div className="flex items-center gap-3 flex-shrink-0">
          {children}
        </div>
      )}
    </div>
  );
};

export default PageHeader;
