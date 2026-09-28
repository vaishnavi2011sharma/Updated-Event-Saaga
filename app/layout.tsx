import type { Metadata } from "next";
import "./globals.css";
import { LocationProvider } from "@/components/location/LocationProvider";
import LocationPopup from "@/components/location/LocationPopup";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import AuthProvider from "@/components/shared/AuthProvider";
import FloatingWhatsApp from "@/components/shared/FloatingWhatsApp";

export const metadata: Metadata = {
  title: {
    default: "EventSaaga — Location-Based Event Decoration & Booking Platform",
    template: "%s | EventSaaga",
  },
  description:
    "EventSaaga connects you with premium event decoration, entertainment, and party services across 20+ Indian cities — birthdays, weddings, baby showers, corporate events & more. Book in minutes.",
  metadataBase: new URL("https://eventsaaga.com"),
  openGraph: {
    title: "EventSaaga — Premium Event Decoration & Booking Platform",
    description:
      "Book premium event decoration, entertainment, and party services across 20+ Indian cities.",
    url: "https://eventsaaga.com",
    siteName: "EventSaaga",
    locale: "en_IN",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800&family=DM+Sans:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <AuthProvider>
          <LocationProvider>
            <Header />
            {children}
            <Footer />
            <LocationPopup />
            <FloatingWhatsApp />
          </LocationProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
