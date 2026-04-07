import React, { useState } from 'react';
import { Card, Button, ActionModal } from '../../components';
import { useAuthHook } from '../../hooks/useAuth';

const Perfil = () => {
  const { user, getRoleName } = useAuthHook();
  const [isEditing, setIsEditing] = useState(false);
  const [alertModal, setAlertModal] = useState({ isOpen: false, type: 'info', title: '', message: '' });
  const [formData, setFormData] = useState({
    empresa: user?.empresa || 'Empresa Cafetera S.A.S.',
    nit: '900.876.543-2',
    email: user?.email || 'contacto@empresacafetera.com',
    telefono: '+57 6 789 0123',
    direccion: 'Calle 22 #15-30, Manizales, Caldas, Colombia',
    descripcion: 'Empresa dedicada a la exportación de café de alta calidad y apoyo técnico a caficultores de la región central.'
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
    console.log('Guardando datos de empresa:', formData);
    setIsEditing(false);
    setAlertModal({ isOpen: true, type: 'success', title: 'Éxito', message: 'Perfil de empresa actualizado correctamente' });
  };

  const handleCancel = () => {
    // Restaurar datos originales (simulado)
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cafe-vino-50 via-white to-coffee-50">
      {/* Header con gradiente */}
      <div className="bg-gradient-to-r from-cafe-vino-600 to-cafe-vino-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-3xl font-light mb-2">Panel de Administración de Empresa</h1>
            <p className="text-cafe-vino-100 text-sm">Información corporativa y operativa</p>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Sección superior con avatar/logo */}
          <div className="bg-gradient-to-r from-cafe-vino-500 to-cafe-vino-700 px-8 py-12">
            <div className="flex flex-col items-center">
              <div className="relative">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-3xl font-light text-cafe-vino-600">
                    {formData.empresa.charAt(0).toUpperCase()}
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
                {getRoleName()} • ID: {formData.nit}
              </p>
            </div>
          </div>

          {/* Información Detallada */}
          <div className="p-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                    Razón Social
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
                      <p className="text-gray-900 font-medium">{formData.empresa}</p>
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                    NIT / Identificación Fiscal
                  </label>
                  <div className="bg-gray-50 rounded-lg px-4 py-3 border border-gray-200 opacity-75">
                    <p className="text-gray-900 font-medium">{formData.nit}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                    Correo de Contacto
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
                      <p className="text-gray-900 font-medium">{formData.email}</p>
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                    Teléfono Administrativo
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
                      <p className="text-gray-900 font-medium">{formData.telefono}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                Dirección Principal
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
                  <p className="text-gray-900 font-medium">{formData.direccion}</p>
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                Descripción de la Empresa
              </label>
              {isEditing ? (
                <textarea
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full bg-white rounded-lg px-4 py-3 border border-cafe-vino-300 focus:ring-cafe-vino-500 focus:border-cafe-vino-500"
                />
              ) : (
                <div className="bg-gray-50 rounded-lg px-4 py-3 border border-gray-200">
                  <p className="text-gray-900 font-medium leading-relaxed">{formData.descripcion}</p>
                </div>
              )}
            </div>

            {/* Estadísticas de Activos */}
            <div className="border-t border-gray-200 pt-8">
              <h3 className="text-lg font-light text-gray-900 mb-6 italic">Visualización de Activos de la Empresa</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-cafe-vino-50 rounded-lg border border-cafe-vino-100">
                  <div className="text-xl font-semibold text-cafe-vino-600">12</div>
                  <div className="text-xs text-gray-600 mt-1 uppercase tracking-tighter">Extensionistas</div>
                </div>
                <div className="text-center p-4 bg-coffee-50 rounded-lg border border-coffee-100">
                  <div className="text-xl font-semibold text-coffee-600">450</div>
                  <div className="text-xs text-gray-600 mt-1 uppercase tracking-tighter">Caficultores</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg border border-green-100">
                  <div className="text-xl font-semibold text-green-600">380</div>
                  <div className="text-xs text-gray-600 mt-1 uppercase tracking-tighter">Fincas</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <div className="text-xl font-semibold text-blue-600">1,240</div>
                  <div className="text-xs text-gray-600 mt-1 uppercase tracking-tighter">Lotes</div>
                </div>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="flex justify-center space-x-4 pt-8 border-t border-gray-200">
              {isEditing ? (
                <>
                  <Button variant="outline" className="px-8" onClick={handleCancel}>
                    Cancelar
                  </Button>
                  <Button className="px-8" onClick={handleSave}>
                    Guardar Cambios
                  </Button>
                </>
              ) : (
                <Button variant="outline" className="px-8" onClick={() => setIsEditing(true)}>
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Editar Información
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-8 text-center text-xs text-gray-400">
          <p>© 2024 {formData.empresa} • Sistema de Gestión de Calidad Cafetera</p>
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
