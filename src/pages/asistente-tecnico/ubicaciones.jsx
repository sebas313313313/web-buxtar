import React, { useState } from 'react';

const Ubicaciones = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUbicacion, setSelectedUbicacion] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Datos ficticios de ubicaciones
  const [ubicaciones] = useState([
    {
      id: 1,
      nombre: 'Finca La Esperanza',
      caficultor: 'Carlos Rodríguez',
      zona: 'Norte',
      departamento: 'Antioquia',
      municipio: 'Amalfi',
      vereda: 'El Diamante',
      coordenadas: { lat: 6.9167, lng: -75.0667 },
      altitud: 1850,
      area: 25.5,
      variedad: 'Caturra',
      densidad: 2500,
      fechaRegistro: '2024-01-15'
    },
    {
      id: 2,
      nombre: 'Finca El Sol',
      caficultor: 'Ana López',
      zona: 'Norte',
      departamento: 'Antioquia',
      municipio: 'Amalfi',
      vereda: 'La Primavera',
      coordenadas: { lat: 6.9234, lng: -75.0723 },
      altitud: 1920,
      area: 18.3,
      variedad: 'Colombia',
      densidad: 2200,
      fechaRegistro: '2024-01-20'
    },
    {
      id: 3,
      nombre: 'Finca Buena Vista',
      caficultor: 'Luis Torres',
      zona: 'Central',
      departamento: 'Caldas',
      municipio: 'Manizales',
      vereda: 'La Linda',
      coordenadas: { lat: 5.0667, lng: -75.5167 },
      altitud: 2100,
      area: 32.8,
      variedad: 'Typica',
      densidad: 1800,
      fechaRegistro: '2024-02-01'
    },
    {
      id: 4,
      nombre: 'Finca San José',
      caficultor: 'Pedro Gómez',
      zona: 'Sur',
      departamento: 'Huila',
      municipio: 'Pitalito',
      vereda: 'El Paraíso',
      coordenadas: { lat: 2.0500, lng: -75.9833 },
      altitud: 1650,
      area: 28.7,
      variedad: 'Bourbon',
      densidad: 2000,
      fechaRegistro: '2024-02-10'
    },
    {
      id: 5,
      nombre: 'Finca Las Brisas',
      caficultor: 'Diego Herrera',
      zona: 'Sur',
      departamento: 'Huila',
      municipio: 'Pitalito',
      vereda: 'Los Naranjos',
      coordenadas: { lat: 2.0567, lng: -75.9890 },
      altitud: 1720,
      area: 22.1,
      variedad: 'Maragogipe',
      densidad: 1900,
      fechaRegistro: '2024-02-15'
    }
  ]);

  const filteredUbicaciones = ubicaciones.filter(ubicacion =>
    ubicacion.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ubicacion.caficultor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ubicacion.zona.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ubicacion.municipio.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (ubicacion) => {
    setSelectedUbicacion(ubicacion);
    setShowEditModal(true);
  };

  const handleViewMap = (ubicacion) => {
    const url = `https://www.google.com/maps?q=${ubicacion.coordenadas.lat},${ubicacion.coordenadas.lng}`;
    window.open(url, '_blank');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-CO');
  };

  const getZonaColor = (zona) => {
    switch(zona) {
      case 'Norte': return 'bg-blue-100 text-blue-800';
      case 'Central': return 'bg-green-100 text-green-800';
      case 'Sur': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Ubicaciones</h1>
          <p className="text-gray-600">Gestión de ubicaciones de fincas cafeteras</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-cafe-vino-600 text-white rounded-lg hover:bg-cafe-vino-700 transition-colors"
        >
          Agregar Ubicación
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar por nombre, caficultor, zona o municipio..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cafe-vino-500 focus:border-cafe-vino-500"
              />
              <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
              </div>
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Total Fincas</dt>
                <dd className="text-lg font-medium text-gray-900">{ubicaciones.length}</dd>
              </dl>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                </svg>
              </div>
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Área Total</dt>
                <dd className="text-lg font-medium text-gray-900">{ubicaciones.reduce((sum, u) => sum + u.area, 0).toFixed(1)} ha</dd>
              </dl>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Altitud Promedio</dt>
                <dd className="text-lg font-medium text-gray-900">{Math.round(ubicaciones.reduce((sum, u) => sum + u.altitud, 0) / ubicaciones.length)} msnm</dd>
              </dl>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-orange-500 rounded-md flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              </div>
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Variedades</dt>
                <dd className="text-lg font-medium text-gray-900">{[...new Set(ubicaciones.map(u => u.variedad))].length}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Lista de Ubicaciones</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nombre
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Caficultor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Zona
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ubicación
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Área
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Altitud
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Variedad
                </th>
                <th className="relative px-6 py-3">
                  <span className="sr-only">Acciones</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUbicaciones.map((ubicacion) => (
                <tr key={ubicacion.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{ubicacion.nombre}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{ubicacion.caficultor}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getZonaColor(ubicacion.zona)}`}>
                      {ubicacion.zona}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <div>{ubicacion.municipio}, {ubicacion.departamento}</div>
                      <div className="text-xs text-gray-500">{ubicacion.vereda}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{ubicacion.area} ha</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{ubicacion.altitud} msnm</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{ubicacion.variedad}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleViewMap(ubicacion)}
                        className="inline-flex items-center px-2 py-1 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors text-xs"
                      >
                        Mapa
                      </button>
                      <button
                        onClick={() => handleEdit(ubicacion)}
                        className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors text-xs"
                      >
                        Editar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Agregar Ubicación */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={() => setShowAddModal(false)}
          ></div>
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
            <div className="relative inline-block w-full bg-white rounded-2xl shadow-2xl max-w-2xl p-6 my-8 text-left align-middle transition-all transform">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold leading-6 text-gray-900">Agregar Nueva Ubicación</h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <h4 className="font-medium text-blue-900 mb-2">Funcionalidad en Desarrollo</h4>
                <p className="text-sm text-blue-800">
                  Esta funcionalidad está actualmente en desarrollo. Próximamente podrás agregar nuevas ubicaciones con todas las características geográficas y de cultivo.
                </p>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Editar Ubicación */}
      {showEditModal && selectedUbicacion && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={() => setShowEditModal(false)}
          ></div>
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
            <div className="relative inline-block w-full bg-white rounded-2xl shadow-2xl max-w-2xl p-6 my-8 text-left align-middle transition-all transform">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold leading-6 text-gray-900">Editar Ubicación</h3>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="bg-orange-50 p-4 rounded-lg mb-6">
                <h4 className="font-medium text-orange-900 mb-2">Funcionalidad en Desarrollo</h4>
                <p className="text-sm text-orange-800">
                  Esta funcionalidad está actualmente en desarrollo. Próximamente podrás editar las ubicaciones con todas sus características.
                </p>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Ubicaciones;
