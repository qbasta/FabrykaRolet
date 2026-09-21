using FabrykaRolet.Domain.Entities;
using FabrykaRolet.Domain.Repositories;
using FabrykaRolet.Infrastructure.Data;

namespace FabrykaRolet.Infrastructure.Repositories;

/// <summary>
/// Implementacja startowa - dane trzymane w pamięci (hardcoded). Docelowe przejście na
/// Postgres/EF Core = nowa implementacja tego samego interfejsu + jedna zmiana rejestracji
/// w Program.cs, bez dotykania Web.
/// </summary>
public sealed class InMemoryWindowSystemRepository : IWindowSystemRepository
{
    public IReadOnlyList<WindowSystem> GetAll() => WindowSystemSeedData.All;

    public WindowSystem? GetById(string id) =>
        WindowSystemSeedData.All.FirstOrDefault(s => s.Id == id);

    public IReadOnlyList<WindowSystem> GetBySection(HouseSection section) =>
        WindowSystemSeedData.All.Where(s => s.Section == section).ToList();
}
