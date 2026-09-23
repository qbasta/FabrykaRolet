using System.ComponentModel.DataAnnotations;

namespace FabrykaRolet.Web.Models.Admin;

public sealed class EditableSiteContentModel
{
    [Required] public string HomeTitle { get; set; } = string.Empty;
    [Required] public string HomeLead { get; set; } = string.Empty;
    [Required] public string HomeExteriorCardTitle { get; set; } = string.Empty;
    [Required] public string HomeExteriorCardBody { get; set; } = string.Empty;
    [Required] public string HomeExteriorCardCta { get; set; } = string.Empty;
    [Required] public string HomeInteriorCardTitle { get; set; } = string.Empty;
    [Required] public string HomeInteriorCardBody { get; set; } = string.Empty;
    [Required] public string HomeInteriorCardCta { get; set; } = string.Empty;
    [Required] public string ContactTitle { get; set; } = string.Empty;
    [Required] public string ContactLead { get; set; } = string.Empty;
    [Required] public string ContactPhone { get; set; } = string.Empty;
    [Required] public string ContactEmail { get; set; } = string.Empty;
    [Required] public string ContactAddress { get; set; } = string.Empty;
    [Required] public string SystemsTitle { get; set; } = string.Empty;
    [Required] public string SystemsLead { get; set; } = string.Empty;
    [Required] public string ExteriorTitle { get; set; } = string.Empty;
    [Required] public string ExteriorLead { get; set; } = string.Empty;
    [Required] public string InteriorTitle { get; set; } = string.Empty;
    [Required] public string InteriorLead { get; set; } = string.Empty;
}
