import {
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaTelegramPlane,
} from "react-icons/fa";

// TODO: replace these placeholder URLs with your real profiles.
const contacts = [
  {
    name: "Telegram",
    href: "https://t.me/your-telegram",
    Icon: FaTelegramPlane,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/your-linkedin",
    Icon: FaLinkedinIn,
  },
  {
    name: "Facebook",
    href: "https://facebook.com/your-profile",
    Icon: FaFacebookF,
  },
  {
    name: "Instagram",
    href: "https://instagram.com/your-instagram",
    Icon: FaInstagram,
  },
];

export default function ContactSection({
  id,
  fill = false,
  asPageTitle = false,
}: {
  id?: string;
  fill?: boolean;
  asPageTitle?: boolean;
}) {
  const Heading = asPageTitle ? "h1" : "h2";

  return (
    <section
      id={id}
      className={`bg-ink text-cream ${fill ? "flex-1" : ""}`}
    >
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-24 md:grid-cols-12">
        <div className="md:col-span-6">
          <Heading className="text-balance text-4xl font-bold tracking-tight md:text-5xl">
            Let’s build something useful.
          </Heading>
          <p className="mt-5 max-w-md text-lg text-cream/75">
            Message me on any of these platforms.
          </p>
        </div>

        <ul className="md:col-span-5 md:col-start-8">
          {contacts.map(({ name, href, Icon }) => (
            <li key={name} className="border-t border-cream/30 last:border-b">
              <a
                href={href}
                target="_blank"
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
      </div>
    </section>
  );
}
