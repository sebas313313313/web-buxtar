import React, { useState } from 'react';
import { PageHeader, Card, Button, Input, ActionModal } from '../../components';

const C_Perfil = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [alertModal, setAlertModal] = useState({ isOpen: false, type: 'info', title: '', message: '' });
  const [userData, setUserData] = useState({
    name: 'Carlos Rodríguez',
    idNumber: '1.098.765.432',
    phone: '310 123 4567',
    email: 'carlos.rodriguez@email.com',
    country: 'Colombia',
    birthDate: '1985-05-20',
    gender: 'Masculino'
  });

  const [editData, setEditData] = useState({ ...userData });

  const handleSave = () => {
    setUserData({ ...editData });
    setIsEditing(false);
    setAlertModal({ isOpen: true, type: 'success', title: 'Éxito', message: 'Datos del perfil actualizados correctamente.' });
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Mi Perfil" subtitle="Administra tu información personal y de contacto" />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* User Card */}
        <Card className="flex flex-col items-center text-center p-8 bg-white shadow-sm border border-gray-100">
          <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-cafe-vino-50 bg-gray-100">
            <img 
              src="https://i.pravatar.cc/150?u=carlos" 
              alt="Avatar" 
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className="text-xl font-bold text-gray-900">{userData.name}</h3>
          <p className="text-sm text-gray-500 mb-6">{userData.country}</p>
          <div className="flex space-x-2">
            {!isEditing && (
              <Button onClick={() => setIsEditing(true)}>
                Editar Información
              </Button>
            )}
          </div>
        </Card>

        {/* Info Card */}
        <Card className="md:col-span-2 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-900">Datos del Caficultor</h3>
            {isEditing && (
              <div className="flex space-x-2">
                <Button variant="secondary" onClick={() => setIsEditing(false)}>Cancelar</Button>
                <Button onClick={handleSave}>Guardar Cambios</Button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {isEditing ? (
              <>
                <Input 
                  label="Nombre Completo" 
                  value={editData.name} 
                  onChange={(e) => setEditData({...editData, name: e.target.value})}
                />
                <Input 
                  label="Número de Celular" 
                  value={editData.phone} 
                  onChange={(e) => setEditData({...editData, phone: e.target.value})}
                />
                <Input 
                  label="Correo Electrónico" 
                  value={editData.email} 
                  onChange={(e) => setEditData({...editData, email: e.target.value})}
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sexo</label>
                  <select 
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-cafe-vino-500 focus:ring-cafe-vino-500 sm:text-sm border py-2 px-3 bg-white"
                    value={editData.gender}
                    onChange={(e) => setEditData({...editData, gender: e.target.value})}
                  >
                    <option value="Masculino">Masculino</option>
                    <option value="Femenino">Femenino</option>
                    <option value="Otro">Otro</option>
                  </select>
                </div>
                <Input 
                  label="Fecha de Nacimiento" 
                  type="date"
                  value={editData.birthDate} 
                  onChange={(e) => setEditData({...editData, birthDate: e.target.value})}
                />
              </>
            ) : (
              <>
                <div className="space-y-1">
                  <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Cédula / ID</p>
                  <p className="text-gray-900 font-medium">{userData.idNumber}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Celular</p>
                  <p className="text-gray-900 font-medium">{userData.phone}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Correo Electrónico</p>
                  <p className="text-gray-900 font-medium">{userData.email}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">País</p>
                  <p className="text-gray-900 font-medium">{userData.country}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Sexo</p>
                  <p className="text-gray-900 font-medium">{userData.gender}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Fecha de Nacimiento</p>
                  <p className="text-gray-900 font-medium">{userData.birthDate}</p>
                </div>
              </>
            )}
          </div>
        </Card>
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

export default C_Perfil;
