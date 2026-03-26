import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Star, TrendingUp, Crown } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useGoToQuoteForm } from '@/hooks/useGoToQuoteForm';

gsap.registerPlugin(ScrollTrigger);

interface BestSellerProduct {
  id: string;
  name: string;
  category: 'tshirt' | 'hoodie' | 'hat';
  badge: string;
  badgeIcon: React.ReactNode;
  badgeColor: string;
  description: string;
  image: string;
  variants: { color: string; colorCode: string; image: string }[];
  gsm?: number;
  fabric: string;
  fit: string;
  features: string[];
  customizationOptions: string[];
}

const bestSellers: BestSellerProduct[] = [
  {
    id: "bestseller-250-tee",
    name: "Premium Tee 250GSM",
    category: "tshirt",
    badge: "Best Seller",
    badgeIcon: <Star size={14} />,
    badgeColor: "#088571",
    description: "Perfect balance between comfort and premium feel",
    image: "/images/tshirts/240-heavyweight-black.jpg",
    variants: [
      { color: "Black", colorCode: "#0A0A0A", image: "/images/tshirts/240-heavyweight-black.jpg" },
      { color: "White", colorCode: "#F5F5F5", image: "/images/tshirts/180-classic-white.jpg" },
      { color: "Grey", colorCode: "#9CA3AF", image: "/images/tshirts/180-classic-grey.jpg" },
      { color: "Navy", colorCode: "#1E3A5F", image: "/images/tshirts/190-premium-navy.jpg" },
    ],
    gsm: 250,
    fabric: "100% Premium Heavy Cotton",
    fit: "Regular/Oversized",
    features: ["Premium weight", "Soft hand-feel", "Durable"],
    customizationOptions: ["DTF Print", "Embroidery", "Screen Print"],
  },
  {
    id: "bestseller-dad-hat",
    name: "Classic Dad Cap",
    category: "hat",
    badge: "Most Popular",
    badgeIcon: <TrendingUp size={14} />,
    badgeColor: "#F59E0B",
    description: "Classic everyday cap with versatile style",
    image: "/images/hats/dadcap-black.jpg",
    variants: [
      { color: "Black", colorCode: "#0A0A0A", image: "/images/hats/dadcap-black.jpg" },
      { color: "Navy", colorCode: "#1E3A5F", image: "/images/hats/dadcap-navy.jpg" },
      { color: "Khaki", colorCode: "#C3B091", image: "/images/hats/dadcap-khaki.jpg" },
      { color: "White", colorCode: "#F5F5F5", image: "/images/hats/structured-white.jpg" },
    ],
    fabric: "100% Cotton Twill",
    fit: "Adjustable Strap",
    features: ["Unstructured", "Low profile", "Everyday wear"],
    customizationOptions: ["Embroidery", "Patch"],
  },
  {
    id: "bestseller-320-hoodie",
    name: "Heavyweight Hoodie 320GSM",
    category: "hoodie",
    badge: "Premium Pick",
    badgeIcon: <Crown size={14} />,
    badgeColor: "#7C3AED",
    description: "Heavyweight hoodie with high-end structure and feel",
    image: "/images/hoodies/320-heavyweight-black.jpg",
    variants: [
      { color: "Black", colorCode: "#0A0A0A", image: "/images/hoodies/320-heavyweight-black.jpg" },
      { color: "Grey", colorCode: "#9CA3AF", image: "/images/hoodies/280-midweight-grey.jpg" },
      { color: "Off-White", colorCode: "#F0EDE5", image: "/images/hoodies/320-heavyweight-offwhite.jpg" },
      { color: "Charcoal", colorCode: "#374151", image: "/images/hoodies/320-heavyweight-charcoal.jpg" },
    ],
    gsm: 320,
    fabric: "100% Heavy Cotton Fleece",
    fit: "Regular Fit",
    features: ["Thick fleece", "Maximum warmth", "Premium construction"],
    customizationOptions: ["DTF Print", "Embroidery", "Puff Print"],
  },
];

export default function BestSellers() {
  const goToQuoteForm = useGoToQuoteForm();
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const [selectedProduct, setSelectedProduct] = useState<BestSellerProduct | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<number>(0);
  const [showProductDetail, setShowProductDetail] = useState(false);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { y: 40, opacity: 0 },
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

      cardsRef.current.forEach((card, i) => {
        if (card) {
          gsap.fromTo(
            card,
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              delay: 0.1 + i * 0.15,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 70%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const openProductDetail = (product: BestSellerProduct) => {
    setSelectedProduct(product);
    setSelectedVariant(0);
    setShowProductDetail(true);
  };

  const scrollToQuote = () => goToQuoteForm();

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-20 lg:py-28 bg-[#F5F5F5] z-35"
    >
      <div className="relative px-6 lg:px-[7vw]">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12">
          <span className="text-[#088571] text-xs font-mono tracking-[0.12em] uppercase block mb-3">
            Featured
          </span>
          <h2 className="text-[#0A0A0A] font-bold text-[clamp(32px,3.6vw,48px)] leading-[1.05] tracking-[-0.02em] mb-3">
            Best Sellers
          </h2>
          <p className="text-[#6A6A6A] text-lg max-w-xl mx-auto">
            Most popular choices among brands and businesses
          </p>
        </div>

        {/* Products Grid - Mobile: 2 per row, Desktop: 3 per row */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
          {bestSellers.map((product, index) => (
            <div
              key={product.id}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="group bg-white border border-[#E5E5E5] rounded-xl overflow-hidden hover:border-[#088571]/30 hover:shadow-xl transition-all duration-300"
            >
              {/* Image */}
              <div className="aspect-[4/5] overflow-hidden bg-[#F5F5F5] relative">
                <img
                  src={product.variants[0].image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Badge */}
                <div 
                  className="absolute top-3 left-3 px-3 py-1.5 rounded-full flex items-center gap-1.5"
                  style={{ backgroundColor: product.badgeColor }}
                >
                  {product.badgeIcon}
                  <span className="text-white text-xs font-medium">{product.badge}</span>
                </div>
                {/* Color Count */}
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md">
                  <span className="text-[#088571] text-xs font-medium">+50 colors</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 lg:p-6">
                {/* Name */}
                <h3 className="text-[#0A0A0A] font-semibold text-base lg:text-lg mb-1 group-hover:text-[#088571] transition-colors">
                  {product.name}
                </h3>

                {/* Description */}
                <p className="text-[#6A6A6A] text-sm mb-3 line-clamp-2">
                  {product.description}
                </p>

                {/* Specs */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {product.gsm && (
                    <span className="px-2 py-1 bg-[#F5F5F5] text-[#6A6A6A] text-xs rounded-full">
                      {product.gsm} GSM
                    </span>
                  )}
                  <span className="px-2 py-1 bg-[#F5F5F5] text-[#6A6A6A] text-xs rounded-full">
                    {product.fit}
                  </span>
                </div>

                {/* Color Swatches */}
                <div className="flex gap-1.5 mb-4">
                  {product.variants.slice(0, 4).map((variant) => (
                    <span
                      key={variant.color}
                      className="w-4 h-4 lg:w-5 lg:h-5 rounded-full border border-[#E5E5E5]"
                      style={{ backgroundColor: variant.colorCode }}
                      title={variant.color}
                    />
                  ))}
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-2">
                  <button
                    onClick={() => openProductDetail(product)}
                    className="flex-1 bg-[#088571] text-white py-2.5 text-sm font-medium hover:bg-[#066b5a] transition-colors rounded-md"
                  >
                    Request Quote
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Product Detail Modal */}
      <Dialog open={showProductDetail} onOpenChange={setShowProductDetail}>
        <DialogContent className="bg-white border border-[#E5E5E5] text-[#0A0A0A] max-w-3xl max-h-[90vh] overflow-y-auto p-0">
          {selectedProduct && (
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Image Section */}
              <div className="bg-[#F5F5F5] p-6 lg:p-8">
                <div className="aspect-square rounded-lg overflow-hidden mb-4">
                  <img
                    src={selectedProduct.variants[selectedVariant].image}
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Color Swatches */}
                <div className="flex gap-2 flex-wrap">
                  {selectedProduct.variants.map((variant, idx) => (
                    <button
                      key={variant.color}
                      onClick={() => setSelectedVariant(idx)}
                      className={`flex items-center gap-2 px-3 py-2 text-sm border rounded-md transition-all ${
                        selectedVariant === idx
                          ? 'border-[#088571] bg-[#088571]/5 text-[#0A0A0A]'
                          : 'border-[#E5E5E5] text-[#6A6A6A] hover:border-[#088571]/50'
                      }`}
                    >
                      <span
                        className="w-4 h-4 rounded-full border border-[#E5E5E5]"
                        style={{ backgroundColor: variant.colorCode }}
                      />
                      {variant.color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Details Section */}
              <div className="p-6 lg:p-8">
                <DialogHeader className="mb-4">
                  <div 
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full w-fit mb-2"
                    style={{ backgroundColor: selectedProduct.badgeColor }}
                  >
                    {selectedProduct.badgeIcon}
                    <span className="text-white text-xs font-medium">{selectedProduct.badge}</span>
                  </div>
                  <DialogTitle className="text-xl lg:text-2xl font-bold text-[#0A0A0A]">
                    {selectedProduct.name}
                  </DialogTitle>
                </DialogHeader>

                {/* Description */}
                <p className="text-[#6A6A6A] mb-4">{selectedProduct.description}</p>

                {/* Specs */}
                <div className="space-y-3 mb-4">
                  {selectedProduct.gsm && (
                    <div className="flex justify-between">
                      <span className="text-[#6A6A6A] text-sm">Fabric Weight</span>
                      <span className="text-[#0A0A0A] font-medium">{selectedProduct.gsm} GSM</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-[#6A6A6A] text-sm">Fit</span>
                    <span className="text-[#0A0A0A] font-medium">{selectedProduct.fit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6A6A6A] text-sm">Fabric</span>
                    <span className="text-[#0A0A0A] font-medium">{selectedProduct.fabric}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6A6A6A] text-sm">Colors</span>
                    <span className="text-[#088571] font-medium">+50 available</span>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-[#0A0A0A] mb-2">Features</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProduct.features.map((feature) => (
                      <span key={feature} className="px-2 py-1 bg-[#F5F5F5] text-[#6A6A6A] text-xs rounded-full">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Customization Options */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-[#0A0A0A] mb-2">Customization</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProduct.customizationOptions.map((option) => (
                      <span key={option} className="px-2 py-1 bg-[#088571]/10 text-[#088571] text-xs rounded-full">
                        {option}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <button
                  onClick={() => {
                    setShowProductDetail(false);
                    scrollToQuote();
                  }}
                  className="w-full bg-[#088571] text-white py-3 font-medium hover:bg-[#066b5a] transition-colors rounded-md flex items-center justify-center gap-2"
                >
                  Request Quote
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
