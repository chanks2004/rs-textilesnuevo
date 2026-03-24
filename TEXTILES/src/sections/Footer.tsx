import { Mail, Phone, MapPin, Instagram, Facebook, Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#0A0A0A] text-white py-16 lg:py-20">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold mb-4">Rs Textiles</h3>
            <p className="text-gray-400 mb-6">
              Premium blank apparel for brands that demand quality. From lightweight basics to ultra-heavyweight statement pieces.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#088571] transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#088571] transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#088571] transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Products</h4>
            <ul className="space-y-3">
              <li>
                <a href="#tshirt" className="text-gray-400 hover:text-white transition-colors">T-Shirts</a>
              </li>
              <li>
                <a href="#hoodie" className="text-gray-400 hover:text-white transition-colors">Hoodies</a>
              </li>
              <li>
                <a href="#hat" className="text-gray-400 hover:text-white transition-colors">Hats</a>
              </li>
              <li>
                <a href="#sportswear" className="text-gray-400 hover:text-white transition-colors">Sportswear</a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Services</h4>
            <ul className="space-y-3">
              <li>
                <span className="text-gray-400">Custom Printing</span>
              </li>
              <li>
                <span className="text-gray-400">Embroidery</span>
              </li>
              <li>
                <span className="text-gray-400">Bulk Orders</span>
              </li>
              <li>
                <span className="text-gray-400">Wholesale</span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#088571] mt-0.5" />
                <span className="text-gray-400">info@rstextiles.com</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#088571] mt-0.5" />
                <span className="text-gray-400">+1 (555) 000-0000</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#088571] mt-0.5" />
                <span className="text-gray-400">123 Fashion Ave<br />New York, NY 10001</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © 2024 Rs Textiles. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
