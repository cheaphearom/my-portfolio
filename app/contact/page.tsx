import type { Metadata } from "next";
import SiteNav from "../components/SiteNav";
import SiteFooter from "../components/SiteFooter";
import ContactSection from "../components/ContactSection";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <>
      <div className="bg-ink">
        <SiteNav onDark />
      </div>

      <main className="flex flex-1 flex-col">
        <ContactSection fill asPageTitle />
      </main>

      <SiteFooter />
    </>
  );
}
