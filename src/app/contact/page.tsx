"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

const workingHours = [
  { day: "Maandag", hours: "09:00 - 18:00" },
  { day: "Dinsdag", hours: "09:00 - 18:00" },
  { day: "Woensdag", hours: "09:00 - 18:00" },
  { day: "Donderdag", hours: "09:00 - 18:00" },
  { day: "Vrijdag", hours: "09:00 - 18:00" },
  { day: "Zaterdag", hours: "10:00 - 16:00" },
  { day: "Zondag", hours: "Gesloten" },
];

const contactInfo = {
  phone: "+31 20 123 4567",
  email: "info@archidex.nl",
  address: "Keizersgracht 123, 1015 CJ Amsterdam, Nederland",
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2436.4769617833727!2d4.9041399!3d52.3675734!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c609c73c0d4e99%3A0x7838f6dd3f3b3b3b!2sKeizersgracht%2C%20Amsterdam!5e0!3m2!1sen!2snl!4v1234567890123!5m2!1sen!2snl",
};

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

function AnimatedSection({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial="initial"
      animate={isInView ? "animate" : "initial"}
      variants={staggerContainer}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function AnimatedItem({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      variants={{
        initial: { opacity: 0, y: 30 },
        animate: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: "easeOut", delay },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gray-50 border-b border-gray-200 py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <AnimatedItem>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                Neem contact op
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl leading-relaxed">
                We staan klaar om uw volgende project te bespreken. Neem contact
                met ons op via telefoon, e-mail of bezoek ons kantoor.
              </p>
            </AnimatedItem>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left Column - Contact Methods */}
            <AnimatedSection>
              <AnimatedItem>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">
                  Contactgegevens
                </h2>
              </AnimatedItem>

              {/* Phone Button */}
              <AnimatedItem delay={0.1}>
                <Link
                  href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
                  className="flex items-center p-6 bg-white border-2 border-gray-200 rounded-lg hover:border-gray-900 transition-all duration-300 group mb-4"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center mr-4 group-hover:bg-gray-800 transition-colors">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-500 mb-1">Telefoon</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {contactInfo.phone}
                    </p>
                  </div>
                  <svg
                    className="w-5 h-5 text-gray-400 group-hover:text-gray-900 group-hover:translate-x-1 transition-all"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </AnimatedItem>

              {/* Email Button */}
              <AnimatedItem delay={0.2}>
                <Link
                  href={`mailto:${contactInfo.email}`}
                  className="flex items-center p-6 bg-white border-2 border-gray-200 rounded-lg hover:border-gray-900 transition-all duration-300 group mb-8"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center mr-4 group-hover:bg-gray-800 transition-colors">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-500 mb-1">E-mail</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {contactInfo.email}
                    </p>
                  </div>
                  <svg
                    className="w-5 h-5 text-gray-400 group-hover:text-gray-900 group-hover:translate-x-1 transition-all"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </AnimatedItem>

              {/* Address */}
              <AnimatedItem delay={0.3}>
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Adres
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {contactInfo.address}
                  </p>
                </div>
              </AnimatedItem>

              {/* Working Hours */}
              <AnimatedItem delay={0.4}>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Openingstijden
                  </h3>
                  <div className="space-y-2">
                    {workingHours.map((schedule, index) => (
                      <motion.div
                        key={schedule.day}
                        initial="initial"
                        animate="animate"
                        variants={{
                          initial: { opacity: 0, x: -20 },
                          animate: {
                            opacity: 1,
                            x: 0,
                            transition: {
                              duration: 0.4,
                              delay: 0.5 + index * 0.05,
                            },
                          },
                        }}
                        className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0"
                      >
                        <span className="text-gray-700">{schedule.day}</span>
                        <span
                          className={`font-medium ${
                            schedule.hours === "Gesloten"
                              ? "text-gray-400"
                              : "text-gray-900"
                          }`}
                        >
                          {schedule.hours}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </AnimatedItem>
            </AnimatedSection>

            {/* Right Column - Map */}
            <AnimatedSection>
              <AnimatedItem delay={0.2}>
                <div className="sticky top-24">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
                    Locatie
                  </h2>
                  <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
                    <iframe
                      src={contactInfo.mapEmbedUrl}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="absolute inset-0"
                      title="Archidex Office Location"
                    />
                  </div>
                </div>
              </AnimatedItem>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
}

