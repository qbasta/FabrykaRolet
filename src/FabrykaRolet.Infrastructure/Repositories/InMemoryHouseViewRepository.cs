using FabrykaRolet.Domain.Entities;
using FabrykaRolet.Domain.Repositories;

namespace FabrykaRolet.Infrastructure.Repositories;

/// <summary>
/// Na razie zwraca puste listy dla obu sekcji - żadna grafika/hotspoty jeszcze nie
/// istnieją (dojdą w kroku, w którym budujemy stronę "Na zewnątrz"). Interfejs i
/// rejestracja DI są już gotowe, więc dołożenie realnych danych nie będzie wymagało
/// zmian poza tym jednym plikiem.
/// </summary>
public sealed class InMemoryHouseViewRepository : IHouseViewRepository
{
    public IReadOnlyList<HouseView> GetBySection(HouseSection section) =>
        new List<HouseView>();
}
