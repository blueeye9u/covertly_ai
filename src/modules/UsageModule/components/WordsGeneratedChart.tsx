import React from 'react';
import GaugeChart from '../../../components/charts/GaugeChart';

/**
 * Displays a gauge chart showing the percentage of words generated
 */
const WordsGeneratedChart = ({ percentage }: { percentage: number }) => {
  return <GaugeChart percentage={percentage} color="#30C5D2" />;
};

export default WordsGeneratedChart;