using FabrykaRolet.Infrastructure.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FabrykaRolet.Infrastructure.Data.Configurations;

public sealed class WindowSystemAdvantageEntityConfiguration : IEntityTypeConfiguration<WindowSystemAdvantageEntity>
{
    public void Configure(EntityTypeBuilder<WindowSystemAdvantageEntity> builder)
    {
        builder.ToTable("window_system_advantages");
        builder.HasKey(x => x.Id);
        builder.Property(x => x.Text).HasMaxLength(1000);
        builder.HasIndex(x => new { x.WindowSystemId, x.SortOrder });
    }
}
