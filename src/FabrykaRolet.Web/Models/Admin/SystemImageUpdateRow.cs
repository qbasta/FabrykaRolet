namespace FabrykaRolet.Web.Models.Admin;

public class SystemImageUpdateRow
{
    public Guid Id { get; set; }
    public string FileName { get; set; } = string.Empty;
    public string AltText { get; set; } = string.Empty;
    public int SortOrder { get; set; }
    public bool IsPrimary { get; set; }
    public bool Remove { get; set; }
}
