import { AnimatedSpan, Terminal, TypingAnimation } from "@/components/ui/terminal";
import config from "@/config.json"
import Link from "next/link";

const About = () => {
  return (
    <div className="flex flex-row justify-between items-center flex-1">
      <Terminal>
        <TypingAnimation>$ cat identity/name.txt</TypingAnimation>

        <AnimatedSpan className="text-green-500">
          ✔ Aloïs Menoud
        </AnimatedSpan>

        <TypingAnimation>$ cat identity/age.txt</TypingAnimation>

        <AnimatedSpan className="text-green-500">
          ✔ {new Date().getFullYear() - 2005} ans
        </AnimatedSpan>

        <TypingAnimation>$ cat identity/os.txt</TypingAnimation>

        <AnimatedSpan className="text-green-500 block!">
          ✔ I use <Link href="https://omarchy.org/" target="_blank" className="hover:underline">Omarchy</Link> btw
        </AnimatedSpan>

        <TypingAnimation>$ cat identity/ide.txt</TypingAnimation>

        <AnimatedSpan className="text-green-500 block!">
          ✔ I use <Link href="https://zed.dev/" target="_blank" className="hover:underline">Zed</Link> btw
        </AnimatedSpan>

        <TypingAnimation>$ cat identity/socials.txt</TypingAnimation>

        <AnimatedSpan className="text-blue-500">
          <span>ℹ Social media:</span>
          {
            Object.entries(config.socials).map(([name, value]) => (
              <span className="pl-2" key={name}>-{" "}
                <Link href={value.url || ""} target="_blank" className="hover:underline">{value.label}</Link>
              </span>
            ))
          }
        </AnimatedSpan>

        <TypingAnimation className="text-muted-foreground">
          Profile initialization completed !
        </TypingAnimation>

        <TypingAnimation className="text-muted-foreground">
          Take a look at my portfolio.
        </TypingAnimation>
      </Terminal>

      <span></span>
    </div>
  )
}

export default About;
