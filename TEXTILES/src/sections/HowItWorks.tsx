import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { howItWorksConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

export function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const steps = stepsRef.current?.querySelectorAll('.step-item');
      if (steps) {
        gsap.fromTo(
          steps,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: stepsRef.current,
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
    <section ref={sectionRef} className="py-20 lg:py-28 bg-white">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <span className="inline-block px-4 py-1.5 bg-gray-100 text-sm text-[#6A6A6A] rounded-full mb-4">
            {howItWorksConfig.label}
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-[#0A0A0A]">
            {howItWorksConfig.heading}
          </h2>
        </div>

        {/* Steps */}
        <div
          ref={stepsRef}
          className="grid md:grid-cols-3 gap-8 lg:gap-12"
        >
          {howItWorksConfig.steps.map((step, index) => (
            <div
              key={step.number}
              className="step-item relative text-center"
            >
              {/* Connector Line */}
              {index < howItWorksConfig.steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-px bg-gray-200" />
              )}

              {/* Step Number */}
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#0A0A0A] text-white text-xl font-bold rounded-full mb-6">
                {step.number}
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-[#0A0A0A] mb-3">
                {step.title}
              </h3>
              <p className="text-[#6A6A6A] max-w-xs mx-auto">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
