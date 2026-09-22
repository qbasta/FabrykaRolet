using FabrykaRolet.Domain.Entities;
using FabrykaRolet.Infrastructure.Data;
using FabrykaRolet.Infrastructure.Data.Entities;
using FabrykaRolet.Web.Models.Admin;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;

namespace FabrykaRolet.Web.Pages.Admin.Systemy;

[Authorize]
public sealed class EdytujModel(AppDbContext dbContext) : PageModel
{
    [BindProperty] public WindowSystemEditorModel Input { get; set; } = new();
    public bool IsNew { get; private set; }
    public IReadOnlyList<SelectListItem> SectionOptions { get; } =
    [
        new("Na zewnątrz", HouseSection.Exterior.ToString()),
        new("Wewnątrz", HouseSection.Interior.ToString()),
    ];

    public async Task<IActionResult> OnGetAsync(string? id)
    {
        IsNew = string.IsNullOrWhiteSpace(id);
        if (IsNew)
        {
            Input = new WindowSystemEditorModel
            {
                Section = HouseSection.Exterior,
                IsVisible = false,
                IsArchived = false,
                SortOrder = await dbContext.WindowSystems.AnyAsync() ? await dbContext.WindowSystems.MaxAsync(x => x.SortOrder) + 1 : 0,
            };
            return Page();
        }

        var entity = await dbContext.WindowSystems
            .Include(x => x.Advantages)
            .Include(x => x.Materials)
            .FirstOrDefaultAsync(x => x.Id == id);

        if (entity is null)
        {
            return NotFound();
        }

        Input = new WindowSystemEditorModel
        {
            Id = entity.Id,
            Name = entity.Name,
            Section = entity.Section,
            ViewerDescription = entity.ViewerDescription,
            ShortDescription = entity.ShortDescription,
            Advantages = string.Join(Environment.NewLine, entity.Advantages.OrderBy(x => x.SortOrder).Select(x => x.Text)),
            Materials = string.Join(Environment.NewLine, entity.Materials.OrderBy(x => x.SortOrder).Select(x => x.Name)),
            Mounting = entity.Mounting,
            Control = entity.Control,
            MaxDimensions = entity.MaxDimensions,
            IsVisible = entity.IsVisible,
            IsArchived = entity.IsArchived,
            SortOrder = entity.SortOrder,
        };

        return Page();
    }

    public async Task<IActionResult> OnPostAsync(string? id)
    {
        IsNew = string.IsNullOrWhiteSpace(id);
        if (!ModelState.IsValid)
        {
            return Page();
        }

        var normalizedId = Input.Id.Trim().ToLowerInvariant();
        if (string.IsNullOrWhiteSpace(normalizedId))
        {
            ModelState.AddModelError(nameof(Input.Id), "Slug jest wymagany.");
            return Page();
        }

        WindowSystemEntity? entity;
        if (IsNew)
        {
            if (await dbContext.WindowSystems.AnyAsync(x => x.Id == normalizedId))
            {
                ModelState.AddModelError(nameof(Input.Id), "System o takim slug'u już istnieje.");
                return Page();
            }

            entity = new WindowSystemEntity
            {
                Id = normalizedId,
                IsVisible = false,
                IsArchived = false,
            };
            dbContext.WindowSystems.Add(entity);
        }
        else
        {
            entity = await dbContext.WindowSystems
                .Include(x => x.Advantages)
                .Include(x => x.Materials)
                .FirstOrDefaultAsync(x => x.Id == id);
            if (entity is null)
            {
                return NotFound();
            }
        }

        entity.Name = Input.Name.Trim();
        entity.Section = Input.Section;
        entity.ViewerDescription = Input.ViewerDescription.Trim();
        entity.ShortDescription = Input.ShortDescription.Trim();
        entity.Mounting = Input.Mounting.Trim();
        entity.Control = Input.Control.Trim();
        entity.MaxDimensions = Input.MaxDimensions.Trim();
        entity.IsVisible = Input.IsVisible && !Input.IsArchived;
        entity.IsArchived = Input.IsArchived;
        entity.SortOrder = Input.SortOrder;

        ApplyLines(entity.Advantages, Input.Advantages, value => new WindowSystemAdvantageEntity
        {
            Id = Guid.NewGuid(),
            WindowSystemId = entity.Id,
            Text = value,
        },
        (item, value, order) =>
        {
            item.Text = value;
            item.SortOrder = order;
        });

        ApplyLines(entity.Materials, Input.Materials, value => new WindowSystemMaterialEntity
        {
            Id = Guid.NewGuid(),
            WindowSystemId = entity.Id,
            Name = value,
        },
        (item, value, order) =>
        {
            item.Name = value;
            item.SortOrder = order;
        });

        await dbContext.SaveChangesAsync();
        return RedirectToPage("/Admin/Systemy/Index", new { message = IsNew ? "Dodano nowy system." : "Zapisano zmiany w systemie." });
    }

    private static void ApplyLines<T>(ICollection<T> collection, string rawValue, Func<string, T> create, Action<T, string, int> update)
    {
        var lines = rawValue.Split(['\r', '\n'], StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);
        var items = collection.ToList();

        while (items.Count > lines.Length)
        {
            var toRemove = items[^1];
            collection.Remove(toRemove);
            items.RemoveAt(items.Count - 1);
        }

        for (var index = 0; index < lines.Length; index++)
        {
            if (index >= items.Count)
            {
                var created = create(lines[index]);
                collection.Add(created);
                items.Add(created);
            }

            update(items[index], lines[index], index);
        }
    }
}
