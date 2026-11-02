import Link from "next/link";
import type { IconType } from "react-icons";
import {
  FaEnvelope,
  FaFacebookF,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaTelegramPlane,
} from "react-icons/fa";
import type { ProfileView } from "../lib/content";
import ContactForm from "./ContactForm";

type ContactLink = { name: string; href: string; Icon: IconType };

function buildLinks(profile: ProfileView): ContactLink[] {
  const candidates: (ContactLink | null)[] = [
    profile.email
      ? { name: profile.email, href: `mailto:${profile.email}`, Icon: FaEnvelope }
      : null,
    profile.github ? { name: "GitHub", href: profile.github, Icon: FaGithub } : null,
    profile.linkedin ? { name: "LinkedIn", href: profile.linkedin, Icon: FaLinkedinIn } : null,
    profile.telegram ? { name: "Telegram", href: profile.telegram, Icon: FaTelegramPlane } : null,
    profile.facebook ? { name: "Facebook", href: profile.facebook, Icon: FaFacebookF } : null,
    profile.instagram ? { name: "Instagram", href: profile.instagram, Icon: FaInstagram } : null,
  ];

  return candidates.filter((link): link is ContactLink => link !== null);
}

export default function ContactSection({
  profile,
  id,
  fill = false,
  asPageTitle = false,
  withForm = false,
}: {
  profile: ProfileView;
  id?: string;
  fill?: boolean;
  asPageTitle?: boolean;
  withForm?: boolean;
}) {
  const Heading = asPageTitle ? "h1" : "h2";
  const contacts = buildLinks(profile);

  return (
    <section
      id={id}
      className={`scroll-mt-28 px-4 py-12 ${fill ? "flex flex-1 items-center" : ""}`}
    >
      <div className="glass-dark mx-auto grid w-full max-w-6xl gap-12 rounded-[2rem] px-6 py-14 md:grid-cols-12 md:px-12 md:py-20">
        <div className="md:col-span-6">
          <Heading className="text-balance text-4xl font-bold tracking-tight md:text-5xl">
            Let’s build something useful.
          </Heading>
          <p className="mt-5 max-w-md text-lg text-cream/90">
            {withForm
              ? "Send a message, or reach me on any of these platforms."
              : "Message me on any of these platforms."}
          </p>

          {!withForm ? (
            <Link
              href="/contact"
              className="mt-6 inline-block font-semibold underline underline-offset-4"
            >
              Or send a message here
            </Link>
          ) : null}
        </div>

        <div className="space-y-10 md:col-span-5 md:col-start-8">
          {contacts.length > 0 ? (
            <ul>
              {contacts.map(({ name, href, Icon }) => (
                <li key={name} className="border-t border-cream/30 last:border-b">
                  <a
                    href={href}
                    target={href.startsWith("mailto:") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 py-5 text-xl font-medium"
                  >
                    <Icon size={20} aria-hidden="true" />
                    <span className="underline-offset-4 group-hover:underline">
                      {name}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          ) : null}

          {withForm ? <ContactForm /> : null}
        </div>
      </div>
    </section>
  );
}
