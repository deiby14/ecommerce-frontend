import { useState } from 'react';
import { CartProvider } from './contexts/CartContext';
import { FavoritesProvider } from './contexts/FavoritesContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { Header } from './components/Header';
import { ProductList } from './components/ProductList';
import { Cart } from './components/Cart';
import { Favorites } from './components/Favorites';
import { StatsDashboard } from './components/StatsDashboard';
import { ToastContainer } from './components/ToastContainer';
import './App.css';

type View = 'home' | 'cart' | 'favorites' | 'stats';

interface ToastMessage {
  id: string;
  message: string;
  type?: 'success' | 'error' | 'info';
}

function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (currentView !== 'home') {
      setCurrentView('home');
    }
  };

  const handleNavigateToCart = () => setCurrentView('cart');
  const handleNavigateToFavorites = () => setCurrentView('favorites');
  const handleNavigateToHome = () => setCurrentView('home');
  const handleNavigateToStats = () => setCurrentView('stats');

  return (
    <ThemeProvider>
      <CartProvider>
        <FavoritesProvider>
          <div className="app">
            <Header
              onSearch={handleSearch}
              onNavigateToCart={handleNavigateToCart}
              onNavigateToFavorites={handleNavigateToFavorites}
              onNavigateToHome={handleNavigateToHome}
              onNavigateToStats={handleNavigateToStats}
            />
            <main className="main-content">
              {currentView === 'home' && <ProductList searchQuery={searchQuery} onShowToast={showToast} />}
              {currentView === 'cart' && <Cart onBack={handleNavigateToHome} onShowToast={showToast} />}
              {currentView === 'favorites' && <Favorites onShowToast={showToast} onBack={handleNavigateToHome} />}
              {currentView === 'stats' && <StatsDashboard onBack={handleNavigateToHome} />}
            </main>
            <ToastContainer toasts={toasts} onRemove={removeToast} />
          </div>
        </FavoritesProvider>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
