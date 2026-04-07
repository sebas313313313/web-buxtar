# Sistema Cafetero - Frontend

Frontend del sistema de gestión para empresas cafeteras construido con React, Vite y TailwindCSS.

## 🚀 Características

- **React 19** - Última versión de React con las mejores prácticas
- **Vite** - Herramienta de construcción ultra rápida
- **TailwindCSS** - Framework CSS con diseño personalizado
- **React Router** - Sistema de routing completo
- **Axios** - Cliente HTTP para comunicación con el backend
- **Arquitectura MERN** - Compatible con backend MongoDB/Express/Node

## 🎨 Tema y Diseño

- **Paleta de colores**: Vino tinto y café (inspirada en el café)
- **Diseño responsive**: Funciona en todos los dispositivos
- **Componentes reutilizables**: Sistema de UI consistente
- **Sidebar colapsable**: Navegación intuitiva
- **Roles de usuario**: 4 roles diferentes con permisos específicos

## 📁 Estructura del Proyecto

```
src/
├── assets/          # Imágenes, iconos, logos
├── components/       # Componentes reutilizables
│   ├── Button.jsx
│   ├── Input.jsx
│   ├── Card.jsx
│   ├── Modal.jsx
│   ├── Loading.jsx
│   ├── Toast.jsx
│   ├── Sidebar.jsx
│   └── Header.jsx
├── config/          # Configuraciones
│   ├── api.js       # Configuración de axios y endpoints
│   └── constants.js # Constantes de la aplicación
├── context/         # Contextos de React
│   └── AuthContext.jsx
├── hooks/           # Hooks personalizados
│   ├── useAuth.js
│   └── useFetch.js
├── layouts/         # Layouts de la aplicación
│   ├── AuthLayout.jsx
│   └── DashboardLayout.jsx
├── pages/           # Páginas de la aplicación
│   ├── Login.jsx
│   ├── dashboard/
│   ├── perfil/
│   ├── zonas/
│   ├── caficultores/
│   ├── calendario/
│   └── [otras páginas...]
├── routes/          # Configuración de rutas
│   └── index.jsx
├── services/        # Servicios de API
├── utils/           # Utilidades varias
├── App.jsx          # Componente principal
├── main.jsx         # Punto de entrada
└── index.css        # Estilos globales
```

## 🛠️ Instalación

1. Clonar el repositorio:
```bash
git clone [url-del-repositorio]
cd web-demo
```

2. Instalar dependencias:
```bash
npm install
```

3. Iniciar el servidor de desarrollo:
```bash
npm run dev
```

4. Abrir el navegador en `http://localhost:5173`

## 📋 Scripts Disponibles

- `npm run dev` - Iniciar servidor de desarrollo
- `npm run build` - Construir para producción
- `npm run preview` - Previsualizar la construcción
- `npm run lint` - Ejecutar linter

## 🔐 Roles del Sistema

El sistema maneja 4 roles diferentes:

1. **Empresa** - Acceso completo a todas las funcionalidades
2. **Asistente Técnico** - Gestión de caficultores y actividades
3. **Caficultor** - Acceso a su información y actividades
4. **Administrador** - Configuración y administración del sistema

## 🎯 Funcionalidades Principales

### ✅ Implementadas
- Sistema de autenticación completo
- Dashboard con estadísticas
- Sidebar colapsable con navegación
- Gestión de caficultores
- Gestión de zonas
- Calendario de actividades
- Perfil de usuario
- Diseño responsive

### 🚧 En Desarrollo
- Extensionistas/Agrónomos
- Sitios web
- Mensajería interna
- Contenido educativo
- Estaciones meteorológicas
- Gestión de fincas
- Estadísticas avanzadas
- Análisis de rentabilidad
- Pronóstico de cosecha
- Control de volumen

## 🔧 Configuración

### Variables de Entorno
Crear un archivo `.env.local` con las siguientes variables:

```env
VITE_API_URL=http://localhost:3001/api
```

### Configuración de TailwindCSS
El tema personalizado está configurado en `tailwind.config.js` con colores personalizados de vino tinto y café.

## 🚀 Despliegue

Para construir el proyecto para producción:

```bash
npm run build
```

Los archivos generados estarán en la carpeta `dist`.

## 🤝 Contribución

1. Fork del proyecto
2. Crear una rama (`git checkout -b feature/nueva-funcionalidad`)
3. Commit de los cambios (`git commit -am 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crear un Pull Request

## 📄 Licencia

Este proyecto está bajo licencia ISC.

## 📞 Contacto

Para soporte o preguntas, contactar al equipo de desarrollo.
