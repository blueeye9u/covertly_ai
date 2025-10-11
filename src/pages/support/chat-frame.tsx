import { useEffect } from 'react';

declare global {
    interface Window {
        fcWidget?: any;
    }
}

export default function ChatFrame() {
    useEffect(() => {
        if (globalThis.window.fcWidget) return;

        const script = document.createElement('script');
        script.src = 'https://fw-cdn.com/13516911/5580679.js'; // Or your real script
        script.async = true;
        document.body.appendChild(script);

        // Poll for fcWidget readiness after script loads
        script.onload = () => {
            const interval = setInterval(() => {
                if (globalThis.window.fcWidget && typeof globalThis.window.fcWidget.init === 'function') {
                    globalThis.window.fcWidget.init({
                        token: '81635743-74b2-40dc-bb7d-834d819daad8',
                        host: 'https://wchat.freshchat.com',
                        open: true,
                        config: {
                            fullscreen: true,
                            headerProperty: {
                              hideChatButton: true,
                              hideHeader: false,
                              return: true
                            }
                        }
                    });

                    // Force open the chat window
                    globalThis.window.fcWidget.open();

                    clearInterval(interval);
                }
            }, 200);
        };

        return () => {
            const s = document.querySelector('script[src*="fw-cdn.com"]');
            if (s) s.remove();
            if (globalThis.window.fcWidget?.destroy) {
                globalThis.window.fcWidget.destroy();
            }
        };
    }, []);

    return (
        <div className="h-screen p-6">
            <h1 className="text-3xl font-bold mb-4">Support</h1>
            <p>Start chatting with our support team or AI assistant below.</p>
        </div>
    );
}