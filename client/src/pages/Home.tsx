import { useState } from "react";
import AmenitiesSection from "@/components/landing/AmenitiesSection";
import ContactSection from "@/components/landing/ContactSection";
import ExitIntentPopup from "@/components/landing/ExitIntentPopup";
import FloatingCTA from "@/components/landing/FloatingCTA";
import Footer from "@/components/landing/Footer";
import GallerySection from "@/components/landing/GallerySection";
import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import LeadFormDialog from "@/components/landing/LeadFormDialog";
import LocationSection from "@/components/landing/LocationSection";
import OverviewSection from "@/components/landing/OverviewSection";
import PromotionsSection from "@/components/landing/PromotionsSection";
import FloorplanSection from "@/components/landing/FloorplanSection";
import VR360Section from "@/components/landing/VR360Section";

export default function Home() {
  const [formOpen, setFormOpen] = useState(false);
  const openForm = () => setFormOpen(true);

  return (
    <div className="min-h-screen bg-cream text-navy-900 overflow-x-hidden">
      <Header />

      <main>
        <Hero onOpenForm={openForm} />
        <OverviewSection />
        <LocationSection />
        <AmenitiesSection />
        <PromotionsSection onOpenForm={openForm} />
        <VR360Section />
        <GallerySection />
        <FloorplanSection />
        <ContactSection />
      </main>

      <Footer />
      <FloatingCTA onOpenForm={openForm} />
      <LeadFormDialog
        open={formOpen}
        onClose={() => setFormOpen(false)}
        source="cta-popup"
      />
      <ExitIntentPopup />
    </div>
  );
}
