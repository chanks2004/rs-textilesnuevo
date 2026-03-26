import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Send } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  EMAILJS_PUBLIC_KEY,
  EMAILJS_SERVICE_ID,
  EMAILJS_TEMPLATE_ID,
} from '@/lib/emailjsConfig';

const selectClass =
  'flex h-12 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] md:text-sm disabled:opacity-50';

const initialEmpty = {
  user_name: '',
  user_email: '',
  company_name: '',
  user_phone: '',
  product_type: '',
  estimated_quantity: '',
  preferred_colors: '',
  size_breakdown: '',
  delivery_date: '',
  customization_type: '',
  additional_details: '',
};

export function QuoteForm() {
  const [values, setValues] = useState(initialEmpty);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [fileInputKey, setFileInputKey] = useState(0);
  const [isSending, setIsSending] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(
    null
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const list = e.target.files;
    setUploadedFiles(list ? Array.from(list) : []);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatusMessage(null);
    setIsSending(true);

    const fd = new FormData(e.currentTarget);
    const fileNames = uploadedFiles.map((f) => f.name).join(', ');
    const baseDetails = String(fd.get('additional_details') ?? '').trim();
    const additional_details =
      fileNames.length > 0
        ? [baseDetails, `Reference file names (files not attached via email): ${fileNames}`]
            .filter(Boolean)
            .join('\n\n')
        : baseDetails;

    const templateParams = {
      user_name: String(fd.get('user_name') ?? '').trim(),
      user_email: String(fd.get('user_email') ?? '').trim(),
      company_name: String(fd.get('company_name') ?? '').trim() || '—',
      user_phone: String(fd.get('user_phone') ?? '').trim() || '—',
      product_type: String(fd.get('product_type') ?? '').trim(),
      estimated_quantity: String(fd.get('estimated_quantity') ?? '').trim(),
      preferred_colors: String(fd.get('preferred_colors') ?? '').trim() || '—',
      size_breakdown: String(fd.get('size_breakdown') ?? '').trim() || '—',
      delivery_date: String(fd.get('delivery_date') ?? '').trim() || '—',
      customization_type: String(fd.get('customization_type') ?? '').trim() || '—',
      additional_details: additional_details || '—',
    };

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );
      setStatusMessage({
        type: 'success',
        text: 'Your request has been sent successfully. We will contact you shortly.',
      });
      setValues(initialEmpty);
      setUploadedFiles([]);
      setFileInputKey((k) => k + 1);
    } catch (err) {
      console.error(err);
      setStatusMessage({
        type: 'error',
        text: 'Something went wrong. Please try again.',
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="quote-form" className="scroll-mt-24 py-20 lg:py-28 bg-gray-50">
      <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-[#088571]/10 text-[#088571] text-sm font-medium rounded-full mb-4">
            Get a Quote
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-[#0A0A0A] mb-4">Request a Custom Quote</h2>
          <p className="text-[#6A6A6A] max-w-xl mx-auto">
            Tell us about your project and we'll provide a customized quote tailored to your needs.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 lg:p-12 shadow-sm border border-gray-100">
          <div className="grid sm:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <Label htmlFor="user_name">Full Name *</Label>
              <Input
                id="user_name"
                name="user_name"
                value={values.user_name}
                onChange={handleChange}
                placeholder="John Doe"
                required
                className="h-12"
                autoComplete="name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="user_email">Email Address *</Label>
              <Input
                id="user_email"
                name="user_email"
                type="email"
                value={values.user_email}
                onChange={handleChange}
                placeholder="john@company.com"
                required
                className="h-12"
                autoComplete="email"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <Label htmlFor="company_name">Company Name</Label>
              <Input
                id="company_name"
                name="company_name"
                value={values.company_name}
                onChange={handleChange}
                placeholder="Your Company"
                className="h-12"
                autoComplete="organization"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="user_phone">Phone Number</Label>
              <Input
                id="user_phone"
                name="user_phone"
                type="tel"
                value={values.user_phone}
                onChange={handleChange}
                placeholder="+1 (555) 000-0000"
                className="h-12"
                autoComplete="tel"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <Label htmlFor="product_type">Product Type *</Label>
              <select
                id="product_type"
                name="product_type"
                value={values.product_type}
                onChange={handleChange}
                required
                className={cn(selectClass, 'text-[#0A0A0A]')}
              >
                <option value="">Select product type</option>
                <option value="T-Shirts">T-Shirts</option>
                <option value="Hoodies">Hoodies</option>
                <option value="Hats">Hats</option>
                <option value="Sportswear">Sportswear</option>
                <option value="Mixed / Multiple">Mixed / Multiple</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="estimated_quantity">Estimated Quantity *</Label>
              <select
                id="estimated_quantity"
                name="estimated_quantity"
                value={values.estimated_quantity}
                onChange={handleChange}
                required
                className={cn(selectClass, 'text-[#0A0A0A]')}
              >
                <option value="">Select quantity</option>
                <option value="Under 50">Under 50</option>
                <option value="50 - 100">50 - 100</option>
                <option value="100 - 250">100 - 250</option>
                <option value="250 - 500">250 - 500</option>
                <option value="500 - 1,000">500 - 1,000</option>
                <option value="1,000+">1,000+</option>
              </select>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <Label htmlFor="preferred_colors">Preferred Color(s)</Label>
              <Input
                id="preferred_colors"
                name="preferred_colors"
                value={values.preferred_colors}
                onChange={handleChange}
                placeholder="e.g., Black, Navy, Heather Grey"
                className="h-12"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="size_breakdown">Size Breakdown</Label>
              <Input
                id="size_breakdown"
                name="size_breakdown"
                value={values.size_breakdown}
                onChange={handleChange}
                placeholder="e.g., S:10, M:20, L:20, XL:10"
                className="h-12"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <Label htmlFor="delivery_date">Target Delivery Date</Label>
              <Input
                id="delivery_date"
                name="delivery_date"
                type="date"
                value={values.delivery_date}
                onChange={handleChange}
                className="h-12"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="customization_type">Customization Needed</Label>
              <select
                id="customization_type"
                name="customization_type"
                value={values.customization_type}
                onChange={handleChange}
                className={cn(selectClass, 'text-[#0A0A0A]')}
              >
                <option value="">Select customization</option>
                <option value="DTF Printing">DTF Printing</option>
                <option value="Embroidery">Embroidery</option>
                <option value="Screen Printing">Screen Printing</option>
                <option value="Private Label">Private Label</option>
                <option value="Multiple Services">Multiple Services</option>
                <option value="Just Blanks (No Customization)">Just Blanks (No Customization)</option>
              </select>
            </div>
          </div>

          <div className="space-y-2 mb-6">
            <Label htmlFor="design_files">Design files (optional)</Label>
            <Input
              key={fileInputKey}
              id="design_files"
              type="file"
              name="design_files"
              multiple
              accept="image/*,.pdf,.ai,.eps,.psd"
              onChange={handleFileChange}
              className="h-12 cursor-pointer"
            />
            <p className="text-sm text-[#6A6A6A]">
              You don't need a design to request a quote. If you already have one, feel free to upload it
              here.
            </p>
            {uploadedFiles.length > 0 && (
              <ul className="text-sm text-[#0A0A0A] list-disc pl-5 space-y-1">
                {uploadedFiles.map((f) => (
                  <li key={f.name + f.size}>{f.name}</li>
                ))}
              </ul>
            )}
          </div>

          <div className="space-y-2 mb-8">
            <Label htmlFor="additional_details">Additional Details</Label>
            <Textarea
              id="additional_details"
              name="additional_details"
              value={values.additional_details}
              onChange={handleChange}
              placeholder="Tell us more about your project, customization needs, timeline, etc."
              rows={5}
            />
          </div>

          {statusMessage && (
            <p
              className={cn(
                'text-center text-sm mb-4',
                statusMessage.type === 'success' ? 'text-[#088571]' : 'text-red-600'
              )}
              role="status"
            >
              {statusMessage.text}
            </p>
          )}

          <Button
            type="submit"
            disabled={isSending}
            className="w-full h-14 bg-[#088571] hover:bg-[#066b5a] text-white text-lg font-medium rounded-full disabled:opacity-70"
          >
            <Send className="w-5 h-5 mr-2" />
            {isSending ? 'Sending...' : 'Submit Quote Request'}
          </Button>

          <p className="text-center text-sm text-[#6A6A6A] mt-6">
            We respect your privacy. Your information will never be shared.
          </p>
        </form>
      </div>
    </section>
  );
}
