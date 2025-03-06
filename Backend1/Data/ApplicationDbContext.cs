using Microsoft.EntityFrameworkCore;
using Backend1.Models;

namespace Backend1.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options) { }

        // Tablas en la base de datos
        public DbSet<User> Users { get; set; }
        public DbSet<Allergen> Allergens { get; set; }
        public DbSet<UserAllergen> UserAllergens { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Clave primaria compuesta en la entidad UserAllergen
            modelBuilder.Entity<UserAllergen>()
                .HasKey(ua => new { ua.UserId, ua.AllergenId });

            base.OnModelCreating(modelBuilder);
        }
    }
}
