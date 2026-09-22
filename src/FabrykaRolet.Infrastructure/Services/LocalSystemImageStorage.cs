using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;

namespace FabrykaRolet.Infrastructure.Services;

public sealed class LocalSystemImageStorage(
    IWebHostEnvironment environment,
    IOptions<SystemImageStorageOptions> options)
{
    private static readonly HashSet<string> AllowedExtensions = new(StringComparer.OrdinalIgnoreCase)
    {
        ".jpg", ".jpeg", ".png", ".webp"
    };

    public async Task<string> SaveAsync(IFormFile file, CancellationToken cancellationToken)
    {
        var extension = Path.GetExtension(file.FileName);
        if (string.IsNullOrWhiteSpace(extension) || !AllowedExtensions.Contains(extension))
        {
            throw new InvalidOperationException("Dozwolone są tylko pliki JPG, PNG lub WEBP.");
        }

        if (file.Length <= 0 || file.Length > 10 * 1024 * 1024)
        {
            throw new InvalidOperationException("Plik musi mieć rozmiar od 1 B do 10 MB.");
        }

        var rootPath = environment.WebRootPath ?? throw new InvalidOperationException("Brak ścieżki do wwwroot.");
        var relativeDirectory = options.Value.RelativeDirectory.Trim('/').Replace('\\', '/');
        var physicalDirectory = Path.Combine(rootPath, relativeDirectory.Replace('/', Path.DirectorySeparatorChar));
        Directory.CreateDirectory(physicalDirectory);

        var safeBaseName = Path.GetFileNameWithoutExtension(file.FileName);
        safeBaseName = new string(safeBaseName.Where(char.IsLetterOrDigit).ToArray());
        if (string.IsNullOrWhiteSpace(safeBaseName))
        {
            safeBaseName = "system";
        }

        var fileName = $"{Guid.NewGuid():N}-{safeBaseName[..Math.Min(40, safeBaseName.Length)]}{extension.ToLowerInvariant()}";
        var path = Path.Combine(physicalDirectory, fileName);

        await using var stream = File.Create(path);
        await file.CopyToAsync(stream, cancellationToken);
        return fileName;
    }

    public void DeleteIfExists(string fileName)
    {
        if (string.IsNullOrWhiteSpace(fileName))
        {
            return;
        }

        var rootPath = environment.WebRootPath ?? throw new InvalidOperationException("Brak ścieżki do wwwroot.");
        var relativeDirectory = options.Value.RelativeDirectory.Trim('/').Replace('\\', '/');
        var physicalDirectory = Path.Combine(rootPath, relativeDirectory.Replace('/', Path.DirectorySeparatorChar));
        var path = Path.Combine(physicalDirectory, Path.GetFileName(fileName));

        if (File.Exists(path))
        {
            File.Delete(path);
        }
    }

    public string BuildPublicPath(string fileName)
    {
        var relativeDirectory = options.Value.RelativeDirectory.Trim('/').Replace('\\', '/');
        return $"/{relativeDirectory}/{Path.GetFileName(fileName)}";
    }
}
