using FabrykaRolet.Infrastructure.Data;
using FabrykaRolet.Infrastructure.Identity;
using FabrykaRolet.Infrastructure.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging.Abstractions;
using Microsoft.Extensions.Options;

namespace FabrykaRolet.Tests;

public sealed class ApplicationDbInitializerTests
{
    [Fact]
    public async Task InitializeAsync_is_idempotent_for_seeded_data()
    {
        await using var dbContext = CreateDbContext();
        using var userManager = CreateUserManager(dbContext);
        var initializer = new ApplicationDbInitializer(
            dbContext,
            userManager,
            Options.Create(new AdminSeedOptions
            {
                UserName = "admin",
                Email = "admin@fabrykarolet.local",
                Password = "Stabilizacja123!"
            }),
            NullLogger<ApplicationDbInitializer>.Instance);

        await initializer.InitializeAsync();
        await initializer.InitializeAsync();

        var systems = await dbContext.WindowSystems
            .Include(x => x.Advantages)
            .Include(x => x.Materials)
            .Include(x => x.Images)
            .OrderBy(x => x.Id)
            .ToListAsync();

        Assert.Equal(WindowSystemSeedData.All.Count, systems.Count);

        foreach (var seed in WindowSystemSeedData.All)
        {
            var entity = Assert.Single(systems, item => item.Id == seed.Id);
            Assert.Equal(seed.Advantages.Count, entity.Advantages.Count);
            Assert.Equal(seed.Materials.Count, entity.Materials.Count);

            var expectedImageCount = WindowSystemSeedData.ImagesBySystemId.TryGetValue(seed.Id, out var seededImages)
                ? seededImages.Count
                : 0;

            Assert.Equal(expectedImageCount, entity.Images.Count);
            Assert.Equal(entity.Images.Count, entity.Images.Select(image => image.FileName).Distinct(StringComparer.OrdinalIgnoreCase).Count());
        }

        var contentEntries = await dbContext.SiteContentEntries.AsNoTracking().ToListAsync();
        Assert.Equal(SiteContentDefaults.Values.Count, contentEntries.Count);
        Assert.Equal(contentEntries.Count, contentEntries.Select(entry => entry.Key).Distinct(StringComparer.Ordinal).Count());

        var users = await dbContext.Users.AsNoTracking().ToListAsync();
        var user = Assert.Single(users);
        Assert.Equal("admin", user.UserName);
        Assert.Equal("admin@fabrykarolet.local", user.Email);
    }

    private static AppDbContext CreateDbContext()
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString("N"))
            .Options;
        return new AppDbContext(options);
    }

    private static UserManager<AdminUser> CreateUserManager(AppDbContext dbContext)
    {
        return new UserManager<AdminUser>(
            new UserStore<AdminUser>(dbContext),
            Options.Create(new IdentityOptions()),
            new PasswordHasher<AdminUser>(),
            [new UserValidator<AdminUser>()],
            [new PasswordValidator<AdminUser>()],
            new UpperInvariantLookupNormalizer(),
            new IdentityErrorDescriber(),
            null,
            NullLogger<UserManager<AdminUser>>.Instance);
    }
}
