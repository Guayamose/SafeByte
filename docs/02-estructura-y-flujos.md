# Estructura Y Flujos Del Proyecto

**Resumen**
Este proyecto es una app ASP.NET Core MVC con vistas Razor y una API para autenticacion que guarda usuarios en Firestore. El frontend es HTML y JS plano servido desde `wwwroot` y vistas en `Views`.

**Carpetas Principales**
1. `Controllers` contiene los controladores MVC y los endpoints de API.
2. `Data` contiene utilidades de datos y el seed local (solo para desarrollo).
3. `Models` contiene las entidades de dominio.
4. `Services` contiene servicios auxiliares como el hasher de contrasenas.
5. `Views` contiene las vistas Razor para la web.
6. `wwwroot` contiene CSS, JS, imagenes y librerias estaticas.
7. `Properties` contiene configuracion de lanzamiento.
8. `docs` contiene la documentacion del proyecto.

**Archivos Clave**
1. `Program.cs` configura el contenedor DI, Firestore y el routing.
2. `SafeByte.csproj` define dependencias y compilacion.
3. `appsettings.json` tiene el `Firestore:ProjectId`.
4. `appsettings.Development.json` permite `SeedOnStartup` y `CredentialsPath`.
5. `.gitignore` ignora `secrets/` y binarios.

**Controllers**
`Controllers/HomeController.cs`
1. Renderiza vistas principales.
2. Acciones disponibles: `Index`, `Home`, `Comidas`, `Error`.

`Controllers/AuthController.cs`
1. API REST para registro y login.
2. Guarda y consulta usuarios en Firestore.
3. Usa `PasswordHasher` para comparar contrasenas.

**Models**
1. `User.cs` define el modelo de usuario.
2. `Allergen.cs` y `UserAllergen.cs` estan listos para alergias si se extiende el proyecto.
3. `ErrorViewModel.cs` se usa en la vista de error.

**Services**
`Services/PasswordHasher.cs`
1. Hashea contrasenas con SHA256.
2. Se usa en registro y login.

**Data**
`Data/Seed/Users.json`
1. Contiene usuarios de ejemplo.
2. Se usa solo en desarrollo si `SeedOnStartup` esta activo.

`Data/FileDatabase.cs`
1. Lee el JSON de seed.
2. No es una base de datos real, solo soporte para la semilla.

**Views**
`Views/Home/Index.cshtml`
1. Pantalla de login y registro.
2. Carga `wwwroot/src/ventanas/index.js`.

`Views/Home/Home.cshtml`
1. Pagina principal con secciones internas.
2. Incluye el scanner y configuracion de usuario.

`Views/Home/Comidas.cshtml`
1. Muestra recetas y filtros por alergias.
2. Usa `wwwroot/src/ventanas/comida.js`.

`Views/Shared/_Layout.cshtml`
1. Layout basico para vistas que lo usen.
2. Las vistas principales usan `Layout = null` para HTML completo.

**wwwroot**
1. `wwwroot/src/css` contiene estilos.
2. `wwwroot/src/ventanas` contiene JS del frontend.
3. `wwwroot/src/media` contiene imagenes.
4. `wwwroot/lib` contiene librerias de terceros.

**Flujo De Registro**
1. El usuario completa el formulario en `Index`.
2. `index.js` envia POST a `/api/Auth/Register`.
3. `AuthController` normaliza email y hashea password.
4. Se guarda un documento en Firestore en `users/{email}`.
5. El frontend redirige a `/Home/Home`.

**Flujo De Login**
1. El usuario completa el formulario en `Index`.
2. `index.js` envia POST a `/api/Auth/Login`.
3. `AuthController` busca el documento por email.
4. Si el hash coincide, devuelve `Login correcto`.
5. El frontend redirige a `/Home/Home`.

**Flujo De Semilla (Development)**
1. Arranca la app con `ASPNETCORE_ENVIRONMENT=Development`.
2. `SeedOnStartup` en `appsettings.Development.json` debe estar en `true`.
3. `Program.cs` llama a `SeedFirestoreAsync`.
4. Se leen usuarios de `Data/Seed/Users.json`.
5. Se crean documentos en Firestore si no existen.

**Endpoints API**
1. `POST /api/Auth/Register` crea usuario.
2. `POST /api/Auth/Login` valida usuario.

**Como Se Mapean Las Rutas**
1. Ruta por defecto: `/` y `/Home/Index`.
2. Otras vistas: `/Home/Home` y `/Home/Comidas`.
3. Endpoints API bajo `/api`.

**Datos En Firestore**
1. Coleccion: `users`.
2. Documento: ID = email en minusculas.
3. Campos: `username`, `email`, `passwordHash`, `createdAt`, `seeded`.

**Puntos A Tener En Cuenta**
1. No subas `secrets/service-account.json` a git.
2. El JSON de Service Account es solo para backend.
3. Firestore debe estar creado con ID `(default)`.
4. El login requiere `username`, `email` y `password` porque el modelo lo exige.

**Si Quieres Ampliar**
1. Mover alergias a Firestore.
2. Crear colecciones `allergens` y `user_allergens`.
3. Añadir validacion y roles en backend.
4. Añadir pruebas automáticas.
