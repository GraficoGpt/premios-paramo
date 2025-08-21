# 🏆 Premios Príncipe de los Páramos

**Premios Príncipe de los Páramos** es una plataforma web integral diseñada para visibilizar, postular y calificar obras audiovisuales que exaltan la biodiversidad y riqueza cultural de Colombia. Inspirado en eventos prestigiosos como los Golden Globes, este proyecto celebra la creatividad desde lo natural, lo diverso y lo auténtico.

🌐 **Sitio web**: [www.principedelosparamos.org](https://www.principedelosparamos.org)

---

## 🎯 Objetivo del Proyecto

Crear una plataforma digital que facilite el reconocimiento y premiación de obras audiovisuales colombianas que promuevan la conservación ambiental y la diversidad cultural, proporcionando un espacio profesional para la gestión completa del proceso de premiación.

## 🚀 Funcionalidades Principales

### 🎥 **Sistema de Postulación**
- Formulario completo para registro de obras audiovisuales
- Soporte para múltiples categorías (largometrajes, cortometrajes, series, documentales, etc.)
- Carga de sinopsis, libretos, imágenes y enlaces de visualización
- Validación automática de datos y prevención de duplicados
- Integración con sistema de pagos para procesamiento de inscripciones

### 👩‍⚖️ **Panel de Jurados Especializado**
- Acceso personalizado para cada jurado según categorías asignadas
- Interfaz intuitiva para visualización de obras y materiales
- Sistema de calificación estructurado con criterios específicos
- Fichas detalladas de cada obra con toda la información necesaria
- Control de acceso y seguimiento del progreso de votación

### 📊 **Sistema de Votación y Resultados**
- Cálculo automático de promedios por obra y jurado
- Almacenamiento seguro de calificaciones en tiempo real
- Dashboard administrativo con métricas y estadísticas
- Generación de reportes detallados para análisis
- Exportación de datos para procesos de nominación

### 🛡️ **Administración y Seguridad**
- Sistema de roles diferenciado (Admin, Jurado, Público)
- Protección de rutas mediante middleware personalizado
- Gestión de jurados y asignación de categorías
- Monitoreo de actividad y auditoría de procesos

---

## 🏗️ Arquitectura Técnica

### Stack Tecnológico
- ⚡ **Astro 5.6+** – Framework moderno con SSR para rendimiento óptimo
- 🧠 **React 19+** – Componentes interactivos y gestión de estado
- 🎨 **Tailwind CSS 4+** – Sistema de diseño con tokens personalizados
- 🔥 **Firebase 11+** – Backend completo (Auth + Firestore + Storage)
- 🚀 **Vercel** – Deployment con optimizaciones automáticas
- 📦 **pnpm** – Gestor de paquetes eficiente
- 🔧 **TypeScript** – Tipado estático para mayor robustez

### Estructura de Datos
- **Proyectos**: Obras audiovisuales con metadata completa
- **Jurados**: Perfiles con categorías asignadas y credenciales
- **Votaciones**: Calificaciones individuales con trazabilidad
- **Categorías**: 17 categorías específicas de premiación

---

## 🚀 Inicio Rápido

### Prerrequisitos
- Node.js 18+ 
- pnpm (requerido para dependencias específicas)
- Cuenta de Firebase con proyecto configurado

### Instalación

```bash
# Clonar el repositorio
git clone <repository-url>
cd paramo-premios

# Instalar dependencias
pnpm install

# Configurar variables de entorno
# Crear src/lib/firebaseConfig.ts con las credenciales de Firebase

# Iniciar servidor de desarrollo
pnpm dev
```

### Scripts Disponibles

```bash
# Desarrollo
pnpm dev          # Servidor de desarrollo
pnpm build        # Build para producción
pnpm preview      # Preview del build
pnpm start        # Servidor de producción

# Calidad de código
pnpm lint         # Linting con ESLint
pnpm format       # Formateo con Prettier
```

---

## 📋 Categorías de Premiación

El sistema maneja 17 categorías específicas:

**Cine y Televisión:**
- Mejor largometraje de ficción/documental/animación
- Mejor cortometraje de ficción/documental/animación  
- Mejor telenovela
- Mejor serie o miniserie de ficción/animación/documental

**Artes Escénicas y Digitales:**
- Mejor obra de teatro
- Mejor obra circense
- Mejor videojuego
- Mejor vodcast

**Contenido Promocional:**
- Mejor video musical
- Mejor spot publicitario

---

## 👥 Roles de Usuario

### 🔧 **Administrador**
- Acceso completo al dashboard administrativo
- Gestión de jurados y asignación de categorías
- Visualización de métricas y reportes
- Exportación de datos y resultados

### ⚖️ **Jurado**
- Acceso a proyectos de categorías asignadas
- Interface de votación con criterios específicos
- Seguimiento de progreso de calificación
- Visualización de materiales y fichas técnicas

### 🌍 **Público General**
- Postulación de obras audiovisuales
- Consulta de reglamentos y bases
- Acceso a información general del evento

---

## 🔐 Seguridad y Autenticación

### Middleware de Protección
- Control de acceso basado en roles mediante cookies
- Protección automática de rutas `/admin/*` y `/jurado/*`
- Redirección inteligente según permisos de usuario
- Validación de sesión en servidor y cliente

### Firebase Security
- Autenticación segura con Firebase Auth
- Reglas de seguridad en Firestore por colección
- Encriptación de datos sensibles
- Auditoría de acceso y modificaciones

---

## 📊 Estructura de Base de Datos

### Colecciones Firestore

**`proyectos`**
```typescript
{
  nombreObra: string,
  nombrePostulante: string,
  categorias: string[],
  email: string,
  celular: string,
  fechaRegistro: string,
  fechaEstreno: string,
  calificado: boolean,
  // ... más campos
}
```

**`jurados`**
```typescript
{
  nombre: string,
  email: string,
  categorias: string[],
  rol: 'admin' | 'jurado',
  fechaRegistro: string
}
```

**`votaciones`**
```typescript
{
  idJurado: string,
  idProyecto: string,
  promedio: number,
  calificaciones: object,
  fechaVotacion: string
}
```

---

## ⚡ Optimizaciones y Rendimiento

### Caching Estratégico
- **LocalStorage**: Cache de dashboards con invalidación temporal
- **Firestore Queries**: Consultas optimizadas con filtros específicos
- **Astro SSR**: Pre-renderizado de páginas estáticas
- **Lazy Loading**: Carga diferida de componentes React pesados

### Build Optimizations
- **Vercel Edge Functions**: Deploy optimizado para América Latina
- **Image Optimization**: Compresión automática con Sharp
- **Bundle Splitting**: Separación automática de chunks
- **Tree Shaking**: Eliminación de código no utilizado

---

## 🚀 Deployment

### Entorno de Producción
- **Hosting**: Vercel con dominio personalizado
- **SSL**: Certificado automático y renovación
- **CDN**: Distribución global de contenido estático
- **Analytics**: Integración con Vercel Analytics
- **Monitoring**: Seguimiento de errores y rendimiento

### Variables de Entorno Requeridas
```bash
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
# ... otras configuraciones de Firebase
```

---

## 🛠️ Desarrollo y Contribución

### Estructura de Archivos Importante
```
src/
├── components/
│   ├── admin/          # Componentes administrativos
│   ├── Jurado/         # Panel de jurados
│   ├── proyecto/       # Formularios de postulación
│   └── ui/             # Componentes reutilizables
├── lib/
│   ├── firebase.ts     # Configuración Firebase
│   ├── categories.ts   # Categorías de premiación
│   └── authGuard.ts    # Utilidades de autenticación
├── middleware/
│   └── index.ts        # Middleware de protección de rutas
└── pages/
    ├── admin/          # Rutas administrativas protegidas
    └── jurado/         # Rutas de jurados protegidas
```

### Convenciones de Código
- **ESLint**: Configuración estricta con plugins de Astro/TypeScript
- **Prettier**: Formateo automático con soporte para Astro/Tailwind
- **TypeScript**: Tipado estricto habilitado
- **Naming**: CamelCase para variables, PascalCase para componentes

### Testing
- Pruebas de integración de autenticación
- Validación de formularios y flujos de usuario
- Testing de roles y permisos
- Verificación de integridad de datos

---

## 📞 Soporte y Documentación

- **Sitio web**: [www.principedelosparamos.org](https://www.principedelosparamos.org)
- **Reglamento**: Disponible en `/pdf/reglamento.pdf`
- **WARP.md**: Documentación técnica para desarrollo
- **Firestore Rules**: Configuración de seguridad en Firebase Console

---

## 📄 Licencia

Este proyecto está desarrollado para los **Premios Príncipe de los Páramos** como plataforma oficial del evento de premiación de obras audiovisuales que celebran la biodiversidad y cultura colombiana.

---

*Desarrollado con ❤️ para celebrar la creatividad audiovisual colombiana*
