using FabrykaRolet.Infrastructure.Data;
using FabrykaRolet.Infrastructure.Services;
using Microsoft.EntityFrameworkCore;

namespace FabrykaRolet.Web.Services;

public sealed class SiteContentService(AppDbContext dbContext)
{
    public async Task<IReadOnlyDictionary<string, string>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        var values = await dbContext.SiteContentEntries
            .AsNoTracking()
            .ToDictionaryAsync(x => x.Key, x => x.Value, cancellationToken);

        return SiteContentDefaults.Values.ToDictionary(
            pair => pair.Key,
            pair => values.TryGetValue(pair.Key, out var value) ? value : pair.Value);
    }

    public async Task<string> GetValueAsync(string key, CancellationToken cancellationToken = default)
    {
        var values = await GetAllAsync(cancellationToken);
        return values.TryGetValue(key, out var value) ? value : string.Empty;
    }
}
