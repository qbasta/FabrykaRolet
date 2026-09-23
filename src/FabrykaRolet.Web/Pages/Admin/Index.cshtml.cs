using FabrykaRolet.Infrastructure.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;

namespace FabrykaRolet.Web.Pages.Admin;

[Authorize]
public sealed class IndexModel(AppDbContext dbContext) : PageModel
{
    public int VisibleSystemsCount { get; private set; }
    public int HiddenSystemsCount { get; private set; }
    public int ArchivedSystemsCount { get; private set; }
    public int ImagesCount { get; private set; }

    public async Task OnGetAsync()
    {
        VisibleSystemsCount = await dbContext.WindowSystems.CountAsync(x => x.IsVisible && !x.IsArchived);
        HiddenSystemsCount = await dbContext.WindowSystems.CountAsync(x => !x.IsVisible && !x.IsArchived);
        ArchivedSystemsCount = await dbContext.WindowSystems.CountAsync(x => x.IsArchived);
        ImagesCount = await dbContext.WindowSystemImages.CountAsync();
    }
}
