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
