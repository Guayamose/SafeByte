namespace Backend1.Models
{
    public class User
    {
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }

        // Constructor por defecto
        public User()
        {
            Username = string.Empty;
            Email = string.Empty;
            Password = string.Empty;
        }

        // Constructor con parámetros (opcional)
        public User(string username, string email, string password)
        {
            Username = username;
            Email = email;
            Password = password;
        }
    }
}
