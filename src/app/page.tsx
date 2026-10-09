"use client"

import { AuroraText } from "@/components/ui/aurora-text";
import { Backlight } from "@/components/ui/backlight";
import { Lottie, LottieDisplay } from "lottie-react";
import { useTranslations } from "next-intl";
import { Typewriter } from "react-simple-typewriter";

export default function Home() {
  const iam = useTranslations('HomePage.iam');
  return (
    <div>
      <div className="flex gap-2 flex-col sm:flex-row">
        <div className="w-full mx-auto text-left text-lg sm:text-2xl">
          <div>
            Hello There ! My name is <AuroraText>FlizzerMDX</AuroraText>
          </div>
          {iam("begin")}
          <Typewriter words={[iam("developer") || "developer", iam("gamer") || "gamer", iam("javascript") || "javascript"]} cursor cursorColor="white" cursorStyle="▌" loop />
        </div>

        <Backlight blur={8}>
          <Lottie src="/rick.json" autoplay loop>
            <LottieDisplay/>
          </Lottie>
        </Backlight>
      </div>
    </div>
  );
}
