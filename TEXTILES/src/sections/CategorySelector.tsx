import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Category {
  id: string;
  label: string;
  icon: string;
}

const categories: Category[] = [
  { id: 'tshirt', label: 'T-Shirts', icon: '/images/icons/tshirt.png' },
  { id: 'hoodie', label: 'Hoodies', icon: '/images/icons/hoodie.png' },
  { id: 'hat', label: 'Hats', icon: '/images/icons/hat.png' },
  { id: 'sportswear', label: 'Sportswear', icon: '/images/icons/sportswear.png' },
];

export default function CategorySelector() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const buttonsRef = useRef<(HTMLButtonElement | null)[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      buttonsRef.current.forEach((btn, i) => {
        if (btn) {
          gsap.fromTo(
            btn,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.5,
              delay: 0.1 + i * 0.08,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToCategory = (categoryId: string) => {
    const element = document.querySelector(`#${categoryId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-16 lg:py-24 bg-white z-30"
    >
      <div className="relative px-6 lg:px-[7vw]">
        {/* Title */}
        <h2
          ref={titleRef}
          className="text-[#0A0A0A] font-semibold text-xl lg:text-2xl text-center mb-10"
        >
          What are you looking for
        </h2>

        {/* Category Buttons */}
        <div className="flex flex-wrap justify-center gap-4 lg:gap-6">
          {categories.map((category, index) => (
            <button
              key={category.id}
              ref={(el) => { buttonsRef.current[index] = el; }}
              onClick={() => scrollToCategory(category.id)}
              className="flex flex-col items-center gap-3 px-6 py-5 lg:px-8 lg:py-6 bg-[#F5F5F5] border border-[#E5E5E5] rounded-xl min-w-[120px] lg:min-w-[140px] hover:border-[#088571]/50 hover:bg-white hover:shadow-lg transition-all duration-300 group"
            >
              <img
                src={category.icon}
                alt={category.label}
                className="w-10 h-10 lg:w-12 lg:h-12 object-contain opacity-80 group-hover:opacity-100 transition-opacity"
              />
              <span className="text-[#0A0A0A] text-sm lg:text-base font-medium">
                {category.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
