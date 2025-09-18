"use client";

import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { useSocket } from "./contexts/socket-provider";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface LatencyDataPoint {
  timestamp: number;
  latency: number;
  label: string;
}

interface LatencyChartProps {
  maxDataPoints?: number;
  showStats?: boolean;
  height?: number;
}

export default function LatencyChart({
  maxDataPoints = 50,
  showStats = true,
  height = 300,
}: LatencyChartProps) {
  const { latency } = useSocket();
  const [dataPoints, setDataPoints] = useState<LatencyDataPoint[]>([]);

  // Add new latency data points when latency updates
  useEffect(() => {
    if (latency !== undefined) {
      const newDataPoint: LatencyDataPoint = {
        timestamp: latency.timestamp.getTime(),
        latency: latency.value,
        label: new Date(latency.timestamp).toLocaleTimeString(),
      };

      setDataPoints((prev) => {
        const updated = [...prev, newDataPoint];
        // Keep only the most recent data points
        return updated.slice(-maxDataPoints);
      });
    }
  }, [latency, maxDataPoints]);

  // Calculate statistics
  const stats = {
    current: latency?.value,
    average:
      dataPoints.length > 0
        ? Math.round(
            dataPoints.reduce((sum, dp) => sum + dp.latency, 0) /
              dataPoints.length
          )
        : 0,
    min:
      dataPoints.length > 0
        ? Math.min(...dataPoints.map((dp) => dp.latency))
        : 0,
    max:
      dataPoints.length > 0
        ? Math.max(...dataPoints.map((dp) => dp.latency))
        : 0,
  };

  // Chart data configuration
  const chartData = {
    labels: dataPoints.map((dp) => dp.label),
    datasets: [
      {
        label: "Latency (ms)",
        data: dataPoints.map((dp) => dp.latency),
        borderColor: "rgb(59, 130, 246)", // blue-500
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointRadius: 2,
        pointHoverRadius: 4,
        pointBackgroundColor: "rgb(59, 130, 246)",
        pointBorderColor: "white",
        pointBorderWidth: 1,
      },
    ],
  };

  // Chart options configuration
  const chartOptions = {
    // responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          usePointStyle: true,
          padding: 20,
        },
      },
      title: {
        display: true,
        text: "WebSocket Latency",
        font: {
          size: 16,
          weight: "bold" as const,
        },
        padding: 20,
      },
      tooltip: {
        mode: "index" as const,
        intersect: false,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "white",
        bodyColor: "white",
        borderColor: "rgb(59, 130, 246)",
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: "Time",
        },
        grid: {
          display: false,
        },
        ticks: {
          maxTicksLimit: 6,
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: "Latency (ms)",
        },
        beginAtZero: true,
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
        },
      },
    },
    interaction: {
      mode: "nearest" as const,
      axis: "x" as const,
      intersect: false,
    },
    animation: {
      duration: 0,
    },
  };

  return (
    <div className="bg-white">
      {/* Statistics Bar */}
      {showStats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {stats.current ?? "--"}
            </div>
            <div className="text-sm text-gray-600">Current (ms)</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {stats.average}
            </div>
            <div className="text-sm text-gray-600">Average (ms)</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">
              {stats.min}
            </div>
            <div className="text-sm text-gray-600">Min (ms)</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">{stats.max}</div>
            <div className="text-sm text-gray-600">Max (ms)</div>
          </div>
        </div>
      )}

      {/* Chart Container */}
      <div style={{ height: `${height}px` }}>
        {dataPoints.length > 0 ? (
          <Line data={chartData} options={chartOptions} />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            <div className="text-center">
              <div className="text-lg font-medium">No data available</div>
              <div className="text-sm">Waiting for latency measurements...</div>
            </div>
          </div>
        )}
      </div>

      {/* Data Points Counter */}
      <div className="mt-4 text-center text-sm text-gray-500">
        Showing {dataPoints.length} of {maxDataPoints} data points
      </div>
    </div>
  );
}
