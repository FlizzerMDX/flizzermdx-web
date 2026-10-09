"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {

  React.useEffect(() => {
      document.body.classList.remove("preload-theme-remover");
    }, []);

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
