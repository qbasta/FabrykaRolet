using Xunit;
using FabrykaRolet.Infrastructure.Data;
using FabrykaRolet.Infrastructure.Data.Entities;
using FabrykaRolet.Infrastructure.Services;
using FabrykaRolet.Web.Services;
using FabrykaRolet.Web.Models.Admin;
using ContentIndexModel = FabrykaRolet.Web.Pages.Admin.Tresci.IndexModel;
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


    [Fact]
    public async Task GetValueAsync_returns_override_and_empty_for_unknown_key()
    {
        await using var dbContext = CreateDbContext();
        dbContext.SiteContentEntries.Add(new SiteContentEntryEntity
        {
            Key = SiteContentDefaults.ContactEmail,
            Value = "biuro@fabrykarolet.pl"
        });
        await dbContext.SaveChangesAsync();

        var service = new SiteContentService(dbContext);

        var overrideValue = await service.GetValueAsync(SiteContentDefaults.ContactEmail);
        var missingValue = await service.GetValueAsync("unknown.key");

        Assert.Equal("biuro@fabrykarolet.pl", overrideValue);
        Assert.Equal(string.Empty, missingValue);
    }


    [Fact]
    public async Task Admin_content_page_post_creates_and_updates_entries()
    {
        await using var dbContext = CreateDbContext();
        dbContext.SiteContentEntries.Add(new SiteContentEntryEntity
        {
            Key = SiteContentDefaults.ContactTitle,
            Value = " Stary kontakt "
        });
        await dbContext.SaveChangesAsync();

        var pageModel = new ContentIndexModel(dbContext)
        {
            Input = new EditableSiteContentModel
            {
                HomeTitle = "  Nowy tytuł  ",
                HomeLead = "Lead",
                HomeExteriorCardTitle = "Na zewnątrz",
                HomeExteriorCardBody = "Opis A",
                HomeExteriorCardCta = "CTA A",
                HomeInteriorCardTitle = "Wewnątrz",
                HomeInteriorCardBody = "Opis B",
                HomeInteriorCardCta = "CTA B",
                ContactTitle = "  Kontakt premium  ",
                ContactLead = "Lead kontakt",
                ContactPhone = "123",
                ContactEmail = "mail@example.com",
                ContactAddress = "Adres",
                SystemsTitle = "Systemy",
                SystemsLead = "Lead systemów",
                ExteriorTitle = "Zewnętrzne",
                ExteriorLead = "Lead zewnętrzny",
                InteriorTitle = "Wewnętrzne",
                InteriorLead = "Lead wewnętrzny",
            }
        };

        var result = await pageModel.OnPostAsync();

        Assert.NotNull(result);
        Assert.Equal("Nowy tytuł", await dbContext.SiteContentEntries.Where(x => x.Key == SiteContentDefaults.HomeTitle).Select(x => x.Value).SingleAsync());
        Assert.Equal("Kontakt premium", await dbContext.SiteContentEntries.Where(x => x.Key == SiteContentDefaults.ContactTitle).Select(x => x.Value).SingleAsync());
    }

    private static AppDbContext CreateDbContext()
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString("N"))
            .Options;
        return new AppDbContext(options);
    }
}
