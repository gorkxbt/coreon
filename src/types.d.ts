// Type declarations for libraries without existing types
declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    [key: string]: any;
  }
  
  // Add React hooks
  export function useState<T>(initialState: T | (() => T)): [T, React.Dispatch<React.SetStateAction<T>>];
  export function useEffect(effect: React.EffectCallback, deps?: React.DependencyList): void;
  export function useContext<T>(context: React.Context<T>): T;
  export function useReducer<R extends React.Reducer<any, any>, I>(
    reducer: R,
    initialArg: I,
    init?: (arg: I) => React.ReducerState<R>
  ): [React.ReducerState<R>, React.Dispatch<React.ReducerAction<R>>];
  export function useCallback<T extends (...args: any[]) => any>(
    callback: T,
    deps: React.DependencyList
  ): T;
  export function useMemo<T>(factory: () => T, deps: React.DependencyList | undefined): T;
  export function useRef<T>(initialValue: T): React.MutableRefObject<T>;
  export function useRef<T>(initialValue: T | null): React.RefObject<T>;
  export function useImperativeHandle<T, R extends T>(
    ref: React.Ref<T> | undefined,
    init: () => R,
    deps?: React.DependencyList
  ): void;
  export function useLayoutEffect(effect: React.EffectCallback, deps?: React.DependencyList): void;
  export function useDebugValue<T>(value: T, format?: (value: T) => any): void;
  
  // Add ref types
  export interface RefObject<T> {
    readonly current: T | null;
  }
  
  export interface MutableRefObject<T> {
    current: T;
  }
  
  export type Ref<T> = RefCallback<T> | RefObject<T> | null;
  export type RefCallback<T> = (instance: T | null) => void;
  
  // Add DependencyList and EffectCallback
  export type DependencyList = ReadonlyArray<any>;
  export type EffectCallback = () => void | (() => void);
  
  // Add Dispatch and SetStateAction
  export type Dispatch<A> = (value: A) => void;
  export type SetStateAction<S> = S | ((prevState: S) => S);
  
  // Add Reducer
  export type Reducer<S, A> = (prevState: S, action: A) => S;
  export type ReducerState<R extends Reducer<any, any>> = R extends Reducer<infer S, any> ? S : never;
  export type ReducerAction<R extends Reducer<any, any>> = R extends Reducer<any, infer A> ? A : never;
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