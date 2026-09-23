using FabrykaRolet.Infrastructure.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FabrykaRolet.Infrastructure.Data.Configurations;

public sealed class SiteContentEntryEntityConfiguration : IEntityTypeConfiguration<SiteContentEntryEntity>
{
    public void Configure(EntityTypeBuilder<SiteContentEntryEntity> builder)
    {
        builder.ToTable("site_content_entries");
        builder.HasKey(x => x.Key);
        builder.Property(x => x.Key).HasMaxLength(150);
        builder.Property(x => x.Value).HasMaxLength(8000);
    }
}
