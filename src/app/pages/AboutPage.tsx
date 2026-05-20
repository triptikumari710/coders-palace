import { Link } from 'react-router';
import { GraduationCap, Target, Heart, ArrowRight, Coffee } from 'lucide-react';

const values = [
  {
    icon: <GraduationCap className="w-6 h-6" />,
    title: 'We keep learning',
    description: 'We\'re final-year CS students, which means we\'re constantly studying the latest tools and techniques. That freshness shows up in our work.',
  },
  {
    icon: <Target className="w-6 h-6" />,
    title: 'We focus on what works',
    description: 'We\'re not here to impress you with buzzwords. We care about whether the thing we built actually solves your problem.',
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: 'We genuinely care',
    description: 'Your success is our portfolio. When your business does well because of something we built, that\'s the best feeling.',
  },
  {
    icon: <Coffee className="w-6 h-6" />,
    title: 'We\'re easy to work with',
    description: 'No corporate formality. Just honest conversations, clear updates, and a team that\'s actually fun to work with.',
  },
];

export function AboutPage() {
  return (
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20 mb-4">
            <span className="text-sm text-primary font-medium">Who we are</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Just a team that loves solving problems
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            No fancy office, no corporate hierarchy. Just people who are good at building things and care about doing it right.
          </p>
        </div>

        {/* Story section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-6">How Coders Palace started</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                It started with a friend's dad who ran a small coaching institute. He was spending hours every day answering the same WhatsApp messages from students. We built him a simple chatbot over a weekend. It worked. He was thrilled.
              </p>
              <p>
                Word spread. A restaurant owner needed a website. A retail store needed to track inventory better. A classmate needed a portfolio to land her first job. Each project taught us something new.
              </p>
              <p>
                We're final-year computer science students, which means we're deep in the latest AI and web tech every day. We realized we could bring that to small businesses who couldn't afford big agencies — and actually make a real difference.
              </p>
              <p>
                That's Coders Palace. Not a startup trying to scale to a thousand clients. Just a small team that wants to do genuinely good work for people who need it.
              </p>
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-primary to-accent rounded-2xl p-8 text-white flex flex-col justify-center">
              <div className="text-5xl font-bold mb-2">50+</div>
              <div className="text-white/80">Projects shipped</div>
            </div>
            <div className="bg-background rounded-2xl border border-border p-8 flex flex-col justify-center">
              <div className="text-5xl font-bold text-foreground mb-2">100%</div>
              <div className="text-muted-foreground text-sm">Client satisfaction rate</div>
            </div>
            <div className="bg-background rounded-2xl border border-border p-8 flex flex-col justify-center">
              <div className="text-5xl font-bold text-foreground mb-2">24/7</div>
              <div className="text-muted-foreground text-sm">Support availability</div>
            </div>
            <div className="bg-gradient-to-br from-accent to-primary rounded-2xl p-8 text-white flex flex-col justify-center">
              <div className="text-5xl font-bold mb-2">30+</div>
              <div className="text-white/80">Happy clients</div>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-foreground mb-10 text-center">What we believe in</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-background rounded-2xl p-6 border border-border hover:border-primary/40 transition-all duration-300 flex items-start gap-4 hover:shadow-md"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary flex-shrink-0">
                  {value.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1.5">{value.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl p-10 border border-primary/20 text-center">
          <h3 className="text-2xl font-bold text-foreground mb-3">Want to work with us?</h3>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            We'd love to hear about your business. No sales pitch — just a genuine conversation about what you need.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors font-medium shadow-lg shadow-primary/20"
          >
            Say hello
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}


