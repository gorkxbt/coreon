'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function CTA() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-64 h-64 bg-coreon-blue/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-coreon-blue/5 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="relative p-1 rounded-2xl overflow-hidden">
            {/* Animated border */}
            <div className="absolute inset-0 bg-gradient-to-r from-coreon-blue/30 via-coreon-blue/20 to-coreon-blue/30 rounded-2xl"></div>
            
            <div className="relative bg-coreon-navy-dark p-8 md:p-12 rounded-2xl text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Ready to transform your AI operations?
                </h2>
                
                <p className="text-lg text-coreon-gray-light/90 mb-8 max-w-2xl mx-auto">
                  Deploy secure, compliant AI agent networks with human oversight for your critical operations. Get started with Coreon today.
                </p>
                
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Link href="#contact" className="btn-primary">
                    Request Demo
                  </Link>
                  <Link href="#docs" className="btn-secondary">
                    View Documentation
                  </Link>
                </div>
                
                <div className="mt-10 flex flex-col md:flex-row justify-center items-center gap-6 text-sm text-coreon-gray-light/70">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2 text-coreon-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    Enterprise-grade security
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2 text-coreon-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    Regulatory compliance
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2 text-coreon-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Rapid deployment
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 