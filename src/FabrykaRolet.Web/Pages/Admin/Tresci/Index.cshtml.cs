using FabrykaRolet.Infrastructure.Data;
using FabrykaRolet.Infrastructure.Data.Entities;
using FabrykaRolet.Infrastructure.Services;
using FabrykaRolet.Web.Models.Admin;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;

namespace FabrykaRolet.Web.Pages.Admin.Tresci;

[Authorize]
public sealed class IndexModel(AppDbContext dbContext) : PageModel
{
    [BindProperty] public EditableSiteContentModel Input { get; set; } = new();
    public string? StatusMessage { get; private set; }

    public async Task OnGetAsync(string? message = null)
    {
        StatusMessage = message;
        await LoadAsync();
    }

    public async Task<IActionResult> OnPostAsync()
    {
        if (!ModelState.IsValid)
        {
            return Page();
        }

        var existing = await dbContext.SiteContentEntries.ToDictionaryAsync(x => x.Key);
        foreach (var (key, value) in ToDictionary(Input))
        {
            if (!existing.TryGetValue(key, out var entry))
            {
                entry = new SiteContentEntryEntity { Key = key };
                dbContext.SiteContentEntries.Add(entry);
            }

            entry.Value = value.Trim();
        }

        await dbContext.SaveChangesAsync();
        return RedirectToPage(new { message = "Zapisano treści stron." });
    }

    private async Task LoadAsync()
    {
        var values = SiteContentDefaults.Values.ToDictionary(x => x.Key, x => x.Value);
        foreach (var entry in await dbContext.SiteContentEntries.AsNoTracking().ToListAsync())
        {
            values[entry.Key] = entry.Value;
        }

        Input = new EditableSiteContentModel
        {
            HomeTitle = values[SiteContentDefaults.HomeTitle],
            HomeLead = values[SiteContentDefaults.HomeLead],
            HomeExteriorCardTitle = values[SiteContentDefaults.HomeExteriorCardTitle],
            HomeExteriorCardBody = values[SiteContentDefaults.HomeExteriorCardBody],
            HomeExteriorCardCta = values[SiteContentDefaults.HomeExteriorCardCta],
            HomeInteriorCardTitle = values[SiteContentDefaults.HomeInteriorCardTitle],
            HomeInteriorCardBody = values[SiteContentDefaults.HomeInteriorCardBody],
            HomeInteriorCardCta = values[SiteContentDefaults.HomeInteriorCardCta],
            ContactTitle = values[SiteContentDefaults.ContactTitle],
            ContactLead = values[SiteContentDefaults.ContactLead],
            ContactPhone = values[SiteContentDefaults.ContactPhone],
            ContactEmail = values[SiteContentDefaults.ContactEmail],
            ContactAddress = values[SiteContentDefaults.ContactAddress],
            SystemsTitle = values[SiteContentDefaults.SystemsTitle],
            SystemsLead = values[SiteContentDefaults.SystemsLead],
            ExteriorTitle = values[SiteContentDefaults.ExteriorTitle],
            ExteriorLead = values[SiteContentDefaults.ExteriorLead],
            InteriorTitle = values[SiteContentDefaults.InteriorTitle],
            InteriorLead = values[SiteContentDefaults.InteriorLead],
        };
    }

    private static IReadOnlyDictionary<string, string> ToDictionary(EditableSiteContentModel input) => new Dictionary<string, string>
    {
        [SiteContentDefaults.HomeTitle] = input.HomeTitle,
        [SiteContentDefaults.HomeLead] = input.HomeLead,
        [SiteContentDefaults.HomeExteriorCardTitle] = input.HomeExteriorCardTitle,
        [SiteContentDefaults.HomeExteriorCardBody] = input.HomeExteriorCardBody,
        [SiteContentDefaults.HomeExteriorCardCta] = input.HomeExteriorCardCta,
        [SiteContentDefaults.HomeInteriorCardTitle] = input.HomeInteriorCardTitle,
        [SiteContentDefaults.HomeInteriorCardBody] = input.HomeInteriorCardBody,
        [SiteContentDefaults.HomeInteriorCardCta] = input.HomeInteriorCardCta,
        [SiteContentDefaults.ContactTitle] = input.ContactTitle,
        [SiteContentDefaults.ContactLead] = input.ContactLead,
        [SiteContentDefaults.ContactPhone] = input.ContactPhone,
        [SiteContentDefaults.ContactEmail] = input.ContactEmail,
        [SiteContentDefaults.ContactAddress] = input.ContactAddress,
        [SiteContentDefaults.SystemsTitle] = input.SystemsTitle,
        [SiteContentDefaults.SystemsLead] = input.SystemsLead,
        [SiteContentDefaults.ExteriorTitle] = input.ExteriorTitle,
        [SiteContentDefaults.ExteriorLead] = input.ExteriorLead,
        [SiteContentDefaults.InteriorTitle] = input.InteriorTitle,
        [SiteContentDefaults.InteriorLead] = input.InteriorLead,
    };
}
