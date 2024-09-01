'use client'
import Link from "next/link"
import { HoverEffect } from "./ui/card-hover-effect";

function UpcomingWebinars() {

  const featuredWebinars = [
    {
      title: 'Understanding Compliance Frameworks',
      description: 'Explore the core principles of compliance frameworks and build a solid foundation for regulatory adherence.',
      slug: 'understanding-compliance-frameworks',
      isFeatured: true,
    },
    {
      title: 'The Art of Regulatory Compliance',
      description: 'Master the nuances of regulatory compliance with insights from industry experts.',
      slug: 'the-art-of-regulatory-compliance',
      isFeatured: true,
    },
    {
      title: 'Advanced Compliance Management',
      description: 'Gain expertise in advanced compliance management techniques for your organization.',
      slug: 'advanced-compliance-management',
      isFeatured: true,
    },
    {
      title: 'Compliance Risk Mitigation Strategies',
      description: 'Learn effective strategies for mitigating risks and maintaining compliance across all levels.',
      slug: 'compliance-risk-mitigation-strategies',
      isFeatured: true,
    },
    // Added two more webinars
    {
      title: 'Navigating Regulatory Changes',
      description: 'Stay ahead of regulatory changes with strategies for adaptive compliance management.',
      slug: 'navigating-regulatory-changes',
      isFeatured: true,
    },
    {
      title: 'Digital Compliance Solutions',
      description: 'Discover how to leverage digital tools to enhance your compliance programs.',
      slug: 'digital-compliance-solutions',
      isFeatured: true,
    },
    ];
    

  return (
    <div className="p-12 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center">
          <h2 className="text-base text-teal-600 font-semibold tracking-wide uppercase">FEATURED </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">Enhance Your Compliances Journey</p>
        </div>

        <div className="mt-10">
          <HoverEffect
          items={featuredWebinars.map(webinar => (
            {
              title: webinar.title,
              description: webinar.description,
              link: '/'
            }
          ))}
          />
        </div>

        <div className="mt-10 text-center">
          <Link href={"/"}
          className="px-4 py-2 rounded border border-neutral-600 text-neutral-700 bg-white hover:bg-gray-100 transition duration-200"
          >
            View All webinars
          </Link>
        </div>
      </div>
    </div>
  )
}

export default UpcomingWebinars