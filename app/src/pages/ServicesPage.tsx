import { useEffect } from 'react';
import { Palette, Package, Tag, CheckCircle, ArrowRight, Sparkles, Layers, Zap, Shirt, Box, Gift, FileText, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useGoToQuoteForm } from '@/hooks/useGoToQuoteForm';

const printingTechniques = [
  {
    icon: Layers,
    title: 'DTF Printing',
    description: 'Direct-to-Film printing offers vibrant, full-color designs with excellent durability. Perfect for complex artwork and photorealistic prints.',
    benefits: ['Full color capability', 'Soft hand feel', 'High durability', 'No color limitations'],
    bestFor: 'Complex designs, photos, multi-color artwork',
  },
  {
    icon: Zap,
    title: 'Screen Printing',
    description: 'The classic choice for bulk orders. Delivers bold, opaque colors that last through countless washes.',
    benefits: ['Cost-effective for bulk', 'Vibrant opaque colors', 'Long-lasting', 'Great for simple designs'],
    bestFor: 'Large quantities, simple designs, bold graphics',
  },
  {
    icon: Sparkles,
    title: 'Sublimation',
    description: 'Dye-sublimation infuses ink directly into polyester fabric for permanent, fade-resistant prints that won\'t crack or peel.',
    benefits: ['Permanent prints', 'No cracking or peeling', 'All-over printing', 'Photo quality'],
    bestFor: 'Polyester garments, all-over prints, sportswear',
  },
  {
    icon: Shirt,
    title: 'Embroidery',
    description: 'Premium stitched designs that add texture and sophistication. Perfect for logos and professional branding.',
    benefits: ['Premium look & feel', 'Extremely durable', '3D texture', 'Professional appearance'],
    bestFor: 'Logos, corporate wear, premium branding',
  },
  {
    icon: Palette,
    title: 'Heat Transfer',
    description: 'Versatile method for small batches and detailed designs. Quick turnaround with professional results.',
    benefits: ['Quick turnaround', 'Great for small orders', 'Detailed designs', 'No setup costs'],
    bestFor: 'Small quantities, detailed artwork, quick orders',
  },
  {
    icon: Layers,
    title: 'Puff Print',
    description: 'Raised, textured prints that create a 3D effect. Adds dimension and tactile interest to your designs.',
    benefits: ['3D textured effect', 'Unique look', 'Tactile feel', 'Eye-catching'],
    bestFor: 'Bold graphics, special effects, standout designs',
  },
];

const packagingOptions = [
  {
    icon: Box,
    title: 'Custom Poly Bags',
    description: 'Clear or branded poly bags protect your garments during shipping and storage. Available with your logo printed directly on the bag.',
    features: ['Custom sizing', 'Logo printing', 'Resealable options', 'Eco-friendly alternatives'],
  },
  {
    icon: Gift,
    title: 'Branded Boxes',
    description: 'Premium custom boxes that elevate your unboxing experience. Perfect for retail-ready products and gift packaging.',
    features: ['Custom dimensions', 'Full-color printing', 'Magnetic closures', 'Tissue paper included'],
  },
  {
    icon: Package,
    title: 'Bulk Packaging',
    description: 'Efficient packaging for wholesale orders. Cartons organized by size and style for easy inventory management.',
    features: ['Size-organized cartons', 'Pallet-ready', 'Inventory labels', 'Protective wrapping'],
  },
];

const labelingOptions = [
  {
    icon: Tag,
    title: 'Woven Labels',
    description: 'Premium woven labels sewn into the neckline or hem. The professional touch that completes your brand identity.',
    options: ['Damask woven', 'Satin woven', 'Taffeta woven', 'Center fold, end fold, or loop fold'],
  },
  {
    icon: FileText,
    title: 'Hang Tags',
    description: 'Custom hang tags that communicate your brand story. Include care instructions, pricing, and brand messaging.',
    options: ['Paper or cardstock', 'Die-cut shapes', 'String or safety pin attachment', 'Full-color printing'],
  },
  {
    icon: CheckCircle,
    title: 'Size Labels',
    description: 'Clear, professional size labels that make it easy for customers to find their perfect fit.',
    options: ['Woven or printed', 'Heat transfer', 'Puff print', 'Custom sizing systems'],
  },
  {
    icon: Shield,
    title: 'Care Labels',
    description: 'Essential care instructions that meet legal requirements and help customers maintain their garments.',
    options: ['Standard symbols', 'Custom text', 'Multi-language', 'Durable materials'],
  },
];

export function ServicesPage() {
  const goToQuoteForm = useGoToQuoteForm();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block px-4 py-1.5 bg-[#088571]/10 text-[#088571] text-sm font-medium rounded-full mb-6">
              Our Services
            </span>
            <h1 className="text-4xl lg:text-6xl font-bold text-[#0A0A0A] mb-6">
              Complete Apparel Solutions
            </h1>
            <p className="text-lg text-[#6A6A6A]">
              From custom printing to professional packaging and labeling, we handle every detail of your apparel production. One partner, endless possibilities.
            </p>
          </div>
        </div>
      </section>

      {/* Printing Techniques Section */}
      <section id="printing" className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-[#088571]/10 rounded-xl flex items-center justify-center">
                <Palette className="w-6 h-6 text-[#088571]" />
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#0A0A0A]">Printing Techniques</h2>
            </div>
            <p className="text-[#6A6A6A] max-w-2xl">
              Choose from a variety of printing methods to achieve the perfect look for your designs. Each technique offers unique advantages depending on your artwork and quantity needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {printingTechniques.map((technique) => (
              <div key={technique.title} className="bg-white rounded-2xl p-8 border border-gray-100 hover:border-[#088571]/30 hover:shadow-lg transition-all duration-300">
                <div className="w-14 h-14 bg-[#088571]/10 rounded-xl flex items-center justify-center mb-6">
                  <technique.icon className="w-7 h-7 text-[#088571]" />
                </div>
                <h3 className="text-xl font-bold text-[#0A0A0A] mb-3">{technique.title}</h3>
                <p className="text-[#6A6A6A] mb-6">{technique.description}</p>
                
                <div className="mb-6">
                  <p className="text-sm font-semibold text-[#0A0A0A] mb-2">Key Benefits:</p>
                  <ul className="space-y-1">
                    {technique.benefits.map((benefit) => (
                      <li key={benefit} className="text-sm text-[#6A6A6A] flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-[#088571] flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <p className="text-sm text-[#088571] font-medium">Best for: {technique.bestFor}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packaging Section */}
      <section id="packaging" className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-[#088571]/10 rounded-xl flex items-center justify-center">
                <Package className="w-6 h-6 text-[#088571]" />
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#0A0A0A]">Packaging Solutions</h2>
            </div>
            <p className="text-[#6A6A6A] max-w-2xl">
              First impressions matter. Our packaging solutions protect your products while creating a memorable unboxing experience that reinforces your brand.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {packagingOptions.map((option) => (
              <div key={option.title} className="bg-gray-50 rounded-2xl p-8 hover:bg-[#088571]/5 hover:border-[#088571]/20 border-2 border-transparent transition-all duration-300">
                <div className="w-16 h-16 bg-[#088571]/10 rounded-xl flex items-center justify-center mb-6">
                  <option.icon className="w-8 h-8 text-[#088571]" />
                </div>
                <h3 className="text-2xl font-bold text-[#0A0A0A] mb-4">{option.title}</h3>
                <p className="text-[#6A6A6A] mb-6">{option.description}</p>
                
                <div>
                  <p className="text-sm font-semibold text-[#0A0A0A] mb-3">Features:</p>
                  <ul className="space-y-2">
                    {option.features.map((feature) => (
                      <li key={feature} className="text-sm text-[#6A6A6A] flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-[#088571] flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Labeling Section */}
      <section id="labeling" className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-[#088571]/10 rounded-xl flex items-center justify-center">
                <Tag className="w-6 h-6 text-[#088571]" />
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#0A0A0A]">Labeling Options</h2>
            </div>
            <p className="text-[#6A6A6A] max-w-2xl">
              Professional labeling is the finishing touch that transforms blank garments into branded products. We offer a complete range of label types to meet your needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {labelingOptions.map((option) => (
              <div key={option.title} className="bg-white rounded-2xl p-8 border border-gray-100 hover:border-[#088571]/30 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 bg-[#088571]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <option.icon className="w-7 h-7 text-[#088571]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#0A0A0A] mb-3">{option.title}</h3>
                    <p className="text-[#6A6A6A] mb-4">{option.description}</p>
                    
                    <div className="flex flex-wrap gap-2">
                      {option.options.map((opt) => (
                        <span key={opt} className="px-3 py-1 bg-gray-100 text-sm text-[#6A6A6A] rounded-full">
                          {opt}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#0A0A0A] mb-4">
              How It Works
            </h2>
            <p className="text-[#6A6A6A] max-w-2xl mx-auto">
              Our streamlined process makes it easy to bring your apparel vision to life.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Request a Quote', description: 'Tell us about your project, quantities, and customization needs.' },
              { step: '02', title: 'Review & Approve', description: 'We provide a detailed quote and samples for your approval.' },
              { step: '03', title: 'Production', description: 'Your garments are produced with precision and quality control.' },
              { step: '04', title: 'Delivery', description: 'Receive your finished products, ready for sale or distribution.' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 bg-[#088571] text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">{item.title}</h3>
                <p className="text-[#6A6A6A] text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28 bg-[#0A0A0A]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-10 text-lg">
            Contact us today to discuss your project and get a custom quote tailored to your needs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              type="button"
              onClick={() => goToQuoteForm()}
              className="bg-[#088571] text-white px-8 py-4 text-base font-medium rounded-full hover:bg-[#066b5a] transition-colors flex items-center gap-2"
            >
              Get a Quote
              <ArrowRight size={18} />
            </button>
            <Link
              to="/why-us"
              className="bg-white/10 text-white px-8 py-4 text-base font-medium rounded-full hover:bg-white/20 transition-colors"
            >
              Why Choose Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
