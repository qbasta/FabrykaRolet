using FabrykaRolet.Infrastructure.Services;
using FabrykaRolet.Web.Services;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace FabrykaRolet.Web.Pages;

public class KontaktModel(SiteContentService siteContentService) : PageModel
{
    public string TitleText { get; private set; } = string.Empty;
    public string Lead { get; private set; } = string.Empty;
    public string Phone { get; private set; } = string.Empty;
    public string Email { get; private set; } = string.Empty;
    public string Address { get; private set; } = string.Empty;

    public async Task OnGetAsync()
    {
        var content = await siteContentService.GetAllAsync();
        TitleText = content[SiteContentDefaults.ContactTitle];
        Lead = content[SiteContentDefaults.ContactLead];
        Phone = content[SiteContentDefaults.ContactPhone];
        Email = content[SiteContentDefaults.ContactEmail];
        Address = content[SiteContentDefaults.ContactAddress];
    }
}
