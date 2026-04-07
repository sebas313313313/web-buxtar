import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import Input from './Input';
import ActionModal from './ActionModal';

const INITIAL_FORM = {
  nombre: '',
  email: '',
  cedula: '',
  telefono: '',
  genero: '',
  estadoCivil: '',
  numeroHijos: '',
  fechaNacimiento: '',
  pais: '',
  contraseña: '',
};

const fieldClass =
  'w-full px-3 py-2 text-sm border border-gray-300 rounded-lg ' +
  'focus:outline-none focus:ring-2 focus:ring-cafe-vino-500 focus:border-cafe-vino-500 transition-colors';

const labelClass = 'block text-sm font-medium text-gray-700 mb-1';

/**
 * Modal de formulario para crear o editar un caficultor.
 *
 * @param {boolean} isOpen - Controla visibilidad del modal
 * @param {function} onClose - Cierra el modal
 * @param {function} onSave - Recibe (formData, isEditing) al guardar
 * @param {object|null} [initialData] - null = crear, objeto = editar
 */
const CaficultorFormModal = ({ isOpen, onClose, onSave, initialData = null }) => {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [alertModal, setAlertModal] = useState({ isOpen: false, type: 'info', title: '', message: '' });

  // Precarga los datos cuando se edita un caficultor
  useEffect(() => {
    if (initialData) {
      setFormData({
        nombre:          initialData.nombre          ?? '',
        email:           initialData.email           ?? '',
        cedula:          initialData.numeroIdentidad ?? initialData.cedula ?? '',
        telefono:        initialData.telefono        ?? '',
        genero:          initialData.genero          ?? '',
        estadoCivil:     initialData.estadoCivil     ?? '',
        numeroHijos:     initialData.numeroHijos     ?? '',
        fechaNacimiento: initialData.fechaNacimiento ?? '',
        pais:            initialData.pais            ?? '',
        contraseña:      '',
      });
    } else {
      setFormData(INITIAL_FORM);
    }
  }, [initialData, isOpen]);

  const handleChange = (field) => (e) =>
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSave = () => {
    if (!formData.nombre.trim() || !formData.email.trim() || !formData.cedula.trim()) {
      setAlertModal({ isOpen: true, type: 'danger', title: 'Error', message: 'Por favor complete los campos obligatorios: Nombre, Email y Cédula' });
      return;
    }
    onSave(formData, !!initialData);
    setFormData(INITIAL_FORM);
  };

  const isEditing = !!initialData;

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={isEditing ? 'Editar Caficultor' : 'Crear Caficultor'}
        size="lg"
      >
        {/* Grid de 2 columnas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Nombre */}
        <div>
          <label className={labelClass}>Nombre Completo <span className="text-red-500">*</span></label>
          <input
            type="text"
            value={formData.nombre}
            onChange={handleChange('nombre')}
            className={fieldClass}
            placeholder="Juan Pérez"
          />
        </div>

        {/* Email */}
        <div>
          <label className={labelClass}>Email <span className="text-red-500">*</span></label>
          <input
            type="email"
            value={formData.email}
            onChange={handleChange('email')}
            className={fieldClass}
            placeholder="caficultor@ejemplo.com"
          />
        </div>

        {/* Cédula */}
        <div>
          <label className={labelClass}>Cédula de Ciudadanía <span className="text-red-500">*</span></label>
          <input
            type="text"
            value={formData.cedula}
            onChange={handleChange('cedula')}
            className={fieldClass}
            placeholder="123456789"
          />
        </div>

        {/* Teléfono */}
        <div>
          <label className={labelClass}>Teléfono</label>
          <input
            type="tel"
            value={formData.telefono}
            onChange={handleChange('telefono')}
            className={fieldClass}
            placeholder="+57 300 123 4567"
          />
        </div>

        {/* Género */}
        <div>
          <label className={labelClass}>Género</label>
          <select value={formData.genero} onChange={handleChange('genero')} className={fieldClass}>
            <option value="">Seleccionar...</option>
            <option value="masculino">Masculino</option>
            <option value="femenino">Femenino</option>
            <option value="otro">Otro</option>
          </select>
        </div>

        {/* Estado Civil */}
        <div>
          <label className={labelClass}>Estado Civil</label>
          <select value={formData.estadoCivil} onChange={handleChange('estadoCivil')} className={fieldClass}>
            <option value="">Seleccionar...</option>
            <option value="soltero">Soltero/a</option>
            <option value="casado">Casado/a</option>
            <option value="divorciado">Divorciado/a</option>
            <option value="viudo">Viudo/a</option>
            <option value="union-libre">Unión Libre</option>
          </select>
        </div>

        {/* Número de Hijos */}
        <div>
          <label className={labelClass}>Número de Hijos</label>
          <input
            type="number"
            min="0"
            value={formData.numeroHijos}
            onChange={handleChange('numeroHijos')}
            className={fieldClass}
            placeholder="0"
          />
        </div>

        {/* Fecha de Nacimiento */}
        <div>
          <label className={labelClass}>Fecha de Nacimiento</label>
          <input
            type="date"
            value={formData.fechaNacimiento}
            onChange={handleChange('fechaNacimiento')}
            className={fieldClass}
          />
        </div>

        {/* País */}
        <div>
          <label className={labelClass}>País</label>
          <input
            type="text"
            value={formData.pais}
            onChange={handleChange('pais')}
            className={fieldClass}
            placeholder="Colombia"
          />
        </div>

        {/* Contraseña */}
        <div>
          <label className={labelClass}>Contraseña</label>
          <input
            type="password"
            value={formData.contraseña}
            onChange={handleChange('contraseña')}
            className={fieldClass}
            placeholder={isEditing ? '•••••••••• (dejar vacío para mantener)' : '••••••••••'}
          />
        </div>
      </div>

      {/* Botones */}
      <div className="flex justify-end gap-3 pt-5 mt-5 border-t border-gray-100">
        <button
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300
            rounded-lg hover:bg-gray-50 transition-colors"
        >
          Cancelar
        </button>
        <button
          onClick={handleSave}
          className="px-4 py-2 text-sm font-medium text-white bg-cafe-vino-600 rounded-lg
            hover:bg-cafe-vino-700 transition-colors"
        >
          {isEditing ? 'Actualizar' : 'Crear'}
        </button>
      </div>
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
    </>
  );
};

export default CaficultorFormModal;
