using FabrykaRolet.Domain.Entities;

namespace FabrykaRolet.Infrastructure.Data;

/// <summary>
/// UWAGA: opisy i zalety poniżej to treść tymczasowa (ogólne informacje o kategorii
/// produktu), wyłącznie po to, żeby mechanizm miał na czym działać. Do podmiany na
/// docelowe teksty dostarczone przez klienta.
/// </summary>
internal static class WindowSystemSeedData
{
    public static readonly IReadOnlyList<WindowSystem> All = new List<WindowSystem>
    {
        // --- Zewnętrzne ---
        new()
        {
            Id = "rolety-zewnetrzne",
            Name = "Rolety zewnętrzne",
            Section = HouseSection.Exterior,
            ShortDescription = "Rolety montowane na zewnątrz okna, zwijane w skrzynkę nad oknem. Chronią przed słońcem, hałasem i utratą ciepła.",
            Advantages = new[]
            {
                "Ograniczenie nagrzewania pomieszczenia latem",
                "Dodatkowa izolacja termiczna i akustyczna",
                "Możliwość pełnego zaciemnienia pomieszczenia",
            },
        },
        new()
        {
            Id = "rolety-antywlamaniowe",
            Name = "Rolety antywłamaniowe / pancerne",
            Section = HouseSection.Exterior,
            ShortDescription = "Wzmocniona wersja rolety zewnętrznej, wykonana z profili o podwyższonej odporności na włamanie.",
            Advantages = new[]
            {
                "Podwyższona odporność na próby wyważenia",
                "Często łączona z czujnikami w systemie alarmowym",
                "Dodatkowo pełni funkcję standardowej rolety (słońce, izolacja)",
            },
        },
        new()
        {
            Id = "zaluzje-fasadowe",
            Name = "Żaluzje fasadowe zewnętrzne",
            Section = HouseSection.Exterior,
            ShortDescription = "Żaluzje z regulowanymi lamelami montowane na elewacji, pozwalające płynnie sterować ilością wpadającego światła.",
            Advantages = new[]
            {
                "Płynna regulacja kąta lamel (światło bez pełnego zaciemnienia)",
                "Nowoczesny, architektoniczny wygląd elewacji",
                "Skuteczna ochrona przed przegrzewaniem pomieszczeń",
            },
        },
        new()
        {
            Id = "markizy",
            Name = "Markizy",
            Section = HouseSection.Exterior,
            ShortDescription = "Wysuwane zadaszenia tkaninowe montowane nad oknem, drzwiami lub tarasem.",
            Advantages = new[]
            {
                "Osłona przed słońcem dla okna, wejścia lub tarasu",
                "Możliwość sterowania automatycznego (czujnik słońca/wiatru)",
                "Szeroki wybór kolorystyki tkaniny",
            },
        },
        new()
        {
            Id = "screeny-fasadowe",
            Name = "Screeny fasadowe",
            Section = HouseSection.Exterior,
            ShortDescription = "Rolety z przepuszczalnej tkaniny technicznej, tłumiące nasłonecznienie przy zachowaniu widoczności na zewnątrz.",
            Advantages = new[]
            {
                "Ochrona przed słońcem bez całkowitego zasłonięcia widoku",
                "Ograniczenie olśnienia (np. przy ekranach, telewizorze)",
                "Niska waga konstrukcji w porównaniu do rolet pełnych",
            },
        },
        new()
        {
            Id = "moskitiery-zewnetrzne",
            Name = "Moskitiery zewnętrzne (rolowane)",
            Section = HouseSection.Exterior,
            ShortDescription = "Zwijane siatki montowane na zewnątrz okna lub drzwi, chroniące przed owadami.",
            Advantages = new[]
            {
                "Możliwość wietrzenia bez owadów w pomieszczeniu",
                "Zwijana - niewidoczna, gdy nieużywana",
                "Nie ogranicza światła, gdy jest zwinięta",
            },
        },
        new()
        {
            Id = "bramy-garazowe",
            Name = "Bramy garażowe",
            Section = HouseSection.Exterior,
            ShortDescription = "Segmentowe lub rolowane bramy wjazdowe do garażu, zwykle z napędem elektrycznym.",
            Advantages = new[]
            {
                "Wygodne otwieranie z poziomu auta (pilot)",
                "Dobra izolacja termiczna garażu",
                "Integracja z systemem inteligentnego domu",
            },
        },

        // --- Wewnętrzne ---
        new()
        {
            Id = "zaluzje-poziome",
            Name = "Żaluzje poziome (aluminiowe)",
            Section = HouseSection.Interior,
            ShortDescription = "Klasyczne żaluzje z poziomych lamel aluminiowych montowane wewnątrz, na ramie okna lub nad nim.",
            Advantages = new[]
            {
                "Precyzyjna regulacja kąta padania światła",
                "Odporność na wilgoć (dobre do kuchni/łazienki)",
                "Duży wybór kolorów lamel",
            },
        },
        new()
        {
            Id = "zaluzje-pionowe",
            Name = "Żaluzje pionowe (wertikalne)",
            Section = HouseSection.Interior,
            ShortDescription = "Żaluzje z pionowych pasów tkaniny, dobrze sprawdzające się przy dużych i szerokich oknach.",
            Advantages = new[]
            {
                "Dobre rozwiązanie dla dużych przeszkleń i drzwi balkonowych",
                "Możliwość przesuwania na bok jak zasłona",
                "Regulacja kąta ustawienia pasów",
            },
        },
        new()
        {
            Id = "plisy",
            Name = "Plisy",
            Section = HouseSection.Interior,
            ShortDescription = "Zaplisowana tkanina rozkładana w harmonijkę, montowana bezpośrednio na skrzydle okna - sprawdza się też przy nietypowych kształtach.",
            Advantages = new[]
            {
                "Dopasowanie do nietypowych kształtów okien (trójkąty, łuki)",
                "Możliwość montażu góra-dół (zasłonięcie tylko części okna)",
                "Kompaktowa forma, mało widoczna przy oknie",
            },
        },
        new()
        {
            Id = "rolety-wewnetrzne",
            Name = "Rolety wewnętrzne",
            Section = HouseSection.Interior,
            ShortDescription = "Rolety materiałowe montowane wewnątrz pomieszczenia (m.in. rzymskie, dzień-noc, wolnowiszące, zaciemniające).",
            Advantages = new[]
            {
                "Szeroki wybór wariantów (dzień-noc, zaciemniające i inne)",
                "Duża różnorodność wzorów i tkanin",
                "Dobre uzupełnienie lub alternatywa dla firan/zasłon",
            },
        },
        new()
        {
            Id = "moskitiery-wewnetrzne",
            Name = "Moskitiery wewnętrzne (ramkowe)",
            Section = HouseSection.Interior,
            ShortDescription = "Moskitiery w sztywnej ramie montowane od wewnątrz, w futrynie okna lub drzwi.",
            Advantages = new[]
            {
                "Prosty montaż bez ingerencji w elewację",
                "Łatwy demontaż na okres zimowy",
                "Niski koszt w porównaniu do wersji rolowanych",
            },
        },
    };
}
