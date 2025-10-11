import React from 'react';
import {useRouter} from "next/router";
import {IoIosArrowBack} from "react-icons/io";

const LiveSupport: React.FC = () => {
    const router = useRouter();

    const containerStyle: React.CSSProperties = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        height: '100vh',
        padding: '20px',
        background: 'linear-gradient(to right, #30C5D2, #471069)',
        fontFamily: 'Arial, sans-serif',
    };

    const subContainerStyle: React.CSSProperties = {
        width: '100%',
        maxWidth: '800px',
        height: '800px',
    }

    const wrapperStyle: React.CSSProperties = {
        height: 'calc(100% - 80px)',
        border: '2px solid #ccc',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        padding: '10px',
    };

    const iframeStyle: React.CSSProperties = {
        width: '100%',
        height: '100%',
        border: 'none',
    };

    const backBtnStyle: React.CSSProperties = {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        background: 'transparent',
        border: 'none',
        color: 'white',
        fontSize: '16px',
        fontWeight: 500,
        cursor: 'pointer',
        padding: '10px 0',
        textDecoration: 'none',
    };

    const handleGoBack = () => {
        router.back();
    }

    return (
        <div style={containerStyle}>
            <div style={subContainerStyle}>
                <button style={backBtnStyle} onClick={handleGoBack}>
                    <IoIosArrowBack />
                    <span className="sm:block hidden">Back</span>
                </button>
                <div style={wrapperStyle}>
                    <iframe
                        src="/support/chat-frame"
                        title="Live Support Chat"
                        style={iframeStyle}
                    />
                </div>
            </div>
        </div>
    );
};

export default LiveSupport;
