using Xunit;
using FabrykaRolet.Infrastructure.Data;
using FabrykaRolet.Infrastructure.Data.Entities;
using FabrykaRolet.Infrastructure.Services;
using FabrykaRolet.Web.Services;
using Microsoft.EntityFrameworkCore;

namespace FabrykaRolet.Tests;

public sealed class SiteContentServiceTests
{
    [Fact]
    public async Task GetAllAsync_returns_defaults_and_database_overrides()
    {
        await using var dbContext = CreateDbContext();
        dbContext.SiteContentEntries.Add(new SiteContentEntryEntity
        {
            Key = SiteContentDefaults.HomeTitle,
            Value = "Nowy tytuł"
        });
        await dbContext.SaveChangesAsync();

        var service = new SiteContentService(dbContext);
        var values = await service.GetAllAsync();

        Assert.Equal("Nowy tytuł", values[SiteContentDefaults.HomeTitle]);
        Assert.Equal(SiteContentDefaults.Values[SiteContentDefaults.ContactTitle], values[SiteContentDefaults.ContactTitle]);
    }

    private static AppDbContext CreateDbContext()
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString("N"))
            .Options;
        return new AppDbContext(options);
    }
}
