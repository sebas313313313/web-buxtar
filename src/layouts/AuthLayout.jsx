import React from 'react';
const AuthLayout = ({ children, title = 'Agenda Cafetera' }) => {
  return (
    <div className="min-h-screen flex flex-col justify-center py-6 sm:px-6 lg:px-8 bg-[linear-gradient(to_bottom,theme(colors.brand-vino)_50%,#ffffff_50%)]">
      {/* Container slightly higher */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900 lg:hidden">
          {title}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 lg:hidden">
          Sistema de gestión para empresas cafeteras
        </p>
      </div>

      {/* Main card - slightly higher (mt-4 instead of mt-8) and more padding */}
      <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-10 px-4 shadow-lg sm:rounded-lg sm:px-10 border border-gray-100">
          {children}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 text-center text-sm text-gray-500">
        <p>Buxtar 2026 &copy; Todos los derechos reservados.</p>
      </div>
    </div>
  );
};

export default AuthLayout;
