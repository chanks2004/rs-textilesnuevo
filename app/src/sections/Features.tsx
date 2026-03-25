import { Truck, Palette, Clock, Shield, Package, Headphones } from 'lucide-react';

const features = [
  {
    icon: Palette,
    title: 'Custom Branding',
    description: 'DTF printing, embroidery, screen printing, and more customization options for your brand.',
  },
  {
    icon: Package,
    title: 'Bulk Orders',
    description: 'Competitive pricing on bulk orders with flexible quantity options to suit your needs.',
  },
  {
    icon: Truck,
    title: 'Fast Shipping',
    description: 'Quick turnaround times and reliable shipping to get your products when you need them.',
  },
  {
    icon: Shield,
    title: 'Quality Guaranteed',
    description: 'Premium materials and rigorous quality control to ensure every piece meets our standards.',
  },
  {
    icon: Clock,
    title: '24h Response',
    description: 'Get a quote within 24 hours. Our team is ready to help bring your vision to life.',
  },
  {
    icon: Headphones,
    title: 'Dedicated Support',
    description: 'Personal account manager to guide you through the entire process from quote to delivery.',
  },
];

export function Features() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-gray-100 text-sm text-[#6A6A6A] rounded-full mb-4">
            Why Choose Us
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-[#0A0A0A] mb-4">
            Everything You Need for Your Brand
          </h2>
          <p className="text-[#6A6A6A] max-w-2xl mx-auto">
            From premium blank apparel to custom branding solutions, we provide end-to-end service for your clothing brand.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group p-8 bg-gray-50 rounded-2xl hover:bg-[#088571]/5 hover:border-[#088571]/20 border border-transparent transition-all duration-300"
            >
              <div className="w-14 h-14 bg-[#088571]/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#088571] transition-colors duration-300">
                <feature.icon className="w-7 h-7 text-[#088571] group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-semibold text-[#0A0A0A] mb-3">
                {feature.title}
              </h3>
              <p className="text-[#6A6A6A] leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
