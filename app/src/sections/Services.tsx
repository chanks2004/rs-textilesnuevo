import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { customizationConfig } from '../config';
import { Printer, Tag, Package } from 'lucide-react';

// Custom Needle icon for embroidery
const NeedleIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
    <path d="M18 3l-3 3" />
    <path d="M15 6l-9 9" />
    <path d="M6 15l-3 3" />
    <path d="M21 6l-3-3" />
    <circle cx="6" cy="18" r="2" />
  </svg>
);

const iconMap: Record<string, React.FC> = {
  Printer: () => <Printer className="w-6 h-6" />,
  Needle: NeedleIcon,
  Tag: () => <Tag className="w-6 h-6" />,
  Package: () => <Package className="w-6 h-6" />,
};

gsap.registerPlugin(ScrollTrigger);

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate cards on scroll
      const cards = cardsRef.current?.querySelectorAll('.service-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="py-20 lg:py-28 bg-gray-50"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <span className="inline-block px-4 py-1.5 bg-white text-sm text-[#6A6A6A] rounded-full mb-4 border border-gray-100">
            {customizationConfig.label}
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-[#0A0A0A] mb-4">
            {customizationConfig.heading}
          </h2>
          <p className="text-[#6A6A6A] max-w-2xl mx-auto">
            {customizationConfig.description}
          </p>
        </div>

        {/* Services Grid */}
        <div
          ref={cardsRef}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {customizationConfig.services.map((service) => {
            const IconComponent = iconMap[service.icon];
            return (
              <div
                key={service.id}
                className="service-card bg-white rounded-2xl p-6 lg:p-8 border border-gray-100 hover:shadow-lg hover:border-gray-200 transition-all duration-300"
              >
                {/* Icon */}
                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-[#0A0A0A] mb-5">
                  <IconComponent />
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-[#0A0A0A] mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-[#6A6A6A] mb-4">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-sm text-[#6A6A6A]"
                    >
                      <span className="w-1.5 h-1.5 bg-[#0A0A0A] rounded-full flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
