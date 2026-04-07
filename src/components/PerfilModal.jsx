import React, { useState } from 'react';
import { Button } from './index';
import { useAuthHook } from '../hooks/useAuth';

const PerfilModal = ({ isOpen, onClose }) => {
  const { user, getRoleName } = useAuthHook();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    empresa: user?.empresa || 'Café Export S.A.',
    nit: '900.123.456-7',
    email: user?.email || 'contacto@cafeexport.com',
    telefono: '+57 1 234 5678',
    direccion: 'Cra. 10 #45-67, Bogotá, Colombia'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    console.log('Guardando datos:', formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      empresa: user?.empresa || 'Café Export S.A.',
      nit: '900.123.456-7',
      email: user?.email || 'contacto@cafeexport.com',
      telefono: '+57 1 234 5678',
      direccion: 'Cra. 10 #45-67, Bogotá, Colombia'
    });
    setIsEditing(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header con gradiente */}
          <div className="bg-gradient-to-r from-wine-600 to-wine-800 text-white px-8 py-8 rounded-t-2xl">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-light">Perfil de la Empresa</h2>
                <p className="text-wine-100 text-sm mt-1">Gestión de información cafetera</p>
              </div>
              <button
                onClick={onClose}
                className="text-wine-200 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Contenido */}
          <div className="p-8 space-y-6">
            {/* Avatar y nombre */}
            <div className="flex items-center space-x-6 pb-6 border-b border-gray-200">
              <div className="relative">
                <div className="w-20 h-20 bg-wine-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-light text-wine-600">
                    {user?.name?.charAt(0)?.toUpperCase() || 'C'}
                  </span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-coffee-600 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-light text-gray-900">
                  {formData.empresa}
                </h3>
                <p className="text-gray-600 text-sm">
                  {getRoleName()} • {user?.name || 'Administrador'}
                </p>
              </div>
            </div>

            {/* Formulario */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                    Nombre de la Empresa
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="empresa"
                      value={formData.empresa}
                      onChange={handleInputChange}
                      className="w-full bg-white rounded-lg px-4 py-2 border border-wine-300 focus:ring-wine-500 focus:border-wine-500"
                    />
                  ) : (
                    <div className="bg-gray-50 rounded-lg px-4 py-2 border border-gray-200">
                      <p className="text-gray-900 font-medium">
                        {formData.empresa}
                      </p>
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                    NIT
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="nit"
                      value={formData.nit}
                      onChange={handleInputChange}
                      className="w-full bg-white rounded-lg px-4 py-2 border border-wine-300 focus:ring-wine-500 focus:border-wine-500"
                    />
                  ) : (
                    <div className="bg-gray-50 rounded-lg px-4 py-2 border border-gray-200">
                      <p className="text-gray-900 font-medium">
                        {formData.nit}
                      </p>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                    Correo Electrónico
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-white rounded-lg px-4 py-2 border border-wine-300 focus:ring-wine-500 focus:border-wine-500"
                    />
                  ) : (
                    <div className="bg-gray-50 rounded-lg px-4 py-2 border border-gray-200">
                      <p className="text-gray-900 font-medium">
                        {formData.email}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                    Teléfono
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleInputChange}
                      className="w-full bg-white rounded-lg px-4 py-2 border border-wine-300 focus:ring-wine-500 focus:border-wine-500"
                    />
                  ) : (
                    <div className="bg-gray-50 rounded-lg px-4 py-2 border border-gray-200">
                      <p className="text-gray-900 font-medium">
                        {formData.telefono}
                      </p>
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                    Dirección
                  </label>
                  {isEditing ? (
                    <textarea
                      name="direccion"
                      value={formData.direccion}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full bg-white rounded-lg px-4 py-2 border border-wine-300 focus:ring-wine-500 focus:border-wine-500"
                    />
                  ) : (
                    <div className="bg-gray-50 rounded-lg px-4 py-2 border border-gray-200">
                      <p className="text-gray-900 font-medium">
                        {formData.direccion}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Estadísticas rápidas */}
            <div className="border-t border-gray-200 pt-6">
              <h4 className="text-sm font-light text-gray-900 mb-4">Resumen Cafetero</h4>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-wine-50 rounded-lg border border-wine-100">
                  <div className="text-xl font-light text-wine-600">156</div>
                  <div className="text-xs text-gray-600 mt-1">Caficultores</div>
                </div>
                <div className="text-center p-4 bg-coffee-50 rounded-lg border border-coffee-100">
                  <div className="text-xl font-light text-coffee-600">89</div>
                  <div className="text-xs text-gray-600 mt-1">Fincas Activas</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg border border-green-100">
                  <div className="text-xl font-light text-green-600">2,770</div>
                  <div className="text-xs text-gray-600 mt-1">kg/mes Producción</div>
                </div>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
              {isEditing ? (
                <>
                  <Button 
                    variant="outline" 
                    onClick={handleCancel}
                  >
                    Cancelar
                  </Button>
                  <Button 
                    onClick={handleSave}
                  >
                    Guardar Cambios
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    variant="outline" 
                    onClick={() => setIsEditing(true)}
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Editar Perfil
                  </Button>
                  <Button>
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Configuración
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerfilModal;
