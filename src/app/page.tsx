"use client"

import { AuroraText } from "@/components/ui/aurora-text";
import { Backlight } from "@/components/ui/backlight";
import { Lottie, LottieDisplay } from "lottie-react";
import { useLocale, useTranslations } from "next-intl";
import { Typewriter } from "react-simple-typewriter";

import LogoLoop from "@/components/react-bits/LogoLoop";
import { SiNextdotjs, SiTypescript, SiTailwindcss, SiShadcnui, SiLucide } from 'react-icons/si';
import { useMemo } from "react";
import { MagicUiIcon, ReactBitsIcon, NextIntlIcon, PacocourseyIcon, LucideIcon, MotionIcon, RadixUiIcon, LottieReactIcon } from "@/components/global/icons";
import Link from "next/link";

export default function Home() {
  const translations = useTranslations('HomePage');
  const locale = useLocale();

  const techLogos = useMemo(() => [
    { node: <SiNextdotjs size={24} />, title: "Next.js", href: "https://nextjs.org" },
    { node: <SiTypescript size={24} />, title: "TypeScript", href: "https://www.typescriptlang.org", hoverColor: "#3178c6" },
    { node: <SiTailwindcss size={24} />, title: "Tailwind CSS", href: "https://tailwindcss.com", hoverColor: "#38bdf8" },
    { node: <SiShadcnui size={24} />, title: "Shadcn", href: "https://ui.shadcn.com" },
    { node: <MagicUiIcon size={24} className="grayscale hover:grayscale-0"/>, title: "MagicUI", href: "https://magicui.design" },
    { node: <ReactBitsIcon size={24}/>, title: "React Bits", href: "https://www.reactbits.dev" },
    { node: <NextIntlIcon size={24} className="grayscale hover:grayscale-0" />, title: "Next-intl", href: "https://next-intl.dev" },
    { node: <PacocourseyIcon size={24} />, title: "Next-themes", href: "https://github.com/pacocoursey/next-themes" },
    { node: <LucideIcon size={24} className="grayscale hover:grayscale-0" />, title: "Lucide", href: "https://lucide.dev" },
    { node: <MotionIcon size={24} />, title: "Motion", href: "https://motion.dev" },
    { node: <RadixUiIcon size={24} />, title: "Radix UI", href: "https://www.radix-ui.com" },
    { node: <LottieReactIcon size={24} className="grayscale hover:grayscale-0" />, title: "Lottie React", href: "https://lottiereact.com" },
  ], []);

  return (
    <div className="flex-1 flex flex-col w-full">
      <div className="flex-1 flex gap-2 flex-col sm:flex-row">
        <div className="w-full mx-auto text-left text-lg sm:text-2xl">
          <div>
            {translations.rich("welcome", {name: () => <AuroraText>FlizzerMDX</AuroraText>})}
          </div>
          {translations("iam.begin")}
          <Typewriter words={translations.raw("iam.tags") as string[]} cursor cursorColor="white" cursorStyle="▌" loop />
        </div>

        <div className="flex items-center justify-center h-full">
          <Link target="_blank" href={`https://${locale || "fr"}.wikipedia.org/wiki/Rick_et_Morty`}>
            <Backlight blur={8}>
              <Lottie src="/rick.json" className="size-52 sm:size-78" autoplay loop>
                <LottieDisplay/>
              </Lottie>
            </Backlight>
          </Link>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center gap-4 mt-2">
        <span className="font-bold text-xl">Build with</span>
        <div className="w-full max-w-2xl mx-auto overflow-hidden">
          <LogoLoop
            logos={techLogos}
            speed={35}
            direction="left"
            logoHeight={24}
            gap={56}
            hoverSpeed={0}
            scaleOnHover
            ariaLabel="Technology partners"
          />
        </div>
      </div>
    </div>

  );
}
