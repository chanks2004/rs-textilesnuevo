import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, TrendingUp, Award, Globe, Clock, Shield, HeartHandshake, Zap, CheckCircle2 } from 'lucide-react';

const valuePropositions = [
  {
    icon: Users,
    title: 'One Partner, Endless Solutions',
    description: 'Stop juggling multiple suppliers. We handle everything from sourcing blank garments to custom printing, packaging, and labeling. One point of contact, one invoice, zero headaches.',
  },
  {
    icon: TrendingUp,
    title: 'Scale With Confidence',
    description: 'Whether you need 50 pieces or 50,000, our production capabilities scale with your business. Start small, grow big—we\'re with you at every stage.',
  },
  {
    icon: Award,
    title: 'Quality You Can Trust',
    description: 'Every garment undergoes rigorous quality control. We only work with premium materials and proven techniques to ensure your brand is represented at its best.',
  },
  {
    icon: Globe,
    title: 'Global Sourcing Network',
    description: 'Our relationships with top textile manufacturers worldwide mean you get access to the best materials at competitive prices, without the complexity of international logistics.',
  },
  {
    icon: Clock,
    title: 'Fast Turnaround Times',
    description: 'We understand that time is money. Our streamlined processes and dedicated team ensure your orders are completed on schedule, every time.',
  },
  {
    icon: Shield,
    title: 'Reliable Partnership',
    description: 'No surprises, no hidden fees. We believe in transparent communication and delivering exactly what we promise. Your success is our success.',
  },
];

const stats = [
  { value: '50+', label: 'Color Options' },
  { value: '180-400', label: 'GSM Range' },
  { value: '24h', label: 'Quote Response' },
  { value: '6+', label: 'Printing Techniques' },
];

const testimonials = [
  {
    quote: "Rs Textiles transformed how we approach apparel production. Having one partner handle everything from blanks to packaging has saved us countless hours and headaches.",
    author: "Sarah Mitchell",
    role: "Founder, Urban Streetwear Co.",
  },
  {
    quote: "The quality is consistently excellent, and the team is incredibly responsive. They've helped us scale from a small startup to a recognized brand.",
    author: "Marcus Chen",
    role: "CEO, Elevate Athletics",
  },
  {
    quote: "What sets them apart is their attention to detail. Every label, every stitch, every package is perfect. Our customers notice the difference.",
    author: "Emma Rodriguez",
    role: "Creative Director, Nomad Label",
  },
];

const howWeHelp = [
  {
    title: 'For Startups',
    description: 'Launch your brand with low minimums and expert guidance. We help you make the right choices from day one.',
    points: ['Low MOQs to test the market', 'Design and branding consultation', 'Sample development', 'Flexible payment terms'],
  },
  {
    title: 'For Growing Brands',
    description: 'Scale your operations without scaling your headaches. We handle production so you can focus on growth.',
    points: ['Volume pricing as you grow', 'Consistent quality at scale', 'Inventory management support', 'Faster turnaround times'],
  },
  {
    title: 'For Established Brands',
    description: 'Enterprise-level service with the personal touch of a dedicated partner.',
    points: ['Dedicated account manager', 'Custom development projects', 'Global shipping coordination', 'White-label fulfillment'],
  },
];

export function WhyUsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <span className="inline-block px-4 py-1.5 bg-[#088571]/10 text-[#088571] text-sm font-medium rounded-full mb-6">
                Why Choose Us
              </span>
              <h1 className="text-4xl lg:text-6xl font-bold text-[#0A0A0A] mb-6 leading-tight">
                Take Your Apparel to the Next Level
              </h1>
              <p className="text-lg text-[#6A6A6A] mb-8">
                We're more than a supplier—we're your partner in building a successful apparel brand. From concept to delivery, we provide the expertise, quality, and reliability you need to stand out in a competitive market.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="/#quote"
                  className="bg-[#088571] text-white px-8 py-4 text-base font-medium rounded-full hover:bg-[#066b5a] transition-colors flex items-center gap-2"
                >
                  Get Started
                  <ArrowRight size={18} />
                </a>
                <Link
                  to="/services"
                  className="bg-white text-[#0A0A0A] px-8 py-4 text-base font-medium border border-gray-200 hover:border-gray-300 transition-colors rounded-full"
                >
                  Explore Services
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat) => (
                  <div key={stat.label} className="bg-gray-50 rounded-2xl p-8 text-center">
                    <p className="text-4xl lg:text-5xl font-bold text-[#088571] mb-2">{stat.value}</p>
                    <p className="text-[#6A6A6A]">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Propositions */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#0A0A0A] mb-4">
              What Makes Us Different
            </h2>
            <p className="text-[#6A6A6A] max-w-2xl mx-auto">
              We combine premium products with exceptional service to help your brand succeed.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {valuePropositions.map((prop) => (
              <div key={prop.title} className="bg-white rounded-2xl p-8 border border-gray-100 hover:border-[#088571]/30 hover:shadow-lg transition-all duration-300">
                <div className="w-14 h-14 bg-[#088571]/10 rounded-xl flex items-center justify-center mb-6">
                  <prop.icon className="w-7 h-7 text-[#088571]" />
                </div>
                <h3 className="text-xl font-bold text-[#0A0A0A] mb-3">{prop.title}</h3>
                <p className="text-[#6A6A6A]">{prop.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Help Section */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#0A0A0A] mb-4">
              How We Help Businesses Grow
            </h2>
            <p className="text-[#6A6A6A] max-w-2xl mx-auto">
              No matter where you are in your journey, we have solutions tailored to your needs.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {howWeHelp.map((section) => (
              <div key={section.title} className="bg-gray-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-[#0A0A0A] mb-4">{section.title}</h3>
                <p className="text-[#6A6A6A] mb-6">{section.description}</p>
                <ul className="space-y-3">
                  {section.points.map((point) => (
                    <li key={point} className="flex items-center gap-3 text-[#0A0A0A]">
                      <CheckCircle2 className="w-5 h-5 text-[#088571] flex-shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 lg:py-28 bg-[#0A0A0A]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-white/10 text-white text-sm font-medium rounded-full mb-4">
              Testimonials
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              What Our Clients Say
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.author} className="bg-white/5 rounded-2xl p-8 border border-white/10">
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Zap key={i} className="w-5 h-5 text-[#088571] fill-[#088571]" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 italic">"{testimonial.quote}"</p>
                <div>
                  <p className="text-white font-semibold">{testimonial.author}</p>
                  <p className="text-gray-400 text-sm">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Commitment */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#0A0A0A] mb-6">
                Our Commitment to You
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-[#088571]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <HeartHandshake className="w-6 h-6 text-[#088571]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">Partnership Approach</h3>
                    <p className="text-[#6A6A6A]">We don't just fulfill orders—we invest in your success. Your goals become our goals.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-[#088571]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-[#088571]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">Quality Guarantee</h3>
                    <p className="text-[#6A6A6A]">If something isn't right, we'll make it right. No questions asked.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-[#088571]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-[#088571]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">On-Time Delivery</h3>
                    <p className="text-[#6A6A6A]">We respect your deadlines. When we commit to a timeline, we meet it.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-2xl p-8 lg:p-12">
              <h3 className="text-2xl font-bold text-[#0A0A0A] mb-6">Ready to Partner With Us?</h3>
              <p className="text-[#6A6A6A] mb-8">
                Let's discuss how we can help take your apparel brand to the next level. Get a custom quote within 24 hours.
              </p>
              <div className="space-y-4">
                <a
                  href="/#quote"
                  className="block w-full bg-[#088571] text-white px-6 py-4 text-center font-medium rounded-full hover:bg-[#066b5a] transition-colors"
                >
                  Request a Quote
                </a>
                <Link
                  to="/services"
                  className="block w-full bg-white text-[#0A0A0A] px-6 py-4 text-center font-medium border border-gray-200 hover:border-gray-300 transition-colors rounded-full"
                >
                  View Our Services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
