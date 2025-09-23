import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import { Helmet } from "react-helmet";
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
          start: "top 55%",
          end: "bottom 100%",
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
          start: "top 55%",
          end: "bottom 100%",
          scrub: true,
        },
        x: -100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(".mission-section p", {
        scrollTrigger: {
          trigger: ".mission-section",
          start: "top 20%",
          end: "bottom 80%",
          scrub: true,
          // markers:true
        },
        y: 40,
        opacity: 0,
        stagger: 0.5,
        duration: 1.2,
        ease: "power3.out",
      });

      gsap.from(".mission-text > div", {
        scrollTrigger: {
          trigger: ".mission-section",
          start: "top 65%",
          end: "bottom 90%",
          scrub: true,
        },
        scale: 0.8,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "back.out(1.7)",
      });

      gsap.from(".mission-section .italic", {
        scrollTrigger: {
          trigger: ".mission-section",
          start: "top 75%",
        },
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
      });

      sectionRefs.current.forEach((el) => {
        if (!el) return; // 👈 skip nulls

        const align = el.dataset.align;

        // Animate content
        const contents = el.querySelectorAll<HTMLDivElement>(".vision-content");
        gsap.from(contents, {
          scrollTrigger: {
            trigger: el,
            start: "top 60%",
            end: "bottom 80%",
            scrub: true,
          },
          x: align === "left" ? -80 : 80,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        });

        // Animate image
        const image = el.querySelector<HTMLImageElement>(".vision-img");
        if (image) {
          gsap.from(image, {
            scrollTrigger: {
              trigger: el,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
            x: align === "left" ? 80 : -80,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
          });
        }
      });

      gsap.from(".growth-card", {
        scrollTrigger: {
          trigger: ".growth-section",
          start: "top 70%",
          end: "bottom 90%",
          scrub: false,
        },
        y: 60,
        opacity: 0,
        scale: 0.9,
        stagger: 0.3,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(".growth-section .absolute.w-1", {
        scrollTrigger: {
          trigger: ".growth-section",
          start: "top 80%",
          end: "bottom 70%",
          scrub: true,
        },
        scaleY: 0,
        transformOrigin: "top",
        duration: 1.5,
        ease: "power2.out",
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const blocks = [
    {
      icon: <Lightbulb className="text-yellow-400 w-8 h-8" />,
      title: "Our Vision",
      align: "right",
      img: "/images/money-tracker-by-piyush-dahle-about-us-graph-chart-image.png",
      para1: `Our vision is to revolutionize financial management by providing modern, intuitive, 
      and intelligent tools that simplify the complexities of money. We believe finance 
      should not feel intimidating or overwhelming but instead serve as a guide that 
      empowers people to take charge of their future.`,
      para2: `  We see a world where financial growth is not restricted to experts or professionals 
      but is accessible to anyone willing to learn and take small steps toward progress. 
      By using technology and thoughtful design, we strive to create solutions that are 
      simple enough for beginners yet powerful enough for advanced users.`,
      para3: ` With this vision, we aim to foster clarity, build confidence, and transform the way 
      individuals and businesses approach their financial journey—turning challenges into 
      opportunities for sustainable growth.`,
    },
    {
      icon: <Target className="text-blue-500 w-8 h-8" />,
      title: "Our Mission",
      align: "left",
      img: "/images/money-tracker-by-piyush-dahle-about-us-pie-chart-image.png",
      para1: ` Our mission is to create a seamless ecosystem for individuals and businesses 
      to monitor, analyze, and optimize their financial lives. We combine simplicity 
      with powerful insights so users can understand where their money goes, plan 
      for the future, and stay on track with confidence.`,
      para2: `Every feature we design is guided by a core principle: to add real and lasting 
      value. From smart dashboards to actionable insights, we reduce complexity and 
      provide clarity—helping users save time, minimize stress, and make informed 
      choices every day.`,
      para3: `Beyond technology, our mission is about impact. We measure success not by the 
      tools we build alone, but by the difference those tools make in helping people 
      achieve greater stability, independence, and financial freedom.`,
    },
    {
      icon: <TrendingUp className="text-green-500 w-8 h-8" />,
      title: "Our Growth",
      align: "right",
      img: "/images/money-tracker-by-piyush-dahle-about-us-line-chart-image.png",
      para1: ` Growth for us is not just about numbers but about the lives we touch and the 
      communities we serve. We believe true growth happens when our success directly 
      empowers users to grow in their own financial journeys.`,
      para2: `Our approach is centered on solving real problems. Every update, feature, and 
      improvement we release is driven by listening to users, understanding their 
      needs, and designing solutions that create measurable impact.`,
      para3: ` As we continue to expand, we remain committed to sustainable growth—ensuring 
      that while our reach increases, the quality, trust, and value we deliver remain 
      stronger than ever.`,
    },
    {
      icon: <Shield className="text-red-500 w-8 h-8" />,
      title: "Our Values",
      align: "left",
      img: "/images/money-tracker-by-piyush-dahle-about-us-growup-chart-image.png",
      para1: `Our values form the foundation of everything we do: integrity, innovation, 
      and empowerment. We are committed to building tools that users can trust, 
      with transparency in design and security at the core of every feature.`,
      para2: `Innovation for us is purposeful. We don’t add features for the sake of being 
      different—we innovate to solve real challenges and create meaningful change. 
      Every idea we pursue is tested against the question: "Does this help our users 
      gain more confidence in their financial journey?"`,
      para3: ` Most importantly, we are driven by empowerment. Our goal is not just to provide 
      tools but to give people the knowledge, clarity, and confidence to take control 
      of their financial future—because true value comes when people feel in control 
      of their own success.`,
    },
  ];

  return (
    <>
      <Helmet>
        <title>About Us | Money Tracker</title>
                <meta name="title" content="About Us | Money Tracker" />
        <meta
          name="description"
          content="Learn more about Money Tracker, our mission to help you manage your finances, and the team behind the app."
        />
      </Helmet>
      <div
        ref={pageRef}
        className="bg-white dark:bg-black text-gray-900 dark:text-white"
      >
        {/* Section 1 - Hero */}
        <section className="hero-section h-screen flex flex-col items-center justify-center text-center bg-gradient-to-r from-[#1e88e5] via-[#42a5f5] to-[#90caf9] dark:from-black dark:via-gray-900 dark:to-gray-800 animate-gradient-xy ">
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
        <section className="who-section grid grid-cols-1 md:grid-cols-2 gap-10 px-8 lg:px-40 py-20 items-center">
          <img
            src="/images/money-tracker-by-piyush-dahle-about-us-team-image.jpg"
            alt="Our Team"
            className="who-image rounded-2xl shadow-lg"
          />
          <div className="who-text space-y-4">
            <h2 className="text-3xl font-bold flex items-center gap-2">
              <Users className="text-blue-500" /> Who We Are
            </h2>
            <p className="text-justify">
              We are a team of passionate innovators, developers, and financial
              experts dedicated to building tools that empower people to take
              control of their financial journey.
            </p>
            <p className="text-justify">
              We believe finance should be simple, transparent, and accessible
              to everyone. That’s why we combine cutting-edge technology with
              deep market insights to create solutions that simplify complex
              financial concepts and put the power back in the hands of
              individuals.
            </p>
            <p className="text-justify">
              Most importantly, we measure our success by the impact we create.
              Every tool we build, every feature we launch, and every update we
              deliver is designed with one goal in mind: to empower people to
              achieve financial freedom on their own terms.
            </p>
          </div>
        </section>

        {/* Section 3 - Mission */}
        <section className="mission-section relative py-24 px-8 lg:px-39 bg-gradient-to-b from-gray-50 to-white dark:from-[#0f0f11] dark:to-[#18181B] text-center overflow-hidden">
          {/* Background Decoration */}
          <div className="absolute inset-0 -z-10 opacity-20">
            <div className="w-96 h-96 bg-blue-400 rounded-full blur-3xl absolute top-10 left-10 animate-pulse"></div>
            <div className="w-96 h-96 bg-indigo-500 rounded-full blur-3xl absolute bottom-10 right-10 animate-pulse"></div>
          </div>

          {/* Icon */}
          <div className="mission-icon flex justify-center mb-6">
            <div className="p-6 bg-white/20 dark:bg-white/10 rounded-full shadow-lg backdrop-blur-md animate-bounce">
              <Target className="w-16 h-16 text-blue-500" />
            </div>
          </div>

          {/* Heading */}
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
            Our Mission
          </h2>

          {/* Intro Text */}
          <p className="text-justify mx-auto text-gray-600 dark:text-gray-300 mb-10">
            We are on a mission to simplify finance for everyone, breaking down
            the barriers that often make financial management feel overwhelming.
            Finance should not be a privilege reserved for experts—it should be
            an accessible and empowering tool for all. Through smart, intuitive
            technology, we transform complex data into clear, actionable
            insights, making money management not only easier but also more
            meaningful. Our goal is to help individuals understand their
            finances with clarity, so they can make informed decisions that
            align with their goals and aspirations.
          </p>
          <p className="text-justify mx-auto text-gray-600 dark:text-gray-300 mb-10">
            At the heart of our mission lies a deep belief in education and
            empowerment. Financial literacy is the foundation of independence,
            yet it remains out of reach for many. We are committed to bridging
            that gap by providing resources, tools, and experiences that are
            simple, practical, and easy to adopt. By integrating education into
            our platforms, we ensure that people don’t just track their
            finances, but also learn and grow with every interaction. Whether
            it’s planning for the future, building healthier financial habits,
            or navigating challenges, we aim to be a trusted guide at every step
            of the journey.
          </p>
          <p className="text-justify mx-auto text-gray-600 dark:text-gray-300 mb-10">
            Innovation drives everything we do. In a rapidly changing world,
            financial needs and challenges evolve quickly, and we strive to stay
            ahead by continuously experimenting, refining, and improving our
            solutions. We are dedicated to creating secure, transparent, and
            future-ready tools that inspire confidence and trust. But beyond
            technology, our true mission is impact. We measure success not by
            numbers alone, but by the positive change we bring to people’s
            lives—the confidence to save more, the knowledge to invest smarter,
            and the freedom to pursue dreams without financial stress.
          </p>

          {/* Mission Points */}
          <div className="mission-text space-y-5 text-lg ">
            <div className="p-5 bg-white/50 dark:bg-zinc-900/50 shadow-md rounded-2xl backdrop-blur-md">
              <p className="flex items-center gap-3">
                <span className="text-green-500 text-xl">✔</span> Make money
                tracking effortless and intuitive.
              </p>
            </div>
            <div className="p-5 bg-white/50 dark:bg-zinc-900/50 shadow-md rounded-2xl backdrop-blur-md ">
              <p className="flex items-center gap-3">
                <span className="text-green-500 text-xl">✔</span> Provide
                actionable insights that drive better decisions.
              </p>
            </div>
            <div className="p-5 bg-white/50 dark:bg-zinc-900/50 shadow-md rounded-2xl backdrop-blur-md ">
              <p className="flex items-center gap-3">
                <span className="text-green-500 text-xl">✔</span> Ensure
                financial literacy is accessible to everyone.
              </p>
            </div>
            <div className="p-5 bg-white/50 dark:bg-zinc-900/50 shadow-md rounded-2xl backdrop-blur-md ">
              <p className="flex items-center gap-3">
                <span className="text-green-500 text-xl">✔</span> Build secure
                and transparent tools people can trust.
              </p>
            </div>
            <div className="p-5 bg-white/50 dark:bg-zinc-900/50 shadow-md rounded-2xl backdrop-blur-md ">
              <p className="flex items-center gap-3">
                <span className="text-green-500 text-xl">✔</span> Inspire
                smarter habits that lead to long-term financial freedom.
              </p>
            </div>
          </div>

          {/* Closing Statement */}
          <p className="max-w-2xl mx-auto mt-12 text-lg italic text-gray-700 dark:text-gray-400">
            Every feature we design and every tool we build is guided by one
            goal: to empower individuals to take full control of their financial
            journey.
          </p>
        </section>

        {/* Section 4 - Vision / Values / Growth Blocks */}
        <section className="vision-section py-20 px-6 md:px-16 lg:px-38 space-y-20">
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
                <p className="text-gray-700 text-justify dark:text-gray-300 leading-relaxed">
                  {block.para1}
                </p>
                <p className="text-gray-700 text-justify dark:text-gray-300 leading-relaxed">
                  {block.para2}
                </p>
                <p className="text-gray-700 text-justify dark:text-gray-300 leading-relaxed">
                  {block.para3}
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
                  <div className="hidden md:block">
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
                    <p className="text-gray-700 text-justify dark:text-gray-300 leading-relaxed">
                      {block.para1}
                    </p>
                    <p className="text-gray-700 text-justify dark:text-gray-300 leading-relaxed">
                      {block.para2}
                    </p>
                    <p className="text-gray-700 text-justify dark:text-gray-300 leading-relaxed">
                      {block.para3}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="hidden md:block vision-content space-y-4">
                    <h2 className="text-3xl font-bold flex items-center gap-2">
                      {block.icon} {block.title}
                    </h2>
                    <p className="text-gray-700 text-justify dark:text-gray-300 leading-relaxed">
                      {block.para1}
                    </p>
                    <p className="text-gray-700 text-justify dark:text-gray-300 leading-relaxed">
                      {block.para2}
                    </p>
                    <p className="text-gray-700 text-justify dark:text-gray-300 leading-relaxed">
                      {block.para3}
                    </p>
                  </div>
                  <div className="hidden md:block">
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
          className="growth-section py-20 px-6 md:px-16 lg:px-38 relative"
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
                began as an experiment but quickly turned into a passion
                project.
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
                Today, we stand as a community-driven platform trusted
                worldwide.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
