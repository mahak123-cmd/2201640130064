const logger = (message, data = {}) => {
  const logEntry = {
    timestamp: new Date().toISOString(),
    message,
    ...data,
  };
  // Store logs in localStorage or a global state
  let logs = JSON.parse(localStorage.getItem("logs") || "[]");
  logs.push(logEntry);
  localStorage.setItem("logs", JSON.stringify(logs));
};

export default logger;
