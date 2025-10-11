import React from "react";
import Image from "next/image";

interface OcrSupportBubblesProps {
  className?: string;
  scannerImagePath?: string;
}

/**
 * OcrSupportBubbles component displays the bubbles and scanner animation for OCR Support
 */
const OcrSupportBubbles: React.FC<OcrSupportBubblesProps> = ({ 
  className = "", 
  scannerImagePath = "/assets/images/covertly-features/ocr-support/scanner.webp" 
}) => {
  return (
    <figure className={`ocr-support relative ${className}`}>
      <Image
        src="/assets/images/covertly-features/ocr-support/bubble1.svg"
        className="bubble-green-01"
        alt="feature-image"
        width={13.93}
        height={13.93}
      />
      <Image
        src="/assets/images/covertly-features/ocr-support/bubble2.svg"
        className="bubble-green-02"
        alt="feature-image"
        width={8}
        height={8}
      />

      <Image
        src="/assets/images/covertly-features/ocr-support/bubble1.svg"
        className="bubble-green-001"
        alt="feature-image"
        width={13.93}
        height={13.93}
      />
      <Image
        src="/assets/images/covertly-features/ocr-support/bubble2.svg"
        className="bubble-green-002"
        alt="feature-image"
        width={8}
        height={8}
      />

      <Image
        src="/assets/images/covertly-features/ocr-support/bubble-blue1.svg"
        className="bubble-blue1"
        alt="feature-image"
        width={13.93}
        height={13.93}
      />
      <Image
        src="/assets/images/covertly-features/ocr-support/bubble-blue1.svg"
        className="bubble-blue2"
        alt="feature-image"
        width={8}
        height={8}
      />
      <Image
        src={scannerImagePath}
        className="ocr_support_scanner"
        alt="feature-image"
        width={77}
        height={24}
      />
    </figure>
  );
};

export default OcrSupportBubbles;