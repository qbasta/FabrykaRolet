using FabrykaRolet.Infrastructure.Data;
using FabrykaRolet.Infrastructure.Data.Entities;
using FabrykaRolet.Infrastructure.Identity;
using FabrykaRolet.Infrastructure.Services;
using Microsoft.Data.Sqlite;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging.Abstractions;
using Microsoft.Extensions.Options;
using Xunit;

namespace FabrykaRolet.Tests;

public sealed class ApplicationDbInitializerTests
{
    [Fact]
    public async Task InitializeAsync_is_idempotent_for_seeded_data()
    {
        await using var connection = new SqliteConnection("Data Source=:memory:");
        await connection.OpenAsync();
        await using var services = CreateServiceProvider(connection);

        await using (var scope = services.CreateAsyncScope())
        {
            var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
            var userManager = scope.ServiceProvider.GetRequiredService<UserManager<AdminUser>>();
            var initializer = CreateInitializer(dbContext, userManager);
            await initializer.InitializeAsync();
        }

        await using (var scope = services.CreateAsyncScope())
        {
            var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
            var userManager = scope.ServiceProvider.GetRequiredService<UserManager<AdminUser>>();
            var initializer = CreateInitializer(dbContext, userManager);
            await initializer.InitializeAsync();
        }

        await using var verificationScope = services.CreateAsyncScope();
        var verificationDbContext = verificationScope.ServiceProvider.GetRequiredService<AppDbContext>();

        var systems = await verificationDbContext.WindowSystems
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

        var contentEntries = await verificationDbContext.SiteContentEntries.AsNoTracking().ToListAsync();
        Assert.Equal(SiteContentDefaults.Values.Count, contentEntries.Count);
        Assert.Equal(contentEntries.Count, contentEntries.Select(entry => entry.Key).Distinct(StringComparer.Ordinal).Count());

        var users = await verificationDbContext.Users.AsNoTracking().ToListAsync();
        var user = Assert.Single(users);
        Assert.Equal("admin", user.UserName);
        Assert.Equal("admin@fabrykarolet.local", user.Email);
    }

    [Fact]
    public async Task InitializeAsync_restores_legacy_seeded_viewer_descriptions_to_public_copy()
    {
        await using var connection = new SqliteConnection("Data Source=:memory:");
        await connection.OpenAsync();
        await using var services = CreateServiceProvider(connection);

        await using (var scope = services.CreateAsyncScope())
        {
            var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
            var userManager = scope.ServiceProvider.GetRequiredService<UserManager<AdminUser>>();
            var initializer = CreateInitializer(dbContext, userManager);
            await initializer.InitializeAsync();
        }

        await using (var scope = services.CreateAsyncScope())
        {
            var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
            var system = await dbContext.WindowSystems.SingleAsync(x => x.Id == "rolety-zewnetrzne");
            system.ViewerDescription = "Zewnętrzna osłona okienna, która pomaga ograniczyć słońce, hałas i straty ciepła.";
            system.ShortDescription = WindowSystemSeedData.All.Single(x => x.Id == "rolety-zewnetrzne").ShortDescription;
            await dbContext.SaveChangesAsync();
        }

        await using (var scope = services.CreateAsyncScope())
        {
            var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
            var userManager = scope.ServiceProvider.GetRequiredService<UserManager<AdminUser>>();
            var initializer = CreateInitializer(dbContext, userManager);
            await initializer.InitializeAsync();
        }

        await using var verificationScope = services.CreateAsyncScope();
        var verificationDbContext = verificationScope.ServiceProvider.GetRequiredService<AppDbContext>();
        var restoredValue = await verificationDbContext.WindowSystems
            .Where(x => x.Id == "rolety-zewnetrzne")
            .Select(x => x.ViewerDescription)
            .SingleAsync();

        Assert.Equal(WindowSystemSeedData.All.Single(x => x.Id == "rolety-zewnetrzne").ShortDescription, restoredValue);
    }

    private static ServiceProvider CreateServiceProvider(SqliteConnection connection)
    {
        var services = new ServiceCollection();
        services.AddLogging();
        services.AddDbContext<AppDbContext>(options =>
        {
            options.UseSqlite(connection);
            options.ConfigureWarnings(warnings => warnings.Ignore(RelationalEventId.PendingModelChangesWarning));
        });
        services
            .AddIdentity<AdminUser, IdentityRole>()
            .AddEntityFrameworkStores<AppDbContext>()
            .AddDefaultTokenProviders();
        return services.BuildServiceProvider();
    }

    private static ApplicationDbInitializer CreateInitializer(AppDbContext dbContext, UserManager<AdminUser> userManager)
    {
        return new ApplicationDbInitializer(
            dbContext,
            userManager,
            Options.Create(new AdminSeedOptions
            {
                UserName = "admin",
                Email = "admin@fabrykarolet.local",
                Password = "Stabilizacja123!"
            }),
            NullLogger<ApplicationDbInitializer>.Instance);
    }
}
