"use client";
import React from "react";
import { StickyScroll } from "./ui/sticky-scroll-reveal";
const musicSchoolContent = [
    {
      title: 'Get your compliances checklisted & verified, give your best',
      description:
        'Navigate the complex landscape of compliance with confidence. Our tailored solutions adapt to your organizations unique challenges, ensuring seamless adherence to regulations. With our expert guidance, your business will achieve compliance excellence, securing a future of integrity and trust.',
    },
    {
      title: 'Remarks & Contingency at your doorstep.',
      description:
        'Anticipate and address potential compliance risks with robust contingency plans, safeguarding your organization from unexpected challenges.',
    },
    {
      title: 'Join us to get your compliances right & good.',
      description:
        'Implement comprehensive risk assessments to identify vulnerabilities and develop proactive strategies that ensure continuous compliance, even in volatile environments.',
    },
    {
      title: 'Query response & Engagement',
      description:
        'Equip your team with adaptive response mechanisms, enabling swift and effective action in the face of compliance breaches or regulatory changes.',
    },
    {
      title: 'Cutting-Edge Responses',
      description:
        'Stay ahead with continuous monitoring and regular reviews, ensuring your compliance framework remains resilient and responsive to evolving standards.',
    },
    {
      title: 'Compliance sheets were a mess, no longer',
      description:
        'Stay ahead with continuous monitoring and regular reviews, ensuring your compliance framework remains resilient and responsive to evolving standards.',
    },
  ];
function WhyChooseUs() {
  return (
    <div>
        <StickyScroll content={musicSchoolContent} />
    </div>
  )
}
export default WhyChooseUs