import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { navigationConfig } from '../config';

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-xl lg:text-2xl font-bold text-[#0A0A0A] tracking-tight"
          >
            {navigationConfig.logo}
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navigationConfig.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className="text-sm text-[#6A6A6A] hover:text-[#0A0A0A] transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <a
              href={navigationConfig.contactHref}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(navigationConfig.contactHref);
              }}
              className="inline-flex items-center px-5 py-2.5 bg-[#0A0A0A] text-white text-sm font-medium rounded-full hover:bg-[#333333] transition-colors duration-200"
            >
              {navigationConfig.contactLabel}
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-[#0A0A0A]"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 py-4">
            <nav className="flex flex-col gap-4">
              {navigationConfig.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className="text-[#6A6A6A] hover:text-[#0A0A0A] transition-colors duration-200 py-2"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={navigationConfig.contactHref}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(navigationConfig.contactHref);
                }}
                className="inline-flex items-center justify-center px-5 py-3 bg-[#0A0A0A] text-white text-sm font-medium rounded-full hover:bg-[#333333] transition-colors duration-200 mt-2"
              >
                {navigationConfig.contactLabel}
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
