export interface DecryptedTextProps {
  text: string;
  speed?: number;
  maxIterations?: number;
  sequential?: boolean;
  revealDirection?: 'start' | 'end' | 'center';
  useOriginalCharsOnly?: boolean;
  characters?: string;
  className?: string;
  parentClassName?: string;
  encryptedClassName?: string;
  animateOn?: 'hover' | 'view';
  [key: string]: unknown;
}

import type { Transition, TargetAndTransition, VariantLabels } from 'framer-motion';

export interface RotatingTextProps {
  texts: string[];
  transition?: Transition;
  initial?: TargetAndTransition | VariantLabels | boolean;
  animate?: TargetAndTransition | VariantLabels | boolean;
  exit?: TargetAndTransition | VariantLabels;
  animatePresenceMode?: 'wait' | 'sync' | 'popLayout';
  animatePresenceInitial?: boolean;
  rotationInterval?: number;
  staggerDuration?: number;
  staggerFrom?: StaggerFrom;
  loop?: boolean;
  auto?: boolean;
  splitBy?: SplitBy;
  onNext?: (index: number) => void;
  mainClassName?: string;
  splitLevelClassName?: string;
  elementLevelClassName?: string;
}

export interface RotatingTextRef {
  next: () => void;
  previous: () => void;
  jumpTo: (index: number) => void;
  reset: () => void;
}

type StaggerFrom = 'first' | 'last' | 'center' | 'random' | number;
type SplitBy = 'characters' | 'words' | 'lines' | string;
