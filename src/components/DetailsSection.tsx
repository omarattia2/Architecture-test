"use client";

import Link from "next/link";
import { Service } from "@/data/services";

interface DetailsSectionProps {
  service: Service;
}

export default function DetailsSection({ service }: DetailsSectionProps) {
  const { title, excerpt, details } = service;

  return (
    <div className="w-full lg:sticky lg:top-24 lg:self-start">
      <div className="bg-white rounded-lg p-6 sm:p-8 lg:p-10 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {title}
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">{excerpt}</p>
        </div>

        {/* Description */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            Overzicht
          </h2>
          <p className="text-gray-700 leading-relaxed">{details.description}</p>
        </div>

        {/* Features */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Wat wij bieden
          </h2>
          <ul className="space-y-3">
            {details.features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <svg
                  className="w-5 h-5 text-gray-900 mr-3 mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Additional Info */}
        {(details.duration || details.priceRange) && (
          <div className="pt-6 border-t border-gray-200 space-y-4">
            {details.duration && (
              <div>
                <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                  Duur
                </span>
                <p className="text-lg text-gray-900 mt-1">{details.duration}</p>
              </div>
            )}
            {details.priceRange && (
              <div>
                <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                  Prijsklasse
                </span>
                <p className="text-lg text-gray-900 mt-1">
                  {details.priceRange}
                </p>
              </div>
            )}
          </div>
        )}

        {/* CTA Button */}
        <div className="pt-6">
          <Link
            href="/offerte"
            className="block w-full text-center px-8 py-4 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors duration-300 text-base sm:text-lg"
          >
            Offerte aanvragen
          </Link>
        </div>
      </div>
    </div>
  );
}

