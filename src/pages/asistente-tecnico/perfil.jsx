import React, { useState } from 'react';
import { Card, Button, ActionModal } from '../../components';
import { useAuthHook } from '../../hooks/useAuth';

const Perfil = () => {
  const { user, getRoleName } = useAuthHook();
  const [isEditing, setIsEditing] = useState(false);
  const [alertModal, setAlertModal] = useState({ isOpen: false, type: 'info', title: '', message: '' });
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
    // Aquí iría la lógica para guardar los datos
    setAlertModal({ isOpen: true, type: 'success', title: 'Éxito', message: 'Datos del perfil actualizados correctamente.' });
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Restaurar datos originales
    setFormData({
      empresa: user?.empresa || 'Café Export S.A.',
      nit: '900.123.456-7',
      email: user?.email || 'contacto@cafeexport.com',
      telefono: '+57 1 234 5678',
      direccion: 'Cra. 10 #45-67, Bogotá, Colombia'
    });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cafe-vino-50 via-white to-coffee-50">
      {/* Header con gradiente */}
      <div className="bg-gradient-to-r from-cafe-vino-600 to-cafe-vino-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-3xl font-light mb-2">Perfil de la Empresa</h1>
            <p className="text-cafe-vino-100 text-sm">Gestión de información cafetera</p>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Sección superior con avatar */}
          <div className="bg-gradient-to-r from-cafe-vino-500 to-cafe-vino-700 px-8 py-12">
            <div className="flex flex-col items-center">
              <div className="relative">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-3xl font-light text-cafe-vino-600">
                    {user?.name?.charAt(0)?.toUpperCase() || 'C'}
                  </span>
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-coffee-600 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </div>
              </div>
              <h2 className="mt-4 text-2xl font-light text-white">
                {formData.empresa}
              </h2>
              <p className="text-cafe-vino-100 text-sm mt-1">
                {getRoleName()} • {user?.name || 'Administrador'}
              </p>
            </div>
          </div>

          {/* Información de la empresa */}
          <div className="p-8 space-cafe-vino-8">
            {/* Información básica */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-cafe-vino-6">
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
                      className="w-full bg-white rounded-lg px-4 py-3 border border-cafe-vino-300 focus:ring-cafe-vino-500 focus:border-cafe-vino-500"
                    />
                  ) : (
                    <div className="bg-gray-50 rounded-lg px-4 py-3 border border-gray-200">
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
                      className="w-full bg-white rounded-lg px-4 py-3 border border-cafe-vino-300 focus:ring-cafe-vino-500 focus:border-cafe-vino-500"
                    />
                  ) : (
                    <div className="bg-gray-50 rounded-lg px-4 py-3 border border-gray-200">
                      <p className="text-gray-900 font-medium">
                        {formData.nit}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-cafe-vino-6">
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
                      className="w-full bg-white rounded-lg px-4 py-3 border border-cafe-vino-300 focus:ring-cafe-vino-500 focus:border-cafe-vino-500"
                    />
                  ) : (
                    <div className="bg-gray-50 rounded-lg px-4 py-3 border border-gray-200">
                      <p className="text-gray-900 font-medium">
                        {formData.email}
                      </p>
                    </div>
                  )}
                </div>
                
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
                      className="w-full bg-white rounded-lg px-4 py-3 border border-cafe-vino-300 focus:ring-cafe-vino-500 focus:border-cafe-vino-500"
                    />
                  ) : (
                    <div className="bg-gray-50 rounded-lg px-4 py-3 border border-gray-200">
                      <p className="text-gray-900 font-medium">
                        {formData.telefono}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Dirección */}
            <div>
              <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                Dirección
              </label>
              {isEditing ? (
                <textarea
                  name="direccion"
                  value={formData.direccion}
                  onChange={handleInputChange}
                  rows={2}
                  className="w-full bg-white rounded-lg px-4 py-3 border border-cafe-vino-300 focus:ring-cafe-vino-500 focus:border-cafe-vino-500"
                />
              ) : (
                <div className="bg-gray-50 rounded-lg px-4 py-3 border border-gray-200">
                  <p className="text-gray-900 font-medium">
                    {formData.direccion}
                  </p>
                </div>
              )}
            </div>

            {/* Estadísticas rápidas */}
            <div className="border-t border-gray-200 pt-8">
              <h3 className="text-lg font-light text-gray-900 mb-6">Resumen Cafetero</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-cafe-vino-50 rounded-lg border border-cafe-vino-100">
                  <div className="text-2xl font-light text-cafe-vino-600">156</div>
                  <div className="text-sm text-gray-600 mt-1">Caficultores</div>
                </div>
                <div className="text-center p-6 bg-coffee-50 rounded-lg border border-coffee-100">
                  <div className="text-2xl font-light text-coffee-600">89</div>
                  <div className="text-sm text-gray-600 mt-1">Fincas Activas</div>
                </div>
                <div className="text-center p-6 bg-green-50 rounded-lg border border-green-100">
                  <div className="text-2xl font-light text-green-600">2,770</div>
                  <div className="text-sm text-gray-600 mt-1">kg/mes Producción</div>
                </div>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="flex justify-center space-x-4 pt-8 border-t border-gray-200">
              {isEditing ? (
                <>
                  <Button 
                    variant="outline" 
                    className="px-8"
                    onClick={handleCancel}
                  >
                    Cancelar
                  </Button>
                  <Button 
                    className="px-8"
                    onClick={handleSave}
                  >
                    Guardar Cambios
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    variant="outline" 
                    className="px-8"
                    onClick={() => setIsEditing(true)}
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Editar Perfil
                  </Button>
                  <Button className="px-8">
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

        {/* Footer minimalista */}
        <div className="mt-12 text-center text-sm text-gray-500">
          <p>© 2024 {formData.empresa} • Todos los derechos reservados</p>
          <div className="mt-2 space-x-4">
            <a href="#" className="hover:text-cafe-vino-600 transition-colors">Equipo</a>
            <a href="#" className="hover:text-cafe-vino-600 transition-colors">Acerca de</a>
            <a href="#" className="hover:text-cafe-vino-600 transition-colors">Blog</a>
            <a href="#" className="hover:text-cafe-vino-600 transition-colors">Licencia</a>
          </div>
        </div>
      </div>

      <ActionModal
        isOpen={alertModal.isOpen}
        onClose={() => setAlertModal({ ...alertModal, isOpen: false })}
        onAction={() => setAlertModal({ ...alertModal, isOpen: false })}
        title={alertModal.title}
        description={alertModal.message}
        actionText="Aceptar"
        cancelText={null}
        icon={alertModal.type}
        actionColor="primary"
      />
    </div>
  );
};

export default Perfil;
