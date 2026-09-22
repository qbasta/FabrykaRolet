using System.ComponentModel.DataAnnotations;
using FabrykaRolet.Infrastructure.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace FabrykaRolet.Web.Pages.Admin;

[AllowAnonymous]
public sealed class LoginModel(SignInManager<AdminUser> signInManager) : PageModel
{
    [BindProperty] public InputModel Input { get; set; } = new();
    public string? Message { get; private set; }

    public void OnGet()
    {
        if (!string.IsNullOrWhiteSpace(Request.Query["message"]))
        {
            Message = Request.Query["message"]!;
        }
    }

    public async Task<IActionResult> OnPostAsync(string? returnUrl = null)
    {
        if (!ModelState.IsValid)
        {
            return Page();
        }

        var result = await signInManager.PasswordSignInAsync(Input.UserName, Input.Password, false, lockoutOnFailure: true);
        if (result.Succeeded)
        {
            return LocalRedirect(returnUrl ?? Url.Page("/Admin/Index")!);
        }

        ModelState.AddModelError(string.Empty, "Nieprawidłowy login lub hasło.");
        return Page();
    }

    public async Task<IActionResult> OnPostLogoutAsync()
    {
        await signInManager.SignOutAsync();
        return RedirectToPage("/Admin/Login", new { message = "Wylogowano z panelu administratora." });
    }

    public sealed class InputModel
    {
        [Required] public string UserName { get; set; } = string.Empty;
        [Required, DataType(DataType.Password)] public string Password { get; set; } = string.Empty;
    }
}
