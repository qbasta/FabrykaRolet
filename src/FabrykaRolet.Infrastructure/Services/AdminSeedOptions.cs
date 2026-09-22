namespace FabrykaRolet.Infrastructure.Services;

public sealed class AdminSeedOptions
{
    public const string SectionName = "AdminSeed";
    public string UserName { get; set; } = "admin";
    public string Email { get; set; } = "admin@fabrykarolet.local";
    public string? Password { get; set; }
}
