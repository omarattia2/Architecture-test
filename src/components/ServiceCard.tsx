"use client";

import Image from "next/image";
import Link from "next/link";
import { Service } from "@/data/services";
import { cn } from "@/lib/cn";

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group block h-full"
      aria-label={`View ${service.title} service`}
    >
      <article className="h-full flex flex-col bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2">
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
          <Image
            src={service.coverImage}
            alt={service.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-6 sm:p-8">
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors">
            <span className="relative inline-block">
              {service.title}
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gray-900 group-hover:w-full transition-all duration-500" />
            </span>
          </h3>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed flex-1 mb-4">
            {service.excerpt}
          </p>
          <div className="flex items-center text-sm font-medium text-gray-900 group-hover:text-gray-700 transition-colors">
            <span>Learn more</span>
            <svg
              className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </article>
    </Link>
  );
}

