import type { Metadata } from "next";
import SiteNav from "../components/SiteNav";
import SiteFooter from "../components/SiteFooter";
import ContactSection from "../components/ContactSection";
import { getProfile } from "../lib/content";

export const metadata: Metadata = { title: "Contact" };

export const revalidate = 60;

export default async function ContactPage() {
  const profile = await getProfile();

  return (
    <>
      <div className="bg-ink">
        <SiteNav onDark />
      </div>

      <main className="flex flex-1 flex-col">
        <ContactSection profile={profile} fill asPageTitle withForm />
      </main>

      <SiteFooter />
    </>
  );
}
