using FabrykaRolet.Infrastructure.Data;
using FabrykaRolet.Infrastructure.Data.Entities;
using FabrykaRolet.Infrastructure.Services;
using FabrykaRolet.Web.Models.Admin;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;

namespace FabrykaRolet.Web.Pages.Admin.Systemy;

[Authorize]
public sealed class ZdjeciaModel(AppDbContext dbContext, LocalSystemImageStorage imageStorage) : PageModel
{
    [BindProperty] public string SystemId { get; set; } = string.Empty;
    [BindProperty] public IFormFile? UploadFile { get; set; }
    [BindProperty] public string UploadAltText { get; set; } = string.Empty;
    [BindProperty] public List<SystemImageUpdateInput> Images { get; set; } = [];
    public string SystemName { get; private set; } = string.Empty;
    public string? StatusMessage { get; private set; }

    public async Task<IActionResult> OnGetAsync(string id, string? message = null)
    {
        StatusMessage = message;
        return await LoadAsync(id);
    }

    public async Task<IActionResult> OnPostUploadAsync(string id)
    {
        if (UploadFile is null)
        {
            return RedirectToPage(new { id, message = "Wybierz plik do wysłania." });
        }

        var system = await dbContext.WindowSystems.Include(x => x.Images).FirstOrDefaultAsync(x => x.Id == id);
        if (system is null)
        {
            return NotFound();
        }

        try
        {
            var fileName = await imageStorage.SaveAsync(UploadFile, HttpContext.RequestAborted);
            var sortOrder = system.Images.Count == 0 ? 0 : system.Images.Max(x => x.SortOrder) + 1;
            system.Images.Add(new WindowSystemImageEntity
            {
                Id = Guid.NewGuid(),
                WindowSystemId = system.Id,
                FileName = fileName,
                AltText = string.IsNullOrWhiteSpace(UploadAltText) ? $"{system.Name} – zdjęcie" : UploadAltText.Trim(),
                SortOrder = sortOrder,
                IsPrimary = system.Images.Count == 0,
            });

            await dbContext.SaveChangesAsync();
            return RedirectToPage(new { id, message = "Dodano zdjęcie." });
        }
        catch (InvalidOperationException ex)
        {
            return RedirectToPage(new { id, message = ex.Message });
        }
    }

    public async Task<IActionResult> OnPostSaveAsync(string id)
    {
        var system = await dbContext.WindowSystems.Include(x => x.Images).FirstOrDefaultAsync(x => x.Id == id);
        if (system is null)
        {
            return NotFound();
        }

        var imagesById = system.Images.ToDictionary(x => x.Id);
        foreach (var input in Images)
        {
            if (!imagesById.TryGetValue(input.Id, out var image))
            {
                continue;
            }

            if (input.Remove)
            {
                dbContext.WindowSystemImages.Remove(image);
                imageStorage.DeleteIfExists(image.FileName);
                continue;
            }

            image.AltText = input.AltText.Trim();
            image.SortOrder = input.SortOrder;
            image.IsPrimary = input.IsPrimary;
        }

        var remaining = system.Images.Where(x => dbContext.Entry(x).State != EntityState.Deleted).OrderBy(x => x.SortOrder).ToList();
        if (remaining.Count > 0)
        {
            if (remaining.All(x => !x.IsPrimary))
            {
                remaining[0].IsPrimary = true;
            }

            var primary = remaining.First(x => x.IsPrimary);
            foreach (var image in remaining)
            {
                image.IsPrimary = image == primary;
            }
        }

        await dbContext.SaveChangesAsync();
        return RedirectToPage(new { id, message = "Zapisano zmiany w galerii." });
    }

    private async Task<IActionResult> LoadAsync(string id)
    {
        var system = await dbContext.WindowSystems
            .AsNoTracking()
            .Include(x => x.Images)
            .FirstOrDefaultAsync(x => x.Id == id);

        if (system is null)
        {
            return NotFound();
        }

        SystemId = id;
        SystemName = system.Name;
        Images = system.Images
            .OrderByDescending(x => x.IsPrimary)
            .ThenBy(x => x.SortOrder)
            .Select(x => new SystemImageUpdateInput
            {
                Id = x.Id,
                FileName = x.FileName,
                AltText = x.AltText,
                SortOrder = x.SortOrder,
                IsPrimary = x.IsPrimary,
                PublicPath = IsSeedFile(x.FileName) ? $"/images/systems/{x.FileName}" : imageStorage.BuildPublicPath(x.FileName),
            })
            .ToList();

        return Page();
    }

    private static bool IsSeedFile(string fileName) => WindowSystemSeedData.ImagesBySystemId.Values.SelectMany(x => x).Contains(fileName, StringComparer.OrdinalIgnoreCase);

    public sealed class SystemImageUpdateInput : SystemImageUpdateRow
    {
        public string PublicPath { get; set; } = string.Empty;
    }
}
