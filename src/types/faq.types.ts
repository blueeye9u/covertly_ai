/**
 * Shared FAQ item interface
 */
export interface FaqItem {
  id: string;
  isOpen: boolean;
  question: string;
  answer: any;
}

/**
 * Props interface for FAQ components
 */
export interface FaqProps {
  faqData: FaqItem[];
}
