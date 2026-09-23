using FabrykaRolet.Infrastructure.Data;
using FabrykaRolet.Infrastructure.Data.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;

namespace FabrykaRolet.Web.Pages.Admin.Systemy;

[Authorize]
public sealed class IndexModel(AppDbContext dbContext) : PageModel
{
    public IReadOnlyList<WindowSystemEntity> Systems { get; private set; } = [];
    public string? StatusMessage { get; private set; }

    public async Task OnGetAsync(string? message = null)
    {
        StatusMessage = message;
        Systems = await dbContext.WindowSystems
            .AsNoTracking()
            .OrderBy(x => x.SortOrder)
            .ThenBy(x => x.Name)
            .ToListAsync();
    }

    public async Task<IActionResult> OnPostToggleVisibilityAsync(string id)
    {
        var entity = await dbContext.WindowSystems.FirstOrDefaultAsync(x => x.Id == id);
        if (entity is null)
        {
            return NotFound();
        }

        if (entity.IsArchived)
        {
            return RedirectToPage(new { message = $"Najpierw przywróć system „{entity.Name}” z archiwum." });
        }

        entity.IsVisible = !entity.IsVisible;
        await dbContext.SaveChangesAsync();
        return RedirectToPage(new { message = $"Zmieniono widoczność systemu „{entity.Name}”." });
    }

    public async Task<IActionResult> OnPostToggleArchiveAsync(string id)
    {
        var entity = await dbContext.WindowSystems.FirstOrDefaultAsync(x => x.Id == id);
        if (entity is null)
        {
            return NotFound();
        }

        entity.IsArchived = !entity.IsArchived;
        if (entity.IsArchived)
        {
            entity.IsVisible = false;
        }

        await dbContext.SaveChangesAsync();
        return RedirectToPage(new { message = entity.IsArchived ? $"Zarchiwizowano system „{entity.Name}”." : $"Przywrócono system „{entity.Name}”." });
    }
}
