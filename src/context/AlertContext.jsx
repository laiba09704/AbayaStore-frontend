import React, { createContext, useContext, useState, useCallback } from "react";
import "../components/Toast.css";

const AlertContext = createContext(null);

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
};

export const AlertProvider = ({ children }) => {
  const [alerts, setAlerts] = useState([]);

  const showAlert = useCallback((message, type = "info") => {
    const id = Date.now() + Math.random();
    setAlerts((prev) => [...prev, { id, message, type }]);

    // Auto remove after 4 seconds (matching CSS animation progress bar)
    setTimeout(() => {
      removeAlert(id);
    }, 4000);
  }, []);

  const removeAlert = useCallback((id) => {
    setAlerts((prev) =>
      prev.map((alert) =>
        alert.id === id ? { ...alert, closing: true } : alert
      )
    );

    // Give time for slideOut animation to complete
    setTimeout(() => {
      setAlerts((prev) => prev.filter((alert) => alert.id !== id));
    }, 300);
  }, []);

  const getIcon = (type) => {
    switch (type) {
      case "success":
        return <i className="bi bi-check-circle-fill"></i>;
      case "error":
        return <i className="bi bi-exclamation-triangle-fill"></i>;
      case "warning":
        return <i className="bi bi-exclamation-circle-fill"></i>;
      case "info":
      default:
        return <i className="bi bi-info-circle-fill"></i>;
    }
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      <div className="toast-container">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`custom-toast custom-toast-${alert.type} ${
              alert.closing ? "hide" : ""
            }`}
          >
            <div className="custom-toast-content">
              <span className="custom-toast-icon">{getIcon(alert.type)}</span>
              <span>{alert.message}</span>
            </div>
            <button
              onClick={() => removeAlert(alert.id)}
              className="custom-toast-close"
            >
              &times;
            </button>
            <div className="custom-toast-progress">
              <div className="custom-toast-progress-bar"></div>
            </div>
          </div>
        ))}
      </div>
    </AlertContext.Provider>
  );
};
