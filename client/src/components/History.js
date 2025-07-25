import React from 'react';
import './History.css'; // Make sure you have matching styles

const History = ({ history, onDelete }) => {
  if (!history || history.length === 0) {
    return (
      <div className="history">
        <h3>📜 Search History</h3>
        <p>No previous history found.</p>
      </div>
    );
  }

  return (
    <div className="history">
      <h3>📜 Search History</h3>
      <ul className="history-list">
        {history.map((entry) => (
          <li key={entry._id} className="history-card">
            <div className="history-info">
              <div>
                <h4>{entry.city}</h4>
                <p>{entry.temperature}°C | {new Date(entry.date).toLocaleString()}</p>
              </div>
              {entry.icon && (
                <img
                  src={`https://openweathermap.org/img/wn/${entry.icon}@2x.png`}
                  alt="weather icon"
                  className="weather-icon"
                />
              )}
            </div>
            <button className="delete-btn" onClick={() => onDelete(entry._id)}>
              🗑️
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default History;
