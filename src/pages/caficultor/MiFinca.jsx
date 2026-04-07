import React, { useState } from 'react';
import { PageHeader, Card, Button, Modal, Input, ActionModal } from '../../components';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const DEPARTAMENTOS_COLOMBIA = [
  'Antioquia', 'Boyacá', 'Caldas', 'Cauca', 'Cesar', 'Chocó', 'Cundinamarca', 'Huila', 'La Guajira', 'Magdalena', 'Meta', 'Nariño', 'Norte de Santander', 'Quindío', 'Risaralda', 'Santander', 'Tolima', 'Valle del Cauca'
];

const C_MiFinca = () => {
  const [fincas, setFincas] = useState([{ id: 1, name: 'El Refugio', area: '12 Hectáreas', dept: 'Huila', altura: '1400 - 1700' }]);
  
  // Modal state
  const [showAddModal, setShowAddModal] = useState(false);
  const [alertModal, setAlertModal] = useState({ isOpen: false, type: 'info', title: '', message: '' });
  const [formData, setFormData] = useState({
    name: '',
    totalArea: '',
    unit: 'Hectáreas',
    coffeeArea: '',
    department: '',
    altura: ''
  });

  // Datos para el gráfico de "Tareas completadas"
  const tareasCompletadas = 18;
  const tareasPendientes = 5;
  const totalTareas = tareasCompletadas + tareasPendientes;
  const porcentaje = Math.round((tareasCompletadas / totalTareas) * 100);

  const data = {
    labels: ['Completadas', 'Pendientes'],
    datasets: [
      {
        data: [tareasCompletadas, tareasPendientes],
        backgroundColor: [
          '#10b981', // Emerald 500
          '#e5e7eb', // Gray 200
        ],
        borderWidth: 0,
        cutout: '80%',
      },
    ],
  };

  const options = {
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true }
    },
    maintainAspectRatio: false,
  };

  const handleAddFinca = (e) => {
    e.preventDefault();
    const newFinca = {
      id: Date.now(),
      name: formData.name,
      area: `${formData.totalArea} ${formData.unit}`,
      dept: formData.department,
      altura: formData.altura
    };
    setFincas([...fincas, newFinca]);
    setShowAddModal(false);
    setAlertModal({ isOpen: true, type: 'success', title: 'Éxito', message: 'Finca agregada correctamente.' });
    setFormData({ name: '', totalArea: '', unit: 'Hectáreas', coffeeArea: '', department: '', altura: '' });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Mi Finca"
        subtitle="Resumen general de tus propiedades y progreso de actividades"
      >
        <Button onClick={() => setShowAddModal(true)}>
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Agregar una finca
        </Button>
      </PageHeader>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Panel de Fincas (Contador y lista) */}
        <Card className="lg:col-span-2 shadow-sm border border-gray-100 flex flex-col">
          <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Total de Fincas Registradas</h3>
              <p className="text-sm text-gray-500">Administra tus plantaciones activas</p>
            </div>
            <div className="w-16 h-16 rounded-full bg-cafe-vino-50 flex items-center justify-center border-4 border-white shadow-sm">
              <span className="text-2xl font-black text-cafe-vino-700">{fincas.length}</span>
            </div>
          </div>

          {fincas.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center py-12 px-4 text-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
              <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <h4 className="text-lg font-semibold text-gray-900 mb-1">Aún no tienes fincas</h4>
              <p className="text-gray-500 text-sm mb-6 max-w-sm">Comienza agregando tu primera propiedad para monitorear cultivos, recibir asistencia técnica y ver estadísticas de clima.</p>
              <Button onClick={() => setShowAddModal(true)}>Agregar Primera Finca</Button>
            </div>
          ) : (
            <div className="space-y-4 flex-1">
              {fincas.map(finca => (
                <div key={finca.id} className="p-4 rounded-xl border border-gray-100 bg-white hover:shadow-md transition-shadow flex items-center justify-between group">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                       <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg">{finca.name}</h4>
                      <p className="text-sm text-gray-500">{finca.dept} • {finca.area} • Altura: {finca.altura}msnm</p>
                    </div>
                  </div>
                  <Button variant="secondary" className="opacity-0 group-hover:opacity-100 transition-opacity">Ver Finca</Button>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Panel de Progreso de Tareas */}
        <Card className="shadow-sm border border-gray-100">
           <h3 className="text-lg font-bold text-gray-900 mb-1">Productividad Actual</h3>
           <p className="text-sm text-gray-500 mb-8">Progreso de tareas y recomendaciones del Extensionista</p>
           
           <div className="relative w-48 h-48 mx-auto mb-6">
              <Doughnut data={data} options={options} />
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-4xl font-black text-gray-800 tracking-tight">{porcentaje}%</span>
                <span className="text-xs text-gray-500 font-medium uppercase mt-1">Completado</span>
              </div>
           </div>

           <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-emerald-600">{tareasCompletadas}</p>
                <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Hechas</p>
              </div>
              <div className="text-center border-l border-gray-100">
                <p className="text-2xl font-bold text-gray-400">{tareasPendientes}</p>
                <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Pendientes</p>
              </div>
           </div>
        </Card>

      </div>

      {/* Modal Agregar Finca */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Nueva Finca"
      >
        <form onSubmit={handleAddFinca} className="space-y-4">
          <Input
            label="Nombre de la Finca"
            placeholder="Ej: Finca El Mirador"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Total de Extensión</label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-cafe-vino-500 focus:ring-cafe-vino-500 sm:text-sm border py-2 px-3"
                  placeholder="Ej: 15"
                  value={formData.totalArea}
                  onChange={(e) => setFormData({ ...formData, totalArea: e.target.value })}
                  required
                />
                <select
                  className="block w-32 rounded-md border-gray-300 shadow-sm focus:border-cafe-vino-500 focus:ring-cafe-vino-500 sm:text-sm border py-2 px-3 bg-gray-50"
                  value={formData.unit}
                  onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                >
                  <option value="Hectáreas">Hectáreas</option>
                  <option value="Plazas">Plazas</option>
                </select>
              </div>
            </div>

            <Input
              label="Hectáreas totales del Café"
              type="number"
              placeholder="Ej: 12"
              value={formData.coffeeArea}
              onChange={(e) => setFormData({ ...formData, coffeeArea: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Departamento</label>
              <select
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-cafe-vino-500 focus:ring-cafe-vino-500 sm:text-sm border py-2 px-3 bg-white"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                required
              >
                <option value="">Selecciona un departamento...</option>
                {DEPARTAMENTOS_COLOMBIA.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Altura (msnm)</label>
              <select
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-cafe-vino-500 focus:ring-cafe-vino-500 sm:text-sm border py-2 px-3 bg-white"
                value={formData.altura}
                onChange={(e) => setFormData({ ...formData, altura: e.target.value })}
                required
              >
                <option value="">Selecciona altura...</option>
                <option value="< 1400">Menor a 1400 msnm</option>
                <option value="1400 - 1700">Entre 1400 y 1700 msnm</option>
                <option value="> 1700">Mayor a 1700 msnm</option>
              </select>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100 flex justify-end space-x-3">
            <Button
              variant="secondary"
              type="button"
              onClick={() => setShowAddModal(false)}
            >
              Cancelar
            </Button>
            <Button type="submit">
              Guardar Finca
            </Button>
          </div>
        </form>
      </Modal>

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

export default C_MiFinca;
