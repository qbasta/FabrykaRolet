using FabrykaRolet.Domain.Entities;
using FabrykaRolet.Domain.Repositories;

namespace FabrykaRolet.Infrastructure.Repositories;

/// <summary>
/// Widoki i hotspoty. Współrzędne (w procentach) zweryfikowane wizualnie przez nałożenie
/// na rzeczywiste rendery - patrz konwersacja z 2026-09-21. Widok "tyl" celowo ma tylko
/// jeden hotspot - to jedyny system faktycznie widoczny na tym renderze.
///
/// Sekcja Interior celowo zwraca pustą listę - widoki wnętrz jeszcze nie istnieją.
/// </summary>
public sealed class InMemoryHouseViewRepository : IHouseViewRepository
{
    private static readonly IReadOnlyList<HouseView> ExteriorViews = new List<HouseView>
    {
        new()
        {
            Id = "front",
            Section = HouseSection.Exterior,
            Title = "Front",
            ImagePath = "/images/house/exterior-front.png",
            ImageWidth = 1376,
            ImageHeight = 768,
            Hotspots = new List<Hotspot>
            {
                new()
                {
                    WindowSystemId = "rolety-antywlamaniowe",
                    Polygon = new List<HotspotPoint>
                    {
                        new(57, 44), new(65, 44), new(65, 67), new(57, 67),
                    },
                },
                new()
                {
                    WindowSystemId = "bramy-garazowe",
                    Polygon = new List<HotspotPoint>
                    {
                        new(10, 47), new(32, 47), new(32, 68), new(10, 68),
                    },
                },
            },
        },
        new()
        {
            Id = "taras",
            Section = HouseSection.Exterior,
            Title = "Taras / prawy przód",
            ImagePath = "/images/house/exterior-taras.png",
            ImageWidth = 1408,
            ImageHeight = 768,
            Hotspots = new List<Hotspot>
            {
                new()
                {
                    WindowSystemId = "markizy",
                    Polygon = new List<HotspotPoint>
                    {
                        new(30, 27), new(77, 27), new(77, 38), new(30, 38),
                    },
                },
                new()
                {
                    WindowSystemId = "zaluzje-fasadowe",
                    Polygon = new List<HotspotPoint>
                    {
                        new(30, 40), new(78, 40), new(78, 63), new(30, 63),
                    },
                },
            },
        },
        new()
        {
            Id = "tyl",
            Section = HouseSection.Exterior,
            Title = "Tył",
            ImagePath = "/images/house/exterior-tyl.png",
            ImageWidth = 1408,
            ImageHeight = 768,
            Hotspots = new List<Hotspot>
            {
                new()
                {
                    WindowSystemId = "rolety-zewnetrzne",
                    Polygon = new List<HotspotPoint>
                    {
                        new(59, 46), new(65, 46), new(65, 64), new(59, 64),
                    },
                },
            },
        },
        new()
        {
            Id = "garaz",
            Section = HouseSection.Exterior,
            Title = "Garaż / lewy przód",
            ImagePath = "/images/house/exterior-garaz.png",
            ImageWidth = 1408,
            ImageHeight = 768,
            Hotspots = new List<Hotspot>
            {
                new()
                {
                    WindowSystemId = "bramy-garazowe",
                    Polygon = new List<HotspotPoint>
                    {
                        new(30, 35), new(56, 35), new(56, 70), new(30, 70),
                    },
                },
                new()
                {
                    WindowSystemId = "rolety-zewnetrzne",
                    Polygon = new List<HotspotPoint>
                    {
                        new(63, 43), new(71, 43), new(71, 69), new(63, 69),
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
