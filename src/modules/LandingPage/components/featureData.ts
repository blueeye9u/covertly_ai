/**
 * Data structure for all feature cards
 */
export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  type: 'googleIntegration' | 'anonymous' | 'dataPrivacy' | 'generateImages' |
         'aiGeneratedLibrary' | 'multipleLlms' | 'secureRedaction' |
         'ocrSupport' | 'pdfReading';
}

// Helper function to create feature items
const createFeature = (
  id: string,
  title: string,
  description: string,
  type: FeatureItem['type']
): FeatureItem => ({ id, title, description, type });

export const featureItems: FeatureItem[] = [
  createFeature(
    "google-integration",
    "Google Search Integration",
    "Get precise, up-to-date results powered by Google.",
    "googleIntegration"
  ),
  createFeature(
    "anonymous-interaction",
    "Anonymous Interaction",
    "Secure, anonymous chats - no data stored or shared.",
    "anonymous"
  ),
  createFeature(
    "data-privacy",
    "Data Privacy Protection",
    "Advanced encryption secures and anonymizes all information.",
    "dataPrivacy"
  ),
  createFeature(
    "generate-images",
    "Generate Images",
    "Create AI images with DALL·E 3 and Stable Diffusion.",
    "generateImages"
  ),
  createFeature(
    "ai-generated-library",
    "AI-Generated Image Library",
    "Store and access AI-generated images in a centralized library.",
    "aiGeneratedLibrary"
  ),
  createFeature(
    "multiple-llms",
    "Multiple LLMs",
    "Access all of the industry-leading LLMs in one secure platform.",
    "multipleLlms"
  ),
  createFeature(
    "secure-redaction",
    "Secure Auto Redaction",
    "Auto-redact personal details from documents to protect sensitive data.",
    "secureRedaction"
  ),
  createFeature(
    "ocr-support",
    "OCR Support",
    "Upload documents or images for Covertly to analyze.",
    "ocrSupport"
  ),
  createFeature(
    "pdf-reading",
    "PDF Reading Capability",
    "Smart PDF reading—upload, analyze, and get answers faster.",
    "pdfReading"
  )
];
