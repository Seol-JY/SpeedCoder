import React, { useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  CartesianGrid,
} from "recharts";
import { Trophy, Activity, Hash, ArrowUpDown } from "lucide-react";
import { getTypingHistory, getAverageSpeed } from "../utils/typingHistory";

const formatAxisDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const today = new Date();

  const isToday =
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();

  if (isToday) {
    return `${date.getHours()}:${String(date.getMinutes()).padStart(2, "0")}`;
  } else {
    return `${date.getMonth() + 1}/${date.getDate()}`;
  }
};

const formatDetailDate = (dateString) => {
  if (!dateString) return "-";
  const date = new Date(dateString);
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(
    2,
    "0"
  )}.${String(date.getDate()).padStart(2, "0")} ${date.getHours()}:${String(
    date.getMinutes()
  ).padStart(2, "0")}`;
};

const EmptyBarChart = () => (
  <div className="flex items-center justify-center h-full w-full text-gray-400">
    연습 기록이 없습니다
  </div>
);

const StatsCard = ({ icon: Icon, label, value, unit, type }) => {
  const getCardClasses = () => {
    let classes = "stats-card";
    if (type === "speed") {
      if (value >= 500) {
        classes += " speed-card-legendary";
        return classes;
      }
      if (value >= 300) {
        classes += " speed-card-epic";
        return classes;
      }
    }
    return classes;
  };

  const getTextClasses = () => {
    if (type === "speed" && value >= 300) {
      return "white-text";
    }
    return "";
  };

  return (
    <div className={getCardClasses()}>
      <div className={`card-icon-wrapper ${getTextClasses()}`}>
        <Icon size={22} />
        <div className={`card-label ${getTextClasses()}`}>{label}</div>
      </div>
      <div className="card-info">
        <div className={`card-value ${getTextClasses()}`}>
          {value}
          <span className={`card-unit ${getTextClasses()}`}>{unit}</span>
        </div>
      </div>
    </div>
  );
};

const TypingStats = () => {
  const [sortField, setSortField] = useState("timestamp");
  const [sortDirection, setSortDirection] = useState("desc");
  const [activeBarIndex, setActiveBarIndex] = useState(null);

  const history = useMemo(() => getTypingHistory() || [], []);
  const averageSpeed = useMemo(() => getAverageSpeed() || 0, [history]);
  const maxSpeed = useMemo(
    () =>
      history.length ? Math.max(...history.map((record) => record.cpm)) : 0,
    [history]
  );

  const handleSort = (field) => {
    setSortField(field);
    setSortDirection(sortDirection === "desc" ? "asc" : "desc");
  };

  const sortedHistory = useMemo(() => {
    if (!history.length) return [];
    return [...history].sort((a, b) => {
      const compareVal = (a, b) => {
        if (sortField === "timestamp") {
          return new Date(a.timestamp) - new Date(b.timestamp);
        }
        return a[sortField] - b[sortField];
      };
      return sortDirection === "desc" ? -compareVal(a, b) : compareVal(a, b);
    });
  }, [history, sortField, sortDirection]);

  const chartData = useMemo(() => {
    if (!history.length) return [];
    return [...history].sort(
      (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
    );
  }, [history]);

  const handleMouseMove = (state) => {
    if (state.activeTooltipIndex !== undefined) {
      setActiveBarIndex(state.activeTooltipIndex);
    }
  };

  const handleMouseLeave = () => {
    setActiveBarIndex(null);
  };

  return (
    <div className="stats-container">
      <diiv className="stats-summary">
        <StatsCard
          icon={Trophy}
          label="Best"
          value={maxSpeed}
          unit="CPM"
          type="speed"
        />
        <StatsCard
          icon={Activity}
          label="Average"
          value={averageSpeed}
          unit="CPM"
        />
        <StatsCard
          icon={Hash}
          label="Attempts"
          value={history.length}
          unit="times"
          type="attempts"
        />
      </diiv>
      <div className="trend-section">
        {history.length === 0 ? (
          <div className="h-[240px]">
            <EmptyBarChart />
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={240}>
            <BarChart
              data={chartData.slice(-60)}
              margin={{ top: 20, right: 0, left: -25, bottom: 5 }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              maxBarSize={50}
            >
              <CartesianGrid
                stroke="var(--section-header-color)"
                opacity={0.1}
                vertical={false}
              />
              <XAxis
                dataKey="timestamp"
                tickFormatter={formatAxisDate}
                stroke="var(--section-header-color)"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                opacity={0.8}
              />
              <YAxis
                stroke="var(--section-header-color)"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                opacity={0.8}
              />
              {averageSpeed > 0 && (
                <ReferenceLine
                  y={averageSpeed}
                  stroke="var(--section-header-color)"
                  strokeDasharray="3 5"
                  opacity={0.9}
                />
              )}
              {activeBarIndex !== null && (
                <ReferenceLine
                  x={chartData.slice(-60)[activeBarIndex].timestamp}
                  stroke="var(--section-header-color)"
                  strokeWidth={2}
                  opacity={0.4}
                />
              )}
              <Bar
                dataKey="cpm"
                fill="var(--cursor-color)"
                radius={[3, 3, 0, 0]}
                isAnimationActive={false}
              />
              <Tooltip
                cursor={false}
                contentStyle={{
                  backgroundColor: "var(--sidebar-background-color)",
                  border: "none",
                  borderRadius: "12px",
                  color: "var(--section-header-color)",
                  padding: "12px",
                }}
                labelFormatter={formatDetailDate}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
      <div className="records-section">
        <div className="records-table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th
                  onClick={() => handleSort("timestamp")}
                  className="cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    Time
                    <ArrowUpDown
                      size={14}
                      className={
                        sortField === "timestamp" ? "text-blue-500" : ""
                      }
                    />
                  </span>
                </th>
                <th
                  onClick={() => handleSort("cpm")}
                  className="cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    Speed
                    <ArrowUpDown
                      size={14}
                      className={sortField === "cpm" ? "text-blue-500" : ""}
                    />
                  </span>
                </th>
                <th>
                  <span className="flex items-center gap-2">File</span>
                </th>
                <th className="text-right">Accuracy</th>
              </tr>
            </thead>
            <tbody>
              {sortedHistory.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center text-gray-400 py-4">
                    연습 기록이 없습니다
                  </td>
                </tr>
              ) : (
                sortedHistory.map((record, index) => {
                  const accuracy = (
                    (record.correctChars /
                      (record.correctChars + record.wrongChars)) *
                    100
                  ).toFixed(1);
                  return (
                    <tr key={index}>
                      <td>{formatDetailDate(record.timestamp)}</td>
                      <td className="emphasis text-right">{record.cpm}</td>
                      <td>{record.file}</td>
                      <td className="text-right">{accuracy}%</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TypingStats;
