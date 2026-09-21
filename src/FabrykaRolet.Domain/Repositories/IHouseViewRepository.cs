using FabrykaRolet.Domain.Entities;

namespace FabrykaRolet.Domain.Repositories;

public interface IHouseViewRepository
{
    IReadOnlyList<HouseView> GetBySection(HouseSection section);
}
