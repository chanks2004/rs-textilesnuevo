import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { whyUsConfig } from '../config';
import { Award, Palette, Tag, Scale, Zap, Headphones } from 'lucide-react';

const iconMap: Record<string, React.FC> = {
  Award: () => <Award className="w-6 h-6" />,
  Palette: () => <Palette className="w-6 h-6" />,
  Tag: () => <Tag className="w-6 h-6" />,
  Scale: () => <Scale className="w-6 h-6" />,
  Zap: () => <Zap className="w-6 h-6" />,
  Headphones: () => <Headphones className="w-6 h-6" />,
};

gsap.registerPlugin(ScrollTrigger);

export function WhyUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gridRef.current?.querySelectorAll('.feature-item');
      if (items) {
        gsap.fromTo(
          items,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: gridRef.current,
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
    <section ref={sectionRef} className="py-20 lg:py-28 bg-gray-50">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <span className="inline-block px-4 py-1.5 bg-white text-sm text-[#6A6A6A] rounded-full mb-4 border border-gray-100">
            {whyUsConfig.label}
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-[#0A0A0A]">
            {whyUsConfig.heading}
          </h2>
        </div>

        {/* Features Grid */}
        <div
          ref={gridRef}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {whyUsConfig.features.map((feature) => {
            const IconComponent = iconMap[feature.iconName];
            return (
              <div
                key={feature.title}
                className="feature-item bg-white rounded-2xl p-6 lg:p-8 border border-gray-100 hover:shadow-md transition-shadow duration-300"
              >
                {/* Icon */}
                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-[#0A0A0A] mb-5">
                  <IconComponent />
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-[#0A0A0A] mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-[#6A6A6A]">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
