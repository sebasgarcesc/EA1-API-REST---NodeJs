# API REST de Gestión de Películas y Series (Node.js y MongoDB)

## Descripción del proyecto

Este proyecto se desarrolló con el propósito de construir una API REST modular para la administración de un catálogo de producciones audiovisuales (películas y series) destinada a la Institución Universitaria Digital de Antioquia. La arquitectura implementa validaciones cruzadas de datos, relaciones mediante referencias de Mongoose y control de estados activos para garantizar la integridad de la información.

El desarrollo abarca cinco entidades principales: Géneros, Directores, Productoras, Tipos y Medios, asegurando que las producciones multimedia estén asociadas únicamente a registros válidos y activos.

## Objetivo

Diseñar, implementar y documentar una API REST robusta utilizando Node.js, Express y MongoDB Atlas, aplicando buenas prácticas de control de versiones con Git y GitHub, y realizando pruebas de endpoints mediante clientes HTTP.

## Entidades y Modelo de Negocio

El sistema administra la información a través de cinco módulos interconectados:

- **Géneros:** Categorías temáticas (Acción, Ciencia Ficción, Drama, etc.) con estados de disponibilidad.
- **Directores:** Información de los realizadores y su estado de actividad.
- **Productoras:** Compañías cinematográficas con descripción y eslogan.
- **Tipos:** Clasificación principal de la producción (Película o Serie).
- **Medios (Media):** Entidad central que almacena la información de las películas y series, requiriendo referencias obligatorias y activas a las demás entidades, además de validación de unicidad en seriales y URLs.

## Tecnologías utilizadas

Para el desarrollo del proyecto se utilizaron las siguientes herramientas:

- **Node.js y Express:** Entorno de ejecución y framework para la creación del servidor y las rutas REST.
- **MongoDB Atlas y Mongoose:** Base de datos NoSQL en la nube y ODM para el modelado de esquemas y validaciones.
- **Git y GitHub:** Control de versiones y repositorio de código fuente colaborativo.
- **Thunder Client / Postman:** Herramientas para la prueba y consumo de los endpoints de la API.
- **Dotenv y Cors:** Gestión de variables de entorno seguras y políticas de intercambio de recursos.

## Estructura del proyecto

El código se encuentra organizado de manera modular en la siguiente estructura de carpetas:

```text
api-peliculas-mongo/
│
├── config/
│   └── db.js              # Configuración de la conexión a MongoDB Atlas
│
├── models/
│   ├── Director.js        # Esquema Mongoose para Directores
│   ├── Genero.js          # Esquema Mongoose para Géneros
│   ├── Media.js           # Esquema Mongoose para Películas y Series
│   ├── Productora.js      # Esquema Mongoose para Productoras
│   └── Tipo.js            # Esquema Mongoose para Tipos
│
├── routes/
│   ├── director.routes.js # Endpoints CRUD para Directores
│   ├── genero.routes.js   # Endpoints CRUD para Géneros
│   ├── media.routes.js    # Endpoints CRUD y validaciones cruzadas para Medios
│   ├── productora.routes.js # Endpoints CRUD para Productoras
│   └── tipo.routes.js     # Endpoints CRUD para Tipos
│
├── .env                   # Variables de entorno (Oculto en Git)
├── .gitignore             # Archivos excluidos del control de versiones
├── index.js               # Archivo principal de arranque del servidor
├── package-lock.json      # Versiones exactas de dependencias
└── package.json           # Dependencias y scripts del proyecto
```

## Desarrollo y Lógica de Validación

### 1. Gestión de Estados Activos
Los módulos base (`Género`, `Director` y `Productora`) implementan un campo de estado (`Activo` / `Inactivo`). 

### 2. Validación de Referencias Cruzadas en Medios
Al registrar o actualizar una producción en el módulo `Media`, la API ejecuta una validación estricta que comprueba que:
- El género, director y productora existan en la base de datos y su estado sea **Activo**.
- El tipo especificado sea válido.
- El serial y la URL sean únicos en todo el sistema para evitar duplicidad de registros.

### 3. Población de Datos (`.populate`)
Las consultas de tipo `GET` en el módulo de medios utilizan la función `.populate()` de Mongoose para devolver la información completa de las entidades relacionadas (nombre del género, nombres del director, etc.) en lugar de mostrar únicamente los identificadores en formato ObjectId.

## Ejecución del proyecto

### Desde Visual Studio Code

Primero se debe clonar el repositorio:

```bash
git clone https://github.com/sebasgarcesc/EA1-API-REST---NodeJs.git
```

Posteriormente, se abre la carpeta del proyecto en Visual Studio Code y se instalan las dependencias necesarias ejecutando en la terminal:

```bash
npm install
```

Se debe configurar un archivo `.env` en la raíz del proyecto con la siguiente estructura:

```env
PORT=4000
MONGO_URI=tu_cadena_de_conexion_de_mongodb_atlas
```

Para encender el servidor en modo de desarrollo, ejecutar:

```bash
npm run dev
```

El servidor quedará activo en `http://localhost:4000`.

## Análisis de resultados y Pruebas

Las pruebas funcionales se realizaron utilizando Thunder Client, comprobando que:
- Las peticiones `POST` devuelven `201 Created` al registrar elementos correctamente.
- Las validaciones de negocio rechazan la creación de medios si se vinculan directores inactivos o si se repiten seriales, respondiendo con códigos de error `400 Bad Request`.
- Las consultas `GET` integran de forma exitosa las relaciones cruzadas entre los módulos.

## Conclusiones

El desarrollo de este proyecto permitió aplicar los conceptos fundamentales de la arquitectura backend orientada a servicios REST. Se evidenció la importancia de estructurar esquemas desacoplados con Mongoose y la necesidad de incorporar validaciones de integridad referencial para mantener la consistencia en bases de datos NoSQL. Asimismo, el uso de Git y GitHub facilitó el control de versiones del código fuente de manera segura y profesional.

## Referencias bibliográficas

- IU Digital de Antioquia. *Caso de estudio: Gestión de Películas y Series*. Material académico suministrado para la actividad.
- MongoDB Documentation. *Mongoose ODM Guide*. https://mongoosejs.com/docs/guide.html
- Express.js Documentation. *Routing and Middleware*. https://expressjs.com/

---

**Proyecto académico:** Desarrollo de Software / Programación Backend.

## Integrante

| Nombre | Correo institucional | Usuario de GitHub |
|---|---|---|
| Sebastian Garces | sebastian.garcesc@est.iudigital.edu.co | sebasgarcesc |
