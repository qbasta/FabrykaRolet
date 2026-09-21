using FabrykaRolet.Domain.Entities;

namespace FabrykaRolet.Domain.Repositories;

/// <summary>
/// Abstrakcja dostępu do danych o systemach. Implementacja na razie nie istnieje
/// (dojdzie w Kroku 3, jako in-memory) - na tym etapie sam interfejs tylko kompiluje się
/// razem z resztą solution.
/// </summary>
public interface IWindowSystemRepository
{
    IReadOnlyList<WindowSystem> GetAll();
    WindowSystem? GetById(string id);
    IReadOnlyList<WindowSystem> GetBySection(HouseSection section);
}
