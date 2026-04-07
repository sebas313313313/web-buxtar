import { useAuth } from '../context/AuthContext';
import { ROLES } from '../config/constants';

// Hook personalizado para autenticación
export const useAuthHook = () => {
  const auth = useAuth();

  // Verificar si es empresa
  const isEmpresa = auth.hasRole(ROLES.EMPRESA);

  // Verificar si es asistente técnico
  const isAsistenteTecnico = auth.hasRole(ROLES.ASISTENTE_TECNICO);

  // Verificar si es caficultor
  const isCaficultor = auth.hasRole(ROLES.CAFICULTOR);

  // Verificar si es administrador
  const isAdministrador = auth.hasRole(ROLES.ADMINISTRADOR);

  // Obtener nombre del rol
  const getRoleName = () => {
    const roleNames = {
      [ROLES.EMPRESA]: 'Empresa',
      [ROLES.ASISTENTE_TECNICO]: 'Asistente Técnico',
      [ROLES.CAFICULTOR]: 'Caficultor',
      [ROLES.ADMINISTRADOR]: 'Administrador',
    };
    return roleNames[auth.user?.role] || 'Desconocido';
  };

  // Obtener saludo personalizado
  const getGreeting = () => {
    const hour = new Date().getHours();
    let timeGreeting = 'Buenos días';

    if (hour >= 12 && hour < 18) {
      timeGreeting = 'Buenas tardes';
    } else if (hour >= 18 || hour < 6) {
      timeGreeting = 'Buenas noches';
    }

    return `${timeGreeting}, ${auth.user?.name || 'Usuario'}`;
  };

  return {
    ...auth,
    isEmpresa,
    isAsistenteTecnico,
    isCaficultor,
    isAdministrador,
    getRoleName,
    getGreeting,
  };
};
