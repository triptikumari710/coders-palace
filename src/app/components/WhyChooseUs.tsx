import { DollarSign, Zap, Users, Wrench, MessageSquare, CheckCircle } from 'lucide-react';

const benefits = [
  {
    icon: <DollarSign className="w-6 h-6" />,
    title: 'Prices that make sense',
    description: 'We work with small businesses, so we price like it. No enterprise quotes for simple problems.',
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: 'Fast without being sloppy',
    description: "We move quickly because we respect your time — but we never ship something we're not proud of.",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: 'You talk to the people building it',
    description: 'No account managers or middlemen. You work directly with the team writing your code.',
  },
  {
    icon: <Wrench className="w-6 h-6" />,
    title: 'Practical over flashy',
    description: 'We build what actually solves your problem, not what looks impressive in a demo.',
  },
  {
    icon: <MessageSquare className="w-6 h-6" />,
    title: "You're never left guessing",
    description: "Regular updates, honest timelines, and we tell you when something's harder than expected.",
  },
  {
    icon: <CheckCircle className="w-6 h-6" />,
    title: 'Track record you can check',
    description: "50+ projects delivered. Ask us for references — we're happy to connect you with past clients.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20 mb-4">
            <span className="text-sm text-primary font-medium">Why us</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Honestly, here's the difference
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            We're not a big agency. That's actually the point.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-background rounded-2xl p-6 border border-border hover:border-primary/40 transition-all duration-300 flex items-start gap-4 hover:shadow-md"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary flex-shrink-0">
                {benefit.icon}
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1.5">
                  {benefit.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

