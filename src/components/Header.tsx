import { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { useTheme } from '../contexts/ThemeContext';
import './Header.css';

interface HeaderProps {
  onSearch: (query: string) => void;
  onNavigateToFavorites: () => void;
  onNavigateToCart: () => void;
  onNavigateToHome: () => void;
  onNavigateToStats?: () => void;
}

export const Header = ({
  onSearch,
  onNavigateToFavorites,
  onNavigateToCart,
  onNavigateToHome,
  onNavigateToStats,
}: HeaderProps) => {
  const { totalItems } = useCart();
  const { theme, toggleTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <header className="header">
      <div className="header-container">
        <h1 className="logo" onClick={onNavigateToHome} style={{ cursor: 'pointer' }}>
          🛍️ Tienda Online
        </h1>
        <div className="search-container">
          <input
            type="text"
            placeholder="Buscar productos..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-input"
          />
        </div>
        <nav className="header-nav">
          {onNavigateToStats && (
            <button
              className="nav-button"
              onClick={onNavigateToStats}
              title="Estadísticas"
            >
              📊 Stats
            </button>
          )}
          <button
            className="nav-button theme-toggle"
            onClick={toggleTheme}
            title={theme === 'light' ? 'Modo oscuro' : 'Modo claro'}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          <button
            className="nav-button"
            onClick={onNavigateToFavorites}
            title="Favoritos"
          >
            ❤️ Favoritos
          </button>
          <button
            className="nav-button cart-button"
            onClick={onNavigateToCart}
            title="Carrito"
          >
            🛒 Carrito
            {totalItems > 0 && (
              <span className="cart-badge">{totalItems}</span>
            )}
          </button>
        </nav>
      </div>
    </header>
  );
};
