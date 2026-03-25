// Color definitions
const tshirtColors = {
  black: { color: "Black", colorCode: "#0A0A0A" },
  white: { color: "White", colorCode: "#FFFFFF" },
  offwhite: { color: "Off-White", colorCode: "#F5F5F0" },
  grey: { color: "Grey", colorCode: "#808080" },
  charcoal: { color: "Charcoal", colorCode: "#36454F" },
  navy: { color: "Navy", colorCode: "#1E3A5F" },
  olive: { color: "Olive", colorCode: "#556B2F" },
  sand: { color: "Sand", colorCode: "#C2B280" },
  espresso: { color: "Espresso", colorCode: "#4B3621" },
  natural: { color: "Natural", colorCode: "#E8DCC4" },
  forest: { color: "Forest", colorCode: "#228B22" },
};

const hoodieColors = {
  black: { color: "Black", colorCode: "#0A0A0A" },
  grey: { color: "Grey", colorCode: "#808080" },
  navy: { color: "Navy", colorCode: "#1E3A5F" },
  charcoal: { color: "Charcoal", colorCode: "#36454F" },
  sand: { color: "Sand", colorCode: "#C2B280" },
  offwhite: { color: "Off-White", colorCode: "#F5F5F0" },
  natural: { color: "Natural", colorCode: "#E8DCC4" },
  forest: { color: "Forest", colorCode: "#228B22" },
};

const hatColors = {
  black: { color: "Black", colorCode: "#0A0A0A" },
  navy: { color: "Navy", colorCode: "#1E3A5F" },
  white: { color: "White", colorCode: "#FFFFFF" },
  charcoal: { color: "Charcoal", colorCode: "#36454F" },
};

// Product type definition
export interface ProductVariant {
  color: string;
  colorCode: string;
  image: string;
}

export interface ProductItem {
  id: string;
  name: string;
  category: "tshirt" | "hoodie" | "hat" | "sportswear";
  gsm?: number;
  image: string;
  variants: ProductVariant[];
  fabric: string;
  fit: string;
  features: string[];
  description: string;
  colorCount: number;
  customizationOptions: string[];
}

export interface ProductsConfig {
  label: string;
  heading: string;
  description: string;
  filters: { id: "tshirt" | "hoodie" | "hat" | "sportswear"; label: string }[];
  products: ProductItem[];
}

// Products configuration
export const productsConfig: ProductsConfig = {
  label: "Our Products",
  heading: "Premium Blank Apparel",
  description: "High-quality blank garments ready for your custom branding. From lightweight basics to ultra-heavyweight statement pieces.",
  filters: [
    { id: "tshirt", label: "T-Shirts" },
    { id: "hoodie", label: "Hoodies" },
    { id: "hat", label: "Hats" },
    { id: "sportswear", label: "Sportswear" },
  ],
  products: [
    // T-SHIRTS - LIGHTWEIGHT (up to 200 GSM)
    {
      id: "tshirt-180-classic",
      name: "Classic Tee 180GSM",
      category: "tshirt",
      gsm: 180,
      image: "/images/tshirts/180-classic-black.jpg",
      variants: [
        { ...tshirtColors.black, image: "/images/tshirts/180-classic-black.jpg" },
        { ...tshirtColors.white, image: "/images/tshirts/320-master-white.jpg" },
        { ...tshirtColors.grey, image: "/images/tshirts/330-apex-charcoal.jpg" },
        { ...tshirtColors.navy, image: "/images/tshirts/290-elite-navy.jpg" },
      ],
      fabric: "100% Ring-Spun Cotton",
      fit: "Regular Fit",
      features: ["Soft hand-feel", "Breathable", "Perfect for printing"],
      description: "Our lightest tee. Perfect for events, marathons, and promotional use where comfort and breathability matter most.",
      colorCount: 50,
      customizationOptions: ["DTF Print", "Screen Print", "Embroidery"],
    },
    {
      id: "tshirt-190-premium",
      name: "Premium Tee 190GSM",
      category: "tshirt",
      gsm: 190,
      image: "/images/tshirts/190-premium-black.jpg",
      variants: [
        { ...tshirtColors.black, image: "/images/tshirts/190-premium-black.jpg" },
        { ...tshirtColors.white, image: "/images/tshirts/320-master-white.jpg" },
        { ...tshirtColors.grey, image: "/images/tshirts/330-apex-charcoal.jpg" },
        { ...tshirtColors.navy, image: "/images/tshirts/290-elite-navy.jpg" },
      ],
      fabric: "100% Premium Cotton",
      fit: "Regular Fit",
      features: ["Enhanced durability", "Smooth surface", "Vibrant print results"],
      description: "A step up in quality. The 190GSM weight offers better opacity and a more substantial feel while remaining lightweight.",
      colorCount: 50,
      customizationOptions: ["DTF Print", "Screen Print", "Embroidery"],
    },
    {
      id: "tshirt-200-boxy",
      name: "Boxy Tee 200GSM",
      category: "tshirt",
      gsm: 200,
      image: "/images/tshirts/200-boxy-cream.jpg",
      variants: [
        { ...tshirtColors.black, image: "/images/tshirts/220-oversized-black.jpg" },
        { ...tshirtColors.offwhite, image: "/images/tshirts/200-boxy-cream.jpg" },
        { ...tshirtColors.sand, image: "/images/tshirts/240-heavyweight-sand.jpg" },
        { ...tshirtColors.olive, image: "/images/tshirts/220-oversized-forest.jpg" },
      ],
      fabric: "100% Organic Cotton",
      fit: "Boxy Fit",
      features: ["Relaxed silhouette", "Modern cut", "Streetwear ready"],
      description: "The perfect balance of lightweight comfort and modern streetwear aesthetics. Our boxy cut delivers a relaxed, contemporary silhouette.",
      colorCount: 50,
      customizationOptions: ["DTF Print", "Embroidery", "Screen Print"],
    },
    // T-SHIRTS - MIDWEIGHT (210-260 GSM)
    {
      id: "tshirt-220-oversized",
      name: "Oversized Tee 220GSM",
      category: "tshirt",
      gsm: 220,
      image: "/images/tshirts/220-oversized-forest.jpg",
      variants: [
        { ...tshirtColors.black, image: "/images/tshirts/220-oversized-black.jpg" },
        { ...tshirtColors.forest, image: "/images/tshirts/220-oversized-forest.jpg" },
        { ...tshirtColors.charcoal, image: "/images/tshirts/330-apex-charcoal.jpg" },
        { ...tshirtColors.offwhite, image: "/images/tshirts/200-boxy-cream.jpg" },
      ],
      fabric: "100% Midweight Cotton",
      fit: "Oversized",
      features: ["Dropped shoulder", "Relaxed fit", "Premium drape"],
      description: "Where quality meets comfort. The 220GSM weight provides a premium feel without being too heavy, perfect for everyday wear.",
      colorCount: 50,
      customizationOptions: ["DTF Print", "Embroidery", "Screen Print"],
    },
    {
      id: "tshirt-240-heavyweight",
      name: "Heavyweight Tee 240GSM",
      category: "tshirt",
      gsm: 240,
      image: "/images/tshirts/240-heavyweight-sand.jpg",
      variants: [
        { ...tshirtColors.black, image: "/images/tshirts/260-ultra-espresso.jpg" },
        { ...tshirtColors.natural, image: "/images/tshirts/200-boxy-cream.jpg" },
        { ...tshirtColors.olive, image: "/images/tshirts/220-oversized-forest.jpg" },
        { ...tshirtColors.sand, image: "/images/tshirts/240-heavyweight-sand.jpg" },
      ],
      fabric: "100% Heavy Cotton",
      fit: "Regular Fit",
      features: ["Substantial feel", "Excellent opacity", "Long-lasting"],
      description: "A true heavyweight that commands attention. The 240GSM construction offers unmatched durability and a luxury hand-feel.",
      colorCount: 50,
      customizationOptions: ["DTF Print", "Embroidery", "Screen Print"],
    },
    {
      id: "tshirt-260-ultra",
      name: "Ultra Heavyweight Tee 260GSM",
      category: "tshirt",
      gsm: 260,
      image: "/images/tshirts/260-ultra-espresso.jpg",
      variants: [
        { ...tshirtColors.black, image: "/images/tshirts/180-classic-black.jpg" },
        { ...tshirtColors.offwhite, image: "/images/tshirts/200-boxy-cream.jpg" },
        { ...tshirtColors.espresso, image: "/images/tshirts/260-ultra-espresso.jpg" },
        { ...tshirtColors.grey, image: "/images/tshirts/330-apex-charcoal.jpg" },
      ],
      fabric: "100% Ultra-Heavy Cotton",
      fit: "Boxy Oversized",
      features: ["Maximum durability", "Luxury feel", "Statement piece"],
      description: "Our heaviest tee. A statement piece that commands attention with its substantial weight and premium construction.",
      colorCount: 50,
      customizationOptions: ["DTF Print", "Embroidery", "Screen Print"],
    },
    // T-SHIRTS - PREMIUM QUALITY (270-330 GSM)
    {
      id: "tshirt-290-elite",
      name: "Elite Heavyweight Tee 290GSM",
      category: "tshirt",
      gsm: 290,
      image: "/images/tshirts/290-elite-navy.jpg",
      variants: [
        { ...tshirtColors.black, image: "/images/tshirts/190-premium-black.jpg" },
        { ...tshirtColors.white, image: "/images/tshirts/320-master-white.jpg" },
        { ...tshirtColors.grey, image: "/images/tshirts/330-apex-charcoal.jpg" },
        { ...tshirtColors.navy, image: "/images/tshirts/290-elite-navy.jpg" },
      ],
      fabric: "100% Elite Cotton",
      fit: "Oversized",
      features: ["Superior weight", "Clean finish", "High-end quality"],
      description: "Elite heavyweight construction for premium clothing brands. Designed for those who demand the very best.",
      colorCount: 50,
      customizationOptions: ["DTF Print", "Embroidery", "Screen Print"],
    },
    {
      id: "tshirt-320-master",
      name: "Master Heavyweight Tee 320GSM",
      category: "tshirt",
      gsm: 320,
      image: "/images/tshirts/320-master-white.jpg",
      variants: [
        { ...tshirtColors.black, image: "/images/tshirts/180-classic-black.jpg" },
        { ...tshirtColors.white, image: "/images/tshirts/320-master-white.jpg" },
        { ...tshirtColors.olive, image: "/images/tshirts/220-oversized-forest.jpg" },
        { ...tshirtColors.espresso, image: "/images/tshirts/260-ultra-espresso.jpg" },
      ],
      fabric: "100% Master Cotton",
      fit: "Boxy Oversized",
      features: ["Ultimate structure", "Luxury construction", "Masterclass quality"],
      description: "Master-level heavyweight tee. The gold standard for premium apparel with unmatched structure and feel.",
      colorCount: 50,
      customizationOptions: ["DTF Print", "Embroidery", "Screen Print"],
    },
    {
      id: "tshirt-330-apex",
      name: "Apex Heavyweight Tee 330GSM",
      category: "tshirt",
      gsm: 330,
      image: "/images/tshirts/330-apex-charcoal.jpg",
      variants: [
        { ...tshirtColors.black, image: "/images/tshirts/220-oversized-black.jpg" },
        { ...tshirtColors.natural, image: "/images/tshirts/200-boxy-cream.jpg" },
        { ...tshirtColors.navy, image: "/images/tshirts/290-elite-navy.jpg" },
        { ...tshirtColors.charcoal, image: "/images/tshirts/330-apex-charcoal.jpg" },
      ],
      fabric: "100% Apex Cotton",
      fit: "Oversized",
      features: ["Maximum weight", "Ultimate luxury", "Apex quality"],
      description: "The apex of heavyweight tees. Maximum weight with ultimate luxury feel for the most discerning brands.",
      colorCount: 50,
      customizationOptions: ["DTF Print", "Embroidery", "Screen Print"],
    },
    // HOODIES - LIGHTWEIGHT (up to 280 GSM)
    {
      id: "hoodie-280-midweight",
      name: "Midweight Hoodie 280GSM",
      category: "hoodie",
      gsm: 280,
      image: "/images/hoodies/280-midweight-grey.jpg",
      variants: [
        { ...hoodieColors.black, image: "/images/hoodies/320-heavyweight-black.jpg" },
        { ...hoodieColors.grey, image: "/images/hoodies/280-midweight-grey.jpg" },
        { ...hoodieColors.navy, image: "/images/hoodies/300-heavy-navy.jpg" },
        { ...hoodieColors.charcoal, image: "/images/hoodies/300-heavy-navy.jpg" },
      ],
      fabric: "80/20 Cotton-Poly Blend",
      fit: "Regular Fit",
      features: ["Fleece-lined", "Lightweight warmth", "Versatile"],
      description: "Perfect year-round hoodie. Light enough for layering, warm enough for cool evenings.",
      colorCount: 50,
      customizationOptions: ["DTF Print", "Embroidery", "Puff Print"],
    },
    {
      id: "hoodie-280-oversized",
      name: "Oversized Midweight Hoodie 280GSM",
      category: "hoodie",
      gsm: 280,
      image: "/images/hoodies/280-oversized-offwhite.jpg",
      variants: [
        { ...hoodieColors.black, image: "/images/hoodies/320-heavyweight-black.jpg" },
        { ...hoodieColors.sand, image: "/images/hoodies/400-premium-sand.jpg" },
        { ...hoodieColors.offwhite, image: "/images/hoodies/280-oversized-offwhite.jpg" },
        { ...hoodieColors.natural, image: "/images/hoodies/350-ultra-natural.jpg" },
      ],
      fabric: "80/20 Cotton-Poly Blend",
      fit: "Oversized",
      features: ["Dropped shoulder", "Relaxed silhouette", "Streetwear staple"],
      description: "Oversized silhouette with the same lightweight comfort. A streetwear essential.",
      colorCount: 50,
      customizationOptions: ["DTF Print", "Embroidery", "Puff Print"],
    },
    // HOODIES - MIDWEIGHT (300-350 GSM)
    {
      id: "hoodie-300-heavy",
      name: "Heavy Hoodie 300GSM",
      category: "hoodie",
      gsm: 300,
      image: "/images/hoodies/300-heavy-navy.jpg",
      variants: [
        { ...hoodieColors.black, image: "/images/hoodies/320-heavyweight-black.jpg" },
        { ...hoodieColors.grey, image: "/images/hoodies/280-midweight-grey.jpg" },
        { ...hoodieColors.navy, image: "/images/hoodies/300-heavy-navy.jpg" },
        { ...hoodieColors.charcoal, image: "/images/hoodies/300-heavy-navy.jpg" },
      ],
      fabric: "100% Cotton Fleece",
      fit: "Regular Fit",
      features: ["Thick fleece", "Enhanced warmth", "Quality construction"],
      description: "Step up in warmth with this midweight hoodie. Perfect for cooler seasons.",
      colorCount: 50,
      customizationOptions: ["DTF Print", "Embroidery", "Puff Print"],
    },
    {
      id: "hoodie-320-heavyweight",
      name: "Heavyweight Hoodie 320GSM",
      category: "hoodie",
      gsm: 320,
      image: "/images/hoodies/320-heavyweight-black.jpg",
      variants: [
        { ...hoodieColors.black, image: "/images/hoodies/320-heavyweight-black.jpg" },
        { ...hoodieColors.offwhite, image: "/images/hoodies/280-oversized-offwhite.jpg" },
        { ...hoodieColors.charcoal, image: "/images/hoodies/280-midweight-grey.jpg" },
        { ...hoodieColors.natural, image: "/images/hoodies/350-ultra-natural.jpg" },
      ],
      fabric: "100% Heavy Cotton Fleece",
      fit: "Regular Fit",
      features: ["Thick fleece", "Maximum warmth", "Premium construction"],
      description: "Substantial heavyweight hoodie for cold weather. Built to last.",
      colorCount: 50,
      customizationOptions: ["DTF Print", "Embroidery", "Puff Print"],
    },
    {
      id: "hoodie-350-ultra",
      name: "Ultra Heavyweight Hoodie 350GSM",
      category: "hoodie",
      gsm: 350,
      image: "/images/hoodies/350-ultra-natural.jpg",
      variants: [
        { ...hoodieColors.black, image: "/images/hoodies/320-heavyweight-black.jpg" },
        { ...hoodieColors.natural, image: "/images/hoodies/350-ultra-natural.jpg" },
        { ...hoodieColors.forest, image: "/images/hoodies/220-oversized-forest.jpg" },
        { ...hoodieColors.grey, image: "/images/hoodies/280-midweight-grey.jpg" },
      ],
      fabric: "100% Ultra-Heavy Cotton Fleece",
      fit: "Oversized",
      features: ["Ultra-thick", "Statement piece", "Luxury weight"],
      description: "Our heaviest hoodie. A premium statement piece with unmatched warmth and presence.",
      colorCount: 50,
      customizationOptions: ["DTF Print", "Embroidery", "Puff Print"],
    },
    // HOODIES - PREMIUM QUALITY (400+ GSM)
    {
      id: "hoodie-400-premium",
      name: "Premium Ultra Hoodie 400GSM",
      category: "hoodie",
      gsm: 400,
      image: "/images/hoodies/400-premium-sand.jpg",
      variants: [
        { ...hoodieColors.black, image: "/images/hoodies/320-heavyweight-black.jpg" },
        { ...hoodieColors.offwhite, image: "/images/hoodies/280-oversized-offwhite.jpg" },
        { ...hoodieColors.sand, image: "/images/hoodies/400-premium-sand.jpg" },
        { ...hoodieColors.navy, image: "/images/hoodies/300-heavy-navy.jpg" },
      ],
      fabric: "100% Premium Cotton Fleece",
      fit: "Oversized",
      features: ["Exceptional warmth", "Luxury weight", "Premium quality"],
      description: "Premium ultra-heavyweight hoodie for the most demanding brands. Exceptional warmth and presence.",
      colorCount: 50,
      customizationOptions: ["DTF Print", "Embroidery", "Puff Print"],
    },
    // HATS
    {
      id: "hat-trucker-mesh",
      name: "Classic Trucker Hat",
      category: "hat",
      image: "/images/hats/trucker-navywhite.jpg",
      variants: [
        { ...hatColors.black, image: "/images/hats/dadcap-black.jpg" },
        { color: "Navy/White", colorCode: "#1E3A5F", image: "/images/hats/trucker-navywhite.jpg" },
        { ...hatColors.charcoal, image: "/images/hats/structured-charcoal.jpg" },
        { ...hatColors.white, image: "/images/hats/trucker-navywhite.jpg" },
      ],
      fabric: "Cotton Front, Polyester Mesh Back",
      fit: "Adjustable Snapback",
      features: ["Breathable mesh", "Structured front", "Classic style"],
      description: "The iconic trucker style. Breathable mesh back with a structured cotton front panel.",
      colorCount: 50,
      customizationOptions: ["Embroidery", "Patch"],
    },
    {
      id: "hat-cotton-dad",
      name: "Classic Dad Cap",
      category: "hat",
      image: "/images/hats/dadcap-black.jpg",
      variants: [
        { ...hatColors.black, image: "/images/hats/dadcap-black.jpg" },
        { ...hatColors.navy, image: "/images/hats/trucker-navywhite.jpg" },
        { ...hatColors.charcoal, image: "/images/hats/structured-charcoal.jpg" },
        { ...hatColors.white, image: "/images/hats/trucker-navywhite.jpg" },
      ],
      fabric: "100% Cotton",
      fit: "Adjustable Strap",
      features: ["Unstructured", "Low profile", "Comfortable fit"],
      description: "The timeless dad cap. Unstructured, low-profile design that works with any style.",
      colorCount: 50,
      customizationOptions: ["Embroidery", "Patch"],
    },
    {
      id: "hat-cotton-structured",
      name: "Structured Baseball Cap",
      category: "hat",
      image: "/images/hats/structured-charcoal.jpg",
      variants: [
        { ...hatColors.black, image: "/images/hats/dadcap-black.jpg" },
        { ...hatColors.navy, image: "/images/hats/trucker-navywhite.jpg" },
        { ...hatColors.charcoal, image: "/images/hats/structured-charcoal.jpg" },
        { ...hatColors.white, image: "/images/hats/trucker-navywhite.jpg" },
      ],
      fabric: "100% Cotton Twill",
      fit: "Adjustable Snapback",
      features: ["Structured crown", "Curved brim", "Premium finish"],
      description: "A structured cap with a premium finish. The classic baseball style that never goes out of fashion.",
      colorCount: 50,
      customizationOptions: ["Embroidery", "Patch"],
    },
    // SPORTSWEAR
    {
      id: "sportswear-performance-tee",
      name: "Performance Tee",
      category: "sportswear",
      image: "/images/sportswear/performance-tee-black.jpg",
      variants: [
        { ...tshirtColors.black, image: "/images/sportswear/performance-tee-black.jpg" },
        { ...tshirtColors.white, image: "/images/tshirts/320-master-white.jpg" },
        { ...tshirtColors.navy, image: "/images/tshirts/290-elite-navy.jpg" },
        { ...tshirtColors.grey, image: "/images/tshirts/330-apex-charcoal.jpg" },
      ],
      fabric: "100% Polyester",
      fit: "Athletic Fit",
      features: ["Moisture-wicking", "Quick-dry", "Breathable"],
      description: "High-performance athletic tee designed for active use. Moisture-wicking fabric keeps you cool and dry.",
      colorCount: 50,
      customizationOptions: ["DTF Print", "Sublimation", "Heat Transfer"],
    },
    {
      id: "sportswear-performance-longsleeve",
      name: "Performance Long Sleeve",
      category: "sportswear",
      image: "/images/sportswear/performance-longsleeve-black.jpg",
      variants: [
        { ...tshirtColors.black, image: "/images/sportswear/performance-longsleeve-black.jpg" },
        { ...tshirtColors.white, image: "/images/tshirts/320-master-white.jpg" },
        { ...tshirtColors.navy, image: "/images/tshirts/290-elite-navy.jpg" },
        { ...tshirtColors.grey, image: "/images/tshirts/330-apex-charcoal.jpg" },
      ],
      fabric: "100% Polyester",
      fit: "Athletic Fit",
      features: ["Moisture-wicking", "Quick-dry", "UV protection"],
      description: "Long sleeve performance shirt for outdoor activities. Provides coverage and comfort with moisture-wicking technology.",
      colorCount: 50,
      customizationOptions: ["DTF Print", "Sublimation", "Heat Transfer"],
    },
  ],
};

export type ProductCategory = "tshirt" | "hoodie" | "hat" | "sportswear";

// Navigation configuration
export const navigationConfig = {
  logo: "Rs Textiless",
  contactHref: "#quote",
  contactLabel: "Request a quote",
  links: [
    { label: "T-Shirts", href: "#tshirts" },
    { label: "Hoodies", href: "#hoodies" },
    { label: "Hats", href: "#hats" },
    { label: "Sportswear", href: "#sportswear" },
    { label: "Services", href: "#services" }
  ]
};

// How It Works configuration
export const howItWorksConfig = {
  label: "How it works",
  heading: "A simple way to source apparel",
  description: "We help you move faster and safer by simplifying sourcing, customization, and production.",
  steps: [
    {
      number: "01",
      title: "Choose your product",
      description: "Select the apparel style and quality level that best fits your business or brand."
    },
    {
      number: "02",
      title: "Customize if needed",
      description: "Add printing, embroidery, or private label details if your project requires it."
    },
    {
      number: "03",
      title: "Request your quote",
      description: "Send us your requirements and we will guide you through the next steps."
    }
  ]
};

// Customization configuration
export const customizationConfig = {
  label: "Customization",
  heading: "Fully customize your apparel",
  description: "Printing, embroidery, private labeling, and production support.",
  options: [
    { name: "DTF Printing", description: "High-quality print application for custom designs." },
    { name: "Embroidery", description: "Premium stitched branding for a high-end finish." },
    { name: "Private Label", description: "Custom labels and clean branding for your apparel line." },
    { name: "Packaging", description: "Optional packaging support based on your project needs." }
  ],
  services: [
    {
      id: "dtf",
      icon: "printer",
      title: "DTF Printing",
      description: "High-quality print application for custom designs.",
      features: [
        "Great for detailed graphics",
        "Strong color vibrancy",
        "Flexible for multiple garment types"
      ]
    },
    {
      id: "embroidery",
      icon: "stitch",
      title: "Embroidery",
      description: "Premium stitched branding for a high-end finish.",
      features: [
        "Professional premium look",
        "Long-lasting finish",
        "Ideal for hats, polos, and hoodies"
      ]
    },
    {
      id: "private-label",
      icon: "tag",
      title: "Private Label",
      description: "Custom labels and clean branding for your apparel line.",
      features: [
        "Neck label customization",
        "Cleaner brand presentation",
        "Better private-label positioning"
      ]
    },
    {
      id: "packaging",
      icon: "box",
      title: "Packaging",
      description: "Optional packaging support based on your project needs.",
      features: [
        "Organized presentation",
        "Custom project support",
        "Useful for brand launches"
      ]
    }
  ]
};

// Why Us configuration
export const whyUsConfig = {
  label: "Why us",
  heading: "Why brands work with us",
  description: "We simplify sourcing so you can move faster with more confidence.",
  features: [
    {
      title: "Fewer supplier headaches",
      description: "Avoid dealing with multiple suppliers and disconnected communication.",
      iconName: "shield"
    },
    {
      title: "Reliable product guidance",
      description: "We help you choose the right product for your goals, quality level, and timeline.",
      iconName: "check"
    },
    {
      title: "Support through the process",
      description: "From first quote to final production, we help you make safer decisions.",
      iconName: "users"
    }
  ]
};

// Site configuration
export const siteConfig = {
  name: "Rs Textiles",
  description: "Premium blank apparel for your brand",
  url: "https://rstextiles.com",
};

// CTA configuration
export const ctaConfig = {
  heading: "Ready to start your apparel project?",
  description: "Tell us what you need and we will guide you through product selection, customization, and quoting.",
  buttonText: "Request a Quote",
  buttonHref: "#quote",
  email: "contactorstextiles@gmail.com",
  tags: ["Premium blanks", "Full customization", "Fast support"]
};
