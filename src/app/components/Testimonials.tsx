import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Rajesh Kumar',
    role: 'Owner, Learning Academy',
    content: 'The chatbot they built handles all our student inquiries now. We\'ve saved 20+ hours a week and enrollment went up 40%. Honestly didn\'t expect it to work this well.',
    rating: 5,
    avatar: 'RK',
  },
  {
    name: 'Priya Sharma',
    role: 'Manager, Retail Store',
    content: 'The inventory dashboard is exactly what we needed — nothing more, nothing less. Real-time stock alerts have saved us from running out of products multiple times.',
    rating: 5,
    avatar: 'PS',
  },
  {
    name: 'Amit Patel',
    role: 'Restaurant Owner',
    content: 'Website was live in under two weeks. Online orders tripled in the first month. These guys actually delivered what they promised, which is rare.',
    rating: 5,
    avatar: 'AP',
  },
  {
    name: 'Sneha Gupta',
    role: 'Final Year Student',
    content: 'They built my portfolio site and helped me prep my resume. Got my first internship offer two weeks after it went live. Worth every rupee.',
    rating: 5,
    avatar: 'SG',
  },
  {
    name: 'Vikram Singh',
    role: 'Startup Founder',
    content: 'Fast, honest, and they actually understand business — not just code. Rare combination. Will definitely work with them again.',
    rating: 5,
    avatar: 'VS',
  },
  {
    name: 'Anita Desai',
    role: 'HR Manager',
    content: 'The resume screening tool cut our shortlisting time in half. It\'s accurate and the team was super responsive whenever we had questions.',
    rating: 5,
    avatar: 'AD',
  },
];

export function Testimonials() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-secondary">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20 mb-4">
            <span className="text-sm text-primary font-medium">Real feedback</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            What clients actually say
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            No cherry-picked quotes. These are real people we've worked with.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-background rounded-2xl p-6 border border-border hover:border-primary/40 transition-all duration-300 hover:shadow-md flex flex-col"
            >
              {/* Stars */}
              <div className="flex items-center gap-0.5 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-muted-foreground leading-relaxed flex-1 mb-6">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold text-foreground text-sm">
                    {testimonial.name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

