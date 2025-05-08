"use client";

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import styles from './OrdersChart.module.scss';

export default function OrdersChart({ data }) {
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
    const maxOrders = Math.max(...data.map(item => item.orders));
    const padding = 40;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;

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
      const value = Math.round((i / gridLines) * maxOrders);

      ctx.beginPath();
      ctx.strokeStyle = '#e2e8f0';
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();

      ctx.fillText(value.toString(), padding - 5, y + 4);
    }

    // Draw line chart
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#10b981';
    ctx.lineJoin = 'round';

    // Draw points and line
    data.forEach((item, index) => {
      const x = padding + (index / (data.length - 1)) * chartWidth;
      const y = height - padding - (item.orders / maxOrders) * chartHeight;

      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }

      // Draw day label
      ctx.textAlign = 'center';
      ctx.fillStyle = '#64748b';
      ctx.fillText(item.day, x, height - padding + 15);
    });

    ctx.stroke();

    // Draw area under the line
    ctx.lineTo(padding + chartWidth, height - padding);
    ctx.lineTo(padding, height - padding);
    ctx.closePath();

    const gradient = ctx.createLinearGradient(0, padding, 0, height - padding);
    gradient.addColorStop(0, 'rgba(16, 185, 129, 0.2)');
    gradient.addColorStop(1, 'rgba(16, 185, 129, 0.05)');
    ctx.fillStyle = gradient;
    ctx.fill();

    // Draw points
    data.forEach((item, index) => {
      const x = padding + (index / (data.length - 1)) * chartWidth;
      const y = height - padding - (item.orders / maxOrders) * chartHeight;

      ctx.beginPath();
      ctx.arc(x, y, 6, 0, Math.PI * 2);
      ctx.fillStyle = '#10b981';
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw value above point
      ctx.textAlign = 'center';
      ctx.fillStyle = '#047857';
      ctx.fillText(item.orders.toString(), x, y - 15);
    });

  }, [data]);

  return (
    <motion.div
      className={styles.ordersChartContainer}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <canvas
        ref={canvasRef}
        width={800}
        height={400}
        className={styles.ordersChartCanvas}
      />
    </motion.div>
  );
}
