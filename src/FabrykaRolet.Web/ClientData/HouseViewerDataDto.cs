namespace FabrykaRolet.Web.ClientData;

// DTO-ki wyłącznie pod serializację JSON do konsumpcji przez widget TypeScript
// (house-viewer.ts). Celowo osobne od encji domenowych.

public sealed record HouseViewerDataDto(IReadOnlyList<HouseViewDto> Views);

public sealed record HouseViewDto(
    string Id,
    string Title,
    string Image,
    int ImageWidth,
    int ImageHeight,
    IReadOnlyList<HotspotDto> Hotspots);

public sealed record HotspotDto(
    string SystemId,
    string Name,
    string Description,
    IReadOnlyList<string> Advantages,
    IReadOnlyList<double[]> Polygon);
