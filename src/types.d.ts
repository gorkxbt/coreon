// Type declarations for libraries without existing types
declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    [key: string]: any;
  }
}

declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}

declare module 'next/link' {
  import { ComponentType, LinkHTMLAttributes } from 'react';

  export interface LinkProps extends LinkHTMLAttributes<HTMLAnchorElement> {
    href: string;
    as?: string;
    replace?: boolean;
    scroll?: boolean;
    prefetch?: boolean;
    shallow?: boolean;
    passHref?: boolean;
    locale?: string | false;
  }

  const Link: ComponentType<LinkProps>;
  export default Link;
}

declare module 'next/image' {
  import { ComponentType } from 'react';

  export interface ImageProps {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    layout?: 'fixed' | 'fill' | 'intrinsic' | 'responsive';
    priority?: boolean;
    loading?: 'eager' | 'lazy';
    objectFit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';
    objectPosition?: string;
    quality?: number;
    placeholder?: 'blur' | 'empty';
    blurDataURL?: string;
    className?: string;
    style?: any;
    [key: string]: any;
  }

  const Image: ComponentType<ImageProps>;
  export default Image;
}

declare module 'next/font/google' {
  export function Inter(options: any): {
    className: string;
    style: object;
    variable: string;
  };

  export function Poppins(options: any): {
    className: string;
    style: object;
    variable: string;
  };
}

declare module 'framer-motion' {
  import { ComponentType, ReactNode } from 'react';

  export interface MotionProps {
    initial?: any;
    animate?: any;
    exit?: any;
    variants?: any;
    transition?: any;
    whileHover?: any;
    whileTap?: any;
    whileFocus?: any;
    whileInView?: any;
    viewport?: any;
    drag?: any;
    dragConstraints?: any;
    onAnimationComplete?: any;
    [key: string]: any;
  }

  export const motion: {
    [key: string]: ComponentType<MotionProps>;
  };

  export function useAnimation(): {
    start: (definition: any) => Promise<any>;
    stop: () => void;
    set: (definition: any) => void;
  };

  export function useInView(
    ref: React.RefObject<Element>,
    options?: {
      once?: boolean;
      margin?: string;
      amount?: 'some' | 'all' | number;
      root?: React.RefObject<Element>;
    }
  ): boolean;
} 