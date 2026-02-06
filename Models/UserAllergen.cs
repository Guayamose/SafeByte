namespace SafeByte.Models;

public class UserAllergen
{
    public int UserId { get; set; }
    public required User User { get; set; }

    public int AllergenId { get; set; }
    public required Allergen Allergen { get; set; }
}
