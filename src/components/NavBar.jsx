import React from 'react';

const Navbar = ({ city, localTime, onSearch }) => {
    return (
        <nav className="navbar">
            <div className="navbar-center">
                <form onSubmit={(e) => e.preventDefault()} className="navbar-search">
                    <input
                        type="text"
                        placeholder="Buscar ciudad"
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                onSearch(e.target.value);
                            }
                        }}
                    />
                </form>
            </div>
            <div className="navbar-right">
                {city && localTime && (
                    <p className="navbar-info">
                        {city} | {localTime}
                    </p>
                )}
            </div>
            <h1 className="navbar-title" onClick={() => window.location.reload()}>
                EL CLIMA HOY
            </h1>
        </nav>
    );
};

export default Navbar;