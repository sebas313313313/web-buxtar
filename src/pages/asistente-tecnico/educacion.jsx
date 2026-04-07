import React, { useState } from 'react';
import { ActionModal } from '../../components';

const Educacion = () => {
  const [showEmpresaModal, setShowEmpresaModal] = useState(false);
  const [showCaficultorModal, setShowCaficultorModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedEmpresa, setSelectedEmpresa] = useState(null);
  const [selectedCaficultores, setSelectedCaficultores] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null });
  const [alertModal, setAlertModal] = useState({ isOpen: false, type: 'info', title: '', message: '' });

  // Estados para el formulario de crear contenido
  const [nuevoContenido, setNuevoContenido] = useState({
    titulo: '',
    descripcion: '',
    contenido: '',
    estado: 'activo',
    archivo: null
  });

  // Estados para el formulario de editar contenido
  const [editandoContenido, setEditandoContenido] = useState(null);
  const [contenidoEditado, setContenidoEditado] = useState({
    titulo: '',
    descripcion: '',
    contenido: '',
    estado: 'activo',
    archivo: null
  });

  // Estados para el editor de texto
  const [editorContent, setEditorContent] = useState('');
  const [fontSize, setFontSize] = useState('16');
  const [fontFamily, setFontFamily] = useState('Arial');
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);

  // Datos ficticios de empresas
  const [empresas] = useState([
    { id: 1, nombre: 'Café Colombia S.A.', nit: '900123456', descripcion: 'Principal empresa caficultora' },
    { id: 2, nombre: 'Agroindustrias del Valle', nit: '900789012', descripcion: 'Especializada en procesamiento' },
    { id: 3, nombre: 'Cafeteros Unidos', nit: '900345678', descripcion: 'Cooperativa de caficultores' },
    { id: 4, nombre: 'Exportaciones Café Andino', nit: '900901234', descripcion: 'Exportadora internacional' }
  ]);

  // Datos ficticios de caficultores
  const [caficultores] = useState([
    { id: 1, nombre: 'Carlos Rodríguez', telefono: '+57 300 1234567', empresaId: 1 },
    { id: 2, nombre: 'Ana López', telefono: '+57 300 2345678', empresaId: 1 },
    { id: 3, nombre: 'Luis Torres', telefono: '+57 300 3456789', empresaId: 1 },
    { id: 4, nombre: 'María García', telefono: '+57 300 4567890', empresaId: 1 },
    { id: 5, nombre: 'Pedro Gómez', telefono: '+57 300 5678901', empresaId: 2 },
    { id: 6, nombre: 'Diego Herrera', telefono: '+57 300 6789012', empresaId: 2 },
    { id: 7, nombre: 'Sofía Castro', telefono: '+57 300 7890123', empresaId: 2 },
    { id: 8, nombre: 'José Martínez', telefono: '+57 300 8901234', empresaId: 3 },
    { id: 9, nombre: 'Carmen Soto', telefono: '+57 300 9012345', empresaId: 3 },
    { id: 10, nombre: 'Roberto Silva', telefono: '+57 300 0123456', empresaId: 3 }
  ]);

  // Datos ficticios de contenido educativo
  const [contenidos, setContenidos] = useState([
    { id: 1, nombre: 'Guía de Cultivo de Café', descripcion: 'Manual completo para el cultivo de café desde la siembra hasta la cosecha', contenido: '<p>Contenido detallado sobre el cultivo de café...</p>', estado: 'activo', empresaId: 1 },
    { id: 2, nombre: 'Control de Plagas', descripcion: 'Técnicas para el control de plagas en cafetales', contenido: '<p>Métodos de control de plagas orgánicos y químicos...</p>', estado: 'activo', empresaId: 1 },
    { id: 3, nombre: 'Procesamiento del Café', descripcion: 'Guía de procesamiento post-cosecha', contenido: '<p>Proceso completo de procesamiento del café...</p>', estado: 'bloqueado', empresaId: 1 },
    { id: 4, nombre: 'Certificación de Calidad', descripcion: 'Proceso de certificación de café de calidad', contenido: '<p>Requisitos y proceso de certificación...</p>', estado: 'activo', empresaId: 2 }
  ]);

  const filteredEmpresas = empresas.filter(empresa =>
    empresa.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    empresa.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCaficultores = selectedEmpresa
    ? caficultores.filter(caf => caf.empresaId === selectedEmpresa.id)
    : [];

  const contenidosFiltrados = selectedEmpresa && selectedCaficultores.length > 0
    ? contenidos.filter(contenido => contenido.empresaId === selectedEmpresa.id)
    : [];

  const handleSelectEmpresa = (empresa) => {
    setSelectedEmpresa(empresa);
    setShowEmpresaModal(false);
    setSelectedCaficultores([]);
  };

  const handleSelectCaficultor = (caficultor) => {
    if (!selectedCaficultores.find(c => c.id === caficultor.id)) {
      setSelectedCaficultores([...selectedCaficultores, caficultor]);
    }
  };

  const handleRemoveCaficultor = (id) => {
    setSelectedCaficultores(selectedCaficultores.filter(c => c.id !== id));
  };

  const handleCreateContenido = () => {
    setShowCreateModal(true);
    setNuevoContenido({
      titulo: '',
      descripcion: '',
      contenido: '',
      estado: 'activo',
      archivo: null
    });
    setEditorContent('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoContenido({
      ...nuevoContenido,
      [name]: value
    });
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setContenidoEditado({
      ...contenidoEditado,
      [name]: value
    });
  };

  const handleCrearContenido = () => {
    if (nuevoContenido.titulo.trim() && nuevoContenido.descripcion.trim() && editorContent.trim()) {
      const nuevo = {
        id: Math.max(...contenidos.map(c => c.id), 0) + 1,
        nombre: nuevoContenido.titulo,
        descripcion: nuevoContenido.descripcion,
        contenido: editorContent,
        estado: nuevoContenido.estado,
        empresaId: selectedEmpresa.id
      };

      setContenidos([...contenidos, nuevo]);
      setAlertModal({ isOpen: true, type: 'success', title: 'Éxito', message: 'Creado exitosamente' });
      setShowCreateModal(false);
      setNuevoContenido({
        titulo: '',
        descripcion: '',
        contenido: '',
        estado: 'activo',
        archivo: null
      });
      setEditorContent('');
    }
  };

  const handleViewContenido = (id) => {
    const contenido = contenidos.find(c => c.id === id);
    if (contenido) {
      setAlertModal({ isOpen: true, type: 'info', title: 'Información', message: `Nombre: ${contenido.nombre}\nDescripción: ${contenido.descripcion}\nEstado: ${contenido.estado}\nContenido: ${contenido.contenido.replace(/<[^>]*>/g, '')}` });
    }
  };

  const handleEditContenido = (id) => {
    const contenido = contenidos.find(c => c.id === id);
    if (contenido) {
      setEditandoContenido(contenido);
      setContenidoEditado({
        titulo: contenido.nombre,
        descripcion: contenido.descripcion,
        contenido: contenido.contenido,
        estado: contenido.estado,
        archivo: null
      });
      setEditorContent(contenido.contenido);
      setShowCreateModal(true); // Reutilizamos el mismo modal
    }
  };

  const handleActualizarContenido = () => {
    if (contenidoEditado.titulo.trim() && contenidoEditado.descripcion.trim() && editorContent.trim()) {
      setContenidos(contenidos.map(c =>
        c.id === editandoContenido.id
          ? {
            ...c,
            nombre: contenidoEditado.titulo,
            descripcion: contenidoEditado.descripcion,
            contenido: editorContent,
            estado: contenidoEditado.estado
          }
          : c
      ));
      setAlertModal({ isOpen: true, type: 'success', title: 'Éxito', message: 'Actualizado exitosamente' });
      setShowCreateModal(false);
      setEditandoContenido(null);
      setContenidoEditado({
        titulo: '',
        descripcion: '',
        contenido: '',
        estado: 'activo',
        archivo: null
      });
      setEditorContent('');
    }
  };

  const handleDeleteContenido = (id) => {
    setDeleteModal({ isOpen: true, id });
  };

  const confirmDelete = () => {
    if (deleteModal.id) {
      setContenidos(contenidos.filter(c => c.id !== deleteModal.id));
      setAlertModal({ isOpen: true, type: 'success', title: 'Éxito', message: 'Contenido eliminado correctamente' });
      setDeleteModal({ isOpen: false, id: null });
    }
  };

  // Funciones del editor de texto
  const execCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    setEditorContent(document.getElementById('editor').innerHTML);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNuevoContenido({
        ...nuevoContenido,
        archivo: file
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Contenido de Educación</h1>
          <p className="text-gray-600">Material educativo y capacitaciones</p>
        </div>
      </div>

      {/* Empresa Selection */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Selección de Empresa y Caficultores</h2>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowEmpresaModal(true)}
                className="px-4 py-2 bg-cafe-vino-600 text-white rounded-lg hover:bg-cafe-vino-700 transition-colors"
              >
                Seleccionar Empresa
              </button>
              {selectedEmpresa && (
                <div className="text-sm text-gray-600">
                  Empresa: <span className="font-medium">{selectedEmpresa.nombre}</span>
                </div>
              )}
            </div>

            {selectedEmpresa && (
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShowCaficultorModal(true)}
                  className="px-4 py-2 bg-cafe-vino-600 text-white rounded-lg hover:bg-cafe-vino-700 transition-colors"
                >
                  Seleccionar Caficultores
                </button>
                <div className="text-sm text-gray-600">
                  {selectedCaficultores.length} seleccionado(s)
                </div>
              </div>
            )}
          </div>

          {selectedCaficultores.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {selectedCaficultores.map((caficultor) => (
                <span
                  key={caficultor.id}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-cafe-vino-100 text-cafe-vino-800"
                >
                  {caficultor.nombre}
                  <button
                    onClick={() => handleRemoveCaficultor(caficultor.id)}
                    className="ml-2 text-cafe-vino-600 hover:text-cafe-vino-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Results Section */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-900">
            {selectedEmpresa && selectedCaficultores.length > 0
              ? `Contenido Educativo - ${selectedEmpresa.nombre}`
              : 'Contenido Educativo'}
          </h2>
          {selectedEmpresa && selectedCaficultores.length > 0 && (
            <button
              onClick={handleCreateContenido}
              className="flex items-center px-3 py-2 bg-cafe-vino-600 text-white rounded-lg hover:bg-cafe-vino-700 transition-colors text-sm"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Crear Contenido
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
                Usa el botón de selección para elegir una empresa
              </p>
            </div>
          ) : selectedCaficultores.length === 0 ? (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No hay caficultores seleccionados</h3>
              <p className="mt-1 text-sm text-gray-500">
                Selecciona caficultores para ver el contenido educativo
              </p>
            </div>
          ) : contenidosFiltrados.length === 0 ? (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No hay contenido educativo</h3>
              <p className="mt-1 text-sm text-gray-500">
                No se encontró contenido para los caficultores seleccionados
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nombre
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Descripción
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Estado
                    </th>
                    <th className="relative px-6 py-3">
                      <span className="sr-only">Acciones</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {contenidosFiltrados.map((contenido) => (
                    <tr key={contenido.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {contenido.nombre}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 max-w-xs truncate">
                          {contenido.descripcion}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${contenido.estado === 'activo'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                          }`}>
                          {contenido.estado}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex space-x-2 justify-end">
                          <button
                            onClick={() => handleViewContenido(contenido.id)}
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
                            onClick={() => handleEditContenido(contenido.id)}
                            className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition-colors"
                            title="Editar"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDeleteContenido(contenido.id)}
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

      {/* Modal de Selección de Empresas */}
      {showEmpresaModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={() => setShowEmpresaModal(false)}
          ></div>
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
            <div className="relative inline-block w-full bg-white rounded-2xl shadow-2xl max-w-2xl p-6 my-8 text-left align-middle transition-all transform">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold leading-6 text-gray-900">Seleccionar Empresa</h3>
                <button
                  onClick={() => setShowEmpresaModal(false)}
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
                  onClick={() => setShowEmpresaModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 rounded-lg transition-colors"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Selección de Caficultores */}
      {showCaficultorModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={() => setShowCaficultorModal(false)}
          ></div>
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
            <div className="relative inline-block w-full bg-white rounded-2xl shadow-2xl max-w-2xl p-6 my-8 text-left align-middle transition-all transform">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold leading-6 text-gray-900">Seleccionar Caficultores</h3>
                <button
                  onClick={() => setShowCaficultorModal(false)}
                  className="text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="max-h-64 overflow-y-auto border border-gray-200 rounded-lg">
                {filteredCaficultores.length > 0 ? (
                  <div className="divide-y divide-gray-200">
                    {filteredCaficultores.map((caficultor) => (
                      <div
                        key={caficultor.id}
                        onClick={() => handleSelectCaficultor(caficultor)}
                        className={`p-3 hover:bg-gray-50 cursor-pointer transition-colors ${selectedCaficultores.find(c => c.id === caficultor.id)
                            ? 'bg-cafe-vino-50 border-l-4 border-l-cafe-vino-600'
                            : 'hover:bg-gray-50'
                          }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {caficultor.nombre}
                            </div>
                            <div className="text-xs text-gray-500">
                              {caficultor.telefono}
                            </div>
                          </div>
                          <svg className="w-5 h-5 text-cafe-vino-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0h6" />
                          </svg>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center text-gray-500">
                    No hay caficultores disponibles
                  </div>
                )}
              </div>

              <div className="flex justify-end pt-6 border-t">
                <button
                  onClick={() => setShowCaficultorModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 rounded-lg transition-colors"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Crear/Editar Contenido */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={() => setShowCreateModal(false)}
          ></div>
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
            <div className="relative inline-block w-full bg-white rounded-2xl shadow-2xl max-w-4xl p-6 my-8 text-left align-middle transition-all transform">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold leading-6 text-gray-900">
                  {editandoContenido ? 'Editar Contenido Educativo' : 'Crear Contenido Educativo'}
                </h3>
                <button
                  onClick={() => {
                    setShowCreateModal(false);
                    setEditandoContenido(null);
                  }}
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
                    value={editandoContenido ? contenidoEditado.titulo : nuevoContenido.titulo}
                    onChange={editandoContenido ? handleEditInputChange : handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cafe-vino-500 focus:border-cafe-vino-500"
                    placeholder="Título del contenido educativo"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descripción
                  </label>
                  <textarea
                    name="descripcion"
                    value={editandoContenido ? contenidoEditado.descripcion : nuevoContenido.descripcion}
                    onChange={editandoContenido ? handleEditInputChange : handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cafe-vino-500 focus:border-cafe-vino-500"
                    placeholder="Descripción breve del contenido educativo"
                  />
                </div>

                {/* Editor de Texto Enriquecido */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contenido
                  </label>

                  {/* Toolbar del Editor */}
                  <div className="border border-gray-300 rounded-t-lg bg-gray-50 p-2 flex items-center space-x-2">
                    <select
                      value={fontSize}
                      onChange={(e) => {
                        setFontSize(e.target.value);
                        execCommand('fontSize', e.target.value);
                      }}
                      className="px-2 py-1 text-sm border border-gray-300 rounded"
                    >
                      <option value="1">Pequeño</option>
                      <option value="3">Normal</option>
                      <option value="5">Grande</option>
                      <option value="7">Muy Grande</option>
                    </select>

                    <select
                      value={fontFamily}
                      onChange={(e) => {
                        setFontFamily(e.target.value);
                        execCommand('fontName', e.target.value);
                      }}
                      className="px-2 py-1 text-sm border border-gray-300 rounded"
                    >
                      <option value="Arial">Arial</option>
                      <option value="Times New Roman">Times New Roman</option>
                      <option value="Courier New">Courier New</option>
                      <option value="Georgia">Georgia</option>
                      <option value="Verdana">Verdana</option>
                    </select>

                    <div className="border-l border-gray-300 h-6 mx-1"></div>

                    <button
                      onClick={() => {
                        setIsBold(!isBold);
                        execCommand('bold');
                      }}
                      className={`px-2 py-1 text-sm border rounded ${isBold ? 'bg-gray-200' : 'bg-white'}`}
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M15.6 10.79c.97-.67 1.65-1.77 1.65-2.79 0-2.26-1.75-4-4-4H7v14h7.04c2.09 0 3.71-1.7 3.71-3.79 0-1.52-.86-2.82-2.15-3.42zM10 6.5h3c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-3v-3zm3.5 9H10v-3h3.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5z" />
                      </svg>
                    </button>

                    <button
                      onClick={() => {
                        setIsItalic(!isItalic);
                        execCommand('italic');
                      }}
                      className={`px-2 py-1 text-sm border rounded ${isItalic ? 'bg-gray-200' : 'bg-white'}`}
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M10 4v3h2.21l-3.42 8H6v3h8v-3h-2.21l3.42-8H18V4z" />
                      </svg>
                    </button>

                    <button
                      onClick={() => {
                        setIsUnderline(!isUnderline);
                        execCommand('underline');
                      }}
                      className={`px-2 py-1 text-sm border rounded ${isUnderline ? 'bg-gray-200' : 'bg-white'}`}
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 17c3.31 0 6-2.69 6-6V3h-2.5v8c0 1.93-1.57 3.5-3.5 3.5S8.5 12.93 8.5 11V3H6v8c0 3.31 2.69 6 6 6zm-7 2v2h14v-2H5z" />
                      </svg>
                    </button>

                    <div className="border-l border-gray-300 h-6 mx-1"></div>

                    <button
                      onClick={() => execCommand('insertUnorderedList')}
                      className="px-2 py-1 text-sm border rounded bg-white"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M4 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm0-6c-.83 0-1.5.67-1.5 1.5S3.17 7.5 4 7.5 5.5 6.83 5.5 6 4.33 4.5 4 4.5zm0 12c-.83 0-1.5.68-1.5 1.5s.68 1.5 1.5 1.5 1.5-.68 1.5-1.5-.67-1.5-1.5-1.5zM7 19h14v-2H7v2zm0-6h14v-2H7v2zm0-8v2h14V5H7z" />
                      </svg>
                    </button>

                    <button
                      onClick={() => execCommand('insertOrderedList')}
                      className="px-2 py-1 text-sm border rounded bg-white"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M2 16h2v2H2zm0-6h2v2H2zm0-6h2v2H2zm4 0v2h14V4H6zm0 6v2h14v-2H6zm0 6v2h14v-2H6z" />
                      </svg>
                    </button>

                    <div className="border-l border-gray-300 h-6 mx-1"></div>

                    <button
                      onClick={() => {
                        const url = prompt('Ingrese la URL de la imagen:');
                        if (url) {
                          execCommand('insertImage', url);
                        }
                      }}
                      className="px-2 py-1 text-sm border rounded bg-white"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
                      </svg>
                    </button>

                    <button
                      onClick={() => {
                        const url = prompt('Ingrese la URL del enlace:');
                        if (url) {
                          execCommand('createLink', url);
                        }
                      }}
                      className="px-2 py-1 text-sm border rounded bg-white"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z" />
                      </svg>
                    </button>
                  </div>

                  {/* Editor de Texto */}
                  <div
                    id="editor"
                    contentEditable
                    className="min-h-[200px] p-3 border border-t-0 border-gray-300 rounded-b-lg focus:outline-none focus:ring-2 focus:ring-cafe-vino-500"
                    style={{ fontSize: `${fontSize}px`, fontFamily: fontFamily }}
                    onInput={(e) => setEditorContent(e.target.innerHTML)}
                    dangerouslySetInnerHTML={{
                      __html: editandoContenido ? contenidoEditado.contenido : editorContent
                    }}
                  />
                </div>

                {/* Estado del Contenido */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Estado del Contenido
                  </label>
                  <div className="flex space-x-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="estado"
                        value="activo"
                        checked={editandoContenido ? contenidoEditado.estado === 'activo' : nuevoContenido.estado === 'activo'}
                        onChange={editandoContenido ? handleEditInputChange : handleInputChange}
                        className="h-4 w-4 text-cafe-vino-600 focus:ring-cafe-vino-500 border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">Activo</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="estado"
                        value="bloqueado"
                        checked={editandoContenido ? contenidoEditado.estado === 'bloqueado' : nuevoContenido.estado === 'bloqueado'}
                        onChange={editandoContenido ? handleEditInputChange : handleInputChange}
                        className="h-4 w-4 text-cafe-vino-600 focus:ring-cafe-vino-500 border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">Bloqueado</span>
                    </label>
                  </div>
                </div>

                {/* Selector de Archivos */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Adjuntar Archivos
                  </label>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cafe-vino-500 focus:border-cafe-vino-500"
                    multiple
                  />
                  {(editandoContenido ? contenidoEditado.archivo : nuevoContenido.archivo) && (
                    <div className="mt-2 text-sm text-gray-600">
                      Archivo seleccionado: {(editandoContenido ? contenidoEditado.archivo : nuevoContenido.archivo).name}
                    </div>
                  )}
                </div>
              </div>

              {/* Botones */}
              <div className="flex justify-end space-x-3 pt-6 border-t">
                <button
                  onClick={() => {
                    setShowCreateModal(false);
                    setEditandoContenido(null);
                  }}
                  className="px-4 py-2 border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 rounded-lg transition-colors"
                >
                  Cerrar
                </button>
                <button
                  onClick={editandoContenido ? handleActualizarContenido : handleCrearContenido}
                  disabled={
                    !(editandoContenido ? contenidoEditado.titulo.trim() && contenidoEditado.descripcion.trim() : nuevoContenido.titulo.trim() && nuevoContenido.descripcion.trim()) ||
                    !editorContent.trim()
                  }
                  className="px-4 py-2 bg-cafe-vino-600 text-white rounded-lg hover:bg-cafe-vino-700 disabled:bg-gray-400 transition-colors"
                >
                  {editandoContenido ? 'Actualizar' : 'Crear'}
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
        title="Eliminar Contenido"
        description="¿Estás seguro de que deseas eliminar este contenido? Esta acción no se puede deshacer."
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

export default Educacion;
