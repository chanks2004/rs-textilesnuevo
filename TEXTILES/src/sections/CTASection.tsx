import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { ctaConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToQuote = () => {
    const element = document.querySelector(ctaConfig.buttonHref);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-20 lg:py-28 bg-[#0A0A0A] z-30 overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.05]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="relative px-6 lg:px-[7vw]">
        <div ref={contentRef} className="max-w-3xl mx-auto text-center">
          {/* Tags */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {ctaConfig.tags.map((tag) => (
              <span
                key={tag}
                className="px-4 py-1.5 bg-[#088571]/20 text-[#088571] text-xs font-medium rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Heading */}
          <h2 className="text-white font-bold text-[clamp(32px,4vw,56px)] leading-[1.05] tracking-[-0.02em] mb-6">
            {ctaConfig.heading}
          </h2>

          {/* Description */}
          <p className="text-[#9A9A9A] text-lg mb-10 max-w-xl mx-auto">
            {ctaConfig.description}
          </p>

          {/* Email */}
          <p className="text-[#6A6A6A] text-sm mb-8">
            Or email us directly at{' '}
            <a
              href={`mailto:${ctaConfig.email}`}
              className="text-[#088571] hover:underline"
            >
              {ctaConfig.email}
            </a>
          </p>

          {/* CTA Button */}
          <button
            onClick={scrollToQuote}
            className="bg-[#088571] text-white px-10 py-4 text-base font-medium hover:bg-[#066b5a] transition-colors rounded-sm inline-flex items-center gap-2 group"
          >
            {ctaConfig.buttonText}
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}
