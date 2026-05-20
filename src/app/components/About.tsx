import { GraduationCap, Target, Heart } from 'lucide-react';

export function About() {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20 mb-6">
              <span className="text-sm text-primary">About Us</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              Building Solutions That Matter
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                We're a team of passionate final-year computer science students who believe in solving real-world problems with practical technology solutions.
              </p>
              <p>
                What started as college projects has evolved into a mission to help small businesses and startups leverage AI and modern web technologies without breaking the bank.
              </p>
              <p>
                We combine fresh perspectives with cutting-edge skills in AI, web development, and automation to deliver solutions that actually work for your business.
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-6 mt-8">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-3">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <h4 className="font-semibold text-foreground mb-1">Fresh Skills</h4>
                <p className="text-sm text-muted-foreground">Latest tech and trends</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-3">
                  <Target className="w-6 h-6" />
                </div>
                <h4 className="font-semibold text-foreground mb-1">Practical Focus</h4>
                <p className="text-sm text-muted-foreground">Solutions that work</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-3">
                  <Heart className="w-6 h-6" />
                </div>
                <h4 className="font-semibold text-foreground mb-1">Dedicated Support</h4>
                <p className="text-sm text-muted-foreground">We care about results</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-primary to-accent rounded-xl h-48 flex items-center justify-center text-white p-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold mb-2">50+</div>
                    <div className="text-sm">Projects</div>
                  </div>
                </div>
                <div className="bg-background rounded-xl h-32 border border-border p-4 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground mb-1">100%</div>
                    <div className="text-xs text-muted-foreground">Client Satisfaction</div>
                  </div>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="bg-background rounded-xl h-32 border border-border p-4 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground mb-1">24/7</div>
                    <div className="text-xs text-muted-foreground">Support</div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-accent to-primary rounded-xl h-48 flex items-center justify-center text-white p-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold mb-2">30+</div>
                    <div className="text-sm">Happy Clients</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

