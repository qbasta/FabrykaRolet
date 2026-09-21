namespace FabrykaRolet.Domain.Entities;

/// <summary>
/// Punkt wielokąta hotspotu wyrażony w procentach (0-100) szerokości/wysokości obrazka widoku.
/// </summary>
public readonly record struct HotspotPoint(double X, double Y);
