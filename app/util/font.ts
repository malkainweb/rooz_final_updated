import localFont from "next/font/local";
import { Roboto } from "next/font/google";

export const NeueMontreal = localFont({
  src: [
    {
      path: "../fonts/NeueMonteral/NeueMontreal-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../fonts/NeueMonteral/NeueMontreal-LightItalic.otf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../fonts/NeueMonteral/NeueMontreal-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/NeueMonteral/NeueMontreal-Italic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../fonts/NeueMonteral/NeueMontreal-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/NeueMonteral/NeueMontreal-MediumItalic.otf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../fonts/NeueMonteral/NeueMontreal-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/NeueMonteral/NeueMontreal-BoldItalic.otf",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-neue-montreal",
});
