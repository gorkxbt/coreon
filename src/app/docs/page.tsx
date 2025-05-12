'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ParticleBackground from '../../components/ParticleBackground';

// Define the sections for the documentation
const sections = [
  { id: 'introduction', title: 'Introduction' },
  { id: 'architecture', title: 'Platform Architecture' },
  { id: 'agent-mesh', title: 'Agent Mesh Technology' },
  { id: 'hitl', title: 'Human-in-the-Loop Controls' },
  { id: 'security', title: 'Security & Compliance' },
  { id: 'integration', title: 'Enterprise Integration' },
  { id: 'deployment', title: 'Deployment Models' },
  { id: 'use-cases', title: 'Industry Use Cases' },
  { id: 'api', title: 'API Reference' },
];

export default function Documentation() {
  const [activeSection, setActiveSection] = useState('introduction');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    
    // Intersection Observer for section tracking
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };
    
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };
    
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    sections.forEach(section => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });
    
    return () => observer.disconnect();
  }, []);

  return (
    <main className="min-h-screen bg-coreon-navy-dark">
      <div 
        className="fixed inset-0 z-[-1]"
        style={{
          backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(8, 17, 54, 0.8) 0%, rgba(5, 10, 32, 1) 100%)',
          backgroundSize: 'cover',
        }}
      />
      
      <ParticleBackground />
      
      <Header showDemoButton={true} />
      
      <motion.div
        className="pt-32 pb-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar navigation */}
            <div className="lg:w-1/4">
              <div className="sticky top-32 p-6 bg-coreon-navy/50 backdrop-blur-md rounded-xl border border-coreon-blue/20 shadow-lg">
                <h2 className="text-xl font-bold mb-6 gradient-text">Documentation</h2>
                <nav className="space-y-2">
                  {sections.map((section) => (
                    <Link
                      key={section.id}
                      href={`#${section.id}`}
                      className={`block py-2 px-3 rounded-lg transition-colors duration-300 ${
                        activeSection === section.id
                          ? 'bg-coreon-blue/20 text-white'
                          : 'text-coreon-gray-light hover:text-white'
                      }`}
                      onClick={() => setActiveSection(section.id)}
                    >
                      {section.title}
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
            
            {/* Main content */}
            <div className="lg:w-3/4">
              <div className="p-8 bg-coreon-navy/50 backdrop-blur-md rounded-xl border border-coreon-blue/20 shadow-lg">
                <h1 className="text-3xl md:text-4xl font-bold mb-8 gradient-text">
                  Coreon Technical Documentation
                </h1>
                <p className="text-xl text-coreon-gray-light mb-12">
                  Enterprise-grade AI orchestration platform for regulated environments
                </p>
                
                {/* Introduction */}
                <section id="introduction" className="mb-16">
                  <h2 className="text-2xl font-bold mb-6 text-coreon-blue">Introduction</h2>
                  <div className="prose prose-invert max-w-none">
                    <p className="text-lg">
                      Coreon is an enterprise AI orchestration platform that enables organizations to deploy intelligent agent systems with human oversight, complete auditability, and regulatory compliance. Unlike traditional AI solutions, Coreon creates interconnected agent networks that collaborate to solve complex tasks while maintaining governance controls.
                    </p>
                    
                    <div className="my-8 bg-coreon-navy-dark/50 p-6 rounded-lg border border-coreon-blue/20">
                      <h3 className="text-xl font-semibold mb-4">Key Capabilities</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex items-start">
                          <div className="bg-coreon-blue/20 p-2 rounded-lg mr-3">
                            <svg className="w-5 h-5 text-coreon-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium">Multi-Agent Orchestration</h4>
                            <p className="text-sm text-coreon-gray-light">Coordinate specialized AI agents in complex workflows</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="bg-coreon-blue/20 p-2 rounded-lg mr-3">
                            <svg className="w-5 h-5 text-coreon-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium">Enterprise Security</h4>
                            <p className="text-sm text-coreon-gray-light">End-to-end encryption and role-based access controls</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="bg-coreon-blue/20 p-2 rounded-lg mr-3">
                            <svg className="w-5 h-5 text-coreon-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium">Regulatory Compliance</h4>
                            <p className="text-sm text-coreon-gray-light">Built-in controls for HIPAA, GDPR, SOC 2, and more</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="bg-coreon-blue/20 p-2 rounded-lg mr-3">
                            <svg className="w-5 h-5 text-coreon-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium">Human Oversight</h4>
                            <p className="text-sm text-coreon-gray-light">Review interfaces and intervention controls</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <p>
                      Coreon is designed specifically for enterprises in regulated industries where reliability, transparency, and compliance are mission-critical requirements. The platform enables organizations to implement AI systems that maintain human judgment for sensitive decisions while automating routine processes.
                    </p>
                  </div>
                </section>
                
                {/* Platform Architecture */}
                <section id="architecture" className="mb-16">
                  <h2 className="text-2xl font-bold mb-6 text-coreon-blue">Platform Architecture</h2>
                  <div className="prose prose-invert max-w-none">
                    <p className="text-lg">
                      Coreon's architecture consists of four integrated layers that work together to provide secure, compliant AI orchestration with complete visibility and control.
                    </p>
                    
                    <div className="my-8 rounded-lg overflow-hidden border border-coreon-blue/20">
                      <div className="bg-gradient-to-r from-coreon-blue/20 to-coreon-navy-dark p-4 border-b border-coreon-blue/20">
                        <h3 className="font-semibold">Architectural Layers</h3>
                      </div>
                      <div className="bg-coreon-navy-dark/50 p-6">
                        <div className="space-y-6">
                          <div className="flex flex-col md:flex-row">
                            <div className="md:w-1/4 font-medium text-coreon-blue mb-2 md:mb-0">Data Abstraction Layer</div>
                            <div className="md:w-3/4">
                              <p className="mb-2">Normalizes and validates enterprise data from multiple sources, enriches with context, and applies security metadata.</p>
                              <ul className="list-disc pl-5 text-sm text-coreon-gray-light">
                                <li>Schema validation and error handling</li>
                                <li>Context generation with NER</li>
                                <li>Data lineage tracking</li>
                                <li>Security classification</li>
                              </ul>
                            </div>
                          </div>
                          
                          <div className="flex flex-col md:flex-row">
                            <div className="md:w-1/4 font-medium text-coreon-blue mb-2 md:mb-0">Agent Mesh</div>
                            <div className="md:w-3/4">
                              <p className="mb-2">Core orchestration system where specialized AI agents collaborate in configurable workflows.</p>
                              <ul className="list-disc pl-5 text-sm text-coreon-gray-light">
                                <li>Orchestrator agents</li>
                                <li>Data processing agents</li>
                                <li>Compliance validators</li>
                                <li>Human interface agents</li>
                              </ul>
                            </div>
                          </div>
                          
                          <div className="flex flex-col md:flex-row">
                            <div className="md:w-1/4 font-medium text-coreon-blue mb-2 md:mb-0">Governance Kernel</div>
                            <div className="md:w-3/4">
                              <p className="mb-2">Enforces policies, security controls, and maintains comprehensive audit logs.</p>
                              <ul className="list-disc pl-5 text-sm text-coreon-gray-light">
                                <li>Decision tracking with attribution</li>
                                <li>Business rule enforcement</li>
                                <li>Approval management</li>
                                <li>Audit logging</li>
                              </ul>
                            </div>
                          </div>
                          
                          <div className="flex flex-col md:flex-row">
                            <div className="md:w-1/4 font-medium text-coreon-blue mb-2 md:mb-0">Teleoperation Interface</div>
                            <div className="md:w-3/4">
                              <p className="mb-2">Provides monitoring, review, and intervention capabilities for human operators.</p>
                              <ul className="list-disc pl-5 text-sm text-coreon-gray-light">
                                <li>Live agent activity dashboards</li>
                                <li>Review queues</li>
                                <li>Approval workflows</li>
                                <li>System health monitoring</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <p>
                      This layered architecture enables Coreon to maintain separation of concerns while providing comprehensive visibility across the entire AI workflow. Each layer has specific responsibilities and interfaces with adjacent layers through well-defined APIs.
                    </p>
                  </div>
                </section>
                
                {/* Agent Mesh Technology */}
                <section id="agent-mesh" className="mb-16">
                  <h2 className="text-2xl font-bold mb-6 text-coreon-blue">Agent Mesh Technology</h2>
                  <div className="prose prose-invert max-w-none">
                    <p className="text-lg">
                      The Agent Mesh is Coreon's core innovation, enabling the creation of specialized AI agents that collaborate to solve complex tasks while maintaining governance and auditability.
                    </p>
                    
                    <div className="my-8 bg-coreon-navy-dark/50 p-6 rounded-lg border border-coreon-blue/20">
                      <h3 className="text-xl font-semibold mb-4">Agent Types</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-coreon-navy/40 rounded-lg">
                          <h4 className="font-medium text-coreon-blue">Data Processing Agents</h4>
                          <ul className="mt-2 text-sm space-y-1">
                            <li>Document classifiers</li>
                            <li>Information extractors</li>
                            <li>Data transformers</li>
                            <li>Content analyzers</li>
                          </ul>
                        </div>
                        
                        <div className="p-4 bg-coreon-navy/40 rounded-lg">
                          <h4 className="font-medium text-coreon-blue">Compliance Agents</h4>
                          <ul className="mt-2 text-sm space-y-1">
                            <li>Regulatory validators</li>
                            <li>Security monitors</li>
                            <li>Policy enforcers</li>
                            <li>Audit generators</li>
                          </ul>
                        </div>
                        
                        <div className="p-4 bg-coreon-navy/40 rounded-lg">
                          <h4 className="font-medium text-coreon-blue">Orchestration Agents</h4>
                          <ul className="mt-2 text-sm space-y-1">
                            <li>Workflow coordinators</li>
                            <li>Task dispatchers</li>
                            <li>Error handlers</li>
                            <li>System monitors</li>
                          </ul>
                        </div>
                        
                        <div className="p-4 bg-coreon-navy/40 rounded-lg">
                          <h4 className="font-medium text-coreon-blue">Interface Agents</h4>
                          <ul className="mt-2 text-sm space-y-1">
                            <li>Human reviewers</li>
                            <li>Notification managers</li>
                            <li>Escalation handlers</li>
                            <li>Feedback collectors</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-4">Agent Configuration</h3>
                    <p>
                      Agents are configured through a declarative API that specifies their behavior, connections, and governance controls. Below is a simplified example of an agent mesh configuration:
                    </p>
                    
                    <pre className="bg-coreon-navy-dark p-4 rounded-md overflow-x-auto my-6">
{`{
  "name": "Claims Processing Workflow",
  "agents": [
    {
      "id": "document-classifier",
      "name": "Document Classifier",
      "type": "data-processing",
      "model": "coreon-nlp-v2",
      "parameters": {
        "temperature": 0.2,
        "max_tokens": 2000
      }
    },
    {
      "id": "data-extractor",
      "name": "Data Extractor",
      "type": "data-processing",
      "model": "coreon-structure-v1",
      "parameters": {
        "temperature": 0.1,
        "max_tokens": 4000
      }
    },
    {
      "id": "compliance-validator",
      "name": "Compliance Validator",
      "type": "compliance",
      "model": "coreon-finance-secure",
      "parameters": {
        "temperature": 0.0,
        "max_tokens": 1000
      }
    },
    {
      "id": "human-interface",
      "name": "Human Interface",
      "type": "interface",
      "model": "coreon-interface-v3"
    }
  ],
  "connections": [
    {
      "from": "document-classifier",
      "to": "data-extractor",
      "condition": "confidence > 0.85"
    },
    {
      "from": "data-extractor",
      "to": "compliance-validator"
    },
    {
      "from": "compliance-validator",
      "to": "human-interface",
      "condition": "compliance_score < 0.95"
    }
  ]
}`}
                    </pre>
                    
                    <p>
                      This configuration creates a workflow where documents are classified, relevant data is extracted, compliance is verified, and human review is triggered when needed. The mesh approach allows for precise control over information flow while maintaining regulatory compliance.
                    </p>
                  </div>
                </section>
                
                {/* Human-in-the-Loop Controls */}
                <section id="hitl" className="mb-16">
                  <h2 className="text-2xl font-bold mb-6 text-coreon-blue">Human-in-the-Loop Controls</h2>
                  <div className="prose prose-invert max-w-none">
                    <p className="text-lg">
                      Coreon's human-in-the-loop (HITL) controls ensure that AI systems maintain appropriate human oversight, especially for high-stakes decisions in regulated environments.
                    </p>
                    
                    <div className="my-8 bg-coreon-navy-dark/50 rounded-lg border border-coreon-blue/20 overflow-hidden">
                      <div className="bg-gradient-to-r from-coreon-blue/20 to-coreon-navy-dark p-4 border-b border-coreon-blue/20">
                        <h3 className="font-semibold">HITL Control Mechanisms</h3>
                      </div>
                      <div className="p-6">
                        <div className="space-y-6">
                          <div>
                            <h4 className="font-medium text-coreon-blue mb-2">Supervision Modes</h4>
                            <ul className="list-disc pl-5 space-y-1">
                              <li><span className="font-medium">Full Oversight:</span> <span className="text-sm text-coreon-gray-light">All decisions require explicit human approval</span></li>
                              <li><span className="font-medium">Threshold-Based:</span> <span className="text-sm text-coreon-gray-light">Review triggered by confidence scores or risk levels</span></li>
                              <li><span className="font-medium">Sampling:</span> <span className="text-sm text-coreon-gray-light">Random subset reviewed for quality control</span></li>
                              <li><span className="font-medium">Exception-Only:</span> <span className="text-sm text-coreon-gray-light">Only flagged cases require human intervention</span></li>
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="font-medium text-coreon-blue mb-2">Review Interface</h4>
                            <ul className="list-disc pl-5 space-y-1">
                              <li>Prioritized task queues with deadlines</li>
                              <li>Context-rich decision support information</li>
                              <li>One-click approval/rejection with comments</li>
                              <li>Historical performance metrics</li>
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="font-medium text-coreon-blue mb-2">Intervention Controls</h4>
                            <ul className="list-disc pl-5 space-y-1">
                              <li>Emergency stop capabilities for individual agents or workflows</li>
                              <li>Runtime parameter adjustments</li>
                              <li>Manual overrides with justification tracking</li>
                              <li>Feedback collection for model improvement</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <p>
                      HITL controls are configurable at both the platform level and for individual workflows. This allows organizations to implement the appropriate level of human oversight based on risk profiles, regulatory requirements, and operational needs.
                    </p>
                  </div>
                </section>
                
                {/* Security & Compliance */}
                <section id="security" className="mb-16">
                  <h2 className="text-2xl font-bold mb-6 text-coreon-blue">Security & Compliance</h2>
                  <div className="prose prose-invert max-w-none">
                    <p className="text-lg">
                      Coreon includes enterprise-grade security measures and native compliance enforcement for regulated industries.
                    </p>
                    
                    <div className="my-8 bg-coreon-navy-dark/50 p-6 rounded-lg border border-coreon-blue/20">
                      <h3 className="text-xl font-semibold mb-4">Security Features</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex items-start">
                          <div className="bg-coreon-blue/20 p-2 rounded-lg mr-3">
                            <svg className="w-5 h-5 text-coreon-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium">End-to-end Encryption</h4>
                            <p className="text-sm text-coreon-gray-light">Secure data transmission and storage</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="bg-coreon-blue/20 p-2 rounded-lg mr-3">
                            <svg className="w-5 h-5 text-coreon-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium">Role-based Access Controls</h4>
                            <p className="text-sm text-coreon-gray-light">Granular permissions for secure operations</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="bg-coreon-blue/20 p-2 rounded-lg mr-3">
                            <svg className="w-5 h-5 text-coreon-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium">Immutable Audit Logging</h4>
                            <p className="text-sm text-coreon-gray-light">Complete, tamper-proof audit trail</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="bg-coreon-blue/20 p-2 rounded-lg mr-3">
                            <svg className="w-5 h-5 text-coreon-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium">Per-region Data Residency</h4>
                            <p className="text-sm text-coreon-gray-light">Regulatory compliance for data location</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="my-8 bg-coreon-navy-dark/50 p-6 rounded-lg border border-coreon-blue/20">
                      <h3 className="text-xl font-semibold mb-4">Supported Compliance Frameworks</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex items-start">
                          <div className="bg-coreon-blue/20 p-2 rounded-lg mr-3">
                            <svg className="w-5 h-5 text-coreon-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium">HIPAA</h4>
                            <p className="text-sm text-coreon-gray-light">Healthcare data protection</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="bg-coreon-blue/20 p-2 rounded-lg mr-3">
                            <svg className="w-5 h-5 text-coreon-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium">GDPR</h4>
                            <p className="text-sm text-coreon-gray-light">Data privacy and subject rights</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="bg-coreon-blue/20 p-2 rounded-lg mr-3">
                            <svg className="w-5 h-5 text-coreon-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium">SOC 2</h4>
                            <p className="text-sm text-coreon-gray-light">Service organization controls</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="bg-coreon-blue/20 p-2 rounded-lg mr-3">
                            <svg className="w-5 h-5 text-coreon-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium">ISO 27001</h4>
                            <p className="text-sm text-coreon-gray-light">Information security management</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="my-8 bg-coreon-navy-dark/50 p-6 rounded-lg border border-coreon-blue/20">
                      <h3 className="text-xl font-semibold mb-4">Compliance Enforcement</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex items-start">
                          <div className="bg-coreon-blue/20 p-2 rounded-lg mr-3">
                            <svg className="w-5 h-5 text-coreon-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium">Automated Policy Checking</h4>
                            <p className="text-sm text-coreon-gray-light">Before agent execution</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="bg-coreon-blue/20 p-2 rounded-lg mr-3">
                            <svg className="w-5 h-5 text-coreon-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium">Data Lineage Tracking</h4>
                            <p className="text-sm text-coreon-gray-light">For full provenance</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="bg-coreon-blue/20 p-2 rounded-lg mr-3">
                            <svg className="w-5 h-5 text-coreon-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium">Retention Policy Enforcement</h4>
                            <p className="text-sm text-coreon-gray-light">With secure deletion</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="bg-coreon-blue/20 p-2 rounded-lg mr-3">
                            <svg className="w-5 h-5 text-coreon-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium">Consent Management</h4>
                            <p className="text-sm text-coreon-gray-light">Integration</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                
                {/* Enterprise Integration */}
                <section id="integration" className="mb-16">
                  <h2 className="text-2xl font-bold mb-6 text-coreon-blue">Enterprise Integration</h2>
                  <div className="prose prose-invert max-w-none">
                    <p className="text-lg">
                      Coreon is API-first and supports flexible deployment strategies to integrate into both modern and legacy infrastructure.
                    </p>
                    
                    <div className="my-8 bg-coreon-navy-dark/50 p-6 rounded-lg border border-coreon-blue/20">
                      <h3 className="text-xl font-semibold mb-4">Integration Capabilities</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex items-start">
                          <div className="bg-coreon-blue/20 p-2 rounded-lg mr-3">
                            <svg className="w-5 h-5 text-coreon-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium">RESTful APIs</h4>
                            <p className="text-sm text-coreon-gray-light">For all platform components</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="bg-coreon-blue/20 p-2 rounded-lg mr-3">
                            <svg className="w-5 h-5 text-coreon-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium">GraphQL Endpoints</h4>
                            <p className="text-sm text-coreon-gray-light">For complex data operations</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="bg-coreon-blue/20 p-2 rounded-lg mr-3">
                            <svg className="w-5 h-5 text-coreon-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium">SDKs</h4>
                            <p className="text-sm text-coreon-gray-light">Python, Go, TypeScript, and Java</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="bg-coreon-blue/20 p-2 rounded-lg mr-3">
                            <svg className="w-5 h-5 text-coreon-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium">Webhooks</h4>
                            <p className="text-sm text-coreon-gray-light">Real-time events and notifications</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="bg-coreon-blue/20 p-2 rounded-lg mr-3">
                            <svg className="w-5 h-5 text-coreon-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium">Message Queue Integration</h4>
                            <p className="text-sm text-coreon-gray-light">(Kafka, RabbitMQ, SQS)</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="my-8 bg-coreon-navy-dark/50 p-6 rounded-lg border border-coreon-blue/20">
                      <h3 className="text-xl font-semibold mb-4">Enterprise Connectors</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex items-start">
                          <div className="bg-coreon-blue/20 p-2 rounded-lg mr-3">
                            <svg className="w-5 h-5 text-coreon-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium">Salesforce</h4>
                            <p className="text-sm text-coreon-gray-light">CRM integration</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="bg-coreon-blue/20 p-2 rounded-lg mr-3">
                            <svg className="w-5 h-5 text-coreon-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium">SAP</h4>
                            <p className="text-sm text-coreon-gray-light">ERP workflows</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="bg-coreon-blue/20 p-2 rounded-lg mr-3">
                            <svg className="w-5 h-5 text-coreon-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium">Oracle</h4>
                            <p className="text-sm text-coreon-gray-light">Database operations</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="bg-coreon-blue/20 p-2 rounded-lg mr-3">
                            <svg className="w-5 h-5 text-coreon-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium">ServiceNow</h4>
                            <p className="text-sm text-coreon-gray-light">IT service management</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="bg-coreon-blue/20 p-2 rounded-lg mr-3">
                            <svg className="w-5 h-5 text-coreon-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium">Microsoft 365</h4>
                            <p className="text-sm text-coreon-gray-light">Document processing</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="bg-coreon-blue/20 p-2 rounded-lg mr-3">
                            <svg className="w-5 h-5 text-coreon-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium">Workday</h4>
                            <p className="text-sm text-coreon-gray-light">HR processes</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="my-8 bg-coreon-navy-dark/50 p-6 rounded-lg border border-coreon-blue/20">
                      <h3 className="text-xl font-semibold mb-4">Data Integration Patterns</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex items-start">
                          <div className="bg-coreon-blue/20 p-2 rounded-lg mr-3">
                            <svg className="w-5 h-5 text-coreon-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium">Batch Processing</h4>
                            <p className="text-sm text-coreon-gray-light">For large datasets</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="bg-coreon-blue/20 p-2 rounded-lg mr-3">
                            <svg className="w-5 h-5 text-coreon-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium">Real-time Streaming</h4>
                            <p className="text-sm text-coreon-gray-light">For continuous operations</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="bg-coreon-blue/20 p-2 rounded-lg mr-3">
                            <svg className="w-5 h-5 text-coreon-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium">Change Data Capture</h4>
                            <p className="text-sm text-coreon-gray-light">For incremental updates</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="bg-coreon-blue/20 p-2 rounded-lg mr-3">
                            <svg className="w-5 h-5 text-coreon-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium">Event-driven Architecture</h4>
                            <p className="text-sm text-coreon-gray-light">For reactive workflows</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                
                {/* Deployment Models */}
                <section id="deployment" className="mb-16">
                  <h2 className="text-2xl font-bold mb-6 text-coreon-blue">Deployment Models</h2>
                  <div className="prose prose-invert max-w-none">
                    <p className="text-lg">
                      Coreon can be deployed in various environments to meet enterprise constraints.
                    </p>
                    
                    <div className="my-8 bg-coreon-navy-dark/50 p-6 rounded-lg border border-coreon-blue/20">
                      <h3 className="text-xl font-semibold mb-4">Deployment Options</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex items-start">
                          <div className="bg-coreon-blue/20 p-2 rounded-lg mr-3">
                            <svg className="w-5 h-5 text-coreon-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium">Fully Managed SaaS</h4>
                            <p className="text-sm text-coreon-gray-light">With enterprise SLAs</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="bg-coreon-blue/20 p-2 rounded-lg mr-3">
                            <svg className="w-5 h-5 text-coreon-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium">Customer-deployed</h4>
                            <p className="text-sm text-coreon-gray-light">AWS, Azure, or GCP</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="bg-coreon-blue/20 p-2 rounded-lg mr-3">
                            <svg className="w-5 h-5 text-coreon-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium">Hybrid Deployments</h4>
                            <p className="text-sm text-coreon-gray-light">On-premise data protection</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="bg-coreon-blue/20 p-2 rounded-lg mr-3">
                            <svg className="w-5 h-5 text-coreon-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium">Full On-premise Deployment</h4>
                            <p className="text-sm text-coreon-gray-light">For sensitive infrastructure</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="bg-coreon-blue/20 p-2 rounded-lg mr-3">
                            <svg className="w-5 h-5 text-coreon-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium">Edge Deployment</h4>
                            <p className="text-sm text-coreon-gray-light">For latency-sensitive applications</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="my-8 bg-coreon-navy-dark/50 p-6 rounded-lg border border-coreon-blue/20">
                      <h3 className="text-xl font-semibold mb-4">Recommended Practices</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex items-start">
                          <div className="bg-coreon-blue/20 p-2 rounded-lg mr-3">
                            <svg className="w-5 h-5 text-coreon-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium">Start with Conservative Agent Permissions</h4>
                            <p className="text-sm text-coreon-gray-light">Minimize risk</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="bg-coreon-blue/20 p-2 rounded-lg mr-3">
                            <svg className="w-5 h-5 text-coreon-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium">Enable Audit Logging and Metrics</h4>
                            <p className="text-sm text-coreon-gray-light">From day one</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="bg-coreon-blue/20 p-2 rounded-lg mr-3">
                            <svg className="w-5 h-5 text-coreon-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium">Review Mesh Configuration</h4>
                            <p className="text-sm text-coreon-gray-light">Before Production Deployment</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="bg-coreon-blue/20 p-2 rounded-lg mr-3">
                            <svg className="w-5 h-5 text-coreon-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium">Use Versioning and Rollback</h4>
                            <p className="text-sm text-coreon-gray-light">For All Workflows</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="bg-coreon-blue/20 p-2 rounded-lg mr-3">
                            <svg className="w-5 h-5 text-coreon-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium">Regularly Test and Validate</h4>
                            <p className="text-sm text-coreon-gray-light">HITL Thresholds and Approval Rules</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="bg-coreon-blue/20 p-2 rounded-lg mr-3">
                            <svg className="w-5 h-5 text-coreon-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium">Implement Staged Rollout</h4>
                            <p className="text-sm text-coreon-gray-light">For Critical Workflows</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="bg-coreon-blue/20 p-2 rounded-lg mr-3">
                            <svg className="w-5 h-5 text-coreon-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium">Establish Clear Escalation Paths</h4>
                            <p className="text-sm text-coreon-gray-light">For Exceptions</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="my-8 bg-coreon-navy-dark/50 p-6 rounded-lg border border-coreon-blue/20">
                      <h3 className="text-xl font-semibold mb-4">Performance Optimization</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex items-start">
                          <div className="bg-coreon-blue/20 p-2 rounded-lg mr-3">
                            <svg className="w-5 h-5 text-coreon-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium">Agent Caching</h4>
                            <p className="text-sm text-coreon-gray-light">For Repetitive Tasks</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="bg-coreon-blue/20 p-2 rounded-lg mr-3">
                            <svg className="w-5 h-5 text-coreon-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium">Parallel Execution</h4>
                            <p className="text-sm text-coreon-gray-light">For Independent Workflow Branches</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="bg-coreon-blue/20 p-2 rounded-lg mr-3">
                            <svg className="w-5 h-5 text-coreon-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium">Asynchronous Processing</h4>
                            <p className="text-sm text-coreon-gray-light">For Non-blocking Operations</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="bg-coreon-blue/20 p-2 rounded-lg mr-3">
                            <svg className="w-5 h-5 text-coreon-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium">Resource Allocation</h4>
                            <p className="text-sm text-coreon-gray-light">Based on Priority Tiers</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="bg-coreon-blue/20 p-2 rounded-lg mr-3">
                            <svg className="w-5 h-5 text-coreon-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium">Scheduled Scaling</h4>
                            <p className="text-sm text-coreon-gray-light">For Predictable Workloads</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                
                {/* Industry Use Cases */}
                <section id="use-cases" className="mb-16">
                  <h2 className="text-2xl font-bold mb-6 text-coreon-blue">Industry Use Cases</h2>
                  <div className="prose prose-invert max-w-none">
                    <p className="text-lg">
                      Coreon is purpose-built for sectors where reliability, transparency, and compliance are mission-critical:
                    </p>
                    
                    <h3>Healthcare</h3>
                    <ul className="list-disc pl-5 text-sm text-coreon-gray-light">
                      <li>Patient intake automation with compliance documentation</li>
                      <li>Clinical triage systems with physician oversight</li>
                      <li>Medical record analysis and summarization</li>
                      <li>Treatment protocol adherence verification</li>
                      <li>Regulatory documentation generation</li>
                    </ul>
                    
                    <h3>Finance</h3>
                    <ul className="list-disc pl-5 text-sm text-coreon-gray-light">
                      <li>Multi-stage fraud detection with human review thresholds</li>
                      <li>Audit trail generation for regulatory reporting</li>
                      <li>Automated compliance checks with exception handling</li>
                      <li>Risk assessment with explainable decision paths</li>
                      <li>Regulatory report creation and validation</li>
                    </ul>
                    
                    <h3>Insurance</h3>
                    <ul className="list-disc pl-5 text-sm text-coreon-gray-light">
                      <li>Multi-agent claim processing workflows</li>
                      <li>Policy validation and exception handling</li>
                      <li>Risk assessment with human oversight</li>
                      <li>Customer communication with compliance checks</li>
                      <li>Fraud detection with explainable flagging</li>
                    </ul>
                    
                    <h3>Public Sector</h3>
                    <ul className="list-disc pl-5 text-sm text-coreon-gray-light">
                      <li>Document automation with security clearance controls</li>
                      <li>Eligibility verification with audit trails</li>
                      <li>Decision support with transparency requirements</li>
                      <li>Case management with oversight thresholds</li>
                      <li>Compliance verification for regulatory processes</li>
                    </ul>
                  </div>
                </section>
                
                {/* API Reference */}
                <section id="api" className="mb-16">
                  <h2 className="text-2xl font-bold mb-6 text-coreon-blue">API Reference</h2>
                  <div className="prose prose-invert max-w-none">
                    <p className="text-lg">
                      Coreon provides a RESTful API for all platform components, allowing for seamless integration and automation.
                    </p>
                    
                    <div className="my-8 bg-coreon-navy-dark/50 p-6 rounded-lg border border-coreon-blue/20">
                      <h3 className="text-xl font-semibold mb-4">Available Resources</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex items-start">
                          <div className="bg-coreon-blue/20 p-2 rounded-lg mr-3">
                            <svg className="w-5 h-5 text-coreon-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium">REST API</h4>
                            <p className="text-sm text-coreon-gray-light">For all platform components</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="bg-coreon-blue/20 p-2 rounded-lg mr-3">
                            <svg className="w-5 h-5 text-coreon-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium">GraphQL Endpoints</h4>
                            <p className="text-sm text-coreon-gray-light">For complex data operations</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="bg-coreon-blue/20 p-2 rounded-lg mr-3">
                            <svg className="w-5 h-5 text-coreon-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium">SDKs</h4>
                            <p className="text-sm text-coreon-gray-light">Python, Go, TypeScript, and Java</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="bg-coreon-blue/20 p-2 rounded-lg mr-3">
                            <svg className="w-5 h-5 text-coreon-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium">Webhooks</h4>
                            <p className="text-sm text-coreon-gray-light">Real-time events and notifications</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="bg-coreon-blue/20 p-2 rounded-lg mr-3">
                            <svg className="w-5 h-5 text-coreon-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium">Message Queue Integration</h4>
                            <p className="text-sm text-coreon-gray-light">(Kafka, RabbitMQ, SQS)</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      
      <Footer />
    </main>
  );
} 