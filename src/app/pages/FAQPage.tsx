import { useState } from 'react';
import { Link } from 'react-router';
import { ChevronDown, ArrowRight } from 'lucide-react';

const faqs = [
  {
    question: 'How much do your services cost?',
    answer: 'It depends on what you need. Student portfolios start around ₹3,000. Simple business websites from ₹10,000. AI chatbots and automations from ₹15,000. Dashboards from ₹20,000. We\'ll give you a clear quote after a quick chat — no surprises.',
  },
  {
    question: 'How long does a project take?',
    answer: 'Most projects are done in 1–3 weeks. Simple websites take about a week. Chatbots and automations usually 2 weeks. Complex dashboards up to 3–4 weeks. If you\'re in a rush, tell us — we can often move faster.',
  },
  {
    question: 'What happens after you deliver the project?',
    answer: 'You get 30 days of free support for any bugs or small tweaks. After that, we offer affordable maintenance packages. Either way, we don\'t disappear — you can always reach us.',
  },
  {
    question: 'Do I need to be technical to work with you?',
    answer: 'Not at all. We explain everything in plain language. You don\'t need to know what an API is or how a database works. Just tell us what problem you\'re trying to solve and we\'ll handle the rest.',
  },
  {
    question: 'What kind of businesses do you work with?',
    answer: 'Mostly small businesses, startups, coaching institutes, restaurants, retail stores, and students. Basically anyone who needs practical tech help without paying agency prices.',
  },
  {
    question: 'What does "AI automation" actually mean for my business?',
    answer: 'It means we identify tasks you do repeatedly — answering the same questions, copying data between systems, generating reports — and build something that does those tasks automatically. You get time back. That\'s it.',
  },
  {
    question: 'Can you work with the tools I already use?',
    answer: 'Usually yes. We can integrate with WhatsApp, Google Sheets, existing websites, most CRMs, and many other tools. Tell us what you\'re using and we\'ll let you know what\'s possible.',
  },
  {
    question: 'How do I get started?',
    answer: 'Just reach out. Send us a WhatsApp message or fill out the contact form. We\'ll have a quick call to understand your situation, and then give you a clear proposal. No commitment needed for the first conversation.',
  },
  {
    question: 'What if I\'m not happy with the result?',
    answer: 'We work in iterations and keep you involved throughout. By the time we deliver, you\'ve already seen and approved the work. But if something\'s not right, we fix it — that\'s what the 30-day support period is for.',
  },
];

export function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20 mb-4">
            <span className="text-sm text-primary font-medium">FAQ</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Questions we get a lot
          </h1>
          <p className="text-lg text-muted-foreground">
            Honest answers, no fluff. If something's not covered here, just ask us directly.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3 mb-16">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-background rounded-2xl border border-border overflow-hidden hover:border-primary/30 transition-colors"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left"
              >
                <span className="font-semibold text-foreground pr-4 leading-snug">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-muted-foreground transition-transform flex-shrink-0 ${
                    openIndex === index ? 'rotate-180 text-primary' : ''
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-6 pb-5 text-muted-foreground leading-relaxed border-t border-border/50 pt-4">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Still have questions */}
        <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl p-8 border border-primary/20 text-center">
          <h3 className="text-xl font-bold text-foreground mb-2">Still have a question?</h3>
          <p className="text-muted-foreground mb-6">
            Just message us. We reply fast and we're happy to chat.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors font-medium"
          >
            Ask us directly
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}


