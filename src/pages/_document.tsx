import { Html, Head, Main, NextScript } from "next/document";
import { site } from "../components/config/site";

export default function Document() {
  return (
    <Html className="scroll-smooth antialiased" lang="en">
      <Head>
        <meta name="theme-color" content="#14161c" />
        {/*  Primary Meta Tags */}
        <meta name="title" content="Covertly.ai: Anonymously Chat with Our AI-powered chatbot" />
        <meta name="description" content="Secure, anonymous AI chat that protects your privacy. Connect to advanced AI models without tracking, logging, or exposure of your data." />
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={site.metaTag} />
        <meta property="og:title" content="Covertly.ai: Anonymously Chat with Our AI-powered chatbot" />
        <meta property="og:description" content="Secure, anonymous AI chat that protects your privacy. Connect to advanced AI models without tracking, logging, or exposure of your data." />
        <meta property="og:image" content={site.metaTag} />
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={site.metaTag} />
        <meta property="twitter:title" content="Covertly.ai: Anonymously Chat with Our AI-powered chatbot" />
        <meta property="twitter:description" content="Secure, anonymous AI chat that protects your privacy. Connect to advanced AI models without tracking, logging, or exposure of your data." />
        <meta property="twitter:image" content={site.metaTag} />
        <link rel="icon" type="image/png" href={site.favIconLight} media="(prefers-color-scheme: light)" />
        <link rel="icon" type="image/png" href={site.favIconDark} media="(prefers-color-scheme: dark)" />
        <link rel="icon" href={site.favIcon} />
        <meta property="og:image" content={site.favIcon} />
      </Head>
      <body>
        <Main />
        <NextScript />
        <script
            dangerouslySetInnerHTML={{
              __html: `
                (function() {
                  var theme = localStorage.getItem('theme');
                  var mediaDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');
                  var isDark = theme === 'dark' || (!theme && mediaDark && mediaDark.matches);
                  document.documentElement.classList.toggle('dark', !!isDark);

                  // Ensure default favicon (without media attr) matches the resolved theme
                  try {
                    var lightHref = '${site.favIconLight}';
                    var darkHref = '${site.favIconDark}';
                    var existing = document.querySelector('link[rel="icon"]:not([media])');
                    if (!existing) {
                      existing = document.createElement('link');
                      existing.setAttribute('rel','icon');
                      existing.setAttribute('type','image/png');
                      document.head.appendChild(existing);
                    }
                    existing.setAttribute('href', isDark ? darkHref : lightHref);

                    // Listen for system theme changes
                    if (mediaDark && mediaDark.addEventListener) {
                      mediaDark.addEventListener('change', function(e){
                        var dark = e.matches;
                        existing.setAttribute('href', dark ? darkHref : lightHref);
                        document.documentElement.classList.toggle('dark', dark);
                      });
                    }
                  } catch (e) {}
                })();
              `,
            }}
          />

          {
            process.env.NEXT_PUBLIC_APP_ENV === "production" && (
              <script 
                  dangerouslySetInnerHTML={{
                    __html: `
                      (function() {
                        console.log("%cStop!", "color: red; font-size: 45px; font-weight: 700; font-family: Arial, sans-serif;");
                        console.log("%cThis is a browser feature intended for developers. Copy-pasting anything here could expose you to attackers and give them access to your Covertly AI account.", "font-size: 20px; font-family: Arial, sans-serif;");
                        console.log("%cSee https://en.wikipedia.org/wiki/Self-XSS for more information.", "font-size: 20px; font-family: Arial, sans-serif;");
                  
                        const noop = () => {};
                        const methods = ["log", "warn", "error", "info", "debug", "table", "trace", "group", "groupCollapsed", "groupEnd"];

                        methods.forEach((method) => {
                          console[method] = noop;
                        });
                      })();
                    `,
                  }}
                />
            )
          }

      </body>
    </Html>
  );
}
