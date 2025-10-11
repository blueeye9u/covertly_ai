import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { RxCross2 } from 'react-icons/rx';
import { IoMdAdd, IoMdRemove, IoMdExpand } from 'react-icons/io';

interface ConversationImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  imageName: string;
}

const ConversationImageModal: React.FC<ConversationImageModalProps> = ({
  isOpen,
  onClose,
  imageUrl,
  imageName,
}) => {
  const [scale, setScale] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setScale(1);
      setIsFullscreen(false);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case '+':
        case '=':
          e.preventDefault();
          handleZoomIn();
          break;
        case '-':
          e.preventDefault();
          handleZoomOut();
          break;
        case '0':
          e.preventDefault();
          handleResetZoom();
          break;
        case 'f':
          e.preventDefault();
          handleToggleFullscreen();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, scale]);

  const handleZoomIn = () => {
    setScale(prev => Math.min(prev * 1.2, 5));
  };

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev / 1.2, 0.1));
  };

  const handleResetZoom = () => {
    setScale(1);
  };

  const handleToggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-90">
      <div className={`relative ${isFullscreen ? 'w-screen h-screen' : 'max-w-[90vw] max-h-[90vh]'} flex items-center justify-center`}>
        <div className={`relative overflow-hidden ${isFullscreen ? 'w-screen h-screen' : 'w-full h-full'}`}>
          {isFullscreen ? (
            <Image
              src={imageUrl}
              alt={imageName}
              fill
              sizes="100vw"
              className="object-contain"
              style={{
                transform: `scale(${scale})`,
                transformOrigin: 'center',
                transition: 'transform 0.2s ease',
              }}
            />
          ) : (
            <Image
              src={imageUrl}
              alt={imageName}
              width={800}
              height={800}
              className="object-contain"
              style={{
                transform: `scale(${scale})`,
                transformOrigin: 'center',
                transition: 'transform 0.2s ease',
              }}
            />
          )}
        </div>

        <div className="absolute top-4 right-4 flex items-center gap-2">
          <button
            onClick={handleZoomOut}
            className="p-2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full transition-all duration-200"
            title="Zoom Out (or press -)"
            aria-label="Zoom Out"
          >
            <IoMdRemove size={20} />
          </button>
          
          <button
            onClick={handleResetZoom}
            className="px-3 py-2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full transition-all duration-200 text-sm font-medium"
            title="Reset Zoom (or press 0)"
            aria-label="Reset Zoom"
          >
            {Math.round(scale * 100)}%
          </button>
          
          <button
            onClick={handleZoomIn}
            className="p-2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full transition-all duration-200"
            title="Zoom In (or press +)"
            aria-label="Zoom In"
          >
            <IoMdAdd size={20} />
          </button>

          <button
            onClick={handleToggleFullscreen}
            className="p-2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full transition-all duration-200"
            title="Toggle Fullscreen (or press f)"
            aria-label="Toggle Fullscreen"
          >
            <IoMdExpand size={20} />
          </button>

          <button
            onClick={onClose}
            className="p-2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full transition-all duration-200"
            title="Close (or press Esc)"
            aria-label="Close"
          >
            <RxCross2 size={20} />
          </button>
        </div>

        <div className="absolute bottom-4 left-4">
          <p className="text-white text-sm bg-black bg-opacity-50 px-3 py-2 rounded-md">
            {imageName}
          </p>
        </div>

        <div className="absolute bottom-4 right-4">
          <div className="text-white text-xs bg-black bg-opacity-50 px-3 py-2 rounded-md">
            <p>Use + / - keys or buttons to zoom</p>
            <p>Press 0 to reset, f for fullscreen</p>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ConversationImageModal;
