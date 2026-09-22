using System.Text.Json;
using FabrykaRolet.Application.Sections;
using FabrykaRolet.Domain.Entities;
using FabrykaRolet.Infrastructure.Services;
using FabrykaRolet.Web.ClientData;
using FabrykaRolet.Web.Services;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace FabrykaRolet.Web.Pages;

public class WewnatrzModel(SectionPageService sectionPageService, SiteContentService siteContentService) : PageModel
{
    private static readonly JsonSerializerOptions JsonOptions = new(JsonSerializerDefaults.Web);

    public IReadOnlyList<WindowSystem> Systems { get; private set; } = Array.Empty<WindowSystem>();
    public bool HasViews { get; private set; }
    public string ViewerDataJson { get; private set; } = "null";
    public string PageHeading { get; private set; } = string.Empty;
    public string PageLead { get; private set; } = string.Empty;

    public async Task OnGetAsync()
    {
        var data = sectionPageService.GetSectionPage(HouseSection.Interior);
        var content = await siteContentService.GetAllAsync();

        Systems = data.Systems;
        HasViews = data.Views.Count > 0;
        ViewerDataJson = JsonSerializer.Serialize(HouseViewerDataMapper.ToDto(data), JsonOptions);
        PageHeading = content[SiteContentDefaults.InteriorTitle];
        PageLead = content[SiteContentDefaults.InteriorLead];
    }
}
