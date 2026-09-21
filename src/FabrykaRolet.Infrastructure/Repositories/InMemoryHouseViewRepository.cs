using FabrykaRolet.Domain.Entities;
using FabrykaRolet.Domain.Repositories;

namespace FabrykaRolet.Infrastructure.Repositories;

/// <summary>
/// Widoki i hotspoty - dane startowe dla konfiguratora. Współrzędne hotspotów
/// (w procentach) są przygotowane pod obecne materiały robocze i można je łatwo
/// skorygować po podmianie renderów domu.
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
            ImageWidth = 1600,
            ImageHeight = 1000,
            Hotspots = new List<Hotspot>
            {
                new()
                {
                    WindowSystemId = "rolety-zewnetrzne",
                    Polygon = new List<HotspotPoint>
                    {
                        new(53.0, 34.0),
                        new(63.0, 34.0),
                        new(63.0, 55.0),
                        new(53.0, 55.0),
                    },
                },
                new()
                {
                    WindowSystemId = "rolety-antywlamaniowe",
                    Polygon = new List<HotspotPoint>
                    {
                        new(39.5, 33.0),
                        new(48.5, 33.0),
                        new(48.5, 53.0),
                        new(39.5, 53.0),
                    },
                },
                new()
                {
                    WindowSystemId = "zaluzje-fasadowe",
                    Polygon = new List<HotspotPoint>
                    {
                        new(65.5, 46.0),
                        new(79.5, 46.0),
                        new(79.5, 77.0),
                        new(65.5, 77.0),
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
            ImageWidth = 1600,
            ImageHeight = 1000,
            Hotspots = new List<Hotspot>
            {
                new()
                {
                    WindowSystemId = "markizy",
                    Polygon = new List<HotspotPoint>
                    {
                        new(44.0, 41.0),
                        new(76.0, 41.0),
                        new(82.0, 49.0),
                        new(48.0, 49.0),
                    },
                },
                new()
                {
                    WindowSystemId = "screeny-fasadowe",
                    Polygon = new List<HotspotPoint>
                    {
                        new(53.0, 51.0),
                        new(66.0, 51.0),
                        new(66.0, 80.0),
                        new(53.0, 80.0),
                    },
                },
                new()
                {
                    WindowSystemId = "moskitiery-zewnetrzne",
                    Polygon = new List<HotspotPoint>
                    {
                        new(69.0, 52.0),
                        new(81.5, 52.0),
                        new(81.5, 79.5),
                        new(69.0, 79.5),
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
            ImageWidth = 1600,
            ImageHeight = 1000,
            Hotspots = new List<Hotspot>
            {
                new()
                {
                    WindowSystemId = "screeny-fasadowe",
                    Polygon = new List<HotspotPoint>
                    {
                        new(30.0, 45.0),
                        new(42.0, 45.0),
                        new(42.0, 73.0),
                        new(30.0, 73.0),
                    },
                },
                new()
                {
                    WindowSystemId = "rolety-zewnetrzne",
                    Polygon = new List<HotspotPoint>
                    {
                        new(47.0, 36.0),
                        new(59.0, 36.0),
                        new(59.0, 58.0),
                        new(47.0, 58.0),
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
            ImageWidth = 1600,
            ImageHeight = 1000,
            Hotspots = new List<Hotspot>
            {
                new()
                {
                    WindowSystemId = "bramy-garazowe",
                    Polygon = new List<HotspotPoint>
                    {
                        new(24.0, 48.0),
                        new(52.0, 48.0),
                        new(52.0, 81.0),
                        new(24.0, 81.0),
                    },
                },
                new()
                {
                    WindowSystemId = "rolety-antywlamaniowe",
                    Polygon = new List<HotspotPoint>
                    {
                        new(57.0, 37.0),
                        new(69.0, 37.0),
                        new(69.0, 58.0),
                        new(57.0, 58.0),
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
