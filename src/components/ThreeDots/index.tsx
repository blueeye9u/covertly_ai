import React from 'react';
import { ThreeDots } from 'react-loader-spinner'
import { useTheme } from '../../context/themeContext';

const ThreeDotsLoader = ({height,width}:any) => {
    const { isDarkMode } = useTheme();
    return (
        <ThreeDots
            visible={true}
            height={height ?? "40"}
            width={width ?? "40"}
            color={isDarkMode ?"#E9F1F9" :"#000000"}
            radius="9"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
        />
    );
};

export default ThreeDotsLoader;