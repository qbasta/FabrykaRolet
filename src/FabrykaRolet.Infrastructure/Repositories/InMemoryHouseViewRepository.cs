using FabrykaRolet.Domain.Entities;
using FabrykaRolet.Domain.Repositories;

namespace FabrykaRolet.Infrastructure.Repositories;

/// <summary>
/// Widoki i hotspoty. Punkty (w procentach) zweryfikowane wizualnie przez nałożenie
/// na rzeczywiste rendery - patrz historia konwersacji z 2026-09-21/22. Współrzędne
/// screeny-fasadowe (taras) i moskitiery-zewnetrzne (tyl) poprawione po zgłoszeniu
/// błędnego umiejscowienia - poprzednie wartości lądowały obok właściwych produktów,
/// nie na nich.
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
                new() { WindowSystemId = "rolety-antywlamaniowe", Position = new HotspotPoint(61, 55.5) },
                new() { WindowSystemId = "bramy-garazowe", Position = new HotspotPoint(21, 57.5) },
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
                new() { WindowSystemId = "markizy", Position = new HotspotPoint(53.5, 32.5) },
                new() { WindowSystemId = "zaluzje-fasadowe", Position = new HotspotPoint(54, 51.5) },
                // Poprawione: było (82.5, 52) - lądowało na gołej ścianie za panelem.
                new() { WindowSystemId = "screeny-fasadowe", Position = new HotspotPoint(71, 54) },
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
                new() { WindowSystemId = "rolety-zewnetrzne", Position = new HotspotPoint(62, 55) },
                // Poprawione: było (70, 57.5) - lądowało tuż obok ramy, nie na siatce.
                new() { WindowSystemId = "moskitiery-zewnetrzne", Position = new HotspotPoint(74.5, 54) },
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
                new() { WindowSystemId = "bramy-garazowe", Position = new HotspotPoint(43, 52.5) },
                // Poprawione: było (67, 56) - lądowało na drzwiach wejściowych, nie na
                // sąsiednim oknie z roletą.
                new() { WindowSystemId = "rolety-zewnetrzne", Position = new HotspotPoint(63, 50) },
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
