import { Lottie } from "lottie-react";

export default function NotFound() {
  return (
    <div className="flex-1 flex justify-center items-center">
      <Lottie src="404.json" autoplay loop className="dark:invert sm:w-150! sm:h-75! mx-auto"/>
    </div>
  )
}
