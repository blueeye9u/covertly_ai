import React, { useEffect, useRef, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Label } from 'recharts';
import { v4 as uuidv4 } from "uuid";
import { useTheme } from '../../context/themeContext';

interface GaugeChartProps {
  percentage: number;
  color: string;
  height?: number;
  unfilledColor?: string;
}

const RADIAN = Math.PI / 180;
const renderNeedle = (
  percentage: number,
  color: string,
  viewBox: any
) => {
  if (!viewBox) return null;
  const {
    cx,
    cy,
    innerRadius: iR,
    outerRadius: oR,
    startAngle,
    endAngle,
  } = viewBox;

  const clamped = Math.max(0, Math.min(100, Number(percentage) || 0));
  const ang = startAngle + (endAngle - startAngle) * (clamped / 100);
  const length = (iR + 2 * oR) / 3;
  const sin = Math.sin(-RADIAN * ang);
  const cos = Math.cos(-RADIAN * ang);
  const r = 5;
  const x0 = cx;
  const y0 = cy;
  const xba = x0 + r * sin;
  const yba = y0 - r * cos;
  const xbb = x0 - r * sin;
  const ybb = y0 + r * cos;
  const xp = x0 + length * cos;
  const yp = y0 + length * sin;

  return (
    <g>
      <circle cx={x0} cy={y0} r={r} fill={color} stroke="none" />
      <path d={`M${xba} ${yba}L${xbb} ${ybb} L${xp} ${yp} L${xba} ${yba}`} stroke="none" fill={color} />
    </g>
  );
};

/**
 * A gauge chart component that displays a percentage value with a needle
 */
const GaugeChart: React.FC<GaugeChartProps> = ({ 
  percentage, 
  color, 
  height = 340,
  unfilledColor,
}) => {
  const { isDarkMode } = useTheme();
  const safePercentage = Number.isFinite(percentage) ? Math.max(0, Math.min(100, percentage)) : 0;
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerSize, setContainerSize] = useState<{ width: number; height: number }>({ width: 0, height });

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const updateSize = () => {
      const rect = element.getBoundingClientRect();
      setContainerSize({ width: rect.width, height: rect.height || height });
    };

    updateSize();

    const resizeObserver = new ResizeObserver(() => updateSize());
    resizeObserver.observe(element);

    return () => {
      resizeObserver.disconnect();
    };
  }, [height]);

  const backgroundArcColor = unfilledColor ?? (isDarkMode ? "#2F3240" : "#E6E8EC");
  const data = [
    { name: 'filled', value: safePercentage, color },
    { name: 'unfilled', value: 100 - safePercentage, color: backgroundArcColor },
  ];

  const containerWidth = containerSize.width;
  const hasMeasuredWidth = containerWidth > 0;

  const padding = hasMeasuredWidth ? Math.max(8, Math.min(24, containerWidth * 0.04)) : 16;
  const dynamicOuterRadius = hasMeasuredWidth
    ? Math.max(60, Math.min(containerWidth / 2 - padding, 210))
    : 210;
  const dynamicInnerRadius = hasMeasuredWidth
    ? Math.max(20, dynamicOuterRadius * 0.72)
    : 150;

  const computedHeight = hasMeasuredWidth
    ? Math.max(160, Math.round(dynamicOuterRadius * 1.2))
    : height;

  const computedCy = Math.max(
    Math.round(dynamicOuterRadius) + 8,
    Math.round(computedHeight - dynamicOuterRadius * 0.4)
  );

  return (
    <div ref={containerRef} className="w-full mx-auto overflow-hidden">
      <ResponsiveContainer width="100%" height={computedHeight}>
        <PieChart>
          <Pie
            dataKey="value"
            startAngle={180}
            endAngle={0}
            data={data}
            cx="50%"
            cy={computedCy}
            innerRadius={Math.round(dynamicInnerRadius)}
            outerRadius={Math.round(dynamicOuterRadius)}
            fill="#8884d8"
            stroke="none"
          >
            {data.map((entry) => (
              <Cell key={`cell-${uuidv4()}`} fill={entry.color} />
            ))}
            <Label
              content={({ viewBox }: any) =>
                renderNeedle(
                  safePercentage,
                  isDarkMode ? "#ffffff" : "#000000",
                  viewBox
                )
              }
              position="center"
            />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GaugeChart;