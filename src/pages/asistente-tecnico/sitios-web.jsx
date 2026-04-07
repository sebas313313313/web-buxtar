import React, { useState } from 'react';
import { ActionModal } from '../../components';

const SitiosWeb = () => {
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedEmpresa, setSelectedEmpresa] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showGroupSelection, setShowGroupSelection] = useState(false);
  const [editingSitio, setEditingSitio] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null });
  const [alertModal, setAlertModal] = useState({ isOpen: false, type: 'info', title: '', message: '' });
  
  // Estados para el formulario de crear sitio
  const [nuevoSitio, setNuevoSitio] = useState({
    titulo: '',
    url: '',
    paraTodosLosGrupos: true,
    grupoId: null,
    empresaId: null
  });

  // Estados para el formulario de editar sitio
  const [sitioEditado, setSitioEditado] = useState({
    titulo: '',
    url: '',
    paraTodosLosGrupos: true,
    grupoId: null,
    empresaId: null
  });

  // Estados para los datos (ahora con setGruposCaficultores para poder actualizar)
  const [empresas] = useState([
    { id: 1, nombre: 'Café Colombia S.A.', nit: '900123456', descripcion: 'Principal empresa caficultora' },
    { id: 2, nombre: 'Agroindustrias del Valle', nit: '900789012', descripcion: 'Especializada en procesamiento' },
    { id: 3, nombre: 'Cafeteros Unidos', nit: '900345678', descripcion: 'Cooperativa de caficultores' },
    { id: 4, nombre: 'Exportaciones Café Andino', nit: '900901234', descripcion: 'Exportadora internacional' }
  ]);

  // Datos de sitios web (ahora con setSitiosWeb para poder actualizar)
  const [sitiosWeb, setSitiosWeb] = useState([
    { id: 1, titulo: 'Portal Principal', url: 'https://www.cafecolombia.com', grupo: 'Administración', empresaId: 1 },
    { id: 2, titulo: 'Sistema de Gestión', url: 'https://gestion.cafecolombia.com', grupo: 'TI', empresaId: 1 },
    { id: 3, titulo: 'E-commerce', url: 'https://shop.cafecolombia.com', grupo: 'Ventas', empresaId: 1 },
    { id: 4, titulo: 'Portal Agrícola', url: 'https://agro.valle.com', grupo: 'Producción', empresaId: 2 }
  ]);

  // Datos ficticios de grupos
  const [grupos] = useState([
    { id: 1, nombre: 'Administración', descripcion: 'Grupo administrativo' },
    { id: 2, nombre: 'TI', descripcion: 'Tecnología y sistemas' },
    { id: 3, nombre: 'Ventas', descripcion: 'Ventas y marketing' },
    { id: 4, nombre: 'Producción', descripcion: 'Producción agrícola' }
  ]);

  const filteredEmpresas = empresas.filter(empresa =>
    empresa.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    empresa.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sitiosFiltrados = selectedEmpresa 
    ? sitiosWeb.filter(sitio => sitio.empresaId === selectedEmpresa.id)
    : [];

  const handleSearch = () => {
    setShowSearchModal(true);
    setSearchTerm('');
  };

  const handleSelectEmpresa = (empresa) => {
    setSelectedEmpresa(empresa);
    setShowSearchModal(false);
  };

  const handleCreateSitio = () => {
    setShowCreateModal(true);
    setNuevoSitio({
      titulo: '',
      url: '',
      paraTodosLosGrupos: true,
      grupoId: null,
      empresaId: selectedEmpresa?.id || null
    });
  };

  const handleCrearSitio = () => {
    if (nuevoSitio.titulo.trim() && nuevoSitio.url.trim()) {
      setAlertModal({ isOpen: true, type: 'success', title: 'Éxito', message: 'Sitio web asignado correctamente' });
      setShowCreateModal(false);
      setNuevoSitio({
        titulo: '',
        url: '',
        paraTodosLosGrupos: true,
        grupoId: null,
        empresaId: selectedEmpresa?.id || null
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNuevoSitio({
      ...nuevoSitio,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleEditSitio = (id) => {
    const sitio = sitiosWeb.find(s => s.id === id);
    if (sitio) {
      setEditingSitio(sitio);
      setSitioEditado({
        titulo: sitio.titulo,
        url: sitio.url,
        paraTodosLosGrupos: true,
        grupoId: null,
        empresaId: sitio.empresaId
      });
      setShowEditModal(true);
    }
  };

  const handleDeleteSitio = (id) => {
    setDeleteModal({ isOpen: true, id });
  };

  const confirmDelete = () => {
    if (deleteModal.id) {
      setSitiosWeb(sitiosWeb.filter(sitio => sitio.id !== deleteModal.id));
      setDeleteModal({ isOpen: false, id: null });
      setAlertModal({ isOpen: true, type: 'success', title: 'Éxito', message: 'Sitio web eliminado correctamente' });
    }
  };

  const handleViewSitio = (url) => {
    window.open(url, '_blank');
  };

  const handleEditInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSitioEditado({
      ...sitioEditado,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleActualizarSitio = () => {
    if (sitioEditado.titulo.trim() && sitioEditado.url.trim()) {
      setSitiosWeb(sitiosWeb.map(sitio => 
        sitio.id === editingSitio.id 
          ? { 
              ...sitio,
              titulo: sitioEditado.titulo,
              url: sitioEditado.url,
              grupo: sitioEditado.paraTodosLosGrupos ? 'Todos' : grupos.find(g => g.id === sitioEditado.grupoId)?.nombre || 'Sin grupo'
            }
          : sitio
      ));
      setAlertModal({ isOpen: true, type: 'success', title: 'Éxito', message: 'Sitio web actualizado correctamente' });
      setShowEditModal(false);
      setEditingSitio(null);
      setSitioEditado({
        titulo: '',
        url: '',
        paraTodosLosGrupos: true,
        grupoId: null,
        empresaId: null
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sitios Web</h1>
          <p className="text-gray-600">Gestión de sitios web y contenido digital</p>
        </div>
      </div>

      {/* Search Section */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Búsqueda de Sitios Web</h2>
        </div>
        
        <div className="p-6">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Sitios web - Seleccionar empresa"
                  value={selectedEmpresa ? selectedEmpresa.nombre : ''}
                  readOnly
                  onClick={handleSearch}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 cursor-pointer hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-cafe-vino-500"
                />
              </div>
            </div>
            <button
              onClick={handleSearch}
              className="px-4 py-2 bg-cafe-vino-600 text-white rounded-lg hover:bg-cafe-vino-700 transition-colors"
            >
              Búsqueda
            </button>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-900">
            {selectedEmpresa ? `Sitios Web - ${selectedEmpresa.nombre}` : 'Sitios Web'}
          </h2>
          {selectedEmpresa && (
            <button
              onClick={handleCreateSitio}
              className="flex items-center px-3 py-2 bg-cafe-vino-600 text-white rounded-lg hover:bg-cafe-vino-700 transition-colors text-sm"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Crear Sitios Web
            </button>
          )}
        </div>
        
        <div className="p-6">
          {!selectedEmpresa ? (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No hay empresas seleccionadas</h3>
              <p className="mt-1 text-sm text-gray-500">
                Usa el botón de búsqueda para seleccionar una empresa
              </p>
            </div>
          ) : sitiosFiltrados.length === 0 ? (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No hay sitios web</h3>
              <p className="mt-1 text-sm text-gray-500">
                No se encontraron sitios web para {selectedEmpresa.nombre}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Título
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      URL
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Grupo
                    </th>
                    <th className="relative px-6 py-3">
                      <span className="sr-only">Acciones</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {sitiosFiltrados.map((sitio) => (
                    <tr key={sitio.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {sitio.titulo}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-blue-600 hover:text-blue-800">
                          <a href={sitio.url} target="_blank" rel="noopener noreferrer">
                            {sitio.url}
                          </a>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-cafe-vino-100 text-cafe-vino-800">
                          {sitio.grupo}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex space-x-2 justify-end">
                          <button
                            onClick={() => handleViewSitio(sitio.url)}
                            className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors text-xs"
                            title="Ver"
                          >
                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            Ver
                          </button>
                          <button
                            onClick={() => handleEditSitio(sitio.id)}
                            className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition-colors"
                            title="Editar"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDeleteSitio(sitio.id)}
                            className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                            title="Eliminar"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Modal de Búsqueda de Empresas */}
      {showSearchModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={() => setShowSearchModal(false)}
          ></div>
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
            <div className="relative inline-block w-full bg-white rounded-2xl shadow-2xl max-w-2xl p-6 my-8 text-left align-middle transition-all transform">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold leading-6 text-gray-900">Seleccionar Empresa</h3>
                <button
                  onClick={() => setShowSearchModal(false)}
                  className="text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Buscar empresa
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      placeholder="Buscar por nombre o descripción..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cafe-vino-500 focus:border-cafe-vino-500"
                    />
                  </div>
                </div>

                <div className="max-h-64 overflow-y-auto border border-gray-200 rounded-lg">
                  {filteredEmpresas.length > 0 ? (
                    <div className="divide-y divide-gray-200">
                      {filteredEmpresas.map((empresa) => (
                        <div
                          key={empresa.id}
                          onClick={() => handleSelectEmpresa(empresa)}
                          className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {empresa.nombre}
                              </div>
                              <div className="text-xs text-gray-500">
                                NIT: {empresa.nit}
                              </div>
                              <div className="text-xs text-gray-400">
                                {empresa.descripcion}
                              </div>
                            </div>
                            <svg className="w-5 h-5 text-cafe-vino-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 text-center text-gray-500">
                      {searchTerm ? 'No se encontraron empresas' : 'No hay empresas disponibles'}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end pt-6 border-t">
                <button
                  onClick={() => setShowSearchModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 rounded-lg transition-colors"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Crear/Asignar Sitios Web */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={() => setShowCreateModal(false)}
          ></div>
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
            <div className="relative inline-block w-full bg-white rounded-2xl shadow-2xl max-w-lg p-6 my-8 text-left align-middle transition-all transform">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold leading-6 text-gray-900">Crear o Asignar Sitios Web</h3>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Título
                  </label>
                  <input
                    type="text"
                    name="titulo"
                    value={nuevoSitio.titulo}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cafe-vino-500 focus:border-cafe-vino-500"
                    placeholder="Título del sitio web"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    URL
                  </label>
                  <input
                    type="url"
                    name="url"
                    value={nuevoSitio.url}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cafe-vino-500 focus:border-cafe-vino-500"
                    placeholder="https://www.ejemplo.com"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="paraTodosLosGrupos"
                    name="paraTodosLosGrupos"
                    checked={nuevoSitio.paraTodosLosGrupos}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-cafe-vino-600 focus:ring-cafe-vino-500 border-gray-300 rounded"
                  />
                  <label htmlFor="paraTodosLosGrupos" className="ml-2 block text-sm text-gray-900">
                    Para todos los grupos de la empresa
                  </label>
                </div>

                {!nuevoSitio.paraTodosLosGrupos && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Seleccionar Grupo
                    </label>
                    <select
                      name="grupoId"
                      value={nuevoSitio.grupoId || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cafe-vino-500 focus:border-cafe-vino-500"
                    >
                      <option value="">Seleccionar un grupo</option>
                      {grupos.map((grupo) => (
                        <option key={grupo.id} value={grupo.id}>
                          {grupo.nombre}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Seleccionar Empresa
                  </label>
                  <select
                    name="empresaId"
                    value={nuevoSitio.empresaId || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cafe-vino-500 focus:border-cafe-vino-500"
                  >
                    <option value="">Seleccionar empresa</option>
                    {empresas.map((empresa) => (
                      <option key={empresa.id} value={empresa.id}>
                        {empresa.nombre}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-6 border-t">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 rounded-lg transition-colors"
                >
                  Cerrar
                </button>
                <button
                  onClick={handleCrearSitio}
                  disabled={!nuevoSitio.titulo.trim() || !nuevoSitio.url.trim() || !nuevoSitio.empresaId}
                  className="px-4 py-2 bg-cafe-vino-600 text-white rounded-lg hover:bg-cafe-vino-700 disabled:bg-gray-400 transition-colors"
                >
                  Asignar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    {/* Modal de Editar Sitio Web */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={() => setShowEditModal(false)}
          ></div>
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
            <div className="relative inline-block w-full bg-white rounded-2xl shadow-2xl max-w-lg p-6 my-8 text-left align-middle transition-all transform">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold leading-6 text-gray-900">Editar Sitio Web</h3>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre
                  </label>
                  <input
                    type="text"
                    name="titulo"
                    value={sitioEditado.titulo}
                    onChange={handleEditInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cafe-vino-500 focus:border-cafe-vino-500"
                    placeholder="Nombre del sitio web"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    URL
                  </label>
                  <input
                    type="url"
                    name="url"
                    value={sitioEditado.url}
                    onChange={handleEditInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cafe-vino-500 focus:border-cafe-vino-500"
                    placeholder="https://www.ejemplo.com"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="editParaTodosLosGrupos"
                    name="paraTodosLosGrupos"
                    checked={sitioEditado.paraTodosLosGrupos}
                    onChange={handleEditInputChange}
                    className="h-4 w-4 text-cafe-vino-600 focus:ring-cafe-vino-500 border-gray-300 rounded"
                  />
                  <label htmlFor="editParaTodosLosGrupos" className="ml-2 block text-sm text-gray-900">
                    Para todos los grupos de la empresa
                  </label>
                </div>

                {!sitioEditado.paraTodosLosGrupos && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Seleccionar Grupo
                    </label>
                    <select
                      name="grupoId"
                      value={sitioEditado.grupoId || ''}
                      onChange={handleEditInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cafe-vino-500 focus:border-cafe-vino-500"
                    >
                      <option value="">Seleccionar un grupo</option>
                      {grupos.map((grupo) => (
                        <option key={grupo.id} value={grupo.id}>
                          {grupo.nombre}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Seleccionar Empresa
                  </label>
                  <select
                    name="empresaId"
                    value={sitioEditado.empresaId || ''}
                    onChange={handleEditInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cafe-vino-500 focus:border-cafe-vino-500"
                  >
                    <option value="">Seleccionar empresa</option>
                    {empresas.map((empresa) => (
                      <option key={empresa.id} value={empresa.id}>
                        {empresa.nombre}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-6 border-t">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 rounded-lg transition-colors"
                >
                  Cerrar
                </button>
                <button
                  onClick={handleActualizarSitio}
                  disabled={!sitioEditado.titulo.trim() || !sitioEditado.url.trim() || !sitioEditado.empresaId}
                  className="px-4 py-2 bg-cafe-vino-600 text-white rounded-lg hover:bg-cafe-vino-700 disabled:bg-gray-400 transition-colors"
                >
                  Actualizar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Confirmar Eliminación */}
      <ActionModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, id: null })}
        onAction={confirmDelete}
        title="Eliminar Sitio Web"
        description="¿Estás seguro de que deseas eliminar este sitio web? Esta acción no se puede deshacer."
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

export default SitiosWeb;
