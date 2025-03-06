using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend1.Models
{
    public class Allergen
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public required  string Name { get; set; }

        // Relación con los usuarios
        public List<UserAllergen> UserAllergens { get; set; } = new List<UserAllergen>();
    }
}
