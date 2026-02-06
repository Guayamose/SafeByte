# Guia De Instalacion Y Setup

**Objetivo**
Dejar el proyecto funcionando en cualquier maquina desde cero, con Firestore activo, semillas cargadas y el servidor levantado.

**Resumen Rapido**
1. Instala .NET 8 SDK.
2. Crea la base de datos de Firestore en Firebase.
3. Descarga el Service Account JSON y colocalo en `secrets/service-account.json`.
4. Ejecuta `dotnet run`.

**Requisitos Obligatorios**
1. .NET 8 SDK.
2. Proyecto Firebase con Firestore habilitado.
3. Service Account JSON (credenciales de servidor).

**Requisitos Opcionales**
1. Node.js solo si quieres usar `live-server` para static testing.

**Paso 0. Clonar El Proyecto**
1. Clona el repositorio en tu maquina.
2. Entra en la carpeta del proyecto.

```bash
cd /ruta/a/SafeByte
```

**Paso 1. Instalar .NET 8**

**Mac (Homebrew)**
1. Instala Homebrew si no lo tienes.
2. Instala el SDK de .NET 8.

```bash
brew update
brew install dotnet@8
```

3. Enlaza la version 8 si el sistema no la detecta.

```bash
brew link --force --overwrite dotnet@8
```

4. Verifica la version.

```bash
dotnet --version
```

**Windows (PowerShell)**
1. Abre PowerShell como usuario normal.
2. Instala el SDK con winget.

```powershell
winget install Microsoft.DotNet.SDK.8
```

3. Cierra y abre terminal.
4. Verifica la version.

```powershell
dotnet --version
```

**Linux (Ubuntu/Debian)**
1. Instala prerequisitos.

```bash
sudo apt-get update
sudo apt-get install -y wget ca-certificates gnupg
```

2. Agrega el repositorio de Microsoft.

```bash
wget https://packages.microsoft.com/config/ubuntu/24.04/packages-microsoft-prod.deb -O /tmp/packages-microsoft-prod.deb
sudo dpkg -i /tmp/packages-microsoft-prod.deb
rm /tmp/packages-microsoft-prod.deb
sudo apt-get update
```

3. Instala el SDK.

```bash
sudo apt-get install -y dotnet-sdk-8.0
```

4. Verifica la version.

```bash
dotnet --version
```

**Paso 2. Crear Firestore**
1. Entra a Firebase Console.
2. Abre el proyecto `fooddna-b91c1`.
3. Abre Firestore Database.
4. Crea la base de datos.
5. Usa el ID por defecto `(default)`.
6. Elige la region mas cercana a tus usuarios.

**Paso 3. Descargar El Service Account JSON**
1. En Firebase Console ve a Project Settings.
2. Pestaña Service Accounts.
3. Pulsa Generate new private key.
4. Descarga el archivo JSON.

**Paso 4. Colocar El JSON En El Proyecto**
1. Crea la carpeta `secrets` si no existe.
2. Mueve el JSON a esa carpeta y renombralo.

```bash
mkdir -p secrets
mv /ruta/al/archivo.json secrets/service-account.json
```

**Importante**
1. El archivo `secrets/service-account.json` NO se sube a git.
2. Esta ruta ya esta en `.gitignore`.

**Paso 5. Configurar ProjectId**
1. Abre `appsettings.json`.
2. Verifica que tengas esto:

```json
"Firestore": {
  "ProjectId": "fooddna-b91c1"
}
```

**Paso 6. Activar Seed (Opcional, solo Development)**
1. Abre `appsettings.Development.json`.
2. Activa el seed si quieres cargar usuarios de ejemplo.

```json
"Firestore": {
  "CredentialsPath": "secrets/service-account.json",
  "SeedOnStartup": true
}
```

**Paso 7. Ejecutar El Proyecto**
1. Restaura dependencias.

```bash
dotnet restore
```

2. Ejecuta en modo Development.

```bash
ASPNETCORE_ENVIRONMENT=Development dotnet run
```

3. Abre el navegador:

```text
http://localhost:5113
```

**Paso 8. Probar Login**
1. Si el seed esta activo, puedes usar:

```json
{
  "username": "demo",
  "email": "demo@fooddna.local",
  "password": "demo123"
}
```

2. Ejemplo con curl:

```bash
curl -X POST http://localhost:5113/api/Auth/Login \
  -H "Content-Type: application/json" \
  -d '{"username":"demo","email":"demo@fooddna.local","password":"demo123"}'
```

**Notas De Certificados HTTPS**
1. Si ves un warning de certificado dev en macOS o Windows:

```bash
dotnet dev-certs https --trust
```

2. En Linux puedes usar HTTP sin problemas en desarrollo.

**Solucion De Errores Comunes**
1. Error de credenciales: revisa `secrets/service-account.json` y su ruta.
2. Error de Firestore no creado: crea la base de datos en Firebase y usa `(default)`.
3. Error de puerto ocupado: cambia el puerto en `Properties/launchSettings.json`.
4. Error de login: asegurate de enviar `username`, `email` y `password`.

**Verificacion Final**
1. La app debe arrancar sin excepciones.
2. En Firestore debes ver la coleccion `users` con documentos.
3. El login deberia responder con `Login correcto`.
