using FabrykaRolet.Domain.Entities;

namespace FabrykaRolet.Infrastructure.Data.Entities;

public sealed class WindowSystemEntity
{
    public string Id { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public HouseSection Section { get; set; }
    public string ViewerDescription { get; set; } = string.Empty;
    public string ShortDescription { get; set; } = string.Empty;
    public string Mounting { get; set; } = string.Empty;
    public string Control { get; set; } = string.Empty;
    public string MaxDimensions { get; set; } = string.Empty;
    public bool IsVisible { get; set; } = false;
    public bool IsArchived { get; set; } = false;
    public int SortOrder { get; set; }
    public DateTimeOffset CreatedAt { get; set; }
    public DateTimeOffset UpdatedAt { get; set; }
    public List<WindowSystemMaterialEntity> Materials { get; set; } = [];
    public List<WindowSystemAdvantageEntity> Advantages { get; set; } = [];
    public List<WindowSystemImageEntity> Images { get; set; } = [];
}
