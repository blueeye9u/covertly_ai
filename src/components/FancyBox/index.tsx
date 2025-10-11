import React, { useRef, useEffect, PropsWithChildren } from 'react';

import { Fancybox as NativeFancybox } from '@fancyapps/ui';
import '@fancyapps/ui/dist/fancybox/fancybox.css';

import { OptionsType } from '@fancyapps/ui/types/Fancybox/options';
interface Props {
  options?: Partial<OptionsType>;
  delegate?: string;
  className?:any;
  style?:any
}

function Fancybox(props: PropsWithChildren<Props>) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    const delegate = props.delegate ?? '[data-fancybox]';
    
    const defaultOptions: any = {
      zoom: true,
      zoomFade: true,
      zoomRatio: 1,
      zoomScrollToImage: true,
      zoomStart: 1,
      zoomEnd: 4,
      Carousel: {
        infinite: false,
      },
      Image: {
        zoom: true,
      },
      Buttons: {
        show: {
          zoomIn: true,
          zoomOut: true,
          fullscreen: true,
          close: true,
        },
      },
    };
    
    const options = { ...defaultOptions, ...props.options };

    NativeFancybox.bind(container, delegate, options);

    return () => {
      NativeFancybox.unbind(container);
      NativeFancybox.close();
    };
  });

  return <div ref={containerRef} className={`${props.className}`} style={props.style}>{props.children}</div>;
}

export default Fancybox;
