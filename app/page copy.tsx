import Link from "next/link";
import { Phone } from "lucide-react";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaTelegramPlane,
} from "react-icons/fa";

const projects = [
  {
    title: "BROWN App API",
    desc: "Mobile app backend API, order flow, payment, loyalty and integration.",
    tech: "PHP, MySQL, Business Central",
  },
  {
    title: "School Management System",
    desc: "Manage students, teachers, classrooms, subjects and attendance.",
    tech: "Spring Boot, React, MySQL",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f7f3ec] text-[#2b2118]">
      <nav className="fixed top-0 left-0 w-full bg-[#f7f3ec]/80 backdrop-blur border-b border-[#ddd2c4]">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between">
          <h1 className="font-bold text-xl">BRN.DEV</h1>

          <div className="flex gap-6 text-sm font-medium">
            <Link href="/about">About</Link>
            <Link href="/work">Work</Link>
            <Link href="#contact" className="flex items-center gap-1">
              <Phone size={16} />
              Contact
            </Link>
          </div>
        </div>
      </nav>

      <section className="min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="max-w-6xl w-full grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="uppercase tracking-[0.3em] text-sm mb-4">
              Backend Developer
            </p>

            <h2 className="text-5xl md:text-7xl font-bold leading-tight">
              Hi, I’m <br />
              <span className="text-[#8b5e34]">Brn</span>
            </h2>

            <p className="mt-6 text-lg text-[#6b5a4a] max-w-lg">
              I build backend systems, APIs, mobile app integrations, POS
              systems, and web applications.
            </p>

            <div className="mt-8 flex gap-4">
              <Link
                href="/work"
                className="px-6 py-3 bg-[#2b2118] text-white rounded-full"
              >
                View Work
              </Link>

              <Link
                href="#contact"
                className="px-6 py-3 border border-[#2b2118] rounded-full flex items-center gap-2"
              >
                <Phone size={18} />
                Contact Me
              </Link>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="w-72 h-72 md:w-96 md:h-96 rounded-full bg-[#d8b98f] flex items-center justify-center shadow-2xl">
              <div className="w-60 h-60 md:w-80 md:h-80 rounded-full bg-[#2b2118] text-white flex items-center justify-center text-6xl font-bold">
                BRN
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-24 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <p className="uppercase tracking-[0.3em] text-sm mb-4">Contact</p>

          <h3 className="text-4xl font-bold mb-6">
            Let’s build something useful.
          </h3>

          <p className="text-[#6b5a4a] mb-8">
            You can contact me through these platforms.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://facebook.com/your-profile"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-[#2b2118] text-white rounded-full flex items-center gap-2"
            >
              <FaFacebookF  size={18} />
              Facebook
            </a>

            <a
              href="https://t.me/your-telegram"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-[#2b2118] text-white rounded-full flex items-center gap-2"
            >
              <FaTelegramPlane size={18} />
              Telegram
            </a>

            <a
              href="https://linkedin.com/in/your-linkedin"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-[#2b2118] text-white rounded-full flex items-center gap-2"
            >
              <FaLinkedinIn  size={18} />
              LinkedIn
            </a>

            <a
              href="https://instagram.com/your-instagram"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-[#2b2118] text-white rounded-full flex items-center gap-2"
            >
              <FaInstagram  size={18} />
              Instagram
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}