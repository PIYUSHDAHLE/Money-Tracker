import {  Button, Card, CardHeader, CardBody, Accordion, AccordionItem } from "@heroui/react";
import { Search, ArrowUp, BookOpen, Bot, HelpCircle } from "lucide-react";
import faqImage from '/images/money-tracker-by-piyush-dahle-support-center-faq-image.jpg'

export default function SupportCenter() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 px-4 md:px-8 lg:px-16">
      {/* Hero Section */}
      <section className="text-center py-12 md:py-20">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          How can we <span className="text-blue-600">help you?</span>
        </h1>



        {/* Search Box */}
        <div className="flex justify-center">
          <div className="flex items-center w-full max-w-2xl bg-white dark:bg-[#18181B] border border-gray-300 dark:border-0 rounded-full shadow-md px-4 py-2 space-x-2">
            <Search className="w-5 h-5 text-gray-500" />
            <input type="text" placeholder="Find your solutions..." className="flex-1 !border-none focus:ring-0 text-[16px] outline-0" />
            <Button isIconOnly className="rounded-full  bg-blue-600 text-white">
              <ArrowUp />
            </Button>
          </div>
        </div>

        {/* Tags */}
        <div className="mt-6 flex flex-wrap justify-center gap-2 text-sm text-gray-600 dark:text-white">
          {["Transactions", "Reports", "Budgets", "Goals", "Subscriptions", "Accounts"].map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 border border-gray-300 rounded-full dark:border-[#18181B] cursor-pointer dark:bg-[#18181B] dark:hover:bg-[#27272A] hover:bg-gray-100"
            >
              {tag}
            </span>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        <Card className="shadow-md">
          <CardHeader className="flex items-center space-x-2">
            <BookOpen className="w-6 h-6 text-blue-600" />
            <h3 className="font-semibold">Knowledge Base</h3>
          </CardHeader>
          <CardBody>
            Explore in-depth guides on tracking your income, expenses, and savings goals with Money Tracker.
          </CardBody>
        </Card>

        <Card className="shadow-md">
          <CardHeader className="flex items-center space-x-2">
            <Bot className="w-6 h-6 text-blue-600" />
            <h3 className="font-semibold">AI Assistant</h3>
          </CardHeader>
          <CardBody>
            Get instant answers to common questions like setting up categories, managing subscriptions, and generating reports.
          </CardBody>
        </Card>

        <Card className="shadow-md">
          <CardHeader className="flex items-center space-x-2">
            <HelpCircle className="w-6 h-6 text-blue-600" />
            <h3 className="font-semibold">Support Request</h3>
          </CardHeader>
          <CardBody>
            Need more help? Submit a support request and our team will assist you with Money Tracker issues.
          </CardBody>
        </Card>
      </section>

      {/* FAQ Section */}
<section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-16 items-start py-30">
  {/* Left Image */}
  <div className="flex justify-center lg:sticky lg:top-20 self-start">
    <img
      src={faqImage}
      alt="FAQ Illustration"
      className="max-w-md w-full rounded-2xl"
    />
  </div>

  {/* Right Accordion */}
  <div>
    <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
    <Accordion variant="splitted">
      <AccordionItem key="1" aria-label="FAQ 1" title="How do I add a new transaction?">
        Go to the dashboard, click on <b>Add Transaction</b>, enter the details, and save.
      </AccordionItem>
      <AccordionItem key="2" aria-label="FAQ 2" title="Can I set monthly budgets?">
        Yes! Navigate to the Budgets tab, create a new budget, and track your spending against it.
      </AccordionItem>
      <AccordionItem key="3" aria-label="FAQ 3" title="How can I view my reports?">
        Reports are available in the Reports tab, where you can filter by date, category, or account.
      </AccordionItem>
      <AccordionItem key="4" aria-label="FAQ 4" title="Is my data secure?">
        Absolutely. Money Tracker uses end-to-end encryption to keep your data safe.
      </AccordionItem>
    </Accordion>
  </div>
</section>

    </div>
  );
}
