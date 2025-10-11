import React, { useEffect, useState } from "react";
//@ts-ignore
import {
  PieChart,
  Pie,
  Tooltip,
  Cell
} from "recharts";
import { v4 as uuidv4 } from "uuid";

export default function PreferencesChart({ usedTokens,tokenText, remainingTokens }: any) {
  const [endAngle, setEndAngle] = useState(0);

  useEffect(() => {
    let animationFrameId: any;
    const startTime = performance.now();

    const animateChart = (timestamp: number) => {
      const elapsed = timestamp - startTime;
      const newEndAngle = (elapsed / 2000) * 360;
      
      if (newEndAngle < 360) {
        setEndAngle(-newEndAngle);
        animationFrameId = requestAnimationFrame(animateChart);
      } else {
        setEndAngle(-360);
        cancelAnimationFrame(animationFrameId);
      }
    };

    animationFrameId = requestAnimationFrame(animateChart);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);
  const data = [
    { name: `Remaining ${tokenText}`, value: remainingTokens },
    { name: `Used  ${tokenText}`, value: usedTokens },
  ];
  const COLORS = ["#5989FD", "#E24F62"];
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
  }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
      </text>
    );
  };

  return (
    <PieChart width={320} height={320} className="mx-auto mt-3 mb-6 grow">
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        labelLine={false}
        label={renderCustomizedLabel}
        innerRadius={80}
        outerRadius={140}
        fill="#8884d8"
        dataKey="value"
        startAngle={0}
        endAngle={endAngle}
      >
        {data.map((entry, index) => (<Cell key={uuidv4()} fill={COLORS[index % COLORS.length]} />))}
      </Pie>
      <Tooltip />
    </PieChart>
  );
}
