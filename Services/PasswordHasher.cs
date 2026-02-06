namespace SafeByte.Services;

using System.Security.Cryptography;
using System.Text;

public static class PasswordHasher
{
    public static string HashPassword(string? password)
    {
        using var sha256 = SHA256.Create();
        var bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password ?? string.Empty));
        return Convert.ToBase64String(bytes);
    }
}
