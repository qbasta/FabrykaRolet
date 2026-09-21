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
