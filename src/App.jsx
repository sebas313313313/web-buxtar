import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Footer from './components/Footer'
import { AuthProvider } from './context/AuthContext'
import { useAuthHook } from './hooks/useAuth'
import { ROLES } from './config/constants'

// Import pages (Asistente Técnico)
import Login from './pages/Login'
import Dashboard from './pages/asistente-tecnico/dashboard'
import Perfil from './pages/asistente-tecnico/perfil'
import Caficultores from './pages/asistente-tecnico/caficultores'
import Zonas from './pages/asistente-tecnico/zonas'
import Extensionistas from './pages/asistente-tecnico/extensionistas'
import Calendario from './pages/asistente-tecnico/calendario'
import SitiosWeb from './pages/asistente-tecnico/sitios-web'
import Mensajeria from './pages/asistente-tecnico/mensajeria'
import Educacion from './pages/asistente-tecnico/educacion'
import Estaciones from './pages/asistente-tecnico/estaciones'
import Fincas from './pages/asistente-tecnico/fincas'
import Estadisticas from './pages/asistente-tecnico/estadisticas'
import Rentabilidad from './pages/asistente-tecnico/restabilidad'
import Pronostico from './pages/asistente-tecnico/pronistico'
import Volumen from './pages/asistente-tecnico/volumen'
import Ubicaciones from './pages/asistente-tecnico/ubicaciones'
import Soporte from './pages/asistente-tecnico/soporte'
import GrupoCaficultores from './pages/asistente-tecnico/grupos'
import Chats from './pages/asistente-tecnico/chats'

// --- Empresa Pages ---
import E_Dashboard from './pages/empresa/Dashboard'
import E_Perfil from './pages/empresa/Perfil'
import E_Zona from './pages/empresa/Zona'
import E_Extensionistas from './pages/empresa/Extensionistas'
import E_Caficultores from './pages/empresa/Caficultores'
import E_GrupoDeCaficultores from './pages/empresa/GrupoDeCaficultores'
import E_CalendarioDeActividades from './pages/empresa/CalendarioDeActividades'
import E_SitiosWeb from './pages/empresa/SitiosWeb'
import E_Mensajeria from './pages/empresa/Mensajeria'
import E_ContenidoEducativo from './pages/empresa/ContenidoEducativo'
import E_Estaciones from './pages/empresa/Estaciones'
import E_Fincas from './pages/empresa/Fincas'
import E_Estadisticas from './pages/empresa/Estadisticas'
import E_Rentabilidad from './pages/empresa/Rentabilidad'
import E_PronosticoDeCosecha from './pages/empresa/PronosticoDeCosecha'
import E_VolumenDeCosechado from './pages/empresa/VolumenDeCosechado'

// --- Super Admin Pages ---
import SADashboard from './pages/superadmin/Dashboard'
import SAUsuarios from './pages/superadmin/Usuarios'
import SARoles from './pages/superadmin/Roles'
import SAPermisos from './pages/superadmin/Permisos'
import SAEmpresas from './pages/superadmin/Empresas'
import SAExtensionistas from './pages/superadmin/Extensionistas'
import SACaficultores from './pages/superadmin/Caficultores'
import SASuscripciones from './pages/superadmin/Suscripciones'
import SAEstaciones from './pages/superadmin/Estaciones'
import SAAnalitica from './pages/superadmin/Analitica'

// --- Caficultor Pages ---
import C_MiFinca from './pages/caficultor/MiFinca';
import C_Chat from './pages/caficultor/Chat';
import C_Perfil from './pages/caficultor/Perfil';
import C_Estaciones from './pages/caficultor/Estaciones';
import C_SitiosWeb from './pages/caficultor/SitiosWeb';
import C_EstadoTiempo from './pages/caficultor/EstadoTiempo';
import C_Historico from './pages/caficultor/Historico';
import C_Estadisticas from './pages/caficultor/Estadisticas';
import C_Comunicaciones from './pages/caficultor/Comunicaciones';
import C_Educacion from './pages/caficultor/Educacion';
import C_Archivos from './pages/caficultor/Archivos';

// Placeholder temporal (si hubiera otros)

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(() => typeof window !== 'undefined' && window.innerWidth >= 1024)
  const { isAuthenticated, isLoading } = useAuthHook();
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-cafe-vino-600 font-medium animate-pulse">Cargando...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="h-screen bg-gray-50 flex overflow-hidden">
      {/* Sidebar spans full height on left */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main content area on the right */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header isOpen={sidebarOpen} onMenuClick={() => setSidebarOpen(prev => !prev)} />

        <main className="flex-1 overflow-y-auto bg-gray-50">
          <div className="min-h-full flex flex-col">
            <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <Outlet />
            </div>
            <div className="flex-shrink-0">
              <Footer />
            </div>
          </div>
        </main>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}

const RoleBasedDashboard = () => {
  const { user } = useAuthHook();
  const { role } = user || {};
  
  if (role === ROLES.SUPER_ADMIN) return <SADashboard />;
  if (role === ROLES.CAFICULTOR) return <C_MiFinca />;
  if (role === ROLES.EMPRESA) return <E_Dashboard />;
  
  // Asistente Técnico
  return <Dashboard />;
};

const RoleSwitch = ({ empresa: EmpresaComp, at: AtComp }) => {
  const { user } = useAuthHook();
  return user?.role === ROLES.EMPRESA ? <EmpresaComp /> : <AtComp />;
};

function App() {
  return (
    <AuthProvider>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Protected routes */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<RoleBasedDashboard />} />
            <Route path="perfil" element={<RoleSwitch empresa={E_Perfil} at={Perfil} />} />
            <Route path="zonas" element={<RoleSwitch empresa={E_Zona} at={Zonas} />} />
            <Route path="extensionistas" element={<RoleSwitch empresa={E_Extensionistas} at={Extensionistas} />} />
            <Route path="caficultores" element={<RoleSwitch empresa={E_Caficultores} at={Caficultores} />} />
            <Route path="grupos" element={<RoleSwitch empresa={E_GrupoDeCaficultores} at={GrupoCaficultores} />} />
            <Route path="calendario" element={<RoleSwitch empresa={E_CalendarioDeActividades} at={Calendario} />} />
            <Route path="sitios-web" element={<RoleSwitch empresa={E_SitiosWeb} at={SitiosWeb} />} />
            <Route path="mensajeria" element={<RoleSwitch empresa={E_Mensajeria} at={Mensajeria} />} />
            <Route path="educacion" element={<RoleSwitch empresa={E_ContenidoEducativo} at={Educacion} />} />
            <Route path="estaciones" element={<RoleSwitch empresa={E_Estaciones} at={Estaciones} />} />
            <Route path="fincas" element={<RoleSwitch empresa={E_Fincas} at={Fincas} />} />
            <Route path="estadisticas" element={<RoleSwitch empresa={E_Estadisticas} at={Estadisticas} />} />
            <Route path="rentabilidad" element={<RoleSwitch empresa={E_Rentabilidad} at={Rentabilidad} />} />
            <Route path="pronostico" element={<RoleSwitch empresa={E_PronosticoDeCosecha} at={Pronostico} />} />
            <Route path="volumen" element={<RoleSwitch empresa={E_VolumenDeCosechado} at={Volumen} />} />
            <Route path="ubicaciones" element={<Ubicaciones />} />
            <Route path="soporte" element={<Soporte />} />
            <Route path="chats" element={<Chats />} />

            {/* Rutas exclusivas Super Admin */}
            <Route path="superadmin" element={<SADashboard />} />
            <Route path="superadmin/usuarios" element={<SAUsuarios />} />
            <Route path="superadmin/roles" element={<SARoles />} />
            <Route path="superadmin/permisos" element={<SAPermisos />} />
            <Route path="superadmin/empresas" element={<SAEmpresas />} />
            <Route path="superadmin/extensionistas" element={<SAExtensionistas />} />
            <Route path="superadmin/caficultores" element={<SACaficultores />} />
            <Route path="superadmin/suscripciones" element={<SASuscripciones />} />
            <Route path="superadmin/estaciones" element={<SAEstaciones />} />
            <Route path="superadmin/analitica" element={<SAAnalitica />} />

            {/* Rutas exclusivas Caficultor */}
            <Route path="caficultor/mi-finca" element={<C_MiFinca />} />
            <Route path="caficultor/chat" element={<C_Chat />} />
            <Route path="caficultor/perfil" element={<C_Perfil />} />
            <Route path="caficultor/estaciones" element={<C_Estaciones />} />
            <Route path="caficultor/sitios-web" element={<C_SitiosWeb />} />
            <Route path="caficultor/estado-tiempo" element={<C_EstadoTiempo />} />
            <Route path="caficultor/historico" element={<C_Historico />} />
            <Route path="caficultor/estadisticas" element={<C_Estadisticas />} />
            <Route path="caficultor/comunicaciones" element={<C_Comunicaciones />} />
            <Route path="caficultor/educacion" element={<C_Educacion />} />
            <Route path="caficultor/archivos" element={<C_Archivos />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
