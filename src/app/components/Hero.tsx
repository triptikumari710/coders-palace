import { Link } from 'react-router';
import { ArrowRight, Coffee, Clock, Users } from 'lucide-react';

export function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-24">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left — copy */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
              <Coffee className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">Built by people, for people</span>
            </div>

            <div className="space-y-5">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                We take the boring work{' '}
                <span className="text-primary">off your plate</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Small businesses shouldn't have to spend hours on repetitive tasks.
                We build practical tools — chatbots, dashboards, automations — that
                actually fit how you work, not the other way around.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/contact"
                className="px-8 py-4 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20 font-medium"
              >
                Let's talk — it's free
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/services"
                className="px-8 py-4 bg-secondary text-secondary-foreground border border-border rounded-xl hover:bg-muted transition-colors flex items-center justify-center gap-2 font-medium"
              >
                See what we do
              </Link>
            </div>

            {/* Social proof numbers */}
            <div className="grid grid-cols-3 gap-6 pt-2">
              <div className="flex flex-col gap-1">
                <div className="text-3xl font-bold text-foreground">50+</div>
                <div className="text-sm text-muted-foreground">Projects shipped</div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-3xl font-bold text-foreground">30+</div>
                <div className="text-sm text-muted-foreground">Happy clients</div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-3xl font-bold text-foreground">24/7</div>
                <div className="text-sm text-muted-foreground">We're around</div>
              </div>
            </div>
          </div>

          {/* Right — visual card stack */}
          <div className="relative">
            <div className="relative bg-gradient-to-br from-primary/8 to-accent/8 rounded-3xl p-8 border border-border/60">
              <div className="space-y-4">
                {/* Testimonial snippet */}
                <div className="bg-background rounded-2xl p-5 shadow-sm border border-border/50">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                      RK
                    </div>
                    <div>
                      <p className="text-sm text-foreground font-medium mb-0.5">Rajesh Kumar</p>
                      <p className="text-xs text-muted-foreground mb-2">Learning Academy</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        "Saved us 20+ hours a week. Students get answers instantly now."
                      </p>
                    </div>
                  </div>
                </div>

                {/* Two stat cards */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-background rounded-2xl p-4 shadow-sm border border-border/50 flex flex-col gap-2">
                    <Clock className="w-5 h-5 text-primary" />
                    <div className="text-2xl font-bold text-foreground">20h</div>
                    <div className="text-xs text-muted-foreground">saved per week on average</div>
                  </div>
                  <div className="bg-background rounded-2xl p-4 shadow-sm border border-border/50 flex flex-col gap-2">
                    <Users className="w-5 h-5 text-accent" />
                    <div className="text-2xl font-bold text-foreground">40%</div>
                    <div className="text-xs text-muted-foreground">more leads for clients</div>
                  </div>
                </div>

                {/* CTA nudge */}
                <div className="bg-primary/10 rounded-2xl p-4 border border-primary/20 flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse flex-shrink-0"></div>
                  <p className="text-sm text-foreground">
                    <span className="font-medium">Free consultation</span> — no pressure, just a chat about your needs
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

