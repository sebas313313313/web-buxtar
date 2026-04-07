import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input } from '../components';
import { useAuthHook } from '../hooks/useAuth';
import AuthLayout from '../layouts/AuthLayout';
import logo from '../assets/icons/logo-solo.png';

const Login = () => {
  const navigate = useNavigate();
  const { login, isLoading, isAuthenticated, error, clearError } = useAuthHook();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (error) {
      clearError();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await login(formData);
    if (result.success) {
      navigate('/dashboard');
    }
  };

  return (
    <AuthLayout title="Iniciar Sesión">
      <div className="flex flex-col items-center mb-8">
        <img
          src={logo}
          alt="Coffee Agenda Logo"
          className="h-24 w-auto mb-4"
        />

      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Error message */}
        {error && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  Error de autenticación
                </h3>
                <div className="mt-2 text-sm text-red-700">
                  {error}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Email field */}
        <Input
          label="Correo electrónico"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="correo@ejemplo.com"
          required
          autoComplete="email"
        />

        {/* Password field */}
        <Input
          label="Contraseña"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="••••••••"
          required
          autoComplete="current-password"
        />

        {/* Remember me and forgot password */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-cafe-vino-600 focus:ring-cafe-vino-500 border-gray-300 rounded"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
              Recordarme
            </label>
          </div>

          <div className="text-sm">
            <a href="#" className="font-medium text-cafe-vino-600 hover:text-cafe-vino-500">
              ¿Olvidaste tu contraseña?
            </a>
          </div>
        </div>

        {/* Submit button */}
        <div>
          <Button
            type="submit"
            className="w-full"
            loading={isLoading}
            disabled={isLoading}
          >
            {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </Button>
        </div>
      </form>

      {/* Demo credentials */}
      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Credenciales de demo</span>
          </div>
        </div>

        <div className="mt-4 text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
          <p className="font-medium mb-2">Selecciona un rol para probar (cualquier contraseña):</p>
          <ul className="space-y-1 mb-2">
            <li><code className="bg-white px-1 py-0.5 rounded">superadmin@demo.com</code> <span className="text-gray-500">(Super Admin)</span></li>
            <li><code className="bg-white px-1 py-0.5 rounded">empresa@demo.com</code> <span className="text-gray-500">(Empresa)</span></li>
            <li><code className="bg-white px-1 py-0.5 rounded">asistente@demo.com</code> <span className="text-gray-500">(Asist. Técnico)</span></li>
            <li><code className="bg-white px-1 py-0.5 rounded">caficultor@demo.com</code> <span className="text-gray-500">(Caficultor)</span></li>
          </ul>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;
