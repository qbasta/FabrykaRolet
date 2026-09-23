namespace FabrykaRolet.Infrastructure.Data.Entities;

public sealed class WindowSystemImageEntity
{
    public Guid Id { get; set; }
    public string WindowSystemId { get; set; } = string.Empty;
    public string FileName { get; set; } = string.Empty;
    public string AltText { get; set; } = string.Empty;
    public int SortOrder { get; set; }
    public bool IsPrimary { get; set; }
    public DateTimeOffset CreatedAt { get; set; }
    public WindowSystemEntity? WindowSystem { get; set; }
}
