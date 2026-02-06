using Google.Cloud.Firestore;
using SafeByte.Models;           // Para la clase User
using SafeByte.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks; // Importante para métodos asíncronos

namespace SafeByte.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly CollectionReference _users;

        // Inyectamos FirestoreDb en el constructor
        public AuthController(FirestoreDb firestoreDb)
        {
            _users = firestoreDb.Collection("users");
        }

        // POST: /api/Auth/Register
        [HttpPost("Register")]
        public async Task<IActionResult> Register([FromBody] User newUser)
        {
            var email = NormalizeEmail(newUser.Email);
            if (string.IsNullOrWhiteSpace(email))
            {
                return BadRequest("Email inválido.");
            }

            // Verifica si ya existe un usuario con ese Email
            var docRef = _users.Document(email);
            var snapshot = await docRef.GetSnapshotAsync();
            if (snapshot.Exists)
            {
                return BadRequest("El usuario con ese Email ya existe.");
            }

            // Hashear la contraseña antes de guardar
            var passwordHash = PasswordHasher.HashPassword(newUser.Password);

            var userData = new Dictionary<string, object>
            {
                ["username"] = newUser.Username,
                ["email"] = email,
                ["passwordHash"] = passwordHash,
                ["createdAt"] = Timestamp.GetCurrentTimestamp()
            };

            // Guarda el usuario en Firestore
            await docRef.SetAsync(userData);

            return Ok("Usuario registrado con éxito.");
        }

        // POST: /api/Auth/Login
        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] User loginData)
        {
            var email = NormalizeEmail(loginData.Email);
            if (string.IsNullOrWhiteSpace(email))
            {
                return BadRequest("Credenciales inválidas (usuario no encontrado).");
            }

            // Busca un usuario con el Email proporcionado
            var docRef = _users.Document(email);
            var snapshot = await docRef.GetSnapshotAsync();
            if (!snapshot.Exists)
            {
                return BadRequest("Credenciales inválidas (usuario no encontrado).");
            }

            // Hashear la contraseña ingresada para compararla con la almacenada
            var hashedInputPassword = PasswordHasher.HashPassword(loginData.Password);
            var storedPasswordHash = snapshot.GetValue<string>("passwordHash");
            if (storedPasswordHash != hashedInputPassword)
            {
                return BadRequest("Credenciales inválidas (contraseña incorrecta).");
            }

            // Login correcto: retornamos un objeto con mensaje y datos del usuario
            var username = snapshot.ContainsField("username")
                ? snapshot.GetValue<string>("username")
                : email;
            return Ok(new
            {
                Message = "Login correcto",
                User = new
                {
                    Username = username,
                    Email = email
                }
            });
        }

        private static string NormalizeEmail(string? email)
        {
            return email?.Trim().ToLowerInvariant() ?? string.Empty;
        }
    }
}
