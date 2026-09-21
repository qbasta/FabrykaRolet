# Fabryka Rolet — Krok 1

Cel tego kroku: absolutne minimum, które musi zadziałać, zanim dołożymy kolejne
warstwy (Domain, Application, Infrastructure) i samą infografikę.

Jeden projekt (`FabrykaRolet.Web`), jedna strona Razor Pages, zero zależności
zewnętrznych poza samym ASP.NET Core.

## Uruchomienie

```bash
cd src/FabrykaRolet.Web
dotnet restore
dotnet run
```

Otwórz adres wypisany w konsoli (domyślnie `http://localhost:5080`) — powinieneś
zobaczyć stronę z napisem „Fabryka Rolet – Krok 1”.

Ten krok został tu faktycznie zbudowany i uruchomiony (`dotnet build` + `dotnet run`
+ sprawdzenie odpowiedzi HTTP) przed przekazaniem — więc jeśli u Ciebie nie zadziała,
to raczej różnica środowiska (wersja SDK, port zajęty) niż błąd w kodzie.

## Konfigurator „Na zewnątrz” — obrazy i hotspoty

Widoki domu dla sekcji `/NaZewnatrz` są mapowane na pliki:

- `src/FabrykaRolet.Web/wwwroot/images/house/exterior-front.png`
- `src/FabrykaRolet.Web/wwwroot/images/house/exterior-taras.png`
- `src/FabrykaRolet.Web/wwwroot/images/house/exterior-tyl.png`
- `src/FabrykaRolet.Web/wwwroot/images/house/exterior-garaz.png`

Współrzędne hotspotów są przechowywane w
`src/FabrykaRolet.Infrastructure/Repositories/InMemoryHouseViewRepository.cs`
jako punkty wielokątów w procentach (`X`, `Y` w skali `0-100`), więc po podmianie
renderów wystarczy skorygować liczby bez zmian w JS.
