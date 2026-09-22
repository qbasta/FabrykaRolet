namespace FabrykaRolet.Domain.Entities;

/// <summary>
/// Pojedynczy system (np. "Rolety zewnętrzne", "Plisy") prezentowany w infografice.
/// Id jest stabilnym slugiem używanym do wiązania z hotspotami na widokach (HouseView).
/// </summary>
public sealed class WindowSystem
{
    public required string Id { get; init; }
    public required string Name { get; init; }
    public required HouseSection Section { get; init; }
    public required string ShortDescription { get; init; }
    public required IReadOnlyList<string> Advantages { get; init; }
    public required IReadOnlyList<string> Materials { get; init; }
    public required string Mounting { get; init; }
    public required string Control { get; init; }
    public required string MaxDimensions { get; init; }
}
