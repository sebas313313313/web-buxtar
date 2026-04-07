import React from 'react';

/**
 * Estado vacío para listas y tablas.
 * @param {string} [message] - Mensaje principal
 * @param {string} [searchTerm] - Término de búsqueda activo (muestra mensaje específico)
 * @param {React.ReactNode} [action] - Botón o acción adicional opcional
 */
const EmptyState = ({ message = 'No se encontraron resultados', searchTerm, action }) => {
  return (
    <div className="text-center py-16 px-4">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
        <svg
          className="h-8 w-8 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <h3 className="text-sm font-semibold text-gray-900 mb-1">{message}</h3>
      {searchTerm && (
        <p className="text-sm text-gray-500">
          No hay resultados para{' '}
          <span className="font-medium text-gray-700">"{searchTerm}"</span>
        </p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
};

export default EmptyState;
