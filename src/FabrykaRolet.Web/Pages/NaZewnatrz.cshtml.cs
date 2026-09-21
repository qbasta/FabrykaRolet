using System.Text.Json;
using FabrykaRolet.Application.Sections;
using FabrykaRolet.Domain.Entities;
using FabrykaRolet.Web.ClientData;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace FabrykaRolet.Web.Pages;

public class NaZewnatrzModel(SectionPageService sectionPageService) : PageModel
{
    private static readonly JsonSerializerOptions JsonOptions = new(JsonSerializerDefaults.Web);

    public IReadOnlyList<WindowSystem> Systems { get; private set; } = Array.Empty<WindowSystem>();
    public bool HasViews { get; private set; }
    public string ViewerDataJson { get; private set; } = "null";

    public void OnGet()
    {
        var data = sectionPageService.GetSectionPage(HouseSection.Exterior);

        Systems = data.Systems;
        HasViews = data.Views.Count > 0;
        ViewerDataJson = JsonSerializer.Serialize(HouseViewerDataMapper.ToDto(data), JsonOptions);
    }
}
