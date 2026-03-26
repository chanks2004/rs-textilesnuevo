import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Upload, X, Check, Loader2 } from 'lucide-react';
import { productsConfig } from '../config';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import emailjs from '@emailjs/browser';
import { toast } from 'sonner';
import {
  EMAILJS_PUBLIC_KEY,
  EMAILJS_SERVICE_ID,
  EMAILJS_TEMPLATE_ID,
} from '../lib/emailjsConfig';

gsap.registerPlugin(ScrollTrigger);

type ProductCategory = 'tshirt' | 'hoodie' | 'hat' | 'sportswear';

interface CategorySectionProps {
  category: ProductCategory;
  title: string;
  description: string;
  tierGroups: { id: string; label: string; range: string; description: string; products: typeof productsConfig.products }[];
  bestSellers: {
    id: string;
    name: string;
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
  }[];
}

// Category icon images
const categoryIcons: Record<ProductCategory, string> = {
  tshirt: '/images/icons/tshirt.png',
  hoodie: '/images/icons/hoodie.png',
  hat: '/images/icons/hat.png',
  sportswear: '/images/icons/sportswear.png',
};

export default function CategorySection({ category, title, description, tierGroups, bestSellers }: CategorySectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const catalogRef = useRef<HTMLDivElement>(null);
  const bestSellersRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const [selectedProduct, setSelectedProduct] = useState<typeof productsConfig.products[0] | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<number>(0);
  const [showProductDetail, setShowProductDetail] = useState(false);
  const [selectedBestSeller, setSelectedBestSeller] = useState<typeof bestSellers[0] | null>(null);
  const [selectedBestSellerVariant, setSelectedBestSellerVariant] = useState<number>(0);
  const [showBestSellerDetail, setShowBestSellerDetail] = useState(false);
  
  // Quote modal state
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [quoteProduct, setQuoteProduct] = useState<typeof productsConfig.products[0] | null>(null);
  const [quoteVariant, setQuoteVariant] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [filePreviews, setFilePreviews] = useState<string[]>([]);

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

      gsap.fromTo(
        catalogRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        bestSellersRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: 0.3,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: bestSellersRef.current,
            start: 'top 85%',
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
                trigger: bestSellersRef.current,
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

  const openProductDetail = (product: typeof productsConfig.products[0]) => {
    setSelectedProduct(product);
    setSelectedVariant(0);
    setShowProductDetail(true);
  };

  const openBestSellerDetail = (product: typeof bestSellers[0]) => {
    setSelectedBestSeller(product);
    setSelectedBestSellerVariant(0);
    setShowBestSellerDetail(true);
  };

  const openQuoteModal = (product: typeof productsConfig.products[0], variantIdx: number = 0) => {
    setQuoteProduct(product);
    setQuoteVariant(variantIdx);
    setFiles([]);
    setFilePreviews([]);
    setShowQuoteModal(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...newFiles]);
      
      newFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFilePreviews((prev) => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setFilePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleQuoteSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!quoteProduct) return;

    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      const baseMessage = String(formData.get('additional_details') ?? '').trim();
      const fileNames = files.map((f) => f.name).join(', ');
      const fileNote =
        fileNames.length > 0
          ? `Reference file names (not attached via email): ${fileNames}`
          : '';
      const contextNote = `[Product: ${quoteProduct.name} | Category: ${category} | Color variant: ${quoteProduct.variants[quoteVariant]?.color ?? '—'} | GSM: ${quoteProduct.gsm ?? 'N/A'} | Fabric: ${quoteProduct.fabric} | Fit: ${quoteProduct.fit}]`;
      const additional_details = [baseMessage, fileNote, contextNote].filter(Boolean).join('\n\n');

      const templateParams = {
        user_name: String(formData.get('user_name') ?? '').trim(),
        user_email: String(formData.get('user_email') ?? '').trim(),
        company_name: String(formData.get('company_name') ?? '').trim() || '—',
        user_phone: String(formData.get('user_phone') ?? '').trim() || '—',
        product_type: quoteProduct.name,
        estimated_quantity: String(formData.get('estimated_quantity') ?? '').trim(),
        preferred_colors: String(formData.get('preferred_colors') ?? '').trim() || '—',
        size_breakdown: String(formData.get('size_breakdown') ?? '').trim() || '—',
        delivery_date: String(formData.get('delivery_date') ?? '').trim() || '—',
        customization_type: String(formData.get('customization_type') ?? '').trim() || '—',
        additional_details: additional_details || '—',
      };

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      toast.success('Your request has been sent successfully. We will contact you shortly.');
      setShowQuoteModal(false);
      setFiles([]);
      setFilePreviews([]);
    } catch (error) {
      console.error('Error sending email:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      id={category}
      className="relative w-full py-20 lg:py-28 bg-white z-30"
    >
      <div className="relative px-6 lg:px-[7vw]">
        {/* Header */}
        <div ref={headerRef} className="mb-10">
          <div className="flex items-center gap-4 mb-4">
            <img src={categoryIcons[category]} alt={title} className="w-10 h-10 object-contain" />
            <span className="text-[#088571] text-xs font-mono tracking-[0.12em] uppercase">
              Product Catalog
            </span>
          </div>
          <h2 className="text-[#0A0A0A] font-bold text-[clamp(32px,3.6vw,56px)] leading-[1.05] tracking-[-0.02em] mb-4">
            {title}
          </h2>
          <p className="text-[#6A6A6A] text-lg max-w-2xl">
            {description}
          </p>
        </div>

        {/* Product Catalog */}
        <div ref={catalogRef} className="space-y-16 mb-20">
          {tierGroups.map((group) => (
            <div key={group.id} className="space-y-6">
              {/* Tier Header */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <h3 className="text-[#0A0A0A] font-semibold text-xl whitespace-nowrap">{group.label}</h3>
                  <span className="text-[#088571] text-sm font-mono bg-[#088571]/10 px-2 py-1 rounded">{group.range}</span>
                </div>
                <div className="flex-1 h-px bg-[#E5E5E5]" />
              </div>
              {/* Tier Description */}
              <p className="text-[#6A6A6A] text-sm max-w-3xl -mt-2">{group.description}</p>
              {/* Product Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 lg:gap-6">
                {group.products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onViewDetails={openProductDetail}
                    onRequestQuote={openQuoteModal}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Best Sellers Section */}
        <div ref={bestSellersRef} className="bg-[#F5F5F5] -mx-6 lg:-mx-[7vw] px-6 lg:px-[7vw] py-16">
          <div className="text-center mb-10">
            <span className="text-[#088571] text-xs font-mono tracking-[0.12em] uppercase block mb-3">
              Featured
            </span>
            <h3 className="text-[#0A0A0A] font-bold text-[clamp(28px,3vw,42px)] leading-[1.05] tracking-[-0.02em] mb-3">
              {title} Best Sellers
            </h3>
            <p className="text-[#6A6A6A] text-lg max-w-xl mx-auto">
              Most popular choices among brands and businesses
            </p>
          </div>

          {/* Best Sellers Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8 max-w-5xl mx-auto">
            {bestSellers.map((product, index) => (
              <div
                key={product.id}
                ref={(el) => { cardsRef.current[index] = el; }}
                className="group bg-white border border-[#E5E5E5] rounded-xl overflow-hidden hover:border-[#088571]/30 hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => openBestSellerDetail(product)}
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
                    className="absolute top-3 left-3 px-2 py-1 rounded-full flex items-center gap-1"
                    style={{ backgroundColor: product.badgeColor }}
                  >
                    {product.badgeIcon}
                    <span className="text-white text-[10px] font-medium">{product.badge}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h4 className="text-[#0A0A0A] font-semibold text-base mb-1 group-hover:text-[#088571] transition-colors">
                    {product.name}
                  </h4>
                  <p className="text-[#6A6A6A] text-sm mb-1 line-clamp-2">
                    {product.description}
                  </p>
                  <p className="text-[#088571] text-[10px] mb-2">
                    {category === 'sportswear' ? '15+ colors available upon request' : '50+ colors available upon quote'}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {product.gsm && (
                      <span className="px-2 py-0.5 bg-[#F5F5F5] text-[#6A6A6A] text-[10px] rounded-full">
                        {product.gsm} GSM
                      </span>
                    )}
                    <span className="px-2 py-0.5 bg-[#F5F5F5] text-[#6A6A6A] text-[10px] rounded-full">
                      {product.fit}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Product Detail Modal */}
      <Dialog open={showProductDetail} onOpenChange={setShowProductDetail}>
        <DialogContent className="bg-white border border-[#E5E5E5] text-[#0A0A0A] max-w-4xl max-h-[90vh] overflow-y-auto p-0">
          {selectedProduct && (
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Image Section */}
              <div className="bg-[#F5F5F5] p-8">
                <div className="aspect-square rounded-lg overflow-hidden mb-4">
                  <img
                    src={selectedProduct.variants[selectedVariant]?.image || selectedProduct.image}
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
              <div className="p-8">
                <DialogHeader className="mb-6">
                  <span className="text-[#088571] text-xs font-mono uppercase tracking-wider mb-2">
                    {category === 'tshirt' ? 'T-Shirt' : category === 'hoodie' ? 'Hoodie' : category === 'hat' ? 'Hat' : 'Sportswear'}
                  </span>
                  <DialogTitle className="text-2xl font-bold text-[#0A0A0A]">
                    {selectedProduct.name}
                  </DialogTitle>
                </DialogHeader>

                {/* Specs */}
                <div className="space-y-4 mb-6">
                  {selectedProduct.gsm && (
                    <div className="flex items-center gap-3">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#088571]">
                        <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                        <path d="M2 17l10 5 10-5"/>
                        <path d="M2 12l10 5 10-5"/>
                      </svg>
                      <div>
                        <span className="text-[#6A6A6A] text-sm">Fabric Weight</span>
                        <p className="text-[#0A0A0A] font-medium">{selectedProduct.gsm} GSM</p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center gap-3">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#088571]">
                      <path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"/>
                    </svg>
                    <div>
                      <span className="text-[#6A6A6A] text-sm">Fit</span>
                      <p className="text-[#0A0A0A] font-medium">{selectedProduct.fit}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#088571]">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/>
                      <path d="M2 12h20"/>
                    </svg>
                    <div>
                      <span className="text-[#6A6A6A] text-sm">Colors</span>
                      <p className="text-[#0A0A0A] font-medium">+{selectedProduct.colorCount} colors available</p>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-[#6A6A6A] mb-6">{selectedProduct.description}</p>

                {/* Features */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-[#0A0A0A] mb-3">Features</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProduct.features.map((feature) => (
                      <span key={feature} className="px-3 py-1 bg-[#F5F5F5] text-[#6A6A6A] text-sm rounded-full">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Customization Options */}
                <div className="mb-8">
                  <h4 className="text-sm font-medium text-[#0A0A0A] mb-3">Customization Options</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProduct.customizationOptions.map((option) => (
                      <span key={option} className="px-3 py-1 bg-[#088571]/10 text-[#088571] text-sm rounded-full">
                        {option}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => {
                      setShowProductDetail(false);
                      openQuoteModal(selectedProduct, selectedVariant);
                    }}
                    className="w-full bg-[#088571] text-white py-3 font-medium hover:bg-[#066b5a] transition-colors rounded-md flex items-center justify-center gap-2"
                  >
                    Request Quote for This Product
                    <ArrowRight size={16} />
                  </button>
                  <button
                    onClick={() => setShowProductDetail(false)}
                    className="w-full bg-transparent border border-[#E5E5E5] text-[#6A6A6A] py-3 font-medium hover:border-[#088571] hover:text-[#088571] transition-colors rounded-md"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Best Seller Detail Modal */}
      <Dialog open={showBestSellerDetail} onOpenChange={setShowBestSellerDetail}>
        <DialogContent className="bg-white border border-[#E5E5E5] text-[#0A0A0A] max-w-3xl max-h-[90vh] overflow-y-auto p-0">
          {selectedBestSeller && (
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Image Section */}
              <div className="bg-[#F5F5F5] p-6 lg:p-8">
                <div className="aspect-square rounded-lg overflow-hidden mb-4">
                  <img
                    src={selectedBestSeller.variants[selectedBestSellerVariant].image}
                    alt={selectedBestSeller.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Color Swatches */}
                <div className="flex gap-2 flex-wrap">
                  {selectedBestSeller.variants.map((variant, idx) => (
                    <button
                      key={variant.color}
                      onClick={() => setSelectedBestSellerVariant(idx)}
                      className={`flex items-center gap-2 px-3 py-2 text-sm border rounded-md transition-all ${
                        selectedBestSellerVariant === idx
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
                    className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full w-fit mb-2"
                    style={{ backgroundColor: selectedBestSeller.badgeColor }}
                  >
                    {selectedBestSeller.badgeIcon}
                    <span className="text-white text-[10px] font-medium">{selectedBestSeller.badge}</span>
                  </div>
                  <DialogTitle className="text-xl lg:text-2xl font-bold text-[#0A0A0A]">
                    {selectedBestSeller.name}
                  </DialogTitle>
                </DialogHeader>

                {/* Description */}
                <p className="text-[#6A6A6A] mb-4">{selectedBestSeller.description}</p>

                {/* Specs */}
                <div className="space-y-3 mb-4">
                  {selectedBestSeller.gsm && (
                    <div className="flex justify-between">
                      <span className="text-[#6A6A6A] text-sm">Fabric Weight</span>
                      <span className="text-[#0A0A0A] font-medium">{selectedBestSeller.gsm} GSM</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-[#6A6A6A] text-sm">Fit</span>
                    <span className="text-[#0A0A0A] font-medium">{selectedBestSeller.fit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6A6A6A] text-sm">Fabric</span>
                    <span className="text-[#0A0A0A] font-medium">{selectedBestSeller.fabric}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6A6A6A] text-sm">Colors</span>
                    <span className="text-[#088571] font-medium">{category === 'sportswear' ? '15+ colors' : '+50 colors'}</span>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-[#0A0A0A] mb-2">Features</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedBestSeller.features.map((feature) => (
                      <span key={feature} className="px-2 py-1 bg-[#F5F5F5] text-[#6A6A6A] text-xs rounded-full">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <button
                  onClick={() => {
                    setShowBestSellerDetail(false);
                    setShowQuoteModal(true);
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

      {/* Quote Modal with Design Upload */}
      <Dialog open={showQuoteModal} onOpenChange={setShowQuoteModal}>
        <DialogContent className="bg-white border border-[#E5E5E5] text-[#0A0A0A] max-w-2xl max-h-[90vh] overflow-y-auto p-0">
          {quoteProduct && (
            <div className="p-6 lg:p-8">
              <DialogHeader className="mb-6">
                <span className="text-[#088571] text-xs font-mono uppercase tracking-wider mb-2">
                  Request Quote
                </span>
                <DialogTitle className="text-xl font-bold text-[#0A0A0A]">
                  {quoteProduct.name}
                </DialogTitle>
                <p className="text-[#6A6A6A] text-sm mt-1">
                  {quoteProduct.variants[quoteVariant]?.color && `Color: ${quoteProduct.variants[quoteVariant].color}`}
                  {quoteProduct.gsm && ` • ${quoteProduct.gsm} GSM`}
                </p>
              </DialogHeader>

              <form onSubmit={handleQuoteSubmit} className="space-y-5">
                {/* Contact Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#0A0A0A] text-sm font-medium mb-1.5">
                      Full Name <span className="text-[#088571]">*</span>
                    </label>
                    <input
                      type="text"
                      name="user_name"
                      required
                      className="w-full px-4 py-2.5 bg-white border border-[#E5E5E5] rounded-md text-[#0A0A0A] placeholder:text-[#9A9A9A] focus:outline-none focus:border-[#088571] transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-[#0A0A0A] text-sm font-medium mb-1.5">
                      Email Address <span className="text-[#088571]">*</span>
                    </label>
                    <input
                      type="email"
                      name="user_email"
                      required
                      className="w-full px-4 py-2.5 bg-white border border-[#E5E5E5] rounded-md text-[#0A0A0A] placeholder:text-[#9A9A9A] focus:outline-none focus:border-[#088571] transition-colors"
                      placeholder="john@company.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#0A0A0A] text-sm font-medium mb-1.5">
                      Company Name
                    </label>
                    <input
                      type="text"
                      name="company_name"
                      className="w-full px-4 py-2.5 bg-white border border-[#E5E5E5] rounded-md text-[#0A0A0A] placeholder:text-[#9A9A9A] focus:outline-none focus:border-[#088571] transition-colors"
                      placeholder="Your Brand"
                    />
                  </div>
                  <div>
                    <label className="block text-[#0A0A0A] text-sm font-medium mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="user_phone"
                      className="w-full px-4 py-2.5 bg-white border border-[#E5E5E5] rounded-md text-[#0A0A0A] placeholder:text-[#9A9A9A] focus:outline-none focus:border-[#088571] transition-colors"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </div>

                {/* Order Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#0A0A0A] text-sm font-medium mb-1.5">
                      Quantity <span className="text-[#088571]">*</span>
                    </label>
                    <select
                      name="estimated_quantity"
                      required
                      className="w-full px-4 py-2.5 bg-white border border-[#E5E5E5] rounded-md text-[#0A0A0A] focus:outline-none focus:border-[#088571] transition-colors appearance-none"
                    >
                      <option value="">Select quantity</option>
                      <option value="50-100">50 - 100 units</option>
                      <option value="100-250">100 - 250 units</option>
                      <option value="250-500">250 - 500 units</option>
                      <option value="500-1000">500 - 1,000 units</option>
                      <option value="1000+">1,000+ units</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[#0A0A0A] text-sm font-medium mb-1.5">
                      Target Delivery Date
                    </label>
                    <input
                      type="date"
                      name="delivery_date"
                      className="w-full px-4 py-2.5 bg-white border border-[#E5E5E5] rounded-md text-[#0A0A0A] focus:outline-none focus:border-[#088571] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#0A0A0A] text-sm font-medium mb-1.5">
                    Preferred Color(s)
                  </label>
                  <input
                    type="text"
                    name="preferred_colors"
                    key={`${quoteProduct.id}-${quoteVariant}`}
                    defaultValue={quoteProduct.variants[quoteVariant]?.color ?? ''}
                    className="w-full px-4 py-2.5 bg-white border border-[#E5E5E5] rounded-md text-[#0A0A0A] placeholder:text-[#9A9A9A] focus:outline-none focus:border-[#088571] transition-colors"
                    placeholder="e.g., Black, Navy, or specific Pantone"
                  />
                </div>

                <div>
                  <label className="block text-[#0A0A0A] text-sm font-medium mb-1.5">
                    Size Breakdown
                  </label>
                  <input
                    type="text"
                    name="size_breakdown"
                    className="w-full px-4 py-2.5 bg-white border border-[#E5E5E5] rounded-md text-[#0A0A0A] placeholder:text-[#9A9A9A] focus:outline-none focus:border-[#088571] transition-colors"
                    placeholder="e.g., S:10, M:20, L:20, XL:10"
                  />
                </div>

                <div>
                  <label className="block text-[#0A0A0A] text-sm font-medium mb-1.5">
                    Customization Needed
                  </label>
                  <select
                    name="customization_type"
                    className="w-full px-4 py-2.5 bg-white border border-[#E5E5E5] rounded-md text-[#0A0A0A] focus:outline-none focus:border-[#088571] transition-colors appearance-none"
                  >
                    <option value="">Select customization</option>
                    <option value="DTF Printing">DTF Printing</option>
                    <option value="Embroidery">Embroidery</option>
                    <option value="Screen Printing">Screen Printing</option>
                    <option value="Private Label">Private Label</option>
                    <option value="Multiple Services">Multiple Services</option>
                    <option value="Just Blanks (No Customization)">Just Blanks (No Customization)</option>
                  </select>
                </div>

                {/* Design Upload */}
                <div>
                  <label className="block text-[#0A0A0A] text-sm font-medium mb-1.5">
                    Design Files
                  </label>
                  <div className="border-2 border-dashed border-[#E5E5E5] rounded-md p-4 text-center hover:border-[#088571]/50 transition-colors">
                    <input
                      type="file"
                      id="quoteFiles"
                      name="quoteFiles"
                      multiple
                      accept="image/*,.pdf,.ai,.eps,.psd"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="quoteFiles"
                      className="cursor-pointer flex flex-col items-center gap-2"
                    >
                      <Upload className="text-[#6A6A6A]" size={20} />
                      <span className="text-[#6A6A6A] text-sm">
                        Click to upload or drag and drop
                      </span>
                      <span className="text-[#9A9A9A] text-xs">
                        PNG, JPG, PDF, AI, EPS, PSD up to 10MB each
                      </span>
                    </label>
                  </div>
                  
                  {/* Helper Text */}
                  <p className="text-[#9A9A9A] text-xs mt-2">
                    You don't need a design to request a quote. If you already have one, feel free to upload it
                    here.
                  </p>

                  {/* File Previews */}
                  {files.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {files.map((file, index) => (
                        <div
                          key={index}
                          className="relative bg-[#F5F5F5] border border-[#E5E5E5] rounded-md p-2 flex items-center gap-2"
                        >
                          {filePreviews[index] && file.type.startsWith('image/') ? (
                            <img
                              src={filePreviews[index]}
                              alt={file.name}
                              className="w-8 h-8 object-cover rounded"
                            />
                          ) : (
                            <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                              <span className="text-[#6A6A6A] text-[10px]">
                                {file.name.split('.').pop()?.toUpperCase()}
                              </span>
                            </div>
                          )}
                          <span className="text-[#0A0A0A] text-xs max-w-[80px] truncate">
                            {file.name}
                          </span>
                          <button
                            type="button"
                            onClick={() => removeFile(index)}
                            className="ml-1 text-[#6A6A6A] hover:text-[#0A0A0A] transition-colors"
                          >
                            <X size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Additional Details */}
                <div>
                  <label className="block text-[#0A0A0A] text-sm font-medium mb-1.5">
                    Additional Details
                  </label>
                  <textarea
                    name="additional_details"
                    rows={3}
                    className="w-full px-4 py-2.5 bg-white border border-[#E5E5E5] rounded-md text-[#0A0A0A] placeholder:text-[#9A9A9A] focus:outline-none focus:border-[#088571] transition-colors resize-none"
                    placeholder="Tell us more about your project, design requirements, or any questions you have..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#088571] text-white py-3.5 text-base font-medium hover:bg-[#066b5a] transition-colors rounded-md flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Check size={18} />
                      Submit Quote Request
                    </>
                  )}
                </button>

                <p className="text-center text-[#6A6A6A] text-xs">
                  We'll get back to you within 24 hours with pricing and next steps.
                </p>
              </form>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}

// Product Card Component
interface ProductCardProps {
  product: typeof productsConfig.products[0];
  onViewDetails: (product: typeof productsConfig.products[0]) => void;
  onRequestQuote: (product: typeof productsConfig.products[0], variantIdx: number) => void;
}

function ProductCard({ product, onViewDetails, onRequestQuote }: ProductCardProps) {
  const [activeVariant, setActiveVariant] = useState(0);

  return (
    <div className="group bg-white border border-[#E5E5E5] rounded-lg overflow-hidden hover:border-[#088571]/30 hover:shadow-lg transition-all duration-300">
      {/* Image - Clickable for details */}
      <div 
        className="aspect-square overflow-hidden bg-[#F5F5F5] relative cursor-pointer"
        onClick={() => onViewDetails(product)}
      >
        <img
          src={product.variants[activeVariant]?.image || product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* GSM Badge - Top LEFT for T-shirts and Hoodies */}
        {(product.category === 'tshirt' || product.category === 'hoodie') && product.gsm && (
          <div className="absolute top-2 left-2 bg-white/80 backdrop-blur-sm px-1.5 py-0.5 rounded">
            <span className="text-[#0A0A0A] text-[10px] font-mono">{product.gsm} GSM</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Name - Clickable for details */}
        <h3 
          className="text-[#0A0A0A] font-semibold text-base mb-1 group-hover:text-[#088571] transition-colors cursor-pointer"
          onClick={() => onViewDetails(product)}
        >
          {product.name}
        </h3>

        {/* Specs */}
        <p className="text-[#6A6A6A] text-xs mb-1">
          {product.fit} • {product.fabric}
        </p>
        {/* Color Info */}
        <p className="text-[#088571] text-[10px] mb-2">
          {product.category === 'sportswear' ? '15+ colors available upon request' : '50+ colors available upon quote'}
        </p>

        {/* Color Swatches */}
        <div className="flex gap-1.5 mb-3">
          {product.variants.slice(0, 4).map((variant, idx) => (
            <button
              key={variant.color}
              onClick={() => setActiveVariant(idx)}
              className={`w-4 h-4 rounded-full border-2 transition-all ${
                activeVariant === idx
                  ? 'border-[#088571] scale-110'
                  : 'border-transparent'
              }`}
              style={{ backgroundColor: variant.colorCode }}
              title={variant.color}
            />
          ))}
          {product.variants.length > 4 && (
            <span className="w-4 h-4 rounded-full bg-[#F5F5F5] flex items-center justify-center text-[#6A6A6A] text-[10px]">
              +{product.variants.length - 4}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button 
            onClick={() => onViewDetails(product)}
            className="flex-1 bg-transparent border border-[#E5E5E5] text-[#0A0A0A] py-2 text-xs font-medium hover:bg-[#F5F5F5] transition-colors rounded-md"
          >
            View Details
          </button>
          <button 
            onClick={() => onRequestQuote(product, activeVariant)}
            className="flex-1 bg-[#088571] text-white py-2 text-xs font-medium hover:bg-[#066b5a] transition-colors rounded-md flex items-center justify-center gap-1"
          >
            Get Quote
            <ArrowRight size={12} />
          </button>
        </div>
      </div>
    </div>
  );
}
