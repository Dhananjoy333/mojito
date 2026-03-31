import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";

gsap.registerPlugin(ScrollTrigger,SplitText)

export default function Home() {
  return (
    <div className="flex-center h-[100vh]">
      Hello
    </div>
  );
}
