using Backend1.Data;              // Para ApplicationDbContext
using Backend1.Models;           // Para la clase User
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks; // Importante para métodos asíncronos

namespace Backend1.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        // Inyectamos ApplicationDbContext en el constructor
        public AuthController(ApplicationDbContext context)
        {
            _context = context;
        }

        // POST: /api/Auth/Register
        [HttpPost("Register")]
        public async Task<IActionResult> Register([FromBody] User newUser)
        {
            // Verifica si ya existe un usuario con ese Email (versión asíncrona)
            bool emailExists = await _context.Users.AnyAsync(u => u.Email == newUser.Email);
            if (emailExists)
            {
                return BadRequest("El usuario con ese Email ya existe.");
            }

            // Hashear la contraseña antes de guardar
            newUser.Password = HashPassword(newUser.Password);

            // Agrega el nuevo usuario a la base de datos
            await _context.Users.AddAsync(newUser);
            await _context.SaveChangesAsync(); // Uso asíncrono

            return Ok("Usuario registrado con éxito.");
        }

        // POST: /api/Auth/Login
        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] User loginData)
        {
            // Busca un usuario con el Email proporcionado en la DB (versión asíncrona)
            var user = await _context.Users
                                     .FirstOrDefaultAsync(u => u.Email == loginData.Email);

            if (user == null)
            {
                return BadRequest("Credenciales inválidas (usuario no encontrado).");
            }

            // Hashear la contraseña ingresada para compararla con la almacenada
            var hashedInputPassword = HashPassword(loginData.Password);
            if (user.Password != hashedInputPassword)
            {
                return BadRequest("Credenciales inválidas (contraseña incorrecta).");
            }

            // Login correcto: retornamos un objeto con mensaje y datos del usuario
            return Ok(new
            {
                Message = "Login correcto",
                User = new
                {
                    user.Username,
                    user.Email
                }
            });
        }

        // Método auxiliar para hashear contraseñas (SHA256 como ejemplo básico)
        private string HashPassword(string password)
        {
            using var sha256 = SHA256.Create();
            var bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
            return Convert.ToBase64String(bytes);
        }
    }
}
