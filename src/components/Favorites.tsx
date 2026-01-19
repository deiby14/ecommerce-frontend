import { useState } from 'react';
import { useFavorites } from '../contexts/FavoritesContext';
import { ProductCard } from './ProductCard';
import { ProductDetailModal } from './ProductDetailModal';
import type { Product } from '../types';
import './Favorites.css';

interface FavoritesProps {
  onShowToast?: (message: string, type?: 'success' | 'error' | 'info') => void;
  onBack?: () => void;
}

export const Favorites = ({ onShowToast, onBack }: FavoritesProps) => {
  const { favorites } = useFavorites();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  if (favorites.length === 0) {
    return (
      <div className="favorites-container">
        <div className="page-header">
          <button className="back-button" onClick={onBack}>
            ← Volver
          </button>
          <h2>Mis Favoritos</h2>
        </div>
        <div className="empty-favorites">
          <p>❤️ No tienes productos favoritos aún</p>
          <p>¡Añade productos a favoritos para verlos aquí!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="favorites-container">
      <div className="page-header">
        <button className="back-button" onClick={onBack}>
          ← Volver
        </button>
        <h2>Mis Favoritos ({favorites.length} {favorites.length === 1 ? 'producto' : 'productos'})</h2>
      </div>
      <div className="favorites-grid">
        {favorites.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onShowToast={onShowToast}
            onViewDetail={setSelectedProduct}
          />
        ))}
      </div>

      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onShowToast={onShowToast}
        />
      )}
    </div>
  );
};
