using FabrykaRolet.Domain.Repositories;
using FabrykaRolet.Infrastructure.Repositories;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddRazorPages();

// Repozytoria - implementacja in-memory na start. Podmiana na EF/Postgres w przyszłości
// wymaga zmiany tylko tych dwóch rejestracji, bez dotykania Pages.
builder.Services.AddSingleton<IWindowSystemRepository, InMemoryWindowSystemRepository>();
builder.Services.AddSingleton<IHouseViewRepository, InMemoryHouseViewRepository>();

var app = builder.Build();

app.UseStaticFiles();
app.UseRouting();
app.MapRazorPages();

app.Run();
