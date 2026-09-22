using FabrykaRolet.Domain.Entities;
using FabrykaRolet.Domain.Repositories;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace FabrykaRolet.Web.Pages;

public class SystemyModel(IWindowSystemRepository windowSystemRepository) : PageModel
{
    private static readonly IReadOnlyDictionary<string, IReadOnlyList<string>> ImagesBySystemId =
        new Dictionary<string, IReadOnlyList<string>>
        {
            ["rolety-zewnetrzne"] = new[]
            {
                "rolety-zewnetrzne-1-drewno.png",
                "rolety-zewnetrzne-2-biala.png",
                "rolety-zewnetrzne-3-antracyt.png",
            },
            ["rolety-antywlamaniowe"] = new[]
            {
                "rolety-antywlamaniowe-2-zamknieta.png",
                "rolety-antywlamaniowe-1-konstrukcja.png",
            },
            ["zaluzje-fasadowe"] = new[]
            {
                "zaluzje-fasadowe-1.png",
                "zaluzje-fasadowe-2.png",
                "zaluzje-fasadowe-3.png",
            },
            ["markizy"] = new[]
            {
                "markizy-1-pasy-krem-bordo.png",
                "markizy-2-terakota.png",
                "markizy-3-oliwkowa-paski.png",
            },
            ["screeny-fasadowe"] = new[]
            {
                "screeny-fasadowe-1-szary-ciemny.png",
                "screeny-fasadowe-2-perlowy.png",
                "screeny-fasadowe-3-taupe.png",
            },
        };

    public IReadOnlyList<WindowSystem> Systems { get; private set; } = Array.Empty<WindowSystem>();
    public IReadOnlyDictionary<string, IReadOnlyList<string>> SystemImages => ImagesBySystemId;
    public int ExteriorCount { get; private set; }
    public int InteriorCount { get; private set; }

    public void OnGet()
    {
        Systems = windowSystemRepository.GetAll();
        ExteriorCount = Systems.Count(s => s.Section == HouseSection.Exterior);
        InteriorCount = Systems.Count(s => s.Section == HouseSection.Interior);
    }
}
