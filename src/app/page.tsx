"use client"

import { AuroraText } from "@/components/ui/aurora-text";
import { Backlight } from "@/components/ui/backlight";
import { Lottie, LottieDisplay } from "lottie-react";
import { useTranslations } from "next-intl";
import { Typewriter } from "react-simple-typewriter";

export default function Home() {
  const translations = useTranslations('HomePage');
  return (
    <div className="flex-1 flex gap-2 flex-col sm:flex-row">
      <div className="w-full mx-auto text-left text-lg sm:text-2xl">
        <div>
          {translations.rich("welcome", {name: () => <AuroraText>FlizzerMDX</AuroraText>})}
        </div>
        {translations("iam.begin")}
        <Typewriter words={translations.raw("iam.tags") as string[]} cursor cursorColor="white" cursorStyle="▌" loop />
      </div>

      <Backlight blur={8}>
        <Lottie src="/rick.json" className="size-78" autoplay loop>
          <LottieDisplay/>
        </Lottie>
      </Backlight>
    </div>
  );
}
