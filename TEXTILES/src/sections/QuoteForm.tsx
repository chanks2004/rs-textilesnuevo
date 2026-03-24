import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Send, CheckCircle } from 'lucide-react';

export function QuoteForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    productInterest: '',
    quantity: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (isSubmitted) {
    return (
      <section id="quote" className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-[600px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-2xl p-12 shadow-sm border border-gray-100">
            <div className="w-16 h-16 bg-[#088571]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-[#088571]" />
            </div>
            <h3 className="text-2xl font-bold text-[#0A0A0A] mb-4">
              Quote Request Submitted!
            </h3>
            <p className="text-[#6A6A6A] mb-8">
              Thank you for your interest. Our team will review your request and get back to you within 24 hours.
            </p>
            <Button
              onClick={() => setIsSubmitted(false)}
              variant="outline"
              className="border-gray-200"
            >
              Submit Another Request
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="quote" className="py-20 lg:py-28 bg-gray-50">
      <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-[#088571]/10 text-[#088571] text-sm font-medium rounded-full mb-4">
            Get a Quote
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-[#0A0A0A] mb-4">
            Request a Custom Quote
          </h2>
          <p className="text-[#6A6A6A] max-w-xl mx-auto">
            Tell us about your project and we'll provide a customized quote tailored to your needs.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 lg:p-12 shadow-sm border border-gray-100">
          <div className="grid sm:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                required
                className="h-12"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@company.com"
                required
                className="h-12"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <Label htmlFor="company">Company Name</Label>
              <Input
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Your Company"
                className="h-12"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1 (555) 000-0000"
                className="h-12"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <Label htmlFor="productInterest">Product Interest *</Label>
              <Input
                id="productInterest"
                name="productInterest"
                value={formData.productInterest}
                onChange={handleChange}
                placeholder="e.g., T-Shirts 260GSM"
                required
                className="h-12"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="quantity">Estimated Quantity *</Label>
              <Input
                id="quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                placeholder="e.g., 100 pieces"
                required
                className="h-12"
              />
            </div>
          </div>

          <div className="space-y-2 mb-8">
            <Label htmlFor="message">Additional Details</Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us more about your project, customization needs, timeline, etc."
              rows={5}
            />
          </div>

          <Button
            type="submit"
            className="w-full h-14 bg-[#088571] hover:bg-[#066b5a] text-white text-lg font-medium rounded-full"
          >
            <Send className="w-5 h-5 mr-2" />
            Submit Quote Request
          </Button>

          <p className="text-center text-sm text-[#6A6A6A] mt-6">
            We respect your privacy. Your information will never be shared.
          </p>
        </form>
      </div>
    </section>
  );
}
