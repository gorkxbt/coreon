'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Logo from './Logo';

const navItems = [
  { name: 'Platform', href: '#platform' },
  { name: 'Use Cases', href: '#use-cases' },
  { name: 'Architecture', href: '#architecture' },
  { name: 'Security', href: '#security' },
  { name: 'Documentation', href: '/docs' },
];

interface HeaderProps {
  showDemoButton?: boolean;
}

export default function Header({ showDemoButton = false }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-coreon-navy-dark/90 backdrop-blur-md py-3' : 'bg-transparent py-5'
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container-custom flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <div className="relative h-10 w-10 mr-2">
            <Logo size={40} className="animate-pulse-glow" />
          </div>
          <span className="text-xl font-bold gradient-text">Coreon</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-coreon-gray-light hover:text-coreon-blue transition-colors duration-300 text-sm font-medium"
            >
              {item.name}
            </Link>
          ))}
          {showDemoButton && (
            <Link
              href="/demo"
              className="btn-secondary border border-coreon-blue/50 hover:border-coreon-blue"
            >
              <span className="flex items-center">
                <span className="mr-2 h-2 w-2 rounded-full bg-coreon-blue animate-pulse"></span>
                Live Demo
              </span>
            </Link>
          )}
          <Link
            href="#contact"
            className="btn-primary"
          >
            Get Started
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button
          type="button"
          className="md:hidden rounded-md p-2 text-coreon-gray-light hover:text-coreon-blue"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span className="sr-only">Open main menu</span>
          {mobileMenuOpen ? (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <motion.div
          className="md:hidden bg-coreon-navy-dark/95 backdrop-blur-md"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="container-custom py-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block py-2 text-coreon-gray-light hover:text-coreon-blue transition-colors duration-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            {showDemoButton && (
              <Link
                href="/demo"
                className="block py-2 text-coreon-blue font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="flex items-center">
                  <span className="mr-2 h-2 w-2 rounded-full bg-coreon-blue animate-pulse"></span>
                  Live Demo
                </span>
              </Link>
            )}
            <Link
              href="#contact"
              className="block mt-4 btn-primary w-full text-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              Get Started
            </Link>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
} 