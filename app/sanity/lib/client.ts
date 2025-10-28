import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "yn41x60i",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: true, // Set to false if you want fresh data
});
