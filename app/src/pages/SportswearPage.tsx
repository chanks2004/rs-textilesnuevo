import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useGoToQuoteForm } from '@/hooks/useGoToQuoteForm';
import { productsConfig, type ProductItem } from '../config';
import { ArrowRight } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { X } from 'lucide-react';

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
          <div className="relative bg-gray-50 p-6">
            <div className="relative aspect-square">
              <img
                src={product.variants[selectedVariant]?.image || product.image}
                alt={product.name}
                className="w-full h-full object-contain"
              />
            </div>
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
                    <span key={feature} className="px-3 py-1.5 bg-gray-100 text-sm text-[#0A0A0A] rounded-full">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs text-[#6A6A6A] uppercase tracking-wide mb-3">More colors available upon quote</p>
                <p className="text-xs text-[#9A9A9A] mb-3">Colors shown are for visual reference only</p>
                <div className="flex flex-wrap gap-3">
                  {product.variants.map((variant, idx) => (
                    <button
                      key={variant.color}
                      onClick={() => setSelectedVariant(idx)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all ${
                        idx === selectedVariant ? 'border-[#0A0A0A] bg-gray-50' : 'border-gray-200 hover:border-gray-300'
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
    <div className="group bg-white rounded-xl overflow-hidden border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300 relative">
      <div onClick={onClick} className="relative aspect-square bg-gray-50 p-6 cursor-pointer">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-5">
        <div onClick={onClick} className="cursor-pointer">
          <h3 className="font-semibold text-[#0A0A0A] mb-2 group-hover:text-[#088571] transition-colors">{product.name}</h3>
          <p className="text-sm text-[#6A6A6A] mb-4 line-clamp-2">{product.description}</p>
        </div>
        {product.variants.length > 0 && (
          <div className="mb-4">
            <p className="text-xs text-[#9A9A9A] mb-2">More colors available upon quote</p>
            <div className="flex flex-wrap gap-2">
              {product.variants.slice(0, 6).map((variant, idx) => (
                <span
                  key={idx}
                  className="w-6 h-6 rounded-full border border-gray-200 flex-shrink-0"
                  style={{ backgroundColor: variant.colorCode }}
                  title={variant.color}
                />
              ))}
            </div>
          </div>
        )}
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

export function SportswearPage() {
  const goToQuoteForm = useGoToQuoteForm();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);

  const sportswearProducts = productsConfig.products.filter((p) => p.category === 'sportswear');
  const heroProduct = productsConfig.products.find((p) => p.id === 'sportswear-short-sleeve-tee');

  return (
    <div className="pt-20">
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-[#6A6A6A] mb-6">
            <Link to="/" className="hover:text-[#088571]">
              Home
            </Link>
            <span>/</span>
            <span className="text-[#0A0A0A]">Sportswear</span>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold text-[#0A0A0A] mb-6">Sportswear</h1>
              <p className="text-lg text-[#6A6A6A] mb-8">
                High-performance apparel designed for movement, comfort, and breathability. Ideal for gyms, teams, and
                active brands.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  type="button"
                  onClick={() => goToQuoteForm()}
                  className="bg-[#088571] text-white px-8 py-4 text-base font-medium rounded-full hover:bg-[#066b5a] transition-colors flex items-center gap-2"
                >
                  Request a Quote <ArrowRight size={18} />
                </button>
                <Link
                  to="/services"
                  className="bg-white text-[#0A0A0A] px-8 py-4 text-base font-medium border border-gray-200 hover:border-gray-300 transition-colors rounded-full"
                >
                  View Printing Options
                </Link>
              </div>
            </div>
            <div className="bg-gray-50 rounded-2xl p-8 aspect-square flex items-center justify-center">
              {heroProduct && (
                <img
                  src={heroProduct.image}
                  alt="Sportswear"
                  className="max-w-full max-h-full object-contain"
                />
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-[#0A0A0A] mb-4">Sportswear</h2>
            <p className="text-[#6A6A6A] max-w-3xl">
              High-performance apparel designed for movement, comfort, and breathability. Ideal for gyms, teams, and
              active brands.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sportswearProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={() => setSelectedProduct(product)}
                onGetQuote={goToQuoteForm}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-[#0A0A0A]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">Ready to Order?</h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8">
            Get a custom quote for your sportswear order. We offer competitive pricing and fast turnaround times.
          </p>
          <button
            type="button"
            onClick={() => goToQuoteForm()}
            className="inline-flex items-center gap-2 bg-[#088571] text-white px-8 py-4 rounded-full font-medium hover:bg-[#066b5a] transition-colors"
          >
            Get Your Quote <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onRequestQuote={goToQuoteForm}
        />
      )}
    </div>
  );
}
