# SafeByte

Proyecto ASP.NET Core MVC + API con vistas Razor y assets estaticos en `wwwroot`.

**Estructura**
- `Controllers` controladores MVC y API.
- `Data` utilidades de persistencia (legacy).
- `Data/Seed/Users.json` datos de ejemplo (legacy).
- `Models` entidades del dominio.
- `Views` vistas Razor (login, home, comidas).
- `wwwroot` CSS, JS, imagenes y librerias estaticas.
- `Program.cs` configuracion de la app y rutas.

**Requisitos**
- .NET 8 SDK.
- Firebase Firestore (proyecto creado en Firebase).

**Configurar**
1. Crea un proyecto en Firebase y habilita Firestore.
2. Descarga un Service Account JSON y colocalo en `secrets/service-account.json` (ruta relativa al repo).
3. Actualiza `Firestore:ProjectId` en `appsettings.json` (o exporta `GOOGLE_CLOUD_PROJECT`).
4. (Opcional) Para sembrar datos, activa `Firestore:SeedOnStartup` en `appsettings.Development.json`.
5. (Opcional) Si no usas `CredentialsPath`, exporta `GOOGLE_APPLICATION_CREDENTIALS` con la ruta al JSON.

**Ejecutar**
1. `dotnet restore`
2. `dotnet run`

**Rutas principales**
- `/` o `/Home/Index` login y registro.
- `/Home/Home` pagina principal.
- `/Home/Comidas` recetas.
- `POST /api/Auth/Register` registro de usuario.
- `POST /api/Auth/Login` login de usuario.
