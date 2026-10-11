"use client"

import config from "@/config.json"
import { useTranslations } from "next-intl";

export default function Footer() {
  const translations = useTranslations("Footer");
  return (
    <footer className="flex flex-col items-center gap-6 border-t border-border py-6">
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        {translations("label", {developer: config.github.profile.username})}
      </p>
    </footer>
  );
}
