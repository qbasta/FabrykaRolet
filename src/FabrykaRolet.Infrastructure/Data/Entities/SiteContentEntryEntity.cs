namespace FabrykaRolet.Infrastructure.Data.Entities;

public sealed class SiteContentEntryEntity
{
    public string Key { get; set; } = string.Empty;
    public string Value { get; set; } = string.Empty;
    public DateTimeOffset UpdatedAt { get; set; }
}
