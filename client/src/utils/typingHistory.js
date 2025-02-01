// src/utils/typingHistory.js

const STORAGE_KEY = "typing_history";

export const saveTypingRecord = (record) => {
  const history = getTypingHistory();
  history.push({
    ...record,
    timestamp: new Date().toISOString(),
  });

  // 최근 100개 기록만 유지
  if (history.length > 100) {
    history.shift();
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
};

export const getTypingHistory = () => {
  const history = localStorage.getItem(STORAGE_KEY);
  return history ? JSON.parse(history) : [];
};

export const getRecentRecord = () => {
  const history = getTypingHistory();
  return history[history.length - 1] || null;
};

export const getAverageSpeed = () => {
  const history = getTypingHistory();
  if (history.length === 0) return 0;

  const sum = history.reduce((acc, record) => acc + record.cpm, 0);
  return Math.round(sum / history.length);
};

export const getSpeedTrend = (limit = 10) => {
  const history = getTypingHistory();
  return history.slice(-limit).map((record) => ({
    timestamp: new Date(record.timestamp).toLocaleDateString(),
    cpm: record.cpm,
  }));
};
