import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ctaConfig } from '../config';
import { Mail } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function CTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 lg:py-28 bg-white">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={contentRef}
          className="relative bg-[#0A0A0A] rounded-3xl overflow-hidden"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                backgroundSize: '32px 32px',
              }}
            />
          </div>

          {/* Content */}
          <div className="relative py-16 lg:py-24 px-8 lg:px-16 text-center">
            {/* Tags */}
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {ctaConfig.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-1.5 bg-white/10 text-white/90 text-sm rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Heading */}
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4 max-w-2xl mx-auto">
              {ctaConfig.heading}
            </h2>

            {/* Description */}
            <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">
              {ctaConfig.description}
            </p>

            {/* CTA Button */}
            <a
              href={ctaConfig.buttonHref}
              onClick={(e) => {
                e.preventDefault();
                document.querySelector(ctaConfig.buttonHref)?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center px-8 py-4 bg-white text-[#0A0A0A] font-medium rounded-full hover:bg-gray-100 transition-colors duration-200"
            >
              {ctaConfig.buttonText}
            </a>

            {/* Email */}
            <div className="mt-8 flex items-center justify-center gap-2 text-white/60">
              <Mail size={16} />
              <a
                href={`mailto:${ctaConfig.email}`}
                className="text-sm hover:text-white transition-colors"
              >
                {ctaConfig.email}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
