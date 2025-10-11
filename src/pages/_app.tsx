import React, { useEffect, useState } from 'react';
import { Toaster } from "react-hot-toast";
import { useRouter } from 'next/router';
import Script from 'next/script'
import { UserbackProvider } from '@userback/react';
import type { AppProps } from "next/app";
import NiceModal from "@ebay/nice-modal-react";
import "../components/modals/Modals";
import { NavigationHistoryProvider } from "../context/navigationHistoryContext";
import { ConversationProvider } from "../context/conversation.context";
import { ImageGenerationProvider } from "../context/imageGeneration.context";
import { ThemeProvider } from "../context/themeContext";
import { SubscriptionProvider } from "../context/subscription.context";
import { UserProvider } from "../context/user.context";
import Seo from "../components/Seo/Seo";
import {getSEOByPath} from "../utils/getSEOByPath";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  const [isMounted, setIsMounted] = useState(false);
  const { pathname } = useRouter();
  const { title, description } = getSEOByPath(pathname);

  useEffect(() => {
    setIsMounted(true); // Ensure hydration-safe rendering
  }, []);
  
  if (!isMounted) return null; // Prevent mismatched rendering
  return (
    <NavigationHistoryProvider>
      <UserProvider>
        <ConversationProvider>
          <ImageGenerationProvider>
            <ThemeProvider>
              <SubscriptionProvider>
                <NiceModal.Provider>
                  <UserbackProvider token="A-w69I6WHSCUVVmH78Li3Huvge7">
                  {/* Google tag (gtag.js) */}
                  <Script async src="https://www.googletagmanager.com/gtag/js?id=G-MRK1V3LC89" />
                  <Script id="gtag-init">
                    {`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-MRK1V3LC89');`}
                  </Script>

                  {/* Meta Pixel Code */}
                  <Script id="fb-pixel">
                    {`!function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1085054029909812');
              fbq('track', 'PageView');`}
                  </Script>

                  <noscript>
                    <img
                      height="1"
                      width="1"
                      style={{ display: 'none' }}
                      src="https://www.facebook.com/tr?id=1085054029909812&ev=PageView&noscript=1"
                      alt="Facebook Pixel Tracking"
                    />
                  </noscript>
                  {/* End Meta Pixel Code */}
                  <Seo
                      title={title}
                      description={description}
                      canonical={`https://covertly.ai${pathname}`}
                  />
                  <Component {...pageProps} />
                  </UserbackProvider>
                  <Toaster
                    position="top-center"
                    reverseOrder={false}
                  />
                </NiceModal.Provider>
              </SubscriptionProvider>
            </ThemeProvider>
          </ImageGenerationProvider>
        </ConversationProvider>
      </UserProvider>
    </NavigationHistoryProvider>
  );
}
