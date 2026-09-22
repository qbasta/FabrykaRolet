using FabrykaRolet.Infrastructure.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FabrykaRolet.Infrastructure.Data.Configurations;

public sealed class WindowSystemEntityConfiguration : IEntityTypeConfiguration<WindowSystemEntity>
{
    public void Configure(EntityTypeBuilder<WindowSystemEntity> builder)
    {
        builder.ToTable("window_systems");
        builder.HasKey(x => x.Id);
        builder.Property(x => x.Id).HasMaxLength(120);
        builder.Property(x => x.Name).HasMaxLength(200);
        builder.Property(x => x.Section).HasConversion<string>().HasMaxLength(32);
        builder.Property(x => x.ViewerDescription).HasMaxLength(4000);
        builder.Property(x => x.ShortDescription).HasMaxLength(4000);
        builder.Property(x => x.Mounting).HasMaxLength(2000);
        builder.Property(x => x.Control).HasMaxLength(2000);
        builder.Property(x => x.MaxDimensions).HasMaxLength(1000);
        builder.Property(x => x.IsVisible).HasDefaultValue(false);
        builder.Property(x => x.IsArchived).HasDefaultValue(false);
        builder.HasMany(x => x.Advantages).WithOne(x => x.WindowSystem).HasForeignKey(x => x.WindowSystemId).OnDelete(DeleteBehavior.Cascade);
        builder.HasMany(x => x.Materials).WithOne(x => x.WindowSystem).HasForeignKey(x => x.WindowSystemId).OnDelete(DeleteBehavior.Cascade);
        builder.HasMany(x => x.Images).WithOne(x => x.WindowSystem).HasForeignKey(x => x.WindowSystemId).OnDelete(DeleteBehavior.Cascade);
        builder.HasIndex(x => new { x.Section, x.SortOrder });
        builder.HasIndex(x => new { x.IsVisible, x.IsArchived });
    }
}
