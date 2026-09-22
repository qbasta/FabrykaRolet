using FabrykaRolet.Infrastructure.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FabrykaRolet.Infrastructure.Data.Configurations;

public sealed class WindowSystemImageEntityConfiguration : IEntityTypeConfiguration<WindowSystemImageEntity>
{
    public void Configure(EntityTypeBuilder<WindowSystemImageEntity> builder)
    {
        builder.ToTable("window_system_images");
        builder.HasKey(x => x.Id);
        builder.Property(x => x.FileName).HasMaxLength(260);
        builder.Property(x => x.AltText).HasMaxLength(500);
        builder.HasIndex(x => new { x.WindowSystemId, x.SortOrder });
        builder.HasIndex(x => new { x.WindowSystemId, x.IsPrimary });
    }
}
