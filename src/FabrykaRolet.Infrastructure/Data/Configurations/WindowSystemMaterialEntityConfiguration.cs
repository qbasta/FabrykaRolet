using FabrykaRolet.Infrastructure.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FabrykaRolet.Infrastructure.Data.Configurations;

public sealed class WindowSystemMaterialEntityConfiguration : IEntityTypeConfiguration<WindowSystemMaterialEntity>
{
    public void Configure(EntityTypeBuilder<WindowSystemMaterialEntity> builder)
    {
        builder.ToTable("window_system_materials");
        builder.HasKey(x => x.Id);
        builder.Property(x => x.Name).HasMaxLength(400);
        builder.HasIndex(x => new { x.WindowSystemId, x.SortOrder });
    }
}
