using Backend1.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// 🔹 Configurar la conexión a MySQL
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));

// 🔹 Habilitar CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        p => p.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
});

// 🔹 Sólo API controllers
builder.Services.AddControllers();

var app = builder.Build();

// 🔹 Auto‐migraciones
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    db.Database.Migrate();
}

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();

// 1) Servir index.html por defecto y exponer wwwroot/**
app.UseDefaultFiles();
app.UseStaticFiles();

// 2) API routing y CORS
app.UseCors("AllowAll");
app.UseRouting();
app.UseAuthorization();
app.MapControllers();

// 3) SPA fallback a index.html (para rutas no /api)
app.MapFallbackToFile("index.html");

app.Run();
