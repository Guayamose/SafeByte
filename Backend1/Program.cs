var builder = WebApplication.CreateBuilder(args);

// Registra controladores con vistas (para MVC) y API controllers
builder.Services.AddControllersWithViews();
builder.Services.AddControllers(); // Para los controladores de API

var app = builder.Build();

// Configuración del pipeline HTTP
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles(); // Sirve los archivos estáticos desde wwwroot

app.UseRouting();

app.UseAuthorization();

// Mapea la ruta por defecto para vistas MVC
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}"
);

// Mapea los API controllers (por atributo)
app.MapControllers();

app.Run();
