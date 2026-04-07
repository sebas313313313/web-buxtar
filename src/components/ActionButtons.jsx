import React from 'react';

/**
 * Botones de acción circulares reutilizables para tablas.
 * @param {function} [onEdit] - Manejador de edición
 * @param {function} [onDelete] - Manejador de eliminación
 * @param {function} [onToggle] - Manejador de activar/desactivar
 * @param {boolean} [isActive] - Estado activo para el botón toggle
 * @param {boolean} [showEdit=true]
 * @param {boolean} [showDelete=true]
 * @param {boolean} [showToggle=false]
 */
const ActionButtons = ({
  onView,
  onEdit,
  onDelete,
  onToggle,
  onLogin,
  onBlock,
  onRecommend,
  isActive = true,
  showView = false,
  showEdit = true,
  showDelete = true,
  showToggle = false,
  showLogin = false,
  showBlock = false,
  showRecommend = false,
}) => {
  return (
    <div className="flex items-center gap-1.5 justify-end">
      {/* Recomendaciones */}
      {showRecommend && onRecommend && (
        <button
          onClick={onRecommend}
          title="Ver recomendaciones / Tareas"
          className="inline-flex items-center justify-center w-8 h-8 rounded-full
            bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
        </button>
      )}

      {/* Ver */}
      {showView && onView && (
        <button
          onClick={onView}
          title="Ver detalles"
          className="inline-flex items-center justify-center w-8 h-8 rounded-full
            bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        </button>
      )}

      {/* Bloquear */}
      {showBlock && onBlock && (
        <button
          onClick={onBlock}
          title="Bloquear/Desbloquear"
          className="inline-flex items-center justify-center w-8 h-8 rounded-full
            bg-orange-50 text-amber-600 hover:bg-orange-100 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </button>
      )}

      {/* Editar */}
      {showEdit && onEdit && (
        <button
          onClick={onEdit}
          title="Editar"
          className="inline-flex items-center justify-center w-8 h-8 rounded-full
            bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
        </button>
      )}

      {/* Eliminar */}
      {showDelete && onDelete && (
        <button
          onClick={onDelete}
          title="Eliminar"
          className="inline-flex items-center justify-center w-8 h-8 rounded-full
            bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      )}

      {/* Activar / Desactivar */}
      {showToggle && onToggle && (
        <button
          onClick={onToggle}
          title={isActive ? 'Desactivar' : 'Activar'}
          className={`inline-flex items-center justify-center w-8 h-8 rounded-full transition-colors ${
            isActive
              ? 'bg-orange-50 text-orange-600 hover:bg-orange-100'
              : 'bg-green-50 text-green-600 hover:bg-green-100'
          }`}
        >
          {isActive ? (
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
              />
            </svg>
          ) : (
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
        </button>
      )}

      {/* Login */}
      {showLogin && onLogin && (
        <button
          onClick={onLogin}
          title="Ingresar como este usuario"
          className="inline-flex items-center justify-center w-8 h-8 rounded-full
            bg-purple-50 text-purple-600 hover:bg-purple-100 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default ActionButtons;
