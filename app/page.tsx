import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import Navbar from "./_components/Navbar";
import Hero from "./_components/Hero";
import Cocktails from "./_components/Cocktails";
import About from "./_components/About";

gsap.registerPlugin(ScrollTrigger,SplitText)

export default function Home() {
  return (
    <main>
      <Navbar/>
      <Hero/>
      <Cocktails/>
      <About/>
    </main>
  );
}
