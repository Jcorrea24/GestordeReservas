# Table-Track 🍽️ · Gestor de Reservas

**Table-Track** es una aplicación web (SPA) diseñada para que los anfitriones (hosts) de restaurantes puedan gestionar eficientemente las reservas de mesas de sus clientes en tiempo real. Este proyecto ha sido construido siguiendo las más estrictas buenas prácticas de desarrollo frontend, garantizando una interfaz atractiva, ágil, modular y responsiva para dispositivos móviles y de escritorio.

---

## 🚀 Enlaces de Interés

- **Despliegue de Producción (Vercel / Netlify):** [https://gestor-reservas-tabletrack.vercel.app](https://gestor-reservas-tabletrack.vercel.app) *(o el enlace correspondiente provisto)*
- **Servicio RESTful API (MockAPI):** [https://6a1201323e35d0f37ee3e14d.mockapi.io/Reservas](https://6a1201323e35d0f37ee3e14d.mockapi.io/Reservas)

---

## 🛠️ Stack Tecnológico

El proyecto está construido sobre un ecosistema moderno y de alto rendimiento:

- **Framework:** [React 19](https://react.dev/) inicializado y compilado con [Vite](https://vite.dev/) para un Hot Module Replacement (HMR) ultrarrápido.
- **Enrutamiento:** [React Router DOM v7](https://reactrouter.com/) para el control y protección de rutas.
- **Cliente HTTP:** [Axios](https://axios-http.com/) para el consumo robusto e interactivo de la API RESTful.
- **Alertas e Interacciones:** [SweetAlert2](https://sweetalert2.github.io/) para cuadros de diálogo de confirmación interactivos y notificaciones elegantes.
- **Estilos y Diseño:** [Tailwind CSS v3](https://tailwindcss.com/) para una UI fluida, consistente y totalmente responsiva.
- **Persistencia de Turnos:** `LocalStorage` nativo de JavaScript para mantener la sesión del anfitrión activa.

---

## 📋 Reglas de Negocio Implementadas

### 1. Módulo de Ingreso Seguro (Simulación de Turno)
- **Acceso Restringido (`/login`):** El usuario debe ingresar su nombre completo y elegir un turno operativo (Mañana, Tarde, Noche) para poder acceder al panel principal.
- **Persistencia Local:** Los datos del anfitrión se guardan de forma segura en `LocalStorage` bajo una llave dedicada.
- **Protección de Rutas:** Si un usuario intenta acceder directamente al `/panel` sin iniciar turno, es redirigido automáticamente a la pantalla de acceso.
- **Cierre de Turno:** Un botón dedicado limpia las credenciales almacenadas y retorna al usuario a la pantalla de login.

### 2. Gestión Integral de Reservas (CRUD Completo)
- **Lectura (GET):** Recuperación de todas las reservas registradas y presentación en una cuadrícula moderna.
- **Creación (POST):** Formulario modal con validación de datos requeridos para evitar registros incompletos.
- **Edición (PUT):** Permite cambiar los datos de la reserva (nombre, cantidad de comensales, fecha y hora local) sin desfases de zona horaria.
- **Finalización Rápida:** Botón dedicado para cambiar de inmediato el estado de una reserva a **"Finalizada"** cuando el cliente desocupa la mesa.
- **Eliminación (DELETE):** Cancelación de reservas con confirmación previa y alerta de éxito impulsadas por **SweetAlert2**.

### 3. Criterios de Excelencia y UX/UI
- **Filtrado Dinámico en Cliente:** Barra de filtros en tiempo real para visualizar reservas totales o segmentadas por estado (*Confirmada*, *En Espera*, *Finalizada*).
- **Indicadores de Carga y Feedback Visual:** *Skeletons/Spinners* dinámicos para informar al usuario sobre peticiones asíncronas en curso y deshabilitación temporal de botones para evitar dobles peticiones.
- **Prevención de Errores (Timezone Bug-Free):** Manejo robusto de fechas y horas locales para evitar el desfase horario que produce `toISOString()`.
- **Diseño Responsivo:** Adaptabilidad total optimizada especialmente para dispositivos móviles de hosts de restaurante.

---

## 📂 Estructura del Proyecto

La arquitectura sigue un patrón modular y escalable para facilitar el mantenimiento y la extensibilidad del código:

```bash
gestor-reservas/
├── public/                 # Recursos estáticos globales (favicons, imágenes)
├── src/
│   ├── components/         # Componentes atómicos y reutilizables
│   │   ├── FilterBar.jsx       # Barra de filtros rápidos por estado
│   │   ├── ReservationCard.jsx # Tarjeta de visualización y acciones de reserva
│   │   ├── ReservationForm.jsx # Formulario modal para crear y editar
│   │   └── Spinner.jsx         # Componente de feedback de carga
│   ├── pages/              # Vistas de página completas (Rutas)
│   │   ├── LoginPage.jsx       # Módulo de Ingreso Seguro
│   │   └── PanelPage.jsx       # Panel de control CRUD de reservas
│   ├── router/             # Enrutamiento y control de acceso
│   │   └── AppRouter.jsx       # Rutas públicas/protegidas con RutaProtegida
│   ├── services/           # Capa de consumo de APIs
│   │   └── reservations.js     # Peticiones Axios al backend de MockAPI
│   ├── utils/              # Funciones auxiliares y constantes
│   │   ├── auth.js             # Lógica de persistencia de sesión
│   │   ├── constants.js        # Constantes de negocio globales
│   │   └── formatDate.js       # Formateadores de fecha local y para inputs
│   ├── App.css             # Estilos locales específicos
│   ├── App.jsx             # Punto de entrada de la aplicación de React
│   ├── index.css           # Capa e inyección de directivas Tailwind CSS
│   └── main.jsx            # Punto de renderizado del DOM
├── index.html              # Archivo HTML5 base del aplicativo
├── package.json            # Gestión de dependencias y scripts de ejecución
├── tailwind.config.js      # Configuración y extensión de la paleta de colores
└── README.md               # Documento de presentación de la prueba
```

---

## ⚙️ Instrucciones de Ejecución Local

Sigue estos sencillos pasos para instalar y ejecutar el proyecto en tu entorno local:

### 1. Requisitos Previos
Asegúrate de tener instalado en tu sistema:
- **Node.js** (versión 18.0.0 o superior recomendada)
- **NPM** o **Yarn**

### 2. Clonar el Repositorio
Abre tu terminal y ejecuta:
```bash
git clone https://github.com/tu-usuario/gestor-reservas.git
```
*Reemplaza el enlace con la URL oficial de tu repositorio en GitHub.*

### 3. Acceder al Directorio
```bash
cd gestor-reservas
```

### 4. Instalar Dependencias
Ejecuta el gestor de paquetes para descargar todas las librerías necesarias:
```bash
npm install
```

### 5. Iniciar el Servidor de Desarrollo
Levanta la aplicación en modo desarrollo:
```bash
npm run dev
```
La consola te proporcionará una URL local (normalmente `http://localhost:5173`). Ábrela en tu navegador para ver la aplicación funcionando.

### 6. Construir para Producción (Build)
Para compilar y empaquetar la aplicación optimizada para producción:
```bash
npm run build
```
Los archivos de distribución final se generarán en la carpeta `dist/`.

---

## 🌿 Flujo de Trabajo (GitFlow) y Colaboración

Este proyecto ha sido desarrollado bajo un control estricto de Git utilizando la metodología **GitFlow**:
- **`main`**: Alberga únicamente código estable y probado, listo para producción.
- **`develop`**: Rama de integración donde convergen las características listas.
- **Convención de Commits:** Todos los mensajes de commit siguen las convenciones semánticas de **Conventional Commits** (ej. `feat: add reservation form`, `fix: resolve date formatting issue`) para garantizar un historial legible y profesional.
