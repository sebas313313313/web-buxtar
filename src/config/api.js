import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Configuración de axios
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar token de autenticación
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores de autenticación
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Endpoints de la API
export const endpoints = {
  // Autenticación
  auth: {
    login: '/auth/login',
    logout: '/auth/logout',
    refreshToken: '/auth/refresh',
    profile: '/auth/profile',
  },
  // Usuarios
  users: {
    list: '/users',
    create: '/users',
    update: (id) => `/users/${id}`,
    delete: (id) => `/users/${id}`,
    getById: (id) => `/users/${id}`,
  },
  // Zonas
  zones: {
    list: '/zones',
    create: '/zones',
    update: (id) => `/zones/${id}`,
    delete: (id) => `/zones/${id}`,
    getById: (id) => `/zones/${id}`,
  },
  // Caficultores
  coffeeGrowers: {
    list: '/coffee-growers',
    create: '/coffee-growers',
    update: (id) => `/coffee-growers/${id}`,
    delete: (id) => `/coffee-growers/${id}`,
    getById: (id) => `/coffee-growers/${id}`,
  },
  // Extensionistas/Agrónomos
  extensionists: {
    list: '/extensionists',
    create: '/extensionists',
    update: (id) => `/extensionists/${id}`,
    delete: (id) => `/extensionists/${id}`,
    getById: (id) => `/extensionists/${id}`,
  },
  // Fincas
  farms: {
    list: '/farms',
    create: '/farms',
    update: (id) => `/farms/${id}`,
    delete: (id) => `/farms/${id}`,
    getById: (id) => `/farms/${id}`,
  },
  // Calendario de actividades
  activities: {
    list: '/activities',
    create: '/activities',
    update: (id) => `/activities/${id}`,
    delete: (id) => `/activities/${id}`,
    getById: (id) => `/activities/${id}`,
  },
  // Mensajería
  messages: {
    list: '/messages',
    send: '/messages/send',
    markAsRead: (id) => `/messages/${id}/read`,
  },
  // Estaciones meteorológicas
  weatherStations: {
    list: '/weather-stations',
    data: (id) => `/weather-stations/${id}/data`,
  },
  // Estadísticas
  statistics: {
    dashboard: '/statistics/dashboard',
    production: '/statistics/production',
    profitability: '/statistics/profitability',
  },
};

export default api;
