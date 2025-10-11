import React from 'react';
import GaugeChart from '../../../components/charts/GaugeChart';

/**
 * Displays a gauge chart showing the percentage of image generation quota used
 */
const ImageGenerationChart = ({ percentage }: { percentage: number }) => {
  return <GaugeChart percentage={percentage} color="#8C60BE" />;
};

export default ImageGenerationChart;