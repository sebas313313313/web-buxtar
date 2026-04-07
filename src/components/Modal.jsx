import React from 'react';

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  backdrop = 'opaque',
  className = '',
  showCloseButton = true,
  closeOnBackdrop = true,
  ...props
}) => {
  if (!isOpen) return null;

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-full mx-4',
  };

  const handleBackdropClick = (e) => {
    if (closeOnBackdrop && e.target === e.currentTarget) {
      onClose();
    }
  };

  // Prevenir que el evento se propague al backdrop
  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
        {/* Backdrop */}
        <div
          className={`fixed inset-0 transition-opacity ${
            backdrop === 'blur'
              ? 'bg-black/30 backdrop-blur-sm'
              : backdrop === 'transparent'
              ? 'bg-transparent'
              : 'bg-black/50'
          }`}
          onClick={handleBackdropClick}
        />

        {/* Modal panel */}
        <div
          className={`
            relative inline-block w-full ${sizes[size]} p-6 my-8 text-left align-middle transition-all transform bg-white shadow-2xl rounded-2xl
            ${className}
          `}
          onClick={handleModalClick}
          {...props}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            {title && (
              <h3 className="text-lg font-semibold leading-6 text-gray-900">
                {title}
              </h3>
            )}
            {showCloseButton && (
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>

          {/* Body */}
          <div className="mt-2">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
