import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';

export function Hero() {
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
                High-Quality Garments for Your Brand
              </h1>
              <p className="text-lg text-[#6A6A6A] max-w-xl">
                From lightweight basics to ultra-heavyweight statement pieces. Premium blank apparel ready for your custom branding.
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
              <a
                href="#quote"
                className="bg-white text-[#0A0A0A] px-8 py-4 text-base font-medium border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors rounded-sm"
              >
                Request a Quote
              </a>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-8 border-t border-gray-100">
              <div>
                <p className="text-3xl font-bold text-[#0A0A0A]">50+</p>
                <p className="text-sm text-[#6A6A6A]">Colors Available</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-[#0A0A0A]">180-400</p>
                <p className="text-sm text-[#6A6A6A]">GSM Range</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-[#0A0A0A]">4</p>
                <p className="text-sm text-[#6A6A6A]">Product Categories</p>
              </div>
            </div>
          </div>

          {/* Right Content - Product Preview */}
          <div 
            className={`hidden lg:block relative transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}
          >
            <div className="relative">
              {/* Main Product Image */}
              <div className="relative bg-gray-50 rounded-2xl p-8 aspect-square">
                <img
                  src="/images/tshirts/260-ultra-espresso.jpg"
                  alt="Premium T-Shirt"
                  className="w-full h-full object-contain"
                />
                {/* Floating Badge */}
                <div className="absolute top-6 left-6 px-4 py-2 bg-[#088571] text-white text-sm font-semibold rounded-full">
                  260 GSM
                </div>
              </div>
              
              {/* Floating Cards */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4 border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#088571]/10 rounded-full flex items-center justify-center">
                    <span className="text-[#088571] text-lg">✓</span>
                  </div>
                  <div>
                    <p className="font-semibold text-[#0A0A0A]">Premium Quality</p>
                    <p className="text-sm text-[#6A6A6A]">100% Cotton</p>
                  </div>
                </div>
              </div>

              <div className="absolute -top-6 -right-6 bg-white rounded-xl shadow-lg p-4 border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <span className="text-orange-500 text-lg">★</span>
                  </div>
                  <div>
                    <p className="font-semibold text-[#0A0A0A]">Most Popular</p>
                    <p className="text-sm text-[#6A6A6A]">Best Seller</p>
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
