"use client";

import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";

gsap.registerPlugin(ScrollTrigger, SplitText);

const Hero = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const isMobile = useMediaQuery({ maxWidth: 767 });

  useGSAP(() => {
    const heroSplit = new SplitText(".title", {
      type: "chars, words",
    });

    const paragraphSplit = new SplitText(".subtitle", {
      type: "lines",
    });

    // Apply text-gradient class once before animating
    heroSplit.chars.forEach((char) => char.classList.add("text-gradient"));

    gsap.from(heroSplit.chars, {
      yPercent: 100,
      duration: 1.8,
      ease: "expo.out",
      stagger: 0.06,
    });

    gsap.from(paragraphSplit.lines, {
      opacity: 0,
      yPercent: 100,
      duration: 1.8,
      ease: "expo.out",
      stagger: 0.06,
      delay: 1,
    });

    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      })
      .to(".right-leaf", { y: 200 }, 0)
      .to(".left-leaf", { y: -200 }, 0);
    // .to(".arrow", { y: 100 }, 0);

    const setupVideoScrub = () => {
      if (!videoRef.current) return;

      const startValue = isMobile ? "top 50%" : "center 60%";
      const endValue = isMobile ? "120% top" : "bottom top";

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "video",
          start: startValue,
          end: endValue,
          scrub: true,
          pin: true,
        },
      });

      tl.to(videoRef.current, {
        currentTime: videoRef.current.duration,
      });
    };

    if (videoRef.current) {
      // Fix 3: guard against already-loaded metadata
      if (videoRef.current.readyState >= 1) {
        setupVideoScrub();
      } else {
        videoRef.current.addEventListener("loadedmetadata", setupVideoScrub, {
          once: true,
        });
      }
    }
  }, [isMobile]);

  return (
    <>
      <section id="hero" className="noisy">
        <h1 className="title">MOJITO</h1>

        <Image
          src="/images/hero-left-leaf.png"
          alt="left-leaf"
          width={300}
          height={300}
          className="left-leaf"
        />

        <Image
          src="/images/hero-right-leaf.png"
          alt="right-leaf"
          width={300}
          height={300}
          className="right-leaf"
        />

        <div className="body">
          {/* <Image src="/images/arrow.png" alt="arrow" width={100} height={100} className="arrow" /> */}

          <div className="content">
            <div className="space-y-5 hidden md:block">
              <p>Cool. Crisp. Classic.</p>
              <p className="subtitle">
                Sip the Spirit <br /> of Summer
              </p>
            </div>

            <div className="view-cocktails">
              <p className="subtitle">
                Every cocktail on our menu is a blend of premium ingredients,
                creative flair, and timeless recipes — designed to delight your
                senses.
              </p>
              <a href="#cocktails">View cocktails</a>
            </div>
          </div>
        </div>
      </section>

      <div className="video absolute inset-0">
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          src="/videos/output.mp4"
        />
      </div>
    </>
  );
};

export default Hero;
