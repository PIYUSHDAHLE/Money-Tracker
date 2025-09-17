import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import {
  Users,
  Target,
  TrendingUp,
  Lightbulb,
  Shield,
  Star,
  Globe2,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function AboutUs() {
   const pageRef = useRef<HTMLDivElement | null>(null);
  const sectionRefs = useRef<HTMLDivElement[]>([]);
  const growthRef = useRef<HTMLDivElement>(null);

useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 1,
    });

    (window as any).lenis = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const hero = document.querySelector(".hero-section");
    if (hero) {
      setTimeout(() => {
        (lenis as any).scrollTo(hero, { duration: 1.0 });
      }, 40); 
    }

    const ctx = gsap.context(() => {
      gsap.from(".hero-text span", {
        yPercent: 120,
        opacity: 0,
        stagger: 0.3,
        duration: 1.2,
        ease: "power4.out",
      });

      gsap.from(".who-image", {
        scrollTrigger: {
          trigger: ".who-section",
          start: "top 80%",
          end: "bottom 70%",
          scrub: true,
        },
        y: 100,
        opacity: 0,
        scale: 0.9,
        ease: "power3.out",
      });

      gsap.from(".who-text", {
        scrollTrigger: {
          trigger: ".who-section",
          start: "top 75%",
        },
        x: -100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      const missionTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".mission-section",
          start: "top center",
          end: "bottom center",
          scrub: true,
          pin: true,
        },
      });

      missionTl.from(".mission-icon", {
        scale: 0,
        rotation: -180,
        opacity: 0,
        ease: "back.out(1.7)",
      });
      missionTl.from(".mission-text p", {
        y: 80,
        opacity: 0,
        stagger: 0.25,
        duration: 0.8,
        ease: "power3.out",
      });

      sectionRefs.current.forEach((el, i) => {
        if (!el) return;
        const img = el.querySelector(".vision-img");
        const content = el.querySelector(".vision-content");

        gsap.from(img, {
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          x: i % 2 === 0 ? -150 : 150,
          opacity: 0,
          duration: 1.2,
          ease: "power3.out",
        });

        gsap.from(content, {
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          x: i % 2 === 0 ? 150 : -150,
          opacity: 0,
          duration: 1.2,
          ease: "power3.out",
        });
      });

      if (growthRef.current) {
        const cards = growthRef.current.querySelectorAll(".growth-card");
        gsap.from(cards, {
          scrollTrigger: {
            trigger: growthRef.current,
            start: "top 80%",
          },
          y: 150,
          opacity: 0,
          rotateY: 30,
          transformOrigin: "center",
          stagger: 0.3,
          duration: 1.2,
          ease: "power3.out",
        });
      }
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const blocks = [
    {
      icon: <Lightbulb className="text-yellow-400 w-8 h-8" />,
      title: "Our Vision",
      align: "right",
      img: "/images/money-tracker-by-piyush-dahle-about-us-graph-chart-image.png",
      text: `Our vision is to revolutionize financial management by providing 
      modern, intuitive, and intelligent tools that simplify the complexities of money. 
      We believe financial growth shouldn’t be limited to professionals or experts but 
      should be accessible to everyone. With this mission, we create tools that foster 
      clarity, empower better decision-making, and promote confidence in handling 
      personal and business finances.`,
    },
    {
      icon: <Target className="text-blue-500 w-8 h-8" />,
      title: "Our Mission",
      align: "left",
      img: "/images/money-tracker-by-piyush-dahle-about-us-pie-chart-image.png",
      text: `Our mission is to create a seamless ecosystem for individuals and businesses 
      to monitor, analyze, and optimize their financial lives. We combine simplicity with 
      powerful insights so users can understand where their money goes, plan for the future, 
      and stay on track. Every feature we design creates lasting value—helping users save 
      time, reduce stress, and make informed decisions.`,
    },
    {
      icon: <TrendingUp className="text-green-500 w-8 h-8" />,
      title: "Our Growth",
      align: "right",
      img: "/images/money-tracker-by-piyush-dahle-about-us-line-chart-image.png",
      text: `Growth for us is not just about numbers but about impact. We focus on reaching 
      communities and individuals who need structured financial tools the most. Our approach 
      blends technology and design, ensuring every update solves a real user problem. We 
      continue to grow while helping users grow in their financial journeys.`,
    },
    {
      icon: <Shield className="text-red-500 w-8 h-8" />,
      title: "Our Values",
      align: "left",
      img: "/images/money-tracker-by-piyush-dahle-about-us-growup-chart-image.png",
      text: `Our values are integrity, innovation, and empowerment. We build tools that users 
      can trust, with transparency in design and security in functionality. We innovate with 
      purpose, ensuring features add meaningful value. Empowerment drives us to give every 
      user the confidence to take control of their financial future.`,
    },
  ];

  return (
    <div
      ref={pageRef}
      className="bg-white dark:bg-black text-gray-900 dark:text-white"
    >
      {/* Section 1 - Hero */}
      <section className="hero-section h-screen flex flex-col items-center justify-center text-center bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 dark:from-gray-800 dark:via-gray-900 dark:to-gray-950 animate-gradient-xy opacity-40 dark:opacity-100">
        <h1 className="hero-text text-5xl md:text-9xl font-extrabold space-x-2 overflow-hidden">
          <span className="inline-block text-[#ffffff]">A</span>
          <span className="inline-block text-[#ffffff]">b</span>
          <span className="inline-block text-[#ffffff]">o</span>
          <span className="inline-block text-[#ffffff]">u</span>
          <span className="inline-block text-[#ffffff]">t</span>
          <span className="inline-block text-[#ffffff]">&nbsp;</span>
          <span className="inline-block text-[#ffffff]">U</span>
          <span className="inline-block text-[#ffffff]">s</span>
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-gray-100 dark:text-gray-300 px-4">
          Discover who we are, what drives us, and how we help you manage your
          money smarter.
        </p>
      </section>

      {/* Section 2 - Who We Are */}
      <section className="who-section grid grid-cols-1 md:grid-cols-2 gap-10 px-8 py-20 items-center">
        <img
          src="/images/money-tracker-by-piyush-dahle-about-us-team-image.jpg"
          alt="Our Team"
          className="who-image rounded-2xl shadow-lg"
        />
        <div className="who-text space-y-4">
          <h2 className="text-3xl font-bold flex items-center gap-2">
            <Users className="text-blue-500" /> Who We Are
          </h2>
          <p>
            We are a team of passionate innovators, developers, and financial
            experts dedicated to building tools that empower people to take
            control of their financial journey.
          </p>
        </div>
      </section>

      {/* Section 3 - Mission */}
      <section className="mission-section py-20 px-8 text-center bg-gray-100 dark:bg-[#18181B]">
        <div className="mission-icon flex justify-center mb-6">
          <Target className="w-16 h-16 text-blue-500" />
        </div>
        <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
        <div className="mission-text space-y-3 max-w-2xl mx-auto text-lg">
          <p>✔ Make money tracking effortless and intuitive.</p>
          <p>✔ Provide actionable insights that drive better decisions.</p>
          <p>✔ Ensure financial literacy is accessible to everyone.</p>
        </div>
      </section>
      {/* Section 4 - Vision / Values / Growth Blocks */}
      <section className="vision-section py-20 px-6 md:px-16 space-y-20">
        {blocks.map((block, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) sectionRefs.current[i] = el;
            }}
            data-align={block.align}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          >
            <div className="block md:hidden space-y-4 vision-content">
              <h2 className="text-3xl font-bold flex items-center gap-2">
                {block.icon} {block.title}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {block.text}
              </p>
            </div>
            <div className="block md:hidden p-4">
              <img
                src={block.img}
                className="vision-img rounded-xl shadow-lg"
                alt={block.title}
              />
            </div>
            {block.align === "left" ? (
              <>
                <div className="hidden md:block p-15">
                  <img
                    src={block.img}
                    className="vision-img rounded-xl shadow-lg"
                    alt={block.title}
                  />
                </div>
                <div className="hidden md:block vision-content space-y-4">
                  <h2 className="text-3xl font-bold flex items-center gap-2">
                    {block.icon} {block.title}
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {block.text}
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="hidden md:block vision-content space-y-4">
                  <h2 className="text-3xl font-bold flex items-center gap-2">
                    {block.icon} {block.title}
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {block.text}
                  </p>
                </div>
                <div className="hidden md:block p-15">
                  <img
                    src={block.img}
                    className="vision-img rounded-xl shadow-lg"
                    alt={block.title}
                  />
                </div>
              </>
            )}
          </div>
        ))}
      </section>

      {/* Section 5 - Growth */}
      <section
        ref={growthRef}
        className="growth-section py-20 px-6 md:px-16 relative"
      >
        <h2 className="text-3xl font-bold mb-16 flex items-center justify-center gap-2 text-center">
          <TrendingUp className="text-green-500 w-8 h-8" /> Our Growth Journey
        </h2>

        <div className="absolute top-40 left-1/2 transform -translate-x-1/2 w-1 h-[70%] bg-gradient-to-b from-green-400 via-blue-500 to-purple-600 hidden md:block"></div>
        <div className="grid md:grid-cols-3 gap-12 relative z-10">
          <div className="growth-card relative bg-white dark:bg-[#18181B] p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-green-500 text-white shadow-md">
              <Star className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-xl mb-3 text-green-600 dark:text-green-400">
              2019
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Started as a small idea to help friends track their spending. It
              began as an experiment but quickly turned into a passion project.
            </p>
          </div>
          <div className="growth-card relative bg-white dark:bg-[#18181B] p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-blue-500 text-white shadow-md">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-xl mb-3 text-blue-600 dark:text-blue-400">
              2021
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Launched Money Tracker app with our first 10,000 users. The
              platform started scaling and attracting attention worldwide.
            </p>
          </div>
          <div className="growth-card relative bg-white dark:bg-[#18181B] p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-purple-600 text-white shadow-md">
              <Globe2 className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-xl mb-3 text-purple-600 dark:text-purple-400">
              2024
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Expanded globally, empowering thousands to manage money smarter.
              Today, we stand as a community-driven platform trusted worldwide.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
