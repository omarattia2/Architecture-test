import Image from "next/image";
import { services } from "@/data/services";
import ServiceCard from "@/components/ServiceCard";

export const metadata = {
  title: "Services | Archidex",
  description:
    "Explore our comprehensive range of architectural and construction services. From design to execution, we deliver excellence.",
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Header */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden bg-gray-900">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2070&auto=format&fit=crop"
            alt="Architecture services"
            fill
            priority
            className="object-cover opacity-40"
            quality={90}
          />
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50 z-10" />

        {/* Content */}
        <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Our Services
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
            Comprehensive architectural and construction solutions tailored to
            your vision and needs.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

