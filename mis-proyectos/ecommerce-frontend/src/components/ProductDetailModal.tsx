import { useEffect } from 'react';
import { useCart } from '../contexts/CartContext';
import { useFavorites } from '../contexts/FavoritesContext';
import type { Product } from '../types';
import './ProductDetailModal.css';

interface ProductDetailModalProps {
  product: Product;
  onClose: () => void;
  onShowToast?: (message: string, type?: 'success' | 'error' | 'info') => void;
}

export const ProductDetailModal = ({ product, onClose, onShowToast }: ProductDetailModalProps) => {
  const { addToCart } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const favorite = isFavorite(product.id);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleAddToCart = () => {
    addToCart(product);
    onShowToast?.('Producto añadido al carrito 🛒', 'success');
  };

  const handleFavoriteToggle = () => {
    if (favorite) {
      removeFromFavorites(product.id);
      onShowToast?.('Producto eliminado de favoritos', 'info');
    } else {
      addToFavorites(product);
      onShowToast?.('Producto añadido a favoritos ❤️', 'success');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Cerrar">
          ×
        </button>
        <div className="modal-body">
          <div className="modal-image-container">
            <img src={product.image} alt={product.title} className="modal-image" />
            {product.rating.rate >= 4.5 && (
              <span className="product-badge popular">⭐ Popular</span>
            )}
          </div>
          <div className="modal-info">
            <div className="modal-header">
              <h2 className="modal-title">{product.title}</h2>
              <button
                className={`modal-favorite-button ${favorite ? 'active' : ''}`}
                onClick={handleFavoriteToggle}
                aria-label={favorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
              >
                {favorite ? '❤️' : '🤍'}
              </button>
            </div>
            <div className="modal-category">{product.category}</div>
            <div className="modal-rating">
              <span className="rating-stars">⭐</span>
              <span>{product.rating.rate}</span>
              <span className="rating-count">({product.rating.count} reseñas)</span>
            </div>
            <div className="modal-price">${product.price.toFixed(2)}</div>
            <p className="modal-description">{product.description}</p>
            <div className="modal-actions">
              <button className="modal-add-to-cart" onClick={handleAddToCart}>
                🛒 Añadir al carrito
              </button>
              <button className="modal-buy-now">💳 Comprar ahora</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
