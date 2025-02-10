import React, { useState } from 'react';
import styles from './WeatherForm.module.css'; // Importa los estilos modulares

const WeatherForm = ({ onSearch }) => {
    const [city, setCity] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(city);
        setCity('');
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <input
                type="text"
                placeholder="Ingresa una ciudad"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className={styles.input}
                required
            />
            <button type="submit" className={styles.button}>
                Buscar <span>→</span> {/* Flecha */}
            </button>
        </form>
    );
};

export default WeatherForm;