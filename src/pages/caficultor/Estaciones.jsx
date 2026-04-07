import React, { useState } from 'react';
import { PageHeader, Card, Button, StatusBadge, ActionModal } from '../../components';

const C_Estaciones = () => {
  const [estaciones, setEstaciones] = useState([
    { id: 1, name: 'Estación Lote Norte', serial: 'SN-7829-X', status: 'Activo', lastUpdate: 'Hace 5 min' },
    { id: 2, name: 'Estación Lote Sur', serial: 'SN-4432-Y', status: 'Inactivo', lastUpdate: 'Hace 2 horas' },
  ]);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null });
  const [alertModal, setAlertModal] = useState({ isOpen: false, type: 'info', title: '', message: '' });

  const toggleStatus = (id) => {
    const estacion = estaciones.find(e => e.id === id);
    if (!estacion) return;
    const newStatus = estacion.status === 'Activo' ? 'Inactivo' : 'Activo';
    
    setEstaciones(estaciones.map(e => 
      e.id === id ? { ...e, status: newStatus } : e
    ));
    
    setAlertModal({ 
      isOpen: true, 
      type: 'success', 
      title: 'Estado Actualizado', 
      message: `La estación ${estacion.name} ha sido marcada como ${newStatus}.` 
    });
  };

  const deleteEstacion = (id) => {
    setDeleteModal({ isOpen: true, id });
  };

  const confirmDelete = () => {
    if (deleteModal.id) {
      setEstaciones(estaciones.filter(e => e.id !== deleteModal.id));
      setDeleteModal({ isOpen: false, id: null });
      setAlertModal({ isOpen: true, type: 'success', title: 'Éxito', message: 'Estación eliminada permanentemente.' });
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Estaciones Meteorológicas" 
        subtitle="Monitoreo IoT en tiempo real de tus hectáreas"
      >
        <Button>
           <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
           Vincular Estación
        </Button>
      </PageHeader>

      <div className="grid grid-cols-1 gap-4">
        {estaciones.map((estacion) => (
          <Card key={estacion.id} className="p-0 overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${estacion.status === 'Activo' ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-100 text-gray-400'}`}>
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"/></svg>
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-lg font-bold text-gray-900">{estacion.name}</h3>
                    <StatusBadge status={estacion.status} />
                  </div>
                  <p className="text-sm text-gray-500">Serial: <span className="font-mono text-xs">{estacion.serial}</span> • Sincronizado: {estacion.lastUpdate}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Button variant="secondary" size="sm">Ver Datos</Button>
                <Button 
                  variant="secondary" 
                  size="sm" 
                  className={estacion.status === 'Activo' ? 'text-amber-600' : 'text-emerald-600'}
                  onClick={() => toggleStatus(estacion.id)}
                >
                  {estacion.status === 'Activo' ? 'Desactivar' : 'Activar'}
                </Button>
                <Button 
                  variant="secondary" 
                  size="sm" 
                  className="text-red-600 hover:bg-red-50"
                  onClick={() => deleteEstacion(estacion.id)}
                >
                  Eliminar
                </Button>
              </div>
            </div>
          </Card>
        ))}

        {estaciones.length === 0 && (
          <div className="py-20 text-center bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
             <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm mx-auto mb-4">
                <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
             </div>
             <h4 className="text-gray-900 font-bold">No hay estaciones vinculadas</h4>
             <p className="text-gray-500 text-sm">Vincule su primer dispositivo IoT para comenzar el monitoreo técnico.</p>
          </div>
        )}
      </div>

      <ActionModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, id: null })}
        onAction={confirmDelete}
        title="Eliminar Estación"
        description="¿Estás seguro que deseas desvincular y eliminar esta estación? Esta acción no se puede deshacer."
        actionText="Eliminar"
        cancelText="Cancelar"
        icon="danger"
        actionColor="danger"
      />

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

export default C_Estaciones;
