namespace FabrykaRolet.Infrastructure.Services;

public static class SiteContentDefaults
{
    public const string HomeTitle = "home.title";
    public const string HomeLead = "home.lead";
    public const string HomeExteriorCardTitle = "home.card.exterior.title";
    public const string HomeExteriorCardBody = "home.card.exterior.body";
    public const string HomeExteriorCardCta = "home.card.exterior.cta";
    public const string HomeInteriorCardTitle = "home.card.interior.title";
    public const string HomeInteriorCardBody = "home.card.interior.body";
    public const string HomeInteriorCardCta = "home.card.interior.cta";
    public const string ContactTitle = "contact.title";
    public const string ContactLead = "contact.lead";
    public const string ContactPhone = "contact.phone";
    public const string ContactEmail = "contact.email";
    public const string ContactAddress = "contact.address";
    public const string SystemsTitle = "systems.title";
    public const string SystemsLead = "systems.lead";
    public const string ExteriorTitle = "exterior.title";
    public const string ExteriorLead = "exterior.lead";
    public const string InteriorTitle = "interior.title";
    public const string InteriorLead = "interior.lead";

    public static readonly IReadOnlyDictionary<string, string> Values = new Dictionary<string, string>
    {
        [HomeTitle] = "Systemy zewnętrzne i wewnętrzne w jednym miejscu",
        [HomeLead] = "Poznaj rolety, żaluzje, plisy i pozostałe systemy okienne Fabryki Rolet – kliknij w interesujący Cię element na modelu domu, aby zobaczyć, jak działa i jakie ma zalety.",
        [HomeExteriorCardTitle] = "Na zewnątrz",
        [HomeExteriorCardBody] = "Rolety, żaluzje fasadowe, markizy, screeny i inne systemy montowane na elewacji.",
        [HomeExteriorCardCta] = "Zobacz systemy zewnętrzne →",
        [HomeInteriorCardTitle] = "Wewnątrz",
        [HomeInteriorCardBody] = "Żaluzje, plisy i rolety wewnętrzne dobierane do konkretnego okna i wnętrza.",
        [HomeInteriorCardCta] = "Zobacz systemy wewnętrzne →",
        [ContactTitle] = "Kontakt",
        [ContactLead] = "Strona informacyjna bez formularza (celowo – zgodnie z bieżącym zakresem prac). Dane poniżej to wartości przykładowe do podmiany na docelowe.",
        [ContactPhone] = "+48 000 000 000",
        [ContactEmail] = "kontakt@fabrykarolet.pl",
        [ContactAddress] = "ul. Przykładowa 1, 00-000 Miejscowość",
        [SystemsTitle] = "Wszystkie systemy",
        [SystemsLead] = "Pełny katalog systemów Fabryki Rolet — przefiltruj po lokalizacji montażu albo przewiń całość.",
        [ExteriorTitle] = "Systemy zewnętrzne",
        [ExteriorLead] = "Kliknij w oznaczony element na widoku domu, aby poznać jego opis i zalety.",
        [InteriorTitle] = "Systemy wewnętrzne",
        [InteriorLead] = "Kliknij w oznaczony element na widoku wnętrza, aby poznać jego opis i zalety.",
    };
}
