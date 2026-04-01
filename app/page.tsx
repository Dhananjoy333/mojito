import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import Navbar from "./_components/Navbar";
import Hero from "./_components/Hero";
import Cocktails from "./_components/Cocktails";
import About from "./_components/About";
import Art from "./_components/Art";
import Menu from "./_components/Menu";

gsap.registerPlugin(ScrollTrigger,SplitText)

export default function Home() {
  return (
    <main>
      <Navbar/>
      <Hero/>
      <Cocktails/>
      <About/>
      <Art/>
      <Menu/>
    </main>
  );
}
