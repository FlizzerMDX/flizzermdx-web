"use client"

import { useTheme } from "next-themes";
import RotatingText from "../react-bits/RotatingText";
import { useEffect, useState } from "react";

export default function RotateTech({ techs }: { techs: string[] }) {
  const { theme = "dark" } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const setMount = () => {
      setMounted(true);
    };
    setMount();
  }, []);
  const highlightColor = !mounted
      ? "transparent"
      : theme === "dark" ? "#262626" : "#f5f5f5"
  return (theme ?
    <RotatingText
      texts={techs}
      effect="flip"
      direction="up"
      highlight
      highlightColor={highlightColor}
      staggerFrom="last"
      staggerDuration={0.025}
      splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
      rotationInterval={2000}
      splitBy="characters"
      blur={0}
      auto
      loop
      pauseOnHover={false}
    />
    : <></>)
}
