import { MessageCircle, Wrench, Rocket, HeadphonesIcon } from 'lucide-react';

const steps = [
  {
    icon: <MessageCircle className="w-7 h-7" />,
    title: 'We listen first',
    description: "No jargon, no sales pitch. We sit down (or hop on a call) and genuinely understand what's slowing you down.",
    number: '01',
  },
  {
    icon: <Wrench className="w-7 h-7" />,
    title: 'We build it together',
    description: "You stay in the loop the whole time. Regular check-ins, plain-English updates, and room to change your mind.",
    number: '02',
  },
  {
    icon: <Rocket className="w-7 h-7" />,
    title: 'Quick turnaround',
    description: 'We move fast without cutting corners. Most projects are live in 1–3 weeks, not months.',
    number: '03',
  },
  {
    icon: <HeadphonesIcon className="w-7 h-7" />,
    title: 'We stick around',
    description: "After delivery, we're still here. Questions, tweaks, new ideas — just message us.",
    number: '04',
  },
];

export function HowWeWork() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-secondary">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20 mb-4">
            <span className="text-sm text-primary font-medium">How it works</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Simple process, real results
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            No complicated onboarding. No mystery. Just four honest steps.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-background rounded-2xl p-6 border border-border hover:border-primary/40 transition-all duration-300 h-full hover:shadow-md">
                {/* Step number badge */}
                <div className="absolute -top-4 left-6 w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md">
                  {step.number}
                </div>
                <div className="mt-4">
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4">
                    {step.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary/40 to-accent/40"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

