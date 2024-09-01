'use client'
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";

const musicSchoolTestimonials = [
  {
    quote:
      'Understanding compliance has been a game-changer for my career. The courses provided clear, actionable insights that have elevated my approach to regulatory challenges.',
    name: 'Symbiosis Cafe',
    title: 'Compliance Officer',
  },
  {
    quote:
      'The depth and clarity of the compliance training were impressive. I now feel more confident in navigating the complexities of regulatory environments.',
    name: 'Symbiosis',
    title: 'Risk Management Specialist',
  },
  {
    quote:
      'These compliance programs helped me build a robust framework for our organization, ensuring we stay ahead of regulatory changes. Truly invaluable!',
    name: 'SymbiMAN',
    title: 'Regulatory Compliance Manager',
  },
  {
    quote:
      'The practical examples and case studies provided during the training were incredibly insightful. I’ve been able to apply what I learned directly to my work.',
    name: 'Symbiosis Culturals',
    title: 'Compliance Analyst',
  },
  {
    quote:
      'From start to finish, the focus on real-world applications made this compliance course stand out. It’s a must for anyone serious about compliance management.',
    name: 'SIU Member',
    title: 'Internal Auditor',
  },
  {
    quote:
      'The expertise and guidance offered by the instructors were top-notch. The knowledge I gained here has made a significant impact on how I handle compliance issues.',
    name: 'SLS Nagpur',
    title: 'Legal Compliance Specialist',
  },
  ];
  

function MusicSchoolTestimonials() {
  return (
    <div className="h-[40rem] w-full dark:bg-black dark:bg-grid-white/[0.2] relative flex flex-col items-center justify-center overflow-hidden">
        <h2 className="text-3xl font-bold text-center mb-8 z-10">Hear about us </h2>
        <div className="flex justify-center w-full overflow-hidden px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-6xl">
            <InfiniteMovingCards
                items={musicSchoolTestimonials}
                direction="right"
                speed="slow"
      />
            </div>
        </div>
    </div>
  )
}

export default MusicSchoolTestimonials