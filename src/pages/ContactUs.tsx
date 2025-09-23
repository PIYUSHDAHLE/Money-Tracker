import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Helmet } from "react-helmet";
import {
  Mail,
  Phone,
  MapPin,
  Twitter,
  Facebook,
  Instagram,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function ContactUs() {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const formRef = useRef<HTMLDivElement | null>(null);
  const infoRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const lenis = new Lenis();
    (window as any).lenis = lenis;
    const scroller = (document.scrollingElement ||
      document.documentElement) as Element;

    ScrollTrigger.scrollerProxy(scroller, {
      scrollTop(value?: number) {
        if (arguments.length) {
          lenis.scrollTo(value as number);
        }
        return window.scrollY || document.documentElement.scrollTop;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        } as DOMRect;
      },
      pinType: (scroller as HTMLElement).style?.transform
        ? "transform"
        : "fixed",
    });
    lenis.on("scroll", () => {
      ScrollTrigger.update();
    });
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    const ctx = gsap.context(() => {
      const sections = [heroRef.current, formRef.current, infoRef.current];
      sections.forEach((section) => {
        if (!section) return;
        gsap.from(section.querySelectorAll(".animate-el"), {
          y: 80,
          opacity: 0,
          stagger: 0.18,
          duration: 1.05,
          ease: "power4.out",
          scrollTrigger: {
            trigger: section,
            scroller,
            start: "top 80%",
            end: "bottom 40%",
            toggleActions: "play none none reverse",
          },
        });
      });
    });
    ScrollTrigger.refresh();
    return () => {
      try {
        ctx.revert();
      } catch {}
      try {
        lenis.destroy();
      } catch {}
      try {
        ScrollTrigger.getAll().forEach((st) => st.kill());
      } catch {}
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Contact Us | Money Tracker</title>
                <meta name="title" content="Contact Us | Money Tracker" />
        <meta
          name="description"
          content="Have questions or need support? Get in touch with the Money Tracker team for quick assistance."
        />
      </Helmet>
      <div className="contact-page bg-gradient-to-b from-[#1e88e5] via-[#42a5f5] to-[#90caf9] dark:from-black dark:via-gray-900 dark:to-gray-800 text-white">
        {/* Hero Section */}
        <section
          ref={heroRef}
          className="hero-section h-screen flex flex-col items-center justify-center text-center px-6 relative overflow-hidden"
        >
          <h1 className="animate-el text-6xl md:text-8xl font-extrabold drop-shadow-lg">
            Get in Touch
          </h1>
          <p className="animate-el mt-6 max-w-2xl text-lg md:text-xl opacity-90">
            Have questions, feedback, or ideas? We’d love to hear from you.
            Reach out and let’s connect!
          </p>
        </section>

        {/* Contact Form Section */}
        <section
          ref={formRef}
          className="form-section py-20 px-6 md:px-20 bg-white dark:bg-[#121212] text-gray-900 dark:text-gray-200 rounded-t-3xl shadow-lg"
        >
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-el space-y-6">
              <h2 className="text-3xl font-bold">Send Us a Message</h2>
              <p className="opacity-80">
                Our team is here to help you with any inquiries or support you
                may need. Fill out the form and we’ll get back to you shortly.
              </p>
            </div>
            <form className="animate-el space-y-4 bg-gray-100 dark:bg-gray-900 p-6 rounded-2xl shadow-lg">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
              />
              <textarea
                placeholder="Your Message"
                rows={5}
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
              />
              <button className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-3 rounded-lg hover:scale-105 transition transform">
                Send Message
              </button>
            </form>
          </div>
        </section>

        {/* Info & Social Section */}
        <section
          ref={infoRef}
          className="info-section py-20 px-6 md:px-20 text-center space-y-10"
        >
          <h2 className="animate-el text-3xl font-bold">Reach Us Directly</h2>
          <div className="animate-el flex flex-wrap justify-center gap-8">
            <div className="flex items-center gap-3">
              <Phone className="w-6 h-6 text-yellow-400" />{" "}
              <span>+91 98765 43210</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-6 h-6 text-yellow-400" />{" "}
              <span>support@moneytracker.com</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-6 h-6 text-yellow-400" />{" "}
              <span>Pune, India</span>
            </div>
          </div>

          <div className="animate-el flex justify-center gap-6">
            <a href="#" className="hover:scale-125 transition">
              <Twitter className="w-7 h-7" />
            </a>
            <a href="#" className="hover:scale-125 transition">
              <Facebook className="w-7 h-7" />
            </a>
            <a href="#" className="hover:scale-125 transition">
              <Instagram className="w-7 h-7" />
            </a>
          </div>
        </section>
      </div>
    </>
  );
}
