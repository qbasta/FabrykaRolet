using FabrykaRolet.Domain.Entities;

namespace FabrykaRolet.Application.Sections;

/// <summary>Wszystko, czego potrzebuje strona sekcji (Na zewnątrz / Wewnątrz) do renderu.</summary>
public sealed record SectionPageResult(
    IReadOnlyList<HouseView> Views,
    IReadOnlyList<WindowSystem> Systems);
