import { Link } from 'react-router-dom';
import { Mail, Instagram, Facebook, Linkedin } from 'lucide-react';
import { useGoToQuoteForm } from '@/hooks/useGoToQuoteForm';

export function Footer() {
  const goToQuoteForm = useGoToQuoteForm();
  return (
    <footer className="bg-[#0A0A0A] text-white py-16 lg:py-20">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold mb-4">Rs Textiles</h3>
            <p className="text-gray-400 mb-6">Premium blank apparel for brands that demand quality. From lightweight basics to ultra-heavyweight statement pieces.</p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#088571] transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#088571] transition-colors"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#088571] transition-colors"><Linkedin className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Products</h4>
            <ul className="space-y-3">
              <li><Link to="/tshirts" className="text-gray-400 hover:text-white transition-colors">T-Shirts</Link></li>
              <li><Link to="/hoodies" className="text-gray-400 hover:text-white transition-colors">Hoodies</Link></li>
              <li><Link to="/hats" className="text-gray-400 hover:text-white transition-colors">Hats</Link></li>
              <li><Link to="/sportswear" className="text-gray-400 hover:text-white transition-colors">Sportswear</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Company</h4>
            <ul className="space-y-3">
              <li><Link to="/services" className="text-gray-400 hover:text-white transition-colors">Our Services</Link></li>
              <li><Link to="/why-us" className="text-gray-400 hover:text-white transition-colors">Why Us</Link></li>
              <li>
                <button
                  type="button"
                  onClick={() => goToQuoteForm()}
                  className="text-gray-400 hover:text-white transition-colors text-left"
                >
                  Get a Quote
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3"><Mail className="w-5 h-5 text-[#088571] mt-0.5" /><a href="mailto:contactorstextiles@gmail.com" className="text-gray-400 hover:text-white transition-colors">contactorstextiles@gmail.com</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">© 2024 Rs Textiles. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
