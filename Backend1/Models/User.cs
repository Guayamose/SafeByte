using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend1.Models
{
    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        public string Username { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }

        // Relación con los alérgenos del usuario
        public List<UserAllergen> UserAllergens { get; set; } = new List<UserAllergen>();

        // Constructor por defecto
        public User()
        {
            Username = string.Empty;
            Email = string.Empty;
            Password = string.Empty;
        }

        // Constructor con parámetros
        public User(string username, string email, string password)
        {
            Username = username;
            Email = email;
            Password = password;
        }
    }
}
