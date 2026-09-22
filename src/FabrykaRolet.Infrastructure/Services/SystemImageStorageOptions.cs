namespace FabrykaRolet.Infrastructure.Services;

public sealed class SystemImageStorageOptions
{
    public const string SectionName = "SystemImageStorage";
    public string RelativeDirectory { get; set; } = "uploads/system-images";
}
