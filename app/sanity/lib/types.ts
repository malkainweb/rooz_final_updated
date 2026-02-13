export interface SanityTestimonial {
  _id: string;
  _type: "testimonial";
  text: string;
  author: string;
  role: string;
  avatar: {
    _type: "image";
    asset: {
      _ref: string;
      _type: "reference";
    };
  };
  order?: number;
}

export interface SanitySiteHeaders {
  _id: string;
  _type: "siteHeaders";
  heroTitle?: string;
  heroSubtitle?: string;
  whyChooseUsHeader?: string;
  lockDistractionsHeader?: string;
  lockDistractionsSubheader?: string;
  statsHeader?: string;
  howItWorksHeader?: string;
  howItWorksSubheader?: string;
  howItWorksDescription?: string;
  testimonialsVideoHeader?: string;
  testimonialsHeader?: string;
  footerCtaHeader?: string;
  footerTagline?: string;
}
export interface SanityStatCard {
  _id: string;
  _type: "statCard";
  icon: {
    _type: "image";
    asset: {
      _ref: string;
      _type: "reference";
    };
  };
  mainStat: string;
  title: string;
  subStat: string;
  subText: string;
  bgColor: string;
  order?: number;
}

export interface SanityHowItWorksStep {
  _id: string;
  _type: "howItWorksStep";
  number: number;
  title: string;
  description: string;
  image: {
    _type: "image";
    asset: {
      _ref: string;
      _type: "reference";
    };
  };
  order?: number;
}

export interface SanityWhyChooseUsCard {
  _id: string;
  _type: "whyChooseUsCard";
  heading: string;
  body: string;
  image: {
    _type: "image";
    asset: {
      _ref: string;
      _type: "reference";
    };
  };
  order: number;
}

// app/sanity/lib/types.ts (add this to your existing types)

export interface SanityComparisonRow {
  _id: string;
  order: number;
  feature: string;
  rooz: string;
  otherBrands: string;
}

// app/sanity/lib/types.ts (add to existing file)

export interface SanityEvent {
  _id: string;
  order: number;
  eventName: string;
  venue: string;
  date: string;
}

// app/sanity/lib/types.ts
export interface SanityActionCard {
  _id: string;
  order: number;
  imageUrl: string;
  imageAlt: string;
  title: string;
  description: string;
  buttonText: string;
  actionType: "request" | "events";
}

// app/sanity/lib/types.ts
export interface SanityBookDemoSection {
  _id: string;
  heading: string;
  description: string;
  buttonText: string;
}

// app/sanity/lib/types.ts
export interface SanityFooterContent {
  _id: string;
  ctaHeading: string;
  ctaDescription: string;
  ctaButtonText: string;
  tagline: string;
  email: string;
  addressLine1: string;
  addressLine2: string;
  phone: string;
  phoneLink: string;
  instagramUrl: string;
  linkedinUrl: string;
}

// app/sanity/lib/types.ts
export interface SanityVideoScrollContent {
  _id: string;
  heroLabel: string;
  heroHeading: string;
  videoHeading: string;
}
