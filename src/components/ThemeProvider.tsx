import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  startTransition,
  type ReactNode,
} from "react";

type Theme = "light" | "dark";
const ThemeContext = createContext({
  theme: "light" as Theme,
  toggle: () => {},
});
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const current = document.documentElement.dataset.theme;
    startTransition(() => {
      setTheme(current === "dark" ? "dark" : "light");
      setReady(true);
    });
  }, []);
  useEffect(() => {
    if (!ready) return;
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", theme === "dark" ? "#0d0f12" : "#f7f5f0");
    try {
      localStorage.setItem("altivon-theme", theme);
    } catch {
      /* A blocked storage setting must not disable the theme control. */
    }
  }, [theme, ready]);
  const value = useMemo(
    () => ({
      theme,
      toggle: () =>
        setTheme((current) => (current === "dark" ? "light" : "dark")),
    }),
    [theme],
  );
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
export function ThemeToggle() {
  const { theme, toggle } = useContext(ThemeContext);
  const label =
    theme === "dark" ? "Switch to light theme" : "Switch to dark theme";
  return (
    <button
      className="theme-toggle"
      type="button"
      aria-label={label}
      title={label}
      aria-pressed={theme === "dark"}
      onClick={toggle}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        {theme === "dark" ? (
          <>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
          </>
        ) : (
          <path d="M20.6 13.1A8.7 8.7 0 0 1 10.9 3.4 8.8 8.8 0 1 0 20.6 13.1Z" />
        )}
      </svg>
    </button>
  );
}
