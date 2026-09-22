# Fabryka Rolet — lokalne uruchomienie brancha `admin-panel`

## 1. Przełączenie na branch

```bash
git fetch origin
git switch admin-panel
```

## 2. Najprostsze uruchomienie lokalne: Docker Compose

Repozytorium ma jeden kanoniczny plik Compose: `compose.yaml`.

```bash
docker compose up --build
```

Po starcie:

- strona publiczna: `http://localhost:5080`
- panel administratora: `http://localhost:5080/Admin`
- logowanie administratora: `http://localhost:5080/Admin/Login`

Compose uruchamia:

- PostgreSQL
- aplikację ASP.NET Core

## 3. Konto administratora

Nie ma publicznej rejestracji kont administratora ani zwykłych użytkowników.
Konto admina jest tworzone lub aktualizowane automatycznie przy starcie aplikacji
na podstawie zmiennych środowiskowych.

Możesz ustawić własne dane logowania lokalnie:

macOS / Linux:

```bash
export FABRYKAROLET_ADMIN_USERNAME="twoj-login"
export FABRYKAROLET_ADMIN_EMAIL="twoj@email.pl"
export FABRYKAROLET_ADMIN_PASSWORD="TwojeSilneHaslo123"
docker compose up --build
```

Windows PowerShell:

```powershell
$env:FABRYKAROLET_ADMIN_USERNAME="twoj-login"
$env:FABRYKAROLET_ADMIN_EMAIL="twoj@email.pl"
$env:FABRYKAROLET_ADMIN_PASSWORD="TwojeSilneHaslo123"
docker compose up --build
```

Możesz też ustawić własne dane PostgreSQL:

macOS / Linux:

```bash
export FABRYKAROLET_POSTGRES_DB="fabrykarolet"
export FABRYKAROLET_POSTGRES_USER="fabrykarolet"
export FABRYKAROLET_POSTGRES_PASSWORD="lokalne-haslo-dev"
docker compose up --build
```

Windows PowerShell:

```powershell
$env:FABRYKAROLET_POSTGRES_DB="fabrykarolet"
$env:FABRYKAROLET_POSTGRES_USER="fabrykarolet"
$env:FABRYKAROLET_POSTGRES_PASSWORD="lokalne-haslo-dev"
docker compose up --build
```

## 4. Ważne ostrzeżenie o sekretach

Domyślne hasła z `compose.yaml` są oznaczone jako **development-only** i służą
wyłącznie do lokalnego uruchomienia.

Przed jakimkolwiek wdrożeniem:

- ustaw własne wartości w zmiennych środowiskowych hostingu,
- nie zostawiaj domyślnych haseł administratorskich ani bazodanowych,
- nie commituj prawdziwych sekretów do repozytorium.

## 5. Zdjęcia systemów

Seedowane obrazy systemów są dostępne publicznie po starcie aplikacji.

Upload zdjęć w panelu admina działa lokalnie i zapisuje pliki w katalogu aplikacji.
To rozwiązanie jest wygodne do developmentu, ale **nie jest docelowym storage
produkcyjnym**. Pliki zapisane wewnątrz kontenera Rendera lub innego hostingu
kontenerowego nie powinny być traktowane jako trwałe miejsce przechowywania.

## 6. Uwagi praktyczne

- panel admina jest celowo ukryty przed zwykłą nawigacją publicznej strony,
- `/Admin/Login` jest dostępne anonimowo,
- pozostałe `/Admin/*` wymagają zalogowania,
- na telefonie i tablecie panel nie udostępnia edycji; formularze są dostępne
  wyłącznie na komputerze,
- publiczna część strony pozostaje mobilna.
