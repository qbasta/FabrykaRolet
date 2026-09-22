using FabrykaRolet.Domain.Entities;
using FabrykaRolet.Domain.Repositories;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace FabrykaRolet.Web.Pages;

public class SystemyModel(IWindowSystemRepository windowSystemRepository) : PageModel
{
    public IReadOnlyList<WindowSystem> Systems { get; private set; } = Array.Empty<WindowSystem>();
    public int ExteriorCount { get; private set; }
    public int InteriorCount { get; private set; }

    public void OnGet()
    {
        Systems = windowSystemRepository.GetAll();
        ExteriorCount = Systems.Count(s => s.Section == HouseSection.Exterior);
        InteriorCount = Systems.Count(s => s.Section == HouseSection.Interior);
    }
}
