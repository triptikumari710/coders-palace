import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'How much do your services cost?',
      answer: 'Our pricing is flexible and depends on project scope. Simple websites start from ₹10,000, AI chatbots from ₹15,000, and custom dashboards from ₹20,000. We offer student-friendly pricing for portfolios and resumes. Contact us for a detailed quote.',
    },
    {
      question: 'How long does it take to complete a project?',
      answer: 'Timeline varies by project complexity. Simple websites take 1-2 weeks, AI chatbots 2-3 weeks, and complex dashboards 3-4 weeks. We prioritize quality while maintaining fast turnaround times. Rush delivery is available for urgent projects.',
    },
    {
      question: 'Do you provide support after project delivery?',
      answer: 'Absolutely! We offer 30 days of free support after delivery for bug fixes and minor adjustments. Extended support and maintenance packages are available at affordable rates. We\'re always just a message away.',
    },
    {
      question: 'What kind of businesses do you work with?',
      answer: 'We work with startups, small businesses, coaching institutes, restaurants, retail stores, and students. Our solutions are designed for businesses that want quality technology without enterprise-level budgets.',
    },
    {
      question: 'Can you explain what AI automation really means?',
      answer: 'AI automation means using artificial intelligence to handle repetitive tasks automatically - like answering common customer questions, processing data, scheduling appointments, or analyzing documents. It saves time and reduces human error.',
    },
    {
      question: 'Do I need technical knowledge to work with you?',
      answer: 'Not at all! We explain everything in simple terms and guide you through the entire process. We handle all the technical aspects while keeping you informed with regular updates in language you can understand.',
    },
    {
      question: 'What technologies do you use?',
      answer: 'We use modern, proven technologies like React, Node.js, Python, and leading AI platforms. We choose the best tools for each project to ensure reliability, performance, and easy maintenance.',
    },
    {
      question: 'Can you work with my existing systems?',
      answer: 'Yes! We can integrate with most existing systems, databases, and software. During our initial discussion, we\'ll assess your current setup and plan the best integration approach.',
    },
  ];

  return (
    <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20 mb-4">
            <span className="text-sm text-primary">FAQ</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about working with us
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-background rounded-lg border border-border overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-secondary/50 transition-colors"
              >
                <span className="font-semibold text-foreground pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-muted-foreground transition-transform flex-shrink-0 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-6 pb-4 text-muted-foreground">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

