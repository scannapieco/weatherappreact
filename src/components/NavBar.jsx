import { useState } from 'react';

const NavBar = ({ onSearch, city, localTime, onTitleClick }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input.trim());
      setInput('');
    }
  };

  return (
    <nav className="navbar">
      <div
        className="navbar-title"
        title="WeatherApp"
        style={{ cursor: 'pointer' }}
        onClick={onTitleClick}
      >
        <span role="img" aria-label="weather">🌤️</span> WeatherApp
      </div>
      <div className="navbar-center">
        <form className="navbar-search" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Buscar ciudad..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit">Buscar</button>
        </form>
      </div>
      <div className="navbar-right">
        {city && (
          <p className="navbar-info">
            {city} | Hora local: {localTime}
          </p>
        )}
      </div>
    </nav>
  );
};

export default NavBar;