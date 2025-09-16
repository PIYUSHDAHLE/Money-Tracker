import React, { useEffect } from "react";
import { Image } from "@heroui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import heroImage from "/images/money-tracker-by-piyush-dahle-home-hero-image.png";
import logoImage from "/images/money-tracker-by-piyush-dahle-logo-image.png";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css/pagination";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

gsap.registerPlugin(ScrollTrigger);

const HomePage: React.FC = () => {
  useEffect(() => {
    // Smooth scroll
    const lenis = new Lenis();
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const heroTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top center",
        toggleActions: "play reverse play reverse",
      },
    });
    heroTl.fromTo(
      ".hero-content",
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, ease: "power3.out" }
    );

    const swiperTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".swiper-section",
        start: "top 80%",
        toggleActions: "play reverse play reverse",
      },
    });
    swiperTl
      .fromTo(
        ".swiper-section h2",
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1, ease: "elastic.out(1, 0.5)" }
      )
      .fromTo(
        ".swiper-slide",
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.2,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.5"
      ); 

    const worksTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".how-works-section",
        start: "top 75%",
        toggleActions: "play reverse play reverse",
      },
    });
    worksTl
      .fromTo(
        ".how-works-left",
        { x: -100, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: "power2.out" }
      )
      .fromTo(
        ".how-works-right",
        { x: 100, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: "power2.out" },
        "-=0.5"
      );

    const benefitsTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".benefits-section",
        start: "top 75%",
        toggleActions: "play reverse play reverse",
      },
    });
    benefitsTl.fromTo(
      ".benefit-card",
      { y: 80, opacity: 0, rotate: -5 },
      {
        y: 0,
        opacity: 1,
        rotate: 0,
        duration: 1,
        stagger: 0.2,
        ease: "back.out(1.7)",
      }
    );
  }, []);

  return (
    <div>
      {/* Section 1: Hero */}
      <section
        className="hero-section relative h-screen flex items-center justify-center text-center text-gray-900 dark:text-white overflow-hidden"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-blue-200/70 via-blue-300/70 to-blue-400/80 dark:from-black/70 dark:via-black/80 dark:to-black/90"></div>

        <div className="relative z-10 max-w-3xl px-6 hero-content">
          <div className="bg-white/70 dark:bg-black/70 backdrop-blur-lg border border-blue-200 dark:border-blue-900 rounded-2xl p-10 shadow-2xl">
            <img
              src={logoImage}
              className="h-24 w-24 mx-auto mb-6 rounded-full border-4 border-blue-400 shadow-lg"
              alt="Logo"
            />
            <h1 className="text-5xl font-extrabold tracking-tight mb-4 text-blue-700 dark:text-blue-400">
              Money Tracker
            </h1>
            <p className="text-xl mb-4 text-blue-800 dark:text-blue-300 font-medium">
              Easily track, manage, and grow your finances
            </p>
            <p className="text-lg max-w-2xl mx-auto mb-6 text-gray-700 dark:text-gray-300">
              Stay on top of your spending, savings, and budgeting — all in one
              place.
            </p>
            <div className="flex justify-center gap-4">
              <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold shadow-lg">
                Get Started
              </button>
              <button className="px-6 py-3 rounded-lg border border-blue-500 bg-white text-blue-600 dark:bg-black dark:text-blue-400 font-semibold">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Swiper Cards */}
      <section className="swiper-section py-20 lg:py-35 bg-gradient-to-b from-blue-50 to-white dark:from-black dark:to-gray-900 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <h2 className="text-4xl font-extrabold text-center mb-12 text-blue-700 dark:text-blue-400">
            What You Can Do
          </h2>

          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{ delay: 6000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            loop
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {[
              {
                icon: "/images/money-tracker-by-piyush-dahle-home-budgeting-made-simple-image.png",
                title: "Budgeting Made Simple",
                desc: "Create monthly budgets and see where your money is going — stay on track.",
              },
              {
                icon: "/images/money-tracker-by-piyush-dahle-home-track-savings-image.png",
                title: "Track Savings",
                desc: "Visualize your savings goals and track progress over time.",
              },
              {
                icon: "/images/money-tracker-by-piyush-dahle-home-insightful-reports-image.png",
                title: "Insightful Reports",
                desc: "Get automatic reports and charts to understand your spending habits.",
              },
              {
                icon: "/images/money-tracker-by-piyush-dahle-home-smart-reminders-image.png",
                title: "Smart Reminders",
                desc: "Get notified about bill due dates and upcoming financial goals.",
              },
              {
                icon: "/images/money-tracker-by-piyush-dahle-home-secure-transactions-image.png",
                title: "Secure Transactions",
                desc: "Bank-level encryption ensures your data and money stay safe.",
              },
              {
                icon: "/images/money-tracker-by-piyush-dahle-home-global-access-image.png",
                title: "Global Access",
                desc: "Use the app anywhere, anytime — track finances on the go.",
              },
            ].map((card, i) => (
              <SwiperSlide key={i} className="swiper-slide py-10">
                <div className="p-6 bg-white dark:bg-black rounded-xl border border-blue-200 dark:border-blue-900 shadow-lg">
                  <div className="">
                    <img src={card.icon} alt={card.title} className="w-full h-70 rounded-2xl" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-blue-700 dark:text-blue-400">
                    {card.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">{card.desc}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Section 3: How Money Tracker Works */}
      <section className="how-works-section py-20 lg:py-30 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white dark:bg-black relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div className="how-works-left">
            <h2 className="text-4xl font-bold mb-6">
              How <span className="text-blue-400">Money Tracker</span> Works
            </h2>
            <div className="space-y-4">
              {[
                "Connect your accounts securely or add manual expenses.",
                "Categorize your spending and set up recurring budgets.",
                "Watch your progress with interactive charts and alerts.",
                "Receive personalized tips to improve your financial health.",
              ].map((step, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 bg-white/10 backdrop-blur-lg p-4 rounded-xl border border-white/10 shadow-lg"
                >
                  <div className="w-8 h-8 flex items-center justify-center bg-blue-500 text-white rounded-full font-bold">
                    {i + 1}
                  </div>
                  <p>{step}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="how-works-right grid grid-cols-2 gap-4">
            {[
              "https://towardsdatascience.com/wp-content/uploads/2025/06/dashboard.png",
              "https://agencyanalytics.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fdfcvkz6j859j%2F473RYZBe7hSHzxTWNGH4Dk%2F818e3d7833e56e2363e39849a3fb8774%2FSTREAM-goals-alternative-to-SMART-goals.png&w=1080&q=75",
              "https://trinetraiway.com/wp-content/uploads/2022/05/real-time-alerts-notifications.jpg",
              "https://www.itarian.com/images/business-report.jpg",
            ].map((src, i) => (
              <Image
                key={i}
                src={src}
                alt={`Work ${i}`}
                width={400}
                height={200}
                className="h-44 w-full object-cover rounded-xl shadow-lg"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Benefits */}
      <section className="benefits-section py-20 bg-gradient-to-b from-blue-50 to-white dark:from-black dark:to-gray-900 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl font-extrabold mb-6 text-blue-700 dark:text-blue-400">
            Why Choose Money Tracker?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-12">
            Manage your money smarter with tools designed to give you control,
            clarity, and confidence in your finances.
          </p>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                img: "/images/money-tracker-by-piyush-dahle-home-benefit-secure-icon.svg",
                title: "Secure & Private",
                desc: "Your financial data is encrypted and never shared — security is our top priority.",
              },
              {
                img: "/images/money-tracker-by-piyush-dahle-home-benefit-real-time.svg",
                title: "Real-Time Insights",
                desc: "Get up-to-date updates on spending, balances, and budget alerts.",
              },
              {
                img: "/images/money-tracker-by-piyush-dahle-home-benefit-goals.svg",
                title: "Smart Goal Setting",
                desc: "Set savings targets, track milestones, and get nudges to stay motivated.",
              },
              {
                img: "/images/money-tracker-by-piyush-dahle-home-benefit-reports.svg",
                title: "Easy Reports & Charts",
                desc: "Visualize your spending across categories, timeframes, and goals.",
              },
              {
                img: "/images/money-tracker-by-piyush-dahle-home-benefit-mobile.svg",
                title: "Mobile & Desktop Ready",
                desc: "Access your money tracker anywhere — from your computer or phone.",
              },
              {
                img: "/images/money-tracker-by-piyush-dahle-home-benefit-support.svg",
                title: "Helpful Support & Tips",
                desc: "Get financial advice, tips and reminders to stay on track.",
              },
            ].map((b, idx) => (
              <div
                key={idx}
                className="benefit-card p-8 bg-white dark:bg-black rounded-2xl shadow-lg border border-blue-100 dark:border-blue-900 flex flex-col items-center text-center"
              >
                <Image
                  src={b.img}
                  alt={b.title}
                  className="mx-auto mb-6 h-20 w-20 object-contain"
                />
                <h3 className="text-xl font-bold mb-2 text-blue-700 dark:text-blue-400">
                  {b.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
