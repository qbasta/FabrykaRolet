using FabrykaRolet.Infrastructure.Data.Entities;
using FabrykaRolet.Infrastructure.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace FabrykaRolet.Infrastructure.Data;

public sealed class AppDbContext(DbContextOptions<AppDbContext> options) : IdentityDbContext<AdminUser>(options)
{
    public DbSet<WindowSystemEntity> WindowSystems => Set<WindowSystemEntity>();
    public DbSet<WindowSystemAdvantageEntity> WindowSystemAdvantages => Set<WindowSystemAdvantageEntity>();
    public DbSet<WindowSystemMaterialEntity> WindowSystemMaterials => Set<WindowSystemMaterialEntity>();
    public DbSet<WindowSystemImageEntity> WindowSystemImages => Set<WindowSystemImageEntity>();
    public DbSet<SiteContentEntryEntity> SiteContentEntries => Set<SiteContentEntryEntity>();

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        builder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);
    }

    public override int SaveChanges()
    {
        ApplyAuditTimestamps();
        return base.SaveChanges();
    }

    public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        ApplyAuditTimestamps();
        return base.SaveChangesAsync(cancellationToken);
    }

    private void ApplyAuditTimestamps()
    {
        var now = DateTimeOffset.UtcNow;

        foreach (var entry in ChangeTracker.Entries<WindowSystemEntity>())
        {
            if (entry.State == EntityState.Added)
            {
                entry.Entity.CreatedAt = now;
                entry.Entity.UpdatedAt = now;
                continue;
            }

            if (entry.State == EntityState.Modified)
            {
                entry.Entity.UpdatedAt = now;
            }
        }

        foreach (var entry in ChangeTracker.Entries<SiteContentEntryEntity>())
        {
            if (entry.State is EntityState.Added or EntityState.Modified)
            {
                entry.Entity.UpdatedAt = now;
            }
        }

        foreach (var entry in ChangeTracker.Entries<WindowSystemImageEntity>())
        {
            if (entry.State == EntityState.Added)
            {
                entry.Entity.CreatedAt = now;
            }
        }
    }
}
