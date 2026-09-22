using FabrykaRolet.Application.Sections;
using FabrykaRolet.Domain.Entities;
using FabrykaRolet.Web.ClientData;

namespace FabrykaRolet.Web.Tests;

public class HouseViewerDataMapperTests
{
    [Fact]
    public void ToDto_UsesViewerDescriptionForSystemsAndHotspots()
    {
        const string viewerDescription = "Krótki opis do viewera.";
        const string catalogDescription = "Długi opis do strony Systemy.";

        var system = new WindowSystem
        {
            Id = "markizy",
            Name = "Markizy",
            Section = HouseSection.Exterior,
            ViewerDescription = viewerDescription,
            ShortDescription = catalogDescription,
            Advantages = new[] { "Zaleta 1" },
            Materials = new[] { "Tkanina" },
            Mounting = "Taras",
            Control = "Ręczne",
            MaxDimensions = "4x3 m",
        };

        var data = new SectionPageResult(
            new[]
            {
                new HouseView
                {
                    Id = "dom-przod",
                    Section = HouseSection.Exterior,
                    Title = "Dom z przodu",
                    ImagePath = "/images/house/exterior/dom-przod.png",
                    ImageWidth = 1600,
                    ImageHeight = 900,
                    Hotspots = new[]
                    {
                        new Hotspot
                        {
                            WindowSystemId = system.Id,
                            Position = new HotspotPoint(25, 40),
                        },
                    },
                },
            },
            new[] { system });

        var dto = HouseViewerDataMapper.ToDto(data);

        Assert.Equal(viewerDescription, dto.Systems.Single().Description);
        Assert.Equal(viewerDescription, dto.Views.Single().Hotspots.Single().Description);
        Assert.DoesNotContain(catalogDescription, dto.Systems.Select(item => item.Description));
        Assert.DoesNotContain(catalogDescription, dto.Views.SelectMany(view => view.Hotspots).Select(item => item.Description));
    }
}
