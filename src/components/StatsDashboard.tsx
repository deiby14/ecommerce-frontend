import { useCart } from '../contexts/CartContext';
import { useFavorites } from '../contexts/FavoritesContext';
import { useEffect, useState } from 'react';
import { fetchProducts } from '../services/api';
import './StatsDashboard.css';

interface StatsDashboardProps {
  onBack?: () => void;
}

export const StatsDashboard = ({ onBack }: StatsDashboardProps) => {
  const { cart, totalItems, totalPrice } = useCart();
  const { favorites } = useFavorites();
  const [stats, setStats] = useState({
    totalProducts: 0,
    averagePrice: 0,
    highestPrice: 0,
    lowestPrice: 0,
  });

  useEffect(() => {
    const loadStats = async () => {
      const productsData = await fetchProducts();
      
      if (productsData.length > 0) {
        const prices = productsData.map(p => p.price);
        const average = prices.reduce((a, b) => a + b, 0) / prices.length;
        const highest = Math.max(...prices);
        const lowest = Math.min(...prices);

        setStats({
          totalProducts: productsData.length,
          averagePrice: average,
          highestPrice: highest,
          lowestPrice: lowest,
        });
      }
    };

    loadStats();
  }, []);

  const cartCategories = cart.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + item.quantity;
    return acc;
  }, {} as Record<string, number>);

  const mostPopularCategory = Object.entries(cartCategories).sort((a, b) => b[1] - a[1])[0];

  return (
    <div className="stats-dashboard">
      <div className="page-header">
        {onBack && (
          <button className="back-button" onClick={onBack}>
            ← Volver
          </button>
        )}
        <h2>📊 Dashboard de Estadísticas</h2>
      </div>
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">🛒</div>
          <div className="stat-info">
            <h3>Productos en Carrito</h3>
            <p className="stat-value">{totalItems}</p>
            <p className="stat-label">{totalPrice.toFixed(2)} USD</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">❤️</div>
          <div className="stat-info">
            <h3>Favoritos</h3>
            <p className="stat-value">{favorites.length}</p>
            <p className="stat-label">productos guardados</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📦</div>
          <div className="stat-info">
            <h3>Total Productos</h3>
            <p className="stat-value">{stats.totalProducts}</p>
            <p className="stat-label">disponibles</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-info">
            <h3>Precio Promedio</h3>
            <p className="stat-value">${stats.averagePrice.toFixed(2)}</p>
            <p className="stat-label">en catálogo</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⬆️</div>
          <div className="stat-info">
            <h3>Precio Más Alto</h3>
            <p className="stat-value">${stats.highestPrice.toFixed(2)}</p>
            <p className="stat-label">producto premium</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⬇️</div>
          <div className="stat-info">
            <h3>Precio Más Bajo</h3>
            <p className="stat-value">${stats.lowestPrice.toFixed(2)}</p>
            <p className="stat-label">oferta destacada</p>
          </div>
        </div>

        {mostPopularCategory && (
          <div className="stat-card featured">
            <div className="stat-icon">🏆</div>
            <div className="stat-info">
              <h3>Categoría Popular</h3>
              <p className="stat-value">{mostPopularCategory[0]}</p>
              <p className="stat-label">{mostPopularCategory[1]} {mostPopularCategory[1] === 1 ? 'artículo' : 'artículos'}</p>
            </div>
          </div>
        )}

        <div className="stat-card featured">
          <div className="stat-icon">📈</div>
          <div className="stat-info">
            <h3>Valor del Carrito</h3>
            <p className="stat-value">${totalPrice.toFixed(2)}</p>
            <p className="stat-label">
              {totalItems > 0 
                ? `${totalItems} ${totalItems === 1 ? 'producto' : 'productos'}`
                : 'vacío'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
