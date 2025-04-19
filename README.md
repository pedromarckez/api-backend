# API de Gestión de Usuarios y Equipos

## Descripción
API REST desarrollada con Node.js, Express y MongoDB para la gestión de usuarios y equipos. Incluye funcionalidades de autenticación, gestión de roles y manejo de archivos.

## Tecnologías Utilizadas
- Node.js
- Express
- MongoDB
- JWT (JSON Web Tokens)
- bcrypt
- multer (para manejo de archivos)
- Cloudinary (para almacenamiento de imágenes)

## Instalación

1. Clonar el repositorio:
```bash
git clone [URL_DEL_REPOSITORIO]
```

2. Instalar dependencias:
```bash
npm install
```

3. Crear archivo .env en la raíz del proyecto con las siguientes variables:
```env
MONGODB_URI=tu_url_de_mongodb
JWT_SECRET=tu_secreto_jwt
CLOUDINARY_URL=tu_url_de_cloudinary
```

4. Iniciar el servidor:
```bash
npm start
```

## Endpoints de Usuario

### Autenticación

#### Registro de Usuario
- **POST** `/api/v1/users/register`
- **Descripción**: Registra un nuevo usuario en el sistema
- **Body**:
```json
{
    "userName": "string",
    "email": "string",
    "password": "string",
    "img": "file (opcional)"
}
```
- **Respuesta**: 201 Created

#### Login
- **POST** `/api/v1/users/login`
- **Descripción**: Autentica un usuario y devuelve un token JWT
- **Body**:
```json
{
    "email": "string",
    "password": "string"
}
```
- **Respuesta**: 200 OK con token JWT

### Gestión de Usuarios

#### Obtener Todos los Usuarios
- **GET** `/api/v1/users`
- **Descripción**: Obtiene lista de todos los usuarios
- **Respuesta**: 200 OK

#### Obtener Usuario por ID
- **GET** `/api/v1/users/:id`
- **Descripción**: Obtiene un usuario específico por su ID
- **Respuesta**: 200 OK

#### Actualizar Usuario
- **PUT** `/api/v1/users/:id`
- **Descripción**: Actualiza datos de un usuario
- **Autenticación**: Requerida
- **Permisos**: Solo el propio usuario
- **Body**:
```json
{
    "userName": "string",
    "email": "string",
    "img": "file (opcional)"
}
```
- **Respuesta**: 201 Created

#### Actualizar Rol de Usuario
- **PUT** `/api/v1/users/:id/role`
- **Descripción**: Actualiza el rol de un usuario (admin/user)
- **Autenticación**: Requerida
- **Permisos**: Solo administradores
- **Body**:
```json
{
    "role": "admin" | "user"
}
```
- **Respuesta**: 200 OK

#### Eliminar Usuario
- **DELETE** `/api/v1/users/:id`
- **Descripción**: Elimina un usuario específico
- **Autenticación**: Requerida
- **Permisos**: Administradores pueden eliminar cualquier usuario, usuarios normales solo pueden eliminarse a sí mismos
- **Respuesta**: 200 OK

## Endpoints de Equipo

### Gestión de Equipos

#### Obtener Todos los Equipos
- **GET** `/api/v1/teams`
- **Descripción**: Obtiene lista de todos los equipos
- **Respuesta**: 200 OK

#### Obtener Equipo por ID
- **GET** `/api/v1/teams/:id`
- **Descripción**: Obtiene un equipo específico por su ID
- **Respuesta**: 200 OK

#### Crear Equipo
- **POST** `/api/v1/teams`
- **Descripción**: Crea un nuevo equipo
- **Autenticación**: Requerida
- **Permisos**: Solo administradores
- **Body**:
```json
{
    "name": "string",
    "description": "string",
    "img": "file (opcional)"
}
```
- **Respuesta**: 201 Created

#### Actualizar Equipo
- **PUT** `/api/v1/teams/:id`
- **Descripción**: Actualiza datos de un equipo
- **Autenticación**: Requerida
- **Permisos**: Solo administradores
- **Body**:
```json
{
    "name": "string",
    "description": "string",
    "img": "file (opcional)"
}
```
- **Respuesta**: 201 Created

#### Eliminar Equipo
- **DELETE** `/api/v1/teams/:id`
- **Descripción**: Elimina un equipo específico
- **Autenticación**: Requerida
- **Permisos**: Solo administradores
- **Respuesta**: 200 OK

## Modelos

### Usuario
```javascript
{
    userName: String,
    email: String,
    password: String,
    img: String,
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    team: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "teams"
    }]
}
```

### Equipo
```javascript
{
    name: String,
    description: String,
    img: String
}
```

## Middleware de Autenticación

### isAuth
- Verifica el token JWT en el header de autorización
- Añade el usuario autenticado al objeto request
- Devuelve error 401 si el usuario no existe o el token es inválido

### isAdmin
- Verifica si el usuario tiene rol de administrador
- Requerido para operaciones administrativas 
- Devuelve error 403 si el usuario no es administrador

## Manejo de Errores
La API utiliza códigos de estado HTTP estándar:
- 200: Operación exitosa
- 201: Recurso creado
- 400: Error de solicitud
- 401: No autorizado
- 403: Prohibido
- 404: No encontrado
- 500: Error interno del servidor

## Seguridad
- Contraseñas hasheadas con bcrypt
- Autenticación mediante JWT
- Validación de roles para operaciones sensibles
- Manejo seguro de archivos con Cloudinary

## Contribución
1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia
Este proyecto está bajo la Licencia MIT 