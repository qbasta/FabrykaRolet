using FabrykaRolet.Infrastructure.Data;
using FabrykaRolet.Infrastructure.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace FabrykaRolet.Web.Services;

public sealed class SystemImageReadService(AppDbContext dbContext, IOptions<SystemImageStorageOptions> options)
{
    private static readonly HashSet<string> SeededFiles = WindowSystemSeedData.ImagesBySystemId.Values
        .SelectMany(x => x)
        .ToHashSet(StringComparer.OrdinalIgnoreCase);

    public async Task<IReadOnlyDictionary<string, IReadOnlyList<string>>> GetPublicImagesBySystemIdAsync(
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
            .Select(x => new { x.WindowSystemId, x.FileName })
            .ToListAsync(cancellationToken);

        var uploadsBasePath = "/" + options.Value.RelativeDirectory.Trim('/').Replace('\\', '/');

        return images
            .GroupBy(x => x.WindowSystemId, StringComparer.OrdinalIgnoreCase)
            .ToDictionary(
                g => g.Key,
                g => (IReadOnlyList<string>)g.Select(x => SeededFiles.Contains(x.FileName) ? x.FileName : $"{uploadsBasePath}/{x.FileName}").ToList(),
                StringComparer.OrdinalIgnoreCase);
    }
}
