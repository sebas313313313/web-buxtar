import React from 'react';
import Modal from './Modal';

const ActionModal = ({
  isOpen,
  onClose,
  onAction,
  title,
  description,
  actionText = 'Confirmar',
  cancelText = 'Cancelar',
  actionColor = 'danger',
  icon = 'warning', // 'warning', 'success', 'info'
  backdrop = 'blur'
}) => {
  const getIcon = () => {
    switch (icon) {
      case 'warning':
      case 'danger':
        return (
          <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10 shadow-sm border border-red-200">
            <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        );
      case 'success':
        return (
          <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10 shadow-sm border border-green-200">
            <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
        );
      case 'info':
      default:
        return (
          <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10 shadow-sm border border-blue-200">
            <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
            </svg>
          </div>
        );
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      backdrop={backdrop}
      size="md"
      showCloseButton={false}
      className="p-6 overflow-hidden md:p-8"
    >
      <div className="sm:flex sm:items-start">
        {getIcon()}
        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
          <h3 className="text-lg font-semibold leading-6 text-gray-900" id="modal-title">
            {title}
          </h3>
          <div className="mt-2 text-left">
            <p className="text-sm text-gray-500">
              {description}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-6 sm:mt-6 sm:flex sm:flex-row-reverse">
        <button
          type="button"
          className={`inline-flex w-full justify-center rounded-xl px-4 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
            actionColor === 'danger' ? 'bg-red-600 hover:bg-red-500 focus-visible:outline-red-600' : 
            actionColor === 'success' ? 'bg-green-600 hover:bg-green-500 focus-visible:outline-green-600' :
            'bg-cafe-vino-600 hover:bg-cafe-vino-500 focus-visible:outline-cafe-vino-600'
          }`}
          onClick={onAction}
        >
          {actionText}
        </button>
        {cancelText && (
          <button
            type="button"
            className="mt-3 inline-flex w-full justify-center rounded-xl bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto transition-colors"
            onClick={onClose}
          >
            {cancelText}
          </button>
        )}
      </div>
    </Modal>
  );
};

export default ActionModal;
