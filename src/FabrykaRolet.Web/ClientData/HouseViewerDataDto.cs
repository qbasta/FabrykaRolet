namespace FabrykaRolet.Web.ClientData;

// DTO-ki wyłącznie pod serializację JSON do konsumpcji przez widget TypeScript
// (house-viewer.ts). Celowo osobne od encji domenowych.

public sealed record HouseViewerDataDto(
    IReadOnlyList<HouseViewDto> Views,
    IReadOnlyList<SystemSummaryDto> Systems);

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
    double X,
    double Y);

/// <summary>Pełna lista systemów sekcji - także tych bez hotspotu na żadnym widoku (jeszcze).</summary>
public sealed record SystemSummaryDto(
    string SystemId,
    string Name,
    string Description,
    IReadOnlyList<string> Advantages);
