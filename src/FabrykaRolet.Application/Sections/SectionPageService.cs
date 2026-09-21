using FabrykaRolet.Domain.Entities;
using FabrykaRolet.Domain.Repositories;

namespace FabrykaRolet.Application.Sections;

/// <summary>
/// Celowo cienka warstwa aplikacyjna: dziś tylko składa dane z dwóch repozytoriów w jeden
/// wynik gotowy do renderu strony sekcji.
/// </summary>
public sealed class SectionPageService(
    IWindowSystemRepository windowSystemRepository,
    IHouseViewRepository houseViewRepository)
{
    public SectionPageResult GetSectionPage(HouseSection section)
    {
        var systems = windowSystemRepository.GetBySection(section);
        var views = houseViewRepository.GetBySection(section);
        return new SectionPageResult(views, systems);
    }
}
