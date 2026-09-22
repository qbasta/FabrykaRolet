// Ten plik istnieje wyłącznie po to, żeby Vite miał wejście JS do przetworzenia CSS
// (build.lib wymaga wejścia JS, nie samego CSS). Sam plik .js z tego wejścia jest pusty
// i nigdy nie jest ładowany - liczy się tylko wyekstrahowany tailwind.css obok niego.
import "./tailwind.css";
