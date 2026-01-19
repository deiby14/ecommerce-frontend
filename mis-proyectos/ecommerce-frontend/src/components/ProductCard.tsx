import { useCart } from '../contexts/CartContext';
import { useFavorites } from '../contexts/FavoritesContext';
import type { Product } from '../types';
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
  onShowToast?: (message: string, type?: 'success' | 'error' | 'info') => void;
  onViewDetail?: (product: Product) => void;
}

export const ProductCard = ({ product, onShowToast, onViewDetail }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const favorite = isFavorite(product.id);

  const handleFavoriteToggle = () => {
    if (favorite) {
      removeFromFavorites(product.id);
      onShowToast?.('Producto eliminado de favoritos', 'info');
    } else {
      addToFavorites(product);
      onShowToast?.('Producto añadido a favoritos ❤️', 'success');
    }
  };

  const handleAddToCart = () => {
    addToCart(product);
    onShowToast?.('Producto añadido al carrito 🛒', 'success');
  };

  return (
    <div className="product-card">
      <div className="product-image-container" onClick={() => onViewDetail?.(product)}>
        <img
          src={product.image}
          alt={product.title}
          className="product-image"
        />
        <button
          className={`favorite-button ${favorite ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            handleFavoriteToggle();
          }}
          aria-label={favorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
        >
          {favorite ? '❤️' : '🤍'}
        </button>
        {product.rating.rate >= 4.5 && (
          <span className="product-badge popular">⭐ Popular</span>
        )}
      </div>
      <div className="product-info">
        <h3 
          className="product-title" 
          onClick={() => onViewDetail?.(product)}
          style={{ cursor: 'pointer' }}
        >
          {product.title}
        </h3>
        <p className="product-category">{product.category}</p>
        <div className="product-rating">
          ⭐ {product.rating.rate} ({product.rating.count})
        </div>
        <div className="product-footer">
          <span className="product-price">${product.price.toFixed(2)}</span>
          <button
            className="add-to-cart-button"
            onClick={handleAddToCart}
          >
            🛒 Añadir
          </button>
        </div>
      </div>
    </div>
  );
};
