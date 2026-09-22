using FabrykaRolet.Application.Sections;
using FabrykaRolet.Domain.Repositories;
using FabrykaRolet.Infrastructure.Data;
using FabrykaRolet.Infrastructure.Identity;
using FabrykaRolet.Infrastructure.Repositories;
using FabrykaRolet.Infrastructure.Services;
using FabrykaRolet.Web.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Npgsql;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddRazorPages(options =>
{
    options.Conventions.AuthorizeFolder("/Admin");
    options.Conventions.AllowAnonymousToPage("/Admin/Login");
});

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
if (string.IsNullOrWhiteSpace(connectionString))
{
    var dbHost = builder.Configuration["Database:Host"];
    var dbName = builder.Configuration["Database:Name"];
    var dbUser = builder.Configuration["Database:User"];
    var dbPassword = builder.Configuration["Database:Password"];
    var dbPort = builder.Configuration["Database:Port"] ?? "5432";

    if (!string.IsNullOrWhiteSpace(dbHost)
        && !string.IsNullOrWhiteSpace(dbName)
        && !string.IsNullOrWhiteSpace(dbUser)
        && !string.IsNullOrWhiteSpace(dbPassword))
    {
        if (!int.TryParse(dbPort, out var parsedPort))
        {
            throw new InvalidOperationException("Database:Port musi być poprawną liczbą całkowitą.");
        }

        connectionString = new Npgsql.NpgsqlConnectionStringBuilder
        {
            Host = dbHost,
            Port = parsedPort,
            Database = dbName,
            Username = dbUser,
            Password = dbPassword,
        }.ConnectionString;
    }
}

var useInMemoryFallback = builder.Configuration.GetValue<bool>("Persistence:UseInMemoryFallback");

builder.Services.AddDbContext<AppDbContext>(options =>
{
    if (!string.IsNullOrWhiteSpace(connectionString))
    {
        options.UseNpgsql(connectionString);
        return;
    }

    if (!useInMemoryFallback)
    {
        throw new InvalidOperationException("Brak ConnectionStrings:DefaultConnection. Skonfiguruj PostgreSQL albo włącz Persistence:UseInMemoryFallback tylko do świadomego developmentu.");
    }

    options.UseInMemoryDatabase("fabrykarolet-dev");
});

builder.Services.Configure<AdminSeedOptions>(builder.Configuration.GetSection(AdminSeedOptions.SectionName));
builder.Services.Configure<SystemImageStorageOptions>(builder.Configuration.GetSection(SystemImageStorageOptions.SectionName));

builder.Services
    .AddIdentity<AdminUser, IdentityRole>(options =>
    {
        options.Password.RequiredLength = 10;
        options.Password.RequireDigit = true;
        options.Password.RequireUppercase = true;
        options.Password.RequireLowercase = true;
        options.Password.RequireNonAlphanumeric = false;
        options.Lockout.MaxFailedAccessAttempts = 5;
        options.User.RequireUniqueEmail = true;
    })
    .AddEntityFrameworkStores<AppDbContext>()
    .AddDefaultTokenProviders();

builder.Services.ConfigureApplicationCookie(options =>
{
    options.LoginPath = "/Admin/Login";
    options.AccessDeniedPath = "/Admin/Login";
    options.Cookie.Name = "fabrykarolet.admin";
    options.SlidingExpiration = true;
});

builder.Services.AddScoped<ApplicationDbInitializer>();
builder.Services.AddScoped<SiteContentService>();
builder.Services.AddScoped<SystemImageReadService>();
builder.Services.AddScoped<LocalSystemImageStorage>();

builder.Services.AddScoped<IWindowSystemRepository, EfWindowSystemRepository>();
builder.Services.AddSingleton<IHouseViewRepository, InMemoryHouseViewRepository>();
builder.Services.AddScoped<SectionPageService>();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var initializer = scope.ServiceProvider.GetRequiredService<ApplicationDbInitializer>();
    await initializer.InitializeAsync();
}

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();
app.MapRazorPages();

app.Run();
