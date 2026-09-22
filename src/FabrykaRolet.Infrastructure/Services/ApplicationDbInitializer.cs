using FabrykaRolet.Infrastructure.Data;
using FabrykaRolet.Infrastructure.Data.Entities;
using FabrykaRolet.Infrastructure.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace FabrykaRolet.Infrastructure.Services;

public sealed class ApplicationDbInitializer(
    AppDbContext dbContext,
    UserManager<AdminUser> userManager,
    IOptions<AdminSeedOptions> adminOptions,
    ILogger<ApplicationDbInitializer> logger)
{
    public async Task InitializeAsync(CancellationToken cancellationToken = default)
    {
        if (dbContext.Database.IsRelational())
        {
            await dbContext.Database.MigrateAsync(cancellationToken);
        }
        else
        {
            await dbContext.Database.EnsureCreatedAsync(cancellationToken);
        }
        await SeedWindowSystemsAsync(cancellationToken);
        await SeedSiteContentAsync(cancellationToken);
        await SeedAdminUserAsync(cancellationToken);
    }

    private async Task SeedWindowSystemsAsync(CancellationToken cancellationToken)
    {
        var existingSystems = await dbContext.WindowSystems
            .Include(x => x.Advantages)
            .Include(x => x.Materials)
            .Include(x => x.Images)
            .ToDictionaryAsync(x => x.Id, cancellationToken);

        for (var index = 0; index < WindowSystemSeedData.All.Count; index++)
        {
            var seed = WindowSystemSeedData.All[index];
            var isNewSystem = !existingSystems.TryGetValue(seed.Id, out var entity);
            if (isNewSystem)
            {
                entity = new WindowSystemEntity
                {
                    Id = seed.Id,
                    Name = seed.Name,
                    Section = seed.Section,
                    ViewerDescription = seed.ViewerDescription,
                    ShortDescription = seed.ShortDescription,
                    Mounting = seed.Mounting,
                    Control = seed.Control,
                    MaxDimensions = seed.MaxDimensions,
                    SortOrder = index,
                    IsVisible = true,
                    IsArchived = false,
                };
                dbContext.WindowSystems.Add(entity);
                existingSystems.Add(entity.Id, entity);

                ApplyOrderedStrings(entity.Advantages, seed.Advantages, text => new WindowSystemAdvantageEntity
                {
                    Id = Guid.NewGuid(),
                    WindowSystemId = entity.Id,
                    Text = text,
                },
                (adv, text, order) =>
                {
                    adv.Text = text;
                    adv.SortOrder = order;
                });

                ApplyOrderedStrings(entity.Materials, seed.Materials, text => new WindowSystemMaterialEntity
                {
                    Id = Guid.NewGuid(),
                    WindowSystemId = entity.Id,
                    Name = text,
                },
                (material, text, order) =>
                {
                    material.Name = text;
                    material.SortOrder = order;
                });
            }

            if (entity is null)
            {
                continue;
            }

            var shouldRestoreLegacyViewerDescription =
                string.Equals(entity.ViewerDescription, LegacyViewerDescriptions.GetValueOrDefault(seed.Id), StringComparison.Ordinal)
                && string.Equals(entity.ShortDescription, seed.ShortDescription, StringComparison.Ordinal);

            if (string.IsNullOrWhiteSpace(entity.ViewerDescription) || shouldRestoreLegacyViewerDescription)
            {
                entity.ViewerDescription = seed.ViewerDescription;
            }

            var seededImages = WindowSystemSeedData.ImagesBySystemId.TryGetValue(seed.Id, out var images)
                ? images
                : [];

            for (var imageIndex = 0; imageIndex < seededImages.Count; imageIndex++)
            {
                var fileName = seededImages[imageIndex];
                if (entity.Images.All(x => !string.Equals(x.FileName, fileName, StringComparison.OrdinalIgnoreCase)))
                {
                    entity.Images.Add(new WindowSystemImageEntity
                    {
                        Id = Guid.NewGuid(),
                        WindowSystemId = entity.Id,
                        FileName = fileName,
                        AltText = $"{seed.Name} – zdjęcie {imageIndex + 1}",
                        SortOrder = imageIndex,
                        IsPrimary = imageIndex == 0,
                    });
                }
            }

            NormalizePrimaryImage(entity.Images);

            if (isNewSystem)
            {
                continue;
            }
        }

        await dbContext.SaveChangesAsync(cancellationToken);
    }

    private static void ApplyOrderedStrings<T>(
        ICollection<T> collection,
        IReadOnlyList<string> seedValues,
        Func<string, T> factory,
        Action<T, string, int> apply)
    {
        var items = collection.ToList();

        while (items.Count > seedValues.Count)
        {
            var toRemove = items[^1];
            collection.Remove(toRemove);
            items.RemoveAt(items.Count - 1);
        }

        for (var index = 0; index < seedValues.Count; index++)
        {
            if (index >= items.Count)
            {
                var created = factory(seedValues[index]);
                collection.Add(created);
                items.Add(created);
            }

            apply(items[index], seedValues[index], index);
        }
    }

    private async Task SeedSiteContentAsync(CancellationToken cancellationToken)
    {
        var existing = await dbContext.SiteContentEntries
            .ToDictionaryAsync(x => x.Key, x => x, cancellationToken);

        foreach (var pair in SiteContentDefaults.Values)
        {
            if (existing.ContainsKey(pair.Key))
            {
                continue;
            }

            dbContext.SiteContentEntries.Add(new SiteContentEntryEntity
            {
                Key = pair.Key,
                Value = pair.Value,
            });
        }

        await dbContext.SaveChangesAsync(cancellationToken);
    }

    private async Task SeedAdminUserAsync(CancellationToken cancellationToken)
    {
        var options = adminOptions.Value;
        if (string.IsNullOrWhiteSpace(options.Password))
        {
            logger.LogWarning("Pominięto seed konta administratora - brak hasła w konfiguracji {SectionName}.", AdminSeedOptions.SectionName);
            return;
        }

        var user = await userManager.FindByNameAsync(options.UserName);
        if (user is null)
        {
            user = new AdminUser
            {
                UserName = options.UserName,
                Email = options.Email,
                EmailConfirmed = true,
            };

            var createResult = await userManager.CreateAsync(user, options.Password);
            if (!createResult.Succeeded)
            {
                throw new InvalidOperationException($"Nie udało się utworzyć administratora: {string.Join(", ", createResult.Errors.Select(x => x.Description))}");
            }

            return;
        }

        user.Email = options.Email;
        user.EmailConfirmed = true;
        await userManager.UpdateAsync(user);
        var token = await userManager.GeneratePasswordResetTokenAsync(user);
        var passwordResult = await userManager.ResetPasswordAsync(user, token, options.Password);
        if (!passwordResult.Succeeded)
        {
            throw new InvalidOperationException($"Nie udało się zaktualizować hasła administratora: {string.Join(", ", passwordResult.Errors.Select(x => x.Description))}");
        }
    }

    private static void NormalizePrimaryImage(IEnumerable<WindowSystemImageEntity> images)
    {
        var ordered = images.OrderBy(x => x.SortOrder).ThenBy(x => x.CreatedAt).ToList();
        if (ordered.Count == 0)
        {
            return;
        }

        if (ordered.All(x => !x.IsPrimary))
        {
            ordered[0].IsPrimary = true;
        }

        var primary = ordered.First(x => x.IsPrimary);
        foreach (var image in ordered)
        {
            image.IsPrimary = image == primary;
        }
    }

    private static readonly IReadOnlyDictionary<string, string> LegacyViewerDescriptions = new Dictionary<string, string>(StringComparer.Ordinal)
    {
        ["rolety-zewnetrzne"] = "Zewnętrzna osłona okienna, która pomaga ograniczyć słońce, hałas i straty ciepła.",
        ["rolety-antywlamaniowe"] = "Wzmocnione rolety zewnętrzne zwiększające ochronę okien i domu.",
        ["zaluzje-fasadowe"] = "Regulowane lamele zewnętrzne pozwalające wygodnie sterować światłem.",
        ["markizy"] = "Zewnętrzna osłona przeciwsłoneczna dla tarasu, balkonu lub dużych przeszkleń.",
        ["screeny-fasadowe"] = "Tkaninowa osłona zewnętrzna, która ogranicza nagrzewanie i olśnienie.",
        ["moskitiery-zewnetrzne"] = "Zwijana siatka chroniąca przed owadami bez ograniczania wietrzenia.",
        ["bramy-garazowe"] = "Izolowana brama garażowa z wygodnym, opcjonalnym sterowaniem automatycznym.",
        ["zaluzje-poziome"] = "Wewnętrzne lamele umożliwiające precyzyjną regulację światła.",
        ["zaluzje-pionowe"] = "Pionowe pasy do wygodnego przesłaniania dużych okien i drzwi balkonowych.",
        ["plisy"] = "Składana osłona okienna pozwalająca zasłonić wybraną część szyby.",
        ["rolety-wewnetrzne"] = "Materiałowe osłony okienne dostępne w wielu tkaninach i stopniach zaciemnienia.",
        ["moskitiery-wewnetrzne"] = "Lekka siatka w ramce, która chroni wnętrze przed owadami.",
    };
}
