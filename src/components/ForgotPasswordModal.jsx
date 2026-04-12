import React, { useState } from 'react';
import Modal from './Modal';
import Input from './Input';
import Button from './Button';

const ForgotPasswordModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simular envío de correo
    console.log('Enviando correo de recuperación a:', email);
    
    setTimeout(() => {
      setIsLoading(false);
      onClose();
      // Aquí se podría mostrar un toast de éxito si existiera la infraestructura
    }, 1500);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Restablecer contraseña"
      size="md"
    >
      <div className="space-y-6">
        <p className="text-gray-600 text-sm leading-relaxed">
          Escribe tu correo electrónico y enviaremos la información adecuada para que restablezcas tu contraseña.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Correo electrónico"
            type="email"
            placeholder="correo@ejemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoFocus
          />

          <div className="flex justify-end pt-2">
            <Button
              type="submit"
              variant="primary"
              className="w-full sm:w-auto px-10"
              loading={isLoading}
              disabled={isLoading || !email}
            >
              Aceptar
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ForgotPasswordModal;
