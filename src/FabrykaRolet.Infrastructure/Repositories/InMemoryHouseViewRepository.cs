using FabrykaRolet.Domain.Entities;
using FabrykaRolet.Domain.Repositories;

namespace FabrykaRolet.Infrastructure.Repositories;

/// <summary>
/// Widoki i hotspoty - dane startowe. Grafika (exterior-front.png) to placeholder
/// wygenerowany na potrzeby budowy mechanizmu; współrzędne hotspotów (w procentach)
/// są dopasowane do TEGO KONKRETNEGO obrazka i będą wymagały przeliczenia po podmianie
/// na docelową grafikę.
///
/// Sekcja Interior celowo zwraca pustą listę - widoki wnętrz jeszcze nie istnieją.
/// </summary>
public sealed class InMemoryHouseViewRepository : IHouseViewRepository
{
    private static readonly IReadOnlyList<HouseView> ExteriorViews = new List<HouseView>
    {
        new()
        {
            Id = "exterior-front",
            Section = HouseSection.Exterior,
            Title = "Widok od frontu",
            ImagePath = "/images/house/exterior-front.png",
            ImageWidth = 1600,
            ImageHeight = 1000,
            Hotspots = new List<Hotspot>
            {
                new()
                {
                    WindowSystemId = "rolety-zewnetrzne",
                    Polygon = new List<HotspotPoint>
                    {
                        new(28.75, 39.0),
                        new(43.75, 39.0),
                        new(43.75, 65.0),
                        new(28.75, 65.0),
                    },
                },
                new()
                {
                    WindowSystemId = "rolety-antywlamaniowe",
                    Polygon = new List<HotspotPoint>
                    {
                        new(58.75, 37.5),
                        new(73.75, 37.5),
                        new(73.75, 65.0),
                        new(58.75, 65.0),
                    },
                },
                new()
                {
                    WindowSystemId = "markizy",
                    Polygon = new List<HotspotPoint>
                    {
                        new(42.19, 45.0),
                        new(57.81, 45.0),
                        new(57.81, 62.4),
                        new(42.19, 62.4),
                    },
                },
            },
        },
    };

    private static readonly IReadOnlyList<HouseView> InteriorViews = new List<HouseView>();

    public IReadOnlyList<HouseView> GetBySection(HouseSection section) => section switch
    {
        HouseSection.Exterior => ExteriorViews,
        HouseSection.Interior => InteriorViews,
        _ => throw new ArgumentOutOfRangeException(nameof(section)),
    };
}
