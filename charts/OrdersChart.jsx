"use client"; // Required for Next.js App Router to ensure client-side rendering

import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const OrdersChart = () => {
    // Sample order data
    const data = {
        labels: ["Specials", "Kids", "Sides", "Drinks", "Desserts", "Soups", "Salads", "Entrees", "Appetizers"],
        datasets: [
            {
                label: "Orders by Category",
                data: [80, 90, 60, 45, 30, 50, 100, 50, 30], // Sample order counts
                backgroundColor: [
                    "rgba(255, 99, 132, 0.6)",
                    "rgba(54, 162, 235, 0.6)",
                    "rgba(255, 206, 86, 0.6)",
                    "rgba(75, 192, 192, 0.6)",
                    "rgba(153, 102, 255, 0.6)",
                    "rgba(255, 99, 132, 0.6)",
                    "rgba(54, 162, 235, 0.6)",
                    "rgba(255, 206, 86, 0.6)",
                    "rgba(75, 192, 192, 0.6)",
                    "rgba(153, 102, 255, 0.6)",
                ],
                borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                ],
                borderWidth: 1,
            },
        ],
    };

    // Chart options for customization
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "top",
            },
            tooltip: {
                callbacks: {
                    label: (context) => `${context.label}: ${context.raw} orders`,
                },
            },
        },
    };

    return (
        <div style={{ height: "400px", width: "100%", maxWidth: "600px", margin: "0 auto" }}>
            <h2>Orders by Category</h2>
            <Pie data={data} options={options} />
        </div>
    );
};

export default OrdersChart;