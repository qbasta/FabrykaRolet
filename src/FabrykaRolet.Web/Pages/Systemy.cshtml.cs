using FabrykaRolet.Domain.Entities;
using FabrykaRolet.Domain.Repositories;
using FabrykaRolet.Infrastructure.Services;
using FabrykaRolet.Web.Services;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace FabrykaRolet.Web.Pages;

public class SystemyModel(
    IWindowSystemRepository windowSystemRepository,
    SystemImageReadService systemImageReadService,
    SiteContentService siteContentService) : PageModel
{
    public IReadOnlyList<WindowSystem> Systems { get; private set; } = Array.Empty<WindowSystem>();
    public IReadOnlyDictionary<string, IReadOnlyList<string>> SystemImages { get; private set; } = new Dictionary<string, IReadOnlyList<string>>();
    public int ExteriorCount { get; private set; }
    public int InteriorCount { get; private set; }
    public string PageHeading { get; private set; } = string.Empty;
    public string PageLead { get; private set; } = string.Empty;

    public async Task OnGetAsync()
    {
        Systems = windowSystemRepository.GetAll();
        ExteriorCount = Systems.Count(s => s.Section == HouseSection.Exterior);
        InteriorCount = Systems.Count(s => s.Section == HouseSection.Interior);
        SystemImages = await systemImageReadService.GetPublicImagesBySystemIdAsync(Systems.Select(x => x.Id));
        var content = await siteContentService.GetAllAsync();
        PageHeading = content[SiteContentDefaults.SystemsTitle];
        PageLead = content[SiteContentDefaults.SystemsLead];
    }
}
