namespace FabrykaRolet.Domain.Entities;

/// <summary>
/// Jedno "ujęcie" domu wraz z obrazkiem tła i listą hotspotów nałożonych na ten obrazek.
/// </summary>
public sealed class HouseView
{
    public required string Id { get; init; }
    public required HouseSection Section { get; init; }
    public required string Title { get; init; }
    public required string ImagePath { get; init; }
    public required int ImageWidth { get; init; }
    public required int ImageHeight { get; init; }
    public required IReadOnlyList<Hotspot> Hotspots { get; init; }
}
