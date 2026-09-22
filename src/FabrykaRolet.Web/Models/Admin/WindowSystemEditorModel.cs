using System.ComponentModel.DataAnnotations;
using FabrykaRolet.Domain.Entities;

namespace FabrykaRolet.Web.Models.Admin;

public sealed class WindowSystemEditorModel
{
    [Required]
    [RegularExpression("^[a-z0-9-]+$", ErrorMessage = "Użyj małych liter, cyfr i myślników.")]
    public string Id { get; set; } = string.Empty;

    [Required] public string Name { get; set; } = string.Empty;
    [Required] public HouseSection Section { get; set; }
    [Required] public string ViewerDescription { get; set; } = string.Empty;
    [Required] public string ShortDescription { get; set; } = string.Empty;
    [Required] public string Materials { get; set; } = string.Empty;
    [Required] public string Advantages { get; set; } = string.Empty;
    [Required] public string Mounting { get; set; } = string.Empty;
    [Required] public string Control { get; set; } = string.Empty;
    [Required] public string MaxDimensions { get; set; } = string.Empty;
    public bool IsVisible { get; set; }
    public bool IsArchived { get; set; }
    public int SortOrder { get; set; }
}
