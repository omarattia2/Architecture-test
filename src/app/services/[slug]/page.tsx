import { notFound } from "next/navigation";
import { services } from "@/data/services";
import ServiceGallery from "@/components/ServiceGallery";
import DetailsSection from "@/components/DetailsSection";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<{
  title: string;
  description: string;
}> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    return {
      title: "Service Not Found | Archidex",
      description: "The requested service could not be found.",
    };
  }

  return {
    title: `${service.title} | Archidex`,
    description: service.excerpt,
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Section - Title + Intro */}
      <section className="bg-white border-b border-gray-200 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {service.title}
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
              {service.excerpt}
            </p>
          </div>
        </div>
      </section>

      {/* Main Section - Gallery + Details */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Gallery - Left side on desktop, first on mobile */}
            <div className="order-1 lg:order-1">
              <ServiceGallery
                images={service.galleryImages}
                title={service.title}
              />
            </div>

            {/* Details - Right side on desktop, second on mobile */}
            <div className="order-2 lg:order-2">
              <DetailsSection service={service} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

