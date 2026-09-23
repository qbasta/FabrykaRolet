using FabrykaRolet.Application.Sections;
using FabrykaRolet.Domain.Entities;

namespace FabrykaRolet.Web.ClientData;

public static class HouseViewerDataMapper
{
    public static HouseViewerDataDto ToDto(SectionPageResult data)
    {
        var systemsById = data.Systems.ToDictionary(s => s.Id);

        var views = data.Views
            .Select(view => new HouseViewDto(
                view.Id,
                view.Title,
                view.ImagePath,
                view.ImageWidth,
                view.ImageHeight,
                view.Hotspots
                    .Select(hotspot => ToHotspotDto(hotspot, systemsById))
                    .OfType<HotspotDto>()
                    .ToList()))
            .ToList();

        var systems = data.Systems
            .Select(s => new SystemSummaryDto(s.Id, s.Name, s.ViewerDescription, s.Advantages))
            .ToList();

        return new HouseViewerDataDto(views, systems);
    }

    private static HotspotDto? ToHotspotDto(Hotspot hotspot, IReadOnlyDictionary<string, WindowSystem> systemsById)
    {
        if (!systemsById.TryGetValue(hotspot.WindowSystemId, out var system))
        {
            return null;
        }

        return new HotspotDto(
            hotspot.WindowSystemId,
            system.Name,
            system.ViewerDescription,
            system.Advantages,
            hotspot.Position.X,
            hotspot.Position.Y);
    }
}
