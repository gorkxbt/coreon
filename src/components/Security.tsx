'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const securityFeatures = [
  {
    title: 'End-to-end encryption',
    description: 'Data is encrypted both in transit and at rest using industry-standard protocols.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
  },
  {
    title: 'Role-based access control',
    description: 'Granular permissions and access levels for different user roles and responsibilities.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    title: 'Immutable audit logging',
    description: 'Comprehensive, tamper-proof records of all system actions and user activities.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    ),
  },
  {
    title: 'Data residency enforcement',
    description: 'Keep sensitive data within specific geographic regions to meet regulatory requirements.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

const complianceFrameworks = ['HIPAA', 'GDPR', 'SOC 2', 'ISO 27001', 'Financial sector policies'];

export default function Security() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });

  return (
    <section id="security" className="section relative bg-coreon-navy">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="mb-4">
            <span className="gradient-text">Security</span> & Compliance
          </h2>
          <p className="text-lg">
            Coreon includes enterprise-grade security measures and native compliance enforcement for regulated industries.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.7 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {securityFeatures.map((feature) => (
              <div key={feature.title} className="bg-coreon-navy-dark p-6 rounded-xl border border-coreon-blue/20">
                <div className="text-coreon-blue mb-3">{feature.icon}</div>
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-sm text-coreon-gray-light/80">{feature.description}</p>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-coreon-blue/20 to-coreon-blue/5 rounded-xl blur-sm"></div>
            <div className="relative bg-coreon-navy-dark p-8 rounded-xl border border-coreon-blue/20">
              <h3 className="text-2xl font-bold mb-6">Supported Compliance Frameworks</h3>
              
              <div className="space-y-4">
                {complianceFrameworks.map((framework) => (
                  <div key={framework} className="flex items-center">
                    <div className="w-5 h-5 rounded-full bg-coreon-blue/20 flex items-center justify-center mr-4">
                      <svg className="w-3 h-3 text-coreon-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-lg">{framework}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 p-4 bg-coreon-blue/10 rounded-lg">
                <p className="text-sm text-coreon-gray-light/90">
                  All compliance frameworks are customizable to specific regional and industry requirements. Our implementation specialists work with your team to ensure full regulatory alignment.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 