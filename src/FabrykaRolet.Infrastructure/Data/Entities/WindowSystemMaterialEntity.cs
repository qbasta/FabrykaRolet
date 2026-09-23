namespace FabrykaRolet.Infrastructure.Data.Entities;

public sealed class WindowSystemMaterialEntity
{
    public Guid Id { get; set; }
    public string WindowSystemId { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public int SortOrder { get; set; }
    public WindowSystemEntity? WindowSystem { get; set; }
}
