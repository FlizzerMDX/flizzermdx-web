import config from "@/config.json"

export default function Footer() {
  return (
    <footer className="flex flex-col items-center gap-6 border-t border-border py-6">
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        Made with ❤️ by {config.github.profile.username} ✨
      </p>
    </footer>
  );
}
