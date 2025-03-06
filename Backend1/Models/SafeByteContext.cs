using Backend1.Models;
using Microsoft.EntityFrameworkCore;

public class SafeBiteContext : DbContext
{
    public SafeBiteContext(DbContextOptions<SafeBiteContext> options) : base(options) {}

    public DbSet<User> Users { get; set; }
    public DbSet<Allergen> Allergens { get; set; }
    public DbSet<UserAllergen> UserAllergens { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<UserAllergen>()
            .HasKey(ua => new { ua.UserId, ua.AllergenId });

        modelBuilder.Entity<UserAllergen>()
            .HasOne(ua => ua.User)
            .WithMany(u => u.UserAllergens)
            .HasForeignKey(ua => ua.UserId);

        modelBuilder.Entity<UserAllergen>()
            .HasOne(ua => ua.Allergen)
            .WithMany()
            .HasForeignKey(ua => ua.AllergenId);
    }
}
