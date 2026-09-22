using FabrykaRolet.Domain.Entities;

namespace FabrykaRolet.Infrastructure.Data;

/// <summary>
/// UWAGA: opisy, zalety i specyfikacja (materiały/montaż/sterowanie/wymiary) poniżej to
/// treść tymczasowa, wyłącznie po to, żeby mechanizm miał na czym działać. Do podmiany
/// na docelowe teksty i dane dostarczone przez klienta.
/// </summary>
public static class WindowSystemSeedData
{
    public static readonly IReadOnlyList<WindowSystem> All = new List<WindowSystem>
    {
        // --- Zewnętrzne ---
        new()
        {
            Id = "rolety-zewnetrzne",
            Name = "Rolety zewnętrzne",
            Section = HouseSection.Exterior,
            ViewerDescription = "Rolety montowane na zewnątrz okna, zwijane w skrzynkę nad oknem. Chronią przed słońcem, hałasem i utratą ciepła.",
            ShortDescription = "Rolety montowane na zewnątrz okna, zwijane w skrzynkę nad oknem. Chronią przed słońcem, hałasem i utratą ciepła.",
            Advantages = new[]
            {
                "Ograniczenie nagrzewania pomieszczenia latem",
                "Dodatkowa izolacja termiczna i akustyczna",
                "Możliwość pełnego zaciemnienia pomieszczenia",
            },
            Materials = new[] { "Do uzupełnienia" },
            Mounting = "Do uzupełnienia",
            Control = "Do uzupełnienia",
            MaxDimensions = "Do uzupełnienia",
        },
        new()
        {
            Id = "rolety-antywlamaniowe",
            Name = "Rolety antywłamaniowe / pancerne",
            Section = HouseSection.Exterior,
            ViewerDescription = "Wzmocniona wersja rolety zewnętrznej, wykonana z profili o podwyższonej odporności na włamanie.",
            ShortDescription = "Wzmocniona wersja rolety zewnętrznej, wykonana z profili o podwyższonej odporności na włamanie.",
            Advantages = new[]
            {
                "Podwyższona odporność na próby wyważenia",
                "Często łączona z czujnikami w systemie alarmowym",
                "Dodatkowo pełni funkcję standardowej rolety (słońce, izolacja)",
            },
            Materials = new[] { "Do uzupełnienia" },
            Mounting = "Do uzupełnienia",
            Control = "Do uzupełnienia",
            MaxDimensions = "Do uzupełnienia",
        },
        new()
        {
            Id = "zaluzje-fasadowe",
            Name = "Żaluzje fasadowe zewnętrzne",
            Section = HouseSection.Exterior,
            ViewerDescription = "Żaluzje z regulowanymi lamelami montowane na elewacji, pozwalające płynnie sterować ilością wpadającego światła.",
            ShortDescription = "Żaluzje z regulowanymi lamelami montowane na elewacji, pozwalające płynnie sterować ilością wpadającego światła.",
            Advantages = new[]
            {
                "Płynna regulacja kąta lamel (światło bez pełnego zaciemnienia)",
                "Nowoczesny, architektoniczny wygląd elewacji",
                "Skuteczna ochrona przed przegrzewaniem pomieszczeń",
            },
            Materials = new[] { "Do uzupełnienia" },
            Mounting = "Do uzupełnienia",
            Control = "Do uzupełnienia",
            MaxDimensions = "Do uzupełnienia",
        },
        new()
        {
            Id = "markizy",
            Name = "Markizy",
            Section = HouseSection.Exterior,
            ViewerDescription = "Wysuwane zadaszenia tkaninowe montowane nad oknem, drzwiami lub tarasem.",
            ShortDescription = "Wysuwane zadaszenia tkaninowe montowane nad oknem, drzwiami lub tarasem.",
            Advantages = new[]
            {
                "Osłona przed słońcem dla okna, wejścia lub tarasu",
                "Możliwość sterowania automatycznego (czujnik słońca/wiatru)",
                "Szeroki wybór kolorystyki tkaniny",
            },
            Materials = new[] { "Do uzupełnienia" },
            Mounting = "Do uzupełnienia",
            Control = "Do uzupełnienia",
            MaxDimensions = "Do uzupełnienia",
        },
        new()
        {
            Id = "screeny-fasadowe",
            Name = "Screeny fasadowe",
            Section = HouseSection.Exterior,
            ViewerDescription = "Rolety z przepuszczalnej tkaniny technicznej, tłumiące nasłonecznienie przy zachowaniu widoczności na zewnątrz.",
            ShortDescription = "Rolety z przepuszczalnej tkaniny technicznej, tłumiące nasłonecznienie przy zachowaniu widoczności na zewnątrz.",
            Advantages = new[]
            {
                "Ochrona przed słońcem bez całkowitego zasłonięcia widoku",
                "Ograniczenie olśnienia (np. przy ekranach, telewizorze)",
                "Niska waga konstrukcji w porównaniu do rolet pełnych",
            },
            Materials = new[] { "Do uzupełnienia" },
            Mounting = "Do uzupełnienia",
            Control = "Do uzupełnienia",
            MaxDimensions = "Do uzupełnienia",
        },
        new()
        {
            Id = "moskitiery-zewnetrzne",
            Name = "Moskitiery zewnętrzne (rolowane)",
            Section = HouseSection.Exterior,
            ViewerDescription = "Zwijane siatki montowane na zewnątrz okna lub drzwi, chroniące przed owadami.",
            ShortDescription = "Zwijane siatki montowane na zewnątrz okna lub drzwi, chroniące przed owadami.",
            Advantages = new[]
            {
                "Możliwość wietrzenia bez owadów w pomieszczeniu",
                "Zwijana - niewidoczna, gdy nieużywana",
                "Nie ogranicza światła, gdy jest zwinięta",
            },
            Materials = new[] { "Do uzupełnienia" },
            Mounting = "Do uzupełnienia",
            Control = "Do uzupełnienia",
            MaxDimensions = "Do uzupełnienia",
        },
        new()
        {
            Id = "bramy-garazowe",
            Name = "Bramy garażowe",
            Section = HouseSection.Exterior,
            ViewerDescription = "Segmentowe lub rolowane bramy wjazdowe do garażu, zwykle z napędem elektrycznym.",
            ShortDescription = "Segmentowe lub rolowane bramy wjazdowe do garażu, zwykle z napędem elektrycznym.",
            Advantages = new[]
            {
                "Wygodne otwieranie z poziomu auta (pilot)",
                "Dobra izolacja termiczna garażu",
                "Integracja z systemem inteligentnego domu",
            },
            Materials = new[] { "Do uzupełnienia" },
            Mounting = "Do uzupełnienia",
            Control = "Do uzupełnienia",
            MaxDimensions = "Do uzupełnienia",
        },

        // --- Wewnętrzne ---
        new()
        {
            Id = "zaluzje-poziome",
            Name = "Żaluzje poziome (aluminiowe)",
            Section = HouseSection.Interior,
            ViewerDescription = "Klasyczne żaluzje z poziomych lamel aluminiowych montowane wewnątrz, na ramie okna lub nad nim.",
            ShortDescription = "Klasyczne żaluzje z poziomych lamel aluminiowych montowane wewnątrz, na ramie okna lub nad nim.",
            Advantages = new[]
            {
                "Precyzyjna regulacja kąta padania światła",
                "Odporność na wilgoć (dobre do kuchni/łazienki)",
                "Duży wybór kolorów lamel",
            },
            Materials = new[] { "Do uzupełnienia" },
            Mounting = "Do uzupełnienia",
            Control = "Do uzupełnienia",
            MaxDimensions = "Do uzupełnienia",
        },
        new()
        {
            Id = "zaluzje-pionowe",
            Name = "Żaluzje pionowe (wertikalne)",
            Section = HouseSection.Interior,
            ViewerDescription = "Żaluzje z pionowych pasów tkaniny, dobrze sprawdzające się przy dużych i szerokich oknach.",
            ShortDescription = "Żaluzje z pionowych pasów tkaniny, dobrze sprawdzające się przy dużych i szerokich oknach.",
            Advantages = new[]
            {
                "Dobre rozwiązanie dla dużych przeszkleń i drzwi balkonowych",
                "Możliwość przesuwania na bok jak zasłona",
                "Regulacja kąta ustawienia pasów",
            },
            Materials = new[] { "Do uzupełnienia" },
            Mounting = "Do uzupełnienia",
            Control = "Do uzupełnienia",
            MaxDimensions = "Do uzupełnienia",
        },
        new()
        {
            Id = "plisy",
            Name = "Plisy",
            Section = HouseSection.Interior,
            ViewerDescription = "Zaplisowana tkanina rozkładana w harmonijkę, montowana bezpośrednio na skrzydle okna - sprawdza się też przy nietypowych kształtach.",
            ShortDescription = "Zaplisowana tkanina rozkładana w harmonijkę, montowana bezpośrednio na skrzydle okna - sprawdza się też przy nietypowych kształtach.",
            Advantages = new[]
            {
                "Dopasowanie do nietypowych kształtów okien (trójkąty, łuki)",
                "Możliwość montażu góra-dół (zasłonięcie tylko części okna)",
                "Kompaktowa forma, mało widoczna przy oknie",
            },
            Materials = new[] { "Do uzupełnienia" },
            Mounting = "Do uzupełnienia",
            Control = "Do uzupełnienia",
            MaxDimensions = "Do uzupełnienia",
        },
        new()
        {
            Id = "rolety-wewnetrzne",
            Name = "Rolety wewnętrzne",
            Section = HouseSection.Interior,
            ViewerDescription = "Rolety materiałowe montowane wewnątrz pomieszczenia (m.in. rzymskie, dzień-noc, wolnowiszące, zaciemniające).",
            ShortDescription = "Rolety materiałowe montowane wewnątrz pomieszczenia (m.in. rzymskie, dzień-noc, wolnowiszące, zaciemniające).",
            Advantages = new[]
            {
                "Szeroki wybór wariantów (dzień-noc, zaciemniające i inne)",
                "Duża różnorodność wzorów i tkanin",
                "Dobre uzupełnienie lub alternatywa dla firan/zasłon",
            },
            Materials = new[] { "Do uzupełnienia" },
            Mounting = "Do uzupełnienia",
            Control = "Do uzupełnienia",
            MaxDimensions = "Do uzupełnienia",
        },
        new()
        {
            Id = "moskitiery-wewnetrzne",
            Name = "Moskitiery wewnętrzne (ramkowe)",
            Section = HouseSection.Interior,
            ViewerDescription = "Moskitiery w sztywnej ramie montowane od wewnątrz, w futrynie okna lub drzwi.",
            ShortDescription = "Moskitiery w sztywnej ramie montowane od wewnątrz, w futrynie okna lub drzwi.",
            Advantages = new[]
            {
                "Prosty montaż bez ingerencji w elewację",
                "Łatwy demontaż na okres zimowy",
                "Niski koszt w porównaniu do wersji rolowanych",
            },
            Materials = new[] { "Do uzupełnienia" },
            Mounting = "Do uzupełnienia",
            Control = "Do uzupełnienia",
            MaxDimensions = "Do uzupełnienia",
        },
    };

    public static readonly IReadOnlyDictionary<string, IReadOnlyList<string>> ImagesBySystemId =
        new Dictionary<string, IReadOnlyList<string>>
        {
            ["rolety-zewnetrzne"] = new[]
            {
                "rolety-zewnetrzne-1-drewno.png",
                "rolety-zewnetrzne-2-biala.png",
                "rolety-zewnetrzne-3-antracyt.png",
            },
            ["rolety-antywlamaniowe"] = new[]
            {
                "rolety-antywlamaniowe-2-zamknieta.png",
                "rolety-antywlamaniowe-1-konstrukcja.png",
            },
            ["zaluzje-fasadowe"] = new[]
            {
                "zaluzje-fasadowe-1.png",
                "zaluzje-fasadowe-2.png",
                "zaluzje-fasadowe-3.png",
            },
            ["markizy"] = new[]
            {
                "markizy-1-pasy-krem-bordo.png",
                "markizy-2-terakota.png",
                "markizy-3-oliwkowa-paski.png",
            },
            ["screeny-fasadowe"] = new[]
            {
                "screeny-fasadowe-1-szary-ciemny.png",
                "screeny-fasadowe-2-perlowy.png",
                "screeny-fasadowe-3-taupe.png",
            },
        };
}
