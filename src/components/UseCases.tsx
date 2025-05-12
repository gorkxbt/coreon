'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const useCases = [
  {
    industry: 'Healthcare',
    title: 'Patient Journey Automation',
    description: 'Orchestrate patient intake, clinical triage, and compliance documentation with full HIPAA compliance.',
    image: '/images/healthcare.jpg',
    color: 'from-blue-500/20 to-blue-600/20',
  },
  {
    industry: 'Finance',
    title: 'Fraud Detection & Compliance',
    description: 'Multi-agent systems for fraud detection, audit trail generation, and regulatory report creation.',
    image: '/images/finance.jpg',
    color: 'from-green-500/20 to-green-600/20',
  },
  {
    industry: 'Insurance',
    title: 'Claim Processing Network',
    description: 'Accelerate claims processing with specialized agents for policy validation, assessment, and payout.',
    image: '/images/insurance.jpg',
    color: 'from-yellow-500/20 to-yellow-600/20',
  },
  {
    industry: 'Public Sector',
    title: 'Document Automation',
    description: 'Streamline document processing, eligibility verification, and secure decision support systems.',
    image: '/images/public-sector.jpg',
    color: 'from-purple-500/20 to-purple-600/20',
  },
];

export default function UseCases() {
  return (
    <section id="use-cases" className="section relative bg-coreon-navy pb-28">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="mb-4">
            Designed for <span className="gradient-text">Regulated Industries</span>
          </h2>
          <p className="text-lg">
            Coreon delivers AI orchestration where reliability, transparency, and compliance are mission-critical.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
          {useCases.map((useCase, index) => (
            <UseCase key={useCase.industry} useCase={useCase} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function UseCase({ useCase, index }: { useCase: typeof useCases[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px 0px" });

  return (
    <motion.div
      ref={ref}
      className="relative p-1 rounded-xl overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Glowing border effect */}
      <div className={`absolute inset-0 bg-gradient-to-r ${useCase.color} rounded-xl blur-sm`}></div>
      
      <div className="relative bg-coreon-navy-dark p-6 rounded-xl border border-coreon-blue/20 h-full">
        <div className="flex flex-col h-full">
          <div className="mb-4">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-coreon-blue/10 text-coreon-blue">
              {useCase.industry}
            </span>
          </div>
          
          <h3 className="text-xl font-bold mb-3">{useCase.title}</h3>
          <p className="text-coreon-gray-light/80 mb-4">{useCase.description}</p>
          
          <div className="mt-auto">
            <motion.button
              className="text-coreon-blue flex items-center text-sm font-medium"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              Learn more
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
} 