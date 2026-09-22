namespace FabrykaRolet.Infrastructure.Data.Entities;

public sealed class WindowSystemAdvantageEntity
{
    public Guid Id { get; set; }
    public string WindowSystemId { get; set; } = string.Empty;
    public string Text { get; set; } = string.Empty;
    public int SortOrder { get; set; }
    public WindowSystemEntity? WindowSystem { get; set; }
}
