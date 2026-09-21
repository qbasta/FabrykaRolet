using FabrykaRolet.Application.Sections;
using FabrykaRolet.Domain.Entities;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace FabrykaRolet.Web.Pages;

public class WewnatrzModel(SectionPageService sectionPageService) : PageModel
{
    public IReadOnlyList<WindowSystem> Systems { get; private set; } = Array.Empty<WindowSystem>();
    public bool HasViews { get; private set; }

    public void OnGet()
    {
        var data = sectionPageService.GetSectionPage(HouseSection.Interior);
        Systems = data.Systems;
        HasViews = data.Views.Count > 0;
    }
}
