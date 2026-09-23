using FabrykaRolet.Domain.Entities;
using FabrykaRolet.Domain.Repositories;
using FabrykaRolet.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace FabrykaRolet.Infrastructure.Repositories;

public sealed class EfWindowSystemRepository(AppDbContext dbContext) : IWindowSystemRepository
{
    public IReadOnlyList<WindowSystem> GetAll() => QueryVisibleSystems().ToList();

    public WindowSystem? GetById(string id) => QueryVisibleSystems().FirstOrDefault(x => x.Id == id);

    public IReadOnlyList<WindowSystem> GetBySection(HouseSection section) =>
        QueryVisibleSystems().Where(x => x.Section == section).ToList();

    private IEnumerable<WindowSystem> QueryVisibleSystems()
    {
        return dbContext.WindowSystems
            .AsNoTracking()
            .Where(x => x.IsVisible && !x.IsArchived)
            .OrderBy(x => x.SortOrder)
            .ThenBy(x => x.Name)
            .Select(x => new WindowSystem
            {
                Id = x.Id,
                Name = x.Name,
                Section = x.Section,
                ViewerDescription = x.ViewerDescription,
                ShortDescription = x.ShortDescription,
                Advantages = x.Advantages.OrderBy(a => a.SortOrder).Select(a => a.Text).ToList(),
                Materials = x.Materials.OrderBy(m => m.SortOrder).Select(m => m.Name).ToList(),
                Mounting = x.Mounting,
                Control = x.Control,
                MaxDimensions = x.MaxDimensions,
            })
            .AsEnumerable();
    }
}
