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

export async function getComparisonRows() {
  return client.fetch(
    `*[_type == "comparisonRow"] | order(order asc) {
      _id,
      order,
      feature,
      rooz,
      otherBrands
    }`
  );
}

// app/sanity/lib/queries.ts (add to existing file)

export async function getEvents() {
  return client.fetch(
    `*[_type == "event"] | order(order asc) {
      _id,
      order,
      eventName,
      venue,
      date
    }`
  );
}

// app/sanity/lib/queries.ts
export async function getActionCards() {
  return client.fetch(
    `*[_type == "actionCard"] | order(order asc) {
      _id,
      order,
      "imageUrl": image.asset->url,
      imageAlt,
      title,
      description,
      buttonText,
      actionType
    }`
  );
}

// app/sanity/lib/queries.ts
export async function getBookDemoSection() {
  return client.fetch(
    `*[_type == "bookDemoSection"][0] {
      _id,
      heading,
      description,
      buttonText
    }`
  );
}

// app/sanity/lib/queries.ts
export async function getFooterContent() {
  return client.fetch(
    `*[_type == "footerContent"][0] {
      _id,
      ctaHeading,
      ctaDescription,
      ctaButtonText,
      tagline,
      email,
      addressLine1,
      addressLine2,
      phone,
      phoneLink,
      instagramUrl,
      linkedinUrl
    }`
  );
}

// app/sanity/lib/queries.ts
export async function getVideoScrollContent() {
  return client.fetch(
    `*[_type == "videoScrollContent"][0] {
      _id,
      heroLabel,
      heroHeading,
      videoHeading
    }`
  );
}
