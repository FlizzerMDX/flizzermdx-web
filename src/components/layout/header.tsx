"use client"

import config from "@/config.json"
import { ArrowUpRightIcon, Globe, StarIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ThemeToggle } from "../toggles/theme-toggle";
import { LocaleToggle } from "../toggles/locale-toggle";
import { Button } from "../ui/button";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { NumberTicker } from "../ui/number-ticker";
import Link from "next/link";
import { ScrollProgress } from "../ui/scroll-progress";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { getStars } from "@/lib/github";
import { AuroraText } from "../ui/aurora-text";

export default function Header() {
  const path = usePathname();
  const [starsCount, setStarsCount] = useState(0);
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const translations = useTranslations("Header");

  const tabs = [
    { label: translations("home"), value: "home", href: "/" },
    { label: translations("projects"), value: "projects", href: "/projects" },
    { label: translations("about"), value: "about", href: "/about" },
    { label: translations("contact"), value: "contact", href: "/contact" },
  ];

  useEffect(() => {
    const fetchStarsCount = async () => {
      const stars = await getStars(config.github.project.owner, config.github.project.repo);
      setStarsCount(stars);
    };
    fetchStarsCount();
  }, []);

  return (
    <>
      <header className="flex flex-row justify-between px-4 pt-4 bg-background">
        <div className="flex flex-row gap-2 items-center select-none">
          <Globe color="#999999" />
          <span className="font-semibold">
            /
          </span>
          <Link href={config.github.profile.url} className="text-sm font-medium">
            <AuroraText>@{config.github.profile.username}</AuroraText>
          </Link>
        </div>
        <div className="flex flex-row gap-2">
          <ThemeToggle />
          <LocaleToggle />
          <Button variant="outline" asChild>
            <Link href={`https://github.com/${config.github.project.owner}/${config.github.project.repo}`} target="_blank" className="flex items-center">
              <GitHubLogoIcon />
              <StarIcon fill="currentColor" size={16} className="text-yellow-500 mr-1 hidden sm:block" />
              <NumberTicker
                value={starsCount}
                className="hidden sm:block font-medium tracking-tighter whitespace-pre-wrap"
              />
              <ArrowUpRightIcon size={16} />
            </Link>
          </Button>
        </div>
      </header>

      <div className="sticky top-0 z-50 border-b bg-background header-div">
        <nav className="flex items-center p-2" onMouseLeave={() => setActiveTab(null)}>
          {
            tabs.map((tab) => (
              <Link
                key={tab.label}
                href={tab.href}
                className="relative rounded-lg px-4 py-2"
                onMouseEnter={() => setActiveTab(tab.href)}
              >

                {activeTab === tab.href && (
                  <motion.span
                    layoutId="nav-background"
                    className="absolute inset-0 -z-10 rounded-lg bg-accent"
                    transition={{
                      type: "spring",
                      stiffness: 450,
                      damping: 35,
                    }}
                  />
                )}

                <span className={cn("block sm:text-sm text-[12px] text-zinc-500 relative z-10", tab.href === path ? "font-bold text-foreground" : "")}>
                  {tab.label}
                </span>

              </Link>
            ))
          }
        </nav>
        <ScrollProgress className="sticky" key={path} />
      </div>
    </>
  )
}
