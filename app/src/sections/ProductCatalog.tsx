import { useRef, useLayoutEffect, useState, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  ArrowRight, 
  Check, 
  Upload, 
  Palette, 
  Layers,
  ChevronRight,
  Minus,
  Plus,
  Trash2
} from 'lucide-react';
import { productsConfig } from '../config';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import { useGoToQuoteForm } from '@/hooks/useGoToQuoteForm';

gsap.registerPlugin(ScrollTrigger);

type ProductCategory = 'tshirt' | 'hoodie' | 'hat' | 'sportswear';
type PrintType = 'dtf' | 'embroidery' | 'screen' | 'puff';

interface QuoteItem {
  productId: string;
  productName: string;
  quantity: string;
  sizes: string;
  customization: boolean;
  notes: string;
  variantColor?: string;
  logoFiles?: File[];
  printType?: PrintType;
}

// Category icon images
const categoryIcons: Record<ProductCategory, string> = {
  tshirt: '/images/icons/tshirt.png',
  hoodie: '/images/icons/hoodie.png',
  hat: '/images/icons/hat.png',
  sportswear: '/images/icons/sportswear.png',
};

export default function ProductCatalog() {
  const goToQuoteForm = useGoToQuoteForm();
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const categorySectionRef = useRef<HTMLDivElement>(null);

  const [activeFilter, setActiveFilter] = useState<ProductCategory>('tshirt');
  const [selectedProduct, setSelectedProduct] = useState<typeof productsConfig.products[0] | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<number>(0);
  const [quoteItems, setQuoteItems] = useState<QuoteItem[]>([]);
  const [showProductDetail, setShowProductDetail] = useState(false);
  const [showCustomization, setShowCustomization] = useState(false);

  // Customization state
  const [logoFiles, setLogoFiles] = useState<File[]>([]);
  const [logoPreviews, setLogoPreviews] = useState<string[]>([]);
  const [printType, setPrintType] = useState<PrintType>('dtf');
  const [customQuantity, setCustomQuantity] = useState('100');
  const [customSizes, setCustomSizes] = useState('');

  // Filter products by category
  const filteredProducts = useMemo(() => {
    return productsConfig.products.filter(p => p.category === activeFilter);
  }, [activeFilter]);

  // Group T-shirts by tier (matching hoodie structure)
  const tshirtGroups = useMemo(() => {
    if (activeFilter !== 'tshirt') return [];
    
    const lightweight = filteredProducts.filter(p => p.gsm && p.gsm <= 200);
    const midweight = filteredProducts.filter(p => p.gsm && p.gsm >= 210 && p.gsm <= 260);
    const premium = filteredProducts.filter(p => p.gsm && p.gsm >= 270);
    
    return [
      { 
        id: 'lightweight',
        label: 'Lightweight', 
        range: '180–200 GSM',
        description: 'Perfect for events, marketing, and active use like marathons. Lightweight, breathable, and cost-efficient.',
        products: lightweight 
      },
      { 
        id: 'midweight',
        label: 'Midweight', 
        range: '210–260 GSM',
        description: 'A perfect balance between comfort and quality. Ideal for everyday wear, brands, and businesses looking for a more premium feel.',
        products: midweight 
      },
      { 
        id: 'premium',
        label: 'Premium Quality', 
        range: '270–320 GSM',
        description: 'High-end, heavyweight fabrics designed for clothing brands. Structured, durable, and built for a premium look and feel.',
        products: premium 
      },
    ].filter(g => g.products.length > 0);
  }, [filteredProducts, activeFilter]);

  // Group hoodies by weight tier
  const hoodieGroups = useMemo(() => {
    if (activeFilter !== 'hoodie') return [];
    const midweight = filteredProducts.filter(p => p.gsm && p.gsm < 300);
    const heavyweight = filteredProducts.filter(p => p.gsm && p.gsm >= 300);
    return [
      { label: 'Midweight (~280 GSM)', products: midweight },
      { label: 'Heavyweight (~320+ GSM)', products: heavyweight },
    ].filter(g => g.products.length > 0);
  }, [filteredProducts, activeFilter]);

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
        categorySectionRef.current,
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const openProductDetail = (product: typeof productsConfig.products[0]) => {
    setSelectedProduct(product);
    setSelectedVariant(0);
    setShowProductDetail(true);
  };

  const openCustomization = (product: typeof productsConfig.products[0], variantIndex: number = 0) => {
    setSelectedProduct(product);
    setSelectedVariant(variantIndex);
    setLogoFiles([]);
    setLogoPreviews([]);
    setPrintType('dtf');
    setCustomQuantity('100');
    setCustomSizes('');
    setShowProductDetail(false);
    setShowCustomization(true);
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const validFiles: File[] = [];
    const newPreviews: string[] = [];

    files.forEach((file) => {
      if (file.size > 5 * 1024 * 1024) {
        toast.error(`${file.name} is too large (max 5MB)`);
        return;
      }
      validFiles.push(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        newPreviews.push(reader.result as string);
        if (newPreviews.length === validFiles.length) {
          setLogoPreviews([...logoPreviews, ...newPreviews]);
        }
      };
      reader.readAsDataURL(file);
    });

    setLogoFiles([...logoFiles, ...validFiles]);
  };

  const removeLogoFile = (index: number) => {
    const newFiles = [...logoFiles];
    const newPreviews = [...logoPreviews];
    newFiles.splice(index, 1);
    newPreviews.splice(index, 1);
    setLogoFiles(newFiles);
    setLogoPreviews(newPreviews);
  };

  const addToQuote = () => {
    if (!selectedProduct) return;

    const newItem: QuoteItem = {
      productId: selectedProduct.id,
      productName: selectedProduct.name,
      quantity: customQuantity,
      sizes: customSizes || 'Standard mix',
      customization: true,
      notes: `Print: ${printType.toUpperCase()}`,
      variantColor: selectedProduct.variants[selectedVariant]?.color,
      logoFiles: logoFiles.length > 0 ? logoFiles : undefined,
      printType,
    };

    setQuoteItems([...quoteItems, newItem]);
    setShowCustomization(false);
    toast.success(`${selectedProduct.name} added to quote request`);
  };

  const scrollToQuote = () => goToQuoteForm();

  return (
    <section
      ref={sectionRef}
      id="catalog"
      className="relative w-full py-20 lg:py-28 bg-white z-30"
    >
      <div className="relative px-6 lg:px-[7vw]">
        {/* Header */}
        <div ref={headerRef} className="mb-10">
          <span className="text-[#088571] text-xs font-mono tracking-[0.12em] uppercase block mb-3">
            {productsConfig.label}
          </span>
          <h2 className="text-[#0A0A0A] font-bold text-[clamp(32px,3.6vw,56px)] leading-[1.05] tracking-[-0.02em] mb-4">
            {productsConfig.heading}
          </h2>
          <p className="text-[#6A6A6A] text-lg max-w-2xl">
            {productsConfig.description}
          </p>
        </div>

        {/* Category Selection - Centered */}
        <div ref={categorySectionRef} className="mb-16">
          <h3 className="text-[#0A0A0A] font-semibold text-xl text-center mb-8">
            What are you looking for
          </h3>
          <div className="flex flex-wrap justify-center gap-4 lg:gap-6">
            {productsConfig.filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`flex flex-col items-center gap-3 px-8 py-6 text-base font-medium transition-all rounded-xl min-w-[140px] ${
                  activeFilter === filter.id
                    ? 'bg-[#088571] text-white shadow-lg shadow-[#088571]/20'
                    : 'bg-[#F5F5F5] text-[#6A6A6A] border border-[#E5E5E5] hover:border-[#088571]/30 hover:text-[#0A0A0A]'
                }`}
              >
                <img 
                  src={categoryIcons[filter.id]} 
                  alt={filter.label}
                  className={`w-10 h-10 object-contain transition-all ${
                    activeFilter === filter.id ? 'brightness-0 invert' : ''
                  }`}
                />
                <span>{filter.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Product Content */}
        <div className="space-y-16">
          {/* T-Shirts - Grouped by Tier */}
          {activeFilter === 'tshirt' && tshirtGroups.map((group) => (
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
                    onGetQuote={goToQuoteForm}
                  />
                ))}
              </div>
            </div>
          ))}

          {/* Hoodies - Grouped by weight tier */}
          {activeFilter === 'hoodie' && hoodieGroups.map((group) => (
            <div key={group.label} className="space-y-6">
              {/* Tier Header */}
              <div className="flex items-center gap-4">
                <h3 className="text-[#0A0A0A] font-semibold text-xl whitespace-nowrap">{group.label}</h3>
                <div className="flex-1 h-px bg-[#E5E5E5]" />
              </div>
              {/* Product Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 lg:gap-6">
                {group.products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onViewDetails={openProductDetail}
                    onGetQuote={goToQuoteForm}
                  />
                ))}
              </div>
            </div>
          ))}

          {/* Hats - No grouping */}
          {activeFilter === 'hat' && (
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 lg:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onViewDetails={openProductDetail}
                  onGetQuote={goToQuoteForm}
                />
              ))}
            </div>
          )}

          {/* Sportswear — same tier-style block as T-Shirts (title + description + grid) */}
          {activeFilter === 'sportswear' && (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <h3 className="text-[#0A0A0A] font-semibold text-xl whitespace-nowrap">Sportswear</h3>
                <div className="flex-1 h-px bg-[#E5E5E5]" />
              </div>
              <p className="text-[#6A6A6A] text-sm max-w-3xl -mt-2">
                High-performance apparel designed for movement, comfort, and breathability. Ideal for gyms, teams, and
                active brands.
              </p>
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 lg:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onViewDetails={openProductDetail}
                    onGetQuote={goToQuoteForm}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Quote Summary Bar */}
        {quoteItems.length > 0 && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-3rem)] max-w-xl">
            <div className="bg-white border border-[#088571]/30 p-4 rounded-lg shadow-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#088571]/10 rounded-full flex items-center justify-center">
                    <Check size={18} className="text-[#088571]" />
                  </div>
                  <div>
                    <p className="text-[#0A0A0A] font-medium text-sm">
                      {quoteItems.length} item{quoteItems.length > 1 ? 's' : ''} in quote
                    </p>
                  </div>
                </div>
                <button
                  onClick={scrollToQuote}
                  className="bg-[#088571] text-white px-5 py-2.5 text-sm font-medium hover:bg-[#066b5a] transition-colors rounded-md flex items-center gap-2"
                >
                  Complete Quote
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        )}
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
                    {selectedProduct.category === 'tshirt'
                      ? 'T-Shirt'
                      : selectedProduct.category === 'hoodie'
                        ? 'Hoodie'
                        : selectedProduct.category === 'sportswear'
                          ? 'Sportswear'
                          : 'Hat'}
                  </span>
                  <DialogTitle className="text-2xl font-bold text-[#0A0A0A]">
                    {selectedProduct.name}
                  </DialogTitle>
                </DialogHeader>

                {/* Specs */}
                <div className="space-y-4 mb-6">
                  {selectedProduct.gsm && (
                    <div className="flex items-center gap-3">
                      <Layers size={18} className="text-[#088571]" />
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
                    <Palette size={18} className="text-[#088571]" />
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
                <div className="flex gap-3">
                  <button
                    onClick={() => openCustomization(selectedProduct, selectedVariant)}
                    className="flex-1 bg-[#088571] text-white py-3 font-medium hover:bg-[#066b5a] transition-colors rounded-md flex items-center justify-center gap-2"
                  >
                    Customize & Quote
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Customization Modal */}
      <Dialog open={showCustomization} onOpenChange={setShowCustomization}>
        <DialogContent className="bg-white border border-[#E5E5E5] text-[#0A0A0A] max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              Customize Your Product
            </DialogTitle>
          </DialogHeader>

          {selectedProduct && (
            <div className="space-y-6 mt-4">
              {/* Product Preview */}
              <div className="flex gap-4 p-4 bg-[#F5F5F5] rounded-lg">
                <img
                  src={selectedProduct.variants[selectedVariant]?.image || selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-24 h-24 object-cover rounded-md"
                />
                <div>
                  <h4 className="font-semibold text-lg">{selectedProduct.name}</h4>
                  <p className="text-[#6A6A6A] text-sm">{selectedProduct.variants[selectedVariant]?.color}</p>
                  <p className="text-[#088571] text-sm">
                    {selectedProduct.gsm != null ? `${selectedProduct.gsm} GSM • ${selectedProduct.fit}` : selectedProduct.fit}
                  </p>
                </div>
              </div>

              {/* Logo Upload - Multiple Files */}
              <div>
                <label className="text-[#0A0A0A] font-medium text-sm block mb-2">
                  Upload Your Design/Logo
                </label>
                <div className="border-2 border-dashed border-[#E5E5E5] rounded-lg p-6 text-center hover:border-[#088571]/50 transition-colors">
                  <label className="cursor-pointer block">
                    <Upload size={32} className="mx-auto text-[#6A6A6A] mb-2" />
                    <p className="text-[#6A6A6A] text-sm">Click to upload or drag and drop</p>
                    <p className="text-[#9CA3AF] text-xs mt-1">PNG, JPG up to 5MB each</p>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleLogoUpload}
                      className="hidden"
                    />
                  </label>
                </div>
                
                {/* Helper Text */}
                <p className="text-[#9CA3AF] text-sm mt-2 text-center">
                  You don't need a design to request a quote. If you already have one, feel free to upload it here.
                </p>

                {/* Uploaded Files Preview */}
                {logoPreviews.length > 0 && (
                  <div className="mt-4 grid grid-cols-4 gap-3">
                    {logoPreviews.map((preview, idx) => (
                      <div key={idx} className="relative aspect-square">
                        <img src={preview} alt={`Upload ${idx + 1}`} className="w-full h-full object-cover rounded-md" />
                        <button
                          onClick={() => removeLogoFile(idx)}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-[#0A0A0A] text-white rounded-full flex items-center justify-center hover:bg-red-500 transition-colors"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Print Type */}
              <div>
                <label className="text-[#0A0A0A] font-medium text-sm block mb-2">
                  Print Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: 'dtf', label: 'DTF Print', desc: 'Full color, soft feel' },
                    { id: 'embroidery', label: 'Embroidery', desc: 'Premium, durable' },
                    { id: 'screen', label: 'Screen Print', desc: 'Bold, vibrant' },
                    { id: 'puff', label: 'Puff Print', desc: '3D texture' },
                  ].map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setPrintType(type.id as PrintType)}
                      className={`p-3 border rounded-lg text-left transition-all ${
                        printType === type.id
                          ? 'border-[#088571] bg-[#088571]/5'
                          : 'border-[#E5E5E5] hover:border-[#088571]/30'
                      }`}
                    >
                      <p className={`font-medium ${printType === type.id ? 'text-[#088571]' : 'text-[#0A0A0A]'}`}>
                        {type.label}
                      </p>
                      <p className="text-[#6A6A6A] text-xs">{type.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <label className="text-[#0A0A0A] font-medium text-sm block mb-2">
                  Quantity
                </label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setCustomQuantity(Math.max(1, parseInt(customQuantity) - 10).toString())}
                    className="w-10 h-10 border border-[#E5E5E5] rounded-md flex items-center justify-center hover:border-[#088571]"
                  >
                    <Minus size={16} />
                  </button>
                  <input
                    type="number"
                    value={customQuantity}
                    onChange={(e) => setCustomQuantity(e.target.value)}
                    className="w-24 text-center py-2 border border-[#E5E5E5] rounded-md"
                  />
                  <button
                    onClick={() => setCustomQuantity((parseInt(customQuantity) + 10).toString())}
                    className="w-10 h-10 border border-[#E5E5E5] rounded-md flex items-center justify-center hover:border-[#088571]"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              {/* Sizes */}
              <div>
                <label className="text-[#0A0A0A] font-medium text-sm block mb-2">
                  Size Breakdown (optional)
                </label>
                <input
                  type="text"
                  value={customSizes}
                  onChange={(e) => setCustomSizes(e.target.value)}
                  placeholder="e.g., S:20 M:30 L:30 XL:20"
                  className="w-full px-4 py-3 border border-[#E5E5E5] rounded-md text-[#0A0A0A] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#088571]"
                />
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowCustomization(false)}
                  className="flex-1 border border-[#E5E5E5] text-[#6A6A6A] py-3 font-medium hover:border-[#0A0A0A] hover:text-[#0A0A0A] transition-colors rounded-md"
                >
                  Cancel
                </button>
                <button
                  onClick={addToQuote}
                  className="flex-1 bg-[#088571] text-white py-3 font-medium hover:bg-[#066b5a] transition-colors rounded-md"
                >
                  Add to Quote
                </button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}

// Product Card Component
interface ProductCardProps {
  product: (typeof productsConfig.products)[0];
  onViewDetails: (product: (typeof productsConfig.products)[0]) => void;
  onGetQuote: () => void;
}

function ProductCard({ product, onViewDetails, onGetQuote }: ProductCardProps) {
  const [activeVariant, setActiveVariant] = useState(0);

  return (
    <div className="group bg-white border border-[#E5E5E5] rounded-lg overflow-hidden hover:border-[#088571]/30 hover:shadow-lg transition-all duration-300">
      {/* Image */}
      <div
        className="aspect-square overflow-hidden bg-[#F5F5F5] relative cursor-pointer"
        onClick={() => onViewDetails(product)}
        role="presentation"
      >
        <img
          src={product.variants[activeVariant]?.image || product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* GSM Badge — T-Shirts, Hoodies, Sportswear */}
        {(product.category === 'tshirt' || product.category === 'hoodie') && product.gsm && (
            <div className="absolute top-2 left-2 bg-white/80 backdrop-blur-sm px-1.5 py-0.5 rounded">
              <span className="text-[#0A0A0A] text-[10px] font-mono">{product.gsm} GSM</span>
            </div>
          )}
        {/* Colors count badge */}
        <div
          className={`absolute ${product.category === 'tshirt' || product.category === 'hoodie' ? 'bottom-0 right-0' : 'top-0 right-0'} bg-[#088571] px-1.5 py-1 rounded-bl-sm`}
        >
          <span className="text-white text-[9px] font-medium">
            {product.category === 'sportswear' ? '15+ colors' : `+${product.colorCount} colors`}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="cursor-pointer" onClick={() => onViewDetails(product)} role="presentation">
          <h3 className="text-[#0A0A0A] font-semibold text-lg mb-1 group-hover:text-[#088571] transition-colors">
            {product.name}
          </h3>
          <p className="text-[#6A6A6A] text-sm mb-3">
            {product.fit} • {product.fabric}
          </p>
        </div>

        {/* Color Swatches */}
        <div className="mb-4">
          {product.category === 'sportswear' && (
            <p className="text-xs text-[#9A9A9A] mb-2">More colors available upon quote</p>
          )}
          <div className="flex gap-1.5">
            {product.variants.slice(0, 4).map((variant, idx) => (
              <button
                key={variant.color}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveVariant(idx);
                }}
                className={`w-5 h-5 rounded-full border-2 transition-all ${
                  activeVariant === idx ? 'border-[#088571] scale-110' : 'border-transparent'
                }`}
                style={{ backgroundColor: variant.colorCode }}
                title={variant.color}
              />
            ))}
            {product.variants.length > 4 && (
              <span className="w-5 h-5 rounded-full bg-[#F5F5F5] flex items-center justify-center text-[#6A6A6A] text-xs">
                +{product.variants.length - 4}
              </span>
            )}
          </div>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(product);
            }}
            className="flex-1 py-2.5 bg-white text-[#0A0A0A] text-sm font-medium rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors"
          >
            View Details
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onGetQuote();
            }}
            className="flex-1 py-2.5 bg-[#088571] text-white text-sm font-medium rounded-lg hover:bg-[#066b5a] transition-colors"
          >
            Get Quote
          </button>
        </div>
      </div>
    </div>
  );
}
