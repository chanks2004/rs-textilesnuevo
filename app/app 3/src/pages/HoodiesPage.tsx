import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productsConfig, type ProductItem } from '../config';
import { ArrowRight, ChevronDown, Star } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { X } from 'lucide-react';

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

const bestSellers = [
  { id: 'hoodie-320-heavyweight', badge: 'Best Seller', badgeColor: 'bg-[#088571]' },
  { id: 'hoodie-280-midweight', badge: 'Most Popular', badgeColor: 'bg-orange-500' },
  { id: 'hoodie-400-premium', badge: 'Premium Pick', badgeColor: 'bg-purple-600' },
];

function ProductModal({ product, isOpen, onClose }: { product: ProductItem; isOpen: boolean; onClose: () => void }) {
  const [selectedVariant, setSelectedVariant] = useState(0);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-[95vw] max-h-[90vh] overflow-y-auto p-0 gap-0">
        <button onClick={onClose} className="absolute right-4 top-4 z-10 p-2 bg-white/90 rounded-full hover:bg-white transition-colors">
          <X size={20} />
        </button>
        <div className="grid md:grid-cols-2 gap-0">
          <div className="relative bg-gray-50 p-6">
            <div className="relative aspect-square">
              <img src={product.variants[selectedVariant]?.image || product.image} alt={product.name} className="w-full h-full object-contain" />
            </div>
            <div className="flex justify-center gap-2 mt-4 flex-wrap">
              {product.variants.map((variant, idx) => (
                <button key={idx} onClick={() => setSelectedVariant(idx)} className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition-colors ${idx === selectedVariant ? 'border-[#0A0A0A]' : 'border-transparent'}`}>
                  <img src={variant.image} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
          <div className="p-6 md:p-8">
            <DialogHeader className="mb-6">
              <DialogTitle className="text-2xl font-bold text-[#0A0A0A]">{product.name}</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <p className="text-[#6A6A6A]">{product.description}</p>
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
              <div>
                <p className="text-xs text-[#6A6A6A] uppercase tracking-wide mb-3">Features</p>
                <div className="flex flex-wrap gap-2">
                  {product.features.map((feature) => (
                    <span key={feature} className="px-3 py-1.5 bg-gray-100 text-sm text-[#0A0A0A] rounded-full">{feature}</span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs text-[#6A6A6A] uppercase tracking-wide mb-3">More colors available upon quote</p>
                <p className="text-xs text-[#9A9A9A] mb-3">Colors shown are for visual reference only</p>
                <div className="flex flex-wrap gap-3">
                  {product.variants.map((variant, idx) => (
                    <button key={variant.color} onClick={() => setSelectedVariant(idx)} className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all ${idx === selectedVariant ? 'border-[#0A0A0A] bg-gray-50' : 'border-gray-200 hover:border-gray-300'}`}>
                      <span className="w-5 h-5 rounded-full border border-gray-200" style={{ backgroundColor: variant.colorCode }} />
                      <span className="text-sm text-[#0A0A0A]">{variant.color}</span>
                    </button>
                  ))}
                </div>
              </div>
              <a href="/#quote" onClick={(e) => { e.preventDefault(); onClose(); document.querySelector('#quote')?.scrollIntoView({ behavior: 'smooth' }); }} className="block w-full py-3 bg-[#0A0A0A] text-white text-center font-medium rounded-full hover:bg-[#333333] transition-colors">
                Request a Quote
              </a>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function ProductCard({ product, onClick, isBestSeller = false, badge, badgeColor }: { product: ProductItem; onClick: () => void; isBestSeller?: boolean; badge?: string; badgeColor?: string }) {
  return (
    <div className={`group bg-white rounded-xl overflow-hidden border ${isBestSeller ? 'border-2 border-[#088571]' : 'border-gray-100'} hover:border-gray-200 hover:shadow-lg transition-all duration-300 relative`}>
      {isBestSeller && badge && (
        <div className={`absolute top-4 right-4 z-10 px-3 py-1 ${badgeColor} text-white text-xs font-medium rounded-full`}>
          {badge}
        </div>
      )}
      <div onClick={onClick} className="relative aspect-square bg-gray-50 p-6 cursor-pointer">
        <img src={product.image} alt={product.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300" />
        {product.gsm && (
          <span className="absolute top-4 left-4 px-3 py-1.5 bg-[#088571] text-white text-xs font-semibold rounded-full">{product.gsm}GSM</span>
        )}
      </div>
      <div className="p-5">
        <div onClick={onClick} className="cursor-pointer">
          <h3 className="font-semibold text-[#0A0A0A] mb-2 group-hover:text-[#088571] transition-colors">{product.name}</h3>
          <p className="text-sm text-[#6A6A6A] mb-4 line-clamp-2">{product.description}</p>
        </div>
        {product.variants.length > 0 && (
          <div className="mb-4">
            <p className="text-xs text-[#9A9A9A] mb-2">30+ colors available</p>
            <div className="flex flex-wrap gap-2">
              {product.variants.slice(0, 6).map((variant, idx) => (
                <span key={idx} className="w-6 h-6 rounded-full border border-gray-200 flex-shrink-0" style={{ backgroundColor: variant.colorCode }} title={variant.color} />
              ))}
              {product.variants.length > 6 && (
                <span className="w-6 h-6 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-[10px] text-[#6A6A6A] flex-shrink-0">+{product.variants.length - 6}</span>
              )}
            </div>
          </div>
        )}
        <div className="flex gap-3">
          <button onClick={onClick} className="flex-1 py-2.5 bg-white text-[#0A0A0A] text-sm font-medium rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors">View Details</button>
          <button onClick={() => document.querySelector('#quote')?.scrollIntoView({ behavior: 'smooth' })} className="flex-1 py-2.5 bg-[#088571] text-white text-sm font-medium rounded-lg hover:bg-[#066b5a] transition-colors">Get Quote</button>
        </div>
      </div>
    </div>
  );
}

function TierSection({ tier, products, onProductClick }: { tier: typeof hoodieTiers[0]; products: ProductItem[]; onProductClick: (p: ProductItem) => void }) {
  const [isExpanded, setIsExpanded] = useState(true);
  if (products.length === 0) return null;

  return (
    <div className="mb-12">
      <button onClick={() => setIsExpanded(!isExpanded)} className="w-full flex items-center justify-between p-6 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors mb-6">
        <div className="text-left">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-xl font-bold text-[#0A0A0A]">{tier.name}</h3>
            <span className="px-3 py-1 bg-[#088571] text-white text-sm font-medium rounded-full">{tier.range}</span>
          </div>
          <p className="text-[#6A6A6A] text-sm">{tier.description}</p>
        </div>
        <ChevronDown size={24} className={`text-[#6A6A6A] transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
      </button>
      {isExpanded && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} onClick={() => onProductClick(product)} />
          ))}
        </div>
      )}
    </div>
  );
}

export function HoodiesPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);

  const getProductsByTier = (tier: typeof hoodieTiers[0]) => {
    return productsConfig.products.filter(
      (product) => product.category === 'hoodie' && product.gsm && product.gsm >= tier.gsmRange[0] && product.gsm <= tier.gsmRange[1]
    );
  };

  const getBestSellerProducts = () => {
    return bestSellers.map(item => {
      const product = productsConfig.products.find(p => p.id === item.id);
      return product ? { product, badge: item.badge, badgeColor: item.badgeColor } : null;
    }).filter((item): item is { product: ProductItem; badge: string; badgeColor: string } => item !== null);
  };

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-[#6A6A6A] mb-6">
            <Link to="/" className="hover:text-[#088571]">Home</Link>
            <span>/</span>
            <span className="text-[#0A0A0A]">Hoodies</span>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold text-[#0A0A0A] mb-6">Premium Hoodies</h1>
              <p className="text-lg text-[#6A6A6A] mb-8">
                From 280GSM lightweight to 400GSM ultra-heavyweight. Stay warm in style with our premium hoodie collection, available in 50+ colors.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="/#quote" className="bg-[#088571] text-white px-8 py-4 text-base font-medium rounded-full hover:bg-[#066b5a] transition-colors flex items-center gap-2">
                  Request a Quote <ArrowRight size={18} />
                </a>
                <Link to="/services" className="bg-white text-[#0A0A0A] px-8 py-4 text-base font-medium border border-gray-200 hover:border-gray-300 transition-colors rounded-full">
                  View Printing Options
                </Link>
              </div>
            </div>
            <div className="bg-gray-50 rounded-2xl p-8 aspect-square flex items-center justify-center">
              <img src="/images/hoodies/320-heavyweight-black.jpg" alt="Premium Hoodies" className="max-w-full max-h-full object-contain" />
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          {hoodieTiers.map((tier) => (
            <TierSection key={tier.name} tier={tier} products={getProductsByTier(tier)} onProductClick={setSelectedProduct} />
          ))}

          {/* Best Sellers */}
          <div className="mt-20 pt-16 border-t border-gray-200">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Star className="w-6 h-6 text-[#088571] fill-[#088571]" />
                <h2 className="text-3xl font-bold text-[#0A0A0A]">Best Sellers</h2>
              </div>
              <p className="text-[#6A6A6A]">Featured hoodies most popular among brands and businesses</p>
            </div>
            <div className="flex justify-center">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl">
                {getBestSellerProducts().map(({ product, badge, badgeColor }) => (
                  <ProductCard key={product.id} product={product} onClick={() => setSelectedProduct(product)} isBestSeller badge={badge} badgeColor={badgeColor} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24 bg-[#0A0A0A]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">Ready to Order?</h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8">Get a custom quote for your hoodie order. We offer competitive pricing and fast turnaround times.</p>
          <a href="/#quote" className="inline-flex items-center gap-2 bg-[#088571] text-white px-8 py-4 rounded-full font-medium hover:bg-[#066b5a] transition-colors">
            Get Your Quote <ArrowRight size={18} />
          </a>
        </div>
      </section>

      {selectedProduct && <ProductModal product={selectedProduct} isOpen={!!selectedProduct} onClose={() => setSelectedProduct(null)} />}
    </div>
  );
}
