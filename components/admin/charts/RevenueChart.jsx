"use client";

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import styles from './RevenueChart.module.scss';

export default function RevenueChart({ data }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Set background
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, width, height);

    // Find max value for scaling
    const maxRevenue = Math.max(...data.map(item => item.revenue));
    const padding = 40;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;
    const barWidth = chartWidth / data.length * 0.7;
    const barSpacing = chartWidth / data.length * 0.3;

    // Draw axes
    ctx.beginPath();
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 1;
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.stroke();

    // Draw grid lines
    const gridLines = 5;
    ctx.textAlign = 'right';
    ctx.font = '12px Arial';
    ctx.fillStyle = '#64748b';

    for (let i = 0; i <= gridLines; i++) {
      const y = height - padding - (i / gridLines) * chartHeight;
      const value = Math.round((i / gridLines) * maxRevenue);
      
      ctx.beginPath();
      ctx.strokeStyle = '#e2e8f0';
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();
      
      ctx.fillText('$' + value.toLocaleString(), padding - 5, y + 4);
    }

    // Animate and draw bars
    data.forEach((item, index) => {
      const x = padding + index * (barWidth + barSpacing) + barSpacing / 2;
      const barHeight = (item.revenue / maxRevenue) * chartHeight;
      const y = height - padding - barHeight;

      // Draw bar with gradient
      const gradient = ctx.createLinearGradient(0, y, 0, height - padding);
      gradient.addColorStop(0, '#3b82f6');
      gradient.addColorStop(1, '#93c5fd');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(x, y, barWidth, barHeight);

      // Draw month label
      ctx.textAlign = 'center';
      ctx.fillStyle = '#64748b';
      ctx.fillText(item.month, x + barWidth / 2, height - padding + 15);

      // Draw value on top of bar
      ctx.fillStyle = '#1e40af';
      ctx.fillText('$' + item.revenue.toLocaleString(), x + barWidth / 2, y - 5);
    });

  }, [data]);

  return (
    <motion.div 
      className={styles.revenueChartContainer}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <canvas 
        ref={canvasRef} 
        width={800} 
        height={400}
        className={styles.revenueChartCanvas}
      />
    </motion.div>
  );
}
