using Backend1.Models; // Asegúrate de que el namespace coincide
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace Backend1.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        // POST: /api/Auth/Register
        [HttpPost("Register")]
        public IActionResult Register([FromBody] User newUser)
        {
            // Carga la lista de usuarios desde el archivo Users.json
            var users = FileDatabase.LoadUsers();

            // Verifica si ya existe un usuario con ese Email
            if (users.Any(u => u.Email == newUser.Email))
            {
                return BadRequest("El usuario con ese Email ya existe.");
            }

            // Agrega el nuevo usuario a la lista
            users.Add(newUser);

            // Guarda la lista actualizada en el archivo
            FileDatabase.SaveUsers(users);

            return Ok("Usuario registrado con éxito.");
        }

        // POST: /api/Auth/Login
        [HttpPost("Login")]
        public IActionResult Login([FromBody] User loginData)
        {
            // Carga la lista de usuarios
            var users = FileDatabase.LoadUsers();

            // Busca un usuario con el Email proporcionado
            var user = users.FirstOrDefault(u => u.Email == loginData.Email);
            if (user == null)
            {
                return BadRequest("Credenciales inválidas (usuario no encontrado).");
            }

            // Compara contraseñas (en producción, recuerda usar hash)
            if (user.Password != loginData.Password)
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
    }
}
