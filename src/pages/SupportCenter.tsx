import { useEffect, useRef } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Accordion,
  AccordionItem,
} from "@heroui/react";
import { Search, ArrowUp } from "lucide-react";
import faqImage from "/images/money-tracker-by-piyush-dahle-support-center-faq-image.jpg";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

gsap.registerPlugin(ScrollTrigger);

const supportCards = [
  {
    title: "Knowledge Base",
    desc: "Explore in-depth guides on tracking your income, expenses, and savings goals with Money Tracker.",
    image: "/images/money-tracker-by-piyush-dahle-support-center-knowledge-base-image.png",
  },
  {
    title: "AI Assistant",
    desc: "Get instant answers to common questions like setting up categories, managing subscriptions, and generating reports.",
    image: "/images/money-tracker-by-piyush-dahle-support-center-ai-assistant-image.png",
  },
  {
    title: "Support Request",
    desc: "Need more help? Submit a support request and our team will assist you with Money Tracker issues.",
    image: "/images/money-tracker-by-piyush-dahle-support-center-support-request-image.png",
  },
];

export default function SupportCenter() {
  const pageRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const lenis = new Lenis();
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const ctx = gsap.context(() => {
      gsap.from(".hero-section h1", {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
      gsap.from(".hero-section input", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        delay: 0.3,
        ease: "power3.out",
      });
      gsap.from(".hero-section span", {
        opacity: 0,
        stagger: 0.1,
        delay: 0.6,
        y: 20,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".steps-section",
          start: "top 70%",
          end: "top 10%",
          scrub: 2,
          pin: false,
        },
      });
      tl.from(".steps-section h2", { opacity: 0, y: 50, duration: 1 });
      tl.from(".steps-section .step", {
        opacity: 0,
        y: 100,
        stagger: 0.3,
        duration: 1,
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={pageRef}
      className="min-h-screen bg-white dark:bg-gray-950 px-4 md:px-8 lg:px-16 pb-10"
    >
      <section className="hero-section text-center py-12 md:py-20">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          How can we <span className="text-blue-600">help you?</span>
        </h1>
        <div className="flex justify-center">
          <div className="flex items-center w-full max-w-2xl bg-white dark:bg-[#18181B] border border-gray-300 dark:border-0 rounded-full shadow-md px-4 py-2 space-x-2">
            <Search className="w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Find your solutions..."
              className="flex-1 !border-none focus:ring-0 text-[16px] outline-0 bg-transparent"
            />
            <Button
              isIconOnly
              className="rounded-full bg-blue-600 text-white"
            >
              <ArrowUp />
            </Button>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap justify-center gap-2 text-sm text-gray-600 dark:text-white">
          {[
            "Transactions",
            "Reports",
            "Budgets",
            "Goals",
            "Subscriptions",
            "Accounts",
          ].map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 border border-gray-300 rounded-full dark:border-[#18181B] cursor-pointer dark:bg-[#18181B] dark:hover:bg-[#27272A] hover:bg-gray-100"
            >
              {tag}
            </span>
          ))}
        </div>
      </section>

      <section className="support-cards grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 md:px-17">
        {supportCards.map((card, index) => (
          <Card
            key={index}
            ref={(el) => {
              if (el) cardsRef.current[index] = el;
            }}
            className="group relative overflow-hidden rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 hover:shadow-2xl transition-all duration-500"
          >

            <div className="absolute inset-0 bg-gradient-to-r dark:from-black dark:to-black from-blue-100 to-blue-100 opacity-0 group-hover:opacity-100 blur-lg transition duration-500"></div>

            <div className="relative z-10 p-6 flex flex-col items-center text-center space-y-4">
              <img
                src={card.image}
                alt={card.title}
                className="w-full object-contain rounded-2xl transform group-hover:scale-105 transition duration-500"
              />
              <CardHeader>
                <h3 className="text-xl font-semibold text-blue-600">{card.title}</h3>
              </CardHeader>
              <CardBody>
                <p className="text-gray-600 dark:text-gray-300">{card.desc}</p>
              </CardBody>
            </div>
          </Card>
        ))}
      </section>

      <section className=" md:px-17 grid grid-cols-1 lg:grid-cols-2 gap-8 mt-16 items-start py-20">
        <div className="flex justify-center lg:sticky lg:top-20 self-start">
          <img
            src={faqImage}
            alt="FAQ Illustration"
            className="w-full rounded-2xl"
          />
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <Accordion variant="splitted">
            <AccordionItem
              key="1"
              aria-label="FAQ 1"
              title="How do I add a new transaction?"
              className="text-gray-600 dark:text-gray-400"
            >
              Go to the dashboard, click on <b className="text-blue-500">Add Transaction</b>, enter the
              details, and save.
            </AccordionItem>
            <AccordionItem
              key="2"
              aria-label="FAQ 2"
              title="Can I set monthly budgets?"
              className="text-gray-600 dark:text-gray-400"
            >
              Yes! Navigate to the Budgets tab, create a new budget, and track
              your spending against it.
            </AccordionItem>
            <AccordionItem
              key="3"
              aria-label="FAQ 3"
              title="How can I view my reports?"
              className="text-gray-600 dark:text-gray-400"
            >
              Reports are available in the Reports tab, where you can filter by
              date, category, or account.
            </AccordionItem>
            <AccordionItem className="text-gray-600 dark:text-gray-400" key="4" aria-label="FAQ 4" title="Is my data secure?">
              Absolutely. Money Tracker uses end-to-end encryption to keep your
              data safe.
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      <section className="steps-section py-20 text-center md:px-17">
        <h2 className="text-3xl font-bold mb-12">Getting Started in 3 Steps</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="step bg-white dark:bg-[#18181B] p-6 rounded-xl shadow-md">
            <h3 className="font-semibold text-blue-600 text-xl mb-3">1. Sign Up</h3>
            <p>Create your free account and set up your profile in minutes.</p>
          </div>
          <div className="step bg-white dark:bg-[#18181B] p-6 rounded-xl shadow-md">
            <h3 className="font-semibold text-blue-600 text-xl mb-3">2. Add Accounts</h3>
            <p>
              Connect your bank accounts or add transactions manually to start
              tracking.
            </p>
          </div>
          <div className="step bg-white dark:bg-[#18181B] p-6 rounded-xl shadow-md">
            <h3 className="font-semibold text-blue-600 text-xl mb-3">3. Track & Grow</h3>
            <p>
              Visualize your spending, set goals, and watch your finances grow
              with clarity.
            </p>
          </div>
        </div>
      </section>
      <section className="bg-gray-100 dark:bg-gray-800 py-20 md:mx-17 rounded-2xl">
        <div className="container mx-auto px-3">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Need More Help?
          </h2>
          <p className="text-lg text-center mb-8">
            Our support team is here to assist you. Reach out to us through
            any of the channels below:
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center">
            <a
              href="mailto:support@moneytracker.com"
              className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
            >
              Email Support
            </a>
            <a
              href="https://www.moneytracker.com/chat"
              className="bg-green-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-green-600 transition duration-300 mt-4 md:mt-0 md:ml-4"
            >
              Live Chat
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
