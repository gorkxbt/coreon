'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function Agents() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });

  const codeExample = `POST /api/v1/agent-meshes
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
  ]
}`;

  const agentTypes = [
    {
      type: 'Document classifiers',
      description: 'Process and categorize documents based on content, format, and metadata.',
    },
    {
      type: 'Data extractors',
      description: 'Extract relevant information from structured and unstructured data.',
    },
    {
      type: 'Compliance agents',
      description: 'Verify and enforce regulatory compliance across all processes.',
    },
    {
      type: 'Domain-specific logic agents',
      description: 'Apply business rules and domain expertise to data and workflows.',
    },
    {
      type: 'Output verifiers',
      description: 'Validate results against defined schemas and business constraints.',
    },
    {
      type: 'Interface agents',
      description: 'Handle human interaction, feedback collection, and approval workflows.',
    },
  ];

  return (
    <section id="agents" className="section relative">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="mb-6">
              <span className="gradient-text">Agent Mesh</span> System
            </h2>
            <p className="text-lg mb-8">
              Coreon enables developers to create customized agent meshes for complex workflows. Each mesh is a network of agents that collaborate to process, verify, and escalate information.
            </p>

            <h3 className="text-xl font-bold mb-4">Agent Types</h3>
            <motion.div
              ref={ref}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
              className="space-y-4 mb-8"
            >
              {agentTypes.map((agent, index) => (
                <motion.div
                  key={agent.type}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.5,
                        ease: [0.4, 0, 0.2, 1],
                      },
                    },
                  }}
                  className="flex items-start"
                >
                  <div className="w-2 h-2 mt-2 rounded-full bg-coreon-blue mr-3 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-medium text-white">{agent.type}</h4>
                    <p className="text-sm text-coreon-gray-light/80">{agent.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <div>
            <div className="relative h-full">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-coreon-blue/30 to-coreon-blue/10 rounded-xl blur-sm"></div>
              <div className="relative h-full bg-coreon-navy-dark rounded-xl overflow-hidden border border-coreon-blue/20">
                <div className="flex items-center px-4 py-2 bg-coreon-navy-light/50">
                  <div className="flex space-x-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="ml-4 text-sm text-coreon-gray-light/70">Example Mesh Configuration</div>
                </div>
                <div className="p-6 font-mono text-sm overflow-auto max-h-[500px]">
                  <pre className="text-coreon-gray-light/90 whitespace-pre">{codeExample}</pre>
                </div>
              </div>
              <div className="absolute -bottom-3 -right-3 w-24 h-24 bg-coreon-blue/10 rounded-full filter blur-xl z-[-1]"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 