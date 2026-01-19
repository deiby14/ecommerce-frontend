import { useEffect, useState, useMemo } from 'react';
import { fetchProducts, fetchCategories } from '../services/api';
import { ProductCard } from './ProductCard';
import { ProductDetailModal } from './ProductDetailModal';
import type { Product, SortOrder } from '../types';
import './ProductList.css';

interface ProductListProps {
  searchQuery: string;
  onShowToast?: (message: string, type?: 'success' | 'error' | 'info') => void;
}

export const ProductList = ({ searchQuery, onShowToast }: ProductListProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<SortOrder>('none');
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({ min: 0, max: 3000 });
  const [minRating, setMinRating] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [productsData, categoriesData] = await Promise.all([
          fetchProducts(),
          fetchCategories(),
        ]);
        setProducts(productsData);
        setCategories(categoriesData);
        const max = Math.max(...productsData.map(p => p.price), 0);
        setPriceRange({ min: 0, max: max });
      } catch (err) {
        setError('Error al cargar los productos');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const maxPrice = useMemo(() => {
    return Math.max(...products.map(p => p.price), 0);
  }, [products]);

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products;

    // Filtro por búsqueda
    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (product) =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filtro por categoría
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Filtro por rango de precio
    filtered = filtered.filter(
      (product) => product.price >= priceRange.min && product.price <= priceRange.max
    );

    // Filtro por rating mínimo
    if (minRating > 0) {
      filtered = filtered.filter((product) => product.rating.rate >= minRating);
    }

    // Ordenamiento por precio
    if (sortOrder !== 'none') {
      filtered = [...filtered].sort((a, b) => {
        if (sortOrder === 'asc') {
          return a.price - b.price;
        } else {
          return b.price - a.price;
        }
      });
    }

    return filtered;
  }, [products, searchQuery, selectedCategory, sortOrder, priceRange, minRating]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Cargando productos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>❌ {error}</p>
      </div>
    );
  }

  return (
    <div className="product-list-container">
      <div className="filters-container">
        <div className="filter-group">
          <label htmlFor="category-filter">Categoría:</label>
          <select
            id="category-filter"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="filter-select"
          >
            <option value="all">Todas las categorías</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="sort-filter">Ordenar por precio:</label>
          <select
            id="sort-filter"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as SortOrder)}
            className="filter-select"
          >
            <option value="none">Sin ordenar</option>
            <option value="asc">Precio: Menor a Mayor</option>
            <option value="desc">Precio: Mayor a Menor</option>
          </select>
        </div>

        <div className="filter-group price-range-group">
          <label htmlFor="price-range">Rango de precio: ${priceRange.min} - ${priceRange.max}</label>
          <div className="price-range-inputs">
            <input
              type="range"
              id="price-range-min"
              min="0"
              max={priceRange.max}
              value={priceRange.min}
              onChange={(e) => {
                const newMin = Number(e.target.value);
                setPriceRange({ ...priceRange, min: Math.min(newMin, priceRange.max) });
              }}
              className="price-range-slider"
            />
            <input
              type="range"
              id="price-range-max"
              min={priceRange.min}
              max={maxPrice}
              value={priceRange.max}
              onChange={(e) => {
                const newMax = Number(e.target.value);
                setPriceRange({ ...priceRange, max: Math.max(newMax, priceRange.min) });
              }}
              className="price-range-slider"
            />
          </div>
          <div className="price-range-values">
            <span>Min: ${priceRange.min}</span>
            <span>Max: ${priceRange.max}</span>
          </div>
        </div>

        <div className="filter-group">
          <label htmlFor="rating-filter">Rating mínimo: {minRating > 0 ? `${minRating}+ ⭐` : 'Todos'}</label>
          <input
            type="range"
            id="rating-filter"
            min="0"
            max="5"
            step="0.5"
            value={minRating}
            onChange={(e) => setMinRating(Number(e.target.value))}
            className="price-range-slider"
          />
        </div>
      </div>

      <div className="view-controls">
        <div className="products-count">
          {filteredAndSortedProducts.length} producto(s) encontrado(s)
        </div>
        <div className="view-toggle">
          <button
            className={`view-button ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => setViewMode('grid')}
            title="Vista de cuadrícula"
          >
            ⊞ Grid
          </button>
          <button
            className={`view-button ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => setViewMode('list')}
            title="Vista de lista"
          >
            ☰ Lista
          </button>
        </div>
      </div>

      <div className={`products-${viewMode} ${viewMode === 'list' ? 'products-list' : ''}`}>
        {filteredAndSortedProducts.length > 0 ? (
          filteredAndSortedProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onShowToast={onShowToast}
              onViewDetail={setSelectedProduct}
            />
          ))
        ) : (
          <div className="no-products">
            <p>No se encontraron productos</p>
          </div>
        )}
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
