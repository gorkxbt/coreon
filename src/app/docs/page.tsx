'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ParticleBackground from '../../components/ParticleBackground';

// Define the sections for the documentation
const sections = [
  { id: 'introduction', title: 'Introduction to Coreon' },
  { id: 'limitations', title: 'Limitations of Traditional AI' },
  { id: 'use-cases', title: 'Industry Use Cases' },
  { id: 'architecture', title: 'Platform Architecture' },
  { id: 'agent-mesh', title: 'Agent Mesh System' },
  { id: 'hitl', title: 'Human-in-the-Loop (HITL)' },
  { id: 'security', title: 'Security and Compliance' },
  { id: 'integration', title: 'Enterprise Integration' },
  { id: 'token', title: 'Token Utility – $CORE' },
  { id: 'deployment', title: 'Deployment and Best Practices' },
  { id: 'appendix', title: 'Technical Appendix' },
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
              <div className="sticky top-32 p-6 bg-coreon-navy/50 backdrop-blur-md rounded-xl border border-coreon-blue/20">
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
              <div className="p-8 bg-coreon-navy/50 backdrop-blur-md rounded-xl border border-coreon-blue/20">
                <h1 className="text-3xl md:text-4xl font-bold mb-8 gradient-text">
                  Coreon – Technical Documentation
                </h1>
                <p className="text-xl text-coreon-gray-light mb-12">
                  Orchestrating intelligent agent systems for critical enterprise operations
                </p>
                
                {/* Introduction */}
                <section id="introduction" className="mb-16">
                  <h2 className="text-2xl font-bold mb-6">Introduction to Coreon</h2>
                  <div className="prose prose-invert max-w-none">
                    <p>
                      Coreon is an AI orchestration platform designed for enterprise environments that operate under strict regulatory, security, and operational constraints. It allows companies to design and deploy intelligent, multi-agent systems with real-time human supervision and full auditability.
                    </p>
                    <p>
                      Unlike traditional AI platforms that rely on large, isolated models, Coreon enables organizations to configure task-specific agents that collaborate within flexible, governed workflows. These agents are interconnected, modular, and transparent — making Coreon ideal for high-risk, high-stakes use cases.
                    </p>
                    <p>
                      The platform's architecture is built from the ground up to address the unique challenges of enterprise AI deployment, with a focus on:
                    </p>
                    <ul>
                      <li>Regulatory compliance and auditability</li>
                      <li>Secure, controlled agent interactions</li>
                      <li>Human oversight and intervention capabilities</li>
                      <li>Enterprise system integration</li>
                      <li>Scalable, resilient performance</li>
                    </ul>
                  </div>
                </section>
                
                {/* Limitations of Traditional AI */}
                <section id="limitations" className="mb-16">
                  <h2 className="text-2xl font-bold mb-6">Limitations of Traditional AI</h2>
                  <div className="prose prose-invert max-w-none">
                    <p>
                      Enterprise adoption of AI has long been limited by architectural and operational bottlenecks. Most legacy systems suffer from the following issues:
                    </p>
                    <ul>
                      <li>
                        <strong>Narrow task focus</strong>: Traditional AI systems are designed for specific, isolated tasks, leading to limited automation potential and fragmented workflows.
                      </li>
                      <li>
                        <strong>Lack of communication</strong>: Poor integration between AI systems and human operators creates blind spots and inefficiencies.
                      </li>
                      <li>
                        <strong>Compliance visibility gaps</strong>: Many AI systems operate as black boxes, making regulatory compliance difficult to verify and document.
                      </li>
                      <li>
                        <strong>Workflow limitations</strong>: Inability to adapt to multi-step, regulated workflows that require contextual understanding across process stages.
                      </li>
                      <li>
                        <strong>Scalability constraints</strong>: Traditional AI architectures often face performance bottlenecks when deployed at enterprise scale.
                      </li>
                    </ul>
                    <p>
                      Coreon directly addresses these limitations by introducing governed AI networks, clear human oversight layers, and a mesh-based intelligence system that supports task decomposition, specialization, and auditability.
                    </p>
                  </div>
                </section>
                
                {/* Industry Use Cases */}
                <section id="use-cases" className="mb-16">
                  <h2 className="text-2xl font-bold mb-6">Industry Use Cases</h2>
                  <div className="prose prose-invert max-w-none">
                    <p>
                      Coreon is purpose-built for sectors where reliability, transparency, and compliance are mission-critical:
                    </p>
                    
                    <h3>Healthcare</h3>
                    <ul>
                      <li>Patient intake automation with compliance documentation</li>
                      <li>Clinical triage systems with physician oversight</li>
                      <li>Medical record analysis and summarization</li>
                      <li>Treatment protocol adherence verification</li>
                      <li>Regulatory documentation generation</li>
                    </ul>
                    
                    <h3>Finance</h3>
                    <ul>
                      <li>Multi-stage fraud detection with human review thresholds</li>
                      <li>Audit trail generation for regulatory reporting</li>
                      <li>Automated compliance checks with exception handling</li>
                      <li>Risk assessment with explainable decision paths</li>
                      <li>Regulatory report creation and validation</li>
                    </ul>
                    
                    <h3>Insurance</h3>
                    <ul>
                      <li>Multi-agent claim processing workflows</li>
                      <li>Policy validation and exception handling</li>
                      <li>Risk assessment with human oversight</li>
                      <li>Customer communication with compliance checks</li>
                      <li>Fraud detection with explainable flagging</li>
                    </ul>
                    
                    <h3>Public Sector</h3>
                    <ul>
                      <li>Document automation with security clearance controls</li>
                      <li>Eligibility verification with audit trails</li>
                      <li>Decision support with transparency requirements</li>
                      <li>Case management with oversight thresholds</li>
                      <li>Compliance verification for regulatory processes</li>
                    </ul>
                  </div>
                </section>
                
                {/* Platform Architecture */}
                <section id="architecture" className="mb-16">
                  <h2 className="text-2xl font-bold mb-6">Platform Architecture</h2>
                  <div className="prose prose-invert max-w-none">
                    <p>
                      Coreon is composed of four architectural layers, each supporting key capabilities:
                    </p>
                    
                    <h3>4.1 Data Abstraction Layer</h3>
                    <p>
                      This layer ingests structured and unstructured enterprise data, performs normalization, validation, and enriches it with context. Key features include:
                    </p>
                    <ul>
                      <li>Data format normalization across multiple source systems</li>
                      <li>Schema validation with error handling and correction</li>
                      <li>Context generation using Named Entity Recognition (NER) and semantic mapping</li>
                      <li>Metadata tagging for compliance and security controls</li>
                      <li>Data lineage tracking for audit purposes</li>
                    </ul>
                    
                    <h3>4.2 Agent Mesh</h3>
                    <p>
                      This is the core orchestration system, where multiple AI agents are configured and interconnected to fulfill domain-specific workflows. Agents are modular, can operate sequentially or in parallel, and include:
                    </p>
                    <ul>
                      <li>Orchestrator agents that manage workflow execution</li>
                      <li>Data processors for information extraction and transformation</li>
                      <li>Compliance validators that ensure regulatory adherence</li>
                      <li>Human interface agents that manage operator interactions</li>
                      <li>Domain-specific reasoning agents for specialized tasks</li>
                    </ul>
                    
                    <h3>4.3 Governance Kernel</h3>
                    <p>
                      Provides oversight and enforcement of organizational policies, security controls, and auditability:
                    </p>
                    <ul>
                      <li>Real-time decision tracking with attribution</li>
                      <li>Business rule enforcement with version control</li>
                      <li>Intervention and approval management</li>
                      <li>Policy enforcement across the agent mesh</li>
                      <li>Comprehensive audit logging and reporting</li>
                    </ul>
                    
                    <h3>4.4 Teleoperation Interface</h3>
                    <p>
                      This interface allows designated personnel to monitor, review, approve, or interrupt any part of the AI mesh's execution:
                    </p>
                    <ul>
                      <li>Live dashboards showing agent activity and status</li>
                      <li>Review queues for human verification tasks</li>
                      <li>Approval workflows with role-based permissions</li>
                      <li>Anomaly tracking and intervention tools</li>
                      <li>Performance metrics and system health monitoring</li>
                    </ul>
                  </div>
                </section>
                
                {/* Agent Mesh System */}
                <section id="agent-mesh" className="mb-16">
                  <h2 className="text-2xl font-bold mb-6">Agent Mesh System</h2>
                  <div className="prose prose-invert max-w-none">
                    <p>
                      Coreon enables developers to create customized agent meshes for complex workflows. Each mesh is a network of agents that collaborate to process, verify, and escalate information.
                    </p>
                    
                    <h3>Agent Types</h3>
                    <ul>
                      <li>Document classifiers for content categorization</li>
                      <li>Data extractors for structured information retrieval</li>
                      <li>Compliance agents for regulatory verification</li>
                      <li>Domain-specific logic agents for specialized reasoning</li>
                      <li>Output verifiers for quality control</li>
                      <li>Interface agents for human interaction management</li>
                      <li>Orchestration agents for workflow coordination</li>
                      <li>Memory agents for context retention across processes</li>
                    </ul>
                    
                    <h3>Example Mesh Configuration</h3>
                    <pre className="bg-coreon-navy-dark p-4 rounded-md overflow-x-auto">
{`POST /api/v1/agent-meshes
{
  "name": "Insurance Claims Flow",
  "agents": [
    {
      "name": "document-classifier",
      "type": "data-processing",
      "model": "gpt-4",
      "parameters": {
        "temperature": 0.2,
        "max_tokens": 2000
      }
    },
    {
      "name": "data-extractor",
      "type": "data-processing",
      "model": "claude-3",
      "parameters": {
        "temperature": 0.1,
        "max_tokens": 4000
      }
    },
    {
      "name": "compliance-verifier",
      "type": "compliance",
      "model": "coreon-finance-secure",
      "parameters": {
        "temperature": 0.0,
        "max_tokens": 1000
      }
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
      "to": "compliance-verifier",
      "condition": "always"
    },
    {
      "from": "compliance-verifier",
      "to": "human-review",
      "condition": "compliance_score < 0.95"
    }
  ]
}`}
                    </pre>
                    
                    <p>
                      The agent mesh allows for precise and dynamic behavior while maintaining regulatory control and scalability. Developers can define complex interaction patterns, fallback behaviors, and human intervention points throughout the workflow.
                    </p>
                  </div>
                </section>
                
                {/* Human-in-the-Loop */}
                <section id="hitl" className="mb-16">
                  <h2 className="text-2xl font-bold mb-6">Human-in-the-Loop (HITL)</h2>
                  <div className="prose prose-invert max-w-none">
                    <p>
                      Human-in-the-Loop controls in Coreon ensure that high-stakes decisions are governed with appropriate human involvement. This includes:
                    </p>
                    
                    <ul>
                      <li>Configurable approval checkpoints in workflows</li>
                      <li>Confidence thresholds that trigger human review</li>
                      <li>Exception routing for edge cases</li>
                      <li>Feedback integration to improve model reliability</li>
                      <li>Escalation paths for critical decisions</li>
                    </ul>
                    
                    <p>
                      Operators can use review dashboards, monitor AI performance in real time, and directly intervene or approve sensitive tasks. The HITL system includes:
                    </p>
                    
                    <h3>Review Interface</h3>
                    <ul>
                      <li>Task queues organized by priority and deadline</li>
                      <li>Context-rich decision support information</li>
                      <li>One-click approval/rejection with comment capability</li>
                      <li>Historical performance metrics for similar cases</li>
                      <li>Audit trail of previous human decisions</li>
                    </ul>
                    
                    <h3>Intervention Controls</h3>
                    <ul>
                      <li>Emergency stop capabilities for individual agents or entire meshes</li>
                      <li>Parameter adjustment during runtime</li>
                      <li>Manual override options with justification tracking</li>
                      <li>Feedback collection for model improvement</li>
                    </ul>
                    
                    <h3>Supervision Modes</h3>
                    <ul>
                      <li>Full oversight (all decisions require approval)</li>
                      <li>Threshold-based (review triggered by confidence scores)</li>
                      <li>Sampling (review random subset for quality control)</li>
                      <li>Exception-only (review only flagged cases)</li>
                    </ul>
                  </div>
                </section>
                
                {/* Security and Compliance */}
                <section id="security" className="mb-16">
                  <h2 className="text-2xl font-bold mb-6">Security and Compliance</h2>
                  <div className="prose prose-invert max-w-none">
                    <p>
                      Coreon includes enterprise-grade security measures and native compliance enforcement for regulated industries.
                    </p>
                    
                    <h3>Security Features</h3>
                    <ul>
                      <li>End-to-end encryption for data in transit and at rest</li>
                      <li>Role-based access control (RBAC) with granular permissions</li>
                      <li>Immutable audit logging for all actions and decisions</li>
                      <li>Per-region data residency enforcement</li>
                      <li>Secure key management with rotation policies</li>
                      <li>Vulnerability scanning and penetration testing</li>
                      <li>Multi-factor authentication for sensitive operations</li>
                    </ul>
                    
                    <h3>Supported Compliance Frameworks</h3>
                    <ul>
                      <li>HIPAA for healthcare data protection</li>
                      <li>GDPR for data privacy and subject rights</li>
                      <li>SOC 2 for service organization controls</li>
                      <li>ISO 27001 for information security management</li>
                      <li>PCI DSS for payment card industry data</li>
                      <li>FINRA and SEC requirements for financial services</li>
                      <li>Custom regulatory frameworks via policy templates</li>
                    </ul>
                    
                    <h3>Compliance Enforcement</h3>
                    <ul>
                      <li>Automated policy checking before agent execution</li>
                      <li>Data lineage tracking for full provenance</li>
                      <li>Retention policy enforcement with secure deletion</li>
                      <li>Consent management integration</li>
                      <li>Comprehensive reporting for regulatory audits</li>
                    </ul>
                  </div>
                </section>
                
                {/* Enterprise Integration */}
                <section id="integration" className="mb-16">
                  <h2 className="text-2xl font-bold mb-6">Enterprise Integration</h2>
                  <div className="prose prose-invert max-w-none">
                    <p>
                      Coreon is API-first and supports flexible deployment strategies to integrate into both modern and legacy infrastructure.
                    </p>
                    
                    <h3>Integration Capabilities</h3>
                    <ul>
                      <li>RESTful APIs for all platform components</li>
                      <li>GraphQL endpoints for complex data operations</li>
                      <li>SDKs in Python, Go, TypeScript, and Java</li>
                      <li>Webhooks for real-time events and notifications</li>
                      <li>Message queue integration (Kafka, RabbitMQ, SQS)</li>
                    </ul>
                    
                    <h3>Enterprise Connectors</h3>
                    <p>
                      Pre-built connectors for common enterprise systems:
                    </p>
                    <ul>
                      <li>Salesforce for CRM integration</li>
                      <li>SAP for ERP workflows</li>
                      <li>Oracle for database operations</li>
                      <li>ServiceNow for IT service management</li>
                      <li>Microsoft 365 for document processing</li>
                      <li>Workday for HR processes</li>
                    </ul>
                    
                    <h3>Data Integration Patterns</h3>
                    <ul>
                      <li>Batch processing for large datasets</li>
                      <li>Real-time streaming for continuous operations</li>
                      <li>Change data capture for incremental updates</li>
                      <li>Event-driven architecture for reactive workflows</li>
                    </ul>
                    
                    <h3>Authentication Methods</h3>
                    <ul>
                      <li>OAuth 2.0 / OpenID Connect</li>
                      <li>SAML for enterprise SSO</li>
                      <li>API keys with rotation policies</li>
                      <li>JWT-based authentication</li>
                      <li>Integration with Active Directory / LDAP</li>
                    </ul>
                  </div>
                </section>
                
                {/* Token Utility */}
                <section id="token" className="mb-16">
                  <h2 className="text-2xl font-bold mb-6">Token Utility – $CORE</h2>
                  <div className="prose prose-invert max-w-none">
                    <p>
                      $CORE is the native token of the Coreon ecosystem and plays a central role in powering platform functions.
                    </p>
                    
                    <h3>Use Cases</h3>
                    <ul>
                      <li>Pay-per-execution of agent workflows with transparent pricing</li>
                      <li>Access to premium models and advanced compute capacity</li>
                      <li>Staking for governance proposals and mesh configurations</li>
                      <li>Rewards for validators, reviewers, and training contributors</li>
                      <li>Usage quota management through token locking</li>
                      <li>Priority execution for time-sensitive workloads</li>
                    </ul>
                    
                    <h3>Token Economics</h3>
                    <ul>
                      <li>Fixed supply of 1 billion $CORE tokens</li>
                      <li>Deflationary mechanism through burn on usage</li>
                      <li>Staking rewards for network security</li>
                      <li>Governance rights proportional to stake</li>
                    </ul>
                    
                    <h3>Enterprise Token Management</h3>
                    <ul>
                      <li>Bulk purchase options with volume discounts</li>
                      <li>Token custody solutions for enterprise treasury</li>
                      <li>Usage analytics and forecasting tools</li>
                      <li>Budget controls and department allocations</li>
                    </ul>
                    
                    <p>
                      $CORE aligns technical performance, access rights, and economic incentives within a single asset, creating a sustainable ecosystem for all participants.
                    </p>
                  </div>
                </section>
                
                {/* Deployment and Best Practices */}
                <section id="deployment" className="mb-16">
                  <h2 className="text-2xl font-bold mb-6">Deployment and Best Practices</h2>
                  <div className="prose prose-invert max-w-none">
                    <p>
                      Coreon can be deployed in various environments to meet enterprise constraints.
                    </p>
                    
                    <h3>Deployment Options</h3>
                    <ul>
                      <li>Fully managed SaaS with enterprise SLAs</li>
                      <li>Customer-deployed in AWS, Azure, or GCP</li>
                      <li>Hybrid deployments with on-premise data protection</li>
                      <li>Full on-premise deployment for sensitive infrastructure</li>
                      <li>Edge deployment for latency-sensitive applications</li>
                    </ul>
                    
                    <h3>Recommended Practices</h3>
                    <ul>
                      <li>Start with conservative agent permissions</li>
                      <li>Enable audit logging and metrics from day one</li>
                      <li>Review mesh configuration before production deployment</li>
                      <li>Use versioning and rollback features for all workflows</li>
                      <li>Regularly test and validate HITL thresholds and approval rules</li>
                      <li>Implement staged rollout for critical workflows</li>
                      <li>Establish clear escalation paths for exceptions</li>
                    </ul>
                    
                    <h3>Performance Optimization</h3>
                    <ul>
                      <li>Agent caching for repetitive tasks</li>
                      <li>Parallel execution for independent workflow branches</li>
                      <li>Asynchronous processing for non-blocking operations</li>
                      <li>Resource allocation based on priority tiers</li>
                      <li>Scheduled scaling for predictable workloads</li>
                    </ul>
                    
                    <h3>Monitoring and Maintenance</h3>
                    <ul>
                      <li>Real-time performance dashboards</li>
                      <li>Alerting on anomalous behavior</li>
                      <li>Regular model evaluation and retraining</li>
                      <li>Automated backup and disaster recovery</li>
                      <li>Compliance verification scans</li>
                    </ul>
                  </div>
                </section>
                
                {/* Technical Appendix */}
                <section id="appendix" className="mb-16">
                  <h2 className="text-2xl font-bold mb-6">Technical Appendix</h2>
                  <div className="prose prose-invert max-w-none">
                    <p>
                      Coreon provides advanced tooling and documentation for development, operations, and compliance teams.
                    </p>
                    
                    <h3>Available Resources</h3>
                    <ul>
                      <li>REST API Reference with interactive documentation</li>
                      <li>YAML/JSON Mesh Configuration Templates</li>
                      <li>Agent Type Definitions and capabilities</li>
                      <li>Human-in-the-Loop Policy Schemas</li>
                      <li>Terraform Infrastructure Blueprints</li>
                      <li>Compliance Integration Guides</li>
                      <li>Governance Node Staking Documentation</li>
                      <li>Performance Benchmarking Tools</li>
                    </ul>
                    
                    <h3>Developer Tools</h3>
                    <ul>
                      <li>Local development environment</li>
                      <li>Mesh testing framework</li>
                      <li>Agent simulation tools</li>
                      <li>CI/CD pipeline templates</li>
                      <li>Custom agent development SDK</li>
                    </ul>
                    
                    <h3>Technical Specifications</h3>
                    <ul>
                      <li>Supported model types and interfaces</li>
                      <li>Performance characteristics and limits</li>
                      <li>Security implementation details</li>
                      <li>High availability configuration</li>
                      <li>Data storage and retention options</li>
                    </ul>
                    
                    <h3>Support Resources</h3>
                    <ul>
                      <li>Developer community forums</li>
                      <li>Enterprise support SLAs</li>
                      <li>Training and certification programs</li>
                      <li>Implementation consulting services</li>
                      <li>Regular webinars and knowledge base</li>
                    </ul>
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