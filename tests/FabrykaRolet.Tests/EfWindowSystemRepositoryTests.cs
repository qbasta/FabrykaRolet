using Xunit;
using FabrykaRolet.Domain.Entities;
using FabrykaRolet.Infrastructure.Data;
using FabrykaRolet.Infrastructure.Data.Entities;
using FabrykaRolet.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;

namespace FabrykaRolet.Tests;

public sealed class EfWindowSystemRepositoryTests
{
    [Fact]
    public void GetAll_returns_only_visible_and_not_archived_systems()
    {
        using var dbContext = CreateDbContext();
        dbContext.WindowSystems.AddRange(
            CreateSystem("visible-exterior", HouseSection.Exterior, isVisible: true, isArchived: false, sortOrder: 1),
            CreateSystem("hidden", HouseSection.Exterior, isVisible: false, isArchived: false, sortOrder: 2),
            CreateSystem("archived", HouseSection.Interior, isVisible: true, isArchived: true, sortOrder: 3),
            CreateSystem("visible-interior", HouseSection.Interior, isVisible: true, isArchived: false, sortOrder: 4));
        dbContext.SaveChanges();

        var repository = new EfWindowSystemRepository(dbContext);

        var all = repository.GetAll();
        var exterior = repository.GetBySection(HouseSection.Exterior);
        var byId = repository.GetById("visible-interior");

        Assert.Collection(
            all,
            system => Assert.Equal("visible-exterior", system.Id),
            system => Assert.Equal("visible-interior", system.Id));
        Assert.Single(exterior);
        Assert.Equal("visible-exterior", exterior[0].Id);
        Assert.NotNull(byId);
        Assert.Equal("visible-interior", byId!.Id);
        Assert.Null(repository.GetById("hidden"));
    }

    private static WindowSystemEntity CreateSystem(string id, HouseSection section, bool isVisible, bool isArchived, int sortOrder)
    {
        return new WindowSystemEntity
        {
            Id = id,
            Name = id,
            Section = section,
            ViewerDescription = $"viewer-{id}",
            ShortDescription = $"short-{id}",
            Mounting = "mounting",
            Control = "control",
            MaxDimensions = "max",
            IsVisible = isVisible,
            IsArchived = isArchived,
            SortOrder = sortOrder,
            Advantages = [new WindowSystemAdvantageEntity { Id = Guid.NewGuid(), WindowSystemId = id, Text = "advantage", SortOrder = 0 }],
            Materials = [new WindowSystemMaterialEntity { Id = Guid.NewGuid(), WindowSystemId = id, Name = "material", SortOrder = 0 }],
        };
    }

    private static AppDbContext CreateDbContext()
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString("N"))
            .Options;
        return new AppDbContext(options);
    }
}
