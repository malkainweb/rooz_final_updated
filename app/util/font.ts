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

export const HelveticaNeue = localFont({
  src: [
    {
      path: "../fonts/helvetica_neue/HelveticaNeueUltraLight.otf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../fonts/helvetica_neue/HelveticaNeueUltraLightItalic.otf",
      weight: "200",
      style: "italic",
    },
    {
      path: "../fonts/helvetica_neue/HelveticaNeueThin.otf",
      weight: "250",
      style: "normal",
    },
    {
      path: "../fonts/helvetica_neue/HelveticaNeueThinItalic.otf",
      weight: "250",
      style: "italic",
    },
    {
      path: "../fonts/helvetica_neue/HelveticaNeueLight.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../fonts/helvetica_neue/HelveticaNeueLightItalic.otf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../fonts/helvetica_neue/HelveticaNeueRoman.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/helvetica_neue/HelveticaNeueItalic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../fonts/helvetica_neue/HelveticaNeueMedium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/helvetica_neue/HelveticaNeueMediumItalic.otf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../fonts/helvetica_neue/HelveticaNeueBold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/helvetica_neue/HelveticaNeueBoldItalic.otf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../fonts/helvetica_neue/HelveticaNeueHeavy.otf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../fonts/helvetica_neue/HelveticaNeueHeavyItalic.otf",
      weight: "800",
      style: "italic",
    },
    {
      path: "../fonts/helvetica_neue/HelveticaNeueBlack.otf",
      weight: "900",
      style: "normal",
    },
    {
      path: "../fonts/helvetica_neue/HelveticaNeueBlackItalic.otf",
      weight: "900",
      style: "italic",
    },
  ],
  variable: "--font-helvetica-neue",
});
