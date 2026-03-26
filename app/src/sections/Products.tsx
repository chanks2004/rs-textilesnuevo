import { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { productsConfig, type ProductItem, type ProductCategory } from '../config';
import { X, ChevronDown } from 'lucide-react';
import { useGoToQuoteForm } from '@/hooks/useGoToQuoteForm';

// GSM Tier definitions
const tshirtTiers = [
  {
    name: 'Lightweight',
    range: 'up to 200 GSM',
    description: 'Perfect for businesses, events, and active use like marathons. Lightweight, breathable, and cost-efficient.',
    gsmRange: [0, 200],
  },
  {
    name: 'Midweight',
    range: '210–260 GSM',
    description: 'A balanced option between comfort and quality. Ideal for everyday wear, brands, and businesses.',
    gsmRange: [210, 260],
  },
  {
    name: 'Premium Quality',
    range: '270–330 GSM',
    description: 'High-end, heavyweight fabrics designed for clothing brands. Structured, durable, and built for a premium look and feel.',
    gsmRange: [270, 330],
  },
];

const hoodieTiers = [
  {
    name: 'Lightweight',
    range: 'up to 280 GSM',
    description: 'Perfect for businesses, events, and active use like marathons. Lightweight, breathable, and cost-efficient.',
    gsmRange: [0, 280],
  },
  {
    name: 'Midweight',
    range: '300–350 GSM',
    description: 'A balanced option between comfort and quality. Ideal for everyday wear, brands, and businesses.',
    gsmRange: [300, 350],
  },
  {
    name: 'Premium Quality',
    range: '400+ GSM',
    description: 'High-end, heavyweight fabrics designed for clothing brands. Structured, durable, and built for a premium look and feel.',
    gsmRange: [400, 999],
  },
];

// Best seller showcase products by category
const tshirtBestSellers = [
  { id: 'tshirt-200-boxy', badge: 'Best Seller', badgeColor: 'bg-[#088571]' },
  { id: 'tshirt-260-ultra', badge: 'Most Popular', badgeColor: 'bg-orange-500' },
  { id: 'tshirt-290-elite', badge: 'Premium Pick', badgeColor: 'bg-purple-600' },
];

const hoodieBestSellers = [
  { id: 'hoodie-320-heavyweight', badge: 'Best Seller', badgeColor: 'bg-[#088571]' },
  { id: 'hoodie-280-midweight', badge: 'Most Popular', badgeColor: 'bg-orange-500' },
  { id: 'hoodie-400-premium', badge: 'Premium Pick', badgeColor: 'bg-purple-600' },
];

const hatBestSellers = [
  { id: 'hat-cotton-dad', badge: 'Best Seller', badgeColor: 'bg-[#088571]' },
  { id: 'hat-trucker-mesh', badge: 'Most Popular', badgeColor: 'bg-orange-500' },
  { id: 'hat-cotton-structured', badge: 'Premium Pick', badgeColor: 'bg-purple-600' },
];

function ProductModal({
  product,
  isOpen,
  onClose,
  onRequestQuote,
}: {
  product: ProductItem;
  isOpen: boolean;
  onClose: () => void;
  onRequestQuote: () => void;
}) {
  const [selectedVariant, setSelectedVariant] = useState(0);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-[95vw] max-h-[90vh] overflow-y-auto p-0 gap-0">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
        >
          <X size={20} />
        </button>
        
        <div className="grid md:grid-cols-2 gap-0">
          {/* Image Section */}
          <div className="relative bg-gray-50 p-6">
            <div className="relative aspect-square">
              <img
                src={product.variants[selectedVariant]?.image || product.image}
                alt={product.name}
                className="w-full h-full object-contain"
              />
            </div>
            
            {/* Thumbnail Navigation */}
            <div className="flex justify-center gap-2 mt-4 flex-wrap">
              {product.variants.map((variant, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedVariant(idx)}
                  className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition-colors ${
                    idx === selectedVariant ? 'border-[#0A0A0A]' : 'border-transparent'
                  }`}
                >
                  <img src={variant.image} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Details Section */}
          <div className="p-6 md:p-8">
            <DialogHeader className="mb-6">
              <DialogTitle className="text-2xl font-bold text-[#0A0A0A]">
                {product.name}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-6">
              {/* Description */}
              <p className="text-[#6A6A6A]">{product.description}</p>

              {/* Fabric & Fit */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-xs text-[#6A6A6A] uppercase tracking-wide mb-1">Fabric</p>
                  <p className="text-sm font-medium text-[#0A0A0A]">{product.fabric}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-xs text-[#6A6A6A] uppercase tracking-wide mb-1">Fit</p>
                  <p className="text-sm font-medium text-[#0A0A0A]">{product.fit}</p>
                </div>
              </div>

              {/* Features */}
              <div>
                <p className="text-xs text-[#6A6A6A] uppercase tracking-wide mb-3">Features</p>
                <div className="flex flex-wrap gap-2">
                  {product.features.map((feature) => (
                    <span
                      key={feature}
                      className="px-3 py-1.5 bg-gray-100 text-sm text-[#0A0A0A] rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              {/* Color Variants */}
              <div>
                <p className="text-xs text-[#6A6A6A] uppercase tracking-wide mb-3">
                  More colors available upon quote
                </p>
                <p className="text-xs text-[#9A9A9A] mb-3">
                  Colors shown are for visual reference only
                </p>
                <div className="flex flex-wrap gap-3">
                  {product.variants.map((variant, idx) => (
                    <button
                      key={variant.color}
                      onClick={() => setSelectedVariant(idx)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all ${
                        idx === selectedVariant
                          ? 'border-[#0A0A0A] bg-gray-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <span
                        className="w-5 h-5 rounded-full border border-gray-200"
                        style={{ backgroundColor: variant.colorCode }}
                      />
                      <span className="text-sm text-[#0A0A0A]">{variant.color}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Customization Options */}
              <div>
                <p className="text-xs text-[#6A6A6A] uppercase tracking-wide mb-3">
                  Customization Options
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.customizationOptions.map((option) => (
                    <span
                      key={option}
                      className="px-3 py-1.5 border border-gray-200 text-sm text-[#0A0A0A] rounded-full"
                    >
                      {option}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onRequestQuote();
                }}
                className="block w-full py-3 bg-[#0A0A0A] text-white text-center font-medium rounded-full hover:bg-[#333333] transition-colors"
              >
                Request a Quote
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function ProductCard({
  product,
  onClick,
  onGetQuote,
}: {
  product: ProductItem;
  onClick: () => void;
  onGetQuote: () => void;
}) {
  return (
    <div className="group bg-white rounded-xl overflow-hidden border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300">
      {/* Image */}
      <div 
        onClick={onClick}
        className="relative aspect-square bg-gray-50 p-6 cursor-pointer"
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
        />
        {product.gsm && (
          <span className="absolute top-4 left-4 px-3 py-1.5 bg-[#088571] text-white text-xs font-semibold rounded-full">
            {product.gsm}GSM
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <div 
          onClick={onClick}
          className="cursor-pointer"
        >
          <h3 className="font-semibold text-[#0A0A0A] mb-2 group-hover:text-[#088571] transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-[#6A6A6A] mb-4 line-clamp-2">
            {product.description}
          </p>
        </div>

        {/* Color Swatches */}
        {product.variants.length > 0 && (
          <div className="mb-4">
            <p className="text-xs text-[#9A9A9A] mb-2">
              {product.category === 'sportswear' ? 'More colors available upon quote' : '30+ colors available'}
            </p>
            <div className="flex flex-wrap gap-2">
              {product.variants.slice(0, 6).map((variant, idx) => (
                <span
                  key={idx}
                  className="w-6 h-6 rounded-full border border-gray-200 flex-shrink-0"
                  style={{ backgroundColor: variant.colorCode }}
                  title={variant.color}
                />
              ))}
              {product.variants.length > 6 && (
                <span className="w-6 h-6 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-[10px] text-[#6A6A6A] flex-shrink-0">
                  +{product.variants.length - 6}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClick}
            className="flex-1 py-2.5 bg-white text-[#0A0A0A] text-sm font-medium rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors"
          >
            View Details
          </button>
          <button
            onClick={onGetQuote}
            className="flex-1 py-2.5 bg-[#088571] text-white text-sm font-medium rounded-lg hover:bg-[#066b5a] transition-colors"
          >
            Get Quote
          </button>
        </div>
      </div>
    </div>
  );
}

function BestSellerShowcaseCard({
  product,
  badge,
  badgeColor,
  onClick,
  onGetQuote,
}: {
  product: ProductItem;
  badge: string;
  badgeColor: string;
  onClick: () => void;
  onGetQuote: () => void;
}) {
  return (
    <div className="group bg-white rounded-xl overflow-hidden border-2 border-[#088571] hover:shadow-lg transition-all duration-300 relative">
      {/* Badge */}
      <div className={`absolute top-4 right-4 z-10 px-3 py-1 ${badgeColor} text-white text-xs font-medium rounded-full`}>
        {badge}
      </div>

      {/* Image */}
      <div 
        onClick={onClick}
        className="relative aspect-square bg-gray-50 p-6 cursor-pointer"
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
        />
        {product.gsm && (
          <span className="absolute top-4 left-4 px-3 py-1.5 bg-[#088571] text-white text-xs font-semibold rounded-full">
            {product.gsm}GSM
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <div 
          onClick={onClick}
          className="cursor-pointer"
        >
          <h3 className="font-semibold text-[#0A0A0A] mb-2 group-hover:text-[#088571] transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-[#6A6A6A] mb-4 line-clamp-2">
            {product.description}
          </p>
        </div>

        {/* Color Swatches */}
        {product.variants.length > 0 && (
          <div className="mb-4">
            <p className="text-xs text-[#9A9A9A] mb-2">30+ colors available</p>
            <div className="flex flex-wrap gap-2">
              {product.variants.slice(0, 6).map((variant, idx) => (
                <span
                  key={idx}
                  className="w-6 h-6 rounded-full border border-gray-200 flex-shrink-0"
                  style={{ backgroundColor: variant.colorCode }}
                  title={variant.color}
                />
              ))}
              {product.variants.length > 6 && (
                <span className="w-6 h-6 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-[10px] text-[#6A6A6A] flex-shrink-0">
                  +{product.variants.length - 6}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClick}
            className="flex-1 py-2.5 bg-white text-[#0A0A0A] text-sm font-medium rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors"
          >
            View Details
          </button>
          <button
            onClick={onGetQuote}
            className="flex-1 py-2.5 bg-[#088571] text-white text-sm font-medium rounded-lg hover:bg-[#066b5a] transition-colors"
          >
            Get Quote
          </button>
        </div>
      </div>
    </div>
  );
}

function TierSection({
  tier,
  products,
  onProductClick,
  onGetQuote,
}: {
  tier: (typeof tshirtTiers)[0];
  products: ProductItem[];
  onProductClick: (p: ProductItem) => void;
  onGetQuote: () => void;
}) {
  const [isExpanded, setIsExpanded] = useState(true);

  if (products.length === 0) return null;

  return (
    <div className="mb-12">
      {/* Tier Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-6 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors mb-6"
      >
        <div className="text-left">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-xl font-bold text-[#0A0A0A]">{tier.name}</h3>
            <span className="px-3 py-1 bg-[#088571] text-white text-sm font-medium rounded-full">
              {tier.range}
            </span>
          </div>
          <p className="text-[#6A6A6A] text-sm">{tier.description}</p>
        </div>
        <ChevronDown 
          size={24} 
          className={`text-[#6A6A6A] transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Tier Products */}
      {isExpanded && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => onProductClick(product)}
              onGetQuote={onGetQuote}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function BestSellerShowcase({
  products,
  onProductClick,
  onGetQuote,
  title,
  subtitle,
}: {
  products: { product: ProductItem; badge: string; badgeColor: string }[];
  onProductClick: (p: ProductItem) => void;
  onGetQuote: () => void;
  title: string;
  subtitle: string;
}) {
  if (products.length === 0) return null;

  return (
    <div className="mt-20 pt-16 border-t border-gray-200">
      {/* Title Section */}
      <div className="text-center mb-12">
        <h3 className="text-3xl font-bold text-[#0A0A0A] mb-3">{title}</h3>
        <p className="text-[#6A6A6A] max-w-xl mx-auto">{subtitle}</p>
      </div>
      
      {/* Products Grid - Centered, 3 items */}
      <div className="flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl">
          {products.map(({ product, badge, badgeColor }) => (
            <BestSellerShowcaseCard
              key={product.id}
              product={product}
              badge={badge}
              badgeColor={badgeColor}
              onClick={() => onProductClick(product)}
              onGetQuote={onGetQuote}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function Products() {
  const goToQuoteForm = useGoToQuoteForm();
  const [activeFilter, setActiveFilter] = useState<ProductCategory>('tshirt');
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const sectionRefs = useRef<Record<ProductCategory, HTMLDivElement | null>>({
    tshirt: null,
    hoodie: null,
    hat: null,
    sportswear: null,
  });

  const scrollToCategory = (category: ProductCategory) => {
    setActiveFilter(category);
    const element = sectionRefs.current[category];
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth',
      });
    }
  };

  const getProductsByCategory = (category: ProductCategory) => {
    return productsConfig.products.filter((product) => product.category === category);
  };

  const getProductsByTier = (category: ProductCategory, tier: typeof tshirtTiers[0]) => {
    return productsConfig.products.filter(
      (product) =>
        product.category === category &&
        product.gsm &&
        product.gsm >= tier.gsmRange[0] &&
        product.gsm <= tier.gsmRange[1]
    );
  };

  const getBestSellerShowcaseProducts = (items: { id: string; badge: string; badgeColor: string }[]) => {
    return items.map(item => {
      const product = productsConfig.products.find(p => p.id === item.id);
      return product ? { product, badge: item.badge, badgeColor: item.badgeColor } : null;
    }).filter((item): item is { product: ProductItem; badge: string; badgeColor: string } => item !== null);
  };

  const categoryIcons: Record<ProductCategory, string> = {
    tshirt: '/images/icons/tshirt-icon.png',
    hoodie: '/images/icons/hoodie-icon.png',
    hat: '/images/icons/hat-icon.png',
    sportswear: '/images/icons/sportswear-icon.png',
  };

  return (
    <section id="products" className="py-20 lg:py-28 bg-white">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-gray-100 text-sm text-[#6A6A6A] rounded-full mb-4">
            {productsConfig.label}
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-[#0A0A0A] mb-4">
            {productsConfig.heading}
          </h2>
          <p className="text-[#6A6A6A] max-w-2xl mx-auto">
            {productsConfig.description}
          </p>
        </div>

        {/* Category Filters - NOT Sticky */}
        <div className="py-4 mb-10 border-b border-gray-100">
          <div className="flex justify-center gap-2 lg:gap-4 flex-wrap">
            {productsConfig.filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => scrollToCategory(filter.id)}
                className={`flex items-center gap-2 px-4 lg:px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeFilter === filter.id
                    ? 'bg-[#0A0A0A] text-white'
                    : 'bg-gray-100 text-[#6A6A6A] hover:bg-gray-200'
                }`}
              >
                <img 
                  src={categoryIcons[filter.id]} 
                  alt={filter.label}
                  className={`w-5 h-5 object-contain ${activeFilter === filter.id ? 'brightness-0 invert' : ''}`}
                />
                <span className="hidden sm:inline">{filter.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* T-SHIRTS Section */}
        <div 
          id="tshirt" 
          ref={(el) => { sectionRefs.current.tshirt = el; }}
          className="mb-20 scroll-mt-32"
        >
          <div className="flex items-center gap-4 mb-8">
            <img src={categoryIcons.tshirt} alt="T-Shirts" className="w-10 h-10 object-contain" />
            <h2 className="text-3xl font-bold text-[#0A0A0A]">T-Shirts</h2>
          </div>
          
          {/* GSM Tiers */}
          {tshirtTiers.map((tier) => (
            <TierSection
              key={tier.name}
              tier={tier}
              products={getProductsByTier('tshirt', tier)}
              onProductClick={setSelectedProduct}
              onGetQuote={goToQuoteForm}
            />
          ))}
          
          {/* Best Sellers Showcase - At the bottom */}
          <BestSellerShowcase
            products={getBestSellerShowcaseProducts(tshirtBestSellers)}
            onProductClick={setSelectedProduct}
            onGetQuote={goToQuoteForm}
            title="Best Seller"
            subtitle="Featured T-shirts most popular among brands and businesses"
          />
        </div>

        {/* HOODIES Section */}
        <div 
          id="hoodie" 
          ref={(el) => { sectionRefs.current.hoodie = el; }}
          className="mb-20 scroll-mt-32"
        >
          <div className="flex items-center gap-4 mb-8">
            <img src={categoryIcons.hoodie} alt="Hoodies" className="w-10 h-10 object-contain" />
            <h2 className="text-3xl font-bold text-[#0A0A0A]">Hoodies</h2>
          </div>
          
          {/* GSM Tiers */}
          {hoodieTiers.map((tier) => (
            <TierSection
              key={tier.name}
              tier={tier}
              products={getProductsByTier('hoodie', tier)}
              onProductClick={setSelectedProduct}
              onGetQuote={goToQuoteForm}
            />
          ))}
          
          {/* Best Sellers Showcase - At the bottom */}
          <BestSellerShowcase
            products={getBestSellerShowcaseProducts(hoodieBestSellers)}
            onProductClick={setSelectedProduct}
            onGetQuote={goToQuoteForm}
            title="Best Seller"
            subtitle="Featured hoodies most popular among brands and businesses"
          />
        </div>

        {/* HATS Section */}
        <div 
          id="hat" 
          ref={(el) => { sectionRefs.current.hat = el; }}
          className="mb-20 scroll-mt-32"
        >
          <div className="flex items-center gap-4 mb-8">
            <img src={categoryIcons.hat} alt="Hats" className="w-10 h-10 object-contain" />
            <h2 className="text-3xl font-bold text-[#0A0A0A]">Hats</h2>
          </div>
          
          {/* All Hats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {getProductsByCategory('hat').map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={() => setSelectedProduct(product)}
                onGetQuote={goToQuoteForm}
              />
            ))}
          </div>
          
          {/* Best Sellers Showcase - At the bottom */}
          <BestSellerShowcase
            products={getBestSellerShowcaseProducts(hatBestSellers)}
            onProductClick={setSelectedProduct}
            onGetQuote={goToQuoteForm}
            title="Best Seller"
            subtitle="Featured hats most popular among brands and businesses"
          />
        </div>

        {/* SPORTSWEAR Section */}
        <div
          id="sportswear"
          ref={(el) => {
            sectionRefs.current.sportswear = el;
          }}
          className="mb-20 scroll-mt-32"
        >
          <div className="flex items-center gap-4 mb-4">
            <img src={categoryIcons.sportswear} alt="Sportswear" className="w-10 h-10 object-contain" />
            <h2 className="text-3xl font-bold text-[#0A0A0A]">Sportswear</h2>
          </div>
          <p className="text-[#6A6A6A] max-w-3xl mb-8">
            High-performance apparel designed for movement, comfort, and breathability. Ideal for gyms, teams, and active
            brands.
          </p>

          {/* All Sportswear */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {getProductsByCategory('sportswear').map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={() => setSelectedProduct(product)}
                onGetQuote={goToQuoteForm}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onRequestQuote={goToQuoteForm}
        />
      )}
    </section>
  );
}
