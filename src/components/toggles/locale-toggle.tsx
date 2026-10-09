"use client";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useTransition } from "react";
import type { Locale } from "next-intl";
import { Languages } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { setUserLocale } from "@/services/locale";

export const LocaleToggle = () => {
  const [language, setLanguage] = useState(useLocale());

  const translations = useTranslations("Header.locale");

  const [, startTransition] = useTransition();

  const langFlag = {
    fr: "🇫🇷",
    en: "🇺🇸",
  };

  function changeLocale(value: string) {
    const locale = value as Locale;
    startTransition(() => {
      setUserLocale(locale);
    });
  }

  useEffect(() => {
    changeLocale(language);
  }, [language]);

  const TranslationRow = ({ lang }: { lang: string }) => {
    return (
      <DropdownMenuRadioItem value={lang}>
        <span className="flex items-center gap-2">
          <span>{langFlag[lang as keyof typeof langFlag]}</span>
          <span>{translations(lang)}</span>
        </span>
      </DropdownMenuRadioItem>
    );
  };

  // from https://www.shadcn.io/blocks/dialog-language-switch
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Languages className="h-4 w-4" />
          <span className="hidden sm:block">{translations(language)}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        <DropdownMenuLabel>{translations("langselector")}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup onValueChange={setLanguage} value={language}>
          {["fr", "en"].map((lang) => (
            <TranslationRow key={lang} lang={lang} />
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
