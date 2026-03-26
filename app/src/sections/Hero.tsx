import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useGoToQuoteForm } from '@/hooks/useGoToQuoteForm';

export function Hero() {
  const goToQuoteForm = useGoToQuoteForm();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToCatalog = () => {
    const element = document.querySelector('#products');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen bg-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #0A0A0A 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full py-20">
          {/* Left Content */}
          <div 
            className={`space-y-8 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="space-y-4">
              <span className="inline-block px-4 py-1.5 bg-[#088571]/10 text-[#088571] text-sm font-medium rounded-full">
                Premium Blank Apparel
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0A0A0A] leading-tight">
                Everything Your Brand Needs to Build Apparel
              </h1>
              <p className="text-lg text-[#6A6A6A] max-w-xl">
                We are a textile broker that helps you simplify the entire process — avoiding the need to deal with multiple suppliers while ensuring quality, reliability, and the right decisions for your brand.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={scrollToCatalog}
                className="bg-[#088571] text-white px-8 py-4 text-base font-medium hover:bg-[#066b5a] transition-colors rounded-sm flex items-center gap-2 group"
              >
                Browse Catalog
                <ChevronDown size={18} className="group-hover:translate-y-1 transition-transform" />
              </button>
              <button
                type="button"
                onClick={() => goToQuoteForm()}
                className="bg-white text-[#0A0A0A] px-8 py-4 text-base font-medium border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors rounded-sm"
              >
                Request a Quote
              </button>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div 
            className={`hidden lg:block relative transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}
          >
            <div className="relative">
              <div className="relative bg-gray-50 rounded-2xl overflow-hidden aspect-[3/4]">
                <img
                  src="/images/hero-model.jpg"
                  alt="Premium blank apparel"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
