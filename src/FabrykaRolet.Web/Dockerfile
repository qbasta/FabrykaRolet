# ---------- 1. Budowanie frontendu Vite / TypeScript ----------
FROM node:22-alpine AS frontend

WORKDIR /src/src/FabrykaRolet.Web/client

COPY src/FabrykaRolet.Web/client/package*.json ./
RUN npm install

COPY src/FabrykaRolet.Web/client/ ./

# Tailwind musi mieć dostęp do plików Razor,
# ponieważ tailwind.css używa @source "../../Pages/**/*.cshtml".
COPY src/FabrykaRolet.Web/Pages/ /src/src/FabrykaRolet.Web/Pages/

RUN npm run build

# ---------- 2. Runtime ASP.NET Core ----------
FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS base

WORKDIR /app
EXPOSE 8080

# ---------- 3. Build aplikacji .NET ----------
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build

ARG BUILD_CONFIGURATION=Release
WORKDIR /src

COPY ["src/FabrykaRolet.Web/FabrykaRolet.Web.csproj", "src/FabrykaRolet.Web/"]
COPY ["src/FabrykaRolet.Domain/FabrykaRolet.Domain.csproj", "src/FabrykaRolet.Domain/"]
COPY ["src/FabrykaRolet.Application/FabrykaRolet.Application.csproj", "src/FabrykaRolet.Application/"]
COPY ["src/FabrykaRolet.Infrastructure/FabrykaRolet.Infrastructure.csproj", "src/FabrykaRolet.Infrastructure/"]

RUN dotnet restore "src/FabrykaRolet.Web/FabrykaRolet.Web.csproj"

COPY . .

COPY --from=frontend \
    /src/src/FabrykaRolet.Web/wwwroot/dist \
    ./src/FabrykaRolet.Web/wwwroot/dist

WORKDIR /src/src/FabrykaRolet.Web

RUN dotnet publish FabrykaRolet.Web.csproj \
    -c $BUILD_CONFIGURATION \
    -o /app/publish \
    /p:UseAppHost=false \
    --no-restore

# ---------- 4. Finalny kontener ----------
FROM base AS final

WORKDIR /app
COPY --from=build /app/publish .

ENV ASPNETCORE_ENVIRONMENT=Production

ENTRYPOINT ["sh", "-c", "dotnet FabrykaRolet.Web.dll --urls http://0.0.0.0:${PORT:-8080}"]
