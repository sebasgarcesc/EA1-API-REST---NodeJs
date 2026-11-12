# Aplicación Web Full Stack de Gestión de Películas y Series (Node.js, MongoDB y React.js)

## Descripción del proyecto

Este proyecto se desarrolló con el propósito de construir una aplicación web Full Stack modular para la administración de un catálogo de producciones audiovisuales (películas y series) destinada a la Institución Universitaria Digital de Antioquia. La arquitectura desacopla el Backend (API REST con Node.js y MongoDB Atlas) del Frontend (SPA con React.js y Bootstrap), implementando validaciones cruzadas de datos, relaciones mediante referencias de Mongoose y control de estados activos para garantizar la integridad de la información.

El desarrollo abarca cinco módulos principales: Géneros, Directores, Productoras, Tipos y Medios (Películas y Series), asegurando tanto desde el servidor como desde la interfaz gráfica que las producciones multimedia estén asociadas únicamente a registros válidos y activos.

## Objetivo

Diseñar, implementar e integrar una aplicación Full Stack utilizando Node.js, Express y MongoDB Atlas en el Backend, junto con React.js, Bootstrap, Axios, React Router y SweetAlert2 en el Frontend, aplicando buenas prácticas de control de versiones con Git y GitHub.

## Entidades y Modelo de Negocio

El sistema administra la información a través de cinco módulos interconectados con sus respectivas vistas administrativas:

- **Géneros:** Categorías temáticas (Acción, Aventura, Ciencia Ficción, Drama, Terror, etc.) con estados de disponibilidad (`Activo` / `Inactivo`).
- **Directores:** Información de los realizadores principales y su estado de actividad.
- **Productoras:** Compañías cinematográficas con nombre, estado, eslogan y descripción.
- **Tipos:** Clasificación principal del formato multimedia (Película o Serie).
- **Medios (Media):** Módulo central que almacena y visualiza en formato de catálogo las películas y series, requiriendo referencias obligatorias y activas a las demás entidades, además de validación de unicidad en seriales y URLs.

## Tecnologías utilizadas

Para el desarrollo del proyecto se utilizaron las siguientes herramientas:

### Backend
- **Node.js y Express:** Entorno de ejecución y framework para la creación del servidor y las rutas REST.
- **MongoDB Atlas y Mongoose:** Base de datos NoSQL en la nube y ODM para el modelado de esquemas y validaciones.
- **Dotenv y Cors:** Gestión de variables de entorno seguras y políticas de intercambio de recursos entre servidores.
- **Thunder Client:** Herramienta para la prueba inicial y consumo directo de los endpoints de la API.

### Frontend
- **React.js (Vite):** Librería de JavaScript para la construcción de la interfaz de usuario interactiva.
- **Bootstrap 5:** Framework CSS utilizado para el diseño responsivo, barra de navegación, formularios, tablas y tarjetas tipo catálogo.
- **Axios:** Cliente HTTP basado en promesas para conectar las vistas de React con los servicios de la API REST.
- **React Router DOM:** Manejo de rutas dinámicas para la navegación entre los cinco módulos sin recargar la página.
- **SweetAlert2:** Librería para mostrar alertas y confirmaciones interactivas en las operaciones CRUD.

### Control de versiones y recursos
- **Git y GitHub:** Control de versiones y repositorio de código fuente.
- **The Movie Database (TMDB):** Fuente de recursos para las URLs de referencia e imágenes de portada del catálogo.

## Estructura del proyecto

El código se encuentra organizado separando el servidor (`Backend/`) y la aplicación cliente (`Frontend/`) desde la raíz del proyecto:

```text
api-peliculas-mongo/
│
├── Backend/
│   ├── config/
│   │   └── db.js               # Configuración de la conexión a MongoDB Atlas
│   ├── models/
│   │   ├── Director.js         # Esquema Mongoose para Directores
│   │   ├── Genero.js           # Esquema Mongoose para Géneros
│   │   ├── Media.js            # Esquema Mongoose para Películas y Series
│   │   ├── Productora.js       # Esquema Mongoose para Productoras
│   │   └── Tipo.js             # Esquema Mongoose para Tipos
│   ├── routes/
│   │   ├── director.routes.js  # Endpoints CRUD para Directores
│   │   ├── genero.routes.js    # Endpoints CRUD para Géneros
│   │   ├── media.routes.js     # Endpoints CRUD y validaciones cruzadas para Medios
│   │   ├── productora.routes.js# Endpoints CRUD para Productoras
│   │   └── tipo.routes.js      # Endpoints CRUD para Tipos
│   └── index.js                # Archivo principal de arranque del servidor Backend
│
├── Frontend/
│   ├── public/
│   │   └── logo-iud.png        # Ícono institucional en la pestaña del navegador
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx      # Barra de navegación principal con Bootstrap
│   │   │   ├── GeneroView.jsx  # Pantalla de gestión de Géneros
│   │   │   ├── DirectorView.jsx# Pantalla de gestión de Directores
│   │   │   ├── ProductoraView.jsx # Pantalla de gestión de Productoras
│   │   │   ├── TipoView.jsx    # Pantalla de gestión de Tipos
│   │   │   └── MediaView.jsx   # Pantalla principal y catálogo de Películas y Series
│   │   ├── services/
│   │   │   └── api.js          # Configuración base de Axios hacia el Backend
│   │   ├── App.jsx             # Definición de rutas con React Router
│   │   └── main.jsx            # Punto de entrada de React e importación de Bootstrap
│   ├── index.html              # Plantilla HTML principal (Pelis IUDigital)
│   ├── package.json            # Dependencias y scripts del Frontend
│   └── vite.config.js          # Configuración del entorno Vite
│
├── .env                        # Variables de entorno del Backend (Oculto en Git)
├── .gitignore                  # Archivos excluidos del control de versiones
├── package-lock.json           # Versiones exactas de dependencias del Backend
├── package.json                # Dependencias y scripts principales del Backend
└── README.md                   # Documentación general del proyecto
```

## Desarrollo y Lógica de Validación

### 1. Gestión de Estados Activos
Los módulos base (`Género`, `Director` y `Productora`) implementan un campo de estado (`Activo` / `Inactivo`) tanto en la base de datos como en los formularios de React.

### 2. Validación de Referencias Cruzadas en Medios
Al registrar o actualizar una producción en el módulo `Media`:
- El Frontend filtra dinámicamente las listas desplegables para mostrar únicamente géneros, directores y productoras cuyo estado sea **Activo**.
- El Backend valida que las referencias existan, estén activas y que tanto el `serial` como la `url` sean únicos en todo el sistema.

### 3. Población de Datos (`.populate`) y Renderizado en Catálogo
Las consultas `GET` en el módulo de medios utilizan `.populate()` de Mongoose para enviar al Frontend los objetos completos de las entidades relacionadas, permitiendo renderizar en cada tarjeta de Bootstrap el título, póster, año, sinopsis, género, director, productora y enlace directo de visualización.

## Ejecución del proyecto

### 1. Clonar el repositorio

```bash
git clone [https://github.com/sebasgarcesc/EA1-API-REST---NodeJs.git](https://github.com/sebasgarcesc/EA1-API-REST---NodeJs.git)
cd api-peliculas-mongo
```

### 2. Configurar y encender el Backend (Terminal 1)

Instalar las dependencias de la raíz del proyecto:

```bash
npm install
```

Configurar un archivo `.env` en la raíz del proyecto con la siguiente estructura:

```env
PORT=4000
MONGO_URI=tu_cadena_de_conexion_de_mongodb_atlas
```

Iniciar el servidor Backend en modo de desarrollo:

```bash
npm run dev
```

El servidor de la API quedará activo en `http://localhost:4000`.

### 3. Configurar y encender el Frontend (Terminal 2)

Abrir una nueva terminal en Visual Studio Code, ingresar a la carpeta `Frontend` e instalar sus paquetes:

```bash
cd Frontend
npm install
```

Iniciar el servidor de desarrollo de React con Vite:

```bash
npm run dev
```

La aplicación web estará disponible en el navegador en `http://localhost:5173`.

## Análisis de resultados y Pruebas

Las pruebas de integración demostraron que:
- La comunicación entre React.js y Node.js mediante Axios permite listar, crear, actualizar y eliminar registros en tiempo real sobre MongoDB Atlas.
- El cambio de estado de un género, director o productora a `Inactivo` actualiza de inmediato las opciones disponibles en el formulario de creación de películas.
- Las alertas de SweetAlert2 notifican oportunamente al administrador tanto las operaciones exitosas como los errores de validación devueltos por la API.

## Conclusiones

El desarrollo de este proyecto permitió integrar una arquitectura Full Stack completa, conectando una API RESTful en Node.js y MongoDB con una interfaz reactiva en React.js estilizada con Bootstrap. Se evidenció la importancia de mantener una estructura de directorios limpia y separada entre `Backend` y `Frontend`, centralizar las peticiones HTTP con Axios y garantizar la integridad referencial tanto en la interfaz de usuario como en el servidor.

## Referencias bibliográficas

- IU Digital de Antioquia. *Caso de estudio: Gestión de Películas y Series*. Material académico suministrado para la actividad.
- React Documentation. *Guía oficial de React*. https://es.react.dev/
- Bootstrap Documentation. *Componentes y sistema de grillas*. https://getbootstrap.com/
- Axios Documentation. *Promise based HTTP client*. https://axios-http.com/
- MongoDB Documentation. *Mongoose ODM Guide*. https://mongoosejs.com/docs/guide.html

---

**Proyecto académico:** Ingeniería Web II - Desarrollo Full Stack (Backend Node.js + Frontend React.js).

## Integrante

| Nombre | Correo institucional | Usuario de GitHub |
|---|---|---|
| Sebastian Garces | sebastian.garcesc@est.iudigital.edu.co | sebasgarcesc |
