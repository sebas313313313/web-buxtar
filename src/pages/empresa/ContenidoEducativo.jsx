import React from 'react';
import { Card } from '../../components';
import { useAuthHook } from '../../hooks/useAuth';

const ContenidoEducativo = () => {
  const { getRoleName, user } = useAuthHook();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Contenido Educativo
        </h1>
        <p className="text-gray-600">
          Material pedagógico y recursos - {user?.empresa}
        </p>
      </div>

      <Card title="Biblioteca de Contenido">
        <div className="p-4 text-center">
          <p className="text-gray-500 italic">Gestión de contenido educativo en desarrollo.</p>
        </div>
      </Card>
    </div>
  );
};

export default ContenidoEducativo;
