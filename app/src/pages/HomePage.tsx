import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Palette, Package, Truck, Shield, Clock, Headphones, ArrowRight } from 'lucide-react';
import { productsConfig } from '../config';
import { QuoteForm } from '../sections/QuoteForm';
import { useGoToQuoteForm } from '@/hooks/useGoToQuoteForm';

export function HomePage() {
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

  // Get featured products for each category
  const featuredTshirt = productsConfig.products.find(p => p.id === 'tshirt-260-ultra');
  const featuredHoodie = productsConfig.products.find(p => p.id === 'hoodie-320-heavyweight');
  const featuredHat = productsConfig.products.find(p => p.id === 'hat-cotton-dad');
  const featuredSportswear = productsConfig.products.find((p) => p.id === 'sportswear-short-sleeve-tee');

  const features = [
    { icon: Palette, title: 'Custom Branding', description: 'DTF printing, embroidery, screen printing, and more customization options for your brand.' },
    { icon: Package, title: 'Bulk Orders', description: 'Competitive pricing on bulk orders with flexible quantity options to suit your needs.' },
    { icon: Truck, title: 'Fast Shipping', description: 'Quick turnaround times and reliable shipping to get your products when you need them.' },
    { icon: Shield, title: 'Quality Guaranteed', description: 'Premium materials and rigorous quality control to ensure every piece meets our standards.' },
    { icon: Clock, title: '24h Response', description: 'Get a quote within 24 hours. Our team is ready to help bring your vision to life.' },
    { icon: Headphones, title: 'Dedicated Support', description: 'Personal account manager to guide you through the entire process from quote to delivery.' },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-screen bg-white overflow-hidden pt-20">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #0A0A0A 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 min-h-[calc(100vh-5rem)] flex items-center">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full py-12">
            <div className={`space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
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
                <Link
                  to="/services"
                  className="bg-white text-[#0A0A0A] px-8 py-4 text-base font-medium border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors rounded-sm flex items-center gap-2"
                >
                  Our Services
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>

            <div className={`hidden lg:block relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
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
      </section>

      {/* Featured Categories */}
      <section id="products" className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-[#088571]/10 text-[#088571] text-sm font-medium rounded-full mb-4">
              Our Catalog
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#0A0A0A] mb-4">
              Premium Blank Apparel
            </h2>
            <p className="text-[#6A6A6A] max-w-2xl mx-auto">
              High-quality blank garments ready for your custom branding. From lightweight basics to ultra-heavyweight statement pieces.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* T-Shirts */}
            <Link to="/tshirts" className="group">
              <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-[#088571]/30 hover:shadow-lg transition-all duration-300">
                <div className="aspect-square bg-gray-50 p-8">
                  {featuredTshirt && (
                    <img
                      src={featuredTshirt.image}
                      alt="T-Shirts"
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <img src="/images/icons/tshirt-icon.png" alt="T-Shirts" className="w-8 h-8 object-contain" />
                    <h3 className="text-xl font-bold text-[#0A0A0A]">T-Shirts</h3>
                  </div>
                  <p className="text-[#6A6A6A] mb-4">From 180GSM lightweight to 330GSM ultra-heavyweight. Perfect for any brand.</p>
                  <span className="text-[#088571] font-medium flex items-center gap-2">
                    View Collection <ArrowRight size={16} />
                  </span>
                </div>
              </div>
            </Link>

            {/* Hoodies */}
            <Link to="/hoodies" className="group">
              <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-[#088571]/30 hover:shadow-lg transition-all duration-300">
                <div className="aspect-square bg-gray-50 p-8">
                  {featuredHoodie && (
                    <img
                      src={featuredHoodie.image}
                      alt="Hoodies"
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <img src="/images/icons/hoodie-icon.png" alt="Hoodies" className="w-8 h-8 object-contain" />
                    <h3 className="text-xl font-bold text-[#0A0A0A]">Hoodies</h3>
                  </div>
                  <p className="text-[#6A6A6A] mb-4">From 280GSM midweight to 400GSM premium. Stay warm in style.</p>
                  <span className="text-[#088571] font-medium flex items-center gap-2">
                    View Collection <ArrowRight size={16} />
                  </span>
                </div>
              </div>
            </Link>

            {/* Hats */}
            <Link to="/hats" className="group">
              <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-[#088571]/30 hover:shadow-lg transition-all duration-300">
                <div className="aspect-square bg-gray-50 p-8">
                  {featuredHat && (
                    <img
                      src={featuredHat.image}
                      alt="Hats"
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <img src="/images/icons/hat-icon.png" alt="Hats" className="w-8 h-8 object-contain" />
                    <h3 className="text-xl font-bold text-[#0A0A0A]">Hats</h3>
                  </div>
                  <p className="text-[#6A6A6A] mb-4">Dad caps, trucker hats, and structured caps. Complete your brand look.</p>
                  <span className="text-[#088571] font-medium flex items-center gap-2">
                    View Collection <ArrowRight size={16} />
                  </span>
                </div>
              </div>
            </Link>
          </div>

          {/* Sportswear — debajo de gorras (misma fila en desktop: columna 3) */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="hidden md:block" aria-hidden />
            <div className="hidden md:block" aria-hidden />
            <Link to="/sportswear" className="group">
              <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-[#088571]/30 hover:shadow-lg transition-all duration-300">
                <div className="aspect-square bg-gray-50 p-8">
                  {featuredSportswear && (
                    <img
                      src={featuredSportswear.image}
                      alt="Sportswear"
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <img src="/images/icons/sportswear-icon.png" alt="Sportswear" className="w-8 h-8 object-contain" />
                    <h3 className="text-xl font-bold text-[#0A0A0A]">Sportswear</h3>
                  </div>
                  <p className="text-[#6A6A6A] mb-4">
                    Performance tees for training, teams, and active brands — moisture-wicking and breathable.
                  </p>
                  <span className="text-[#088571] font-medium flex items-center gap-2">
                    View Collection <ArrowRight size={16} />
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* What We Can Do Section */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-[#088571]/10 text-[#088571] text-sm font-medium rounded-full mb-4">
              What We Can Do
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#0A0A0A] mb-4">
              End-to-End Apparel Solutions
            </h2>
            <p className="text-[#6A6A6A] max-w-2xl mx-auto">
              From custom printing techniques to professional packaging and labeling, we handle every detail of your apparel production.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Custom Printing */}
            <Link to="/services#printing" className="group">
              <div className="bg-gray-50 rounded-2xl p-8 h-full hover:bg-[#088571]/5 hover:border-[#088571]/20 border-2 border-transparent transition-all duration-300">
                <div className="w-16 h-16 bg-[#088571]/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#088571] transition-colors">
                  <Palette className="w-8 h-8 text-[#088571] group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-[#0A0A0A] mb-3">Custom Printing</h3>
                <p className="text-[#6A6A6A]">DTF, screen printing, sublimation, and embroidery techniques for vibrant, lasting designs.</p>
              </div>
            </Link>

            {/* Packaging */}
            <Link to="/services#packaging" className="group">
              <div className="bg-gray-50 rounded-2xl p-8 h-full hover:bg-[#088571]/5 hover:border-[#088571]/20 border-2 border-transparent transition-all duration-300">
                <div className="w-16 h-16 bg-[#088571]/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#088571] transition-colors">
                  <Package className="w-8 h-8 text-[#088571] group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-[#0A0A0A] mb-3">Packaging</h3>
                <p className="text-[#6A6A6A]">Custom poly bags, boxes, and branded packaging that elevates your unboxing experience.</p>
              </div>
            </Link>

            {/* Labeling */}
            <Link to="/services#labeling" className="group">
              <div className="bg-gray-50 rounded-2xl p-8 h-full hover:bg-[#088571]/5 hover:border-[#088571]/20 border-2 border-transparent transition-all duration-300">
                <div className="w-16 h-16 bg-[#088571]/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#088571] transition-colors">
                  <Shield className="w-8 h-8 text-[#088571] group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-[#0A0A0A] mb-3">Labeling</h3>
                <p className="text-[#6A6A6A]">Woven labels, hang tags, and size labels that complete your brand identity.</p>
              </div>
            </Link>
          </div>

          <div className="text-center mt-12">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 bg-[#0A0A0A] text-white px-8 py-4 rounded-full font-medium hover:bg-[#333333] transition-colors"
            >
              Explore All Services
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-[#088571]/10 text-[#088571] text-sm font-medium rounded-full mb-4">
              Why Choose Us
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#0A0A0A] mb-4">
              Everything You Need for Your Brand
            </h2>
            <p className="text-[#6A6A6A] max-w-2xl mx-auto">
              From premium blank apparel to custom branding solutions, we provide end-to-end service for your clothing brand.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group p-8 bg-white rounded-2xl hover:bg-[#088571]/5 hover:border-[#088571]/20 border border-transparent transition-all duration-300"
              >
                <div className="w-14 h-14 bg-[#088571]/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#088571] transition-colors">
                  <feature.icon className="w-7 h-7 text-[#088571] group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-semibold text-[#0A0A0A] mb-3">{feature.title}</h3>
                <p className="text-[#6A6A6A] leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28 bg-[#0A0A0A]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
            Ready to Build Your Brand?
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-10 text-lg">
            Let us help you create premium apparel that represents your brand. Get a custom quote within 24 hours.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/why-us"
              className="bg-white text-[#0A0A0A] px-8 py-4 text-base font-medium rounded-full hover:bg-gray-100 transition-colors"
            >
              Learn Why Us
            </Link>
            <button
              type="button"
              onClick={() => goToQuoteForm()}
              className="bg-[#088571] text-white px-8 py-4 text-base font-medium rounded-full hover:bg-[#066b5a] transition-colors"
            >
              Get a Quote
            </button>
          </div>
        </div>
      </section>

      <QuoteForm />
    </div>
  );
}
