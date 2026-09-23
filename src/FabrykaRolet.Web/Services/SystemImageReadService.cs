using FabrykaRolet.Infrastructure.Data;
using FabrykaRolet.Infrastructure.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace FabrykaRolet.Web.Services;

public sealed record PublicSystemImage(string Path, string AltText);

public sealed class SystemImageReadService(AppDbContext dbContext, IOptions<SystemImageStorageOptions> options)
{
    private static readonly HashSet<string> SeededFiles = WindowSystemSeedData.ImagesBySystemId.Values
        .SelectMany(x => x)
        .ToHashSet(StringComparer.OrdinalIgnoreCase);

    public async Task<IReadOnlyDictionary<string, IReadOnlyList<PublicSystemImage>>> GetPublicImagesBySystemIdAsync(
        IEnumerable<string> systemIds,
        CancellationToken cancellationToken = default)
    {
        var ids = systemIds.Distinct(StringComparer.OrdinalIgnoreCase).ToArray();
        var images = await dbContext.WindowSystemImages
            .AsNoTracking()
            .Where(x => ids.Contains(x.WindowSystemId))
            .OrderBy(x => x.WindowSystemId)
            .ThenByDescending(x => x.IsPrimary)
            .ThenBy(x => x.SortOrder)
            .Select(x => new { x.WindowSystemId, x.FileName, x.AltText })
            .ToListAsync(cancellationToken);

        var uploadsBasePath = "/" + options.Value.RelativeDirectory.Trim('/').Replace('\\', '/');

        return images
            .GroupBy(x => x.WindowSystemId, StringComparer.OrdinalIgnoreCase)
            .ToDictionary(
                g => g.Key,
                g => (IReadOnlyList<PublicSystemImage>)g
                    .Select(x => new PublicSystemImage(
                        SeededFiles.Contains(x.FileName) ? $"/images/systems/{x.FileName}" : $"{uploadsBasePath}/{x.FileName}",
                        string.IsNullOrWhiteSpace(x.AltText) ? "Zdjęcie systemu" : x.AltText))
                    .ToList(),
                StringComparer.OrdinalIgnoreCase);
    }
}
