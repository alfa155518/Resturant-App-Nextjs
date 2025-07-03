"use client";

import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";


ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const RevenueChart = () => {
    const revenueData = [
        { month: "Jan", revenue: 12500 },
        { month: "Feb", revenue: 15800 },
        { month: "Mar", revenue: 14200 },
        { month: "Apr", revenue: 16900 },
        { month: "May", revenue: 18500 },
        { month: "Jun", revenue: 17800 },
        { month: "Jul", revenue: 19200 },
        { month: "Aug", revenue: 20100 },
        { month: "Sep", revenue: 19800 },
        { month: "Oct", revenue: 21500 },
        { month: "Nov", revenue: 22800 },
        { month: "Dec", revenue: 25600 },
    ];

    const data = {
        labels: revenueData.map((item) => item.month),
        datasets: [
            {
                label: "Revenue",
                data: revenueData.map((item) => item.revenue),
                backgroundColor: (context) => {
                    const chart = context.chart;
                    const { ctx, chartArea } = chart;
                    if (!chartArea) return;
                    const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
                    gradient.addColorStop(0, "rgba(100, 181, 246, 0.8)"); // Light blue for dark mode
                    gradient.addColorStop(1, "rgba(100, 181, 246, 0.3)");
                    return gradient;
                },
                borderColor: "rgba(100, 181, 246, 1)",
                borderWidth: 1,
                borderRadius: 8, // Rounded bars for a modern look
                barThickness: 30, // Adjust bar width
            },
        ],
    };

    // Chart options for dark mode
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "top",
                labels: {
                    font: {
                        size: 14,
                        family: "'Inter', sans-serif", // Modern font
                    },
                    color: "#e0e0e0", // Light text for dark mode
                },
            },
            tooltip: {
                backgroundColor: "rgba(30, 30, 30, 0.9)", // Dark tooltip background
                titleFont: { size: 14, family: "'Inter', sans-serif" },
                bodyFont: { size: 12, family: "'Inter', sans-serif" },
                titleColor: "#ffffff",
                bodyColor: "#ffffff",
                callbacks: {
                    label: (context) => `${context.dataset.label}: $${context.raw.toLocaleString()}`, // Format as currency
                },
            },
        },
        scales: {
            x: {
                grid: {
                    display: false, // Clean look by hiding x-axis grid lines
                },
                ticks: {
                    font: { size: 12, family: "'Inter', sans-serif" },
                    color: "#b0b0b0", // Light gray for readability
                },
            },
            y: {
                beginAtZero: true,
                grid: {
                    color: "rgba(255, 255, 255, 0.1)", // Subtle white grid lines for dark mode
                },
                ticks: {
                    font: { size: 12, family: "'Inter', sans-serif" },
                    color: "#b0b0b0",
                    callback: (value) => `$${value.toLocaleString()}`, // Format y-axis as currency
                },
            },
        },
        animation: {
            duration: 1000, // Smooth animation
            easing: "easeOutCubic",
        },
    };

    return (
        <div
            style={{
                height: "400px",
                width: "100%",
                maxWidth: "800px",
                margin: "0 auto",
                padding: "20px",
                background: "#1a1a1a", // Dark background for dark mode
                borderRadius: "12px",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)", // Subtle shadow for depth
            }}
        >
            <h2
                style={{
                    textAlign: "center",
                    fontFamily: "'Inter', sans-serif",
                    color: "#e0e0e0", // Light text for dark mode
                    marginBottom: "20px",
                }}
            >
                Revenue by Month
            </h2>
            <Bar data={data} options={options} />
        </div>
    );
};

export default RevenueChart;