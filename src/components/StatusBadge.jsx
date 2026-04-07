import React from 'react';

/**
 * Badge de estado reutilizable.
 * @param {string} status - 'activo' | 'inactivo' | 'active' | 'inactive' | 'pendiente' | 'completado'
 * @param {string} [className] - clases adicionales
 */
const StatusBadge = ({ status, className = '' }) => {
  const statusMap = {
    activo:     { label: 'Activo',      classes: 'bg-green-100 text-green-800' },
    active:     { label: 'Activo',      classes: 'bg-green-100 text-green-800' },
    inactivo:   { label: 'Inactivo',    classes: 'bg-red-100 text-red-800' },
    inactive:   { label: 'Inactivo',    classes: 'bg-red-100 text-red-800' },
    pendiente:  { label: 'Pendiente',   classes: 'bg-yellow-100 text-yellow-800' },
    pending:    { label: 'Pendiente',   classes: 'bg-yellow-100 text-yellow-800' },
    completado: { label: 'Completado',  classes: 'bg-blue-100 text-blue-800' },
    completed:  { label: 'Completado',  classes: 'bg-blue-100 text-blue-800' },
  };

  const config = statusMap[status] ?? { label: status, classes: 'bg-gray-100 text-gray-700' };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${config.classes} ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full mr-1.5 bg-current opacity-60" />
      {config.label}
    </span>
  );
};

export default StatusBadge;
