using FabrykaRolet.Infrastructure.Services;
using FabrykaRolet.Web.Services;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace FabrykaRolet.Web.Pages;

public class IndexModel(SiteContentService siteContentService) : PageModel
{
    public string HeroTitle { get; private set; } = string.Empty;
    public string HeroLead { get; private set; } = string.Empty;
    public string ExteriorCardTitle { get; private set; } = string.Empty;
    public string ExteriorCardBody { get; private set; } = string.Empty;
    public string ExteriorCardCta { get; private set; } = string.Empty;
    public string InteriorCardTitle { get; private set; } = string.Empty;
    public string InteriorCardBody { get; private set; } = string.Empty;
    public string InteriorCardCta { get; private set; } = string.Empty;

    public async Task OnGetAsync()
    {
        var content = await siteContentService.GetAllAsync();
        HeroTitle = content[SiteContentDefaults.HomeTitle];
        HeroLead = content[SiteContentDefaults.HomeLead];
        ExteriorCardTitle = content[SiteContentDefaults.HomeExteriorCardTitle];
        ExteriorCardBody = content[SiteContentDefaults.HomeExteriorCardBody];
        ExteriorCardCta = content[SiteContentDefaults.HomeExteriorCardCta];
        InteriorCardTitle = content[SiteContentDefaults.HomeInteriorCardTitle];
        InteriorCardBody = content[SiteContentDefaults.HomeInteriorCardBody];
        InteriorCardCta = content[SiteContentDefaults.HomeInteriorCardCta];
    }
}
