namespace FabrykaRolet.Domain.Entities;

/// <summary>
/// Klikalny punkt na konkretnym widoku domu, powiązany z jednym systemem (WindowSystem).
/// Współrzędne w procentach (0-100) szerokości/wysokości obrazka widoku.
/// </summary>
public sealed class Hotspot
{
    public required string WindowSystemId { get; init; }
    public required HotspotPoint Position { get; init; }
}
