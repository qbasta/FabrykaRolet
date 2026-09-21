namespace FabrykaRolet.Domain.Entities;

/// <summary>
/// Klikalny obszar na konkretnym widoku domu, powiązany z jednym systemem (WindowSystem).
/// </summary>
public sealed class Hotspot
{
    public required string WindowSystemId { get; init; }
    public required IReadOnlyList<HotspotPoint> Polygon { get; init; }
}
