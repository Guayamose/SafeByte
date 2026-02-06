using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace SafeByte.Models
{
    public class Allergen
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public required string Name { get; set; }

        // Relación con los usuarios
        public List<UserAllergen> UserAllergens { get; set; } = new List<UserAllergen>();
    }
}
