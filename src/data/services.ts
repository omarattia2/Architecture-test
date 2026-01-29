export interface Service {
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  galleryImages: string[];
  details: {
    description: string;
    features: string[];
    duration?: string;
    priceRange?: string;
  };
}

export const services: Service[] = [
  {
    slug: "architectural-design",
    title: "Architectural Design",
    excerpt:
      "Custom architectural solutions that blend innovation with functionality, creating spaces that inspire and endure.",
    coverImage:
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=1200&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
    ],
    details: {
      description:
        "Our architectural design services encompass everything from initial concept development to detailed construction drawings. We work closely with clients to understand their vision and translate it into innovative, sustainable, and functional designs.",
      features: [
        "Concept development and design",
        "3D visualization and renderings",
        "Sustainable design solutions",
        "Building code compliance",
        "Construction documentation",
      ],
      duration: "4-12 weeks",
      priceRange: "€5,000 - €50,000+",
    },
  },
  {
    slug: "interior-design",
    title: "Interior Design",
    excerpt:
      "Transform your interior spaces with thoughtful design that reflects your personality and enhances your lifestyle.",
    coverImage:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1200&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
    ],
    details: {
      description:
        "Our interior design services create harmonious, functional, and beautiful living spaces. We combine aesthetic excellence with practical solutions to design interiors that truly feel like home.",
      features: [
        "Space planning and layout",
        "Color and material selection",
        "Furniture and fixture sourcing",
        "Lighting design",
        "Project management",
      ],
      duration: "2-8 weeks",
      priceRange: "€3,000 - €30,000+",
    },
  },
  {
    slug: "construction-management",
    title: "Construction Management",
    excerpt:
      "End-to-end construction management ensuring quality, timeliness, and budget adherence throughout your project.",
    coverImage:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop",
    ],
    details: {
      description:
        "Comprehensive construction management services that oversee every aspect of your project from planning to completion. We coordinate contractors, manage timelines, and ensure quality standards are met.",
      features: [
        "Project planning and scheduling",
        "Contractor coordination",
        "Quality control and inspections",
        "Budget management",
        "Timeline oversight",
      ],
      duration: "Project dependent",
      priceRange: "€10,000 - €100,000+",
    },
  },
  {
    slug: "renovation-remodeling",
    title: "Renovation & Remodeling",
    excerpt:
      "Breathe new life into existing spaces with our comprehensive renovation and remodeling services.",
    coverImage:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1200&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
    ],
    details: {
      description:
        "Transform your existing property with our renovation and remodeling expertise. We preserve the character of your space while modernizing functionality and aesthetics.",
      features: [
        "Structural assessments",
        "Design and planning",
        "Permit acquisition",
        "Material selection",
        "Complete project execution",
      ],
      duration: "4-16 weeks",
      priceRange: "€8,000 - €80,000+",
    },
  },
  {
    slug: "landscape-architecture",
    title: "Landscape Architecture",
    excerpt:
      "Create stunning outdoor environments that seamlessly connect with your architectural vision.",
    coverImage:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop",
    ],
    details: {
      description:
        "Our landscape architecture services create beautiful, sustainable outdoor spaces that enhance your property's value and your quality of life.",
      features: [
        "Site analysis and planning",
        "Hardscape and softscape design",
        "Irrigation systems",
        "Sustainable landscaping",
        "Maintenance planning",
      ],
      duration: "3-10 weeks",
      priceRange: "€4,000 - €40,000+",
    },
  },
  {
    slug: "consulting-advisory",
    title: "Consulting & Advisory",
    excerpt:
      "Expert guidance for your architectural and construction projects from concept to completion.",
    coverImage:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1200&auto=format&fit=crop",
    ],
    details: {
      description:
        "Professional consulting services to guide you through complex architectural and construction decisions. We provide expert advice to ensure your project's success.",
      features: [
        "Project feasibility studies",
        "Code compliance review",
        "Material and system recommendations",
        "Cost estimation",
        "Technical problem-solving",
      ],
      duration: "1-4 weeks",
      priceRange: "€1,500 - €15,000+",
    },
  },
];

