"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { CssBaseline, PaletteMode } from "@mui/material";
import {
  ThemeProvider as MuiThemeProvider,
  Theme,
  createTheme,
  responsiveFontSizes,
} from "@mui/material/styles";
import { BRAND_COLORS, darkPalette, lightPalette } from "./palette";
import { typography } from "./typography";

export interface ColorModeContextValue {
  mode: PaletteMode;
  setMode: (mode: PaletteMode) => void;
  toggleColorMode: () => void;
}

export const ColorModeContext = createContext<ColorModeContextValue>({
  mode: "light",
  setMode: () => undefined,
  toggleColorMode: () => undefined,
});

const STORAGE_KEY = "lern-color-mode";

const buildTheme = (mode: PaletteMode): Theme => {
  const palette = mode === "light" ? lightPalette : darkPalette;
  const isLight = mode === "light";

  return responsiveFontSizes(
    createTheme({
      palette,
      typography,
      shape: {
        borderRadius: 18,
      },
      components: {
        MuiButton: {
          styleOverrides: {
            root: {
              borderRadius: 999,
              paddingInline: "1.5rem",
              paddingBlock: "0.75rem",
              boxShadow: "none",
            },
            containedPrimary: {
              color: isLight ? BRAND_COLORS.neutralDark : BRAND_COLORS.neutralLight,
            },
          },
        },
        MuiAppBar: {
          defaultProps: {
            color: "transparent",
            elevation: 0,
          },
        },
        MuiPaper: {
          styleOverrides: {
            root: {
              borderRadius: 20,
              backgroundImage: "none",
            },
          },
        },
        MuiCssBaseline: {
          styleOverrides: {
            body: {
              backgroundColor: palette.background?.default,
              color: palette.text?.primary,
            },
          },
        },
        MuiLink: {
          defaultProps: {
            underline: "hover",
          },
        },
        MuiIconButton: {
          styleOverrides: {
            root: {
              borderRadius: 16,
            },
          },
        },
        MuiListItem: {
          styleOverrides: {
            root: {
              borderRadius: 12,
            },
          },
        },
        MuiChip: {
          styleOverrides: {
            root: {
              borderRadius: 12,
            },
          },
        },
        MuiLinearProgress: {
          styleOverrides: {
            root: {
              borderRadius: 999,
              height: 6,
            },
            bar: {
              borderRadius: 999,
            },
          },
        },
        MuiSwitch: {
          styleOverrides: {
            track: {
              borderRadius: 999,
            },
          },
        },
      },
      shadows: [
        "none",
        "0px 10px 30px rgba(15, 23, 42, 0.07)",
        "0px 20px 40px rgba(15, 23, 42, 0.08)",
        ...Array(22).fill("0px 24px 40px rgba(15, 23, 42, 0.1)"),
      ] as Theme["shadows"],
    })
  );
};

type AppThemeProviderProps = {
  initialMode?: PaletteMode;
  children: React.ReactNode;
};

export function AppThemeProvider({ initialMode = "light", children }: AppThemeProviderProps) {
  const [mounted, setMounted] = useState(false);
  const [mode, setMode] = useState<PaletteMode>(initialMode);

  useEffect(() => {
    setMounted(true);
    // Only run on client
    const storedMode = window.localStorage.getItem(STORAGE_KEY) as PaletteMode | null;
    if (storedMode) {
      setMode(storedMode);
    }
  }, []);

  const handleSetMode = useCallback((nextMode: PaletteMode) => {
    setMode(nextMode);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, nextMode);
    }
  }, []);

  const toggleColorMode = useCallback(() => {
    setMode((prevMode) => {
      const next = prevMode === "light" ? "dark" : "light";
      if (typeof window !== "undefined") {
        window.localStorage.setItem(STORAGE_KEY, next);
      }
      return next;
    });
  }, []);

  const theme = useMemo(() => buildTheme(mode), [mode]);

  const value = useMemo(
    () => ({
      mode,
      setMode: handleSetMode,
      toggleColorMode,
    }),
    [mode, handleSetMode, toggleColorMode]
  );

  // Prevent hydration mismatch by not rendering theme until mounted
  if (!mounted) {
    return (
      <ColorModeContext.Provider value={value}>
        <MuiThemeProvider theme={buildTheme(initialMode)}>
          <CssBaseline />
          {children}
        </MuiThemeProvider>
      </ColorModeContext.Provider>
    );
  }

  return (
    <ColorModeContext.Provider value={value}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ColorModeContext.Provider>
  );
}

export function useColorMode() {
  const context = useContext(ColorModeContext);
  if (!context) {
    throw new Error("useColorMode must be used within an AppThemeProvider");
  }
  return context;
}

export { BRAND_COLORS } from "./palette";
