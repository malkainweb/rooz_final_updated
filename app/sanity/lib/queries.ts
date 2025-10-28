import { client } from "./client";
import {
  SanityTestimonial,
  SanitySiteHeaders,
  SanityStatCard,
  SanityHowItWorksStep,
  SanityWhyChooseUsCard,
} from "./types";

// Fetch all testimonials
export async function getTestimonials(): Promise<SanityTestimonial[]> {
  const query = `*[_type == "testimonial"] | order(order asc) {
    _id,
    _type,
    text,
    author,
    role,
    avatar,
    order
  }`;

  return await client.fetch(query);
}

// Fetch site headers
// Fetch site headers
// Fetch site headers
export async function getSiteHeaders(): Promise<SanitySiteHeaders | undefined> {
  const query = `*[_type == "siteHeaders"][0] {
      _id,
      _type,
      heroTitle,
      heroSubtitle,
      whyChooseUsHeader,
      lockDistractionsHeader,
      lockDistractionsSubheader,
      statsHeader,
      howItWorksHeader,
      howItWorksSubheader,
      howItWorksDescription,
      testimonialsVideoHeader,
      testimonialsHeader,
      footerCtaHeader,
      footerTagline
    }`;

  const result = await client.fetch(query);
  return result || undefined; // Convert null to undefined
}

// Fetch stat cards
export async function getStatCards(): Promise<SanityStatCard[]> {
  const query = `*[_type == "statCard"] | order(order asc) {
    _id,
    _type,
    icon,
    mainStat,
    title,
    subStat,
    subText,
    bgColor,
    order
  }`;

  return await client.fetch(query);
}

// Add this function at the bottom
export async function getHowItWorksSteps(): Promise<SanityHowItWorksStep[]> {
  const query = `*[_type == "howItWorksStep"] | order(number asc) {
      _id,
      _type,
      number,
      title,
      description,
      image,
      order
    }`;

  return await client.fetch(query);
}

// Fetch why choose us cards
export async function getWhyChooseUsCards(): Promise<SanityWhyChooseUsCard[]> {
  const query = `*[_type == "whyChooseUsCard"] | order(order asc) {
      _id,
      _type,
      heading,
      body,
      image,
      order
    }`;

  return await client.fetch(query);
}
